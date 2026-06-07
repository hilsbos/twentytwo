import type { VariationGuide } from './types';

// path: ['Feet on floor', 'Feet elevated', 'Wall handstand hold', 'Wall HSPU']

/**
 * Pike push-up, feet on floor.
 * Side profile, figure faces right. Inverted-V (pike): hips high, hands and feet
 * on the floor, head pointed toward the floor between the hands.
 * pose-a = top (arms straight, head up between arms).
 * pose-b = bottom (elbows bent, crown of head lowered toward the floor).
 * Distinguishing feature: tall inverted-V with hips at the apex.
 */
function PikeFeetFloorArt() {
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

      {/* movement arrow: head travels down toward the floor (a -> b) */}
      <g opacity={0.6}>
        <path d="M 150 56 L 150 86" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 144 80 L 150 86 L 156 80" strokeWidth={2} />
      </g>

      {/* pose A — top: arms straight, head up, tall pike */}
      <g className="pose-a">
        {/* hips at apex (110,42); torso/arms down to hands; legs down to feet */}
        {/* arm: shoulder(122,62) straight down to hand(132,110) */}
        <line x1={122} y1={62} x2={132} y2={110} />
        {/* torso: hip(110,42) -> shoulder(122,62) */}
        <line x1={110} y1={42} x2={122} y2={62} />
        {/* neck + head, looking down between arms */}
        <line x1={122} y1={62} x2={130} y2={66} />
        <circle cx={136} cy={68} r={7} />
        {/* legs: hip(110,42) -> knee(96,76) -> ankle(82,108) -> toe(73,108) */}
        <line x1={110} y1={42} x2={96} y2={76} />
        <line x1={96} y1={76} x2={82} y2={108} />
        <line x1={82} y1={108} x2={73} y2={108} />
        {/* joint dots */}
        <circle cx={110} cy={42} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={122} cy={62} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={76} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — bottom: elbows bent, head lowered toward floor */}
      <g className="pose-b">
        {/* arm: shoulder(118,72) -> elbow(134,84) -> hand(132,110) */}
        <line x1={118} y1={72} x2={134} y2={84} />
        <line x1={134} y1={84} x2={132} y2={110} />
        {/* torso: hip(110,44) -> shoulder(118,72) (hips stay high) */}
        <line x1={110} y1={44} x2={118} y2={72} />
        {/* neck + head, lowered toward floor */}
        <line x1={118} y1={72} x2={124} y2={82} />
        <circle cx={128} cy={90} r={7} />
        {/* legs unchanged */}
        <line x1={110} y1={44} x2={96} y2={77} />
        <line x1={96} y1={77} x2={82} y2={108} />
        <line x1={82} y1={108} x2={73} y2={108} />
        {/* joint dots */}
        <circle cx={110} cy={44} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={118} cy={72} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={134} cy={84} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={77} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Pike push-up, feet elevated on a block/chair.
 * Side profile. Same pike shape but the FEET sit on a raised block behind, so the
 * torso/arms are steeper (closer to vertical) and the head travels straight down.
 * pose-a = top (arms straight). pose-b = bottom (elbows bent, crown near floor).
 * Distinguishing feature: FEET up on the raised block; near-vertical pressing line.
 */
