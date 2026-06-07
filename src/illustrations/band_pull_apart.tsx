import type { VariationGuide } from './types';

// path: ['Loop band arms out', 'Anchored face-pull']

/**
 * Loop band pull-apart, arms out.
 * Standing, side profile facing right. Both arms reach forward, hands held a touch
 * BELOW shoulder height (in front of the chest, clear of the neck/head) holding a
 * loop band. Distinguishing feature: a loop band between the two hands that visibly
 * STRETCHES from a small relaxed oval into a wide taut lens as the arms sweep apart.
 * pose-a = arms forward together, band a small relaxed oval just ahead of the hands.
 * pose-b = arms swept back and open (rear-delt squeeze), band stretched into a wide
 *          loop spanning both hands — drawn as a lens bowing BELOW the hand line so
 *          it stays distinct from the arm strokes and never crosses the body.
 */
function LoopBandArmsOutArt() {
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

      {/* movement arrow: near hand pulls back, opening the band (a -> b) */}
      <g opacity={0.6}>
        <path d="M 118 40 L 70 40" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 76 35 L 70 40 L 76 45" strokeWidth={2} />
      </g>

      {/* pose A — both arms reaching forward together, hands just below shoulder
          height (in front of the chest), band a small relaxed oval just ahead */}
      <g className="pose-a">
        {/* torso + neck + head */}
        <line x1={92} y1={42} x2={92} y2={70} />
        <line x1={92} y1={35} x2={92} y2={42} />
        <circle cx={92} cy={28} r={7} />
        {/* legs: stance, slightly apart */}
        <line x1={92} y1={70} x2={88} y2={90} />
        <line x1={88} y1={90} x2={86} y2={108} />
        <line x1={86} y1={108} x2={97} y2={108} />
        <line x1={92} y1={70} x2={98} y2={90} />
        <line x1={98} y1={90} x2={100} y2={108} />
        <line x1={100} y1={108} x2={111} y2={108} />
        {/* BOTH arms reaching forward, hands together out front at chest height:
            shoulder(92,46) -> elbow(111,50) -> hand(130,54) */}
        <line x1={92} y1={46} x2={111} y2={50} />
        <line x1={111} y1={50} x2={130} y2={54} />
        {/* loop band held at the hands — a small relaxed vertical oval just ahead */}
        <ellipse cx={136} cy={56} rx={5} ry={8} opacity={0.5} strokeWidth={2} />
        {/* joint dots: shoulder, hip, elbow */}
        <circle cx={92} cy={46} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={92} cy={70} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={111} cy={50} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — arms swept WIDE open at chest height. In profile the far arm
          stays forward and the near arm pulls BACK, so the loop band stretches into
          a wide lens spanning both hands. The lens bows BELOW the hand line so it
          stays distinct from the arm strokes and never crosses the body. */}
      <g className="pose-b">
        {/* torso + neck + head */}
        <line x1={92} y1={42} x2={92} y2={70} />
        <line x1={92} y1={35} x2={92} y2={42} />
        <circle cx={92} cy={28} r={7} />
        {/* legs: stance */}
        <line x1={92} y1={70} x2={88} y2={90} />
        <line x1={88} y1={90} x2={86} y2={108} />
        <line x1={86} y1={108} x2={97} y2={108} />
        <line x1={92} y1={70} x2={98} y2={90} />
        <line x1={98} y1={90} x2={100} y2={108} />
        <line x1={100} y1={108} x2={111} y2={108} />
        {/* FAR arm forward: shoulder(92,46) -> elbow(111,50) -> hand(130,54) */}
        <line x1={92} y1={46} x2={111} y2={50} />
        <line x1={111} y1={50} x2={130} y2={54} />
        {/* NEAR arm pulled BACK: shoulder(92,46) -> elbow(73,50) -> hand(54,54) */}
        <line x1={92} y1={46} x2={73} y2={50} />
        <line x1={73} y1={50} x2={54} y2={54} />
        {/* loop band stretched into a wide lens between the two hands (54,54)<->(130,54),
            bowing below the hand line so it reads as a distinct stretched loop */}
        <path
          d="M 54 54 Q 92 62 130 54 Q 92 71 54 54 Z"
          opacity={0.5}
          strokeWidth={2}
        />
        {/* joint dots: shoulder, hip, both elbows */}
        <circle cx={92} cy={46} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={92} cy={70} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={111} cy={50} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={73} cy={50} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Anchored face-pull.
 * Standing, side profile facing right toward a DOOR/anchor on the right; a band
 * runs from a face-height anchor to the hands. Distinguishing feature: the hands
 * pull toward the FACE with the ELBOWS HIGH and FLARED (the face-pull finish),
 * not down to the waist.
 * pose-a = arms extended forward toward the anchor, band slack-ish (long reach).
 * pose-b = elbows pulled back HIGH, hands at the temples, band stretched.
 */
