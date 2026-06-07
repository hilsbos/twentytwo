import type { VariationGuide } from './types';

// path: ['Tabletop arms only', 'Opposite arm + leg', 'Heels to floor',
//        'Band-press dead bug']
// Anti-extension trunk work, SUPINE: the figure lies on its back along the floor
// (head left, hips right, body facing +x), low back pinned the whole time. Arms
// point UP toward the ceiling (smaller y); knees stack over the hips at 90/90
// (thigh vertical, shin horizontal). The low back stays glued to the floor; the
// limbs are the distinguishing feature per step.
//
// Shared supine skeleton (lengths per CONVENTIONS.md §3):
//   body rests just above the ground line (~y=102, a body has thickness)
//   hip (pelvis): (116, 102)   shoulder: (90, 102)  [torso 26 horizontal]
//   neck base: (82, 102) -> head center: (75, 102) r=7
//   arm vertical UP: shoulder(90,102) -> elbow(90,86) -> wrist(90,71)
//   thigh vertical UP: hip(116,102) -> knee(116,84)
//   shin horizontal (toward +x, foot up): knee(116,84) -> ankle(134,84)

/**
 * Index 0 "Tabletop arms only".
 * Supine, knees stay stacked 90/90 (tabletop) the whole time; ONLY the arms
 * move. pose A = both arms vertical over the shoulders; pose B = arms reached
 * back overhead (to the left, near the floor) without the low back arching.
 * Distinguishing feature: knees parked at 90/90 while the arms sweep overhead.
 */
function TabletopDeadBugArt() {
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

      {/* movement arrow: hands swing from vertical back to overhead (a -> b),
          an arc up and over to the left, placed above the chest */}
      <g opacity={0.6}>
        <path d="M 90 60 Q 72 56 60 70" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 60 62 L 60 70 L 68 69" strokeWidth={2} />
      </g>

      {/* pose A — arms vertical over the shoulders, knees 90/90 */}
      <g className="pose-a">
        {/* torso + neck + head (lying on floor, head left) */}
        <line x1={90} y1={102} x2={116} y2={102} />
        <line x1={90} y1={102} x2={82} y2={102} />
        <circle cx={75} cy={102} r={7} />
        {/* arm straight UP: shoulder -> elbow -> wrist */}
        <line x1={90} y1={102} x2={90} y2={86} />
        <line x1={90} y1={86} x2={90} y2={71} />
        {/* thigh UP then shin horizontal (90/90 tabletop) */}
        <line x1={116} y1={102} x2={116} y2={84} />
        <line x1={116} y1={84} x2={134} y2={84} />
        {/* joint dots: shoulder, elbow, hip, knee */}
        <circle cx={90} cy={102} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={90} cy={86} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={116} cy={102} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={116} cy={84} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — arms reached back overhead near the floor, knees STILL 90/90 */}
      <g className="pose-b">
        {/* torso + neck + head (unchanged) */}
        <line x1={90} y1={102} x2={116} y2={102} />
        <line x1={90} y1={102} x2={82} y2={102} />
        <circle cx={75} cy={102} r={7} />
        {/* arm reached back overhead, toward the floor on the left:
            shoulder(90,102) -> elbow(74,98) -> wrist(58,98) */}
        <line x1={90} y1={102} x2={74} y2={98} />
        <line x1={74} y1={98} x2={58} y2={98} />
        {/* thigh UP then shin horizontal (90/90 unchanged) */}
        <line x1={116} y1={102} x2={116} y2={84} />
        <line x1={116} y1={84} x2={134} y2={84} />
        {/* joint dots */}
        <circle cx={90} cy={102} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={74} cy={98} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={116} cy={102} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={116} cy={84} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Index 1 "Opposite arm + leg".
 * The full dead bug: one arm reaches overhead while the OPPOSITE leg extends
 * long and low above the floor, then they swap to the mirrored diagonal. Profile
 * can't flip left/right arms, so the swap is shown as a change of DIRECTION:
 * pose A = arm reaching BACK overhead (left, near the floor) + leg extended low;
 * pose B = the same arm sweeping FORWARD up over the chest while the leg stays
 * extended long. The long arm-to-leg diagonal is present in BOTH frames, only its
 * direction swaps. Distinguishing feature: the long extended opposite-limb
 * diagonal (one arm reaching away from the head + one leg reaching out low).
 */
