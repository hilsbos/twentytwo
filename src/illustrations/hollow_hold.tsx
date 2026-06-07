import type { VariationGuide } from './types';

// path: ['Tuck', 'One leg out', 'Full hollow']
// All three are the supine hollow-body hold; the legs are the distinguishing
// feature. pose-a = lying relaxed on the floor; pose-b = the held hollow dish
// (low back pressed to the floor, shoulders & legs floated up into a shallow
// banana). Side profile, head to the right, feet to the left.

/**
 * Tuck hollow hold. Distinguishing feature: BOTH knees bent and tucked up over
 * the hips (the easiest, most compact shape).
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

      {/* movement arrow: knees draw up toward the chest (a -> b) */}
      <g opacity={0.6}>
        <path d="M 78 104 Q 84 92 96 90" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 90 87 L 96 90 L 93 96" strokeWidth={2} />
      </g>

      {/* pose A — lying flat, knees up but feet still planted */}
      <g className="pose-a">
        <line x1={120} y1={104} x2={135} y2={103} />
        <line x1={135} y1={103} x2={148} y2={100} />
        <line x1={120} y1={104} x2={98} y2={106} />
        <line x1={120} y1={104} x2={128} y2={104} />
        <circle cx={134} cy={103} r={7} />
        <line x1={98} y1={106} x2={86} y2={98} />
        <line x1={86} y1={98} x2={80} y2={106} />
        <circle cx={120} cy={104} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={98} cy={106} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={86} cy={98} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — hollow tuck: shoulders lifted, both knees tucked to chest */}
      <g className="pose-b">
        {/* arms reaching toward the knees */}
        <line x1={116} y1={90} x2={106} y2={84} />
        <line x1={106} y1={84} x2={95} y2={82} />
        {/* torso shoulder -> hip */}
        <line x1={116} y1={90} x2={98} y2={104} />
        {/* neck + head */}
        <line x1={116} y1={90} x2={123} y2={87} />
        <circle cx={129} cy={84} r={7} />
        {/* thigh lifted (knee high over hip), shin folded back */}
        <line x1={98} y1={104} x2={90} y2={82} />
        <line x1={90} y1={82} x2={78} y2={86} />
        <circle cx={116} cy={90} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={98} cy={104} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={90} cy={82} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * One-leg-out hollow hold. Distinguishing feature: ONE leg extended straight
 * and floated low, the OTHER knee bent and tucked up (the half-way progression).
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

      {/* movement arrow: the extended leg floats up off the floor (a -> b) */}
      <g opacity={0.6}>
        <path d="M 60 104 L 60 90" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 55 95 L 60 90 L 65 95" strokeWidth={2} />
      </g>

      {/* pose A — lying flat */}
      <g className="pose-a">
        <line x1={120} y1={104} x2={135} y2={105} />
        <line x1={135} y1={105} x2={150} y2={106} />
        <line x1={120} y1={104} x2={98} y2={106} />
        <line x1={120} y1={104} x2={128} y2={104} />
        <circle cx={134} cy={103} r={7} />
        <line x1={98} y1={106} x2={80} y2={106} />
        <line x1={80} y1={106} x2={62} y2={106} />
        <line x1={62} y1={106} x2={56} y2={99} />
        <circle cx={120} cy={104} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={98} cy={106} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={80} cy={106} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — one leg extended/floated, the other knee tucked up */}
      <g className="pose-b">
        {/* arms overhead, floated off the floor */}
        <line x1={117} y1={90} x2={133} y2={86} />
        <line x1={133} y1={86} x2={149} y2={82} />
        {/* torso shoulder -> hip */}
        <line x1={117} y1={90} x2={98} y2={105} />
        {/* neck + head */}
        <line x1={117} y1={90} x2={124} y2={87} />
        <circle cx={130} cy={84} r={7} />
        {/* TUCKED leg: knee high & near-vertical, shin folded back over hip */}
        <line x1={98} y1={105} x2={95} y2={84} />
        <line x1={95} y1={84} x2={84} y2={88} />
        {/* EXTENDED leg: straight, floated low, reaching far left */}
        <line x1={98} y1={105} x2={78} y2={100} />
        <line x1={78} y1={100} x2={58} y2={95} />
        <line x1={58} y1={95} x2={52} y2={89} />
        <circle cx={117} cy={90} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={98} cy={105} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={95} cy={84} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={78} cy={100} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Full hollow hold. Distinguishing feature: BOTH legs extended straight and
 * floated off the floor, forming the shallow banana/dish with the low back
 * pressed down (the full progression).
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

      {/* movement arrow: the straight legs float up off the floor (a -> b) */}
      <g opacity={0.6}>
        <path d="M 70 104 L 70 92" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 65 97 L 70 92 L 75 97" strokeWidth={2} />
      </g>

      {/* pose A — lying flat, arms overhead and legs straight on the floor */}
      <g className="pose-a">
        <line x1={120} y1={104} x2={136} y2={105} />
        <line x1={136} y1={105} x2={151} y2={106} />
        <line x1={120} y1={104} x2={96} y2={106} />
        <line x1={120} y1={104} x2={128} y2={104} />
        <circle cx={134} cy={103} r={7} />
        <line x1={96} y1={106} x2={78} y2={106} />
        <line x1={78} y1={106} x2={60} y2={106} />
        <line x1={60} y1={106} x2={55} y2={98} />
        <circle cx={120} cy={104} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={106} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={78} cy={106} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — hollow dish: shallow banana, low back on floor, ends floated */}
      <g className="pose-b">
        {/* arms reaching overhead, floated off the floor */}
        <line x1={117} y1={90} x2={133} y2={85} />
        <line x1={133} y1={85} x2={149} y2={81} />
        {/* torso shoulder -> hip (shoulders lift) */}
        <line x1={117} y1={90} x2={98} y2={105} />
        {/* neck + head */}
        <line x1={117} y1={90} x2={124} y2={87} />
        <circle cx={130} cy={84} r={7} />
        {/* both legs straight, floated off the floor (mirror the shoulder lift) */}
        <line x1={98} y1={105} x2={80} y2={98} />
        <line x1={80} y1={98} x2={62} y2={91} />
        <line x1={62} y1={91} x2={56} y2={84} />
        <circle cx={117} cy={90} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={98} cy={105} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={80} cy={98} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

const guides: VariationGuide[] = [
  {
    // 0 Tuck
    cues: ['Press low back to floor', 'Hug knees over hips', 'Reach hands past the knees'],
    Art: TuckHollowArt,
  },
  {
    // 1 One leg out
    cues: ['Press low back to floor', 'Punch one heel away', 'Keep the floor pressed flat'],
    Art: OneLegHollowArt,
  },
  {
    // 2 Full hollow
    cues: ['Press low back to floor', 'Reach heels and hands long', 'Float just off the floor'],
    Art: FullHollowArt,
  },
];
export default guides;
