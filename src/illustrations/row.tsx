import type { VariationGuide } from './types';

// path: ['Table row, knees bent', 'Table row, legs straight', 'Feet elevated', 'One-arm']
//
// The towel-door row is REMOVED as a progression step (door-hardware dependent,
// unstandardizable lean angle); it lives on only in the program note as a travel
// fallback. Index 0 reuses the existing under-table art (reads as knees-bent).
// Index 1 ("Table row, legs straight") is the SAME scene with the legs extended
// straight out to the heels on the floor (no knee bend).

/**
 * Table row, knees bent (inverted row).
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
        <path d="M 104 80 L 104 62" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 98 68 L 104 62 L 110 68" strokeWidth={2} />
      </g>

      {/* pose A — hanging low, arms straight UP to the bar. Body horizontal face-up:
          shoulders under the bar (right), hips left, knees bent, feet on floor.
          Torso 26: shoulder(116,82) -> hip(90,85). */}
      <g className="pose-a">
        {/* BOTH arms straight UP from shoulder(116,82) to the bar (two-hand grip) */}
        <line x1={116} y1={82} x2={112} y2={50} />
        <line x1={116} y1={82} x2={122} y2={50} />
        {/* head off the right end, body line: shoulder(116,82) -> hip(90,85) */}
        <line x1={116} y1={82} x2={90} y2={85} />
        {/* neck + head to the right of shoulders */}
        <line x1={116} y1={82} x2={128} y2={80} />
        <circle cx={135} cy={79} r={7} />
        {/* bent legs (thigh 18, shin 18): hip(90,85) -> knee(74,93) -> foot(86,106) */}
        <line x1={90} y1={85} x2={74} y2={93} />
        <line x1={74} y1={93} x2={86} y2={106} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={116} cy={82} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={90} cy={85} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={74} cy={93} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — chest pulled UP to the bar; elbow bent down below the bar line.
          The feet stay planted; the chest rises more than the hip, so the hip lifts
          only slightly. Torso 26: shoulder(116,66) -> hip(90,80). */}
      <g className="pose-b">
        {/* BOTH arms bent: shoulder(116,66) -> elbow(122,80) down -> hands at bar */}
        <line x1={116} y1={66} x2={122} y2={80} />
        <line x1={122} y1={80} x2={112} y2={50} />
        <line x1={122} y1={80} x2={122} y2={50} />
        {/* body raised: shoulder(116,66) -> hip(90,80) */}
        <line x1={116} y1={66} x2={90} y2={80} />
        {/* neck + head */}
        <line x1={116} y1={66} x2={128} y2={66} />
        <circle cx={135} cy={66} r={7} />
        {/* bent legs (thigh ~18, shin ~18): hip(90,80) -> knee(72,87) -> foot(84,104) */}
        <line x1={90} y1={80} x2={72} y2={87} />
        <line x1={72} y1={87} x2={84} y2={104} />
        {/* joint dots: shoulder, elbow, hip, knee */}
        <circle cx={116} cy={66} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={120} cy={80} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={90} cy={80} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={72} cy={87} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Table row, legs straight (inverted row, harder than knees-bent).
 * Distinguishing feature: identical under-bar scene to index 0, but the legs are
 * fully EXTENDED — the body is ONE long line from the shoulders through the hip
 * down to the HEELS on the floor (no knee bend, no knee joint dot). The longer
 * lever makes it harder than the knees-bent entry. pose-a = arms straight, body
 * hanging low; pose-b = chest pulled up to the bar, elbows bent down.
 */
