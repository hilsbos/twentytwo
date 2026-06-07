import type { VariationGuide } from './types';

// path: ['Tall-kneeling pulldown', 'Straight-arm pulldown', 'One-arm pulldown']
//
// NEW family replacing superman_ytw: the lat / vertical-pull stimulus the
// program was missing entirely (the V-taper muscle). The long band is anchored
// over the TOP of a door. In ALL THREE the anchor line is unmistakably HIGH /
// overhead (this is the vertical-pull family) and the band runs from that high
// anchor down to the hands, which pull DOWN.
//   0 Tall-kneeling pulldown — kneeling tall under a door-top anchor, both arms
//                              pulling the band DOWN to the chest.
//   1 Straight-arm pulldown  — standing, arms locked STRAIGHT, sweeping the band
//                              from high overhead down to the hips in an arc.
//   2 One-arm pulldown       — half-kneeling, a SINGLE arm pulling the band down.

/**
 * Tall-kneeling pulldown.
 * Side profile, facing right toward a DOOR with a band anchored over its TOP
 * (high, overhead-right). The figure is TALL-KNEELING (both knees down, hips
 * stacked over the knees, torso upright). Distinguishing feature: tall-kneeling
 * base under a high door-top anchor, both arms reaching UP to the band then
 * pulling it DOWN to the chest, elbows driving down and back.
 * pose-a = both arms reaching up to the high anchor (band long).
 * pose-b = band pulled down to the chest, elbows low and back (band short).
 */
function TallKneelingPulldownArt() {
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

      {/* DOOR on the right with the band anchored over its TOP (high/overhead) */}
      <g opacity={0.5}>
        <line x1={178} y1={18} x2={178} y2={110} />
        {/* anchor bracket over the top of the door */}
        <line x1={178} y1={20} x2={168} y2={20} />
        <circle cx={166} cy={20} r={2} strokeWidth={2} />
      </g>

      {/* movement arrow: hands travel DOWN to the chest (a -> b) */}
      <g opacity={0.6}>
        <path d="M 134 36 L 134 64" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 128 58 L 134 64 L 140 58" strokeWidth={2} />
      </g>

      {/* pose A — tall-kneeling, both arms reaching UP to the high anchor */}
      <g className="pose-a">
        {/* torso upright: hip(96,72) -> shoulder(96,46); neck + head */}
        <line x1={96} y1={46} x2={96} y2={72} />
        <line x1={96} y1={39} x2={96} y2={46} />
        <circle cx={96} cy={32} r={7} />
        {/* TALL-KNEELING: thigh vertical hip(96,72)->knee(96,92), shin back to
            ankle on floor, toes tucked */}
        <line x1={96} y1={72} x2={96} y2={92} />
        <line x1={96} y1={92} x2={80} y2={108} />
        <line x1={80} y1={108} x2={92} y2={108} />
        {/* both arms reaching UP toward the high anchor:
            shoulder(96,46) -> elbow(112,38) -> hand(128,30) */}
        <line x1={96} y1={46} x2={112} y2={38} />
        <line x1={112} y1={38} x2={128} y2={30} />
        {/* band: hands(128,30) -> anchor(166,20) */}
        <line x1={128} y1={30} x2={166} y2={20} opacity={0.5} strokeWidth={2} />
        {/* joint dots: shoulder, hip, elbow, knee */}
        <circle cx={96} cy={46} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={72} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={112} cy={38} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={92} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — band pulled DOWN to the chest, elbows low & back */}
      <g className="pose-b">
        {/* torso upright (same base): hip(96,72) -> shoulder(96,46); neck + head */}
        <line x1={96} y1={46} x2={96} y2={72} />
        <line x1={96} y1={39} x2={96} y2={46} />
        <circle cx={96} cy={32} r={7} />
        {/* TALL-KNEELING base unchanged */}
        <line x1={96} y1={72} x2={96} y2={92} />
        <line x1={96} y1={92} x2={80} y2={108} />
        <line x1={80} y1={108} x2={92} y2={108} />
        {/* arms pulled DOWN (upper 16, forearm 15): elbow driven low & back,
            hands at the chest: shoulder(96,46) -> elbow(86,58) -> hand(100,54) */}
        <line x1={96} y1={46} x2={86} y2={58} />
        <line x1={86} y1={58} x2={100} y2={54} />
        {/* band stretched: hands(100,54) -> anchor(166,20) */}
        <line x1={100} y1={54} x2={166} y2={20} opacity={0.5} strokeWidth={2} />
        {/* joint dots: shoulder, hip, elbow, knee */}
        <circle cx={96} cy={46} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={72} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={86} cy={58} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={92} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Straight-arm pulldown.
 * Standing side profile, facing right toward a DOOR with a band anchored over
 * its TOP (high/overhead). Distinguishing feature: the arms stay DEAD-STRAIGHT
 * throughout, sweeping the band in a long arc from high overhead down to the
 * hips (the elbow never bends).
 * pose-a = straight arms reaching high up to the anchor (band overhead).
 * pose-b = straight arms swept down to the hips (band pulled low).
 */
