import { useEffect, useMemo, useRef, useState } from 'react';
import type { Day, Exercise, Profile, Session, SetLog } from '../types';
import { dayConfig, WARMUP, FLEX_OPTIONS } from '../program';
import {
  dayTypeFor,
  localDateISO,
  targets as computeTargets,
  beatState,
  shouldSuggestAdvance,
  isSessionComplete,
} from '../lib/logic';
import {
  fetchMyHistory,
  fetchProgression,
  getOrCreateTodaySession,
  logSet as dbLogSet,
  markCompleted,
  setFloorMode as dbSetFloorMode,
  advanceStep as dbAdvanceStep,
} from '../lib/db';

export interface TodayProps {
  profile: Profile;
}

const DAY_CLASS: Record<string, string> = {
  push: 'is-push',
  legs: 'is-legs',
  pull: 'is-pull',
  flex: 'is-flex',
};

const WEEKDAY = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

function formatDate(d: Date): string {
  const wd = WEEKDAY[d.getDay()];
  const month = d.toLocaleDateString(undefined, { month: 'short' });
  return `${wd} · ${month} ${d.getDate()}`;
}

export default function Today({ profile }: TodayProps) {
  const today = useMemo(() => new Date(), []);
  const todayISO = useMemo(() => localDateISO(today), [today]);
  const dayType = useMemo(() => dayTypeFor(today), [today]);
  const day = useMemo<Day>(() => dayConfig(dayType), [dayType]);

  // ---- remote state ----
  const [session, setSession] = useState<Session | null>(null);
  const [history, setHistory] = useState<{ session: Session; logs: SetLog[] }[]>([]);
  const [progression, setProgression] = useState<Map<string, number>>(new Map());
  // today's logs keyed by `${exerciseKey}:${setNumber}`
  const [todayLogs, setTodayLogs] = useState<Map<string, SetLog>>(new Map());

  const [floorMode, setFloorModeState] = useState(false);
  const [completedAt, setCompletedAt] = useState<string | null>(null);
  const [bannerShown, setBannerShown] = useState(false);

  const [warmupOpen, setWarmupOpen] = useState(false);
  const [retryHint, setRetryHint] = useState<string | null>(null);

  const loadedRef = useRef(false);
  // Memoizes an in-flight session-creation so concurrent fast taps share one call.
  const sessionPromiseRef = useRef<Promise<Session> | null>(null);

  // ---- initial load (parallel) ----
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [hist, prog] = await Promise.all([
          fetchMyHistory(),
          fetchProgression(),
        ]);
        if (!alive) return;
        setHistory(hist);
        setProgression(prog);

        // Adopt an existing session for today if present (don't create one).
        const existing = hist.find((h) => h.session.on_date === todayISO);
        if (existing) {
          setSession(existing.session);
          setFloorModeState(existing.session.floor_mode);
          setCompletedAt(existing.session.completed_at);
          const m = new Map<string, SetLog>();
          for (const l of existing.logs) {
            m.set(`${l.exercise_key}:${l.set_number}`, l);
          }
          setTodayLogs(m);
          if (existing.session.completed_at) setBannerShown(true);
        }
      } catch {
        if (!alive) return;
        setRetryHint('Could not load your history. Pull to refresh.');
      } finally {
        loadedRef.current = true;
      }
    })();
    return () => {
      alive = false;
    };
  }, [todayISO]);

  // History BEFORE today (for targets) — stable derived value.
  const priorHistory = useMemo(
    () => history.filter((h) => h.session.on_date !== todayISO),
    [history, todayISO],
  );

  function stepFor(ex: Exercise): number {
    return progression.get(ex.key) ?? 0;
  }

  // Ensure a session row exists; returns it (creates on first interaction).
  // Concurrent callers (fast double-tap before React commits setSession) share a
  // single in-flight getOrCreateTodaySession promise to avoid a duplicate INSERT
  // that would hit the unique(user_id, on_date) constraint and roll back a rep.
  async function ensureSession(): Promise<Session> {
    if (session) return session;
    if (!sessionPromiseRef.current) {
      sessionPromiseRef.current = getOrCreateTodaySession(dayType, floorMode).then(
        (s) => {
          setSession(s);
          setFloorModeState(s.floor_mode);
          setCompletedAt(s.completed_at);
          return s;
        },
        (err) => {
          // Allow a later attempt to retry rather than caching the failure.
          sessionPromiseRef.current = null;
          throw err;
        },
      );
    }
    return sessionPromiseRef.current;
  }

  const todayLogsArr = useMemo(() => [...todayLogs.values()], [todayLogs]);

  // ---- completion detection ----
  useEffect(() => {
    if (!session) return;
    if (completedAt) return;
    const done = isSessionComplete(todayLogsArr, day, floorMode);
    if (done) {
      const ts = new Date().toISOString();
      setCompletedAt(ts);
      setBannerShown(true);
      markCompleted(session.id).catch(() => {
        // Non-fatal: the logs are saved; completion can be re-derived later.
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todayLogsArr, floorMode, session, day]);

  // ---- floor toggle ----
  async function toggleFloor() {
    const next = !floorMode;
    setFloorModeState(next);
    if (session) {
      dbSetFloorMode(session.id, next).catch(() => {
        setFloorModeState(!next);
        setRetryHint('Could not save floor mode — tap to retry.');
      });
    }
  }

  // ---- log a set (optimistic, with rollback) ----
  async function handleLog(ex: Exercise, setNumber: number, value: number) {
    const key = `${ex.key}:${setNumber}`;
    const stepIndex = stepFor(ex);
    const prev = todayLogs.get(key);

    // Optimistic insert/update with a temp record.
    const optimistic: SetLog = {
      id: prev?.id ?? `tmp-${key}`,
      session_id: session?.id ?? 'tmp-session',
      user_id: profile.id,
      exercise_key: ex.key,
      set_number: setNumber,
      value,
      step_index: stepIndex,
    };
    setTodayLogs((m) => new Map(m).set(key, optimistic));
    setRetryHint(null);

    try {
      const s = await ensureSession();
      const saved = await dbLogSet({
        sessionId: s.id,
        exerciseKey: ex.key,
        setNumber,
        value,
        stepIndex,
      });
      setTodayLogs((m) => new Map(m).set(key, saved));
    } catch {
      // rollback
      setTodayLogs((m) => {
        const next = new Map(m);
        if (prev) next.set(key, prev);
        else next.delete(key);
        return next;
      });
      setRetryHint('That rep did not save — tap the set to try again.');
    }
  }

  // ---- advance a step (level up) ----
  async function handleAdvance(ex: Exercise) {
    const from = stepFor(ex);
    const next = from + 1;
    setProgression((m) => new Map(m).set(ex.key, next));
    // Drop today's logs for this exercise at the old step from the local map
    // so the new level starts fresh visually (DB rows stay; targets() filters by step).
    setTodayLogs((m) => {
      const out = new Map(m);
      for (const [k, l] of m) {
        if (l.exercise_key === ex.key && l.step_index === from) out.delete(k);
      }
      return out;
    });
    try {
      await dbAdvanceStep(ex.key, from);
    } catch {
      setProgression((m) => new Map(m).set(ex.key, from));
      setRetryHint('Could not level up — try again.');
    }
  }

  // ---- flex day "log today" ----
  async function handleFlexLog() {
    setRetryHint(null);
    try {
      const s = await ensureSession();
      const ts = new Date().toISOString();
      setCompletedAt(ts);
      setBannerShown(true);
      await markCompleted(s.id);
    } catch {
      setCompletedAt(null);
      setBannerShown(false);
      setRetryHint('Could not log today — try again.');
    }
  }

  const dayClass = DAY_CLASS[dayType] ?? 'is-push';

  return (
    <div className={`wrap ${dayClass}`}>
      <DayHeader day={day} date={today} />

      {dayType !== 'flex' && (
        <FloorToggle on={floorMode} onToggle={toggleFloor} />
      )}

      {dayType !== 'flex' && (
        <Warmup open={warmupOpen} onToggle={() => setWarmupOpen((o) => !o)} />
      )}

      {dayType === 'flex' ? (
        <FlexCard
          day={day}
          logged={!!completedAt}
          onLog={handleFlexLog}
        />
      ) : (
        day.exercises.map((ex, i) => (
          <ExerciseCard
            key={ex.key}
            ex={ex}
            index={i + 1}
            stepIndex={stepFor(ex)}
            priorHistory={priorHistory}
            todayISO={todayISO}
            todayLogs={todayLogs}
            todayLogsArr={todayLogsArr}
            floorMode={floorMode}
            onLog={handleLog}
            onAdvance={handleAdvance}
          />
        ))
      )}

      {retryHint && <p className="err">{retryHint}</p>}

      {bannerShown && <DoneBanner flex={dayType === 'flex'} />}
    </div>
  );
}

// ===========================================================================
// Day header
// ===========================================================================
function DayHeader({ day, date }: { day: Day; date: Date }) {
  return (
    <div className="day-head">
      <span className="ptag">
        <span className="dot" />
        {day.title}
      </span>
      <div className="day-date">{formatDate(date)}</div>
      <p className="focus">{day.focus}</p>
    </div>
  );
}

// ===========================================================================
// Floor-mode toggle
// ===========================================================================
function FloorToggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      className="floor-toggle"
      aria-pressed={on}
      onClick={onToggle}
      type="button"
    >
      <span className="ico">Bad day?</span>
      <p>Floor: 1 round of the mains.</p>
      <span className="switch" aria-hidden="true" />
    </button>
  );
}

