import type { VariationGuide } from './types';

// path: ['Tall-kneeling hold', 'Tall-kneeling press', 'Standing press',
//        'Split-stance press']
//
// Band anti-rotation press ("Pallof"). The long band is anchored at CHEST HEIGHT
// in a door to one side (drawn on the right, where the figure faces). The band
// runs horizontally to both hands held at the chest; the trunk resists being
// twisted toward the anchor. The hands either HOLD at the chest (index 0) or
// PRESS straight forward against the band's pull (indexes 1-3). STANCE is the
// distinguishing feature per step:
//   0 Tall-kneeling HOLD   — kneeling, hands held at chest, band taut sideways.
//   1 Tall-kneeling PRESS  — kneeling, arms press straight out against the band.
//   2 Standing PRESS       — standing tall, arms press straight out.
//   3 Split-stance PRESS   — staggered split stance, arms press straight out.
// Shared tall-kneeling base matches lat_pulldown's convention (hip y=72,
// shoulder y=46, head y=32, thigh hip->knee(96,92), shin back to ankle on floor).
//
// Because the rotation axis points INTO the page, a pure side profile cannot show
// "don't let it twist you." Every panel therefore carries a small overhead
// COMPANION INSET (top-left) — a top-down body with a dominant crossed-out TURNING
// arrow and the band pulling away on a diagonal — drawn by AntiRotationInset(). This
// is the visual support the three anti-rotation cues previously lacked.

/**
 * Overhead anti-rotation INSET (shared static scenery, identical in all 4 panels).
 * The side-profile stance figure cannot show the rotation axis (it points into the
 * page), so a small top-down companion diagram carries the anti-rotation idea. The
 * read must survive downscaling to a 390px phone card, so the layout is built around
 * ONE dominant glyph instead of a cluster of competing marks:
 *   - a big OPEN curved arrow (a horseshoe with a clear arrowhead at its right end)
 *     sweeping over the top — this is the dominant shape and reads unmistakably as a
 *     TURNING / rotation motion (not a closed ring, so it can't collapse into a
 *     generic "no" circle),
 *   - a SMALL X struck through the CROWN of that arc — "don't let this rotation
 *     happen"; it crosses the arrow, never the head, so the curve stays legible,
 *   - below the arc, the body seen FROM ABOVE (a square shoulder bar with the head
 *     poking toward the viewer) — shoulders square = the trunk facing forward,
 *   - one arm reaching out to the band, which runs DOWN-RIGHT to a side anchor. The
 *     pull deliberately travels on a DIAGONAL (down-right) axis, NOT straight +x, so
 *     it cannot visually rhyme with the main figure's rightward band/press; it reads
 *     as a sideways tug the square trunk must resist, not "another forward press."
 * Lives in the top-left corner, outside both pose groups (never flickers).
 */
function AntiRotationInset() {
  return (
    <g aria-hidden="true">
      {/* inset frame */}
      <rect x={12} y={14} width={74} height={60} rx={4} opacity={0.3} strokeWidth={1.2} />

      {/* DOMINANT twist arc: an open curved arrow over the top with the arrowhead at
          its right end — reads as a turning/rotation motion at any scale */}
      <g opacity={0.95}>
        <path d="M 28 46 A 17 15 0 1 1 62 44" strokeWidth={2.6} />
        <path d="M 56.5 38.5 L 62.5 44 L 64.5 36.5" strokeWidth={2.6} />
      </g>

      {/* small X struck through the CROWN of the arc — "don't let it rotate"; it
          crosses the arrow (not the head below) so the curve stays readable */}
      <g opacity={0.95}>
        <path d="M 38 22 L 50 33" strokeWidth={2} />
        <path d="M 50 22 L 38 33" strokeWidth={2} />
      </g>

      {/* body FROM ABOVE: square shoulder bar (trunk facing forward) + head toward
          the viewer below it */}
      <line x1={33} y1={52} x2={57} y2={52} strokeWidth={3.6} />
      <line x1={45} y1={52} x2={45} y2={58} strokeWidth={2.4} />
      <circle cx={45} cy={62} r={4.2} />

      {/* one arm reaches to the band; the band pulls DOWN-RIGHT to a side anchor —
          a diagonal axis distinct from the main figure's straight-right press */}
      <line x1={57} y1={52} x2={63} y2={59} strokeWidth={2.6} />
      <line x1={63} y1={59} x2={72} y2={67} opacity={0.55} strokeWidth={2} strokeDasharray="3 2" />
      <circle cx={74} cy={69} r={1.8} strokeWidth={1.2} />
    </g>
  );
}

