import type { VariationGuide } from './types';

// path: ['Bodyweight 3s down', 'Pause squat', 'Bulgarian split', 'Pistol progression']
// Index 0 ("Bodyweight 3s down") is a fully-worked REFERENCE implementation
// (see CONVENTIONS.md). Indexes 1-3 are drawn here, render-verified.

/**
 * Bodyweight squat — REFERENCE ART.
 * Side profile, figure faces right. pose-a = standing tall, pose-b = deep squat
 * (hips back & down, thighs near parallel, torso leaning forward, arms reaching
 * forward to counterbalance). The loop band sits just above the knees (faint
 * horizontal line) — the program's "push the band out" cue.
 */
function BodyweightSquatArt() {
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

      {/* movement arrow: hips travel down and back (a -> b), an arc */}
      <g opacity={0.6}>
        <path d="M 130 56 Q 140 78 128 92" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 121 87 L 128 92 L 130 84" strokeWidth={2} />
      </g>

      {/* pose A — standing tall */}
      <g className="pose-a">
        {/* torso + neck + head */}
        <line x1={100} y1={42} x2={100} y2={68} />
        <line x1={100} y1={35} x2={100} y2={42} />
        <circle cx={100} cy={28} r={7} />
        {/* arm reaching slightly forward */}
        <line x1={100} y1={46} x2={112} y2={54} />
        <line x1={112} y1={54} x2={124} y2={52} />
        {/* leg straight: hip -> knee -> ankle -> toe */}
        <line x1={100} y1={68} x2={100} y2={88} />
        <line x1={100} y1={88} x2={100} y2={106} />
        <line x1={100} y1={106} x2={112} y2={106} />
        {/* loop band, just above the knee */}
        <line x1={94} y1={82} x2={106} y2={82} opacity={0.5} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={100} cy={42} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={100} cy={68} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={100} cy={88} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — deep squat */}
      <g className="pose-b">
        {/* torso leaning forward: hip(86,90) -> shoulder(98,66); neck + head */}
        <line x1={98} y1={66} x2={86} y2={90} />
        <line x1={98} y1={66} x2={96} y2={59} />
        <circle cx={94} cy={53} r={7} />
        {/* arms reaching forward to counterbalance */}
        <line x1={98} y1={68} x2={112} y2={68} />
        <line x1={112} y1={68} x2={124} y2={64} />
        {/* thigh ~horizontal: hip(86,90) -> knee(112,90); shin -> ankle -> toe */}
        <line x1={86} y1={90} x2={112} y2={90} />
        <line x1={112} y1={90} x2={108} y2={106} />
        <line x1={108} y1={106} x2={120} y2={106} />
        {/* loop band, just above the knee */}
        <line x1={92} y1={86} x2={106} y2={86} opacity={0.5} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={98} cy={66} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={86} cy={90} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={112} cy={90} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Pause squat.
 * Same squat groove as the reference, but the distinguishing idea is a held,
 * BELOW-PARALLEL bottom. Matching the family convention (and the reference at
 * index 0): pose-a = standing tall start; pose-b = the deep, PAUSED bottom (hips
 * clearly under the knees, thighs angled down past parallel) — the move's whole
 * point, shown solid under prefers-reduced-motion. A small clock marker near the
 * figure flags the held pause at the bottom.
 */
