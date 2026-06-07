import type { ComponentType } from 'react';

/**
 * One guide per exercise variation (one entry per step in an exercise's
 * `path` array in src/program.ts). The array index === step_index.
 *
 * `Art` renders a self-contained <svg> (viewBox "0 0 200 120") with two
 * animated pose groups (class "pose-a" / "pose-b") that crossfade via the
 * `.guide-svg` rules in styles.css. The component is "dumb": it sets classes
 * only and never owns animation state. See CONVENTIONS.md for the exact
 * drawing convention every artist must follow.
 *
 * `cues` is exactly 3 short external-focus coaching cues (<= 6 words each),
 * ordered setup -> drive -> finish. For multi-move panels the 3 cues cover
 * the distinct movements rather than one move's phases.
 *
 * IMPORTANT: `cues[0]` is the HEADLINE cue — the single most important thing to
 * remember for this variation. It is what the card shows inline while the user
 * is still learning (familiarity < 3). Author the array so the first cue is the
 * one you'd keep if you could only give one, then setup -> drive -> finish for
 * the remainder. (The first cue may double as the setup cue when setup is the
 * make-or-break point.)
 */
export interface VariationGuide {
  /**
   * Exactly 3 coaching cues. cues[0] is the headline / most-important cue (shown
   * inline on the card while learning); the full set reads setup -> drive ->
   * finish.
   */
  cues: string[];
  /** The looping 2-pose illustration for this variation. */
  Art: ComponentType;
}