// ===========================================================================
// Warm-up strip
// ===========================================================================
function Warmup({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <div className="warmup">
      <button
        className="label"
        onClick={onToggle}
        type="button"
        style={{ background: 'none', border: 'none', padding: '12px 0', letterSpacing: '0.16em' }}
        aria-expanded={open}
      >
        Warm-up · ~2 min {open ? '–' : '+'}
      </button>
      {open && (
        <div className="path">
          {WARMUP.map((w, i) => (
            <span className="chip" key={i}>
              {w}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ===========================================================================
// Exercise card
// ===========================================================================
interface ExerciseCardProps {
  ex: Exercise;
  index: number;
  stepIndex: number;
  priorHistory: { session: Session; logs: SetLog[] }[];
  todayISO: string;
  todayLogs: Map<string, SetLog>;
  todayLogsArr: SetLog[];
  floorMode: boolean;
  onLog: (ex: Exercise, setNumber: number, value: number) => void;
  onAdvance: (ex: Exercise) => void;
}

function ExerciseCard({
  ex,
  index,
  stepIndex,
  priorHistory,
  todayISO,
  todayLogs,
  todayLogsArr,
  floorMode,
  onLog,
  onAdvance,
}: ExerciseCardProps) {
  const targets = useMemo(
    () => computeTargets(priorHistory, ex.key, stepIndex, todayISO),
    [priorHistory, ex.key, stepIndex, todayISO],
  );

  const suggestAdvance = useMemo(
    () => shouldSuggestAdvance(todayLogsArr, ex, stepIndex),
    [todayLogsArr, ex, stepIndex],
  );

  // Floor mode collapses non-main and only requires set 1 of mains; we still
  // show the single-set row for floor on mains, all sets otherwise.
  const setsToShow = floorMode ? 1 : ex.sets;

  const unitLabel = ex.unit === 'secs' ? 'sec' : 'reps';

  // Build the inline target line.
  const targetLine = useMemo(() => {
    const known = targets.filter((t): t is number => t !== null);
    if (known.length === 0) return null;
    return known.join(' · ');
  }, [targets]);

  return (
    <div className="ex-card">
      <div className="ex-top">
        <div>
          <span className="ex-num">{index}</span>
          <span className="ex-name">{ex.name}</span>
        </div>
        <span className="ex-sets">
          {setsToShow}×{ex.range[0]}
          {ex.range[1] !== ex.range[0] ? `–${ex.range[1]}` : ''} {unitLabel}
        </span>
      </div>

      {/* progression path */}
      <div className="path">
        {ex.path.map((step, i) => (
          <span
            className={`path-step${i === stepIndex ? ' now' : ''}`}
            key={i}
          >
            {step}
          </span>
        ))}
      </div>

      {ex.note && <p className="ex-note">{ex.note}</p>}

      <p className="ex-target">
        {targetLine ? (
          <>
            beat <b>{targetLine}</b>
          </>
        ) : (
          'first time at this level'
        )}
      </p>

      {/* set chips */}
      <div className="set-row">
        {Array.from({ length: setsToShow }, (_, i) => i + 1).map((setNumber) => {
          const log = todayLogs.get(`${ex.key}:${setNumber}`);
          const target = targets[setNumber - 1] ?? null;
          const defaultVal = target ?? ex.range[0];
          return (
            <SetChip
              key={setNumber}
              setNumber={setNumber}
              unit={unitLabel}
              loggedValue={log?.value ?? null}
              target={target}
              defaultValue={defaultVal}
              onConfirm={(v) => onLog(ex, setNumber, v)}
            />
          );
        })}
      </div>

      {suggestAdvance && (
        <div className="levelup">
          <span className="lu-text">
            Level up: <b>{ex.path[stepIndex + 1]}</b> next time
          </span>
          <button type="button" onClick={() => onAdvance(ex)}>
            Level up
          </button>
        </div>
      )}
    </div>
  );
}

// ===========================================================================
// Set chip + inline stepper
// ===========================================================================
interface SetChipProps {
  setNumber: number;
  unit: string;
  loggedValue: number | null;
  target: number | null;
  defaultValue: number;
  onConfirm: (value: number) => void;
}

function SetChip({
  setNumber,
  unit,
  loggedValue,
  target,
  defaultValue,
  onConfirm,
}: SetChipProps) {
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState(defaultValue);

  function start() {
    setVal(loggedValue ?? defaultValue);
    setOpen(true);
  }

  function confirm() {
    onConfirm(val);
    setOpen(false);
  }

  if (open) {
    return (
      <div className="stepper">
        <button
          className="pm"
          type="button"
          aria-label="decrease"
          onClick={() => setVal((v) => Math.max(0, v - 1))}
        >
          −
        </button>
        <span className="val">{val}</span>
        <span className="unit">{unit}</span>
        <button
          className="pm"
          type="button"
          aria-label="increase"
          onClick={() => setVal((v) => Math.min(1000, v + 1))}
        >
          +
        </button>
        <button className="confirm" type="button" onClick={confirm}>
          Log
        </button>
      </div>
    );
  }

  const state =
    loggedValue === null
      ? 'fresh'
      : target === null
        ? 'logged'
        : beatState(loggedValue, target);

  return (
    <button className={`set-chip ${state}`} type="button" onClick={start}>
      {loggedValue !== null ? (
        <>{loggedValue}</>
      ) : (
        <span className="sn">Set {setNumber}</span>
      )}
    </button>
  );
}

// ===========================================================================
// Flex day card
// ===========================================================================
function FlexCard({
  day,
  logged,
  onLog,
}: {
  day: Day;
  logged: boolean;
  onLog: () => void;
}) {
  return (
    <div className="ex-card">
      <div className="ex-top">
        <div>
          <span className="ex-name">Your call</span>
        </div>
      </div>
      <div className="path">
        {FLEX_OPTIONS.map((o, i) => (
          <span className="chip" key={i}>
            {o}
          </span>
        ))}
      </div>
      <p className="ex-note">{day.focus}</p>
      <div className="set-row">
        <button className="btn" type="button" onClick={onLog} disabled={logged}>
          {logged ? 'Logged — recover well' : 'Log today'}
        </button>
      </div>
    </div>
  );
}

// ===========================================================================
// Completion banner
// ===========================================================================
function DoneBanner({ flex }: { flex: boolean }) {
  return (
    <div className="done-banner">
      Done — see you tomorrow
      <span className="sub">
        {flex
          ? 'Recovery is where the muscle is built.'
          : 'Logged. The work compounds.'}
      </span>
    </div>
  );
}
