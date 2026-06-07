import type { VariationGuide } from './types';

// path: ['Band pushdown', 'Overhead band extension', 'Diamond push-up']
//
// NEW family replacing chair_dips: the triceps work that carries pressing load
// without the anterior-shoulder strain dips cause.
//   0 Band pushdown          — standing, long band anchored HIGH on a door line
//                              above & ahead; upper arms pinned to the ribs;
//                              forearms press DOWN from bent to straight.
//   1 Overhead band extension — band anchored LOW behind; both arms overhead,
//                              elbows high by the ears; forearms extend up.
//   2 Diamond push-up        — REUSES the diamond art moved out of pushup.tsx:
//                              both HANDS meeting at a single point under the
//                              chest (narrow base).

/**
 * Band pushdown.
 * Standing, side profile facing right toward a DOOR line on the right with a HIGH
 * anchor; a long band runs from the high anchor down to the hands. Distinguishing
 * feature: the upper arms stay PINNED to the ribs (elbow stuck at the side) while
 * the forearms sweep DOWN against the band.
 * pose-a = elbows bent ~90, forearms up, hands at chest height (band shorter).
 * pose-b = elbows locked straight, hands pressed down to the thighs (band long).
 */
function BandPushdownArt() {
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

      {/* DOOR / wall on the right with a HIGH anchor point (over the top of a door) */}
      <g opacity={0.5}>
        <line x1={182} y1={16} x2={182} y2={110} />
        {/* high anchor bracket near the top */}
        <line x1={182} y1={22} x2={172} y2={22} />
        <circle cx={170} cy={22} r={2} strokeWidth={2} />
      </g>

      {/* movement arrow: hands travel straight DOWN, pressing the band (a -> b).
          Sits just right of the forearm so it never merges with the body. */}
      <g opacity={0.6}>
        <path d="M 124 60 L 124 86" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 118 80 L 124 86 L 130 80" strokeWidth={2} />
      </g>

      {/* pose A — elbows pinned at the side, bent ~90; forearms up, hands at chest
          height; the band runs from the hands up to the high anchor. */}
      <g className="pose-a">
        {/* torso + neck + head */}
        <line x1={96} y1={44} x2={96} y2={70} />
        <line x1={96} y1={37} x2={96} y2={44} />
        <circle cx={96} cy={30} r={7} />
        {/* legs: braced stance, slightly apart */}
        <line x1={96} y1={70} x2={90} y2={90} />
        <line x1={90} y1={90} x2={88} y2={108} />
        <line x1={88} y1={108} x2={77} y2={108} />
        <line x1={96} y1={70} x2={102} y2={90} />
        <line x1={102} y1={90} x2={104} y2={108} />
        <line x1={104} y1={108} x2={115} y2={108} />
        {/* arm: upper arm PINNED to ribs (shoulder(96,48) -> elbow(100,64) close
            to the side); forearm up & forward to hands at chest height(112,56) */}
        <line x1={96} y1={48} x2={100} y2={64} />
        <line x1={100} y1={64} x2={112} y2={56} />
        {/* band: hands(112,56) up to high anchor(170,22) */}
        <line x1={112} y1={56} x2={170} y2={22} opacity={0.5} strokeWidth={2} />
        {/* joint dots: shoulder, elbow, hip */}
        <circle cx={96} cy={48} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={100} cy={64} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={70} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — elbows still pinned at the side but now LOCKED STRAIGHT; hands
          pressed down to the thighs; band stretched long to the high anchor. */}
      <g className="pose-b">
        {/* torso + neck + head */}
        <line x1={96} y1={44} x2={96} y2={70} />
        <line x1={96} y1={37} x2={96} y2={44} />
        <circle cx={96} cy={30} r={7} />
        {/* legs: braced stance */}
        <line x1={96} y1={70} x2={90} y2={90} />
        <line x1={90} y1={90} x2={88} y2={108} />
        <line x1={88} y1={108} x2={77} y2={108} />
        <line x1={96} y1={70} x2={102} y2={90} />
        <line x1={102} y1={90} x2={104} y2={108} />
        <line x1={104} y1={108} x2={115} y2={108} />
        {/* arm: upper arm pinned (shoulder(96,48) -> elbow(100,64)); forearm now
            extended straight DOWN to hands at the thighs(104,78) — elbow locked.
            Forearm length 14.9px = constant with pose-a (was 20.4px, too long). */}
        <line x1={96} y1={48} x2={100} y2={64} />
        <line x1={100} y1={64} x2={104} y2={78} />
        {/* band stretched long: hands(104,78) up to high anchor(170,22) */}
        <line x1={104} y1={78} x2={170} y2={22} opacity={0.5} strokeWidth={2} />
        {/* joint dots: shoulder, elbow, hip */}
        <circle cx={96} cy={48} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={100} cy={64} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={70} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Overhead band extension.
 * Standing, side profile facing right; a long band is anchored LOW BEHIND the
 * figure (a door bottom on the LEFT = the rear) and runs UP behind the back to the
 * hands. "Behind" the right-facing figure is the LEFT side, so the whole working
 * arm lives on the LEFT: elbow up-and-back by the ear, the forearm folds DOWN-LEFT
 * behind/below the skull, and the band drops down the LEFT/back, entirely clear of
 * the head circle and the torso (it never crosses x=100, the torso line).
 * Distinguishing feature: high elbow + forearm tucked behind the head, then the
 * hand reaches straight up overhead.
 * pose-a = elbow high & back, forearm folded down behind the head (hand at the nape).
 * pose-b = arm straightened, hand reaching up overhead (band stretched long).
 */
