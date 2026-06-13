import type { Day, DayType, Exercise, Session, SetLog } from '../types';
import { DAYS, ROTATION } from '../program';

/** LOCAL-timezone YYYY-MM-DD. Never use toISOString (that is UTC). */
export function localDateISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** 0 = Monday .. 6 = Sunday. */
export function rotationIndex(d: Date): number {
  return (d.getDay() + 6) % 7;
}

export function dayTypeFor(d: Date): DayType {
  return ROTATION[rotationIndex(d)];
}

/**
 * Per-set target values from the MOST RECENT session strictly before today that
 * has logs for exerciseKey at the SAME stepIndex. Returns one entry per set
 * (null where that set is missing). If the step changed or there is no qualifying
 * history, every entry is null (a new level starts fresh).
 */
export function targets(
  history: { session: Session; logs: SetLog[] }[],
  exerciseKey: string,
  stepIndex: number,
  todayISO: string,
): (number | null)[] {
  // Sessions strictly before today, most recent first.
  const prior = history
    .filter((h) => h.session.on_date < todayISO)
    .sort((a, b) => (a.session.on_date < b.session.on_date ? 1 : -1));

  for (const h of prior) {
    const matching = h.logs.filter(
      (l) => l.exercise_key === exerciseKey && l.step_index === stepIndex,
    );
    if (matching.length === 0) continue;

    // First qualifying session wins — build per-set array.
    const maxSet = matching.reduce((m, l) => Math.max(m, l.set_number), 0);
    const out: (number | null)[] = new Array(maxSet).fill(null);
    for (const l of matching) {
      out[l.set_number - 1] = l.value;
    }
    return out;
  }

  return [];
}

export type BeatState = 'fresh' | 'beat' | 'met' | 'under';

export function beatState(value: number, target: number | null): BeatState {
  if (target === null) return 'fresh';
  if (value > target) return 'beat';
  if (value === target) return 'met';
  return 'under';
}

/** Sessions of tenure required at a step before a level-up is offered. */
export const TENURE_GATE = 6;

export type AdvanceState =
  /** No next step, or reps not yet maxed across all sets today. */
  | 'none'
  /** Reps maxed on every set today, but not enough tenure yet (joints catching up). */
  | 'gated'
  /** Maxed AND tenured — offer the level-up. */
  | 'ready';

/**
 * Classifies an exercise's level-up readiness for TODAY.
 *
 * 'ready' requires all of ex.sets sets logged today at this stepIndex with
 * value >= range[1], a next step to advance to, AND enough tenure at this step
 * (sessionsAtStep >= TENURE_GATE, ~3 weeks at 2x/week).
 *
 * 'gated' is the same rep performance WITHOUT the tenure — surfaced so the user
 * sees the app is holding (not broken). The gate exists because tendon/connective
 * tissue adapts 2-3 months slower than muscle; we hold a level until the joints
 * have caught up even when the rep target is already met.
 */
export function advanceState(
  todayLogs: SetLog[],
  ex: Exercise,
  stepIndex: number,
  sessionsAtStep: number,
): AdvanceState {
  if (stepIndex >= ex.path.length - 1) return 'none';

  const max = ex.range[1];
  const logged = new Map<number, SetLog>();
  for (const l of todayLogs) {
    if (l.exercise_key !== ex.key) continue;
    if (l.step_index !== stepIndex) continue;
    logged.set(l.set_number, l);
  }
  if (logged.size < ex.sets) return 'none';

  for (let s = 1; s <= ex.sets; s++) {
    const l = logged.get(s);
    if (!l || l.value < max) return 'none';
  }
  return sessionsAtStep >= TENURE_GATE ? 'ready' : 'gated';
}

/** Back-compat boolean: true only when the level-up should be actively offered. */
export function shouldSuggestAdvance(
  todayLogs: SetLog[],
  ex: Exercise,
  stepIndex: number,
  sessionsAtStep: number,
): boolean {
  return advanceState(todayLogs, ex, stepIndex, sessionsAtStep) === 'ready';
}

