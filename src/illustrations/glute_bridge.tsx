import type { VariationGuide } from './types';

// path: ['Two-leg bridge', 'B-stance bridge', 'Single-leg hip thrust', 'Shoulders elevated']
//
// NEW intermediate inserted at index 1 ("B-stance bridge"): a two-leg bridge
// with one heel planted forward as a kickstand, bridging the bilateral ->
// unilateral jump. It is fully drawn at index 1 below (BStanceBridgeArt — real
// 2-pose art with the staggered kickstand foot).
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

      {/* movement arrow: hips travel UP HIGH (a -> b), tip at the driven-up apex */}
      <g opacity={0.6}>
        <path d="M 92 100 L 92 80" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 86 86 L 92 80 L 98 86" strokeWidth={2} />
      </g>

      {/* pose A — hips resting low. Torso shoulder(62,104)->hip(90,104) = 28px.
          Both feet flat planted under the bent knees. */}
      <g className="pose-a">
        {/* head + neck on the ground (left) */}
        <circle cx={44} cy={104} r={7} />
        <line x1={51} y1={104} x2={62} y2={104} />
        {/* torso along the ground: shoulder(62,104) -> hip(90,104), 28px */}
        <line x1={62} y1={104} x2={90} y2={104} />
        {/* thigh up to bent knee, shin down to planted foot */}
        <line x1={90} y1={104} x2={104} y2={93} />
        <line x1={104} y1={93} x2={104} y2={108} />
        {/* foot planted FLAT */}
        <line x1={104} y1={108} x2={116} y2={108} />
        {/* band above the knee (across thigh near knee) */}
        <line x1={97} y1={95} x2={103} y2={103} opacity={0.5} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={62} cy={104} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={90} cy={104} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={104} cy={93} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — hips driven UP HIGH; the hip is the apex, sitting ABOVE the knee
          y so shoulders->hips->knees form a steep ramp clearly off the floor.
          Torso shoulder(62,104)->hip(83,85) = 28px, held constant with pose A so
          the figure does not appear to lengthen. Shin stays vertical. */}
      <g className="pose-b">
        {/* head + neck on the ground (left, unchanged) */}
        <circle cx={44} cy={104} r={7} />
        <line x1={51} y1={104} x2={62} y2={104} />
        {/* torso drives up: shoulder(62,104) -> hip(83,85), 28px */}
        <line x1={62} y1={104} x2={83} y2={85} />
        {/* thigh ramps down from the high hip to knee(104,92); shin vertical */}
        <line x1={83} y1={85} x2={104} y2={92} />
        <line x1={104} y1={92} x2={104} y2={108} />
        {/* foot planted (same as pose A) */}
        <line x1={104} y1={108} x2={116} y2={108} />
        {/* band above the knee */}
        <line x1={92} y1={84} x2={98} y2={92} opacity={0.5} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={62} cy={104} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={83} cy={85} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={104} cy={92} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * B-stance glute bridge.
 * A two-leg bridge with STAGGERED feet: the working leg's foot is planted flat
 * under its knee, while the OTHER leg is set forward as a light "kickstand" —
 * only the heel touches (toes lifted up) and the leg reaches further out, taking
 * little of the load. Distinguishing feature: the two feet are offset (one flat
 * under the knee, one heel reaching forward with toes up). It bridges the
 * bilateral two-leg bridge -> unilateral single-leg jump.
 * pose-a = hips resting low; pose-b = hips driven up.
 */
