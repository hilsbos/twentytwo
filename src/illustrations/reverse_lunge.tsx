import type { VariationGuide } from './types';

// path: ['Reverse lunge', 'Walking lunge', 'Deficit / jump']

/**
 * Reverse lunge.
 * Distinguishing feature: one leg steps BACKWARD; the rear knee drops toward the
 * floor BEHIND the figure (rear foot up on the toe), front shin vertical. Side
 * profile, facing right. pose-a = standing tall; pose-b = lunged down, rear leg
 * extended back with the trailing knee low.
 */
function ReverseLungeArt() {
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

      {/* movement arrow: rear foot steps back & hips sink (a -> b) */}
      <g opacity={0.6}>
        <path d="M 96 60 Q 78 70 70 92" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 64 86 L 70 92 L 76 88" strokeWidth={2} />
      </g>

      {/* pose A — standing tall, feet together */}
      <g className="pose-a">
        {/* torso + neck + head */}
        <line x1={104} y1={42} x2={104} y2={68} />
        <line x1={104} y1={35} x2={104} y2={42} />
        <circle cx={104} cy={28} r={7} />
        {/* arm down at side, slightly forward */}
        <line x1={104} y1={46} x2={112} y2={58} />
        <line x1={112} y1={58} x2={118} y2={68} />
        {/* leg straight: hip -> knee -> ankle -> toe */}
        <line x1={104} y1={68} x2={104} y2={88} />
        <line x1={104} y1={88} x2={104} y2={106} />
        <line x1={104} y1={106} x2={116} y2={106} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={104} cy={42} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={104} cy={68} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={104} cy={88} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — lunged down: FRONT leg (right) shin vertical, REAR leg extended
          back with knee dropped low behind, rear foot on the toe. */}
      <g className="pose-b">
        {/* torso upright, lowered: hip(108,82) -> shoulder(108,56) */}
        <line x1={108} y1={56} x2={108} y2={82} />
        <line x1={108} y1={49} x2={108} y2={56} />
        <circle cx={108} cy={42} r={7} />
        {/* arm down in front */}
        <line x1={108} y1={60} x2={116} y2={70} />
        <line x1={116} y1={70} x2={122} y2={80} />
        {/* FRONT leg: hip(108,82) -> knee(118,92) -> ankle(118,108) -> toe (shin ~vertical) */}
        <line x1={108} y1={82} x2={118} y2={92} />
        <line x1={118} y1={92} x2={118} y2={108} />
        <line x1={118} y1={108} x2={130} y2={108} />
        {/* REAR leg extended back: hip(108,82) -> knee(86,98) -> ball of foot(74,108) */}
        <line x1={108} y1={82} x2={86} y2={98} />
        <line x1={86} y1={98} x2={74} y2={108} />
        {/* joint dots: shoulder, hip, front knee, rear knee */}
        <circle cx={108} cy={56} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={108} cy={82} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={118} cy={92} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={86} cy={98} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Walking lunge.
 * Distinguishing feature: a FORWARD-travelling lunge — the figure lunges onto a
 * leg planted AHEAD, then steps through forward. Two footprints on the ground
 * (back→front) and a forward-pointing travel arrow mark the locomotion. Side
 * profile, facing right. pose-a = bottom of a forward lunge (front leg ahead,
 * rear leg trailing); pose-b = mid-stride, rear leg swinging through forward.
 */
