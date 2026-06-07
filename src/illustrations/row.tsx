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
          the grip arms so the grip, head and bar corridor stays uncluttered. The
          travel is now wide (chest rises ~22px), so the arrow spans it. */}
      <g opacity={0.6}>
        <path d="M 104 86 L 104 60" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 98 66 L 104 60 L 110 66" strokeWidth={2} />
      </g>

      {/* pose A — hanging LOW with arms fully straight UP to the bar; the chest sits
          well below the bar so the row has a long way to travel. Body face-up:
          shoulders under the bar (right), hips left, knees bent, feet on floor.
          Torso 26: shoulder(116,88) -> hip(90,90). */}
      <g className="pose-a">
        {/* BOTH arms straight UP from shoulder(116,88) to the bar (two-hand grip) */}
        <line x1={116} y1={88} x2={112} y2={50} />
        <line x1={116} y1={88} x2={120} y2={50} />
        {/* head off the right end, body line: shoulder(116,88) -> hip(90,90) */}
        <line x1={116} y1={88} x2={90} y2={90} />
        {/* neck + head to the right of shoulders */}
        <line x1={116} y1={88} x2={128} y2={86} />
        <circle cx={135} cy={85} r={7} />
        {/* bent legs (thigh 18, shin 18): hip(90,90) -> knee(74,97) -> foot(86,108) */}
        <line x1={90} y1={90} x2={74} y2={97} />
        <line x1={74} y1={97} x2={86} y2={108} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={116} cy={88} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={90} cy={90} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={74} cy={97} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — chest pulled UP close to the bar; elbows driven DOWN-AND-BACK past
          the body (well behind the shoulder), the signature of a finished row. The
          chest travels ~22px up from pose-a; the feet stay planted so the hip lifts
          less than the chest. Torso 26: shoulder(116,66) -> hip(90,76). */}
      <g className="pose-b">
        {/* BOTH arms bent, elbows driven back/down: shoulder(116,66) -> elbow(126,76)
            -> forearm back up to the grip at the bar */}
        <line x1={116} y1={66} x2={126} y2={76} />
        <line x1={126} y1={76} x2={113} y2={50} />
        <line x1={126} y1={76} x2={121} y2={50} />
        {/* body raised: shoulder(116,66) -> hip(90,76) */}
        <line x1={116} y1={66} x2={90} y2={76} />
        {/* neck + head */}
        <line x1={116} y1={66} x2={128} y2={65} />
        <circle cx={135} cy={64} r={7} />
        {/* bent legs (thigh ~18, shin ~18): hip(90,76) -> knee(72,85) -> foot(84,104) */}
        <line x1={90} y1={76} x2={72} y2={85} />
        <line x1={72} y1={85} x2={84} y2={104} />
        {/* joint dots: shoulder, elbow, hip, knee */}
        <circle cx={116} cy={66} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={126} cy={76} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={90} cy={76} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={72} cy={85} r={2.5} fill="currentColor" stroke="none" />
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

      {/* movement arrow: chest travels UP toward the bar (a -> b); spans the wide
          ~24px travel from the low hang to the bar. */}
      <g opacity={0.6}>
        <path d="M 104 86 L 104 60" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 98 66 L 104 60 L 110 66" strokeWidth={2} />
      </g>

      {/* pose A — hanging LOW with arms fully straight UP to the bar; chest well
          below the bar so the row travels a long way. Body one long line:
          shoulders(right, under the bar) -> hip -> STRAIGHT leg out to the heel on
          the floor (no knee bend). Torso 26: shoulder(116,90) -> hip(90,92);
          full leg 36: hip -> ankle(76,103) -> heel(62,109). */}
      <g className="pose-a">
        {/* BOTH arms straight UP from shoulder(116,90) to the bar (two-hand grip) */}
        <line x1={116} y1={90} x2={112} y2={50} />
        <line x1={116} y1={90} x2={120} y2={50} />
        {/* body line: shoulder(116,90) -> hip(90,92) */}
        <line x1={116} y1={90} x2={90} y2={92} />
        {/* neck + head to the right of shoulders */}
        <line x1={116} y1={90} x2={128} y2={88} />
        <circle cx={135} cy={87} r={7} />
        {/* STRAIGHT leg (36): hip(90,92) -> ankle(76,103) -> heel(62,109) on floor */}
        <line x1={90} y1={92} x2={76} y2={103} />
        <line x1={76} y1={103} x2={62} y2={109} />
        {/* joint dots: shoulder, hip (no knee — leg is straight) */}
        <circle cx={116} cy={90} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={90} cy={92} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — chest pulled UP close to the bar; elbows driven DOWN-AND-BACK past
          the body; the body stays a straight line out to the heel (knee stays
          locked, heel planted). The chest rises ~24px from pose-a. Torso 26:
          shoulder(116,66) -> hip(90,76); full leg 36: hip -> ankle(78,90) ->
          heel(66,108). */}
      <g className="pose-b">
        {/* BOTH arms bent, elbows driven back/down: shoulder(116,66) -> elbow(126,76)
            -> forearm back up to the grip */}
        <line x1={116} y1={66} x2={126} y2={76} />
        <line x1={126} y1={76} x2={113} y2={50} />
        <line x1={126} y1={76} x2={121} y2={50} />
        {/* body raised: shoulder(116,66) -> hip(90,76) */}
        <line x1={116} y1={66} x2={90} y2={76} />
        {/* neck + head */}
        <line x1={116} y1={66} x2={128} y2={65} />
        <circle cx={135} cy={64} r={7} />
        {/* STRAIGHT leg (36): hip(90,76) -> ankle(78,90) -> heel(66,108) on floor */}
        <line x1={90} y1={76} x2={78} y2={90} />
        <line x1={78} y1={90} x2={66} y2={108} />
        {/* joint dots: shoulder, elbow, hip (no knee — leg is straight) */}
        <circle cx={116} cy={66} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={126} cy={76} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={90} cy={76} r={2.5} fill="currentColor" stroke="none" />
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

      {/* movement arrow: chest travels UP toward the bar, one side (a -> b); spans
          the wider ~22px travel matching the table-row siblings. */}
      <g opacity={0.6}>
        <path d="M 102 86 L 102 60" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 96 66 L 102 60 L 108 66" strokeWidth={2} />
      </g>

      {/* pose A — hanging LOW; ONE arm straight up to the bar. The FREE (non-working)
          arm hangs DOWN toward the floor as one clean stroke, well clear of the
          working arm and the body line, so the two arms never cluster.
          Torso 26: shoulder(116,88) -> hip(90,90). */}
      <g className="pose-a">
        {/* working arm straight UP: shoulder(116,88) to bar(116,48) */}
        <line x1={116} y1={88} x2={116} y2={48} />
        {/* FREE arm hangs DOWN-and-slightly-left toward the floor (forearm 15 +
            upper 16): shoulder(116,88) -> elbow(111,103) -> hand(107,111) —
            distinct from the working arm reaching up and from the body going left */}
        <line x1={116} y1={88} x2={111} y2={103} />
        <line x1={111} y1={103} x2={107} y2={111} />
        {/* body: shoulder(116,88) -> hip(90,90) */}
        <line x1={116} y1={88} x2={90} y2={90} />
        {/* neck + head */}
        <line x1={116} y1={88} x2={128} y2={86} />
        <circle cx={135} cy={85} r={7} />
        {/* bent legs (thigh ~18, shin ~18): hip(90,90) -> knee(74,97) -> foot(86,108) */}
        <line x1={90} y1={90} x2={74} y2={97} />
        <line x1={74} y1={97} x2={86} y2={108} />
        {/* joint dots: working shoulder, free elbow, hip, knee */}
        <circle cx={116} cy={88} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={111} cy={103} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={90} cy={90} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={74} cy={97} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — chest pulled UP by the single working arm (elbow driven down/back);
          the FREE arm keeps hanging straight DOWN toward the floor, a separate
          stroke that never meets the working elbow. Torso 26: shoulder(116,66) ->
          hip(90,76). */}
      <g className="pose-b">
        {/* working arm bent, elbow driven down/back: shoulder(116,66) -> elbow(126,76)
            -> hands at bar(116,48) */}
        <line x1={116} y1={66} x2={126} y2={76} />
        <line x1={126} y1={76} x2={116} y2={48} />
        {/* FREE arm hangs DOWN-and-left toward the floor, diverging clearly from the
            working elbow driven up/back on the right: shoulder(116,66) ->
            elbow(108,79) -> hand(102,93) */}
        <line x1={116} y1={66} x2={108} y2={79} />
        <line x1={108} y1={79} x2={102} y2={93} />
        {/* body raised: shoulder(116,66) -> hip(90,76) */}
        <line x1={116} y1={66} x2={90} y2={76} />
        {/* neck + head */}
        <line x1={116} y1={66} x2={128} y2={65} />
        <circle cx={135} cy={64} r={7} />
        {/* bent legs (thigh ~18, shin ~18): hip(90,76) -> knee(72,85) -> foot(84,104) */}
        <line x1={90} y1={76} x2={72} y2={85} />
        <line x1={72} y1={85} x2={84} y2={104} />
        {/* joint dots: working shoulder, working elbow, free elbow, hip, knee */}
        <circle cx={116} cy={66} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={126} cy={76} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={108} cy={79} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={90} cy={76} r={2.5} fill="currentColor" stroke="none" />
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