function PikeFeetElevatedArt() {
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
      {/* raised block under the feet (left, behind) */}
      <g opacity={0.5}>
        <line x1={40} y1={78} x2={78} y2={78} />
        <line x1={40} y1={78} x2={40} y2={110} />
        <line x1={78} y1={78} x2={78} y2={110} />
      </g>

      {/* movement arrow: head travels straight down (a -> b) */}
      <g opacity={0.6}>
        <path d="M 150 50 L 150 84" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 144 78 L 150 84 L 156 78" strokeWidth={2} />
      </g>

      {/* pose A — top: arms nearly vertical, feet up on block */}
      <g className="pose-a">
        {/* arm: shoulder(124,56) nearly straight down to hand(132,110) */}
        <line x1={124} y1={56} x2={132} y2={110} />
        {/* torso: hip(112,40) -> shoulder(124,56) */}
        <line x1={112} y1={40} x2={124} y2={56} />
        {/* neck + head */}
        <line x1={124} y1={56} x2={132} y2={60} />
        <circle cx={138} cy={62} r={7} />
        {/* legs slope UP to the block: hip(112,40) -> knee(90,58) -> foot on block(60,75) */}
        <line x1={112} y1={40} x2={90} y2={58} />
        <line x1={90} y1={58} x2={60} y2={75} />
        {/* foot on block surface */}
        <line x1={60} y1={75} x2={51} y2={75} />
        {/* joint dots */}
        <circle cx={112} cy={40} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={124} cy={56} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={90} cy={58} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — bottom: elbows bent, crown near floor */}
      <g className="pose-b">
        {/* arm: shoulder(120,68) -> elbow(135,82) -> hand(132,110) */}
        <line x1={120} y1={68} x2={135} y2={82} />
        <line x1={135} y1={82} x2={132} y2={110} />
        {/* torso: hip(112,42) -> shoulder(120,68) */}
        <line x1={112} y1={42} x2={120} y2={68} />
        {/* neck + head lowered toward floor */}
        <line x1={120} y1={68} x2={126} y2={80} />
        <circle cx={130} cy={90} r={7} />
        {/* legs unchanged, on block */}
        <line x1={112} y1={42} x2={90} y2={59} />
        <line x1={90} y1={59} x2={60} y2={75} />
        <line x1={60} y1={75} x2={51} y2={75} />
        {/* joint dots */}
        <circle cx={112} cy={42} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={120} cy={68} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={135} cy={82} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={90} cy={59} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Wall handstand HOLD.
 * Side profile, figure fully INVERTED and vertical, hands on the floor, heels
 * resting against a wall behind. This is an isometric hold, so the two poses are
 * a small balance sway (body shifts slightly toward/away from the wall) — arms
 * stay straight throughout.
 * Distinguishing feature: a complete upside-down, near-vertical body stacked over
 * the hands, heels on the wall.
 */
function WallHandstandHoldArt() {
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
      {/* wall on the right */}
      <line x1={170} y1={20} x2={170} y2={110} opacity={0.5} />

      {/* movement arrow: gentle balance sway toward the wall (a -> b) */}
      <g opacity={0.6}>
        <path d="M 126 28 L 142 28" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 136 23 L 142 28 L 136 33" strokeWidth={2} />
      </g>

      {/* pose A — tall locked handstand, body vertical, slight lean off the wall.
          Shoulders stacked high; head held neutral well clear of the floor. */}
      <g className="pose-a">
        {/* arm straight: hand on floor(144,108) up to shoulder(143,76) */}
        <line x1={144} y1={108} x2={143} y2={76} />
        {/* torso up: shoulder(143,76) -> hip(141,50) */}
        <line x1={143} y1={76} x2={141} y2={50} />
        {/* leg up, slight lean off the wall: hip(141,50) -> knee(143,32) -> ankle(147,20) */}
        <line x1={141} y1={50} x2={143} y2={32} />
        <line x1={143} y1={32} x2={147} y2={20} />
        {/* foot, just shy of the wall */}
        <line x1={147} y1={20} x2={157} y2={20} />
        {/* neck + head below shoulders (inverted), held high above the floor */}
        <line x1={143} y1={76} x2={148} y2={81} />
        <circle cx={152} cy={85} r={7} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={143} cy={76} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={141} cy={50} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={143} cy={32} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — same tall hold, swayed toward the wall (heels on wall) */}
      <g className="pose-b">
        {/* arm straight: hand(144,108) up to shoulder(147,76) */}
        <line x1={144} y1={108} x2={147} y2={76} />
        {/* torso: shoulder(147,76) -> hip(151,50) */}
        <line x1={147} y1={76} x2={151} y2={50} />
        {/* leg leaning to wall: hip(151,50) -> knee(157,34) -> heel(166,22) on wall */}
        <line x1={151} y1={50} x2={157} y2={34} />
        <line x1={157} y1={34} x2={166} y2={22} />
        {/* toes up the wall */}
        <line x1={166} y1={22} x2={168} y2={32} />
        {/* neck + head, held high above the floor */}
        <line x1={147} y1={76} x2={152} y2={81} />
        <circle cx={156} cy={85} r={7} />
        {/* joint dots */}
        <circle cx={147} cy={76} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={151} cy={50} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={157} cy={34} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Wall handstand push-up (HSPU).
 * Side profile, figure INVERTED against a wall. Unlike the hold, this is a press:
 * pose-a = top (arms locked straight, body stacked tall, head up off the floor).
 * pose-b = bottom (elbows bent, crown lowered to the floor between the hands).
 * Distinguishing feature: inverted body whose elbows bend and head drops to the
 * floor — the full press, against the wall.
 */
