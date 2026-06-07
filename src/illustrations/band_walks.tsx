import type { VariationGuide } from './types';

// path: ['Lateral+monster walk+leg raises'] — MULTI-MOVE panel (see CONVENTIONS §9)
//
// One panel, three mini-figures (~50% scale), each a 2-pose animated figure inside
// the SAME pose-a / pose-b groups:
//   LEFT   — Lateral band walk (FRONT view allowed; sideways stepping). Band around
//            the ankles; pose-a feet together, pose-b feet stepped wide apart.
//   CENTER — Monster walk (side profile). Band around ankles; pose-a feet together,
//            pose-b one foot stepped forward (the "monster" forward/out step).
//   RIGHT  — Lying leg raises (side profile, supine on the ground). pose-a legs low
//            near the floor, pose-b legs raised toward vertical.

function BandWalksLegRaisesArt() {
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

      {/* ===== movement arrows (one per mini-figure, static scenery) ===== */}
      {/* LEFT — lateral: foot steps to the side (right) */}
      <g opacity={0.6}>
        <path d="M 30 104 L 46 104" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 40 100 L 46 104 L 40 108" strokeWidth={2} />
      </g>
      {/* CENTER — monster: foot steps forward (right/+x) */}
      <g opacity={0.6}>
        <path d="M 96 104 L 112 104" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 106 100 L 112 104 L 106 108" strokeWidth={2} />
      </g>
      {/* RIGHT — leg raise: feet travel up in an arc (low/out -> high/vertical) */}
      <g opacity={0.6}>
        <path d="M 181 84 Q 176 70 164 66" strokeWidth={2} strokeDasharray="4 3" />
        <path d="M 162 72 L 164 66 L 170 68" strokeWidth={2} />
      </g>

      {/* =================================================================
          POSE A — start of each movement
          ================================================================= */}
      <g className="pose-a">
        {/* ---- LEFT: lateral band walk, FRONT view, feet TOGETHER ---- */}
        {/* head + torso (front-on, single centered column) */}
        <circle cx={34} cy={42} r={6} />
        <line x1={34} y1={48} x2={34} y2={70} />
        {/* arms out to the sides (front-on signature) */}
        <line x1={34} y1={54} x2={26} y2={62} />
        <line x1={34} y1={54} x2={42} y2={62} />
        {/* both legs nearly together, slight stance */}
        <line x1={34} y1={70} x2={31} y2={88} />
        <line x1={31} y1={88} x2={30} y2={106} />
        <line x1={34} y1={70} x2={37} y2={88} />
        <line x1={37} y1={88} x2={38} y2={106} />
        {/* band around the ankles (front view: a line spanning both ankles) */}
        <line x1={30} y1={104} x2={38} y2={104} opacity={0.5} />
        {/* joint dots: hip, knees */}
        <circle cx={34} cy={70} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={31} cy={88} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={37} cy={88} r={2.5} fill="currentColor" stroke="none" />

        {/* ---- CENTER: monster walk, PROFILE (faces +x), feet TOGETHER ---- */}
        {/* head ahead of the torso + small forward lean = profile walker */}
        <circle cx={94} cy={42} r={6} />
        <line x1={92} y1={48} x2={90} y2={70} />
        {/* one arm swinging forward (profile signature) */}
        <line x1={91} y1={54} x2={102} y2={60} />
        {/* feet together but slightly SPLAYED so the narrow stance reads clean
            (near foot toes -x, far foot toes +x) instead of overlapping strokes */}
        <line x1={90} y1={70} x2={87} y2={88} />
        <line x1={87} y1={88} x2={85} y2={106} />
        <line x1={85} y1={106} x2={78} y2={106} />
        <line x1={90} y1={70} x2={96} y2={88} />
        <line x1={96} y1={88} x2={99} y2={106} />
        <line x1={99} y1={106} x2={107} y2={106} />
        {/* band around the two ankles, lifted off the feet and bowed so the
            banded-ankle identity is unmistakable (the sole cue vs a lunge) */}
        <path d="M 84 101 Q 91 105 100 101" opacity={0.5} strokeWidth={2} />
        {/* joint dots: hip, knees */}
        <circle cx={90} cy={70} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={87} cy={88} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={96} cy={88} r={2.5} fill="currentColor" stroke="none" />

        {/* ---- RIGHT: lying leg raise, PROFILE supine, legs LOW (out to the right) ---- */}
        {/* head at the left end (lying on back), torso along the ground to the hip */}
        <circle cx={130} cy={104} r={6} />
        <line x1={136} y1={105} x2={156} y2={104} />
        {/* one straight leg, full length (R=32 from the hip), raised low ~50deg:
            hip(156,104) -> foot(177,80) */}
        <line x1={156} y1={104} x2={177} y2={80} />
        {/* arm flat by the side along the ground (back toward the head) */}
        <line x1={140} y1={105} x2={131} y2={108} />
        {/* joint dots: shoulder, hip */}
        <circle cx={138} cy={105} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={156} cy={104} r={2.5} fill="currentColor" stroke="none" />
      </g>

      {/* =================================================================
          POSE B — end of each movement
          ================================================================= */}
      <g className="pose-b">
        {/* ---- LEFT: lateral band walk, FRONT view, feet STEPPED WIDE ---- */}
        <circle cx={34} cy={42} r={6} />
        <line x1={34} y1={48} x2={34} y2={70} />
        {/* arms out to the sides (front-on signature) */}
        <line x1={34} y1={54} x2={26} y2={62} />
        <line x1={34} y1={54} x2={42} y2={62} />
        {/* legs spread wide, band stretched */}
        <line x1={34} y1={70} x2={26} y2={88} />
        <line x1={26} y1={88} x2={22} y2={106} />
        <line x1={34} y1={70} x2={42} y2={88} />
        <line x1={42} y1={88} x2={46} y2={106} />
        {/* band stretched between the wide ankles */}
        <line x1={22} y1={104} x2={46} y2={104} opacity={0.5} />
        {/* joint dots: hip, knees */}
        <circle cx={34} cy={70} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={26} cy={88} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={42} cy={88} r={2.5} fill="currentColor" stroke="none" />

        {/* ---- CENTER: monster walk, PROFILE (faces +x), one foot STEPPED FORWARD ---- */}
        <circle cx={94} cy={42} r={6} />
        <line x1={92} y1={48} x2={90} y2={70} />
        {/* one arm swinging forward (profile signature) */}
        <line x1={91} y1={54} x2={102} y2={60} />
        {/* rear (planted) leg under the hip */}
        <line x1={90} y1={70} x2={88} y2={88} />
        <line x1={88} y1={88} x2={86} y2={106} />
        <line x1={86} y1={106} x2={94} y2={106} />
        {/* front leg stepped forward (out to +x), band stretched */}
        <line x1={90} y1={70} x2={104} y2={88} />
        <line x1={104} y1={88} x2={110} y2={106} />
        <line x1={110} y1={106} x2={118} y2={106} />
        {/* band stretched (and bowed) between the split feet, lifted off the floor */}
        <path d="M 86 101 Q 98 106 110 101" opacity={0.5} strokeWidth={2} />
        {/* joint dots: hip, knees */}
        <circle cx={90} cy={70} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={88} cy={88} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={104} cy={88} r={2.5} fill="currentColor" stroke="none" />

        {/* ---- RIGHT: lying leg raise, PROFILE supine, leg RAISED to near-vertical ---- */}
        <circle cx={130} cy={104} r={6} />
        <line x1={136} y1={105} x2={156} y2={104} />
        {/* SAME leg length (R=32 from the same hip), now near-vertical ~82deg:
            hip(156,104) -> foot(161,72) */}
        <line x1={156} y1={104} x2={161} y2={72} />
        {/* arm flat along the ground */}
        <line x1={140} y1={105} x2={131} y2={108} />
        {/* joint dots: shoulder, hip */}
        <circle cx={138} cy={105} r={2.5} fill="currentColor" stroke="none" />
        <circle cx={156} cy={104} r={2.5} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

const guides: VariationGuide[] = [
  {
    // 0 Lateral + monster walk + leg raises (multi-move finisher)
    cues: ['Step wide against the band', 'Walk forward, knees apart', 'Lift heels to the ceiling'],
    Art: BandWalksLegRaisesArt,
  },
];
export default guides;
