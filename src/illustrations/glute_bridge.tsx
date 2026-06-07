import type { VariationGuide } from './types';

// path: ['Two-leg bridge', 'Single-leg hip thrust', 'Shoulders elevated']
// Supine figure, side profile, faces +x (head on the LEFT, feet on the RIGHT).
// pose-a = hips down/low (start), pose-b = hips driven up (contracted top).
// Band sits just above the knees (faint line) per the program note.

/**
 * Two-leg glute bridge.
 * Supine: shoulders/upper back stay on the ground, both feet planted, knees bent
 * with shins ~vertical. pose-a = hips resting low; pose-b = hips driven up so the
 * body forms a straight line shoulders->hips->knees. Band above the knees.
 */
function TwoLegBridgeArt() {
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

      {/* movement arrow: hips travel up (a -> b) */}
      <g opacity={0.6}>
        <path d="M 100 96 L 100 70" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 94 76 L 100 70 L 106 76" strokeWidth={2} />
      </g>

      {/* pose A — hips resting low */}
      <g className="pose-a">
        {/* head + neck on the ground (left) */}
        <circle cx={44} cy={104} r={7} />
        <line x1={51} y1={104} x2={62} y2={104} />
        {/* torso along the ground: shoulder(62,104) -> hip(100,102) */}
        <line x1={62} y1={104} x2={100} y2={102} />
        {/* thigh up toward knee, shin down to planted foot */}
        <line x1={100} y1={102} x2={126} y2={96} />
        <line x1={126} y1={96} x2={130} y2={108} />
        {/* foot planted */}
        <line x1={130} y1={108} x2={142} y2={108} />
        {/* band above the knee (across thigh near knee) */}
        <line x1={118} y1={94} x2={124} y2={104} opacity={0.5} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={62} cy={104} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={100} cy={102} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={126} cy={96} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — hips driven up, straight shoulder->hip->knee line */}
      <g className="pose-b">
        {/* head + neck on the ground (left, unchanged) */}
        <circle cx={44} cy={104} r={7} />
        <line x1={51} y1={104} x2={62} y2={104} />
        {/* torso lifts diagonally: shoulder(62,104) -> hip(108,74) */}
        <line x1={62} y1={104} x2={108} y2={74} />
        {/* thigh down to knee (shins vertical): hip(108,74) -> knee(128,92) */}
        <line x1={108} y1={74} x2={128} y2={92} />
        {/* shin vertical to planted foot */}
        <line x1={128} y1={92} x2={130} y2={108} />
        {/* foot planted */}
        <line x1={130} y1={108} x2={142} y2={108} />
        {/* band above the knee */}
        <line x1={120} y1={84} x2={126} y2={94} opacity={0.5} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={62} cy={104} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={108} cy={74} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={128} cy={92} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Single-leg hip thrust (on the floor).
 * Same supine bridge, but ONE leg is extended straight out off the floor while
 * the other foot drives. Distinguishing feature: the free leg pointing up/out in
 * line with the torso. pose-a = hips low, free leg up; pose-b = hips driven up,
 * body + free leg form one straight line.
 */
