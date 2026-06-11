import type { Session as AuthSession } from '@supabase/supabase-js';
import { supabase } from './supabase';
import type {
  DayType,
  Profile,
  ProgressionRow,
  Session,
  SetLog,
} from '../types';
import { localDateISO } from './logic';
import { retryAsync } from './retry';

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export async function getSession(): Promise<AuthSession | null> {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export function onAuthChange(cb: (session: AuthSession | null) => void): () => void {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    cb(session);
  });
  return () => data.subscription.unsubscribe();
}

export async function signInWithMagicLink(email: string): Promise<void> {
  const redirect = location.origin + location.pathname;
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirect },
  });
  if (error) throw error;
}

export async function verifyEmailCode(email: string, token: string): Promise<void> {
  const { error } = await supabase.auth.verifyOtp({ email, token, type: 'email' });
  if (error) throw error;
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// ---------------------------------------------------------------------------
// Profile
// ---------------------------------------------------------------------------

export async function getProfile(): Promise<Profile | null> {
  const { data: auth } = await supabase.auth.getUser();
  const uid = auth.user?.id;
  if (!uid) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('id, display_name')
    .eq('id', uid)
    .maybeSingle();
  if (error) throw error;
  return data ?? null;
}

export async function createProfile(name: string): Promise<Profile> {
  const { data: auth } = await supabase.auth.getUser();
  const uid = auth.user?.id;
  if (!uid) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('profiles')
    .insert({ id: uid, display_name: name.trim() })
    .select('id, display_name')
    .single();
  if (error) throw error;
  return data;
}

// ---------------------------------------------------------------------------
// History (sessions + their set logs, joined client-side)
// ---------------------------------------------------------------------------

export async function fetchMyHistory(
  days = 35,
): Promise<{ session: Session; logs: SetLog[] }[]> {
  const { data: auth } = await supabase.auth.getUser();
  const uid = auth.user?.id;
  if (!uid) return [];

  const since = new Date();
  since.setDate(since.getDate() - days);
  const sinceISO = localDateISO(since);

  const { data: sessions, error: sErr } = await supabase
    .from('sessions')
    .select('id, user_id, on_date, day_type, floor_mode, protein_hit, completed_at')
    .eq('user_id', uid)
    .gte('on_date', sinceISO)
    .order('on_date', { ascending: false });
  if (sErr) throw sErr;

  const sess = (sessions ?? []) as Session[];
  if (sess.length === 0) return [];

  const ids = sess.map((s) => s.id);
  const { data: logs, error: lErr } = await supabase
    .from('set_logs')
    .select('id, session_id, user_id, exercise_key, set_number, value, step_index')
    .in('session_id', ids);
  if (lErr) throw lErr;

  const bySession = new Map<string, SetLog[]>();
  for (const l of (logs ?? []) as SetLog[]) {
    const arr = bySession.get(l.session_id) ?? [];
    arr.push(l);
    bySession.set(l.session_id, arr);
  }

  return sess.map((session) => ({
    session,
    logs: bySession.get(session.id) ?? [],
  }));
}

// ---------------------------------------------------------------------------
// Today's session + set logging
// ---------------------------------------------------------------------------

export async function getOrCreateTodaySession(
  dayType: DayType,
  floorMode: boolean,
): Promise<Session> {
  const { data: auth } = await supabase.auth.getUser();
  const uid = auth.user?.id;
  if (!uid) throw new Error('Not authenticated');

  const onDate = localDateISO(new Date());

  // Idempotent (re-select returns the existing row), so it's safe to retry on a
  // transient failure.
  return retryAsync(async () => {
    const { data: existing, error: exErr } = await supabase
      .from('sessions')
      .select('id, user_id, on_date, day_type, floor_mode, protein_hit, completed_at')
      .eq('user_id', uid)
      .eq('on_date', onDate)
      .maybeSingle();
    if (exErr) throw exErr;
    if (existing) return existing as Session;

    const { data, error } = await supabase
      .from('sessions')
      .insert({
        user_id: uid,
        on_date: onDate,
        day_type: dayType,
        floor_mode: floorMode,
      })
      .select('id, user_id, on_date, day_type, floor_mode, protein_hit, completed_at')
      .single();
    if (error) {
      // A concurrent caller may have won the race and inserted today's row first,
      // tripping the unique(user_id, on_date) constraint. Re-select instead of failing.
      if (error.code === '23505') {
        const { data: raced, error: reErr } = await supabase
          .from('sessions')
          .select('id, user_id, on_date, day_type, floor_mode, protein_hit, completed_at')
          .eq('user_id', uid)
          .eq('on_date', onDate)
          .single();
        if (reErr) throw reErr;
        return raced as Session;
      }
      throw error;
    }
    return data as Session;
  });
}

export async function logSet(args: {
  sessionId: string;
  exerciseKey: string;
  setNumber: number;
  value: number;
  stepIndex: number;
}): Promise<SetLog> {
  const { data: auth } = await supabase.auth.getUser();
  const uid = auth.user?.id;
  if (!uid) throw new Error('Not authenticated');

  // Upsert is idempotent on (session_id, exercise_key, set_number) — safe to retry.
  return retryAsync(async () => {
    const { data, error } = await supabase
      .from('set_logs')
      .upsert(
        {
          session_id: args.sessionId,
          user_id: uid,
          exercise_key: args.exerciseKey,
          set_number: args.setNumber,
          value: args.value,
          step_index: args.stepIndex,
        },
        { onConflict: 'session_id,exercise_key,set_number' },
      )
      .select(
        'id, session_id, user_id, exercise_key, set_number, value, step_index',
      )
      .single();
    if (error) throw error;
    return data as SetLog;
  });
}

export async function markCompleted(sessionId: string): Promise<void> {
  await retryAsync(async () => {
    const { error } = await supabase
      .from('sessions')
      .update({ completed_at: new Date().toISOString() })
      .eq('id', sessionId);
    if (error) throw error;
  });
}

export async function setFloorMode(sessionId: string, on: boolean): Promise<void> {
  await retryAsync(async () => {
    const { error } = await supabase
      .from('sessions')
      .update({ floor_mode: on })
      .eq('id', sessionId);
    if (error) throw error;
  });
}

export async function setProteinHit(sessionId: string, hit: boolean): Promise<void> {
  await retryAsync(async () => {
    const { error } = await supabase
      .from('sessions')
      .update({ protein_hit: hit })
      .eq('id', sessionId);
    if (error) throw error;
  });
}

// ---------------------------------------------------------------------------
// Progression
// ---------------------------------------------------------------------------

export async function fetchProgression(): Promise<Map<string, number>> {
  const { data: auth } = await supabase.auth.getUser();
  const uid = auth.user?.id;
  if (!uid) return new Map();

  const { data, error } = await supabase
    .from('progression')
    .select('user_id, exercise_key, step_index')
    .eq('user_id', uid);
  if (error) throw error;

  const map = new Map<string, number>();
  for (const row of (data ?? []) as ProgressionRow[]) {
    map.set(row.exercise_key, row.step_index);
  }
  return map;
}

// ---------------------------------------------------------------------------
// Familiarity ("learn, then fade" guides)
// ---------------------------------------------------------------------------

/**
 * Distinct PAST sessions (all-time, own data) that contain at least one set_log
 * for each (exercise_key, step_index). Keyed "exercise_key:step_index" so the UI
 * can look up the count for an exercise at its CURRENT step. RLS already scopes
 * set_logs to the owner; we group client-side. Each session is counted once per
 * (key, step) even if it has several sets logged.
 *
 * `excludeSessionId` (today's session, if one already exists) is omitted from
 * the count so the familiarity reflects strictly PAST sessions even on a
 * mid-session page reload after logging.
 */
export async function fetchFamiliarity(
  excludeSessionId?: string,
): Promise<Map<string, number>> {
  const { data: auth } = await supabase.auth.getUser();
  const uid = auth.user?.id;
  if (!uid) return new Map();

  const { data, error } = await supabase
    .from('set_logs')
    .select('session_id, exercise_key, step_index')
    .eq('user_id', uid);
  if (error) throw error;

  // key "exercise_key:step_index" -> set of distinct session ids
  const sessionsByKeyStep = new Map<string, Set<string>>();
  for (const row of (data ?? []) as {
    session_id: string;
    exercise_key: string;
    step_index: number;
  }[]) {
    if (excludeSessionId && row.session_id === excludeSessionId) continue;
    const k = `${row.exercise_key}:${row.step_index}`;
    let set = sessionsByKeyStep.get(k);
    if (!set) {
      set = new Set<string>();
      sessionsByKeyStep.set(k, set);
    }
    set.add(row.session_id);
  }

  const out = new Map<string, number>();
  for (const [k, set] of sessionsByKeyStep) out.set(k, set.size);
  return out;
}

export async function advanceStep(
  exerciseKey: string,
  fromIndex: number,
): Promise<number> {
  const { data: auth } = await supabase.auth.getUser();
  const uid = auth.user?.id;
  if (!uid) throw new Error('Not authenticated');

  const next = fromIndex + 1;
  // Upsert keyed on (user_id, exercise_key) — idempotent, safe to retry.
  return retryAsync(async () => {
    const { error } = await supabase.from('progression').upsert(
      {
        user_id: uid,
        exercise_key: exerciseKey,
        step_index: next,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,exercise_key' },
    );
    if (error) throw error;
    return next;
  });
}

// ---------------------------------------------------------------------------
// Presence (the social feature — sessions only, never reps)
// ---------------------------------------------------------------------------

export async function fetchPresence(daysBack = 7): Promise<{
  profiles: Profile[];
  sessions: { user_id: string; on_date: string; completed_at: string | null }[];
}> {
  const since = new Date();
  since.setDate(since.getDate() - daysBack);
  const sinceISO = localDateISO(since);

  const [{ data: profiles, error: pErr }, { data: sessions, error: sErr }] =
    await Promise.all([
      supabase.from('profiles').select('id, display_name'),
      supabase
        .from('sessions')
        .select('user_id, on_date, completed_at')
        .gte('on_date', sinceISO),
    ]);
  if (pErr) throw pErr;
  if (sErr) throw sErr;

  return {
    profiles: (profiles ?? []) as Profile[],
    sessions: (sessions ?? []) as {
      user_id: string;
      on_date: string;
      completed_at: string | null;
    }[],
  };
}