function BStanceBridgeArt() {
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

      {/* movement arrow: hips travel UP HIGH (a -> b) */}
      <g opacity={0.6}>
        <path d="M 92 100 L 92 80" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 86 86 L 92 80 L 98 86" strokeWidth={2} />
      </g>

      {/* pose A — hips resting low, staggered feet. Torso 28px, held constant. */}
      <g className="pose-a">
        {/* head + neck on the ground (left) */}
        <circle cx={44} cy={104} r={7} />
        <line x1={51} y1={104} x2={62} y2={104} />
        {/* torso along the ground: shoulder(62,104) -> hip(90,104), 28px */}
        <line x1={62} y1={104} x2={90} y2={104} />
        {/* WORKING leg: thigh up to a bent knee, shin down to a flat foot
            planted directly under the knee (same as the two-leg bridge) */}
        <line x1={90} y1={104} x2={104} y2={93} />
        <line x1={104} y1={93} x2={104} y2={108} />
        <line x1={104} y1={108} x2={116} y2={108} />
        {/* KICKSTAND leg: a REAL bent leg set forward as a prop — thigh to a knee
            dot, then shin reaching further forward to a HEEL-down/toes-up foot
            (the lifted toes are the kickstand tell). */}
        <line x1={90} y1={104} x2={110} y2={101} />
        <line x1={110} y1={101} x2={128} y2={108} />
        {/* heel down, toes lifted up (light kickstand contact) */}
        <line x1={128} y1={108} x2={135} y2={100} />
        {/* band above the working knee */}
        <line x1={97} y1={95} x2={103} y2={103} opacity={0.5} />
        {/* joint dots: shoulder, hip, working knee, kickstand knee */}
        <circle cx={62} cy={104} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={90} cy={104} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={104} cy={93} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={110} cy={101} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — hips driven UP HIGH, staggered feet; the hip is the apex above
          the working knee. The kickstand leg still reaches forward to its
          heel-down/toes-up foot, the distinguishing feature vs. two-leg. */}
      <g className="pose-b">
        {/* head + neck on the ground (left, unchanged) */}
        <circle cx={44} cy={104} r={7} />
        <line x1={51} y1={104} x2={62} y2={104} />
        {/* torso drives up: shoulder(62,104) -> hip(83,85), 28px */}
        <line x1={62} y1={104} x2={83} y2={85} />
        {/* WORKING leg: thigh ramps down from the high hip to knee(104,92); shin
            vertical to the flat foot (same foot as pose A) */}
        <line x1={83} y1={85} x2={104} y2={92} />
        <line x1={104} y1={92} x2={104} y2={108} />
        <line x1={104} y1={108} x2={116} y2={108} />
        {/* KICKSTAND leg: thigh from the high hip to a knee dot, shin reaching
            forward to the same HEEL-down/toes-up forward foot as pose A */}
        <line x1={83} y1={85} x2={108} y2={99} />
        <line x1={108} y1={99} x2={128} y2={108} />
        <line x1={128} y1={108} x2={135} y2={100} />
        {/* band above the working knee */}
        <line x1={92} y1={84} x2={98} y2={92} opacity={0.5} />
        {/* joint dots: shoulder, hip, working knee, kickstand knee */}
        <circle cx={62} cy={104} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={83} cy={85} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={104} cy={92} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={108} cy={99} r={2.5} fill="currentColor" stroke="none" />
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

      {/* movement arrow: hips travel UP HIGH (a -> b) */}
      <g opacity={0.6}>
        <path d="M 92 100 L 92 80" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 86 86 L 92 80 L 98 86" strokeWidth={2} />
      </g>

      {/* pose A — hips low, working foot planted, free leg extended out. Torso 28px. */}
      <g className="pose-a">
        {/* head + neck on the ground */}
        <circle cx={44} cy={104} r={7} />
        <line x1={51} y1={104} x2={62} y2={104} />
        {/* torso along ground: shoulder(62,104) -> hip(90,104), 28px */}
        <line x1={62} y1={104} x2={90} y2={104} />
        {/* working leg: thigh up to bent knee, shin down to planted foot */}
        <line x1={90} y1={104} x2={104} y2={93} />
        <line x1={104} y1={93} x2={104} y2={108} />
        <line x1={104} y1={108} x2={116} y2={108} />
        {/* FREE leg: one dead-straight extended limb, clearly raised off the floor
            and angled well above the working knee so the two legs read as separate
            (one planted/bent, one lifted/straight) */}
        <line x1={90} y1={104} x2={124} y2={86} />
        {/* band above working knee */}
        <line x1={97} y1={95} x2={103} y2={103} opacity={0.5} />
        {/* joint dots: shoulder, hip, working knee */}
        <circle cx={62} cy={104} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={90} cy={104} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={104} cy={93} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — hips driven UP HIGH; the hip is the apex above the working knee,
          and the body + free leg form ONE long straight line. Torso held at 28px. */}
      <g className="pose-b">
        {/* head + neck on the ground */}
        <circle cx={44} cy={104} r={7} />
        <line x1={51} y1={104} x2={62} y2={104} />
        {/* torso drives up: shoulder(62,104) -> hip(83,85), 28px */}
        <line x1={62} y1={104} x2={83} y2={85} />
        {/* working leg: thigh ramps down from the high hip to knee(104,92); shin vertical */}
        <line x1={83} y1={85} x2={104} y2={92} />
        <line x1={104} y1={92} x2={104} y2={108} />
        <line x1={104} y1={108} x2={116} y2={108} />
        {/* FREE leg: one dead-straight limb continuing the torso line out/up so
            body + free leg read as ONE straight line at lockout (no kink). */}
        <line x1={83} y1={85} x2={119} y2={73} />
        {/* band above working knee */}
        <line x1={92} y1={84} x2={98} y2={92} opacity={0.5} />
        {/* joint dots: shoulder, hip, working knee */}
        <circle cx={62} cy={104} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={83} cy={85} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={104} cy={92} r={2.5} fill="currentColor" stroke="none" />
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

      {/* movement arrow: hips travel UP to tabletop (a -> b) */}
      <g opacity={0.6}>
        <path d="M 104 100 L 104 74" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 98 80 L 104 74 L 110 80" strokeWidth={2} />
      </g>

      {/* pose A — hips hanging LOW toward the floor, shoulders on the bench. The
          deep sag gives a big lift delta vs. the tabletop end pose. */}
      <g className="pose-a">
        {/* head off the back edge of the bench (left) */}
        <circle cx={40} cy={78} r={7} />
        <line x1={47} y1={80} x2={56} y2={82} />
        {/* shoulders on bench top; torso drops steeply to low hips near the floor */}
        <line x1={56} y1={82} x2={96} y2={105} />
        {/* thigh up to knee, shin down to planted foot */}
        <line x1={96} y1={105} x2={120} y2={96} />
        <line x1={120} y1={96} x2={124} y2={108} />
        <line x1={124} y1={108} x2={136} y2={108} />
        {/* band above knee */}
        <line x1={112} y1={97} x2={118} y2={106} opacity={0.5} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={56} cy={82} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={105} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={120} cy={96} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — hips driven UP to tabletop: torso horizontal at bench height,
          shins vertical, the classic flat hip-thrust lockout. */}
      <g className="pose-b">
        {/* head off the back edge */}
        <circle cx={40} cy={78} r={7} />
        <line x1={47} y1={80} x2={56} y2={82} />
        {/* shoulders on bench; torso horizontal to lifted hips */}
        <line x1={56} y1={82} x2={100} y2={82} />
        {/* thigh down to knee, shin vertical to planted foot */}
        <line x1={100} y1={82} x2={118} y2={96} />
        <line x1={118} y1={96} x2={118} y2={108} />
        <line x1={118} y1={108} x2={130} y2={108} />
        {/* band above knee */}
        <line x1={108} y1={84} x2={114} y2={94} opacity={0.5} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={56} cy={82} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={100} cy={82} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={118} cy={96} r={2.5} fill="currentColor" stroke="none" />
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
    // 1 B-stance bridge
    cues: ['Set one heel as a kickstand', 'Drive through the planted foot', 'Lift hips level and tall'],
    Art: BStanceBridgeArt,
  },
  {
    // 2 Single-leg hip thrust
    cues: ['Point one leg out', 'Press through one heel', 'Lift hips level and tall'],
    Art: SingleLegHipThrustArt,
  },
  {
    // 3 Shoulders elevated
    cues: ['Rest shoulders on the bench', 'Drive heels into floor', 'Make the body a table'],
    Art: ShouldersElevatedArt,
  },
];
export default guides;
