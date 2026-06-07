import type { VariationGuide } from './types';

// path: ['Towel row on door', 'Row under sturdy table', 'Feet elevated', 'One-arm']

/**
 * Towel row on a door.
 * Distinguishing feature: the figure stands and LEANS BACK from a vertical door
 * line, feet planted on the floor, body in one straight diagonal line, holding a
 * towel looped around the door handle. pose-a = arms straight, body leaned far
 * back (away from door); pose-b = chest pulled up toward the hands/handle, elbows
 * bent back past the ribs, body more upright.
 */
function TowelRowArt() {
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

      {/* vertical DOOR on the right + handle the towel loops around */}
      <g opacity={0.5}>
        <line x1={170} y1={20} x2={170} y2={110} />
        <line x1={170} y1={60} x2={162} y2={60} />
      </g>

      {/* movement arrow: chest/torso travels up & forward toward the door (a -> b) */}
      <g opacity={0.6}>
        <path d="M 104 48 Q 118 44 130 50" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 123 44 L 130 50 L 121 54" strokeWidth={2} />
      </g>

      {/* pose A — STANDING, leaned BACK from the door in ONE straight diagonal line.
          Foot planted at the door base (right, y=108); ankle -> hip -> shoulder are
          COLINEAR (~38 deg from vertical), arms straight reaching to the handle. */}
      <g className="pose-a">
        {/* single straight body line: ankle(150,108) -> hip(128,80) -> shoulder(112,59) */}
        <line x1={150} y1={108} x2={128} y2={80} />
        <line x1={128} y1={80} x2={112} y2={59} />
        {/* neck + head continuing the same lean (back, away from door) */}
        <line x1={112} y1={59} x2={106} y2={52} />
        <circle cx={101} cy={46} r={7} />
        {/* straight arms reaching down/forward to the handle */}
        <line x1={112} y1={59} x2={140} y2={62} />
        {/* towel: hands(140,62) to handle(162,60) */}
        <line x1={140} y1={62} x2={162} y2={60} opacity={0.5} />
        {/* foot flat on ground at door base */}
        <line x1={150} y1={108} x2={162} y2={108} />
        {/* joint dots: shoulder, hip */}
        <circle cx={112} cy={59} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={128} cy={80} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — chest pulled UP to the handle; body stays ONE straight line but
          rotated more upright (~28 deg), elbows bent back past the ribs. */}
      <g className="pose-b">
        {/* single straight body line: ankle(150,108) -> hip(133,76) -> shoulder(121,53) */}
        <line x1={150} y1={108} x2={133} y2={76} />
        <line x1={133} y1={76} x2={121} y2={53} />
        {/* neck + head continuing the same line */}
        <line x1={121} y1={53} x2={116} y2={46} />
        <circle cx={111} cy={40} r={7} />
        {/* bent arm: shoulder(121,53) -> elbow(140,66) pulled back -> hands(150,60) */}
        <line x1={121} y1={53} x2={140} y2={66} />
        <line x1={140} y1={66} x2={150} y2={60} />
        {/* towel: hands(150,60) to handle(162,60) */}
        <line x1={150} y1={60} x2={162} y2={60} opacity={0.5} />
        {/* foot flat on ground at door base */}
        <line x1={150} y1={108} x2={162} y2={108} />
        {/* joint dots: shoulder, elbow, hip */}
        <circle cx={121} cy={53} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={140} cy={66} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={133} cy={76} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Row under a sturdy table (inverted row).
 * Distinguishing feature: the figure lies FACE-UP, body horizontal, UNDER a
 * horizontal bar/table edge, FEET on the floor (knees bent), pulling the chest UP
 * to the bar overhead. pose-a = arms straight, body hanging low; pose-b = chest
 * pulled up to the bar, elbows bent down past the body.
 */