/**
 * Tall-kneeling hold — index 0.
 * Distinguishing feature: TALL-KNEELING base (both shins on the floor) with a
 * horizontal band from a chest-height door anchor (right) to both hands held
 * AT THE CHEST. This is an ISOMETRIC HOLD, so it follows the shared hold pattern:
 *   - pose-a = getting into the braced position (hands a hair closer to the chest,
 *     band a touch slacker),
 *   - pose-b = the held target (hands settled a hair forward, band taut),
 *   - the delta a->b is tiny (a gentle settle/brace), never a traveling rep.
 * A "hold" CLOCK glyph (matching the praised forearm-plank marker) replaces the old
 * directional arrow; the anti-rotation action is carried entirely by the overhead
 * inset, so no body-action arrow is needed. The trunk stays SQUARE in both poses —
 * it does NOT lean toward the anchor (that lean is the fault the drill prevents).
 */
function TallKneelingHoldArt() {
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

      {/* DOOR on the right with the band anchored at CHEST height (y=66) */}
      <g opacity={0.5}>
        <line x1={178} y1={18} x2={178} y2={110} />
        <line x1={178} y1={66} x2={168} y2={66} />
        <circle cx={166} cy={66} r={2} strokeWidth={2} />
      </g>

      {/* overhead anti-rotation inset (shared) */}
      <AntiRotationInset />

      {/* HOLD signal: a clock glyph (not a travel arrow) marks the static hold,
          sitting in open space between the trunk and the band. */}
      <g opacity={0.6}>
        <circle cx={124} cy={48} r={6} strokeWidth={1.5} />
        <path d="M 124 48 L 124 44" strokeWidth={1.5} />
        <path d="M 124 48 L 127 50" strokeWidth={1.5} />
      </g>

      {/* pose A — SQUARE and braced, getting into the hold (hands a hair closer to
          the chest, band a touch slacker). The trunk is fully vertical; no lean. */}
      <g className="pose-a">
        {/* torso upright: hip(96,72) -> shoulder(96,46); neck + head */}
        <line x1={96} y1={46} x2={96} y2={72} />
        <line x1={96} y1={39} x2={96} y2={46} />
        <circle cx={96} cy={32} r={7} />
        {/* TALL-KNEELING: thigh vertical hip->knee, shin back to ankle, toe fwd */}
        <line x1={96} y1={72} x2={96} y2={92} />
        <line x1={96} y1={92} x2={80} y2={108} />
        <line x1={80} y1={108} x2={92} y2={108} />
        {/* arms hold the band at the chest, elbows tucked in tight:
            shoulder(96,46) -> elbow(102,58) -> hand(108,66) */}
        <line x1={96} y1={46} x2={102} y2={58} />
        <line x1={102} y1={58} x2={108} y2={66} />
        {/* band: hands(108,66) -> chest-height anchor(166,66) */}
        <line x1={108} y1={66} x2={166} y2={66} opacity={0.5} strokeWidth={2} />
        {/* joint dots: shoulder, hip, elbow, knee */}
        <circle cx={96} cy={46} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={72} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={102} cy={58} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={92} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — HELD TARGET, still SQUARE and upright; hands settled a hair
          forward so the band draws taut (the only, tiny a->b change). No lean. */}
      <g className="pose-b">
        {/* torso upright (same base as pose-a): hip(96,72) -> shoulder(96,46) */}
        <line x1={96} y1={46} x2={96} y2={72} />
        <line x1={96} y1={39} x2={96} y2={46} />
        <circle cx={96} cy={32} r={7} />
        {/* same kneeling base */}
        <line x1={96} y1={72} x2={96} y2={92} />
        <line x1={96} y1={92} x2={80} y2={108} />
        <line x1={80} y1={108} x2={92} y2={108} />
        {/* arms hold the band at the chest, hands a hair forward (band taut):
            shoulder(96,46) -> elbow(104,59) -> hand(116,66) */}
        <line x1={96} y1={46} x2={104} y2={59} />
        <line x1={104} y1={59} x2={116} y2={66} />
        {/* band taut to the anchor */}
        <line x1={116} y1={66} x2={166} y2={66} opacity={0.5} strokeWidth={2} />
        {/* joint dots */}
        <circle cx={96} cy={46} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={72} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={104} cy={59} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={92} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Tall-kneeling press — index 1.
 * Distinguishing feature: same TALL-KNEELING base, but the arms PRESS straight
 * forward, fully extended against the horizontal band (the band stretches
 * longer). pose-a = hands at chest (band short); pose-b = arms locked out
 * straight ahead (band long/taut). Dashed arrow forward at the hands.
 */
