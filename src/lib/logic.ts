import type { Day, DayType, Exercise, Session, SetLog } from '../types';
import { ROTATION } from '../program';

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

/**
 * True when all of ex.sets sets are logged today at this stepIndex with
 * value >= range[1], there is a next step to advance to, AND the user has
 * enough tenure at this step (sessionsAtStep >= 6, ~3 weeks at 2x/week).
 *
 * The tenure gate exists because tendon/connective tissue adapts 2-3 months
 * slower than muscle; we hold a level until the joints have caught up even
 * when the rep target is already met.
 */
export function shouldSuggestAdvance(
  todayLogs: SetLog[],
  ex: Exercise,
  stepIndex: number,
  sessionsAtStep: number,
): boolean {
  if (stepIndex >= ex.path.length - 1) return false;
  if (sessionsAtStep < 6) return false;

  const max = ex.range[1];
  const logged = new Map<number, SetLog>();
  for (const l of todayLogs) {
    if (l.exercise_key !== ex.key) continue;
    if (l.step_index !== stepIndex) continue;
    logged.set(l.set_number, l);
  }
  if (logged.size < ex.sets) return false;

  for (let s = 1; s <= ex.sets; s++) {
    const l = logged.get(s);
    if (!l || l.value < max) return false;
  }
  return true;
}

/**
 * Last 7 calendar days inclusive of today. count = distinct on_date with a session.
 */
export function consistency7(
  sessions: Session[],
  todayISO: string,
): { count: number; days: { date: string; trained: boolean }[] } {
  const trainedDates = new Set(sessions.map((s) => s.on_date));
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

/** Parse a YYYY-MM-DD string into a LOCAL Date (avoids UTC shift of new Date(str)). */
function parseISO(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}
