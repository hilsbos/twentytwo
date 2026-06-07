import type { VariationGuide } from './types';

// path: ['Hands elevated', 'Standard', 'Decline', 'Assisted archer', 'Archer']
//
// Diamond push-up moved OUT to triceps_press.tsx (it was a triceps detour sold
// as a chest progression). "Assisted archer" is a NEW intermediate before the
// full archer: the archer position with the extended-side hand resting on a
// raised support so it shares load. It is fully drawn at index 3 below
// (AssistedArcherPushupArt — real 2-pose art with the far hand propped on a
// raised block to show the reduced load).

/**
 * Hands-elevated push-up.
 * Distinguishing feature: HANDS up on a raised edge (chair/bench), body angled
 * HEAD-UP (hands higher than feet). The easiest variation.
 * pose-a = arms straight (top). pose-b = elbows bent, chest toward the edge.
 */
function HandsElevatedPushupArt() {
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

      {/* raised edge (bench/chair) the hands rest on, at the right */}
      <g opacity={0.5}>
        <line x1={140} y1={84} x2={180} y2={84} />
        <line x1={146} y1={84} x2={146} y2={110} />
        <line x1={174} y1={84} x2={174} y2={110} />
      </g>

      {/* movement arrow: chest travels down toward the edge (a -> b). Larger
          drop so the start/end states read without relying on the figures. */}
      <g opacity={0.6}>
        <path d="M 150 54 L 150 78 " strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 144 72 L 150 78 L 156 72" strokeWidth={2} />
      </g>

      {/* pose A — top (arms straight). Hands on the edge top (y=84); body angled
          head-UP (shoulders high, feet low on the floor). */}
      <g className="pose-a">
        {/* arm: shoulder(150,54) straight down to hand on the edge(152,84) */}
        <line x1={150} y1={54} x2={152} y2={84} />
        {/* body slopes down-left: shoulder(150,54) -> hip(108,68) -> knee(82,80)
            -> ankle(58,92) -> toe(50,100) */}
        <line x1={150} y1={54} x2={108} y2={68} />
        <line x1={108} y1={68} x2={82} y2={80} />
        <line x1={82} y1={80} x2={58} y2={92} />
        <line x1={58} y1={92} x2={50} y2={100} />
        {/* neck + head, looking toward the edge */}
        <line x1={150} y1={54} x2={160} y2={57} />
        <circle cx={165} cy={61} r={7} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={150} cy={54} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={108} cy={68} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={82} cy={80} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — bottom (elbow bent deeper, chest dropped well below the edge so
          the chest-drop reads as a clearly distinct end state). */}
      <g className="pose-b">
        {/* arm: shoulder(146,80) -> elbow(165,79) -> hand on edge(152,84) */}
        <line x1={146} y1={80} x2={165} y2={79} />
        <line x1={165} y1={79} x2={152} y2={84} />
        {/* body lowered further, still head-up but flatter */}
        <line x1={146} y1={80} x2={106} y2={86} />
        <line x1={106} y1={86} x2={80} y2={95} />
        <line x1={80} y1={95} x2={56} y2={104} />
        <line x1={56} y1={104} x2={48} y2={110} />
        {/* neck + head */}
        <line x1={146} y1={80} x2={157} y2={81} />
        <circle cx={162} cy={84} r={7} />
        {/* joint dots: shoulder, elbow, hip, knee */}
        <circle cx={146} cy={80} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={165} cy={79} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={106} cy={86} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={80} cy={95} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Standard push-up — REFERENCE ART (unchanged).
 */
