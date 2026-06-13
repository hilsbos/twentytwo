import { rotationIndex } from './lib/logic';

/**
 * Static client-side rhythm config — the calendar shape of the week the app
 * reflects. Pure helpers built on logic.ts (one-way edge: logic never imports
 * rhythm, so there is no cycle). Never uses getDay() or new Date(iso) directly;
 * weekday math goes through rotationIndex, date strings through localDateISO.
 *
 * HONESTY BOUNDARY: rhythm describes the SCHEDULE (which mornings are yoga,
 * when the weekend opens). It is calendar truth, knowable without any data.
 * It must NOT feed the calisthenics consistency count — that count stays
 * data-backed (completed sessions only). rhythm only powers the quiet
 * week-position line and the Week strip markers.
 */

/** rotationIndex values (0=Mon..6=Sun) that are ashtanga mornings: Mon/Wed/Sun. */
export const YOGA_DAYS: ReadonlySet<number> = new Set([0, 2, 6]);

/** Weekend boundary: Friday (rotationIndex 4) at 14:30 local. */
export const WEEKEND_START_INDEX = 4; // Friday
export const WEEKEND_START_HOUR = 14;
export const WEEKEND_START_MIN = 30;

export interface WeekPosition {
  /** Full weekday word, e.g. "Friday". */
  weekday: string;
  /** rotationIndex 0..6 (Mon..Sun). */
  index: number;
  /** Today is a scheduled yoga morning (Mon/Wed/Sun). */
  isYogaDay: boolean;
  /** The Fri-14:30 weekend boundary has passed. */
  isWeekendOpen: boolean;
  /** The one-line copy for the Week tab: the weekday word, "· yoga" on yoga
   *  mornings, "Weekend" once the weekend opens. */
  line: string;
}

/** Mon..Sun, indexed by rotationIndex. */
const WEEKDAY_WORDS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;

/** True when d is a scheduled yoga morning. */
export function isYogaDay(d: Date): boolean {
  return YOGA_DAYS.has(rotationIndex(d));
}

/**
 * True once the weekend has begun: Saturday or Sunday outright, or Friday at/after
 * 14:30 local. Reads the clock TIME off the passed Date (the reason this takes a
 * Date, not a YYYY-MM-DD string — a date string cannot carry 14:30).
 */
export function isWeekendOpen(d: Date): boolean {
  const idx = rotationIndex(d);
  if (idx === 5 || idx === 6) return true; // Sat / Sun
  if (idx === WEEKEND_START_INDEX) {
    return (
      d.getHours() > WEEKEND_START_HOUR ||
      (d.getHours() === WEEKEND_START_HOUR && d.getMinutes() >= WEEKEND_START_MIN)
    );
  }
  return false;
}

/**
 * The quiet week-position line for the Week tab — the always-visible answer to
 * "where are we in the week?". ADDITIVE to the /7 consistency count, never a
 * restatement of it (the line is purely positional and carries no number).
 *
 * Minimal, factual copy: the weekday word on its own, a "· yoga" suffix on the
 * Mon/Wed/Sun mornings, and "Weekend" once the Fri-14:30 boundary passes (the
 * open weekend takes precedence over a Sunday yoga suffix).
 *
 * Pure except for reading the passed-in Date — no Date.now() inside, so it is
 * fully testable.
 */
export function weekPosition(now: Date): WeekPosition {
  const index = rotationIndex(now);
  const weekday = WEEKDAY_WORDS[index];
  const yoga = isYogaDay(now);
  const weekendOpen = isWeekendOpen(now);

  let line: string;
  if (weekendOpen) {
    line = 'Weekend';
  } else if (yoga) {
    line = `${weekday} · yoga`;
  } else {
    line = weekday;
  }

  return { weekday, index, isYogaDay: yoga, isWeekendOpen: weekendOpen, line };
}
