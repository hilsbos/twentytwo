import type { VariationGuide } from './types';

import pushup from './pushup';
import pike_pushup from './pike_pushup';
import triceps_press from './triceps_press';
import hollow_hold from './hollow_hold';
import squat from './squat';
import glute_bridge from './glute_bridge';
import reverse_lunge from './reverse_lunge';
import hinge_raises from './hinge_raises';
import row from './row';
import band_pull_apart from './band_pull_apart';
import lat_pulldown from './lat_pulldown';
import curls_plank from './curls_plank';
import dead_bug from './dead_bug';
import pallof_press from './pallof_press';
import side_plank from './side_plank';
import v_tuck_hold from './v_tuck_hold';

export type { VariationGuide } from './types';

/**
 * Every guidable exercise key -> its per-variation guides (index === step_index,
 * matching that key's `path` array in src/program.ts). Warm-up items are
 * intentionally absent (out of scope per the feature spec).
 */
export const GUIDES: Record<string, VariationGuide[]> = {
  pushup,
  pike_pushup,
  triceps_press,
  hollow_hold,
  squat,
  glute_bridge,
  reverse_lunge,
  hinge_raises,
  row,
  band_pull_apart,
  lat_pulldown,
  curls_plank,
  dead_bug,
  pallof_press,
  side_plank,
  v_tuck_hold,
};

/**
 * Returns the guide for an exercise at a given step, or null if the key is not
 * guidable (warm-up) or the step is out of range.
 */
export function guideFor(
  exerciseKey: string,
  stepIndex: number,
): VariationGuide | null {
  const list = GUIDES[exerciseKey];
  if (!list) return null;
  return list[stepIndex] ?? null;
}
