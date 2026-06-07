import type { VariationGuide } from './types';

// path: ['Banded RDL + lying leg raises'] — MULTI-MOVE panel (see CONVENTIONS §9)
//
// NEW family replacing band_walks. One panel, two mini-figures, each a 2-pose
// animated figure inside the SAME pose-a / pose-b groups. Scale matches the
// established multi-move panel (curls_plank): r=4 head on a ~43px body, so the
// two panels read as the same person at the same size.
//   LEFT  — Banded RDL (side profile, faces +x). Loop band UNDER both feet, hands
//           holding it; HINGE at the hips with soft knees and a long FLAT back.
//           pose-a = standing tall (band short); pose-b = hinged forward, hips
//           pushed back, band stretched, back flat. The hip hinge with a flat
//           back is the signature (a rounded back would teach injury).
//   RIGHT — Lying leg raises (side profile, supine on the ground). pose-a legs low
//           near the floor, pose-b legs raised toward vertical.

/**
 * Banded RDL + lying leg raises (multi-move finisher).
 * LEFT = standing hip hinge holding a loop band anchored under both feet (flat
 * back, hips travel back). RIGHT = supine lying leg raise (legs sweep up toward
 * vertical). Two animated mini-figures sharing one pose-a / pose-b crossfade.
 */
function HingeRaisesArt() {
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

      {/* ===== movement arrows (static scenery) ===== */}
      {/* LEFT — hinge: the chest/head travels down and forward in an arc (a -> b) */}
      <g opacity={0.6}>
        <path d="M 72 72 Q 78 80 70 86" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 64 83 L 70 86 L 72 79" strokeWidth={2} />
      </g>
      {/* RIGHT — leg raise: the feet sweep up in an arc, low/out -> high/vertical */}
      <g opacity={0.6}>
        <path d="M 178 84 Q 172 68 160 64" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 158 70 L 160 64 L 166 67" strokeWidth={2} />
      </g>

      {/* =================================================================
          POSE A — RDL standing tall;  leg raise legs LOW
          ================================================================= */}
      <g className="pose-a">
        {/* ---- LEFT: banded RDL (matches curls_plank scale), STANDING TALL ---- */}
        {/* head + neck + torso (upright): shoulder(45,79) -> hip(45,92), 13px torso
            on an r=4 head, matching the curls_plank standing figure exactly */}
        <circle cx={45} cy={71} r={4} />
        <line x1={45} y1={75} x2={45} y2={79} />
        <line x1={45} y1={79} x2={45} y2={92} />
        {/* arm hanging essentially STRAIGHT (relaxed top of the hinge), holding the
            band. Nudged forward (+x) of the leg so arm, leg and band read as three
            separate strokes rather than one vertical mass: shoulder(45,79) ->
            hand(53,97) */}
        <line x1={45} y1={79} x2={53} y2={97} />
        {/* legs nearly straight (soft knees): hip(45,92) -> knee(45,101) -> ankle(45,110) -> toe */}
        <line x1={45} y1={92} x2={45} y2={101} />
        <line x1={45} y1={101} x2={45} y2={110} />
        <line x1={45} y1={110} x2={52} y2={110} />
        {/* loop band: hand(53,97) down under the foot(45,110) — short / less stretched */}
        <line x1={53} y1={97} x2={45} y2={110} opacity={0.5} strokeWidth={2} />
        {/* joint dots: shoulder, hip, knee (elbow stays straight in a hinge) */}
        <circle cx={45} cy={79} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={45} cy={92} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={45} cy={101} r={2.5} fill="currentColor" stroke="none" />

        {/* ---- RIGHT: lying leg raise (~50% scale), legs LOW ---- */}
        {/* head supine on the floor */}
        <circle cx={130} cy={106} r={4} />
        {/* torso flat along the floor: head-side(135,106) -> hip(156,105) */}
        <line x1={135} y1={106} x2={156} y2={105} />
        {/* leg raised low (~45deg), hip(156,105) -> foot(177,84) */}
        <line x1={156} y1={105} x2={177} y2={84} />
        {/* arm flat along the ground, reaching toward the hip/feet so it sits clear
            of the head circle: shoulder(140,107) -> hand(151,109) */}
        <line x1={140} y1={107} x2={151} y2={109} />
        {/* joint dots: shoulder, hip */}
        <circle cx={140} cy={107} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={156} cy={105} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* =================================================================
          POSE B — RDL hinged forward (flat back);  leg raise legs HIGH
          ================================================================= */}
      <g className="pose-b">
        {/* ---- LEFT: banded RDL (matches curls_plank scale), HINGED FORWARD, flat back ---- */}
        {/* hips push BACK (left), the FLAT back tips forward over the legs.
            hip(40,90) -> shoulder(60,82); the spine is ONE STRAIGHT line (13px). */}
        {/* head + neck continuing the flat-back line, gaze down-forward */}
        <circle cx={68} cy={80} r={4} />
        <line x1={60} y1={82} x2={65} y2={81} />
        {/* FLAT back (the signature): shoulder(60,82) -> hip(40,90) */}
        <line x1={60} y1={82} x2={40} y2={90} />
        {/* arms hanging STRAIGHT DOWN from the shoulder (gravity), to the hand */}
        <line x1={60} y1={82} x2={58} y2={101} />
        {/* legs, hips pushed back with soft knees: hip(40,90) -> knee(44,100) -> ankle(48,110) -> toe */}
        <line x1={40} y1={90} x2={44} y2={100} />
        <line x1={44} y1={100} x2={48} y2={110} />
        <line x1={48} y1={110} x2={56} y2={110} />
        {/* loop band STRETCHED: hand(58,101) down under the foot(48,110) */}
        <line x1={58} y1={101} x2={48} y2={110} opacity={0.5} strokeWidth={2} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={60} cy={82} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={40} cy={90} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={44} cy={100} r={2.5} fill="currentColor" stroke="none" />

        {/* ---- RIGHT: lying leg raise (~50% scale), legs RAISED near-vertical ---- */}
        <circle cx={130} cy={106} r={4} />
        <line x1={135} y1={106} x2={156} y2={105} />
        {/* leg raised near-vertical: hip(156,105) -> foot(161,75) */}
        <line x1={156} y1={105} x2={161} y2={75} />
        {/* arm flat along the ground, clear of the head circle */}
        <line x1={140} y1={107} x2={151} y2={109} />
        {/* joint dots: shoulder, hip */}
        <circle cx={140} cy={107} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={156} cy={105} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

const guides: VariationGuide[] = [
  {
    // 0 Banded RDL + lying leg raises (multi-move finisher)
    cues: ['Hinge hips back, back long', 'Then lift heels to the ceiling', 'Move slow, stay controlled'],
    Art: HingeRaisesArt,
  },
];
export default guides;