function TallKneelingPressArt() {
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

      {/* DOOR on the right, band anchored at CHEST height (y=66) */}
      <g opacity={0.5}>
        <line x1={178} y1={18} x2={178} y2={110} />
        <line x1={178} y1={66} x2={168} y2={66} />
        <circle cx={166} cy={66} r={2} strokeWidth={2} />
      </g>

      {/* overhead anti-rotation inset (shared) */}
      <AntiRotationInset />

      {/* movement arrow: hands press straight FORWARD (a -> b) */}
      <g opacity={0.6}>
        <path d="M 118 52 L 142 52" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 136 47 L 142 52 L 136 57" strokeWidth={2} />
      </g>

      {/* pose A — hands at the chest (band short) */}
      <g className="pose-a">
        {/* torso upright: hip(96,72) -> shoulder(96,46); neck + head */}
        <line x1={96} y1={46} x2={96} y2={72} />
        <line x1={96} y1={39} x2={96} y2={46} />
        <circle cx={96} cy={32} r={7} />
        {/* tall-kneeling base */}
        <line x1={96} y1={72} x2={96} y2={92} />
        <line x1={96} y1={92} x2={80} y2={108} />
        <line x1={80} y1={108} x2={92} y2={108} />
        {/* arms bent, hands at chest: shoulder(96,46) -> elbow(104,58) -> hand(112,66) */}
        <line x1={96} y1={46} x2={104} y2={58} />
        <line x1={104} y1={58} x2={112} y2={66} />
        {/* band: hands(112,66) -> anchor(166,66) */}
        <line x1={112} y1={66} x2={166} y2={66} opacity={0.5} strokeWidth={2} />
        {/* joint dots: shoulder, hip, elbow, knee */}
        <circle cx={96} cy={46} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={72} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={104} cy={58} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={92} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — arms pressed straight forward, locked out (band long) */}
      <g className="pose-b">
        {/* torso upright (same base) */}
        <line x1={96} y1={46} x2={96} y2={72} />
        <line x1={96} y1={39} x2={96} y2={46} />
        <circle cx={96} cy={32} r={7} />
        <line x1={96} y1={72} x2={96} y2={92} />
        <line x1={96} y1={92} x2={80} y2={108} />
        <line x1={80} y1={108} x2={92} y2={108} />
        {/* arms straight out forward, level at chest:
            shoulder(96,46) -> elbow(112,52) -> hand(128,58) */}
        <line x1={96} y1={46} x2={112} y2={52} />
        <line x1={112} y1={52} x2={128} y2={58} />
        {/* band: hands(128,58) -> anchor(166,66) (now stretched longer) */}
        <line x1={128} y1={58} x2={166} y2={66} opacity={0.5} strokeWidth={2} />
        {/* joint dots */}
        <circle cx={96} cy={46} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={72} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={112} cy={52} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={92} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Standing press — index 2.
 * Distinguishing feature: full STANDING posture (feet stacked on the floor,
 * long straight legs) with the same forward band press. pose-a = standing,
 * hands at chest; pose-b = arms pressed straight out, band taut. Dashed arrow
 * forward at the hands.
 */
