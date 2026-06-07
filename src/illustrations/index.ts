import type { VariationGuide } from './types';

import pushup from './pushup';
import pike_pushup from './pike_pushup';
import chair_dips from './chair_dips';
import hollow_hold from './hollow_hold';
import squat from './squat';
import glute_bridge from './glute_bridge';
import reverse_lunge from './reverse_lunge';
import band_walks from './band_walks';
import row from './row';
import band_pull_apart from './band_pull_apart';
import superman_ytw from './superman_ytw';
import curls_plank from './curls_plank';

export type { VariationGuide } from './types';

/**
 * Every guidable exercise key -> its per-variation guides (index === step_index,
 * matching that key's `path` array in src/program.ts). Warm-up and flex items
 * are intentionally absent (out of scope per the feature spec).
 */
export const GUIDES: Record<string, VariationGuide[]> = {
  pushup,
  pike_pushup,
  chair_dips,
  hollow_hold,
  squat,
  glute_bridge,
  reverse_lunge,
  band_walks,
  row,
  band_pull_apart,
  superman_ytw,
  curls_plank,
};

/**
 * Returns the guide for an exercise at a given step, or null if the key is not
 * guidable (warm-up / flex) or the step is out of range.
 */
export function guideFor(
  exerciseKey: string,
  stepIndex: number,
): VariationGuide | null {
  const list = GUIDES[exerciseKey];
  if (!list) return null;
  return list[stepIndex] ?? null;
}