function OverheadBandExtensionArt() {
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

      {/* DOOR / wall on the left with a LOW anchor near the floor (band trapped
          under a door bottom / standing on the band behind the heel) */}
      <g opacity={0.5}>
        <line x1={24} y1={16} x2={24} y2={110} />
        {/* low anchor bracket near the floor */}
        <line x1={24} y1={104} x2={34} y2={104} />
        <circle cx={36} cy={104} r={2} strokeWidth={2} />
      </g>

      {/* movement arrow: hands travel UP overhead, extending (a -> b). Sits on the
          RIGHT, in the empty space ahead of the figure, clear of body/head/band. */}
      <g opacity={0.6}>
        <path d="M 122 44 L 122 18" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 116 24 L 122 18 L 128 24" strokeWidth={2} />
      </g>

      {/* pose A — elbow held HIGH & BACK by the ear; forearm folds DOWN-LEFT behind
          the skull to the hand at the nape; the band drops from the hand DOWN the
          LEFT/back to the low rear anchor. Elbow(94,38) sits at the head's left
          edge; the whole arm + band stay LEFT of the head, never on the face. */}
      <g className="pose-a">
        {/* torso + neck + head */}
        <line x1={100} y1={48} x2={100} y2={74} />
        <line x1={100} y1={41} x2={100} y2={48} />
        <circle cx={100} cy={34} r={7} />
        {/* legs: braced stance */}
        <line x1={100} y1={74} x2={94} y2={92} />
        <line x1={94} y1={92} x2={92} y2={108} />
        <line x1={92} y1={108} x2={81} y2={108} />
        <line x1={100} y1={74} x2={106} y2={92} />
        <line x1={106} y1={92} x2={108} y2={108} />
        <line x1={108} y1={108} x2={119} y2={108} />
        {/* arm: upper arm UP & BACK (shoulder(100,52) -> elbow(94,38), 15.2px, at
            the head's left edge = by the ear); forearm folds DOWN to the hand at the
            nape(90,52), 14.6px — a clear V bend, hand behind & below the skull */}
        <line x1={100} y1={52} x2={94} y2={38} />
        <line x1={94} y1={38} x2={90} y2={52} />
        {/* band: hand(90,52) DOWN the LEFT/back to anchor(36,104), clear of body */}
        <line x1={90} y1={52} x2={36} y2={104} opacity={0.5} strokeWidth={2} />
        {/* joint dots: shoulder, elbow (high), hip */}
        <circle cx={100} cy={52} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={94} cy={38} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={100} cy={74} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — arm straightened OVERHEAD; elbow still high & back but now locked,
          hand reaching up above the head; band stretched long down the LEFT/back to
          the low anchor (it passes ABOVE & LEFT of the head, never across it). */}
      <g className="pose-b">
        {/* torso + neck + head */}
        <line x1={100} y1={48} x2={100} y2={74} />
        <line x1={100} y1={41} x2={100} y2={48} />
        <circle cx={100} cy={34} r={7} />
        {/* legs: braced stance */}
        <line x1={100} y1={74} x2={94} y2={92} />
        <line x1={94} y1={92} x2={92} y2={108} />
        <line x1={92} y1={108} x2={81} y2={108} />
        <line x1={100} y1={74} x2={106} y2={92} />
        <line x1={106} y1={92} x2={108} y2={108} />
        <line x1={108} y1={108} x2={119} y2={108} />
        {/* arm: upper arm UP & back (shoulder(100,52) -> elbow(94,38), 15.2px = same
            as pose-a); forearm now extended STRAIGHT up to the hand overhead(96,23),
            15.1px */}
        <line x1={100} y1={52} x2={94} y2={38} />
        <line x1={94} y1={38} x2={96} y2={23} />
        {/* band stretched long: hand overhead(96,23) DOWN the LEFT/back to
            anchor(36,104), passing above-left of the head */}
        <line x1={96} y1={23} x2={36} y2={104} opacity={0.5} strokeWidth={2} />
        {/* joint dots: shoulder, elbow (high), hip */}
        <circle cx={100} cy={52} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={94} cy={38} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={100} cy={74} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Diamond push-up — MOVED here from pushup.tsx (unchanged art).
 * Distinguishing feature: both HANDS meeting at a single point under the chest
 * (a narrow base). Side profile: one hand under the chest, elbows tuck close.
 * pose-a = top, pose-b = bottom (chest to the hands, elbows back along the ribs).
 */