function UnderTableRowArt() {
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

      {/* horizontal BAR / table edge overhead the chest, with a leg down to floor.
          The bar's right end STOPS at the grip (x=128) so it never crowds the head
          that pokes out further right; the supporting leg is at the LEFT end, clear
          of the head. */}
      <g opacity={0.5}>
        <line x1={64} y1={50} x2={128} y2={50} />
        <line x1={68} y1={50} x2={68} y2={110} />
      </g>

      {/* movement arrow: chest travels UP toward the bar (a -> b); placed LEFT of
          the grip arms so the grip, head and bar corridor stays uncluttered. */}
      <g opacity={0.6}>
        <path d="M 98 80 L 98 62" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 92 68 L 98 62 L 104 68" strokeWidth={2} />
      </g>

      {/* pose A — hanging low, arms straight UP to the bar. Body horizontal face-up:
          shoulders under the bar (right), hips left, knees bent, feet on floor. */}
      <g className="pose-a">
        {/* BOTH arms straight UP from shoulder(116,82) to the bar (two-hand grip) */}
        <line x1={116} y1={82} x2={112} y2={50} />
        <line x1={116} y1={82} x2={122} y2={50} />
        {/* head off the right end, body line: shoulder(116,82) -> hip(78,86) */}
        <line x1={116} y1={82} x2={78} y2={86} />
        {/* neck + head to the right of shoulders */}
        <line x1={116} y1={82} x2={128} y2={80} />
        <circle cx={135} cy={79} r={7} />
        {/* bent legs: hip(78,86) -> knee(60,98) -> foot on floor(72,108) */}
        <line x1={78} y1={86} x2={60} y2={98} />
        <line x1={60} y1={98} x2={72} y2={108} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={116} cy={82} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={78} cy={86} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={60} cy={98} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — chest pulled UP to the bar; elbow bent down below the bar line. */}
      <g className="pose-b">
        {/* BOTH arms bent: shoulder(116,66) -> elbow(122,80) down -> hands at bar */}
        <line x1={116} y1={66} x2={122} y2={80} />
        <line x1={122} y1={80} x2={112} y2={50} />
        <line x1={122} y1={80} x2={122} y2={50} />
        {/* body raised: shoulder(116,66) -> hip(78,74) */}
        <line x1={116} y1={66} x2={78} y2={74} />
        {/* neck + head */}
        <line x1={116} y1={66} x2={128} y2={66} />
        <circle cx={135} cy={66} r={7} />
        {/* bent legs: hip(78,74) -> knee(60,92) -> foot on floor(72,108) */}
        <line x1={78} y1={74} x2={60} y2={92} />
        <line x1={60} y1={92} x2={72} y2={108} />
        {/* joint dots: shoulder, elbow, hip, knee */}
        <circle cx={116} cy={66} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={120} cy={80} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={78} cy={74} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={60} cy={92} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Feet-elevated inverted row.
 * Distinguishing feature: same under-bar row but the FEET are up on a raised block
 * (left), so the body is horizontal/straight (no bent knees) and level with or
 * above the shoulders — harder. pose-a = arms straight, body hanging low & level;
 * pose-b = chest pulled up to the bar, body rigid plank.
 */
function FeetElevatedRowArt() {
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

      {/* horizontal BAR overhead (right) with a leg down to the floor */}
      <g opacity={0.5}>
        <line x1={90} y1={48} x2={156} y2={48} />
        <line x1={152} y1={48} x2={152} y2={110} />
      </g>

      {/* raised BLOCK under the FEET (left) — feet up, level with the body */}
      <g opacity={0.5}>
        <line x1={18} y1={80} x2={46} y2={80} />
        <line x1={22} y1={80} x2={22} y2={110} />
        <line x1={42} y1={80} x2={42} y2={110} />
      </g>

      {/* movement arrow: chest travels UP toward the bar (a -> b) */}
      <g opacity={0.6}>
        <path d="M 120 76 L 120 58" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 114 64 L 120 58 L 126 64" strokeWidth={2} />
      </g>

      {/* pose A — hanging low, arms straight UP to the bar; body a straight line
          from the shoulders out to the FEET resting on the block top (y=80). */}
      <g className="pose-a">
        {/* straight arm UP: shoulder(120,84) to bar(120,48) */}
        <line x1={120} y1={84} x2={120} y2={48} />
        {/* straight rigid body: shoulder(120,84) -> hip(82,82) -> ankle(48,80) on block */}
        <line x1={120} y1={84} x2={82} y2={82} />
        <line x1={82} y1={82} x2={48} y2={80} />
        {/* neck + head to the right of shoulders */}
        <line x1={120} y1={84} x2={132} y2={83} />
        <circle cx={139} cy={82} r={7} />
        {/* joint dots: shoulder, hip */}
        <circle cx={120} cy={84} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={82} cy={82} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — chest pulled UP to the bar; elbow bent below the bar; body stays
          a rigid plank out to the feet. */}
      <g className="pose-b">
        {/* bent arm: shoulder(120,66) -> elbow(124,80) -> hands at bar(120,48) */}
        <line x1={120} y1={66} x2={124} y2={80} />
        <line x1={124} y1={80} x2={120} y2={48} />
        {/* rigid body raised: shoulder(120,66) -> hip(82,72) -> ankle(48,80) on block */}
        <line x1={120} y1={66} x2={82} y2={72} />
        <line x1={82} y1={72} x2={48} y2={80} />
        {/* neck + head */}
        <line x1={120} y1={66} x2={132} y2={67} />
        <circle cx={139} cy={68} r={7} />
        {/* joint dots: shoulder, elbow, hip */}
        <circle cx={120} cy={66} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={124} cy={80} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={82} cy={72} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * One-arm row.
 * Distinguishing feature: the inverted-row body pulls with a SINGLE arm up to the
 * bar; the other arm is NOT on the bar (rests across the chest / hangs at the
 * side). The lone reaching arm is the signature. pose-a = single arm straight up,
 * body hanging low & rotated; pose-b = chest pulled up by the one arm, elbow bent.
 */
