import type { VariationGuide } from './types';

// path: ['Hollow rock + tuck hold']
// A single multi-move finisher panel (§9 of CONVENTIONS.md): a hollow rock plus
// a V-tuck hold balanced on the sit-bones, drawn as two side-by-side
// mini-figures (~50% scale) sharing the pose-a / pose-b crossfade.
//   LEFT  — Hollow rock (side profile, head-RIGHT, feet-LEFT). A shallow banana
//           dish that see-saws on the low back/hip near the floor, with a LARGE
//           amplitude so the rock reads as a dynamic see-saw, not a static hold.
//           pose-a = rocked BACK toward the head (head-end DOWN at the floor, legs
//           lifted HIGH); pose-b = rocked FORWARD toward the feet (head-end lifted
//           HIGH, legs down to the floor). The head and feet clearly swap heights
//           between poses; the dynamic see-saw rock is the left signature.
//   RIGHT  — V-tuck HOLD balanced on the sit-bones (side profile, faces +x), raised
//           clearly OFF the floor in BOTH poses (this family is the reference model
//           for the isometric-hold treatment — §2.1). Torso up-and-back, tucked knees
//           up-and-forward, forming a V. pose-a = a looser / more-OPEN V (torso leaned
//           back a little, knees a touch lower); pose-b = a clearly TIGHTER, taller,
//           more-upright V (torso near-vertical, knees pulled high & close). The delta
//           is now perceptible (was only a few px — appendix #16) but reads as the same
//           held shape settling tighter, not a rep that travels. Because it is a HOLD,
//           the right mini carries the praised "hold" CLOCK glyph (matching the
//           curls_plank plank, §4) instead of a directional travel arrow.
//           A knees-tucked V balanced OFF the floor is the right signature.
// Cues are FINAL (from the approved design): one per movement (§8/§9).

/**
 * Hollow rock + V-tuck hold — finished multi-move finisher art.
 */
