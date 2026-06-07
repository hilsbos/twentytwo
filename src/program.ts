import type { Day, DayType, Exercise } from './types';

/** index 0 = Monday .. 6 = Sunday */
export const ROTATION: DayType[] = [
  'push',
  'legs',
  'pull',
  'push',
  'legs',
  'pull',
  'flex',
];

/** Shown collapsed/small on Today — ~2 min, every day. */
export const WARMUP: string[] = [
  '20 arm circles',
  '15 leg swings / side',
  '10 bodyweight squats',
  '10 scapular push-ups',
  'wrist + ankle rolls',
];

/** Flex-day options (no logged exercises; one "Log today" button). */
export const FLEX_OPTIONS: string[] = [
  'Full yoga session',
  '10-min mobility flow',
  'Walk + stretch',
  'Complete rest',
];

const PUSH: Exercise[] = [
  {
    key: 'pushup',
    name: 'Push-up',
    sets: 3,
    unit: 'reps',
    range: [8, 15],
    path: ['Hands elevated', 'Standard', 'Decline', 'Assisted archer', 'Archer'],
    note: 'Hit the top of your range for 3 sets → move to the next variation. 3-second descent.',
    main: true,
  },
  {
    key: 'pike_pushup',
    name: 'Pike push-up',
    sets: 3,
    unit: 'reps',
    range: [6, 10],
    path: ['Feet on floor', 'Feet elevated', 'Deep pike, head to floor', 'Wall handstand hold', 'Wall HSPU'],
    note: 'Your shoulder builder and the road to a handstand. Wrists cranky? Go to fists or push-up handles.',
    main: true,
  },
  {
    key: 'triceps_press',
    name: 'Triceps press',
    sets: 3,
    unit: 'reps',
    range: [10, 15],
    path: ['Band pushdown', 'Overhead band extension', 'Diamond push-up'],
    note: 'Long band over the door for pushdowns. Same triceps, none of the shoulder strain dips cause.',
    main: true,
  },
  {
    key: 'hollow_hold',
    name: 'Hollow body hold',
    sets: 3,
    unit: 'secs',
    range: [20, 40],
    path: ['Tuck', 'One leg out', 'Full hollow'],
    note: 'Core finisher. If your low back lifts off the floor, regress a step.',
    main: false,
  },
];

const LEGS: Exercise[] = [
  {
    key: 'squat',
    name: 'Squat',
    sets: 3,
    unit: 'reps',
    range: [12, 20],
    path: ['Bodyweight 3s down', 'Pause squat', 'Bulgarian split', 'Pistol progression'],
    note: 'Band above knees, push it out — wakes up the glutes.',
    main: true,
  },
  {
    key: 'glute_bridge',
    name: 'Glute bridge',
    sets: 3,
    unit: 'reps',
    range: [12, 15],
    path: ['Two-leg bridge', 'B-stance bridge', 'Single-leg hip thrust', 'Shoulders elevated'],
    note: 'Count per side from B-stance onward. Band above knees.',
    main: true,
  },
  {
    key: 'reverse_lunge',
    name: 'Reverse lunge',
    sets: 3,
    unit: 'reps',
    range: [10, 12],
    path: ['Reverse lunge', 'Walking lunge', 'Deficit / jump'],
    note: 'Per leg. Control the descent, drive through the heel.',
    main: true,
  },
  {
    key: 'hinge_raises',
    name: 'Banded RDL + leg raises',
    sets: 2,
    unit: 'reps',
    range: [12, 15],
    path: ['Banded RDL + lying leg raises'],
    note: 'Loop band under both feet, hinge at the hips, soft knees - hamstrings load, back stays long. Then 15 lying leg raises.',
    main: false,
  },
];

const PULL: Exercise[] = [
  {
    key: 'row',
    name: 'Horizontal row',
    sets: 3,
    unit: 'reps',
    range: [8, 12],
    path: ['Table row, knees bent', 'Table row, legs straight', 'Feet elevated', 'One-arm'],
    note: 'Lie under a sturdy table, pull chest to the edge, body in one line. Traveling? A towel around a door handle works as a fallback.',
    main: true,
  },
  {
    key: 'band_pull_apart',
    name: 'Band pull-apart / face-pull',
    sets: 3,
    unit: 'reps',
    range: [15, 20],
    path: ['Loop band arms out', 'Anchored face-pull'],
    note: 'Rear delts — the posture muscles a desk destroys. The long band over the door makes the anchored face-pull properly high-to-low.',
    main: true,
  },
  {
    key: 'lat_pulldown',
    name: 'Band lat pulldown',
    sets: 3,
    unit: 'reps',
    range: [10, 15],
    path: ['Tall-kneeling pulldown', 'Straight-arm pulldown', 'One-arm pulldown'],
    note: 'Anchor the long band over the top of a door. The muscle nothing else in this program reaches.',
    main: true,
  },
  {
    key: 'curls_plank',
    name: 'Towel / band curls + plank',
    sets: 3,
    unit: 'secs',
    range: [30, 60],
    path: ['Towel/band curls + plank'],
    note: 'Curls 10–15 + plank 30–60s. Biceps + core. Band curls too easy? Fold the band double.',
    main: false,
  },
];

export const DAYS: Record<DayType, Day> = {
  push: {
    type: 'push',
    title: 'Push day',
    focus:
      'Pressing strength and a fuller chest and shoulders. The band triceps press now replaces dips. Pause 1–2 reps short of failure on every set; lower for a 3-count.',
    exercises: PUSH,
  },
  legs: {
    type: 'legs',
    title: 'Leg day',
    focus:
      'Where your loop band earns its keep. Slow descents, full depth, band above the knees for constant tension.',
    exercises: LEGS,
  },
  pull: {
    type: 'pull',
    title: 'Pull day',
    focus:
      'The one day that needs a setup. Anchor the long band over the top of a door for the lat work and face-pulls; lie under a sturdy table for rows. A doorway bar is still the upgrade that unlocks pull-ups. This is what builds a complete, upright physique.',
    exercises: PULL,
  },
  flex: {
    type: 'flex',
    title: 'Flex day',
    focus:
      'Your call. Slot a yoga session here, do an easy mobility flow, or take the day fully off. Recovery is when the muscle is actually built — not skippable, but flexible.',
    exercises: [],
  },
};

export function dayConfig(type: DayType): Day {
  return DAYS[type];
}
