import type { VariationGuide } from './types';

// path: ['Tuck', 'One leg out', 'Full hollow']
// All three are the supine hollow-body HOLD; the legs are the distinguishing
// feature (Tuck = both knees tucked over the hips; One-leg = one leg punched
// out straight + one tucked; Full = both legs long and reaching).
//
// HOLD PATTERN (matches v_tuck_hold, side_plank — the codebase's hold convention):
// BOTH poses are a held dish floating OFF the floor (never lying flat). The two
// poses differ only slightly — pose-a is a SHALLOW dish (looser, ends floating
// just off the floor, less banana), pose-b is the TARGET dish (deeper banana,
// ends reaching longer but still floating). The small delta reads as "holding
// still and bracing harder", not as a sit-up rep that travels. A hold/clock glyph
// (not a directional travel arrow) marks the stillness. Side profile, head to the
// right, feet to the left. Per CONVENTIONS.md line 193 the hollow = "arms & legs
// off floor" — in BOTH poses.

/** Small hold/clock glyph — the same stillness marker used on the forearm plank
 *  in curls_plank. Static scenery; signals "hold, don't travel". */
function HoldClock({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g opacity={0.6}>
      <circle cx={cx} cy={cy} r={6} strokeWidth={1.5} />
      <path d={`M ${cx} ${cy} L ${cx} ${cy - 4}`} strokeWidth={1.5} />
      <path d={`M ${cx} ${cy} L ${cx + 3} ${cy + 2}`} strokeWidth={1.5} />
    </g>
  );
}

/**
 * Tuck hollow hold. Distinguishing feature: BOTH knees bent and tucked up over
 * the hips (the easiest, most compact shape). Held off the floor in both poses;
 * pose-a is a looser/shallower tuck, pose-b a tighter/deeper tuck.
 *
 * Built on the SAME supine skeleton as One-leg/Full (head right, arms reaching
 * OVERHEAD up-right past the head, hip floated at y=100 so it is NOT the low
 * point) — only the legs change: instead of reaching long-left, both knees pull
 * up over the hips. The two legs are drawn as two PARALLEL inverted-V knees
 * (thigh up to a knee apex, shin folding back down-left), offset so they read as
 * two stacked tucked legs rather than fanning into a leftward W or jackknife.
 * This keeps the orientation unmistakably supine, matching the cue
 * "Press low back to floor".
 */
