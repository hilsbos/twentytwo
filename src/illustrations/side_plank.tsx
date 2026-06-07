import type { VariationGuide } from './types';

// path: ['Knees down', 'Full, feet stacked', 'Top arm reach', 'Hip dips']
//
// Anti-side-bend trunk hold on one forearm. Side-on view, figure faces right
// (head to the right, feet to the left). The supporting forearm lies flat on the
// ground with the elbow planted UNDER the shoulder and the hand pointing back
// toward the body (it does NOT extend past the head — head/limb clearance, Theme
// E #18); the upper arm rises 16px to a shoulder stacked over the elbow; the body
// extends down-and-left as one near-straight line.
//
// These are ISOMETRIC HOLDS: the three static variations (Knees down, Full, Top
// arm reach) keep the body OFF the floor in BOTH poses (shallow hold -> settled
// target, a small delta) and carry a HOLD/clock glyph instead of a directional
// travel arrow — matching the praised forearm-plank hold treatment (curls_plank,
// §4) and the cross-family hold pattern (hollow_hold / v_tuck_hold / pallof). Only
// Hip dips (index 3) legitimately travels (hip dips down and drives back up) and
// keeps its directional arrow.
//
// Across the family, pose-b is the braced "hips high, one straight line" position
// that is the point of the move; the regressions/progressions change the legs
// (knees down vs feet stacked) and the top arm.
//
// Shared full-plank body (per CONVENTIONS §3, built from the hip):
//   elbow(124,110) -> shoulder(126,94)   upper arm = 16
//   shoulder(126,94) -> hip(101,100)     torso = 26
//   hip(101,100) -> feet(66,108)         leg = 36  (hip sits ~42% along shoulder->feet)
//   neck shoulder(126,94) -> (130,87), head center (133,81) r7
// All four are render-verified.

/**
 * Knees down — the regression.
 * Distinguishing feature: the BENT knee rests on the floor (a short lever); the
 * straight line runs from KNEE to shoulders, not feet to shoulders.
 * pose-a = hips sagging low; pose-b = hips lifted into the knee-to-shoulder line.
 */
function KneesDownSidePlankArt() {
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

      {/* HOLD glyph (static scenery): a small clock marks this as an isometric hold
          you keep STILL — same glyph as the praised forearm plank in curls_plank.
          No big directional travel arrow: pose-a -> pose-b is only a small settle. */}
      <g opacity={0.5}>
        <circle cx={40} cy={30} r={6} strokeWidth={1.5} />
        <path d="M 40 30 L 40 26" strokeWidth={1.5} />
        <path d="M 40 30 L 43 32" strokeWidth={1.5} />
      </g>

      {/* pose A — hips already OFF the floor in a shallow hold (start). Supporting
          forearm flat on the ground, planted UNDER the shoulder, hand pointing back
          toward the body (NOT past the head); the SHORT lever ends at the bent knee
          on the floor with the shin folded back & up; hip sits a touch lower. */}
      <g className="pose-a">
        {/* supporting forearm flat, hand back toward the body (clear of the head):
            elbow(124,110) -> wrist(112,110) */}
        <line x1={124} y1={110} x2={112} y2={110} />
        {/* upper arm rising to a stacked shoulder: elbow(124,110) -> shoulder(126,94) */}
        <line x1={124} y1={110} x2={126} y2={94} />
        {/* torso to hip — hip OFF the floor, only a touch lower than the held target */}
        <line x1={126} y1={94} x2={101} y2={106} />
        {/* THIGH from the hip to the knee resting ON the floor */}
        <line x1={101} y1={106} x2={85} y2={110} />
        {/* SHIN folded back & up behind the knee (foot in the air), len ~18 */}
        <line x1={85} y1={110} x2={71} y2={99} />
        {/* neck + head, stacked over the shoulder, looking right */}
        <line x1={126} y1={94} x2={130} y2={87} />
        <circle cx={133} cy={81} r={7} />
        {/* joint dots: shoulder, elbow, hip, knee */}
        <circle cx={126} cy={94} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={124} cy={110} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={101} cy={106} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={85} cy={110} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — hips settled UP a touch into the knee-to-shoulder line (the held
          target); shin still folded back behind the knee on the floor. Small delta
          from pose-a so the crossfade reads as 'bracing harder', not a rep. */}
      <g className="pose-b">
        {/* supporting forearm flat, hand back toward the body (clear of the head):
            elbow(124,110) -> wrist(112,110) */}
        <line x1={124} y1={110} x2={112} y2={110} />
        {/* upper arm rising to a stacked shoulder: elbow(124,110) -> shoulder(126,94) */}
        <line x1={124} y1={110} x2={126} y2={94} />
        {/* torso to LIFTED hip, continuing toward the knee in a straight line */}
        <line x1={126} y1={94} x2={102} y2={103} />
        {/* THIGH continuing the straight line to the knee on the floor */}
        <line x1={102} y1={103} x2={85} y2={110} />
        {/* SHIN folded back & up behind the knee (foot in the air), len ~18 */}
        <line x1={85} y1={110} x2={71} y2={99} />
        {/* neck + head */}
        <line x1={126} y1={94} x2={130} y2={87} />
        <circle cx={133} cy={81} r={7} />
        {/* joint dots: shoulder, elbow, hip, knee */}
        <circle cx={126} cy={94} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={124} cy={110} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={102} cy={103} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={85} cy={110} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Full, feet stacked.
 * Distinguishing feature: legs STRAIGHT with the feet stacked on the ground (a
 * long lever, the full plank), the body one straight head-to-feet line.
 * pose-a = hips low; pose-b = hips driven up to the perfectly straight line.
 */