function StandardPushupArt() {
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

      {/* movement arrow: chest travels down toward the floor (a -> b) */}
      <g opacity={0.6}>
        <path d="M 152 60 L 152 88" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 146 82 L 152 88 L 158 82" strokeWidth={2} />
      </g>

      {/* pose A — top of the push-up (supporting arm vertical, straight plank) */}
      <g className="pose-a">
        <line x1={140} y1={72} x2={140} y2={110} />
        <line x1={140} y1={72} x2={95} y2={84} />
        <line x1={95} y1={84} x2={70} y2={90} />
        <line x1={70} y1={90} x2={48} y2={93} />
        <line x1={48} y1={93} x2={40} y2={100} />
        <line x1={140} y1={72} x2={150} y2={76} />
        <circle cx={155} cy={80} r={7} />
        <circle cx={140} cy={72} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={95} cy={84} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={70} cy={90} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — bottom (elbow bent, chest near the floor) */}
      <g className="pose-b">
        <line x1={138} y1={92} x2={150} y2={98} />
        <line x1={150} y1={98} x2={140} y2={110} />
        <line x1={138} y1={92} x2={95} y2={96} />
        <line x1={95} y1={96} x2={70} y2={99} />
        <line x1={70} y1={99} x2={48} y2={100} />
        <line x1={48} y1={100} x2={40} y2={106} />
        <line x1={138} y1={92} x2={149} y2={94} />
        <circle cx={155} cy={97} r={7} />
        <circle cx={138} cy={92} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={150} cy={98} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={95} cy={96} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={70} cy={99} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Decline push-up.
 * Distinguishing feature: FEET up on a raised block, body angled HEAD-DOWN
 * (feet higher than head/hands). Harder; loads the upper chest/shoulders.
 * pose-a = top (arms straight), pose-b = bottom (elbows bent, head near floor).
 */
function DeclinePushupArt() {
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

      {/* TALL raised block under the FEET (left); feet sit clearly above the
          shoulders so the body is steeply head-DOWN. */}
      <g opacity={0.5}>
        <line x1={20} y1={46} x2={52} y2={46} />
        <line x1={24} y1={46} x2={24} y2={110} />
        <line x1={48} y1={46} x2={48} y2={110} />
      </g>

      {/* movement arrow: head travels down toward the floor (a -> b) */}
      <g opacity={0.6}>
        <path d="M 156 66 L 156 92" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 150 86 L 156 92 L 162 86" strokeWidth={2} />
      </g>

      {/* pose A — top. Hands on floor (right), feet UP on the tall block (left);
          the body climbs from the hands up to the high feet. */}
      <g className="pose-a">
        {/* arm: shoulder(138,78) straight down to hand(138,110) */}
        <line x1={138} y1={78} x2={138} y2={110} />
        {/* body climbs left-and-UP: shoulder(138,78) -> hip(96,62) -> knee(70,52) */}
        <line x1={138} y1={78} x2={96} y2={62} />
        <line x1={96} y1={62} x2={70} y2={52} />
        {/* shin to ankle on the block top, then foot */}
        <line x1={70} y1={52} x2={52} y2={46} />
        <line x1={52} y1={46} x2={44} y2={42} />
        {/* neck + head, head down toward floor */}
        <line x1={138} y1={78} x2={148} y2={82} />
        <circle cx={153} cy={86} r={7} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={138} cy={78} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={62} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={70} cy={52} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — bottom (elbow bent, head dropped near the floor) */}
      <g className="pose-b">
        {/* arm: shoulder(136,96) -> elbow(150,100) -> hand(138,110) */}
        <line x1={136} y1={96} x2={150} y2={100} />
        <line x1={150} y1={100} x2={138} y2={110} />
        {/* body still climbs to the high feet, shoulders lowered */}
        <line x1={136} y1={96} x2={96} y2={64} />
        <line x1={96} y1={64} x2={70} y2={52} />
        <line x1={70} y1={52} x2={52} y2={46} />
        <line x1={52} y1={46} x2={44} y2={42} />
        {/* neck + head, dropped */}
        <line x1={136} y1={96} x2={147} y2={101} />
        <circle cx={152} cy={106} r={7} />
        {/* joint dots */}
        <circle cx={136} cy={96} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={150} cy={100} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={64} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={70} cy={52} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Archer push-up.
 * Distinguishing feature: one arm extended STRAIGHT out to the side, weight
 * shifted over the other (bent) arm. The straight reaching arm is unmistakable.
 * pose-a = centered/top, pose-b = lowered over one arm with the far arm straight.
 */