function TuckHollowArt() {
  return (
    <svg
      viewBox="0 0 200 120"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* ground */}
      <line x1={15} y1={110} x2={185} y2={110} opacity={0.25} strokeWidth={1.5} />

      {/* hold/clock glyph — this is a still hold, not a lift */}
      <HoldClock cx={100} cy={66} />

      {/* =================================================================
          POSE A — SHALLOW tuck dish: floated off the floor, looser/shallower.
          Supine: arms reach OVERHEAD up-right past the head; both knees pulled up
          over the hips as two parallel inverted-V tucked legs.
          ================================================================= */}
      <g className="pose-a">
        {/* arms reaching overhead, up-right past the head (floated off the floor) */}
        <line x1={119} y1={92} x2={135} y2={90} />
        <line x1={135} y1={90} x2={150} y2={89} />
        {/* torso shoulder -> hip (hip floated, NOT the low point) */}
        <line x1={119} y1={92} x2={100} y2={100} />
        {/* neck + head (offset up-right, clear of the arm line) */}
        <line x1={119} y1={92} x2={126} y2={89} />
        <circle cx={132} cy={86} r={7} />
        {/* FAR tucked leg (higher/behind): thigh up to knee, shin folds down-left */}
        <line x1={100} y1={100} x2={89} y2={82} />
        <line x1={89} y1={82} x2={80} y2={90} />
        {/* NEAR tucked leg (lower/front, offset): parallel inverted-V — two knees */}
        <line x1={100} y1={100} x2={93} y2={86} />
        <line x1={93} y1={86} x2={84} y2={94} />
        <circle cx={119} cy={92} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={100} cy={100} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={89} cy={82} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={93} cy={86} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* =================================================================
          POSE B — TARGET tuck dish: same shape held DEEPER — shoulders lifted a
          touch more, both knees pulled tighter/higher over the hips. Small delta.
          ================================================================= */}
      <g className="pose-b">
        {/* arms reaching overhead, up-right past the head */}
        <line x1={118} y1={88} x2={134} y2={86} />
        <line x1={134} y1={86} x2={150} y2={85} />
        {/* torso shoulder -> hip (hip floated, NOT the low point) */}
        <line x1={118} y1={88} x2={100} y2={100} />
        {/* neck + head (offset up-right, clear of the arm line) */}
        <line x1={118} y1={88} x2={125} y2={85} />
        <circle cx={131} cy={82} r={7} />
        {/* FAR tucked leg pulled higher/tighter (inverted-V) */}
        <line x1={100} y1={100} x2={90} y2={79} />
        <line x1={90} y1={79} x2={81} y2={87} />
        {/* NEAR tucked leg pulled higher/tighter (parallel inverted-V — two knees) */}
        <line x1={100} y1={100} x2={94} y2={83} />
        <line x1={94} y1={83} x2={85} y2={91} />
        <circle cx={118} cy={88} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={100} cy={100} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={90} cy={79} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={94} cy={83} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * One-leg-out hollow hold. Distinguishing feature: ONE leg punched out straight
 * and floated low, the OTHER knee tucked up (the half-way progression). Held off
 * the floor in both poses; pose-a is shallower, pose-b the deeper held dish.
 */
function OneLegHollowArt() {
  return (
    <svg
      viewBox="0 0 200 120"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* ground */}
      <line x1={15} y1={110} x2={185} y2={110} opacity={0.25} strokeWidth={1.5} />

      {/* hold/clock glyph — this is a still hold, not a lift */}
      <HoldClock cx={100} cy={66} />

      {/* =================================================================
          POSE A — SHALLOW dish: floated off the floor, looser. One leg extended
          (floated low), the other knee tucked; shoulders only barely lifted.
          ================================================================= */}
      <g className="pose-a">
        {/* arms overhead, floated just off the floor */}
        <line x1={119} y1={96} x2={135} y2={93} />
        <line x1={135} y1={93} x2={150} y2={91} />
        {/* torso shoulder -> hip (shallow) */}
        <line x1={119} y1={96} x2={100} y2={104} />
        {/* neck + head (offset up-right, clear of the arm line) */}
        <line x1={119} y1={96} x2={126} y2={93} />
        <circle cx={132} cy={90} r={7} />
        {/* TUCKED leg: knee up, shin folded back over the hip */}
        <line x1={100} y1={104} x2={95} y2={92} />
        <line x1={95} y1={92} x2={85} y2={96} />
        {/* EXTENDED leg: straight, floated low, reaching far left (still off floor) */}
        <line x1={100} y1={104} x2={80} y2={102} />
        <line x1={80} y1={102} x2={60} y2={101} />
        <line x1={60} y1={101} x2={54} y2={96} />
        <circle cx={119} cy={96} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={100} cy={104} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={95} cy={92} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={80} cy={102} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* =================================================================
          POSE B — TARGET dish: same shape held DEEPER — shoulders lifted a touch
          more, the extended leg reaches longer/lower, tucked knee pulled tighter.
          ================================================================= */}
      <g className="pose-b">
        {/* arms overhead, floated off the floor */}
        <line x1={118} y1={91} x2={134} y2={87} />
        <line x1={134} y1={87} x2={150} y2={84} />
        {/* torso shoulder -> hip */}
        <line x1={118} y1={91} x2={100} y2={104} />
        {/* neck + head (offset up-right, clear of the arm line) */}
        <line x1={118} y1={91} x2={125} y2={88} />
        <circle cx={131} cy={85} r={7} />
        {/* TUCKED leg: knee pulled higher/tighter, shin folded back */}
        <line x1={100} y1={104} x2={95} y2={85} />
        <line x1={95} y1={85} x2={84} y2={89} />
        {/* EXTENDED leg: straight, reaching longer and a touch lower (still off floor) */}
        <line x1={100} y1={104} x2={80} y2={100} />
        <line x1={80} y1={100} x2={59} y2={97} />
        <line x1={59} y1={97} x2={53} y2={92} />
        <circle cx={118} cy={91} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={100} cy={104} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={95} cy={85} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={80} cy={100} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Full hollow hold. Distinguishing feature: BOTH legs extended straight and
 * floated off the floor, forming the banana/dish with the low back pressed down
 * (the full progression). Held off the floor in both poses; pose-a is a shallow
 * banana, pose-b the deeper target banana — a small settle/tighten between them.
 */
