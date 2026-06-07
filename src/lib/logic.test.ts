import { describe, it, expect } from 'vitest';
import type { Day, Exercise, Session, SetLog } from '../types';
import { DAYS } from '../program';
import {
  localDateISO,
  rotationIndex,
  dayTypeFor,
  targets,
  beatState,
  shouldSuggestAdvance,
  consistency7,
  isSessionComplete,
} from './logic';

// ---------- test fixtures / builders ----------

let _id = 0;
const uid = () => `id-${++_id}`;

function makeSession(on_date: string, over: Partial<Session> = {}): Session {
  return {
    id: uid(),
    user_id: 'u1',
    on_date,
    day_type: 'push',
    floor_mode: false,
    completed_at: null,
    ...over,
  };
}

function makeLog(
  exercise_key: string,
  set_number: number,
  value: number,
  step_index = 0,
  over: Partial<SetLog> = {},
): SetLog {
  return {
    id: uid(),
    session_id: 's1',
    user_id: 'u1',
    exercise_key,
    set_number,
    value,
    step_index,
    ...over,
  };
}

/** A minimal Day with two main exercises and one finisher. */
function makeDay(): Day {
  const ex = (key: string, sets: number, main: boolean): Exercise => ({
    key,
    name: key,
    sets,
    unit: 'reps',
    range: [8, 12],
    path: ['a', 'b', 'c'],
    main,
  });
  return {
    type: 'push',
    title: 'T',
    focus: 'F',
    exercises: [ex('m1', 3, true), ex('m2', 2, true), ex('fin', 3, false)],
  };
}

// ---------- localDateISO ----------

describe('localDateISO', () => {
  it('formats a date as LOCAL YYYY-MM-DD', () => {
    expect(localDateISO(new Date(2026, 5, 6))).toBe('2026-06-06');
  });

  it('zero-pads single-digit month and day', () => {
    expect(localDateISO(new Date(2026, 0, 1))).toBe('2026-01-01');
    expect(localDateISO(new Date(2026, 8, 9))).toBe('2026-09-09');
  });

  it('uses local components, not UTC (would differ from toISOString near midnight)', () => {
    // Late-night local time. toISOString() can roll to the next UTC day in
    // positive-offset zones; localDateISO must stay on the local calendar day.
    const d = new Date(2026, 11, 31, 23, 30, 0); // Dec 31 2026, 23:30 local
    expect(localDateISO(d)).toBe('2026-12-31');
  });

  it('handles end-of-year and double-digit values', () => {
    expect(localDateISO(new Date(2025, 11, 25))).toBe('2025-12-25');
    expect(localDateISO(new Date(2026, 10, 30))).toBe('2026-11-30');
  });
});

// ---------- rotationIndex + dayTypeFor ----------

describe('rotationIndex', () => {
  it('maps Monday=0 .. Sunday=6', () => {
    // 2026-06-01 is a Monday.
    expect(rotationIndex(new Date(2026, 5, 1))).toBe(0); // Mon
    expect(rotationIndex(new Date(2026, 5, 2))).toBe(1); // Tue
    expect(rotationIndex(new Date(2026, 5, 3))).toBe(2); // Wed
    expect(rotationIndex(new Date(2026, 5, 4))).toBe(3); // Thu
    expect(rotationIndex(new Date(2026, 5, 5))).toBe(4); // Fri
    expect(rotationIndex(new Date(2026, 5, 6))).toBe(5); // Sat
    expect(rotationIndex(new Date(2026, 5, 7))).toBe(6); // Sun
  });
});

describe('dayTypeFor', () => {
  it('returns the rotation type for each weekday', () => {
    expect(dayTypeFor(new Date(2026, 5, 1))).toBe('push'); // Mon
    expect(dayTypeFor(new Date(2026, 5, 2))).toBe('legs'); // Tue
    expect(dayTypeFor(new Date(2026, 5, 3))).toBe('pull'); // Wed
    expect(dayTypeFor(new Date(2026, 5, 4))).toBe('push'); // Thu
    expect(dayTypeFor(new Date(2026, 5, 5))).toBe('legs'); // Fri
    expect(dayTypeFor(new Date(2026, 5, 6))).toBe('pull'); // Sat
  });

  it('Sunday is core', () => {
    expect(dayTypeFor(new Date(2026, 5, 7))).toBe('core'); // Sun
  });
});

// ---------- targets ----------