function StraightArmPulldownArt() {
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

      {/* DOOR on the right with the band anchored over its TOP (high/overhead) */}
      <g opacity={0.5}>
        <line x1={178} y1={18} x2={178} y2={110} />
        {/* anchor bracket over the top of the door */}
        <line x1={178} y1={20} x2={168} y2={20} />
        <circle cx={166} cy={20} r={2} strokeWidth={2} />
      </g>

      {/* movement arrow: straight arm sweeps DOWN in an arc (a -> b) */}
      <g opacity={0.6}>
        <path d="M 138 34 Q 140 56 124 72" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 117 67 L 124 72 L 126 64" strokeWidth={2} />
      </g>

      {/* pose A — standing, STRAIGHT arm reaching high up to the anchor */}
      <g className="pose-a">
        {/* torso + neck + head */}
        <line x1={92} y1={44} x2={92} y2={72} />
        <line x1={92} y1={37} x2={92} y2={44} />
        <circle cx={92} cy={30} r={7} />
        {/* legs: stance */}
        <line x1={92} y1={72} x2={86} y2={90} />
        <line x1={86} y1={90} x2={84} y2={108} />
        <line x1={84} y1={108} x2={73} y2={108} />
        <line x1={92} y1={72} x2={98} y2={90} />
        <line x1={98} y1={90} x2={100} y2={108} />
        <line x1={100} y1={108} x2={111} y2={108} />
        {/* STRAIGHT arm reaching UP toward the anchor (no elbow bend; full
            extended-arm length ~31px): shoulder(92,48) -> hand(118,31) */}
        <line x1={92} y1={48} x2={118} y2={31} />
        {/* band: hand(118,31) -> anchor(166,20) */}
        <line x1={118} y1={31} x2={166} y2={20} opacity={0.5} strokeWidth={2} />
        {/* joint dots: shoulder, hip (no elbow dot — arm is straight) */}
        <circle cx={92} cy={48} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={92} cy={72} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — STRAIGHT arm swept DOWN to the hips (band pulled low) */}
      <g className="pose-b">
        {/* torso + neck + head */}
        <line x1={92} y1={44} x2={92} y2={72} />
        <line x1={92} y1={37} x2={92} y2={44} />
        <circle cx={92} cy={30} r={7} />
        {/* legs: stance */}
        <line x1={92} y1={72} x2={86} y2={90} />
        <line x1={86} y1={90} x2={84} y2={108} />
        <line x1={84} y1={108} x2={73} y2={108} />
        <line x1={92} y1={72} x2={98} y2={90} />
        <line x1={98} y1={90} x2={100} y2={108} />
        <line x1={100} y1={108} x2={111} y2={108} />
        {/* STRAIGHT arm swept down-forward to the hip (one straight segment ~31px,
            kept well off the torso so the locked elbow reads):
            shoulder(92,48) -> hand(113,71) */}
        <line x1={92} y1={48} x2={113} y2={71} />
        {/* band stretched: hand(113,71) -> anchor(166,20) */}
        <line x1={113} y1={71} x2={166} y2={20} opacity={0.5} strokeWidth={2} />
        {/* joint dots: shoulder, hip (no elbow dot — arm is straight) */}
        <circle cx={92} cy={48} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={92} cy={72} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * One-arm pulldown.
 * Side profile, facing right toward a DOOR with a band anchored over its TOP
 * (high/overhead). The figure is HALF-KNEELING (one knee down, one foot up in
 * front). Distinguishing feature: a SINGLE working arm reaching up to the high
 * anchor then pulling the band DOWN to the side, the other arm rests at the hip.
 * pose-a = single arm reaching up to the anchor (band long).
 * pose-b = single arm pulled down, elbow driving to the side (band short).
 */
