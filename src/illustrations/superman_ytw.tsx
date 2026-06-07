import type { VariationGuide } from './types';

// path: ['Floor arms in Y', 'T', 'W squeeze']
//
// All three are PRONE Superman holds: face-down on the floor, chest + arms +
// legs lifted. Side profile, figure faces +x (looking right, lying along the
// ground). The ONLY difference between the three is the ARM shape:
//   Y = arms reach forward-and-up overhead in a narrow V past the head.
//   T = arms straight out to the SIDES forming a wide crossbar (one up-back,
//       one down-back through the shoulder — a tall, splayed cross).
//   W = elbows bent and pulled back, hands up by the shoulders (goalpost).
// pose-a = lying flat/relaxed (chest, arms, legs resting near the floor).
// pose-b = the lifted Superman extension (chest, arms, legs raised off the floor).
//
// Geometry (CONVENTIONS §3): torso hip->shoulder ~28px (hip x=96, shoulder
// x=124); head circle r=7 to match every other full-size figure; legs ~36px
// total from the hip. Same person across the whole set.

/**
 * Superman — arms in Y.
 * Distinguishing feature: both arms reach forward-and-UP overhead in a narrow V
 * past the head (the "Y"). Prone, chest + arms + legs lifted in pose-b.
 */
function SupermanYArt() {
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

      {/* movement arrow: chest + arms lift up off the floor (a -> b) */}
      <g opacity={0.6}>
        <path d="M 150 96 L 150 74" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 144 80 L 150 74 L 156 80" strokeWidth={2} />
      </g>

      {/* pose A — lying flat, arms & legs resting near the floor */}
      <g className="pose-a">
        {/* torso along the floor: hip(96,104) -> shoulder(124,104) */}
        <line x1={96} y1={104} x2={124} y2={104} />
        {/* neck + head, looking forward (right), tucked below the reaching arms */}
        <line x1={124} y1={104} x2={132} y2={106} />
        <circle cx={139} cy={108} r={7} />
        {/* Y arms reaching forward overhead in a WIDE V, resting low */}
        <line x1={124} y1={104} x2={146} y2={100} />
        <line x1={146} y1={100} x2={170} y2={97} />
        <line x1={124} y1={104} x2={146} y2={106} />
        <line x1={146} y1={106} x2={170} y2={107} />
        {/* legs trailing back, resting: hip(96,104) -> knee(78,105) -> ankle(62,106) -> toe(54,108) */}
        <line x1={96} y1={104} x2={78} y2={105} />
        <line x1={78} y1={105} x2={62} y2={106} />
        <line x1={62} y1={106} x2={54} y2={108} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={124} cy={104} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={104} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={78} cy={105} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — lifted Superman: chest up, Y-arms up high in a wide V */}
      <g className="pose-b">
        {/* torso, chest lifted: hip(96,96) -> shoulder(124,88) */}
        <line x1={96} y1={96} x2={124} y2={88} />
        {/* neck + head lifted, looking forward-up, BELOW the spread arms */}
        <line x1={124} y1={88} x2={132} y2={90} />
        <circle cx={139} cy={93} r={7} />
        {/* Y arms reaching forward AND UP in a WIDE V past the head */}
        <line x1={124} y1={88} x2={146} y2={74} />
        <line x1={146} y1={74} x2={172} y2={62} />
        <line x1={124} y1={88} x2={148} y2={84} />
        <line x1={148} y1={84} x2={176} y2={80} />
        {/* legs raised off the floor: hip(96,96) -> knee(78,92) -> ankle(62,86) -> toe(54,84) */}
        <line x1={96} y1={96} x2={78} y2={92} />
        <line x1={78} y1={92} x2={62} y2={86} />
        <line x1={62} y1={86} x2={54} y2={84} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={124} cy={88} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={96} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={78} cy={92} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Superman — arms in T.
 * Distinguishing feature: arms straight out to the SIDES forming a WIDE crossbar
 * through the shoulder. Drawn in oblique perspective as a TALL splayed cross —
 * one arm reaches up-and-back, one down-and-back, both full length (~31px) — so
 * the crossbar reads visibly wider/taller than the Y's narrow forward V. Prone,
 * lifted in pose-b.
 */