function PauseSquatArt() {
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

      {/* movement arrow: hips descend straight DOWN into the paused bottom (a -> b) */}
      <g opacity={0.6}>
        <path d="M 132 60 L 132 92" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 126 86 L 132 92 L 138 86" strokeWidth={2} />
      </g>

      {/* "pause / hold" marker — a small clock icon, away from the figure */}
      <g opacity={0.5}>
        <circle cx={46} cy={46} r={9} strokeWidth={1.5} />
        <path d="M 46 46 L 46 40" strokeWidth={1.5} />
        <path d="M 46 46 L 51 49" strokeWidth={1.5} />
      </g>

      {/* pose A — standing tall start */}
      <g className="pose-a">
        {/* torso + neck + head */}
        <line x1={100} y1={46} x2={100} y2={72} />
        <line x1={100} y1={39} x2={100} y2={46} />
        <circle cx={100} cy={32} r={7} />
        {/* arms down by the side, slightly forward */}
        <line x1={100} y1={50} x2={110} y2={60} />
        <line x1={110} y1={60} x2={120} y2={66} />
        {/* leg straight: hip -> knee -> ankle -> toe */}
        <line x1={100} y1={72} x2={100} y2={90} />
        <line x1={100} y1={90} x2={100} y2={108} />
        <line x1={100} y1={108} x2={112} y2={108} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={100} cy={46} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={100} cy={72} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={100} cy={90} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — deep PAUSED bottom (below parallel, hips sunk under knees) */}
      <g className="pose-b">
        {/* torso leaning forward: hip(84,98) -> shoulder(98,74); neck + head */}
        <line x1={98} y1={74} x2={84} y2={98} />
        <line x1={98} y1={74} x2={97} y2={66} />
        <circle cx={95} cy={60} r={7} />
        {/* arms reaching forward to counterbalance */}
        <line x1={98} y1={76} x2={112} y2={76} />
        <line x1={112} y1={76} x2={125} y2={73} />
        {/* thigh angled DOWN past parallel: hip(84,98) -> knee(110,94) */}
        <line x1={84} y1={98} x2={110} y2={94} />
        {/* shin: knee(110,94) -> ankle(106,108) -> toe */}
        <line x1={110} y1={94} x2={106} y2={108} />
        <line x1={106} y1={108} x2={118} y2={108} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={98} cy={74} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={84} cy={98} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={110} cy={94} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Bulgarian split squat.
 * Distinguishing feature: the REAR foot is up on a bench behind the figure, so
 * the figure is split-stance on one front leg. Side profile, facing right; the
 * bench is a raised horizontal block behind (left of) the figure. pose-a = top
 * (front leg straight), pose-b = bottom (front knee bent ~90, rear knee dropping
 * toward the floor).
 */
function BulgarianSplitArt() {
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

      {/* bench behind the figure — raised block the rear foot rests on */}
      <g opacity={0.5}>
        <line x1={40} y1={92} x2={78} y2={92} />
        <line x1={44} y1={92} x2={44} y2={110} />
        <line x1={74} y1={92} x2={74} y2={110} />
      </g>

      {/* movement arrow: hips travel down (a -> b) */}
      <g opacity={0.6}>
        <path d="M 138 62 L 138 86" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 132 80 L 138 86 L 144 80" strokeWidth={2} />
      </g>

      {/* pose A — top (front leg straight, rear foot on bench) */}
      <g className="pose-a">
        {/* torso slightly upright: hip(108,64) -> shoulder(110,38) */}
        <line x1={110} y1={38} x2={108} y2={64} />
        <line x1={110} y1={38} x2={111} y2={30} />
        <circle cx={112} cy={24} r={7} />
        {/* arms down in front */}
        <line x1={110} y1={42} x2={120} y2={52} />
        <line x1={120} y1={52} x2={130} y2={58} />
        {/* FRONT leg (right), near straight: hip(108,64) -> knee(110,86) -> ankle(112,108) -> toe */}
        <line x1={108} y1={64} x2={110} y2={86} />
        <line x1={110} y1={86} x2={112} y2={108} />
        <line x1={112} y1={108} x2={124} y2={108} />
        {/* REAR leg (left) going back to the bench: hip(108,64) -> knee(86,80) -> rear foot on bench(70,92) */}
        <line x1={108} y1={64} x2={86} y2={80} />
        <line x1={86} y1={80} x2={70} y2={92} />
        {/* joint dots: shoulder, hip, front knee, rear knee */}
        <circle cx={110} cy={38} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={108} cy={64} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={110} cy={86} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={86} cy={80} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — bottom (front knee bent ~90, hips sunk, rear knee dropped) */}
      <g className="pose-b">
        {/* torso slightly upright, lowered: hip(106,84) -> shoulder(108,58) */}
        <line x1={108} y1={58} x2={106} y2={84} />
        <line x1={108} y1={58} x2={109} y2={50} />
        <circle cx={110} cy={44} r={7} />
        {/* arms down in front */}
        <line x1={108} y1={62} x2={118} y2={70} />
        <line x1={118} y1={70} x2={128} y2={74} />
        {/* FRONT leg bent ~90: hip(106,84) -> knee(118,90) -> ankle(112,108) -> toe */}
        <line x1={106} y1={84} x2={118} y2={90} />
        <line x1={118} y1={90} x2={112} y2={108} />
        <line x1={112} y1={108} x2={124} y2={108} />
        {/* REAR leg dropping toward floor: hip(106,84) -> knee(84,98) -> rear foot still on bench(70,92) */}
        <line x1={106} y1={84} x2={84} y2={98} />
        <line x1={84} y1={98} x2={70} y2={92} />
        {/* joint dots: shoulder, hip, front knee, rear knee */}
        <circle cx={108} cy={58} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={106} cy={84} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={118} cy={90} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={84} cy={98} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Pistol squat progression.
 * Distinguishing feature: ONE leg extended straight FORWARD off the floor, the
 * figure balancing & squatting on the single standing leg. Side profile, facing
 * right. pose-a = standing tall on one leg, free leg lifted forward; pose-b =
 * deep single-leg squat (standing knee bent, free leg held out straight ahead).
 */