function FullHollowArt() {
  return (
    <svg
      viewBox="0 0 200 120"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* ground */}
      <line x1={15} y1={110} x2={185} y2={110} opacity={0.25} strokeWidth={1.5} />

      {/* hold/clock glyph — this is a still hold, not a lift */}
      <HoldClock cx={100} cy={64} />

      {/* =================================================================
          POSE A — SHALLOW banana: floated off the floor, looser/shallower dish.
          Arms and both straight legs float just off the floor; gentle banana.
          ================================================================= */}
      <g className="pose-a">
        {/* arms reaching overhead, floated just off the floor */}
        <line x1={119} y1={96} x2={135} y2={93} />
        <line x1={135} y1={93} x2={151} y2={91} />
        {/* torso shoulder -> hip (shallow) */}
        <line x1={119} y1={96} x2={100} y2={104} />
        {/* neck + head (offset up-right, clear of the arm line) */}
        <line x1={119} y1={96} x2={126} y2={93} />
        <circle cx={132} cy={90} r={7} />
        {/* both legs straight, floated just off the floor — shallow banana */}
        <line x1={100} y1={104} x2={82} y2={101} />
        <line x1={82} y1={101} x2={64} y2={98} />
        <line x1={64} y1={98} x2={58} y2={92} />
        <circle cx={119} cy={96} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={100} cy={104} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={82} cy={101} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* =================================================================
          POSE B — TARGET banana: same shape held DEEPER — shoulders and legs
          reach longer and float a touch higher, a tighter banana. Small delta.
          ================================================================= */}
      <g className="pose-b">
        {/* arms reaching overhead, floated off the floor */}
        <line x1={118} y1={90} x2={134} y2={86} />
        <line x1={134} y1={86} x2={150} y2={83} />
        {/* torso shoulder -> hip */}
        <line x1={118} y1={90} x2={100} y2={104} />
        {/* neck + head (offset up-right, clear of the arm line) */}
        <line x1={118} y1={90} x2={125} y2={87} />
        <circle cx={131} cy={84} r={7} />
        {/* both legs straight, reaching longer and floating higher — tighter banana */}
        <line x1={100} y1={104} x2={82} y2={97} />
        <line x1={82} y1={97} x2={64} y2={90} />
        <line x1={64} y1={90} x2={58} y2={84} />
        <circle cx={118} cy={90} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={100} cy={104} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={82} cy={97} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

const guides: VariationGuide[] = [
  {
    // 0 Tuck
    cues: ['Press low back to floor', 'Hug both knees over hips', 'Hold still, breathe slow'],
    Art: TuckHollowArt,
  },
  {
    // 1 One leg out
    cues: ['Press low back to floor', 'Punch one heel away', 'Hold still, breathe slow'],
    Art: OneLegHollowArt,
  },
  {
    // 2 Full hollow
    cues: ['Press low back to floor', 'Reach heels and hands long', 'Hold still, breathe slow'],
    Art: FullHollowArt,
  },
];
export default guides;