function ArcherPushupArt() {
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

      {/* movement arrow: working shoulder/chest sinks down & over the bent arm
          (a -> b). Sits well to the right of (and below) the head so the
          arrowhead never clusters with the head/shoulder junction. */}
      <g opacity={0.6}>
        <path d="M 162 74 Q 158 88 156 98" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 150 92 L 156 98 L 162 93" strokeWidth={2} />
      </g>

      {/* pose A — top: a clearly FLAT, horizontal plank with the two support arms
          forming a WIDE base (near arm near-vertical to the floor, far arm reaching
          forward-and-out to a well-separated floor point). The head sits forward
          (+x) of the shoulder and ABOVE the far-arm line, lifted clear of the
          shoulder/arm junction so it reads as a separate element. */}
      <g className="pose-a">
        {/* near (working) arm: shoulder(124,76) near-vertical to hand(128,110) */}
        <line x1={124} y1={76} x2={128} y2={110} />
        {/* far (reaching) arm: shoulder(124,76) forward & out to hand(168,110),
            a wide base spaced well away from the near hand */}
        <line x1={124} y1={76} x2={168} y2={110} />
        {/* FLAT body plank: shoulder -> hip -> knee -> ankle -> toe (level torso) */}
        <line x1={124} y1={76} x2={90} y2={78} />
        <line x1={90} y1={78} x2={64} y2={82} />
        <line x1={64} y1={82} x2={42} y2={86} />
        <line x1={42} y1={86} x2={32} y2={94} />
        {/* neck + head: forward of the shoulder and LIFTED up (head bottom ~69,
            well above the far-arm line which sits at y~88 here) so the head is a
            clean, separate circle clear of the support-arm cluster */}
        <line x1={124} y1={76} x2={138} y2={71} />
        <circle cx={145} cy={69} r={7} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={124} cy={76} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={90} cy={78} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={64} cy={82} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — body sunk over the bent WORKING arm; FAR arm dead-straight,
          extended wide along the floor (the archer signature). */}
      <g className="pose-b">
        {/* working arm bends sharply: shoulder(124,96) -> elbow(134,102) -> hand(130,110) */}
        <line x1={124} y1={96} x2={134} y2={102} />
        <line x1={134} y1={102} x2={130} y2={110} />
        {/* FAR arm dead-straight, long, reaching wide to hand(168,110) */}
        <line x1={124} y1={96} x2={168} y2={110} />
        {/* body plank lowered toward the working side, still level */}
        <line x1={124} y1={96} x2={90} y2={90} />
        <line x1={90} y1={90} x2={64} y2={92} />
        <line x1={64} y1={92} x2={42} y2={94} />
        <line x1={42} y1={94} x2={32} y2={100} />
        {/* neck + head, forward of the shoulder and lifted clear of the far arm */}
        <line x1={124} y1={96} x2={137} y2={90} />
        <circle cx={144} cy={88} r={7} />
        {/* joint dots */}
        <circle cx={124} cy={96} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={134} cy={102} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={90} cy={90} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={64} cy={92} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Assisted archer push-up.
 * Distinguishing feature: the EXTENDED (far) arm's hand rests on a RAISED block
 * instead of the floor, so that side carries less load — the intermediate before
 * the full archer (where the far hand is flat on the floor). Same archer geometry
 * as index 4, but the far hand is propped UP on a low support.
 * pose-a = centered/top (both arms supporting, far hand on the block).
 * pose-b = sunk over the bent working arm, far arm straight onto the block.
 */