function SupermanTArt() {
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

      {/* movement arrow: chest + arms lift up off the floor (a -> b) */}
      <g opacity={0.6}>
        <path d="M 150 96 L 150 74" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 144 80 L 150 74 L 156 80" strokeWidth={2} />
      </g>

      {/* pose A — lying flat. Arms out to the SIDES in oblique perspective: a
          tall, full-length cross through the shoulder (one arm up-back, one
          down-back), resting low near the floor. */}
      <g className="pose-a">
        {/* torso along the floor: hip(96,104) -> shoulder(124,104) */}
        <line x1={96} y1={104} x2={124} y2={104} />
        {/* neck + head */}
        <line x1={124} y1={104} x2={132} y2={104} />
        <circle cx={139} cy={104} r={7} />
        {/* T crossbar resting low: FAR arm up-back to (118,84), NEAR arm
            down-back to (116,109) — full-length, clearly two splayed limbs */}
        <line x1={124} y1={104} x2={118} y2={84} />
        <circle cx={118} cy={84} r={2.5} fill="currentColor" stroke="none" />
        <line x1={124} y1={104} x2={116} y2={109} />
        <circle cx={116} cy={109} r={2.5} fill="currentColor" stroke="none" />
        {/* legs trailing back, resting */}
        <line x1={96} y1={104} x2={78} y2={105} />
        <line x1={78} y1={105} x2={62} y2={106} />
        <line x1={62} y1={106} x2={54} y2={108} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={124} cy={104} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={104} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={78} cy={105} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — lifted Superman: chest up, the T crossbar splayed WIDE and
          well off the floor. Two full-length arms diverge through the shoulder:
          FAR arm up-back, NEAR arm down-back — a tall, unmistakable cross that
          reads wider than the Y's V. */}
      <g className="pose-b">
        {/* torso, chest lifted: hip(96,96) -> shoulder(124,86) */}
        <line x1={96} y1={96} x2={124} y2={86} />
        {/* neck + head lifted */}
        <line x1={124} y1={86} x2={132} y2={86} />
        <circle cx={139} cy={86} r={7} />
        {/* T crossbar, lifted: FAR arm reaches up-back to (110,58), NEAR arm
            reaches down-back to (114,100) — both full-length (~31px), both clear
            of the floor (lowest hand y=100 < ground 110), a tall splayed cross */}
        <line x1={124} y1={86} x2={110} y2={58} />
        <circle cx={110} cy={58} r={2.5} fill="currentColor" stroke="none" />
        <line x1={124} y1={86} x2={114} y2={100} />
        <circle cx={114} cy={100} r={2.5} fill="currentColor" stroke="none" />
        {/* legs raised off the floor */}
        <line x1={96} y1={96} x2={78} y2={92} />
        <line x1={78} y1={92} x2={62} y2={86} />
        <line x1={62} y1={86} x2={54} y2={84} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={124} cy={86} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={96} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={78} cy={92} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Superman — W squeeze.
 * Distinguishing feature: elbows bent and pulled BACK behind the shoulders,
 * hands up by the shoulders (a goalpost / "W"). Prone; pose-a rests flat (as the
 * Y and T siblings do) and pose-b lifts into the squeeze — elbows driven back,
 * hands high.
 */
function SupermanWArt() {
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

      {/* movement arrow: chest + bent arms lift up off the floor (a -> b),
          matching the Y and T siblings (pose-a flat -> pose-b lifted squeeze) */}
      <g opacity={0.6}>
        <path d="M 150 96 L 150 74" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 144 80 L 150 74 L 156 80" strokeWidth={2} />
      </g>

      {/* pose A — lying FLAT on the floor (family-consistent with Y and T:
          pose-a always rests on the ground). Elbows already bent in the W
          goalpost shape, hands by the shoulders, but everything resting low. */}
      <g className="pose-a">
        {/* torso along the floor: hip(96,104) -> shoulder(124,104) */}
        <line x1={96} y1={104} x2={124} y2={104} />
        {/* neck + head */}
        <line x1={124} y1={104} x2={132} y2={104} />
        <circle cx={139} cy={104} r={7} />
        {/* W bent arm resting low: shoulder(124,104) -> elbow back(110,107) ->
            forearm up to hand(118,96) — a bent goalpost near the floor */}
        <line x1={124} y1={104} x2={110} y2={107} />
        <line x1={110} y1={107} x2={118} y2={96} />
        {/* legs trailing back, resting */}
        <line x1={96} y1={104} x2={78} y2={105} />
        <line x1={78} y1={105} x2={62} y2={106} />
        <line x1={62} y1={106} x2={54} y2={108} />
        {/* joint dots: shoulder, elbow, hip, knee */}
        <circle cx={124} cy={104} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={110} cy={107} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={104} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={78} cy={105} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — the W SQUEEZE, lifted off the floor: chest up, elbows pulled
          BACK behind the shoulder, forearms kick UP so the hands sit by the
          shoulders — a clean, OPEN goalpost zigzag, kept clear of the head. */}
      <g className="pose-b">
        {/* torso, chest lifted: hip(96,96) -> shoulder(124,86) */}
        <line x1={96} y1={96} x2={124} y2={86} />
        {/* neck + head lifted */}
        <line x1={124} y1={86} x2={132} y2={86} />
        <circle cx={139} cy={86} r={7} />
        {/* W arm: shoulder(124,86) -> elbow pulled BACK behind shoulder(106,90)
            -> forearm kicks UP to hand by the shoulder(112,70). Open ~90deg bend,
            elbow well separated from the head (head at x139) */}
        <line x1={124} y1={86} x2={106} y2={90} />
        <line x1={106} y1={90} x2={112} y2={70} />
        {/* legs raised off the floor */}
        <line x1={96} y1={96} x2={78} y2={92} />
        <line x1={78} y1={92} x2={62} y2={86} />
        <line x1={62} y1={86} x2={54} y2={84} />
        {/* joint dots: shoulder, elbow, hip, knee */}
        <circle cx={124} cy={86} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={106} cy={90} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={96} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={78} cy={92} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

const guides: VariationGuide[] = [
  {
    // 0 Floor arms in Y
    cues: ['Lie face down, arms forward', 'Lift chest and arms', 'Reach hands past your head'],
    Art: SupermanYArt,
  },
  {
    // 1 T
    cues: ['Spread arms out wide', 'Lift chest off the floor', 'Reach hands to the walls'],
    Art: SupermanTArt,
  },
  {
    // 2 W squeeze
    cues: ['Bend elbows by your ribs', 'Lift chest off the floor', 'Drive elbows back, hands high'],
    Art: SupermanWArt,
  },
];
export default guides;