describe('targets', () => {
  const today = '2026-06-10';

  it('returns all-empty when there is no history', () => {
    expect(targets([], 'pushup', 0, today)).toEqual([]);
  });

  it('returns per-set values from the only prior session', () => {
    const history = [
      {
        session: makeSession('2026-06-08'),
        logs: [
          makeLog('pushup', 1, 11, 0),
          makeLog('pushup', 2, 10, 0),
          makeLog('pushup', 3, 9, 0),
        ],
      },
    ];
    expect(targets(history, 'pushup', 0, today)).toEqual([11, 10, 9]);
  });

  it('picks the MOST RECENT prior session', () => {
    const history = [
      {
        session: makeSession('2026-06-05'),
        logs: [makeLog('pushup', 1, 5, 0), makeLog('pushup', 2, 5, 0)],
      },
      {
        session: makeSession('2026-06-09'),
        logs: [makeLog('pushup', 1, 12, 0), makeLog('pushup', 2, 11, 0)],
      },
      {
        session: makeSession('2026-06-07'),
        logs: [makeLog('pushup', 1, 8, 0), makeLog('pushup', 2, 8, 0)],
      },
    ];
    // Most recent (2026-06-09) wins regardless of array order.
    expect(targets(history, 'pushup', 0, today)).toEqual([12, 11]);
  });

  it('ignores today and future sessions (strictly before today)', () => {
    const history = [
      {
        session: makeSession(today), // today — must be ignored
        logs: [makeLog('pushup', 1, 99, 0)],
      },
      {
        session: makeSession('2026-06-12'), // future — ignored
        logs: [makeLog('pushup', 1, 50, 0)],
      },
      {
        session: makeSession('2026-06-08'),
        logs: [makeLog('pushup', 1, 11, 0)],
      },
    ];
    expect(targets(history, 'pushup', 0, today)).toEqual([11]);
  });

  it('only matches the SAME stepIndex', () => {
    const history = [
      {
        session: makeSession('2026-06-09'),
        logs: [makeLog('pushup', 1, 20, 1)], // step 1 only
      },
      {
        session: makeSession('2026-06-08'),
        logs: [makeLog('pushup', 1, 11, 0)], // step 0
      },
    ];
    // Querying step 0 must skip the step-1 session even though it is more recent.
    expect(targets(history, 'pushup', 0, today)).toEqual([11]);
  });

  it('returns all-empty when the requested step has no prior logs (fresh level)', () => {
    const history = [
      {
        session: makeSession('2026-06-08'),
        logs: [makeLog('pushup', 1, 11, 0)], // only step 0 exists
      },
    ];
    expect(targets(history, 'pushup', 2, today)).toEqual([]);
  });

  it('fills missing sets with null', () => {
    const history = [
      {
        session: makeSession('2026-06-08'),
        logs: [
          makeLog('pushup', 1, 11, 0),
          // set 2 missing
          makeLog('pushup', 3, 9, 0),
        ],
      },
    ];
    expect(targets(history, 'pushup', 0, today)).toEqual([11, null, 9]);
  });

  it('only matches the requested exercise key', () => {
    const history = [
      {
        session: makeSession('2026-06-08'),
        logs: [makeLog('squat', 1, 18, 0), makeLog('pushup', 1, 11, 0)],
      },
    ];
    expect(targets(history, 'pushup', 0, today)).toEqual([11]);
  });

  it('skips a more-recent session lacking the key and uses the older one', () => {
    const history = [
      {
        session: makeSession('2026-06-09'),
        logs: [makeLog('squat', 1, 18, 0)], // no pushup
      },
      {
        session: makeSession('2026-06-07'),
        logs: [makeLog('pushup', 1, 11, 0), makeLog('pushup', 2, 10, 0)],
      },
    ];
    expect(targets(history, 'pushup', 0, today)).toEqual([11, 10]);
  });
});

// ---------- beatState ----------

describe('beatState', () => {
  it('fresh when target is null', () => {
    expect(beatState(10, null)).toBe('fresh');
    expect(beatState(0, null)).toBe('fresh');
  });

  it('beat when value > target', () => {
    expect(beatState(12, 11)).toBe('beat');
    expect(beatState(1, 0)).toBe('beat');
  });

  it('met when value === target (boundary)', () => {
    expect(beatState(11, 11)).toBe('met');
    expect(beatState(0, 0)).toBe('met');
  });

  it('under when value < target', () => {
    expect(beatState(10, 11)).toBe('under');
    expect(beatState(0, 1)).toBe('under');
  });
});