function FullSidePlankArt() {
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

      {/* HOLD glyph (static scenery): a small clock marks this as an isometric hold
          you keep STILL — same glyph as the praised forearm plank in curls_plank.
          No big directional travel arrow: pose-a -> pose-b is only a small settle. */}
      <g opacity={0.5}>
        <circle cx={40} cy={30} r={6} strokeWidth={1.5} />
        <path d="M 40 30 L 40 26" strokeWidth={1.5} />
        <path d="M 40 30 L 43 32" strokeWidth={1.5} />
      </g>

      {/* pose A — body already OFF the floor in a shallow hold (start). Straight
          legs, feet stacked on the floor; the hip sits just slightly below the
          fully-straight line (a looser version of the same held shape). */}
      <g className="pose-a">
        {/* supporting forearm flat, hand back toward the body (clear of the head):
            elbow(124,110) -> wrist(112,110) */}
        <line x1={124} y1={110} x2={112} y2={110} />
        {/* upper arm rising to a stacked shoulder: elbow(124,110) -> shoulder(126,94) */}
        <line x1={124} y1={110} x2={126} y2={94} />
        {/* torso to hip — OFF the floor, only a touch lower than the held target */}
        <line x1={126} y1={94} x2={101} y2={104} />
        {/* straight legs from hip to stacked feet on the ground */}
        <line x1={101} y1={104} x2={66} y2={108} />
        {/* small foot at the stacked-feet end */}
        <line x1={66} y1={108} x2={58} y2={110} />
        {/* neck + head, stacked over the shoulder, looking right */}
        <line x1={126} y1={94} x2={130} y2={87} />
        <circle cx={133} cy={81} r={7} />
        {/* joint dots: shoulder, elbow, hip */}
        <circle cx={126} cy={94} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={124} cy={110} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={101} cy={104} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — body settled UP a touch into the perfectly straight head-to-feet
          line (the held target). Small delta from pose-a: a brace, not a rep. */}
      <g className="pose-b">
        {/* supporting forearm flat, hand back toward the body (clear of the head):
            elbow(124,110) -> wrist(112,110) */}
        <line x1={124} y1={110} x2={112} y2={110} />
        {/* upper arm rising to a stacked shoulder: elbow(124,110) -> shoulder(126,94) */}
        <line x1={124} y1={110} x2={126} y2={94} />
        {/* one straight line: shoulder -> hip -> stacked feet */}
        <line x1={126} y1={94} x2={101} y2={100} />
        <line x1={101} y1={100} x2={66} y2={108} />
        {/* small foot */}
        <line x1={66} y1={108} x2={58} y2={110} />
        {/* neck + head */}
        <line x1={126} y1={94} x2={130} y2={87} />
        <circle cx={133} cy={81} r={7} />
        {/* joint dots: shoulder, elbow, hip */}
        <circle cx={126} cy={94} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={124} cy={110} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={101} cy={100} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Top arm reach.
 * Distinguishing feature: the full side plank held while the TOP arm reaches
 * straight UP to the ceiling (the lifted skyward arm is unmistakable).
 * pose-a = top arm resting along the body; pose-b = top arm raised straight up.
 */
