import type { VariationGuide } from './types';

export type { VariationGuide } from './types';

/**
 * The guidable exercise keys, kept EAGER (tiny) so cards can decide synchronously
 * whether to show a Form button / inline cue without pulling in the heavy art.
 * The registry test asserts this set stays in sync with the actual GUIDES map.
 */
export const GUIDABLE_KEYS: readonly string[] = [
  'pushup',
  'pike_pushup',
  'triceps_press',
  'hollow_hold',
  'squat',
  'glute_bridge',
  'reverse_lunge',
  'hinge_raises',
  'row',
  'band_pull_apart',
  'lat_pulldown',
  'curls_plank',
  'dead_bug',
  'pallof_press',
  'side_plank',
  'v_tuck_hold',
];

const guidableSet = new Set(GUIDABLE_KEYS);

/** Sync check: is there art for this key at all? (Step range is the caller's path length.) */
export function isGuidable(exerciseKey: string): boolean {
  return guidableSet.has(exerciseKey);
}

// The heavy art registry is loaded once, on demand (first form-sheet open).
let cache: Record<string, VariationGuide[]> | null = null;

async function loadGuides(): Promise<Record<string, VariationGuide[]>> {
  if (!cache) {
    const mod = await import('./all');
    cache = mod.GUIDES;
  }
  return cache;
}

/**
 * Async: resolves the guide for an exercise at a step, loading the art chunk on
 * first use. Returns null if the key isn't guidable or the step is out of range.
 */
export async function loadGuide(
  exerciseKey: string,
  stepIndex: number,
): Promise<VariationGuide | null> {
  if (!guidableSet.has(exerciseKey)) return null;
  const guides = await loadGuides();
  return guides[exerciseKey]?.[stepIndex] ?? null;
}