// ---------- shouldSuggestAdvance ----------

describe('shouldSuggestAdvance', () => {
  const ex: Exercise = {
    key: 'pushup',
    name: 'Push-up',
    sets: 3,
    unit: 'reps',
    range: [8, 15],
    path: ['Hands elevated', 'Standard', 'Diamond'], // 3 steps, last index = 2
    main: true,
  };

  it('true when all sets are at >= max at this step and a next step exists', () => {
    const logs = [
      makeLog('pushup', 1, 15, 0),
      makeLog('pushup', 2, 16, 0), // above max also qualifies
      makeLog('pushup', 3, 15, 0),
    ];
    expect(shouldSuggestAdvance(logs, ex, 0, 6)).toBe(true);
  });

  it('false when one set is below max', () => {
    const logs = [
      makeLog('pushup', 1, 15, 0),
      makeLog('pushup', 2, 14, 0), // below max
      makeLog('pushup', 3, 15, 0),
    ];
    expect(shouldSuggestAdvance(logs, ex, 0, 6)).toBe(false);
  });

  it('false when not all sets are logged (incomplete)', () => {
    const logs = [
      makeLog('pushup', 1, 15, 0),
      makeLog('pushup', 2, 15, 0),
      // set 3 missing
    ];
    expect(shouldSuggestAdvance(logs, ex, 0, 6)).toBe(false);
  });

  it('never suggests on the last step', () => {
    const logs = [
      makeLog('pushup', 1, 15, 2),
      makeLog('pushup', 2, 15, 2),
      makeLog('pushup', 3, 15, 2),
    ];
    expect(shouldSuggestAdvance(logs, ex, 2, 6)).toBe(false);
  });

  it('only counts logs at the queried stepIndex', () => {
    const logs = [
      // maxed-out, but at the wrong step
      makeLog('pushup', 1, 15, 1),
      makeLog('pushup', 2, 15, 1),
      makeLog('pushup', 3, 15, 1),
      // current step under-logged
      makeLog('pushup', 1, 15, 0),
    ];
    expect(shouldSuggestAdvance(logs, ex, 0, 6)).toBe(false);
  });

  it('ignores other exercises', () => {
    const logs = [
      makeLog('pushup', 1, 15, 0),
      makeLog('pushup', 2, 15, 0),
      makeLog('pushup', 3, 15, 0),
      makeLog('squat', 1, 1, 0),
    ];
    expect(shouldSuggestAdvance(logs, ex, 0, 6)).toBe(true);
  });

  it('handles a duplicate set number gracefully (still requires all distinct sets)', () => {
    const logs = [
      makeLog('pushup', 1, 15, 0),
      makeLog('pushup', 1, 15, 0), // duplicate set 1
      makeLog('pushup', 2, 15, 0),
      // set 3 still missing
    ];
    expect(shouldSuggestAdvance(logs, ex, 0, 6)).toBe(false);
  });

  // ---- tenure gate (sessionsAtStep) ----
  const maxed = [
    makeLog('pushup', 1, 15, 0),
    makeLog('pushup', 2, 15, 0),
    makeLog('pushup', 3, 15, 0),
  ];

  it('false at the tenure boundary below the gate (5 sessions = no)', () => {
    expect(shouldSuggestAdvance(maxed, ex, 0, 5)).toBe(false);
  });

  it('true at the tenure boundary on the gate (6 sessions = yes)', () => {
    expect(shouldSuggestAdvance(maxed, ex, 0, 6)).toBe(true);
  });

  it('false with zero tenure even when reps are maxed', () => {
    expect(shouldSuggestAdvance(maxed, ex, 0, 0)).toBe(false);
  });

  it('true with ample tenure', () => {
    expect(shouldSuggestAdvance(maxed, ex, 0, 12)).toBe(true);
  });
});

// ---------- consistency7 ----------

