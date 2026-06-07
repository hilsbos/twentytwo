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
//   RIGHT  — V-tuck hold balanced on the sit-bones (side profile, faces +x), raised
//           clearly OFF the floor. Torso up-and-back, tucked knees up-and-forward,
//           forming a V. pose-a = a looser/lower V; pose-b = a markedly tighter,
//           taller, more-upright V (torso more vertical, knees pulled higher).
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
      {/* RIGHT mini: tuck-up arrow at the shins (V pulled tighter/taller) */}
      <g opacity={0.6}>
        <path d="M 170 92 L 170 74" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 165 79 L 170 74 L 175 79" strokeWidth={2} />
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
        {/* torso: hip(150,100) -> shoulder(159,91) (len ~13) */}
        <line x1={150} y1={100} x2={159} y2={91} />
        {/* neck + head */}
        <line x1={159} y1={91} x2={161} y2={88} />
        <circle cx={163} cy={86} r={3.5} />
        {/* arms reaching forward toward the shins (upper arm 8, forearm 7.5) */}
        <line x1={159} y1={91} x2={151} y2={92} />
        <line x1={151} y1={92} x2={144} y2={93} />
        {/* tucked leg: hip(150,100) -> knee(141,94) [thigh 9] -> shin folded back to
            foot(148,98) [shin ~8] */}
        <line x1={150} y1={100} x2={141} y2={94} />
        <line x1={141} y1={94} x2={148} y2={98} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={159} cy={91} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={150} cy={100} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={141} cy={94} r={2.5} fill="currentColor" stroke="none" />
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
        {/* torso: hip(150,100) -> shoulder(154,87) (clearly more upright/vertical, ~13) */}
        <line x1={150} y1={100} x2={154} y2={87} />
        {/* neck + head */}
        <line x1={154} y1={87} x2={156} y2={84} />
        <circle cx={158} cy={82} r={3.5} />
        {/* arms toward the shins (upper arm 8, forearm 7.5) */}
        <line x1={154} y1={87} x2={146} y2={87} />
        <line x1={146} y1={87} x2={139} y2={86} />
        {/* tucked leg pulled higher/closer: hip(150,100) -> knee(142,88) [thigh ~9]
            -> foot(149,92) [shin ~8] */}
        <line x1={150} y1={100} x2={142} y2={88} />
        <line x1={142} y1={88} x2={149} y2={92} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={154} cy={87} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={150} cy={100} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={142} cy={88} r={2.5} fill="currentColor" stroke="none" />
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