function AnchoredFacePullArt() {
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

      {/* DOOR / wall on the right with a face-height anchor point */}
      <g opacity={0.5}>
        <line x1={182} y1={16} x2={182} y2={110} />
        {/* anchor bracket at face height */}
        <line x1={182} y1={40} x2={174} y2={40} />
        <circle cx={172} cy={40} r={2} strokeWidth={2} />
      </g>

      {/* movement arrow: hands travel up & back toward the face (a -> b) */}
      <g opacity={0.6}>
        <path d="M 140 44 Q 128 32 116 30" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 122 26 L 116 30 L 120 36" strokeWidth={2} />
      </g>

      {/* pose A — arms extended forward toward the anchor (band long) */}
      <g className="pose-a">
        {/* torso + neck + head */}
        <line x1={96} y1={42} x2={96} y2={70} />
        <line x1={96} y1={35} x2={96} y2={42} />
        <circle cx={96} cy={28} r={7} />
        {/* legs: split stance for a braced pull */}
        <line x1={96} y1={70} x2={88} y2={90} />
        <line x1={88} y1={90} x2={84} y2={108} />
        <line x1={84} y1={108} x2={73} y2={108} />
        <line x1={96} y1={70} x2={104} y2={90} />
        <line x1={104} y1={90} x2={108} y2={108} />
        <line x1={108} y1={108} x2={119} y2={108} />
        {/* both arms reaching forward up toward the anchor (face height):
            shoulder(96,46) -> elbow(116,44) -> hand(140,42) */}
        <line x1={96} y1={46} x2={116} y2={44} />
        <line x1={116} y1={44} x2={140} y2={42} />
        {/* band: hands(140,42) -> anchor(172,40) */}
        <line x1={140} y1={42} x2={172} y2={40} opacity={0.5} strokeWidth={2} />
        {/* joint dots: shoulder, hip, elbow */}
        <circle cx={96} cy={46} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={70} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={116} cy={44} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — face-pull finish: elbows pulled back HIGH & flared, hands at the
          temples; band stretched from the hands to the anchor. */}
      <g className="pose-b">
        {/* torso + neck + head */}
        <line x1={96} y1={42} x2={96} y2={70} />
        <line x1={96} y1={35} x2={96} y2={42} />
        <circle cx={96} cy={28} r={7} />
        {/* legs: split stance */}
        <line x1={96} y1={70} x2={88} y2={90} />
        <line x1={88} y1={90} x2={84} y2={108} />
        <line x1={84} y1={108} x2={73} y2={108} />
        <line x1={96} y1={70} x2={104} y2={90} />
        <line x1={104} y1={90} x2={108} y2={108} />
        <line x1={108} y1={108} x2={119} y2={108} />
        {/* arm: shoulder(96,46) -> elbow HIGH & flared forward(118,30) -> hand back
            at temple(104,26). The high flared elbow is the face-pull signature. */}
        <line x1={96} y1={46} x2={118} y2={30} />
        <line x1={118} y1={30} x2={104} y2={26} />
        {/* band stretched: hand at temple(104,26) -> anchor(172,40) */}
        <line x1={104} y1={26} x2={172} y2={40} opacity={0.5} strokeWidth={2} />
        {/* joint dots: shoulder, hip, elbow (high) */}
        <circle cx={96} cy={46} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={70} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={118} cy={30} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

const guides: VariationGuide[] = [
  {
    // 0 Loop band arms out
    cues: ['Hold band at chest height', 'Sweep arms wide open', 'Squeeze the band apart'],
    Art: LoopBandArmsOutArt,
  },
  {
    // 1 Anchored face-pull
    cues: ['Grip band at face height', 'Pull hands to temples', 'Lift elbows high'],
    Art: AnchoredFacePullArt,
  },
];
export default guides;