function OneArmPulldownArt() {
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

      {/* DOOR on the right with the band anchored over its TOP (high/overhead) */}
      <g opacity={0.5}>
        <line x1={178} y1={18} x2={178} y2={110} />
        {/* anchor bracket over the top of the door */}
        <line x1={178} y1={20} x2={168} y2={20} />
        <circle cx={166} cy={20} r={2} strokeWidth={2} />
      </g>

      {/* movement arrow: the single hand travels DOWN to the side (a -> b) */}
      <g opacity={0.6}>
        <path d="M 126 38 L 116 64" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 110 58 L 116 64 L 122 60" strokeWidth={2} />
      </g>

      {/* pose A — HALF-KNEELING, single arm reaching UP to the anchor */}
      <g className="pose-a">
        {/* torso upright: hip(90,72) -> shoulder(90,46); neck + head */}
        <line x1={90} y1={46} x2={90} y2={72} />
        <line x1={90} y1={39} x2={90} y2={46} />
        <circle cx={90} cy={32} r={7} />
        {/* FRONT leg up: foot planted, knee bent ~90: hip(90,72) -> knee(104,86)
            -> ankle/foot on floor(102,108) -> toe */}
        <line x1={90} y1={72} x2={104} y2={86} />
        <line x1={104} y1={86} x2={102} y2={108} />
        <line x1={102} y1={108} x2={114} y2={108} />
        {/* REAR leg KNEELING ON THE FLOOR: thigh hip(90,72) -> knee planted on the
            ground(82,108); short shin/foot stub running back along the floor to
            (70,108) so the knee clearly rests on the ground (not a standing lunge) */}
        <line x1={90} y1={72} x2={82} y2={108} />
        <line x1={82} y1={108} x2={70} y2={108} />
        {/* RESTING arm at the hip: shoulder(90,46) -> elbow(84,62) -> hand(90,70) */}
        <line x1={90} y1={46} x2={84} y2={62} />
        <line x1={84} y1={62} x2={90} y2={70} />
        {/* WORKING arm reaching UP to the anchor (upper 16, forearm 15):
            shoulder(90,46) -> elbow(105,40) -> hand(118,33) */}
        <line x1={90} y1={46} x2={105} y2={40} />
        <line x1={105} y1={40} x2={118} y2={33} />
        {/* band: working hand(118,33) -> anchor(166,20) */}
        <line x1={118} y1={33} x2={166} y2={20} opacity={0.5} strokeWidth={2} />
        {/* joint dots: shoulder, hip, working elbow, planted rear knee */}
        <circle cx={90} cy={46} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={90} cy={72} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={105} cy={40} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={82} cy={108} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — single arm pulled DOWN to the side, elbow driving low */}
      <g className="pose-b">
        {/* torso upright (same base): hip(90,72) -> shoulder(90,46); neck + head */}
        <line x1={90} y1={46} x2={90} y2={72} />
        <line x1={90} y1={39} x2={90} y2={46} />
        <circle cx={90} cy={32} r={7} />
        {/* HALF-KNEELING base unchanged (rear knee planted on the floor) */}
        <line x1={90} y1={72} x2={104} y2={86} />
        <line x1={104} y1={86} x2={102} y2={108} />
        <line x1={102} y1={108} x2={114} y2={108} />
        <line x1={90} y1={72} x2={82} y2={108} />
        <line x1={82} y1={108} x2={70} y2={108} />
        {/* RESTING arm at the hip (unchanged) */}
        <line x1={90} y1={46} x2={84} y2={62} />
        <line x1={84} y1={62} x2={90} y2={70} />
        {/* WORKING arm pulled DOWN (upper 16, forearm 15): elbow low & back,
            hand at the side: shoulder(90,46) -> elbow(82,60) -> hand(97,58) */}
        <line x1={90} y1={46} x2={82} y2={60} />
        <line x1={82} y1={60} x2={97} y2={58} />
        {/* band stretched: working hand(97,58) -> anchor(166,20) */}
        <line x1={97} y1={58} x2={166} y2={20} opacity={0.5} strokeWidth={2} />
        {/* joint dots: shoulder, hip, working elbow, planted rear knee */}
        <circle cx={90} cy={46} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={90} cy={72} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={82} cy={60} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={82} cy={108} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

const guides: VariationGuide[] = [
  {
    // 0 Tall-kneeling pulldown
    cues: ['Kneel tall under the anchor', 'Pull the band to your chest', 'Drive elbows down and back'],
    Art: TallKneelingPulldownArt,
  },
  {
    // 1 Straight-arm pulldown
    cues: ['Stand tall, arms locked straight', 'Sweep the band to your hips', 'Keep the elbows straight'],
    Art: StraightArmPulldownArt,
  },
  {
    // 2 One-arm pulldown
    cues: ['Half-kneel, reach one arm up', 'Pull the band to your side', 'Drive that elbow down'],
    Art: OneArmPulldownArt,
  },
];
export default guides;