describe('consistency7', () => {
  const today = '2026-06-10'; // Wednesday

  it('returns 7 days, today inclusive and last', () => {
    const { days } = consistency7([], today);
    expect(days).toHaveLength(7);
    expect(days[6].date).toBe('2026-06-10');
    expect(days[0].date).toBe('2026-06-04');
  });

  it('counts zero when no sessions', () => {
    const { count, days } = consistency7([], today);
    expect(count).toBe(0);
    expect(days.every((d) => !d.trained)).toBe(true);
  });

  it('marks trained days and counts them', () => {
    const sessions = [
      makeSession('2026-06-10'),
      makeSession('2026-06-08'),
      makeSession('2026-06-04'),
    ];
    const { count, days } = consistency7(sessions, today);
    expect(count).toBe(3);
    expect(days.find((d) => d.date === '2026-06-10')?.trained).toBe(true);
    expect(days.find((d) => d.date === '2026-06-08')?.trained).toBe(true);
    expect(days.find((d) => d.date === '2026-06-04')?.trained).toBe(true);
    expect(days.find((d) => d.date === '2026-06-09')?.trained).toBe(false);
  });

  it('counts duplicate same-day sessions only once', () => {
    const sessions = [
      makeSession('2026-06-10'),
      makeSession('2026-06-10', { id: 'dupe' }),
    ];
    const { count } = consistency7(sessions, today);
    expect(count).toBe(1);
  });

  it('excludes sessions outside the rolling 7-day window', () => {
    const sessions = [
      makeSession('2026-06-03'), // 1 day before window start
      makeSession('2026-06-11'), // tomorrow (after today)
      makeSession('2026-06-04'), // earliest in-window day
    ];
    const { count, days } = consistency7(sessions, today);
    expect(count).toBe(1);
    expect(days.find((d) => d.date === '2026-06-04')?.trained).toBe(true);
    // out-of-window dates are not present at all
    expect(days.find((d) => d.date === '2026-06-03')).toBeUndefined();
    expect(days.find((d) => d.date === '2026-06-11')).toBeUndefined();
  });

  it('today on the window edge counts', () => {
    const { days } = consistency7([makeSession(today)], today);
    expect(days[6].trained).toBe(true);
  });

  it('window crosses a month boundary correctly', () => {
    const { days } = consistency7([], '2026-07-02');
    expect(days[0].date).toBe('2026-06-26');
    expect(days[6].date).toBe('2026-07-02');
  });
});

// ---------- isSessionComplete ----------

describe('isSessionComplete', () => {
  const day = makeDay(); // mains: m1(3 sets), m2(2 sets); finisher: fin(3 sets)

  it('full: complete when every MAIN has all its sets, ignoring finishers', () => {
    const logs = [
      makeLog('m1', 1, 1),
      makeLog('m1', 2, 1),
      makeLog('m1', 3, 1),
      makeLog('m2', 1, 1),
      makeLog('m2', 2, 1),
      // finisher fin not logged at all — should not matter
    ];
    expect(isSessionComplete(logs, day, false)).toBe(true);
  });

  it('full: incomplete when a main is missing a set', () => {
    const logs = [
      makeLog('m1', 1, 1),
      makeLog('m1', 2, 1),
      // m1 set 3 missing
      makeLog('m2', 1, 1),
      makeLog('m2', 2, 1),
    ];
    expect(isSessionComplete(logs, day, false)).toBe(false);
  });

  it('full: incomplete when a whole main exercise is missing', () => {
    const logs = [
      makeLog('m1', 1, 1),
      makeLog('m1', 2, 1),
      makeLog('m1', 3, 1),
      // m2 entirely missing
    ];
    expect(isSessionComplete(logs, day, false)).toBe(false);
  });

  it('floor: complete when every main has at least one set', () => {
    const logs = [makeLog('m1', 1, 1), makeLog('m2', 1, 1)];
    expect(isSessionComplete(logs, day, true)).toBe(true);
  });

  it('floor: incomplete when a main has zero sets', () => {
    const logs = [makeLog('m1', 1, 1)]; // m2 has none
    expect(isSessionComplete(logs, day, true)).toBe(false);
  });

  it('floor: a finisher being logged does not satisfy a missing main', () => {
    const logs = [makeLog('m1', 1, 1), makeLog('fin', 1, 1)];
    expect(isSessionComplete(logs, day, true)).toBe(false);
  });

  it('works against the real core-day config (full)', () => {
    const core = DAYS.core;
    const logs: SetLog[] = [];
    for (const ex of core.exercises.filter((e) => e.main)) {
      for (let s = 1; s <= ex.sets; s++) logs.push(makeLog(ex.key, s, 10));
    }
    expect(isSessionComplete(logs, core, false)).toBe(true);
  });

  it('works against the real push-day config (full)', () => {
    const push = DAYS.push;
    const logs: SetLog[] = [];
    for (const ex of push.exercises.filter((e) => e.main)) {
      for (let s = 1; s <= ex.sets; s++) logs.push(makeLog(ex.key, s, 10));
    }
    expect(isSessionComplete(logs, push, false)).toBe(true);
  });
});
