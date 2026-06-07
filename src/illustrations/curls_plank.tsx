import type { VariationGuide } from './types';

// path: ['Towel/band curls + plank'] — MULTI-MOVE panel (see CONVENTIONS §9)
//
// One panel, two mini-figures (~50% scale per §9), each a 2-pose animated figure
// inside the SAME pose-a / pose-b groups:
//   LEFT  — Towel/band curls (side profile, faces +x). A band runs from under the
//           foot up to the hand; the upper arm stays pinned at the side while the
//           forearm sweeps. pose-a = forearm hanging low (extended), pose-b =
//           forearm curled up to the shoulder. The curling forearm is the signature.
//   RIGHT — Front plank (side profile, faces +x). Body RIGID and near-HORIZONTAL:
//           shoulder, hip and knee held within ~1-2px of one height just above the
//           ground (slight natural sag), heels tucked down to the floor at the far
//           left, supported on the FOREARM (vertical forearm, elbow under the
//           shoulder — not a straight hand-support like a push-up). The head
//           continues the flat spine with a neutral downward gaze, sitting just
//           past/above the elbow (not craned forward over the hand). A hold, so the
//           figure barely changes between poses; a small "hold" clock marks it.

function CurlsPlankArt() {
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

      {/* "hold" clock marker for the plank (static scenery) */}
      <g opacity={0.5}>
        <circle cx={172} cy={34} r={6} strokeWidth={1.5} />
        <path d="M 172 34 L 172 30" strokeWidth={1.5} />
        <path d="M 172 34 L 175 36" strokeWidth={1.5} />
      </g>

      {/* ===== movement arrows (static scenery) ===== */}
      {/* LEFT — curl: the hand sweeps up in an arc toward the shoulder */}
      <g opacity={0.6}>
        <path d="M 61 94 Q 68 84 59 78" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 54 80 L 59 78 L 61 83" strokeWidth={2} />
      </g>

      {/* =================================================================
          POSE A — curl forearm DOWN (extended); plank held rigid
          ================================================================= */}
      <g className="pose-a">
        {/* ---- LEFT: towel/band curl (~50% scale), forearm hanging LOW ---- */}
        {/* head + torso (standing, side profile): shoulder(45,79) -> hip(45,92) */}
        <circle cx={45} cy={71} r={4} />
        <line x1={45} y1={75} x2={45} y2={92} />
        {/* upper arm pinned at the side: shoulder(45,79) -> elbow(47,88) */}
        <line x1={45} y1={79} x2={47} y2={88} />
        {/* forearm hanging down/forward: elbow(47,88) -> hand(55,98) */}
        <line x1={47} y1={88} x2={55} y2={98} />
        {/* legs (standing): hip -> knee -> ankle -> toe */}
        <line x1={45} y1={92} x2={45} y2={101} />
        <line x1={45} y1={101} x2={45} y2={110} />
        <line x1={45} y1={110} x2={52} y2={110} />
        {/* band from the hand down to under the foot (anchored, stretched) */}
        <line x1={55} y1={98} x2={50} y2={110} opacity={0.5} />
        {/* joint dots: shoulder, elbow, hip */}
        <circle cx={45} cy={79} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={47} cy={88} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={45} cy={92} r={2.5} fill="currentColor" stroke="none" />

        {/* ---- RIGHT: front plank on the FOREARM (~50% scale) ----
            Body rigid and near-HORIZONTAL: shoulder(155,100), hip(125,101),
            knee(110,101.5) held within ~1-2px of one height just above the
            ground (slight natural sag), heels tucked down to the floor. */}
        {/* forearm flat on the ground: elbow(155,110) -> hand(164,110) */}
        <line x1={155} y1={110} x2={164} y2={110} />
        {/* upper arm vertical: elbow(155,110) -> shoulder(155,100) */}
        <line x1={155} y1={110} x2={155} y2={100} />
        {/* rigid, level body: shoulder(155,100) -> hip(125,101) -> knee(110,101.5) */}
        <line x1={155} y1={100} x2={125} y2={101} />
        <line x1={125} y1={101} x2={110} y2={101.5} />
        {/* shin to ankle approaching the ground; toes tucked under (short down tick) */}
        <line x1={110} y1={101.5} x2={100} y2={103} />
        <line x1={100} y1={103} x2={97} y2={110} />
        {/* neck + head continuing the flat spine, neutral downward gaze */}
        <line x1={155} y1={100} x2={162} y2={101} />
        <circle cx={166} cy={103} r={4} />
        {/* joint dots: shoulder, elbow, hip, knee */}
        <circle cx={155} cy={100} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={155} cy={110} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={125} cy={101} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={110} cy={101.5} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* =================================================================
          POSE B — curl forearm UP (curled to shoulder); plank still rigid
          ================================================================= */}
      <g className="pose-b">
        {/* ---- LEFT: towel/band curl (~50% scale), forearm CURLED UP ---- */}
        <circle cx={45} cy={71} r={4} />
        <line x1={45} y1={75} x2={45} y2={92} />
        {/* upper arm still pinned: shoulder(45,79) -> elbow(47,88) */}
        <line x1={45} y1={79} x2={47} y2={88} />
        {/* forearm curled up toward the shoulder: elbow(47,88) -> hand(51,79) */}
        <line x1={47} y1={88} x2={51} y2={79} />
        {/* legs (standing) */}
        <line x1={45} y1={92} x2={45} y2={101} />
        <line x1={45} y1={101} x2={45} y2={110} />
        <line x1={45} y1={110} x2={52} y2={110} />
        {/* band from the hand down to under the foot (still anchored) */}
        <line x1={51} y1={79} x2={50} y2={110} opacity={0.5} />
        {/* joint dots: shoulder, elbow, hip */}
        <circle cx={45} cy={79} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={47} cy={88} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={45} cy={92} r={2.5} fill="currentColor" stroke="none" />

        {/* ---- RIGHT: front plank (held — same rigid, level shape) ---- */}
        <line x1={155} y1={110} x2={164} y2={110} />
        <line x1={155} y1={110} x2={155} y2={100} />
        <line x1={155} y1={100} x2={125} y2={101} />
        <line x1={125} y1={101} x2={110} y2={101.5} />
        <line x1={110} y1={101.5} x2={100} y2={103} />
        <line x1={100} y1={103} x2={97} y2={110} />
        <line x1={155} y1={100} x2={162} y2={101} />
        <circle cx={166} cy={103} r={4} />
        <circle cx={155} cy={100} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={155} cy={110} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={125} cy={101} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={110} cy={101.5} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

const guides: VariationGuide[] = [
  {
    // 0 Towel/band curls + plank (multi-move finisher)
    cues: ['Pin elbows to your ribs', 'Curl the band to shoulders', 'Hold a straight plank'],
    Art: CurlsPlankArt,
  },
];
export default guides;
