import type { VariationGuide } from './types';

// path: ['Knees bent', 'Legs straight', 'Feet elevated']
//
// Chair (triceps) dip, side profile, figure faces +x (right). The chair / bed
// edge sits BEHIND the figure (to the left). The hands grip the front edge of
// the seat; the upper arms run down-and-back to those hands; the torso stays
// near-vertical and the hips hang forward of the seat. pose-a = top (arms
// straight, hips high). pose-b = bottom (elbows bent ~90 deg behind the body,
// hips dropped below the seat). The three variations differ ONLY in the legs:
//   0 Knees bent    — shins vertical, feet flat on the floor (easiest)
//   1 Legs straight — legs extended forward, heels on the floor
//   2 Feet elevated — legs straight and RAISED onto a second block (hardest)

// Shared chair: a seat top edge with a front leg, drawn as faint equipment.
// The figure grips the front corner near (64,68).
function ChairSeat() {
  return (
    <>
      <line x1={24} y1={68} x2={64} y2={68} opacity={0.5} />
      <line x1={60} y1={68} x2={60} y2={110} opacity={0.5} />
    </>
  );
}

/**
 * 0 — Knees bent. Easiest. Feet flat on the floor, knees bent ~90 deg, shins
 * vertical. Hands grip the seat edge behind; elbows bend straight back.
 */
function KneesBentDipArt() {
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
      <line x1={15} y1={110} x2={185} y2={110} opacity={0.25} strokeWidth={1.5} />
      <ChairSeat />

      {/* movement arrow: the body sinks straight down (a -> b) */}
      <g opacity={0.6}>
        <path d="M 100 56 L 100 90" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 94 84 L 100 90 L 106 84" strokeWidth={2} />
      </g>

      {/* pose A — top (arms straight, hips high) */}
      <g className="pose-a">
        {/* upper arm: shoulder (76,44) down-and-back to hand on seat (64,68) */}
        <line x1={76} y1={44} x2={64} y2={68} />
        {/* torso near-vertical: shoulder (76,44) -> hip (82,72) */}
        <line x1={76} y1={44} x2={82} y2={72} />
        {/* neck + head above the shoulder */}
        <line x1={76} y1={44} x2={79} y2={37} />
        <circle cx={81} cy={31} r={7} />
        {/* thigh forward: hip (82,72) -> knee (110,72) */}
        <line x1={82} y1={72} x2={110} y2={72} />
        {/* shin vertical: knee (110,72) -> ankle (110,110) */}
        <line x1={110} y1={72} x2={110} y2={110} />
        {/* foot flat */}
        <line x1={110} y1={110} x2={120} y2={110} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={76} cy={44} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={82} cy={72} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={110} cy={72} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — bottom (elbows bent straight back, body sunk below the seat).
          Depth comes from the SHOULDER dropping below the gripping hand, NOT
          from the elbow sinking under the support: hand stays on the seat at
          (64,68); the forearm runs UP to the hand from the elbow (54,79); the
          upper arm runs DOWN-forward from that elbow to the dropped shoulder
          (70,84), which is now the lowest joint of the arm. forearm ~15,
          upper arm ~17. */}
      <g className="pose-b">
        {/* forearm: elbow (54,79) -> hand on seat (64,68) */}
        <line x1={54} y1={79} x2={64} y2={68} />
        {/* upper arm: elbow (54,79) -> shoulder dropped low (70,84) */}
        <line x1={54} y1={79} x2={70} y2={84} />
        {/* torso leaning forward, sunk: shoulder (70,84) -> hip (88,100) */}
        <line x1={70} y1={84} x2={88} y2={100} />
        {/* neck + head, held up off the chest */}
        <line x1={70} y1={84} x2={73} y2={77} />
        <circle cx={75} cy={71} r={7} />
        {/* thigh forward: hip (88,100) -> knee (114,96) */}
        <line x1={88} y1={100} x2={114} y2={96} />
        {/* shin down to the floor: knee (114,96) -> ankle (112,110) */}
        <line x1={114} y1={96} x2={112} y2={110} />
        {/* foot flat */}
        <line x1={112} y1={110} x2={122} y2={110} />
        {/* joint dots: shoulder, elbow, hip, knee */}
        <circle cx={70} cy={84} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={54} cy={79} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={88} cy={100} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={114} cy={96} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * 1 — Legs straight. Harder. Legs extended straight forward, only the heels
 * resting on the floor. Same dip at the shoulders.
 */