/**
 * Last 7 calendar days inclusive of today. count = distinct in-window dates
 * present in `dates`. The caller passes a PRE-FILTERED list of TRAINED dates
 * (YYYY-MM-DD) — this function only knows dates, never sessions. The
 * trained-day filter (completed_at != null, calisthenics-only) lives at the
 * call site, so the count can never absorb a protein-only morning or the
 * static yoga schedule.
 */
export function consistencyWindow(
  dates: string[],
  todayISO: string,
): { count: number; days: { date: string; trained: boolean }[] } {
  const trainedDates = new Set(dates);
  const today = parseISO(todayISO);

  const days: { date: string; trained: boolean }[] = [];
  const counted = new Set<string>();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const iso = localDateISO(d);
    const trained = trainedDates.has(iso);
    if (trained) counted.add(iso);
    days.push({ date: iso, trained });
  }

  return { count: counted.size, days };
}

/**
 * full: every MAIN exercise has all sets logged.
 * floor: every MAIN exercise has at least one set logged.
 */
export function isSessionComplete(
  logs: SetLog[],
  day: Day,
  floorMode: boolean,
): boolean {
  // Floor mode (the "bad day" floor): one set of each MAIN move is a full win;
  // the finisher is intentionally not required.
  if (floorMode) {
    const mains = day.exercises.filter((e) => e.main);
    if (mains.length === 0) return false;
    for (const ex of mains) {
      const logged = logs.some((l) => l.exercise_key === ex.key);
      if (!logged) return false;
    }
    return true;
  }

  // Full session: every exercise — the main moves AND the core/finisher — must
  // have all its sets logged before we call the day done. The finisher is real
  // programming, so the banner must not fire while a card is still unstarted.
  if (day.exercises.length === 0) return false;
  for (const ex of day.exercises) {
    const setNums = new Set(
      logs.filter((l) => l.exercise_key === ex.key).map((l) => l.set_number),
    );
    for (let s = 1; s <= ex.sets; s++) {
      if (!setNums.has(s)) return false;
    }
  }
  return true;
}

/**
 * Local hour-of-day (0-23) for a stored UTC timestamp (completed_at is written
 * with toISOString(), i.e. UTC). `new Date(isoZ).getHours()` reads back in the
 * viewer's LOCAL zone — never slice the hour out of the string, that's UTC and
 * mislabels late-evening / early-morning (travel) sessions. Null-safe.
 */
export function completionHourLocal(iso: string | null): number | null {
  if (!iso) return null;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d.getHours();
}

/** The rolling 7-day window ending (inclusive) at todayISO, as YYYY-MM-DD. */
function last7Dates(todayISO: string): string[] {
  const today = parseISO(todayISO);
  const out: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    out.push(localDateISO(d));
  }
  return out;
}

export interface WeekRecap {
  /** One entry per day-type, how many sessions hit vs how many the rotation plans. */
  patterns: { type: DayType; trained: number; planned: number }[];
  /** Total real sets logged across the window (floor days included, honestly). */
  totalSets: number;
  /** Exercises whose step advanced within the window. */
  levelUps: { key: string; from: number; to: number }[];
  /** Distinct trained calendar days in the window. */
  sessionsCount: number;
  /** Mean local completion hour (0-23) across completed sessions, null below 3 samples. */
  typicalHour: number | null;
}

/**
 * Summarizes the rolling 7-day window for the Sunday "the week came together"
 * recap. Pure: self-data only (never presence). Floor days count as a trained
 * day but their real set total still shows, so depth is honest.
 */