function OneArmRowArt() {
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

      {/* horizontal BAR overhead with a leg down to the floor */}
      <g opacity={0.5}>
        <line x1={70} y1={48} x2={150} y2={48} />
        <line x1={146} y1={48} x2={146} y2={110} />
      </g>

      {/* movement arrow: chest travels UP toward the bar, one side (a -> b) */}
      <g opacity={0.6}>
        <path d="M 118 78 L 118 60" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 112 66 L 118 60 L 124 66" strokeWidth={2} />
      </g>

      {/* pose A — hanging low; ONE arm straight up to the bar, the FREE arm folded
          across the chest (short stub forward, not reaching the bar). */}
      <g className="pose-a">
        {/* working arm straight UP: shoulder(116,82) to bar(116,48) */}
        <line x1={116} y1={82} x2={116} y2={48} />
        {/* FREE arm resting DOWN across the body, NOT on the bar:
            shoulder(116,82) -> elbow(108,90) -> hand(96,90) */}
        <line x1={116} y1={82} x2={108} y2={90} />
        <line x1={108} y1={90} x2={96} y2={90} />
        {/* body: shoulder(116,82) -> hip(78,86) */}
        <line x1={116} y1={82} x2={78} y2={86} />
        {/* neck + head */}
        <line x1={116} y1={82} x2={128} y2={80} />
        <circle cx={135} cy={79} r={7} />
        {/* bent legs: hip(78,86) -> knee(60,98) -> foot(72,108) */}
        <line x1={78} y1={86} x2={60} y2={98} />
        <line x1={60} y1={98} x2={72} y2={108} />
        {/* joint dots: working shoulder, hip, knee */}
        <circle cx={116} cy={82} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={78} cy={86} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={60} cy={98} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — chest pulled UP by the single working arm (elbow bent down); free
          arm still folded across the chest. */}
      <g className="pose-b">
        {/* working arm bent: shoulder(116,64) -> elbow(122,78) -> hands at bar(116,48) */}
        <line x1={116} y1={64} x2={122} y2={78} />
        <line x1={122} y1={78} x2={116} y2={48} />
        {/* FREE arm resting DOWN across the body, NOT on the bar:
            shoulder(116,64) -> elbow(108,74) -> hand(96,74) */}
        <line x1={116} y1={64} x2={108} y2={74} />
        <line x1={108} y1={74} x2={96} y2={74} />
        {/* body raised: shoulder(116,64) -> hip(78,72) */}
        <line x1={116} y1={64} x2={78} y2={72} />
        {/* neck + head */}
        <line x1={116} y1={64} x2={128} y2={64} />
        <circle cx={135} cy={64} r={7} />
        {/* bent legs: hip(78,72) -> knee(60,92) -> foot(72,108) */}
        <line x1={78} y1={72} x2={60} y2={92} />
        <line x1={60} y1={92} x2={72} y2={108} />
        {/* joint dots: working shoulder, elbow, hip, knee */}
        <circle cx={116} cy={64} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={120} cy={78} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={78} cy={72} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={60} cy={92} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

const guides: VariationGuide[] = [
  {
    // 0 Towel row on door
    cues: ['Loop towel on the handle', 'Lean back, body straight', 'Pull chest to hands'],
    Art: TowelRowArt,
  },
  {
    // 1 Row under sturdy table
    cues: ['Hang under the edge', 'Lead with the chest', 'Squeeze elbows behind you'],
    Art: UnderTableRowArt,
  },
  {
    // 2 Feet elevated
    cues: ['Stack feet on the block', 'Stay one straight line', 'Pull chest to the bar'],
    Art: FeetElevatedRowArt,
  },
  {
    // 3 One-arm
    cues: ['Grip with one hand', 'Pull chest to that hand', 'Lower slow and even'],
    Art: OneArmRowArt,
  },
];
export default guides;