function HollowRockVTuckArt() {
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

      {/* LEFT mini: rocking-arc arrow above the dish (the see-saw rock front<->back) */}
      <g opacity={0.6}>
        <path d="M 30 84 Q 52 70 76 84" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 70 78 L 76 84 L 69 87" strokeWidth={2} />
      </g>
      {/* RIGHT mini: "hold" clock marker (this is an isometric hold, not a rep —
          so it carries the same clock glyph praised on the curls_plank plank, NOT a
          directional travel arrow). */}
      <g opacity={0.5}>
        <circle cx={176} cy={70} r={6} strokeWidth={1.5} />
        <path d="M 176 70 L 176 66" strokeWidth={1.5} />
        <path d="M 176 70 L 179 72" strokeWidth={1.5} />
      </g>

      {/* =================================================================
          POSE A — rock rocked BACK toward the head; V-tuck looser/lower
          ================================================================= */}
      <g className="pose-a">
        {/* ---- LEFT: hollow rock (~50% scale: torso 13, full leg 18, upper arm 8,
             forearm 7.5, head r3.5), shallow banana pivoting on the low back/hip near
             the floor. ROCKED BACK toward the head: head-end DOWN at the floor, legs
             LIFTED HIGH. Pivot ~ hip(48,104). ---- */}
        {/* torso: hip(48,104) -> shoulder(60,108) (shoulders sunk to the floor) */}
        <line x1={60} y1={108} x2={48} y2={104} />
        {/* arms overhead, low along the floor (upper arm 8, forearm 7.5) */}
        <line x1={60} y1={108} x2={68} y2={107} />
        <line x1={68} y1={107} x2={75} y2={106} />
        {/* neck stub + head, head lifted clear ABOVE the overhead-arm line so the
            head/neck/arm cluster does not pile into one blob */}
        <line x1={60} y1={108} x2={63} y2={105} />
        <circle cx={65} cy={103} r={3.5} />
        {/* legs straight, LIFTED HIGH off the floor (thigh 9 + shin 9 ≈ full leg 18) */}
        <line x1={48} y1={104} x2={41} y2={98} />
        <line x1={41} y1={98} x2={34} y2={92} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={60} cy={108} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={48} cy={104} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={41} cy={98} r={2.5} fill="currentColor" stroke="none" />

        {/* ---- RIGHT: V-tuck hold (~50% scale, same as the left: torso 13, thigh 9,
             upper arm 8, forearm 7.5, head r3.5) balanced on the sit-bones, raised
             clearly OFF the floor. Looser, lower V. Torso up-and-back to the right,
             tucked knees up-and-forward to the left. Balance point ~ hip(150,100). ---- */}
        {/* torso a looser, MORE-OPEN V (still clearly a held V off the floor):
            hip(150,100) -> shoulder(157,89) (len ~13). Chest well up but leaned back
            a little more than pose-b's near-vertical torso. */}
        <line x1={150} y1={100} x2={157} y2={89} />
        {/* neck + head */}
        <line x1={157} y1={89} x2={159} y2={86} />
        <circle cx={161} cy={84} r={3.5} />
        {/* arms reaching forward toward the shins (upper arm 8, forearm 7.5) */}
        <line x1={157} y1={89} x2={149} y2={90} />
        <line x1={149} y1={90} x2={142} y2={91} />
        {/* tucked leg held a touch LOWER / more open than pose-b: hip(150,100) ->
            knee(141,93) [thigh ~9] -> shin folded back to foot(148,97) [shin ~8] */}
        <line x1={150} y1={100} x2={141} y2={93} />
        <line x1={141} y1={93} x2={148} y2={97} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={157} cy={89} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={150} cy={100} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={141} cy={93} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* =================================================================
          POSE B — rock rocked FORWARD toward the feet; V-tuck tighter/taller
          ================================================================= */}
      <g className="pose-b">
        {/* ---- LEFT: hollow rock ROCKED FORWARD toward the feet — the mirror of
             pose A so the see-saw reads with a large swap: head-end LIFTED HIGH,
             legs DOWN at the floor. Same ~50% scale (torso 13, full leg ~16-18).
             Pivot ~ hip(48,104). ---- */}
        {/* torso: hip(48,104) -> shoulder(57,94) (shoulders lifted high, len ~13) */}
        <line x1={57} y1={94} x2={48} y2={104} />
        {/* arms overhead, lifted high (upper arm 8, forearm 7.5) */}
        <line x1={57} y1={94} x2={65} y2={93} />
        <line x1={65} y1={93} x2={72} y2={92} />
        {/* neck stub + head, lifted high and clear above the overhead-arm line */}
        <line x1={57} y1={94} x2={60} y2={91} />
        <circle cx={62} cy={89} r={3.5} />
        {/* legs straight, DOWN to the floor (thigh 9 + shin 9 ≈ full leg 18) */}
        <line x1={48} y1={104} x2={40} y2={108} />
        <line x1={40} y1={108} x2={33} y2={110} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={57} cy={94} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={48} cy={104} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={40} cy={108} r={2.5} fill="currentColor" stroke="none" />

        {/* ---- RIGHT: V-tuck held markedly TIGHTER & MORE UPRIGHT — torso much more
             vertical, knees pulled clearly higher/closer, a taller V. Same ~50% scale
             (torso 13, thigh 9, upper arm 8, forearm 7.5). Still raised off the floor.
             Balance point ~ hip(150,100). ---- */}
        {/* torso pulled clearly MORE UPRIGHT/VERTICAL (a tighter, taller V): hip(150,100)
            -> shoulder(152,86) (len ~14). Shoulder rises high and close to vertical. */}
        <line x1={150} y1={100} x2={152} y2={86} />
        {/* neck + head, lifted high */}
        <line x1={152} y1={86} x2={153} y2={83} />
        <circle cx={154} cy={81} r={3.5} />
        {/* arms toward the shins (upper arm 8, forearm 7.5) */}
        <line x1={152} y1={86} x2={144} y2={86} />
        <line x1={144} y1={86} x2={137} y2={85} />
        {/* tucked leg pulled clearly HIGHER & CLOSER: hip(150,100) -> knee(143,85)
            [thigh ~9] -> foot(150,89) [shin ~8] */}
        <line x1={150} y1={100} x2={143} y2={85} />
        <line x1={143} y1={85} x2={150} y2={89} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={152} cy={86} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={150} cy={100} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={143} cy={85} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

const guides: VariationGuide[] = [
  {
    // 0 Hollow rock + tuck hold
    cues: ['Ribs down, dish shape', 'Rock smooth front to back', 'Balance, knees tucked in'],
    Art: HollowRockVTuckArt,
  },
];
export default guides;