function DiamondPushupArt() {
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

      {/* diamond hands marker: a diamond at the single hand point under the
          chest — the defining "hands together" feature. */}
      <g opacity={0.55}>
        <path d="M 114 110 L 124 102 L 134 110 L 124 118 Z" strokeWidth={2} />
      </g>

      {/* movement arrow: chest travels straight down to the hands (a -> b) */}
      <g opacity={0.6}>
        <path d="M 150 58 L 150 86" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 144 80 L 150 86 L 156 80" strokeWidth={2} />
      </g>

      {/* pose A — top. Hands together at x=124 under the chest; arm reaches
          forward-and-down to that single point (not under the shoulder). */}
      <g className="pose-a">
        {/* arm: shoulder(140,70) -> elbow(132,90) tucked -> hand(124,110) */}
        <line x1={140} y1={70} x2={132} y2={90} />
        <line x1={132} y1={90} x2={124} y2={110} />
        {/* body plank: shoulder -> hip -> knee -> ankle, then a FOOT TICK (toes
            tucked, ~9px down to the floor) so the leg reads as a leg with a foot,
            not a sphinx-taper (Theme E foot-tick pattern). */}
        <line x1={140} y1={70} x2={95} y2={82} />
        <line x1={95} y1={82} x2={70} y2={88} />
        <line x1={70} y1={88} x2={50} y2={90} />
        <line x1={50} y1={90} x2={47} y2={99} />
        {/* neck + head */}
        <line x1={140} y1={70} x2={150} y2={74} />
        <circle cx={155} cy={78} r={7} />
        {/* joint dots: shoulder, elbow, hip, knee */}
        <circle cx={140} cy={70} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={132} cy={90} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={95} cy={82} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={70} cy={88} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — bottom. Chest lowered to the hands; elbow tucks back (close to
          the ribs, not flared) — the diamond signature. */}
      <g className="pose-b">
        {/* arm: shoulder(132,96) -> elbow(116,100) back -> hand(124,110) */}
        <line x1={132} y1={96} x2={114} y2={100} />
        <line x1={114} y1={100} x2={124} y2={110} />
        {/* body plank lowered; same FOOT TICK (toes tucked to the floor) as pose-a */}
        <line x1={132} y1={96} x2={95} y2={98} />
        <line x1={95} y1={98} x2={70} y2={100} />
        <line x1={70} y1={100} x2={50} y2={101} />
        <line x1={50} y1={101} x2={47} y2={109} />
        {/* neck + head */}
        <line x1={132} y1={96} x2={143} y2={97} />
        <circle cx={149} cy={97} r={7} />
        {/* joint dots */}
        <circle cx={132} cy={96} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={114} cy={100} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={95} cy={98} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={70} cy={100} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

const guides: VariationGuide[] = [
  {
    // 0 Band pushdown
    cues: ['Pin elbows to your ribs', 'Press the band to your thighs', 'Lock the elbows straight'],
    Art: BandPushdownArt,
  },
  {
    // 1 Overhead band extension
    cues: ['Lift elbows by your ears', 'Reach the band overhead', 'Straighten arms to the ceiling'],
    Art: OverheadBandExtensionArt,
  },
  {
    // 2 Diamond push-up (reused art from pushup.tsx)
    cues: ['Touch thumbs under chest', 'Graze chest to hands', 'Press the floor straight up'],
    Art: DiamondPushupArt,
  },
];
export default guides;