function WalkingLungeArt() {
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

      {/* footprints marking forward travel (rear spot -> front spot) */}
      <g opacity={0.5}>
        <line x1={62} y1={110} x2={74} y2={110} strokeWidth={3} />
        <line x1={124} y1={110} x2={136} y2={110} strokeWidth={3} />
      </g>

      {/* movement arrow: travel FORWARD (a -> b), pointing right along the path */}
      <g opacity={0.6}>
        <path d="M 92 24 L 150 24" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 144 18 L 150 24 L 144 30" strokeWidth={2} />
      </g>

      {/* pose A — bottom of a forward lunge: FRONT leg planted ahead (right), rear
          leg trailing behind with the knee dropped. */}
      <g className="pose-a">
        {/* torso upright: hip(96,80) -> shoulder(96,54) */}
        <line x1={96} y1={54} x2={96} y2={80} />
        <line x1={96} y1={47} x2={96} y2={54} />
        <circle cx={96} cy={40} r={7} />
        {/* arms swinging (opposite): one forward, one back */}
        <line x1={96} y1={58} x2={106} y2={66} />
        <line x1={106} y1={66} x2={114} y2={74} />
        {/* FRONT leg ahead: hip(96,80) -> knee(118,90) -> ankle(124,108) -> toe */}
        <line x1={96} y1={80} x2={118} y2={90} />
        <line x1={118} y1={90} x2={124} y2={108} />
        <line x1={124} y1={108} x2={136} y2={108} />
        {/* REAR leg trailing: hip(96,80) -> knee(80,96) -> ball of foot(64,108) */}
        <line x1={96} y1={80} x2={80} y2={96} />
        <line x1={80} y1={96} x2={64} y2={108} />
        {/* joint dots */}
        <circle cx={96} cy={54} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={80} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={118} cy={90} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={80} cy={96} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — the NEXT forward lunge: figure has advanced one stride; the old
          rear leg has swung through and planted AHEAD at the front footprint, the
          old front leg now trails behind. The whole figure has moved right. */}
      <g className="pose-b">
        {/* torso upright, advanced right: hip(128,80) -> shoulder(128,54) */}
        <line x1={128} y1={54} x2={128} y2={80} />
        <line x1={128} y1={47} x2={128} y2={54} />
        <circle cx={128} cy={40} r={7} />
        {/* arm swinging forward */}
        <line x1={128} y1={58} x2={138} y2={66} />
        <line x1={138} y1={66} x2={146} y2={74} />
        {/* NEW front leg planted ahead at the front footprint: hip(128,80) -> knee(150,90) -> ankle(150,108) -> toe(162,108) */}
        <line x1={128} y1={80} x2={150} y2={90} />
        <line x1={150} y1={90} x2={150} y2={108} />
        <line x1={150} y1={108} x2={162} y2={108} />
        {/* OLD front leg now trailing behind: hip(128,80) -> knee(112,96) -> ball of foot(96,108) */}
        <line x1={128} y1={80} x2={112} y2={96} />
        <line x1={112} y1={96} x2={96} y2={108} />
        {/* joint dots */}
        <circle cx={128} cy={54} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={128} cy={80} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={150} cy={90} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={112} cy={96} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Deficit / jump lunge.
 * Distinguishing feature: an EXPLOSIVE jump — the figure leaves the ground (both
 * feet clearly off the floor, legs tucked) between lunges. Side profile, facing
 * right. pose-a = deep lunge bottom (loaded, about to spring); pose-b = airborne
 * (whole figure raised off the ground, knees tucked up), upward arrow.
 */
function JumpLungeArt() {
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

      {/* movement arrow: explode straight UP off the floor (a -> b) */}
      <g opacity={0.6}>
        <path d="M 140 70 L 140 36" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 134 42 L 140 36 L 146 42" strokeWidth={2} />
      </g>

      {/* pose A — deep lunge bottom, loaded on the floor (front shin vertical,
          rear knee low) ready to spring. */}
      <g className="pose-a">
        {/* torso upright: hip(100,84) -> shoulder(100,58) */}
        <line x1={100} y1={58} x2={100} y2={84} />
        <line x1={100} y1={51} x2={100} y2={58} />
        <circle cx={100} cy={44} r={7} />
        {/* arm cocked back, ready */}
        <line x1={100} y1={62} x2={92} y2={72} />
        <line x1={92} y1={72} x2={86} y2={82} />
        {/* FRONT leg: hip(100,84) -> knee(110,94) -> ankle(110,108) -> toe */}
        <line x1={100} y1={84} x2={110} y2={94} />
        <line x1={110} y1={94} x2={110} y2={108} />
        <line x1={110} y1={108} x2={122} y2={108} />
        {/* REAR leg trailing low: hip(100,84) -> knee(80,100) -> ball of foot(68,108) */}
        <line x1={100} y1={84} x2={80} y2={100} />
        <line x1={80} y1={100} x2={68} y2={108} />
        {/* joint dots */}
        <circle cx={100} cy={58} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={100} cy={84} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={110} cy={94} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={80} cy={100} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — AIRBORNE: whole figure lifted off the ground, both feet well
          above the ground line, knees tucked up (legs switching mid-air). */}
      <g className="pose-b">
        {/* torso upright, high: hip(112,60) -> shoulder(112,34) */}
        <line x1={112} y1={34} x2={112} y2={60} />
        <line x1={112} y1={27} x2={112} y2={34} />
        <circle cx={112} cy={20} r={7} />
        {/* arms driving up */}
        <line x1={112} y1={38} x2={104} y2={30} />
        <line x1={104} y1={30} x2={98} y2={22} />
        {/* one knee tucked high & forward: hip(112,60) -> knee(128,62) -> foot(132,78) */}
        <line x1={112} y1={60} x2={128} y2={62} />
        <line x1={128} y1={62} x2={132} y2={78} />
        {/* other leg tucked back, foot off ground: hip(112,60) -> knee(98,72) -> foot(94,86) */}
        <line x1={112} y1={60} x2={98} y2={72} />
        <line x1={98} y1={72} x2={94} y2={86} />
        {/* joint dots */}
        <circle cx={112} cy={34} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={112} cy={60} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={128} cy={62} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={98} cy={72} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

const guides: VariationGuide[] = [
  {
    // 0 Reverse lunge
    cues: ['Stand tall and braced', 'Step one foot back', 'Drive through front heel'],
    Art: ReverseLungeArt,
  },
  {
    // 1 Walking lunge
    cues: ['Long step straight ahead', 'Sink the back knee', 'Step through and forward'],
    Art: WalkingLungeArt,
  },
  {
    // 2 Deficit / jump
    cues: ['Sink into a deep lunge', 'Explode off the floor', 'Land soft and switch'],
    Art: JumpLungeArt,
  },
];
export default guides;