function StandingPressArt() {
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

      {/* DOOR on the right, band anchored at CHEST height (y=58) */}
      <g opacity={0.5}>
        <line x1={178} y1={18} x2={178} y2={110} />
        <line x1={178} y1={58} x2={168} y2={58} />
        <circle cx={166} cy={58} r={2} strokeWidth={2} />
      </g>

      {/* overhead anti-rotation inset (shared) */}
      <AntiRotationInset />

      {/* movement arrow: hands press straight FORWARD (a -> b) */}
      <g opacity={0.6}>
        <path d="M 118 44 L 142 44" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 136 39 L 142 44 L 136 49" strokeWidth={2} />
      </g>

      {/* pose A — standing tall, hands at chest */}
      <g className="pose-a">
        {/* torso upright: hip(96,64) -> shoulder(96,38); neck + head */}
        <line x1={96} y1={38} x2={96} y2={64} />
        <line x1={96} y1={31} x2={96} y2={38} />
        <circle cx={96} cy={24} r={7} />
        {/* STANDING leg (thigh 18 + shin ~22 to reach the floor from the braced
            hip): hip(96,64) -> knee(96,82) -> ankle(96,108) -> toe (foot ~9) */}
        <line x1={96} y1={64} x2={96} y2={82} />
        <line x1={96} y1={82} x2={96} y2={108} />
        <line x1={96} y1={108} x2={105} y2={108} />
        {/* arms bent, hands at chest (upper ~16/forearm ~13):
            shoulder(96,38) -> elbow(103,52) -> hand(112,58) */}
        <line x1={96} y1={38} x2={103} y2={52} />
        <line x1={103} y1={52} x2={112} y2={58} />
        {/* band: hands(112,58) -> anchor(166,58) */}
        <line x1={112} y1={58} x2={166} y2={58} opacity={0.5} strokeWidth={2} />
        {/* joint dots: shoulder, hip, elbow, knee */}
        <circle cx={96} cy={38} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={64} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={103} cy={52} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={82} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — standing, arms pressed straight out forward */}
      <g className="pose-b">
        {/* torso upright (same base) */}
        <line x1={96} y1={38} x2={96} y2={64} />
        <line x1={96} y1={31} x2={96} y2={38} />
        <circle cx={96} cy={24} r={7} />
        <line x1={96} y1={64} x2={96} y2={82} />
        <line x1={96} y1={82} x2={96} y2={108} />
        <line x1={96} y1={108} x2={105} y2={108} />
        {/* arms straight out forward at chest:
            shoulder(96,38) -> elbow(112,46) -> hand(128,52) */}
        <line x1={96} y1={38} x2={112} y2={46} />
        <line x1={112} y1={46} x2={128} y2={52} />
        {/* band stretched: hands(128,52) -> anchor(166,58) */}
        <line x1={128} y1={52} x2={166} y2={58} opacity={0.5} strokeWidth={2} />
        {/* joint dots */}
        <circle cx={96} cy={38} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={64} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={112} cy={46} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={82} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * Split-stance press — index 3.
 * Distinguishing feature: a staggered SPLIT STANCE (one foot planted forward,
 * one foot back, both on the floor) under the same standing band press. The
 * two separated feet are the at-a-glance signature. pose-a = split stance,
 * hands at chest; pose-b = arms pressed straight forward, band taut.
 */