function PistolSquatArt() {
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

      {/* movement arrow: hips travel down and back (a -> b) */}
      <g opacity={0.6}>
        <path d="M 118 56 Q 128 78 116 92" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 109 87 L 116 92 L 118 84" strokeWidth={2} />
      </g>

      {/* pose A — standing tall on one leg, free leg lifted forward */}
      <g className="pose-a">
        {/* torso + neck + head */}
        <line x1={92} y1={42} x2={92} y2={68} />
        <line x1={92} y1={35} x2={92} y2={42} />
        <circle cx={92} cy={28} r={7} />
        {/* arms reaching forward for balance, held higher to clear the free leg */}
        <line x1={92} y1={46} x2={103} y2={44} />
        <line x1={103} y1={44} x2={116} y2={43} />
        {/* STANDING leg straight: hip(92,68) -> knee(92,88) -> ankle(92,106) -> toe */}
        <line x1={92} y1={68} x2={92} y2={88} />
        <line x1={92} y1={88} x2={92} y2={106} />
        <line x1={92} y1={106} x2={104} y2={106} />
        {/* FREE leg lifted straight forward off the floor: hip(92,68) -> knee(112,68) -> ankle(132,66) */}
        <line x1={92} y1={68} x2={112} y2={68} />
        <line x1={112} y1={68} x2={132} y2={66} />
        {/* joint dots: shoulder, hip, standing knee, free knee */}
        <circle cx={92} cy={42} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={92} cy={68} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={92} cy={88} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={112} cy={68} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — deep single-leg squat, free leg straight out ahead */}
      <g className="pose-b">
        {/* torso leaning forward: hip(80,90) -> shoulder(92,66); neck + head */}
        <line x1={92} y1={66} x2={80} y2={90} />
        <line x1={92} y1={66} x2={90} y2={59} />
        <circle cx={88} cy={53} r={7} />
        {/* arms reaching forward to counterbalance */}
        <line x1={92} y1={68} x2={106} y2={68} />
        <line x1={106} y1={68} x2={119} y2={66} />
        {/* STANDING leg bent deep: hip(80,90) -> knee(96,92) -> ankle(92,106) -> toe */}
        <line x1={80} y1={90} x2={96} y2={92} />
        <line x1={96} y1={92} x2={92} y2={106} />
        <line x1={92} y1={106} x2={104} y2={106} />
        {/* FREE leg held straight out forward, raised: hip(80,90) -> knee(106,84) -> ankle(132,80) */}
        <line x1={80} y1={90} x2={106} y2={84} />
        <line x1={106} y1={84} x2={132} y2={80} />
        {/* joint dots: shoulder, hip, standing knee, free knee */}
        <circle cx={92} cy={66} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={80} cy={90} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={92} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={106} cy={84} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

const guides: VariationGuide[] = [
  {
    // 0 Bodyweight 3s down — REFERENCE
    cues: ['Push the band out', 'Sit hips back and down', 'Drive the floor away'],
    Art: BodyweightSquatArt,
  },
  {
    // 1 Pause squat
    cues: ['Sit below parallel', 'Hold still two counts', 'Drive straight up'],
    Art: PauseSquatArt,
  },
  {
    // 2 Bulgarian split
    cues: ['Rear foot on bench', 'Sink the back knee', 'Drive through front heel'],
    Art: BulgarianSplitArt,
  },
  {
    // 3 Pistol progression
    cues: ['Reach free leg forward', 'Sit slow and controlled', 'Stand the floor away'],
    Art: PistolSquatArt,
  },
];
export default guides;