function WallHspuArt() {
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
      {/* wall on the right */}
      <line x1={170} y1={20} x2={170} y2={110} opacity={0.5} />

      {/* movement arrow: head/body travels DOWN to the floor (a -> b) */}
      <g opacity={0.6}>
        <path d="M 124 58 L 124 90" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 118 84 L 124 90 L 130 84" strokeWidth={2} />
      </g>

      {/* pose A — top: arms straight, body tall, head up off the floor */}
      <g className="pose-a">
        {/* arm straight: hand on floor(148,108) up to shoulder(146,74) */}
        <line x1={148} y1={108} x2={146} y2={74} />
        {/* torso: shoulder(146,74) -> hip(150,48) */}
        <line x1={146} y1={74} x2={150} y2={48} />
        {/* leg up to wall: hip(150,48) -> knee(156,32) -> heel(166,22) on wall */}
        <line x1={150} y1={48} x2={156} y2={32} />
        <line x1={156} y1={32} x2={166} y2={22} />
        <line x1={166} y1={22} x2={168} y2={32} />
        {/* neck + head below shoulders, well off the floor */}
        <line x1={146} y1={74} x2={151} y2={79} />
        <circle cx={155} cy={83} r={7} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={146} cy={74} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={150} cy={48} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={156} cy={32} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — bottom: elbows bend with the forearm staying near-vertical
          (elbow stacked just above the planted hand, not splayed out); the
          shoulders and crown lower toward the hands. */}
      <g className="pose-b">
        {/* forearm near-vertical: hand on floor(148,108) -> elbow(149,92) */}
        <line x1={148} y1={108} x2={149} y2={92} />
        {/* upper arm up to descended shoulder: elbow(149,92) -> shoulder(152,78) */}
        <line x1={149} y1={92} x2={152} y2={78} />
        {/* torso: shoulder(152,78) -> hip(156,52) */}
        <line x1={152} y1={78} x2={156} y2={52} />
        {/* leg to wall: hip(156,52) -> knee(160,36) -> heel(168,26) on wall */}
        <line x1={156} y1={52} x2={160} y2={36} />
        <line x1={160} y1={36} x2={168} y2={26} />
        <line x1={168} y1={26} x2={169} y2={36} />
        {/* neck + head dropped between the hands, crown toward the floor */}
        <line x1={152} y1={78} x2={151} y2={88} />
        <circle cx={148} cy={98} r={7} />
        {/* joint dots: shoulder, elbow, hip, knee */}
        <circle cx={152} cy={78} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={149} cy={92} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={156} cy={52} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={160} cy={36} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

const guides: VariationGuide[] = [
  { cues: ['Hips high, body inverted-V', 'Lower crown toward floor', 'Press the floor away'], Art: PikeFeetFloorArt },
  { cues: ['Feet planted on the block', 'Lower crown toward floor', 'Press straight up tall'], Art: PikeFeetElevatedArt },
  { cues: ['Walk hands to the wall', 'Stack hips over hands', 'Press the floor away'], Art: WallHandstandHoldArt },
  { cues: ['Heels resting on wall', 'Lower crown between hands', 'Press the floor away'], Art: WallHspuArt },
];
export default guides;