function AssistedArcherPushupArt() {
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

      {/* RAISED block under the FAR (extended) hand — the assist. Stands TALL
          (top y=78, ~32px above the floor) so the propped far hand reads as
          clearly high and unloaded — the at-a-glance difference from the full
          archer, whose far hand is flat on the floor. Placed far right, clear of
          the head. */}
      <g opacity={0.5}>
        <line x1={158} y1={78} x2={184} y2={78} />
        <line x1={162} y1={78} x2={162} y2={110} />
        <line x1={180} y1={78} x2={180} y2={110} />
      </g>

      {/* movement arrow: working shoulder/chest sinks down & over the bent arm
          (a -> b). Sits left of the figure so it never merges with it. */}
      <g opacity={0.6}>
        <path d="M 108 64 Q 104 78 104 90" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 98 84 L 104 90 L 110 85" strokeWidth={2} />
      </g>

      {/* pose A — top: flat plank, both arms supporting. Near (working) arm
          near-vertical to the floor; far (extended) arm reaching forward-and-UP
          to the TALL block top (170,78) — the far hand sits markedly higher than
          the near hand, so the unloaded side reads instantly. Head lifted up and
          forward, clear of the support-arm junction. */}
      <g className="pose-a">
        {/* near (working) arm: shoulder(118,72) near-vertical to hand(116,110) */}
        <line x1={118} y1={72} x2={116} y2={110} />
        {/* far (extended) arm: shoulder(118,72) forward & UP to hand ON TALL BLOCK(170,78) */}
        <line x1={118} y1={72} x2={170} y2={78} />
        {/* FLAT body plank: shoulder -> hip -> knee -> ankle -> toe (level torso) */}
        <line x1={118} y1={72} x2={86} y2={74} />
        <line x1={86} y1={74} x2={60} y2={78} />
        <line x1={60} y1={78} x2={38} y2={82} />
        <line x1={38} y1={82} x2={28} y2={90} />
        {/* neck + head: forward of the shoulder and LIFTED clear of the far arm */}
        <line x1={118} y1={72} x2={131} y2={66} />
        <circle cx={138} cy={64} r={7} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={118} cy={72} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={86} cy={74} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={60} cy={78} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — body sunk over the bent WORKING arm; FAR arm dead-straight onto
          the TALL block (the assist signature: the propped, still-high hand). */}
      <g className="pose-b">
        {/* working arm bends sharply: shoulder(118,94) -> elbow(126,102) -> hand(116,110) */}
        <line x1={118} y1={94} x2={126} y2={102} />
        <line x1={126} y1={102} x2={116} y2={110} />
        {/* FAR arm dead-straight, reaching to the tall block top(170,78) — stays HIGH */}
        <line x1={118} y1={94} x2={170} y2={78} />
        {/* body plank lowered toward the working side, still level */}
        <line x1={118} y1={94} x2={86} y2={88} />
        <line x1={86} y1={88} x2={60} y2={90} />
        <line x1={60} y1={90} x2={38} y2={92} />
        <line x1={38} y1={92} x2={28} y2={100} />
        {/* neck + head, forward of the shoulder and lifted clear of the far arm */}
        <line x1={118} y1={94} x2={131} y2={88} />
        <circle cx={138} cy={86} r={7} />
        {/* joint dots */}
        <circle cx={118} cy={94} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={126} cy={102} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={86} cy={88} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={60} cy={90} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

const guides: VariationGuide[] = [
  {
    // 0 Hands elevated
    cues: ['Set hands on the edge', 'Lower chest to the edge', 'Push the edge away'],
    Art: HandsElevatedPushupArt,
  },
  {
    // 1 Standard — REFERENCE
    cues: ['Hands under shoulders', 'Push the floor away', 'Lock the elbows tall'],
    Art: StandardPushupArt,
  },
  {
    // 2 Decline
    cues: ['Plant feet on the block', 'Lower head past hands', 'Push the floor away'],
    Art: DeclinePushupArt,
  },
  {
    // 3 Assisted archer
    cues: ['Rest one hand on a book', 'Sink over the near hand', 'Press back up evenly'],
    Art: AssistedArcherPushupArt,
  },
  {
    // 4 Archer
    cues: ['Spread hands wide', 'Sink over one arm', 'Press back to center'],
    Art: ArcherPushupArt,
  },
];
export default guides;
