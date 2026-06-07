import type { VariationGuide } from './types';

// path: ['Knees down', 'Full, feet stacked', 'Top arm reach', 'Hip dips']
//
// Anti-side-bend trunk hold on one forearm. Side-on view, figure faces right
// (head to the right, feet to the left). The supporting forearm lies flat on the
// ground and extends FORWARD past the head; the upper arm rises 16px to a shoulder
// stacked over the elbow; the body extends down-and-left as one near-straight line.
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

      {/* movement arrow: the hip lifts up off the floor (a -> b) */}
      <g opacity={0.6}>
        <path d="M 104 106 L 104 88" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 99 93 L 104 88 L 109 93" strokeWidth={2} />
      </g>

      {/* pose A — hips sagging low (start). Supporting forearm flat on the ground
          extending forward; shoulder stacked over the elbow; the SHORT lever ends
          at the bent knee on the floor with the shin folded back & up; hip droops. */}
      <g className="pose-a">
        {/* supporting forearm flat, forward of the head: elbow(124,110) -> wrist(139,110) */}
        <line x1={124} y1={110} x2={139} y2={110} />
        {/* upper arm rising to a stacked shoulder: elbow(124,110) -> shoulder(126,94) */}
        <line x1={124} y1={110} x2={126} y2={94} />
        {/* torso to hip — hip SAGS low (close to floor) */}
        <line x1={126} y1={94} x2={101} y2={107} />
        {/* THIGH from the low hip to the knee resting ON the floor */}
        <line x1={101} y1={107} x2={85} y2={110} />
        {/* SHIN folded back & up behind the knee (foot in the air), len ~18 */}
        <line x1={85} y1={110} x2={71} y2={99} />
        {/* neck + head, stacked over the shoulder, looking right */}
        <line x1={126} y1={94} x2={130} y2={87} />
        <circle cx={133} cy={81} r={7} />
        {/* joint dots: shoulder, elbow, hip, knee */}
        <circle cx={126} cy={94} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={124} cy={110} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={101} cy={107} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={85} cy={110} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — hips lifted so shoulder->hip->knee is one straight line; shin
          still folded back behind the knee on the floor. */}
      <g className="pose-b">
        {/* supporting forearm flat, forward of the head: elbow(124,110) -> wrist(139,110) */}
        <line x1={124} y1={110} x2={139} y2={110} />
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

      {/* movement arrow: the hip drives UP into the straight line (a -> b) */}
      <g opacity={0.6}>
        <path d="M 101 106 L 101 86" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 96 91 L 101 86 L 106 91" strokeWidth={2} />
      </g>

      {/* pose A — hips low (start). Straight legs, feet stacked on the floor,
          but the hip sags so the body is bent at the hip. */}
      <g className="pose-a">
        {/* supporting forearm flat, forward of the head: elbow(124,110) -> wrist(139,110) */}
        <line x1={124} y1={110} x2={139} y2={110} />
        {/* upper arm rising to a stacked shoulder: elbow(124,110) -> shoulder(126,94) */}
        <line x1={124} y1={110} x2={126} y2={94} />
        {/* torso to SAGGING hip near the floor */}
        <line x1={126} y1={94} x2={101} y2={108} />
        {/* straight legs from hip to stacked feet on the ground */}
        <line x1={101} y1={108} x2={66} y2={108} />
        {/* small foot at the stacked-feet end */}
        <line x1={66} y1={108} x2={58} y2={110} />
        {/* neck + head, stacked over the shoulder, looking right */}
        <line x1={126} y1={94} x2={130} y2={87} />
        <circle cx={133} cy={81} r={7} />
        {/* joint dots: shoulder, elbow, hip */}
        <circle cx={126} cy={94} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={124} cy={110} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={101} cy={108} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — hips driven up to a straight head-to-feet line. */}
      <g className="pose-b">
        {/* supporting forearm flat, forward of the head: elbow(124,110) -> wrist(139,110) */}
        <line x1={124} y1={110} x2={139} y2={110} />
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

      {/* movement arrow: the top hand travels UP toward the ceiling (a -> b) */}
      <g opacity={0.6}>
        <path d="M 113 78 L 113 50" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 108 55 L 113 50 L 118 55" strokeWidth={2} />
      </g>

      {/* shared full side-plank body (hips high) in BOTH poses; only the top arm
          changes. pose-a top arm resting ALONG the body line toward the hip. */}
      <g className="pose-a">
        {/* supporting forearm flat, forward of the head: elbow(124,110) -> wrist(139,110) */}
        <line x1={124} y1={110} x2={139} y2={110} />
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
        {/* supporting forearm flat, forward of the head: elbow(124,110) -> wrist(139,110) */}
        <line x1={124} y1={110} x2={139} y2={110} />
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
        {/* supporting forearm flat, forward of the head: elbow(124,110) -> wrist(139,110) */}
        <line x1={124} y1={110} x2={139} y2={110} />
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
        {/* supporting forearm flat, forward of the head: elbow(124,110) -> wrist(139,110) */}
        <line x1={124} y1={110} x2={139} y2={110} />
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