function SingleLegHipThrustArt() {
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

      {/* movement arrow: hips travel up (a -> b) */}
      <g opacity={0.6}>
        <path d="M 100 96 L 100 70" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 94 76 L 100 70 L 106 76" strokeWidth={2} />
      </g>

      {/* pose A — hips low, working foot planted, free leg extended out */}
      <g className="pose-a">
        {/* head + neck on the ground */}
        <circle cx={44} cy={104} r={7} />
        <line x1={51} y1={104} x2={62} y2={104} />
        {/* torso along ground: shoulder -> hip */}
        <line x1={62} y1={104} x2={100} y2={102} />
        {/* working leg: thigh up to knee, shin down to planted foot */}
        <line x1={100} y1={102} x2={126} y2={96} />
        <line x1={126} y1={96} x2={130} y2={108} />
        <line x1={130} y1={108} x2={142} y2={108} />
        {/* FREE leg: one dead-straight extended limb (~36px, standard leg
            length), clearly raised off the floor and angled well above the
            working knee so the two legs read as separate (one planted/bent,
            one lifted/straight) */}
        <line x1={100} y1={102} x2={131} y2={83} />
        {/* band above working knee */}
        <line x1={118} y1={94} x2={124} y2={104} opacity={0.5} />
        {/* joint dots: shoulder, hip, working knee */}
        <circle cx={62} cy={104} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={100} cy={102} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={126} cy={96} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — hips up, body + free leg one straight line */}
      <g className="pose-b">
        {/* head + neck on the ground */}
        <circle cx={44} cy={104} r={7} />
        <line x1={51} y1={104} x2={62} y2={104} />
        {/* torso lifts: shoulder -> hip up */}
        <line x1={62} y1={104} x2={108} y2={74} />
        {/* working leg: thigh to knee, shin vertical to foot */}
        <line x1={108} y1={74} x2={128} y2={92} />
        <line x1={128} y1={92} x2={130} y2={108} />
        <line x1={130} y1={108} x2={142} y2={108} />
        {/* FREE leg: one dead-straight limb (~36px, standard leg length)
            continuing the torso line out/up. Hip->tip slope matches the
            shoulder->hip slope so body + free leg form ONE straight line at
            lockout (neutral free hip, no kink). */}
        <line x1={108} y1={74} x2={138} y2={54} />
        {/* band above working knee */}
        <line x1={120} y1={84} x2={126} y2={94} opacity={0.5} />
        {/* joint dots: shoulder, hip, working knee */}
        <circle cx={62} cy={104} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={108} cy={74} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={128} cy={92} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Shoulders-elevated hip thrust.
 * Upper back / shoulders rest on a raised bench (the distinguishing feature),
 * feet planted on the floor, hips thrust up to horizontal. pose-a = hips low
 * (hanging below the bench); pose-b = hips up so torso is horizontal/tabletop.
 */
function ShouldersElevatedArt() {
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

      {/* bench: a raised platform the shoulders rest on (left side) */}
      <g opacity={0.5}>
        {/* bench top surface */}
        <line x1={32} y1={84} x2={72} y2={84} />
        {/* bench legs */}
        <line x1={38} y1={84} x2={38} y2={110} />
        <line x1={66} y1={84} x2={66} y2={110} />
      </g>

      {/* movement arrow: hips travel up to tabletop (a -> b) */}
      <g opacity={0.6}>
        <path d="M 104 100 L 104 76" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 98 82 L 104 76 L 110 82" strokeWidth={2} />
      </g>

      {/* pose A — hips hanging low, shoulders on the bench */}
      <g className="pose-a">
        {/* head off the back edge of the bench (left) */}
        <circle cx={40} cy={78} r={7} />
        <line x1={47} y1={80} x2={56} y2={82} />
        {/* shoulders on bench top; torso drops down toward low hips */}
        <line x1={56} y1={82} x2={96} y2={104} />
        {/* thigh up to knee, shin down to planted foot */}
        <line x1={96} y1={104} x2={124} y2={98} />
        <line x1={124} y1={98} x2={128} y2={110} />
        <line x1={128} y1={110} x2={140} y2={110} />
        {/* band above knee */}
        <line x1={116} y1={96} x2={122} y2={106} opacity={0.5} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={56} cy={82} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={104} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={124} cy={98} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — hips driven up to tabletop (torso horizontal) */}
      <g className="pose-b">
        {/* head off the back edge */}
        <circle cx={40} cy={78} r={7} />
        <line x1={47} y1={80} x2={56} y2={82} />
        {/* shoulders on bench; torso horizontal to lifted hips */}
        <line x1={56} y1={82} x2={100} y2={82} />
        {/* thigh down to knee (shins vertical), shin to planted foot */}
        <line x1={100} y1={82} x2={126} y2={96} />
        <line x1={126} y1={96} x2={128} y2={110} />
        <line x1={128} y1={110} x2={140} y2={110} />
        {/* band above knee */}
        <line x1={118} y1={86} x2={124} y2={96} opacity={0.5} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={56} cy={82} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={100} cy={82} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={126} cy={96} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

const guides: VariationGuide[] = [
  {
    // 0 Two-leg bridge
    cues: ['Plant both feet flat', 'Push the floor away', 'Squeeze hips to the ceiling'],
    Art: TwoLegBridgeArt,
  },
  {
    // 1 Single-leg hip thrust
    cues: ['Point one leg out', 'Press through one heel', 'Lift hips level and tall'],
    Art: SingleLegHipThrustArt,
  },
  {
    // 2 Shoulders elevated
    cues: ['Rest shoulders on the bench', 'Drive heels into floor', 'Make the body a table'],
    Art: ShouldersElevatedArt,
  },
];
export default guides;
