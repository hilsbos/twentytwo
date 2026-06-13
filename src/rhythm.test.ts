import { describe, it, expect } from 'vitest';
import {
  YOGA_DAYS,
  WEEKEND_START_INDEX,
  WEEKEND_START_HOUR,
  WEEKEND_START_MIN,
  isYogaDay,
  isWeekendOpen,
  weekPosition,
} from './rhythm';

// Reference week: 2026-06-01 is a Monday (asserted in logic.test.ts).
//   Mon 06-01, Tue 06-02, Wed 06-03, Thu 06-04, Fri 06-05, Sat 06-06, Sun 06-07
const MON = (h = 8, m = 0) => new Date(2026, 5, 1, h, m);
const TUE = (h = 8, m = 0) => new Date(2026, 5, 2, h, m);
const WED = (h = 8, m = 0) => new Date(2026, 5, 3, h, m);
const THU = (h = 8, m = 0) => new Date(2026, 5, 4, h, m);
const FRI = (h = 8, m = 0) => new Date(2026, 5, 5, h, m);
const SAT = (h = 8, m = 0) => new Date(2026, 5, 6, h, m);
const SUN = (h = 8, m = 0) => new Date(2026, 5, 7, h, m);

describe('YOGA_DAYS + WEEKEND_* constants', () => {
  it('yoga days are Mon(0)/Wed(2)/Sun(6) — the single source of truth', () => {
    expect([...YOGA_DAYS].sort()).toEqual([0, 2, 6]);
  });

  it('weekend boundary constants are Friday 14:30', () => {
    expect(WEEKEND_START_INDEX).toBe(4); // Friday
    expect(WEEKEND_START_HOUR).toBe(14);
    expect(WEEKEND_START_MIN).toBe(30);
  });
});

describe('isYogaDay', () => {
  it('true on Mon/Wed/Sun', () => {
    expect(isYogaDay(MON())).toBe(true);
    expect(isYogaDay(WED())).toBe(true);
    expect(isYogaDay(SUN())).toBe(true);
  });

  it('false on Tue/Thu/Fri/Sat', () => {
    expect(isYogaDay(TUE())).toBe(false);
    expect(isYogaDay(THU())).toBe(false);
    expect(isYogaDay(FRI())).toBe(false);
    expect(isYogaDay(SAT())).toBe(false);
  });

  it('is time-of-day independent (yoga is a calendar day, not an hour)', () => {
    expect(isYogaDay(WED(0, 1))).toBe(true);
    expect(isYogaDay(WED(23, 59))).toBe(true);
  });
});

describe('isWeekendOpen', () => {
  it('false Monday through Thursday all day', () => {
    expect(isWeekendOpen(MON(23, 59))).toBe(false);
    expect(isWeekendOpen(TUE())).toBe(false);
    expect(isWeekendOpen(WED())).toBe(false);
    expect(isWeekendOpen(THU(23, 59))).toBe(false);
  });

  it('false on Friday before 14:30', () => {
    expect(isWeekendOpen(FRI(0, 0))).toBe(false);
    expect(isWeekendOpen(FRI(14, 0))).toBe(false);
    expect(isWeekendOpen(FRI(14, 29))).toBe(false);
  });

  it('true on Friday at exactly 14:30 (boundary inclusive)', () => {
    expect(isWeekendOpen(FRI(14, 30))).toBe(true);
  });

  it('true on Friday after 14:30', () => {
    expect(isWeekendOpen(FRI(14, 31))).toBe(true);
    expect(isWeekendOpen(FRI(18, 0))).toBe(true);
  });

  it('true all of Saturday and Sunday', () => {
    expect(isWeekendOpen(SAT(0, 0))).toBe(true);
    expect(isWeekendOpen(SUN(23, 59))).toBe(true);
  });
});

describe('weekPosition', () => {
  it('returns weekday word and rotation index', () => {
    expect(weekPosition(TUE()).weekday).toBe('Tuesday');
    expect(weekPosition(TUE()).index).toBe(1);
    expect(weekPosition(FRI(8)).weekday).toBe('Friday');
    expect(weekPosition(FRI(8)).index).toBe(4);
  });

  it('flags yoga days and weekend-open in the returned shape', () => {
    const wed = weekPosition(WED());
    expect(wed.isYogaDay).toBe(true);
    expect(wed.isWeekendOpen).toBe(false);

    const friLate = weekPosition(FRI(15, 0));
    expect(friLate.isYogaDay).toBe(false);
    expect(friLate.isWeekendOpen).toBe(true);
  });

  it('a plain weekday line is just the weekday word', () => {
    expect(weekPosition(TUE()).line).toBe('Tuesday');
    expect(weekPosition(THU()).line).toBe('Thursday');
  });

  it('a non-yoga early-Friday line is just the weekday word', () => {
    expect(weekPosition(FRI(8, 0)).line).toBe('Friday');
  });

  it('yoga mornings carry a "· yoga" suffix (Mon/Wed)', () => {
    expect(weekPosition(MON()).line).toBe('Monday · yoga');
    expect(weekPosition(WED(8)).line).toBe('Wednesday · yoga');
  });

  it('once the weekend opens the line is just "Weekend"', () => {
    expect(weekPosition(FRI(14, 30)).line).toBe('Weekend');
    expect(weekPosition(SAT()).line).toBe('Weekend');
  });

  it('Sunday is a yoga day, but the open weekend takes precedence in the line', () => {
    const sun = weekPosition(SUN());
    expect(sun.isYogaDay).toBe(true);
    expect(sun.isWeekendOpen).toBe(true);
    expect(sun.line).toBe('Weekend');
  });

  it('the line is purely positional and never carries a number (additive to the /7 count)', () => {
    for (const d of [MON(), TUE(), WED(), THU(), FRI(8), FRI(15), SAT(), SUN()]) {
      expect(weekPosition(d).line).not.toMatch(/\d/);
    }
  });

  it('is pure: same Date in, same shape out, no Date.now() dependence', () => {
    const d = WED(7, 15);
    expect(weekPosition(d)).toEqual(weekPosition(d));
  });
});