function SplitStancePressArt() {
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

      {/* DOOR on the right, band anchored at CHEST height (y=58) */}
      <g opacity={0.5}>
        <line x1={178} y1={18} x2={178} y2={110} />
        <line x1={178} y1={58} x2={168} y2={58} />
        <circle cx={166} cy={58} r={2} strokeWidth={2} />
      </g>

      {/* overhead anti-rotation inset (shared) */}
      <AntiRotationInset />

      {/* movement arrow: hands press straight FORWARD (a -> b) */}
      <g opacity={0.6}>
        <path d="M 118 44 L 142 44" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 136 39 L 142 44 L 136 49" strokeWidth={2} />
      </g>

      {/* pose A — SPLIT STANCE (front foot fwd, rear foot back), hands at chest */}
      <g className="pose-a">
        {/* torso upright: hip(94,64) -> shoulder(94,38); neck + head */}
        <line x1={94} y1={38} x2={94} y2={64} />
        <line x1={94} y1={31} x2={94} y2={38} />
        <circle cx={94} cy={24} r={7} />
        {/* FRONT leg (forward, +x): hip(94,64) -> knee(104,86) -> ankle(110,108) -> toe */}
        <line x1={94} y1={64} x2={104} y2={86} />
        <line x1={104} y1={86} x2={110} y2={108} />
        <line x1={110} y1={108} x2={119} y2={108} />
        {/* REAR leg (back, -x): hip(94,64) -> knee(84,86) -> ankle(78,108) -> toe */}
        <line x1={94} y1={64} x2={84} y2={86} />
        <line x1={84} y1={86} x2={78} y2={108} />
        <line x1={78} y1={108} x2={88} y2={108} />
        {/* arms bent, hands at chest: shoulder(94,38) -> elbow(102,50) -> hand(110,58) */}
        <line x1={94} y1={38} x2={102} y2={50} />
        <line x1={102} y1={50} x2={110} y2={58} />
        {/* band: hands(110,58) -> anchor(166,58) */}
        <line x1={110} y1={58} x2={166} y2={58} opacity={0.5} strokeWidth={2} />
        {/* joint dots: shoulder, hip, front knee, rear knee */}
        <circle cx={94} cy={38} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={94} cy={64} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={104} cy={86} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={84} cy={86} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* pose B — split stance held, arms pressed straight forward */}
      <g className="pose-b">
        {/* torso upright (same base) */}
        <line x1={94} y1={38} x2={94} y2={64} />
        <line x1={94} y1={31} x2={94} y2={38} />
        <circle cx={94} cy={24} r={7} />
        {/* FRONT leg */}
        <line x1={94} y1={64} x2={104} y2={86} />
        <line x1={104} y1={86} x2={110} y2={108} />
        <line x1={110} y1={108} x2={119} y2={108} />
        {/* REAR leg */}
        <line x1={94} y1={64} x2={84} y2={86} />
        <line x1={84} y1={86} x2={78} y2={108} />
        <line x1={78} y1={108} x2={88} y2={108} />
        {/* arms straight out forward at chest:
            shoulder(94,38) -> elbow(110,46) -> hand(126,52) */}
        <line x1={94} y1={38} x2={110} y2={46} />
        <line x1={110} y1={46} x2={126} y2={52} />
        {/* band stretched: hands(126,52) -> anchor(166,58) */}
        <line x1={126} y1={52} x2={166} y2={58} opacity={0.5} strokeWidth={2} />
        {/* joint dots */}
        <circle cx={94} cy={38} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={94} cy={64} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={104} cy={86} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={84} cy={86} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

const guides: VariationGuide[] = [
  {
    // 0 Tall-kneeling hold
    cues: ['Square hips to front', 'Hold band at chest', 'Resist the twist'],
    Art: TallKneelingHoldArt,
  },
  {
    // 1 Tall-kneeling press
    cues: ['Square up, ribs down', 'Press band straight out', "Don't let it rotate"],
    Art: TallKneelingPressArt,
  },
  {
    // 2 Standing press
    cues: ['Stand tall, brace once', 'Press band away, lock out', 'Stay facing forward'],
    Art: StandingPressArt,
  },
  {
    // 3 Split-stance press
    cues: ['Split stance, hips square', 'Press out and hold', 'Fight the pull back'],
    Art: SplitStancePressArt,
  },
];
export default guides;