function OppositeArmLegDeadBugArt() {
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

      {/* movement arrow: the diagonal swaps direction — the reaching arm sweeps
          from back-overhead (left) up and forward over the chest (a -> b). Placed
          above the chest, arcing left-to-right over the head. */}
      <g opacity={0.6}>
        <path d="M 64 80 Q 86 64 108 76" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 100 73 L 108 76 L 103 83" strokeWidth={2} />
      </g>

      {/* pose A — the full opposite-limb DIAGONAL: arm reaches overhead ABOVE the
          head near the floor (left) while the OPPOSITE leg extends long & low to
          the right. This long arm-to-leg diagonal is the distinguishing feature. */}
      <g className="pose-a">
        {/* torso + neck + head */}
        <line x1={90} y1={102} x2={116} y2={102} />
        <line x1={90} y1={102} x2={82} y2={102} />
        <circle cx={75} cy={102} r={7} />
        {/* reaching arm overhead, arcing just ABOVE the head (clear of it):
            shoulder(90,102) -> elbow(79,90) -> wrist(64,88) (upper arm ~16) */}
        <line x1={90} y1={102} x2={79} y2={90} />
        <line x1={79} y1={90} x2={64} y2={88} />
        {/* EXTENDED leg, long & low above floor (thigh 18 + shin 18):
            hip(116,102) -> knee(134,101) -> ankle(152,100) */}
        <line x1={116} y1={102} x2={134} y2={101} />
        <line x1={134} y1={101} x2={152} y2={100} />
        {/* joint dots: shoulder, elbow, hip, knee */}
        <circle cx={90} cy={102} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={79} cy={90} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={116} cy={102} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={134} cy={101} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — the SWAP to the mirrored diagonal: the arm now reaches FORWARD
          up over the chest (toward +x) while the leg stays extended long & low, so
          the long arm-to-leg diagonal persists, only its direction flips. */}
      <g className="pose-b">
        {/* torso + neck + head */}
        <line x1={90} y1={102} x2={116} y2={102} />
        <line x1={90} y1={102} x2={82} y2={102} />
        <circle cx={75} cy={102} r={7} />
        {/* arm reaching forward & up over the chest (the swapped diagonal):
            shoulder(90,102) -> elbow(99,89) -> wrist(108,77) */}
        <line x1={90} y1={102} x2={99} y2={89} />
        <line x1={99} y1={89} x2={108} y2={77} />
        {/* leg STILL extended long & low above the floor (diagonal stays present;
            thigh 18 + shin 18): hip(116,102) -> knee(134,101) -> ankle(152,100) */}
        <line x1={116} y1={102} x2={134} y2={101} />
        <line x1={134} y1={101} x2={152} y2={100} />
        {/* joint dots */}
        <circle cx={90} cy={102} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={99} cy={89} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={116} cy={102} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={134} cy={101} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Index 2 "Heels to floor".
 * Arms stay held STILL and vertical; one knee lowers from 90/90 so the HEEL taps
 * the floor, then returns. pose A = knee up (heel high, 90/90); pose B = leg
 * lowered, heel tapping the ground line. Distinguishing feature: the near-floor
 * heel tap with the arms parked vertical.
 */
function HeelTapDeadBugArt() {
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

      {/* movement arrow: the heel dips DOWN to tap the floor (a -> b), placed out
          to the right past the foot */}
      <g opacity={0.6}>
        <path d="M 154 88 L 154 106" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 148 100 L 154 106 L 160 100" strokeWidth={2} />
      </g>

      {/* pose A — knee up at 90/90, heel high; arms vertical */}
      <g className="pose-a">
        {/* torso + neck + head */}
        <line x1={90} y1={102} x2={116} y2={102} />
        <line x1={90} y1={102} x2={82} y2={102} />
        <circle cx={75} cy={102} r={7} />
        {/* arms vertical UP (held still) */}
        <line x1={90} y1={102} x2={90} y2={86} />
        <line x1={90} y1={86} x2={90} y2={71} />
        {/* working leg 90/90: thigh up, shin horizontal, heel HIGH */}
        <line x1={116} y1={102} x2={116} y2={84} />
        <line x1={116} y1={84} x2={134} y2={84} />
        {/* joint dots: shoulder, elbow, hip, knee */}
        <circle cx={90} cy={102} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={90} cy={86} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={116} cy={102} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={116} cy={84} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — leg lowered, heel tapping the floor; arms STILL vertical */}
      <g className="pose-b">
        {/* torso + neck + head */}
        <line x1={90} y1={102} x2={116} y2={102} />
        <line x1={90} y1={102} x2={82} y2={102} />
        <circle cx={75} cy={102} r={7} />
        {/* arms vertical UP (unchanged) */}
        <line x1={90} y1={102} x2={90} y2={86} />
        <line x1={90} y1={86} x2={90} y2={71} />
        {/* leg lowered as a UNIT — the knee stays flexed ~90, the whole bent leg
            drops so only the heel dips to the floor (NOT a leg extension):
            hip(116,102) -> knee(134,94) -> ankle/heel on floor(140,109) */}
        <line x1={116} y1={102} x2={134} y2={94} />
        <line x1={134} y1={94} x2={140} y2={109} />
        {/* joint dots */}
        <circle cx={90} cy={102} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={90} cy={86} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={116} cy={102} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={134} cy={94} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Index 3 "Band-press dead bug".
 * Same dead bug, but both hands PRESS a band straight toward a low ceiling
 * anchor and hold it taut & still while the opposite arm... here both hands stay
 * on the band (anti-extension under load), and the OPPOSITE leg extends long.
 * pose A = both hands pressing the band up, knees 90/90; pose B = opposite leg
 * extended low while the band stays taut and vertical. Distinguishing feature:
 * the taut vertical band from the hands up to the ceiling anchor PLUS the
 * extended diagonal leg.
 */