function StraightLegRowArt() {
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

      {/* horizontal BAR / table edge overhead the chest, with a leg down to floor */}
      <g opacity={0.5}>
        <line x1={64} y1={50} x2={128} y2={50} />
        <line x1={68} y1={50} x2={68} y2={110} />
      </g>

      {/* movement arrow: chest travels UP toward the bar (a -> b) */}
      <g opacity={0.6}>
        <path d="M 104 78 L 104 60" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 98 66 L 104 60 L 110 66" strokeWidth={2} />
      </g>

      {/* pose A — hanging low, arms straight UP to the bar. Body one long line:
          shoulders(right, under the bar) -> hip -> STRAIGHT leg out to the heel on
          the floor (no knee bend). Torso 26: shoulder(116,84) -> hip(90,87);
          full leg 36: hip -> ankle(75,98) -> heel(61,108). */}
      <g className="pose-a">
        {/* BOTH arms straight UP from shoulder(116,84) to the bar (two-hand grip) */}
        <line x1={116} y1={84} x2={112} y2={50} />
        <line x1={116} y1={84} x2={122} y2={50} />
        {/* body line: shoulder(116,84) -> hip(90,87) */}
        <line x1={116} y1={84} x2={90} y2={87} />
        {/* neck + head to the right of shoulders */}
        <line x1={116} y1={84} x2={128} y2={82} />
        <circle cx={135} cy={81} r={7} />
        {/* STRAIGHT leg (36): hip(90,87) -> ankle(75,98) -> heel(61,108) on floor */}
        <line x1={90} y1={87} x2={75} y2={98} />
        <line x1={75} y1={98} x2={61} y2={108} />
        {/* joint dots: shoulder, hip (no knee — leg is straight) */}
        <circle cx={116} cy={84} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={90} cy={87} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — chest pulled UP to the bar; elbow bent below the bar; body still a
          straight line out to the heel (knee stays locked, heel stays planted).
          Torso ~26: shoulder(115,69) -> hip(90,80); full leg 36: hip -> ankle(79,94)
          -> heel(67,108). */}
      <g className="pose-b">
        {/* BOTH arms bent: shoulder(115,69) -> elbow(121,82) -> hands at bar */}
        <line x1={115} y1={69} x2={121} y2={82} />
        <line x1={121} y1={82} x2={112} y2={50} />
        <line x1={121} y1={82} x2={122} y2={50} />
        {/* body raised: shoulder(115,69) -> hip(90,80) */}
        <line x1={115} y1={69} x2={90} y2={80} />
        {/* neck + head */}
        <line x1={115} y1={69} x2={127} y2={68} />
        <circle cx={134} cy={67} r={7} />
        {/* STRAIGHT leg (36): hip(90,80) -> ankle(79,94) -> heel(67,108) on floor */}
        <line x1={90} y1={80} x2={79} y2={94} />
        <line x1={79} y1={94} x2={67} y2={108} />
        {/* joint dots: shoulder, elbow, hip (no knee — leg is straight) */}
        <circle cx={115} cy={69} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={119} cy={82} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={90} cy={80} r={2.5} fill="currentColor" stroke="none" />
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
        <line x1={44} y1={80} x2={72} y2={80} />
        <line x1={48} y1={80} x2={48} y2={110} />
        <line x1={68} y1={80} x2={68} y2={110} />
      </g>

      {/* movement arrow: chest travels UP toward the bar (a -> b) */}
      <g opacity={0.6}>
        <path d="M 124 76 L 124 58" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 118 64 L 124 58 L 130 64" strokeWidth={2} />
      </g>

      {/* pose A — hanging low, arms straight UP to the bar; body a straight line
          from the shoulders out to the FEET resting on the block top (y=80).
          Torso 26: shoulder(120,84) -> hip(94,83); full leg 36: hip -> ankle(58,80). */}
      <g className="pose-a">
        {/* straight arm UP: shoulder(120,84) to bar(120,48) */}
        <line x1={120} y1={84} x2={120} y2={48} />
        {/* straight rigid body: shoulder(120,84) -> hip(94,83) -> ankle(58,80) on block */}
        <line x1={120} y1={84} x2={94} y2={83} />
        <line x1={94} y1={83} x2={58} y2={80} />
        {/* neck + head to the right of shoulders */}
        <line x1={120} y1={84} x2={132} y2={83} />
        <circle cx={139} cy={82} r={7} />
        {/* joint dots: shoulder, hip */}
        <circle cx={120} cy={84} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={94} cy={83} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — chest pulled UP to the bar; elbow bent below the bar; body stays
          a rigid plank out to the feet. Torso 26: shoulder(120,66) -> hip(94,70);
          full leg 36: hip -> ankle(59,80) on block. */}
      <g className="pose-b">
        {/* bent arm: shoulder(120,66) -> elbow(124,80) -> hands at bar(120,48) */}
        <line x1={120} y1={66} x2={124} y2={80} />
        <line x1={124} y1={80} x2={120} y2={48} />
        {/* rigid body raised: shoulder(120,66) -> hip(94,70) -> ankle(59,80) on block */}
        <line x1={120} y1={66} x2={94} y2={70} />
        <line x1={94} y1={70} x2={59} y2={80} />
        {/* neck + head */}
        <line x1={120} y1={66} x2={132} y2={67} />
        <circle cx={139} cy={68} r={7} />
        {/* joint dots: shoulder, elbow, hip */}
        <circle cx={120} cy={66} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={124} cy={80} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={94} cy={70} r={2.5} fill="currentColor" stroke="none" />
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
        <path d="M 104 78 L 104 60" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 98 66 L 104 60 L 110 66" strokeWidth={2} />
      </g>

      {/* pose A — hanging low; ONE arm straight up to the bar, the FREE arm folded
          across the chest (short stub forward, not reaching the bar).
          Torso 26: shoulder(116,82) -> hip(90,85). */}
      <g className="pose-a">
        {/* working arm straight UP: shoulder(116,82) to bar(116,48) */}
        <line x1={116} y1={82} x2={116} y2={48} />
        {/* FREE arm resting DOWN-and-LEFT across the body, NOT on the bar:
            shoulder(116,82) -> elbow(106,90) -> hand(92,92) */}
        <line x1={116} y1={82} x2={106} y2={90} />
        <line x1={106} y1={90} x2={92} y2={92} />
        {/* body: shoulder(116,82) -> hip(90,85) */}
        <line x1={116} y1={82} x2={90} y2={85} />
        {/* neck + head */}
        <line x1={116} y1={82} x2={128} y2={80} />
        <circle cx={135} cy={79} r={7} />
        {/* bent legs (thigh ~18, shin ~18): hip(90,85) -> knee(74,93) -> foot(86,106) */}
        <line x1={90} y1={85} x2={74} y2={93} />
        <line x1={74} y1={93} x2={86} y2={106} />
        {/* joint dots: working shoulder, hip, knee */}
        <circle cx={116} cy={82} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={90} cy={85} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={74} cy={93} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — chest pulled UP by the single working arm (elbow bent down); the
          free arm drops STEEPLY down-and-left so it stays clear of the bent working
          arm at the chest. Torso 26: shoulder(116,64) -> hip(90,78). */}
      <g className="pose-b">
        {/* working arm bent: shoulder(116,64) -> elbow(122,78) -> hands at bar(116,48) */}
        <line x1={116} y1={64} x2={122} y2={78} />
        <line x1={122} y1={78} x2={116} y2={48} />
        {/* FREE arm dropped DOWN-and-LEFT, away from the working elbow:
            shoulder(116,64) -> elbow(106,76) -> hand(92,82) */}
        <line x1={116} y1={64} x2={106} y2={76} />
        <line x1={106} y1={76} x2={92} y2={82} />
        {/* body raised: shoulder(116,64) -> hip(90,78) */}
        <line x1={116} y1={64} x2={90} y2={78} />
        {/* neck + head */}
        <line x1={116} y1={64} x2={128} y2={64} />
        <circle cx={135} cy={64} r={7} />
        {/* bent legs (thigh ~18, shin ~18): hip(90,78) -> knee(72,85) -> foot(84,104) */}
        <line x1={90} y1={78} x2={72} y2={85} />
        <line x1={72} y1={85} x2={84} y2={104} />
        {/* joint dots: working shoulder, elbow, hip, knee */}
        <circle cx={116} cy={64} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={120} cy={78} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={90} cy={78} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={72} cy={85} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

const guides: VariationGuide[] = [
  {
    // 0 Table row, knees bent (reuses the existing under-table art)
    cues: ['Hang under the edge', 'Lead with the chest', 'Squeeze elbows behind you'],
    Art: UnderTableRowArt,
  },
  {
    // 1 Table row, legs straight — same under-table scene as index 0 but the legs
    // are extended straight out (heels on the floor), so the body is one long line
    // instead of knees-bent. Distinguishing feature: straight legs reaching out.
    cues: ['Walk the heels out straight', 'Lead with the chest', 'Squeeze elbows behind you'],
    Art: StraightLegRowArt,
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