function TopArmReachSidePlankArt() {
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

      {/* HOLD glyph (static scenery): a small clock marks this as an isometric hold
          you keep STILL — same glyph as the praised forearm plank in curls_plank.
          The body is held off the floor in BOTH poses; only the top arm reaches
          (its raised pose is the distinguishing feature), so no body travel arrow. */}
      <g opacity={0.5}>
        <circle cx={40} cy={30} r={6} strokeWidth={1.5} />
        <path d="M 40 30 L 40 26" strokeWidth={1.5} />
        <path d="M 40 30 L 43 32" strokeWidth={1.5} />
      </g>

      {/* shared full side-plank body (hips high) in BOTH poses; only the top arm
          changes. pose-a top arm resting ALONG the body line toward the hip. */}
      <g className="pose-a">
        {/* supporting forearm flat, hand back toward the body (clear of the head):
            elbow(124,110) -> wrist(112,110) */}
        <line x1={124} y1={110} x2={112} y2={110} />
        {/* upper arm rising to a stacked shoulder: elbow(124,110) -> shoulder(126,94) */}
        <line x1={124} y1={110} x2={126} y2={94} />
        {/* straight body: shoulder -> hip -> stacked feet */}
        <line x1={126} y1={94} x2={101} y2={100} />
        <line x1={101} y1={100} x2={66} y2={108} />
        <line x1={66} y1={108} x2={58} y2={110} />
        {/* TOP arm resting along the body line, down to near the hip */}
        <line x1={126} y1={94} x2={112} y2={97} />
        <line x1={112} y1={97} x2={99} y2={101} />
        {/* neck + head */}
        <line x1={126} y1={94} x2={130} y2={87} />
        <circle cx={133} cy={81} r={7} />
        {/* joint dots: shoulder, elbow, hip, top elbow */}
        <circle cx={126} cy={94} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={124} cy={110} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={101} cy={100} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={112} cy={97} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — same body, TOP arm reaching straight up to the ceiling. */}
      <g className="pose-b">
        {/* supporting forearm flat, hand back toward the body (clear of the head):
            elbow(124,110) -> wrist(112,110) */}
        <line x1={124} y1={110} x2={112} y2={110} />
        {/* upper arm rising to a stacked shoulder: elbow(124,110) -> shoulder(126,94) */}
        <line x1={124} y1={110} x2={126} y2={94} />
        {/* straight body: shoulder -> hip -> stacked feet */}
        <line x1={126} y1={94} x2={101} y2={100} />
        <line x1={101} y1={100} x2={66} y2={108} />
        <line x1={66} y1={108} x2={58} y2={110} />
        {/* TOP arm STRAIGHT UP: shoulder(126,94) -> elbow(124,78) -> hand(122,63) */}
        <line x1={126} y1={94} x2={124} y2={78} />
        <line x1={124} y1={78} x2={122} y2={63} />
        {/* neck + head */}
        <line x1={126} y1={94} x2={130} y2={87} />
        <circle cx={133} cy={81} r={7} />
        {/* joint dots: shoulder, elbow, hip, top elbow */}
        <circle cx={126} cy={94} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={124} cy={110} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={101} cy={100} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={124} cy={78} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Hip dips.
 * Distinguishing feature: from the full side plank the hip DIPS down toward the
 * floor and drives back up (the lowered hip mid-dip below the body line).
 * pose-a = hips lifted in a straight line; pose-b = hip dipped down near the floor.
 */
function HipDipsSidePlankArt() {
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

      {/* movement arrow: the hip drops straight down toward the floor (a -> b) */}
      <g opacity={0.6}>
        <path d="M 105 99 L 105 109" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 100 104 L 105 109 L 110 104" strokeWidth={2} />
      </g>

      {/* pose A — hips lifted, straight line (the top of the dip). */}
      <g className="pose-a">
        {/* supporting forearm flat, hand back toward the body (clear of the head):
            elbow(124,110) -> wrist(112,110) */}
        <line x1={124} y1={110} x2={112} y2={110} />
        {/* upper arm rising to a stacked shoulder: elbow(124,110) -> shoulder(126,94) */}
        <line x1={124} y1={110} x2={126} y2={94} />
        {/* one straight line: shoulder -> hip -> stacked feet */}
        <line x1={126} y1={94} x2={101} y2={100} />
        <line x1={101} y1={100} x2={66} y2={108} />
        <line x1={66} y1={108} x2={58} y2={110} />
        {/* neck + head */}
        <line x1={126} y1={94} x2={130} y2={87} />
        <circle cx={133} cy={81} r={7} />
        {/* joint dots: shoulder, elbow, hip */}
        <circle cx={126} cy={94} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={124} cy={110} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={101} cy={100} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — hip DIPPED down to the floor, body bent into a clear V at the
          hip (hip well below the shoulder->feet line). */}
      <g className="pose-b">
        {/* supporting forearm flat, hand back toward the body (clear of the head):
            elbow(124,110) -> wrist(112,110) */}
        <line x1={124} y1={110} x2={112} y2={110} />
        {/* upper arm rising to a stacked shoulder: elbow(124,110) -> shoulder(126,94) */}
        <line x1={124} y1={110} x2={126} y2={94} />
        {/* torso drops to a LOW hip near the floor */}
        <line x1={126} y1={94} x2={100} y2={110} />
        {/* legs angle back UP from the floored hip to the stacked feet */}
        <line x1={100} y1={110} x2={64} y2={101} />
        <line x1={64} y1={101} x2={56} y2={105} />
        {/* neck + head */}
        <line x1={126} y1={94} x2={130} y2={87} />
        <circle cx={133} cy={81} r={7} />
        {/* joint dots: shoulder, elbow, hip */}
        <circle cx={126} cy={94} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={124} cy={110} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={100} cy={110} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

const guides: VariationGuide[] = [
  {
    // 0 Knees down
    cues: ['Elbow under shoulder', 'Lift hips off floor', 'Hold one straight line'],
    Art: KneesDownSidePlankArt,
  },
  {
    // 1 Full, feet stacked
    cues: ['Stack feet, elbow planted', 'Drive hips up high', 'Long line, hold steady'],
    Art: FullSidePlankArt,
  },
  {
    // 2 Top arm reach
    cues: ['Plank up, hips high', 'Reach top hand to ceiling', 'Keep the line steady'],
    Art: TopArmReachSidePlankArt,
  },
  {
    // 3 Hip dips
    cues: ['Set the side plank', 'Dip hip toward floor', 'Drive back up tall'],
    Art: HipDipsSidePlankArt,
  },
];
export default guides;