function LegsStraightDipArt() {
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
      <line x1={15} y1={110} x2={185} y2={110} opacity={0.25} strokeWidth={1.5} />
      <ChairSeat />

      {/* movement arrow: the body sinks straight down (a -> b) */}
      <g opacity={0.6}>
        <path d="M 96 56 L 96 90" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 90 84 L 96 90 L 102 84" strokeWidth={2} />
      </g>

      {/* pose A — top (arms straight, hips high) */}
      <g className="pose-a">
        <line x1={76} y1={44} x2={64} y2={68} />
        <line x1={76} y1={44} x2={82} y2={72} />
        <line x1={76} y1={44} x2={79} y2={37} />
        <circle cx={81} cy={31} r={7} />
        {/* straight leg forward & down: hip (82,72) -> knee (114,88) -> heel (146,108) */}
        <line x1={82} y1={72} x2={114} y2={88} />
        <line x1={114} y1={88} x2={146} y2={108} />
        {/* toe up off the heel */}
        <line x1={146} y1={108} x2={154} y2={102} />
        <circle cx={76} cy={44} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={82} cy={72} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={114} cy={88} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — bottom: same dip (shoulder dropped below the gripping hand,
          elbow bent straight back), legs extended forward with heels on floor */}
      <g className="pose-b">
        {/* forearm: elbow (54,79) -> hand on seat (64,68) */}
        <line x1={54} y1={79} x2={64} y2={68} />
        {/* upper arm: elbow (54,79) -> dropped shoulder (70,84) */}
        <line x1={54} y1={79} x2={70} y2={84} />
        {/* torso leaning forward, sunk: shoulder (70,84) -> hip (88,100) */}
        <line x1={70} y1={84} x2={88} y2={100} />
        <line x1={70} y1={84} x2={73} y2={77} />
        <circle cx={75} cy={71} r={7} />
        {/* straight leg forward & down: hip (88,100) -> knee (120,105) -> heel (150,110) */}
        <line x1={88} y1={100} x2={120} y2={105} />
        <line x1={120} y1={105} x2={150} y2={110} />
        {/* toe up off the heel */}
        <line x1={150} y1={110} x2={158} y2={104} />
        <circle cx={70} cy={84} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={54} cy={79} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={88} cy={100} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={120} cy={105} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * 2 — Feet elevated. Hardest. Legs straight and RAISED onto a second block out
 * front, so the body is near-level; lowering tips the hips well below the seat.
 */
function FeetElevatedDipArt() {
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
      <line x1={15} y1={110} x2={185} y2={110} opacity={0.25} strokeWidth={1.5} />
      <ChairSeat />

      {/* second block (foot support) out front, raised off the floor */}
      <g opacity={0.5}>
        <line x1={150} y1={64} x2={182} y2={64} />
        <line x1={154} y1={64} x2={154} y2={110} />
        <line x1={178} y1={64} x2={178} y2={110} />
      </g>

      {/* movement arrow: the body sinks straight down (a -> b) */}
      <g opacity={0.6}>
        <path d="M 96 56 L 96 90" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 90 84 L 96 90 L 102 84" strokeWidth={2} />
      </g>

      {/* pose A — top (arms straight, hips high) */}
      <g className="pose-a">
        <line x1={76} y1={44} x2={64} y2={68} />
        <line x1={76} y1={44} x2={82} y2={70} />
        <line x1={76} y1={44} x2={79} y2={37} />
        <circle cx={81} cy={31} r={7} />
        {/* straight leg raised onto the block: hip (82,70) -> knee (118,65) -> ankle (162,63) on the block top */}
        <line x1={82} y1={70} x2={118} y2={65} />
        <line x1={118} y1={65} x2={162} y2={63} />
        <circle cx={76} cy={44} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={82} cy={70} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={118} cy={65} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — bottom: same dip (shoulder dropped below the gripping hand,
          elbow bent straight back); feet stay up on the block, so the straight
          leg climbs from the low hip up to the raised block */}
      <g className="pose-b">
        {/* forearm: elbow (54,79) -> hand on seat (64,68) */}
        <line x1={54} y1={79} x2={64} y2={68} />
        {/* upper arm: elbow (54,79) -> dropped shoulder (70,84) */}
        <line x1={54} y1={79} x2={70} y2={84} />
        {/* torso leaning forward, sunk: shoulder (70,84) -> hip (88,100) */}
        <line x1={70} y1={84} x2={88} y2={100} />
        <line x1={70} y1={84} x2={73} y2={77} />
        <circle cx={75} cy={71} r={7} />
        {/* straight leg climbs from the low hip up to the block: hip (88,100) -> knee (124,82) -> ankle (162,63) */}
        <line x1={88} y1={100} x2={124} y2={82} />
        <line x1={124} y1={82} x2={162} y2={63} />
        <circle cx={70} cy={84} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={54} cy={79} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={88} cy={100} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={124} cy={82} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

const guides: VariationGuide[] = [
  {
    // 0 Knees bent
    cues: ['Grip the seat edge', 'Bend elbows straight back', 'Press the seat down'],
    Art: KneesBentDipArt,
  },
  {
    // 1 Legs straight
    cues: ['Walk the heels out', 'Sink below the seat', 'Press tall, lock elbows'],
    Art: LegsStraightDipArt,
  },
  {
    // 2 Feet elevated
    cues: ['Heels up on the block', 'Drop the hips down', 'Drive the seat away'],
    Art: FeetElevatedDipArt,
  },
];
export default guides;
