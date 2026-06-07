import type { VariationGuide } from './types';

// path: ['Feet on floor', 'Feet elevated', 'Deep pike, head to floor', 'Wall handstand hold', 'Wall HSPU']
//
// Index 2 ("Deep pike, head to floor") is a feet-elevated pike that lowers the
// head ALL the way to the floor between the hands — deeper than index 1 (whose
// crown stops in mid-air) and easier than index 3 (the inverted handstand).

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
        <path d="M 150 58 L 150 88" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 144 82 L 150 88 L 156 82" strokeWidth={2} />
      </g>

      {/* Compact inverted-V to spec lengths (CONVENTIONS §3): torso 26, straight
          arm 31, thigh+shin 18 each. Hip is the apex; back+arm sweeps down-right
          to the hands on the floor, legs sweep down-left to the feet. */}

      {/* pose A — top: arms straight, head hanging DOWN between the arms.
          The head drops into the open interior of the pike (clear of the
          straight-arm line by ~8px) so it reads as the head pointing toward the
          floor between the hands, not as a bead threaded on the arm (§2.7). */}
      <g className="pose-a">
        {/* torso: hip(106,66) -> shoulder(124,84) */}
        <line x1={106} y1={66} x2={124} y2={84} />
        {/* straight arm: shoulder(124,84) -> hand on floor(150,104) */}
        <line x1={124} y1={84} x2={150} y2={104} />
        {/* neck dropping the head DOWN into the interior, clear of the arm line */}
        <line x1={124} y1={84} x2={127} y2={92} />
        <circle cx={129} cy={98} r={7} />
        {/* legs: hip(106,66) -> knee(98,82) -> ankle(91,99) -> toe(82,99) */}
        <line x1={106} y1={66} x2={98} y2={82} />
        <line x1={98} y1={82} x2={91} y2={99} />
        <line x1={91} y1={99} x2={82} y2={99} />
        {/* joint dots */}
        <circle cx={106} cy={66} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={124} cy={84} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={98} cy={82} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — bottom: elbows bent, head lowered toward floor. Head hangs
          DOWN into the interior, clear of the bent-elbow dot by ~9px so head and
          arm don't fuse into one blob (§2.7). */}
      <g className="pose-b">
        {/* torso: hip(106,66) -> shoulder(126,82) */}
        <line x1={106} y1={66} x2={126} y2={82} />
        {/* upper arm(16): shoulder(126,82) -> elbow(138,92) */}
        <line x1={126} y1={82} x2={138} y2={92} />
        {/* forearm(15): elbow(138,92) -> hand on floor(146,106) */}
        <line x1={138} y1={92} x2={146} y2={106} />
        {/* neck dropping the head DOWN into the interior, clear of the elbow */}
        <line x1={126} y1={82} x2={128} y2={90} />
        <circle cx={130} cy={99} r={7} />
        {/* legs unchanged from pose A */}
        <line x1={106} y1={66} x2={98} y2={82} />
        <line x1={98} y1={82} x2={91} y2={99} />
        <line x1={91} y1={99} x2={82} y2={99} />
        {/* joint dots */}
        <circle cx={106} cy={66} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={126} cy={82} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={138} cy={92} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={98} cy={82} r={2.5} fill="currentColor" stroke="none" />
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
        <line x1={40} y1={74} x2={78} y2={74} />
        <line x1={44} y1={74} x2={44} y2={110} />
        <line x1={74} y1={74} x2={74} y2={110} />
      </g>

      {/* movement arrow: head travels straight down (a -> b) */}
      <g opacity={0.6}>
        <path d="M 150 54 L 150 86" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 144 80 L 150 86 L 156 80" strokeWidth={2} />
      </g>

      {/* Compact pike to spec lengths (CONVENTIONS §3); feet raised on the block
          make the press line steeper than index 0. */}

      {/* pose A — top: arms straight, feet up on block, head off the floor */}
      <g className="pose-a">
        {/* torso(26): hip(108,58) -> shoulder(122,80) */}
        <line x1={108} y1={58} x2={122} y2={80} />
        {/* straight arm(31): shoulder(122,80) -> hand on floor(139,106) */}
        <line x1={122} y1={80} x2={139} y2={106} />
        {/* neck + head, looking down between arms */}
        <line x1={122} y1={80} x2={127} y2={82} />
        <circle cx={132} cy={85} r={7} />
        {/* legs slope UP to the block: hip(108,58) -> knee(90,62) -> foot(74,69) */}
        <line x1={108} y1={58} x2={90} y2={62} />
        <line x1={90} y1={62} x2={74} y2={69} />
        {/* foot on block surface */}
        <line x1={74} y1={69} x2={65} y2={69} />
        {/* joint dots */}
        <circle cx={108} cy={58} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={122} cy={80} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={90} cy={62} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — bottom: elbows bent, crown lowered toward (not to) the floor */}
      <g className="pose-b">
        {/* torso(26): hip(108,58) -> shoulder(124,80) */}
        <line x1={108} y1={58} x2={124} y2={80} />
        {/* upper arm(16): shoulder(124,80) -> elbow(135,91) */}
        <line x1={124} y1={80} x2={135} y2={91} />
        {/* forearm(15): elbow(135,91) -> hand on floor(139,106) */}
        <line x1={135} y1={91} x2={139} y2={106} />
        {/* neck + head lowered toward floor (crown still off the ground) */}
        <line x1={124} y1={80} x2={129} y2={86} />
        <circle cx={133} cy={92} r={7} />
        {/* legs unchanged, on block */}
        <line x1={108} y1={58} x2={90} y2={62} />
        <line x1={90} y1={62} x2={74} y2={69} />
        <line x1={74} y1={69} x2={65} y2={69} />
        {/* joint dots */}
        <circle cx={108} cy={58} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={124} cy={80} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={135} cy={91} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={90} cy={62} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Deep pike push-up, feet elevated, head to the FLOOR.
 * Side profile. Same feet-up pike as index 1, but the bottom is much deeper: the
 * crown of the head is lowered ALL the way to the floor between the hands. The
 * press line is steep/near-vertical.
 * pose-a = top (arms straight, head well off the floor).
 * pose-b = bottom (elbows bent, crown resting ON the floor between the hands).
 * Distinguishing feature vs index 1: the head actually reaches the ground.
 */
