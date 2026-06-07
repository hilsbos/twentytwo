import type { VariationGuide } from './types';

// path: ['Towel/band curls + plank'] — MULTI-MOVE panel (see CONVENTIONS §9)
//
// One panel, two mini-figures (~50% scale per §9), each a 2-pose animated figure
// inside the SAME pose-a / pose-b groups:
//   LEFT  — Band curls (side profile, faces +x). A DASHED resistance band runs from
//           a loop under the foot up to the curling hand; the band is offset forward
//           of the body so band / forearm / shin stay three distinct strokes (the
//           band reads as the implement, not a shadow). The upper arm stays pinned at
//           the side while the forearm sweeps through a wide arc. pose-a = forearm
//           reaching low/forward (band long, extended), pose-b = forearm curled all
//           the way up to the shoulder (band short). The curling forearm + dashed
//           band + foot loop are the signature.
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
      {/* LEFT — curl: the hand sweeps up in a wide arc toward the shoulder */}
      <g opacity={0.6}>
        <path d="M 66 97 Q 73 84 58 75" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 53 77 L 58 75 L 60 80" strokeWidth={2} />
      </g>

      {/* =================================================================
          POSE A — curl forearm DOWN (extended); plank held rigid
          ================================================================= */}
      <g className="pose-a">
        {/* ---- LEFT: band curl (~50% scale), forearm reaching LOW/FORWARD ---- */}
        {/* head + torso (standing, side profile): shoulder(45,79) -> hip(45,92) */}
        <circle cx={45} cy={71} r={4} />
        <line x1={45} y1={75} x2={45} y2={92} />
        {/* upper arm pinned at the side: shoulder(45,79) -> elbow(46,87) */}
        <line x1={45} y1={79} x2={46} y2={87} />
        {/* forearm reaching down/forward (band long): elbow(46,87) -> hand(62,100) */}
        <line x1={46} y1={87} x2={62} y2={100} />
        {/* legs (standing): hip -> knee -> ankle -> toe */}
        <line x1={45} y1={92} x2={45} y2={101} />
        <line x1={45} y1={101} x2={45} y2={110} />
        <line x1={45} y1={110} x2={53} y2={110} />
        {/* band: DASHED + heavier, hand(62,100) down to the foot loop (offset
            forward of the body so it stays a separate stroke from arm + shin) */}
        <line x1={62} y1={100} x2={53} y2={109} opacity={0.55} strokeWidth={2.5} strokeDasharray="3 2.5" />
        {/* loop glyph at the foot anchor (the band runs under the foot) */}
        <ellipse cx={53} cy={110} rx={4} ry={2} opacity={0.55} strokeWidth={1.5} />
        {/* joint dots: shoulder, elbow, hip */}
        <circle cx={45} cy={79} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={46} cy={87} r={2.5} fill="currentColor" stroke="none" />
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
        {/* ---- LEFT: band curl (~50% scale), forearm CURLED UP to shoulder ---- */}
        <circle cx={45} cy={71} r={4} />
        <line x1={45} y1={75} x2={45} y2={92} />
        {/* upper arm still pinned: shoulder(45,79) -> elbow(46,87) */}
        <line x1={45} y1={79} x2={46} y2={87} />
        {/* forearm curled up to the shoulder: elbow(46,87) -> hand(52,76) */}
        <line x1={46} y1={87} x2={52} y2={76} />
        {/* legs (standing) */}
        <line x1={45} y1={92} x2={45} y2={101} />
        <line x1={45} y1={101} x2={45} y2={110} />
        <line x1={45} y1={110} x2={53} y2={110} />
        {/* band: DASHED + heavier, hand(52,76) down to the foot loop (offset
            forward so it stays clear of the body line in this pose too) */}
        <line x1={52} y1={76} x2={53} y2={109} opacity={0.55} strokeWidth={2.5} strokeDasharray="3 2.5" />
        {/* loop glyph at the foot anchor */}
        <ellipse cx={53} cy={110} rx={4} ry={2} opacity={0.55} strokeWidth={1.5} />
        {/* joint dots: shoulder, elbow, hip */}
        <circle cx={45} cy={79} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={46} cy={87} r={2.5} fill="currentColor" stroke="none" />
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
