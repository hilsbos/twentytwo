import { useEffect, useMemo, useRef, useState } from 'react';
import type { Day, Exercise, Profile, Session, SetLog } from '../types';
import { dayConfig, DAYS, WARMUP } from '../program';
import {
  dayTypeFor,
  localDateISO,
  targets as computeTargets,
  beatState,
  advanceState,
  weekRecap,
  type WeekRecap,
  isSessionComplete,
} from '../lib/logic';
import {
  fetchMyHistory,
  fetchProgression,
  fetchFamiliarity,
  getOrCreateTodaySession,
  logSet as dbLogSet,
  markCompleted,
  setFloorMode as dbSetFloorMode,
  advanceStep as dbAdvanceStep,
} from '../lib/db';
import { isGuidable, loadGuide } from '../illustrations';
import type { VariationGuide } from '../illustrations';
import FormSheet from '../components/FormSheet';

export interface TodayProps {
  profile: Profile;
}

const DAY_CLASS: Record<string, string> = {
  push: 'is-push',
  legs: 'is-legs',
  pull: 'is-pull',
  core: 'is-core',
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
  // familiarity keyed `${exerciseKey}:${stepIndex}` -> distinct past session count
  const [familiarity, setFamiliarity] = useState<Map<string, number>>(new Map());
  // today's logs keyed by `${exerciseKey}:${setNumber}`
  const [todayLogs, setTodayLogs] = useState<Map<string, SetLog>>(new Map());

  const [floorMode, setFloorModeState] = useState(false);
  const [completedAt, setCompletedAt] = useState<string | null>(null);
  const [bannerShown, setBannerShown] = useState(false);

  const [warmupOpen, setWarmupOpen] = useState(false);
  const [retryHint, setRetryHint] = useState<string | null>(null);
  // Currently open guide sheet (with its lazily-loaded art), or null when closed.
  const [openSheet, setOpenSheet] = useState<{
    ex: Exercise;
    step: number;
    guide: VariationGuide;
  } | null>(null);
  // Initial load finished — gates first-run-only UI so it doesn't flash early.
  const [loaded, setLoaded] = useState(false);
  // Sunday "the week came together" recap sheet.
  const [recapOpen, setRecapOpen] = useState(false);
  // First-ever-session onboarding line, dismissible.
  const [onboardingDismissed, setOnboardingDismissed] = useState(false);

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

        // Adopt an existing session for today if present (don't create one).
        const existing = hist.find((h) => h.session.on_date === todayISO);

        // Familiarity counts strictly PAST sessions: exclude today's session so
        // a mid-session reload after logging doesn't fade a card one early.
        const fam = await fetchFamiliarity(existing?.session.id);
        if (!alive) return;
        setHistory(hist);
        setProgression(prog);
        setFamiliarity(fam);

        // First-ever session (no prior days logged): open the warm-up by default
        // so a first-timer doesn't skip it. Returning users keep it collapsed.
        const hasPriorSession = hist.some((h) => h.session.on_date !== todayISO);
        if (!hasPriorSession) setWarmupOpen(true);

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
        if (alive) setLoaded(true);
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

  // Open the form guide — loads the art chunk on first use, then shows the sheet.
  async function openGuide(ex: Exercise) {
    const step = stepFor(ex);
    const guide = await loadGuide(ex.key, step);
    if (guide) setOpenSheet({ ex, step, guide });
  }

  const dayClass = DAY_CLASS[dayType] ?? 'is-push';

  // First session ever (no prior days logged) — show a one-line orientation.
  const firstEver = loaded && priorHistory.length === 0;
  // Floor day is "done" the moment completion fires in floor mode.
  const floorDone = floorMode && completedAt !== null;
  // Sunday recap is offered once the core day is complete and there's a week to show.
  const recap = useMemo(
    () => (dayType === 'core' && completedAt ? weekRecap(history, todayISO) : null),
    [dayType, completedAt, history, todayISO],
  );

  return (
    <div className={`wrap ${dayClass}`}>
      <DayHeader day={day} date={today} />

      {firstEver && !onboardingDismissed && (
        <OnboardingNote onDismiss={() => setOnboardingDismissed(true)} />
      )}

      <FloorToggle on={floorMode} done={floorDone} onToggle={toggleFloor} />

      <Warmup open={warmupOpen} onToggle={() => setWarmupOpen((o) => !o)} />

      {day.exercises.map((ex, i) => {
        const step = stepFor(ex);
        const fam = familiarity.get(`${ex.key}:${step}`) ?? 0;
        return (
          <ExerciseCard
            key={ex.key}
            ex={ex}
            index={i + 1}
            stepIndex={step}
            familiarity={fam}
            priorHistory={priorHistory}
            todayISO={todayISO}
            todayLogs={todayLogs}
            todayLogsArr={todayLogsArr}
            floorMode={floorMode}
            onLog={handleLog}
            onAdvance={handleAdvance}
            onOpenGuide={() => openGuide(ex)}
          />
        );
      })}

      {retryHint && <p className="err">{retryHint}</p>}

      {bannerShown && (
        <DoneBanner
          floorMode={floorMode}
          recap={recap}
          onOpenRecap={() => setRecapOpen(true)}
        />
      )}

      {recapOpen && recap && (
        <RecapSheet recap={recap} onClose={() => setRecapOpen(false)} />
      )}

      {openSheet && (
        <FormSheet
          exerciseName={openSheet.ex.name}
          variationName={openSheet.ex.path[openSheet.step] ?? openSheet.ex.name}
          guide={openSheet.guide}
          note={openSheet.ex.note}
          onClose={() => setOpenSheet(null)}
        />
      )}
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
function FloorToggle({
  on,
  done,
  onToggle,
}: {
  on: boolean;
  done: boolean;
  onToggle: () => void;
}) {
  // Once a floor session is complete, the toggle becomes a clear "this counted"
  // confirmation — the escape hatch is a believed, valid win, not a half-effort.
  if (done) {
    return (
      <div className="floor-toggle is-done" aria-live="polite">
        <span className="ico">Floor mode</span>
        <p>One round logged — that's a full win. You're done.</p>
        <span className="check" aria-hidden="true">
          ✓
        </span>
      </div>
    );
  }
  return (
    <button
      className="floor-toggle"
      aria-pressed={on}
      onClick={onToggle}
      type="button"
    >
      <span className="ico">Low day?</span>
      <p>One round of the main moves still counts as a win.</p>
      <span className="switch" aria-hidden="true" />
    </button>
  );
}

// ===========================================================================
// First-session orientation (shown once, dismissible)
// ===========================================================================
function OnboardingNote({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="onboard-note" role="note">
      <p>
        Tap a set to log it. One round on a low day still counts — the streak
        never breaks.
      </p>
      <button
        type="button"
        className="onboard-x"
        aria-label="Dismiss"
        onClick={onDismiss}
      >
        ×
      </button>
    </div>
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
  familiarity: number;
  priorHistory: { session: Session; logs: SetLog[] }[];
  todayISO: string;
  todayLogs: Map<string, SetLog>;
  todayLogsArr: SetLog[];
  floorMode: boolean;
  onLog: (ex: Exercise, setNumber: number, value: number) => void;
  onAdvance: (ex: Exercise) => void;
  onOpenGuide: () => void;
}

function ExerciseCard({
  ex,
  index,
  stepIndex,
  familiarity,
  priorHistory,
  todayISO,
  todayLogs,
  todayLogsArr,
  floorMode,
  onLog,
  onAdvance,
  onOpenGuide,
}: ExerciseCardProps) {
  const targets = useMemo(
    () => computeTargets(priorHistory, ex.key, stepIndex, todayISO),
    [priorHistory, ex.key, stepIndex, todayISO],
  );

  const advance = useMemo(
    () => advanceState(todayLogsArr, ex, stepIndex, familiarity),
    [todayLogsArr, ex, stepIndex, familiarity],
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

  // No prior logged numbers at this level → this is the user's first time here,
  // so logging "below target" is meaningless (there is no target to beat yet).
  const firstTimeAtLevel = targetLine === null;

  // Guidability is known synchronously (eager key set); the art + cues load lazily.
  const guidable = isGuidable(ex.key) && stepIndex < ex.path.length;
  const learning = guidable && familiarity < 3;

  // While learning, pull just the first cue (loads the art chunk on demand and
  // pops in shortly after — a progressive enhancement, never blocks the card).
  const [firstCue, setFirstCue] = useState<string | null>(null);
  useEffect(() => {
    if (!learning) {
      setFirstCue(null);
      return;
    }
    let alive = true;
    loadGuide(ex.key, stepIndex).then((g) => {
      if (alive) setFirstCue(g?.cues[0] ?? null);
    });
    return () => {
      alive = false;
    };
  }, [learning, ex.key, stepIndex]);

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

      {learning && firstCue && <p className="inline-cue">{firstCue}</p>}

      <p className="ex-target">
        {targetLine ? (
          <>
            beat <b>{targetLine}</b> {unitLabel}
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
          // Known target → start there; first time at a level → start mid-range
          // (friendlier than anchoring to the bottom of the range).
          const midRange = Math.round((ex.range[0] + ex.range[1]) / 2);
          const defaultVal = target ?? midRange;
          return (
            <SetChip
              key={setNumber}
              setNumber={setNumber}
              unit={unitLabel}
              showUnitOnValue={ex.unit === 'secs'}
              firstTimeAtLevel={firstTimeAtLevel}
              loggedValue={log?.value ?? null}
              target={target}
              defaultValue={defaultVal}
              onConfirm={(v) => onLog(ex, setNumber, v)}
            />
          );
        })}
        {guidable && (
          <button
            type="button"
            className="form-btn"
            onClick={onOpenGuide}
            aria-label={`How to do ${ex.name}`}
          >
            Form
          </button>
        )}
      </div>

      {advance === 'ready' && (
        <div className="levelup">
          <span className="lu-text">
            Level up: <b>{ex.path[stepIndex + 1]}</b> next time
          </span>
          <button type="button" onClick={() => onAdvance(ex)}>
            Level up
          </button>
        </div>
      )}

      {advance === 'gated' && (
        <p className="tenure-gate">
          Top of range — strength's there. Level-up opens after a bit more time
          at this step, giving tendons time to catch up.
        </p>
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
  /** Show the unit next to the logged value (used for timed moves so a "34"
   *  chip can't be mistaken for reps). */
  showUnitOnValue?: boolean;
  /** First time at this level: no prior target, so an under-range log is not a
   *  failure and must read neutral, not celebratory. */
  firstTimeAtLevel?: boolean;
  loggedValue: number | null;
  target: number | null;
  defaultValue: number;
  onConfirm: (value: number) => void;
}

function SetChip({
  setNumber,
  unit,
  showUnitOnValue = false,
  firstTimeAtLevel = false,
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

  // First time at a level there is no target to beat, so a log just reads as
  // "logged" (neutral) — never the celebratory beat/green of a real PR.
  const state =
    loggedValue === null
      ? 'fresh'
      : target === null || firstTimeAtLevel
        ? 'logged'
        : beatState(loggedValue, target);

  // Screen-reader label carries the progress that's otherwise conveyed by color
  // and chip position alone.
  const ariaLabel =
    loggedValue === null
      ? `Set ${setNumber}, not logged — tap to log`
      : `Set ${setNumber}, logged ${loggedValue} ${unit}` +
        (target !== null && !firstTimeAtLevel ? `, last time ${target}` : '') +
        ' — tap to edit';

  return (
    <button
      className={`set-chip ${state}`}
      type="button"
      onClick={start}
      aria-label={ariaLabel}
    >
      {loggedValue !== null ? (
        <>
          {loggedValue}
          {showUnitOnValue && <span className="cu">{unit}</span>}
        </>
      ) : (
        <span className="sn">Set {setNumber}</span>
      )}
    </button>
  );
}

// ===========================================================================
// Completion banner
// ===========================================================================

/** exercise_key -> display name, built once from the program. */
const EXERCISE_NAMES: Record<string, string> = Object.fromEntries(
  Object.values(DAYS).flatMap((d) => d.exercises.map((e) => [e.key, e.name])),
);

interface DoneBannerProps {
  floorMode: boolean;
  /** Present only on a completed Sunday core day. */
  recap: WeekRecap | null;
  onOpenRecap: () => void;
}

function DoneBanner({ floorMode, recap, onOpenRecap }: DoneBannerProps) {
  // Sunday recap variant — the emotional "week came together" moment. Tap-to-open
  // (never auto) so the calm "done" feeling is preserved.
  if (recap) {
    return (
      <button type="button" className="done-banner is-recap" onClick={onOpenRecap}>
        The week came together
        <span className="sub">
          {recap.sessionsCount} of 7 mornings · tap to see your week
        </span>
      </button>
    );
  }

  // Deliberately one clean line — no clock math, no jargon.
  return (
    <div className="done-banner">
      {floorMode ? 'Done — floor logged, that counts' : 'Done — see you tomorrow'}
      <span className="sub">~30g protein with your first meal</span>
    </div>
  );
}

// ===========================================================================
// Sunday recap sheet ("the week came together")
// ===========================================================================
/** One cell per planned (or extra) session: true = trained, false = missed. */
function patternCells(trained: number, planned: number): boolean[] {
  const total = Math.max(planned, trained);
  return Array.from({ length: total }, (_, i) => i < trained);
}

function RecapSheet({
  recap,
  onClose,
}: {
  recap: WeekRecap;
  onClose: () => void;
}) {
  // Body scroll lock + Escape to close (mirrors FormSheet).
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  // Cold-start: a brand-new user has no week to show — say so calmly rather than
  // render a misleading near-empty visual (no science-faking).
  const empty = recap.sessionsCount === 0;

  return (
    <div className="form-sheet-backdrop" onClick={onClose}>
      <div
        className="form-sheet recap-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Your week"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="form-sheet-head">
          <div>
            <div className="form-sheet-kicker">The week</div>
            <h2 className="form-sheet-title">{recap.sessionsCount} of 7 mornings</h2>
          </div>
          <button
            className="form-sheet-x"
            type="button"
            aria-label="Close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {empty ? (
          <p className="recap-empty">
            Log a few sessions and your week will fill in here.
          </p>
        ) : (
          <>
            <ul className="recap-patterns">
              {recap.patterns.map((p) => (
                <li key={p.type}>
                  <span className="rp-name">{p.type}</span>
                  <span className="rp-marks">
                    {patternCells(p.trained, p.planned).map((hit, i) => (
                      <span key={i} className={hit ? 'rp-hit' : 'rp-miss'}>
                        {hit ? '✓' : '·'}
                      </span>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
            <p className="recap-stat">
              <b>{recap.totalSets}</b> sets logged this week
            </p>
            {recap.levelUps.length > 0 && (
              <p className="recap-stat recap-levelups">
                Leveled up:{' '}
                {recap.levelUps
                  .map((l) => EXERCISE_NAMES[l.key] ?? l.key)
                  .join(', ')}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