function PikeDeepHeadToFloorArt() {
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
        <line x1={40} y1={74} x2={78} y2={74} />
        <line x1={44} y1={74} x2={44} y2={110} />
        <line x1={74} y1={74} x2={74} y2={110} />
      </g>

      {/* movement arrow: head travels all the way DOWN to the floor (a -> b) */}
      <g opacity={0.6}>
        <path d="M 152 54 L 152 96" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 146 90 L 152 96 L 158 90" strokeWidth={2} />
      </g>

      {/* Compact pike to spec lengths (CONVENTIONS §3); same feet-up start as
          index 1, but pose B lowers the CROWN all the way to the floor. */}

      {/* pose A — top: arms straight, feet up on block, head well clear */}
      <g className="pose-a">
        {/* torso(26): hip(108,58) -> shoulder(122,80) */}
        <line x1={108} y1={58} x2={122} y2={80} />
        {/* straight arm(31): shoulder(122,80) -> hand on floor(139,106) */}
        <line x1={122} y1={80} x2={139} y2={106} />
        {/* neck + head, looking down between arms, off the floor */}
        <line x1={122} y1={80} x2={127} y2={82} />
        <circle cx={132} cy={85} r={7} />
        {/* legs slope UP to the block: hip(108,58) -> knee(90,62) -> foot(74,69) */}
        <line x1={108} y1={58} x2={90} y2={62} />
        <line x1={90} y1={62} x2={74} y2={69} />
        <line x1={74} y1={69} x2={65} y2={69} />
        {/* joint dots */}
        <circle cx={108} cy={58} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={122} cy={80} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={90} cy={62} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — bottom: elbows fully bent, CROWN ON THE FLOOR between the hands.
          The planted hand sits close under the head (x≈134) so the crown reads as
          pressing down at the hands, not behind them. */}
      <g className="pose-b">
        {/* torso(26): hip(110,58) -> shoulder(128,76) (deep fold, hips stay high) */}
        <line x1={110} y1={58} x2={128} y2={76} />
        {/* upper arm(16): shoulder(128,76) -> elbow(133,91) */}
        <line x1={128} y1={76} x2={133} y2={91} />
        {/* forearm(15) down to the planted hand: elbow(133,91) -> hand(134,107) */}
        <line x1={133} y1={91} x2={134} y2={107} />
        {/* neck + head, crown dropped onto the floor at the hands */}
        <line x1={128} y1={76} x2={129} y2={84} />
        <circle cx={129} cy={100} r={7} />
        {/* legs slope up to block: hip(110,58) -> knee(92,61) -> foot(75,68) */}
        <line x1={110} y1={58} x2={92} y2={61} />
        <line x1={92} y1={61} x2={75} y2={68} />
        <line x1={75} y1={68} x2={66} y2={68} />
        {/* joint dots */}
        <circle cx={110} cy={58} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={128} cy={76} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={133} cy={91} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={92} cy={61} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Wall handstand HOLD.
 * Side profile, figure fully INVERTED and vertical, hands on the floor, heels
 * resting against a wall behind. This is an ISOMETRIC HOLD, so the two poses are
 * near-identical: a held stacked inverted shape that only settles a touch tighter
 * (shallow -> settled), arms straight throughout. A clock glyph (not a travel
 * arrow) signals "hold still", matching the praised forearm-plank treatment
 * (Theme B / appendix #2).
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

      {/* "hold" clock glyph (static scenery) — signals an isometric hold, NOT
          directional travel (matches the praised forearm-plank glyph). */}
      <g opacity={0.5}>
        <circle cx={40} cy={30} r={6} strokeWidth={1.5} />
        <path d="M 40 30 L 40 26" strokeWidth={1.5} />
        <path d="M 40 30 L 43 32" strokeWidth={1.5} />
      </g>

      {/* pose A — stacked inverted hold, body near-vertical over the hands,
          heels just shy of the wall. The head hangs DOWN to the left, clear of
          the straight pressing arm. */}
      <g className="pose-a">
        {/* arm straight: hand on floor(148,108) up to shoulder(148,76) */}
        <line x1={148} y1={108} x2={148} y2={76} />
        {/* torso up, near-vertical: shoulder(148,76) -> hip(149,50) */}
        <line x1={148} y1={76} x2={149} y2={50} />
        {/* legs near-vertical, heel just shy of the wall: hip(149,50) -> knee(150,32) -> heel(152,20) */}
        <line x1={149} y1={50} x2={150} y2={32} />
        <line x1={150} y1={32} x2={152} y2={20} />
        {/* foot tick: heels reaching to rest on the wall */}
        <line x1={152} y1={20} x2={168} y2={20} />
        {/* neck + head below shoulders (inverted), hanging to the LEFT clear of the arm */}
        <line x1={148} y1={76} x2={143} y2={81} />
        <circle cx={140} cy={86} r={7} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={148} cy={76} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={149} cy={50} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={150} cy={32} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — same hold, settled a touch tighter: fully stacked vertical,
          heels nestled to the wall. Delta from pose-a is only 1-2px so the
          crossfade reads as "holding still / bracing", not travel. */}
      <g className="pose-b">
        {/* arm straight: hand(148,108) up to shoulder(149,76) */}
        <line x1={148} y1={108} x2={149} y2={76} />
        {/* torso fully vertical: shoulder(149,76) -> hip(150,50) */}
        <line x1={149} y1={76} x2={150} y2={50} />
        {/* legs vertical, heel touching the wall: hip(150,50) -> knee(151,32) -> heel(154,20) */}
        <line x1={150} y1={50} x2={151} y2={32} />
        <line x1={151} y1={32} x2={154} y2={20} />
        {/* foot tick: heels resting on the wall */}
        <line x1={154} y1={20} x2={169} y2={20} />
        {/* neck + head, hanging to the LEFT clear of the arm */}
        <line x1={149} y1={76} x2={144} y2={81} />
        <circle cx={141} cy={86} r={7} />
        {/* joint dots: shoulder, hip, knee */}
        <circle cx={149} cy={76} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={150} cy={50} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={151} cy={32} r={2.5} fill="currentColor" stroke="none" />
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
  // 0 Feet on floor
  { cues: ['Hips high, body inverted-V', 'Lower crown toward floor', 'Press the floor away'], Art: PikeFeetFloorArt },
  // 1 Feet elevated
  { cues: ['Feet planted on the block', 'Lower crown toward floor', 'Press straight up tall'], Art: PikeFeetElevatedArt },
  // 2 Deep pike, head to floor
  { cues: ['Feet up, hips stacked tall', 'Lower crown to the floor', 'Press straight back up'], Art: PikeDeepHeadToFloorArt },
  // 3 Wall handstand hold
  { cues: ['Walk hands to the wall', 'Stack hips over hands', 'Press the floor away'], Art: WallHandstandHoldArt },
  // 4 Wall HSPU
  { cues: ['Heels resting on wall', 'Lower crown between hands', 'Press the floor away'], Art: WallHspuArt },
];
export default guides;