function BandPressDeadBugArt() {
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

      {/* overhead band anchor (static scenery), mirroring lat_pulldown's anchor
          treatment: a short ceiling bar with a small anchor ring at (104,34). The
          band hangs from this ring DOWN to the hands. The anchor sits to the RIGHT
          of the figure's arm so the band can run on a clearly separate line. */}
      <g opacity={0.5}>
        <line x1={96} y1={34} x2={116} y2={34} />
        <circle cx={104} cy={34} r={2} strokeWidth={2} />
      </g>
      {/* band: from the anchor ring(104,34) DOWN to the hands(86,71). Drawn as a
          slanted line so it diverges from the (left-leaning, vertical-ish) arm and
          never overlaps it — the band stays to the right of the forearm. Hands sit
          at ~y=71 in both poses, so the band is static scenery. */}
      <line x1={104} y1={34} x2={86} y2={71} opacity={0.5} strokeWidth={2} />

      {/* movement arrow: the OPPOSITE leg extends out & down (a -> b), at the legs */}
      <g opacity={0.6}>
        <path d="M 130 86 Q 144 92 150 100" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 143 99 L 150 100 L 148 92" strokeWidth={2} />
      </g>

      {/* pose A — both hands pressing UP to the band, knees 90/90. The arm leans
          slightly LEFT (shoulder 90 -> hands 86) so it clearly separates from the
          right-leaning band line. */}
      <g className="pose-a">
        {/* torso + neck + head */}
        <line x1={90} y1={102} x2={116} y2={102} />
        <line x1={90} y1={102} x2={82} y2={102} />
        <circle cx={75} cy={102} r={7} />
        {/* arms pressing up to the hands at the band's lower end:
            shoulder(90,102) -> elbow(88,86) -> wrist/hands(86,71) */}
        <line x1={90} y1={102} x2={88} y2={86} />
        <line x1={88} y1={86} x2={86} y2={71} />
        {/* both knees 90/90 (tabletop) */}
        <line x1={116} y1={102} x2={116} y2={84} />
        <line x1={116} y1={84} x2={134} y2={84} />
        {/* joint dots: shoulder, elbow, hip, knee */}
        <circle cx={90} cy={102} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={88} cy={86} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={116} cy={102} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={116} cy={84} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — hands STILL press up to the band (band stays taut) while the
          opposite leg extends long & low above the floor */}
      <g className="pose-b">
        {/* torso + neck + head */}
        <line x1={90} y1={102} x2={116} y2={102} />
        <line x1={90} y1={102} x2={82} y2={102} />
        <circle cx={75} cy={102} r={7} />
        {/* arms still pressing up to the hands at the band end (unchanged) */}
        <line x1={90} y1={102} x2={88} y2={86} />
        <line x1={88} y1={86} x2={86} y2={71} />
        {/* EXTENDED leg long & low above the floor (thigh 18 + shin 18):
            hip(116,102) -> knee(134,101) -> ankle(152,100) */}
        <line x1={116} y1={102} x2={134} y2={101} />
        <line x1={134} y1={101} x2={152} y2={100} />
        {/* joint dots */}
        <circle cx={90} cy={102} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={88} cy={86} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={116} cy={102} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={134} cy={101} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

const guides: VariationGuide[] = [
  {
    // 0 Tabletop arms only
    cues: ['Press low back down', 'Reach arms past head', 'Stop short of arch'],
    Art: TabletopDeadBugArt,
  },
  {
    // 1 Opposite arm + leg
    cues: ['Long spine, ribs down', 'Reach opposite hand and heel', 'Keep back flat'],
    Art: OppositeArmLegDeadBugArt,
  },
  {
    // 2 Heels to floor
    cues: ['Brace, low back pinned', 'Lower heel toward floor', 'Tap, then return slow'],
    Art: HeelTapDeadBugArt,
  },
  {
    // 3 Band-press dead bug
    cues: ['Press band toward ceiling', 'Extend opposite arm and leg', 'Hold the band still'],
    Art: BandPressDeadBugArt,
  },
];
export default guides;