export function weekRecap(
  history: { session: Session; logs: SetLog[] }[],
  todayISO: string,
): WeekRecap {
  const window = new Set(last7Dates(todayISO));
  const inWindow = history.filter((h) => window.has(h.session.on_date));

  // Planned counts come straight from the rotation (push/legs/pull 2x, core 1x).
  const planned = new Map<DayType, number>();
  for (const t of ROTATION) planned.set(t, (planned.get(t) ?? 0) + 1);

  // Trained: distinct dates per day-type (a day is one session).
  const trainedDatesByType = new Map<DayType, Set<string>>();
  const trainedDates = new Set<string>();
  let totalSets = 0;
  const stepRange = new Map<string, { min: number; max: number }>();
  const hours: number[] = [];

  for (const h of inWindow) {
    trainedDates.add(h.session.on_date);
    const hour = completionHourLocal(h.session.completed_at);
    if (hour !== null) hours.push(hour);
    const t = h.session.day_type;
    if (t === 'push' || t === 'legs' || t === 'pull' || t === 'core') {
      let set = trainedDatesByType.get(t);
      if (!set) {
        set = new Set<string>();
        trainedDatesByType.set(t, set);
      }
      set.add(h.session.on_date);
    }
    for (const l of h.logs) {
      totalSets += 1;
      const r = stepRange.get(l.exercise_key);
      if (!r) stepRange.set(l.exercise_key, { min: l.step_index, max: l.step_index });
      else {
        r.min = Math.min(r.min, l.step_index);
        r.max = Math.max(r.max, l.step_index);
      }
    }
  }

  const order: DayType[] = ['push', 'legs', 'pull', 'core'];
  const patterns = order.map((type) => ({
    type,
    trained: trainedDatesByType.get(type)?.size ?? 0,
    planned: planned.get(type) ?? 0,
  }));

  const levelUps: { key: string; from: number; to: number }[] = [];
  for (const [key, r] of stepRange) {
    if (r.max > r.min) levelUps.push({ key, from: r.min, to: r.max });
  }

  const typicalHour =
    hours.length >= 3
      ? Math.round(hours.reduce((a, b) => a + b, 0) / hours.length)
      : null;

  return {
    patterns,
    totalSets,
    levelUps,
    sessionsCount: trainedDates.size,
    typicalHour,
  };
}

export interface PatternSummary {
  type: DayType;
  /** Sessions per week the rotation schedules for this pattern. */
  perWeek: number;
  /** Shortest gap between two sessions of this pattern, in hours (null at 1×/wk). */
  gapHours: number | null;
  /** Planned MAIN working sets per week (per-day main sets × occurrences). */
  weeklySets: number;
}

/**
 * Per-pattern weekly summary, derived entirely from ROTATION + DAYS so the
 * numbers can never drift from the program config. Patterns are ordered by
 * first appearance in the rotation. The gap is the minimum cyclic distance
 * between occurrences (the week repeats), in hours.
 */
export function programPatterns(): PatternSummary[] {
  const order: DayType[] = [];
  const indices = new Map<DayType, number[]>();
  ROTATION.forEach((type, i) => {
    let idx = indices.get(type);
    if (!idx) {
      idx = [];
      indices.set(type, idx);
      order.push(type);
    }
    idx.push(i);
  });

  return order.map((type) => {
    const idx = indices.get(type)!;
    const perWeek = idx.length;

    let gapHours: number | null = null;
    if (perWeek >= 2) {
      let minDays = ROTATION.length;
      for (let i = 0; i < idx.length; i++) {
        const next = idx[(i + 1) % idx.length];
        const gap = (next - idx[i] + ROTATION.length) % ROTATION.length;
        minDays = Math.min(minDays, gap);
      }
      gapHours = minDays * 24;
    }

    const setsPerDay = DAYS[type].exercises
      .filter((e) => e.main)
      .reduce((sum, e) => sum + e.sets, 0);

    return { type, perWeek, gapHours, weeklySets: setsPerDay * perWeek };
  });
}

/** Parse a YYYY-MM-DD string into a LOCAL Date (avoids UTC shift of new Date(str)). */
function parseISO(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}
