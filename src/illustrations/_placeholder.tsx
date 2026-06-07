/**
 * Shared placeholder art used by stub variations before an artist replaces
 * them. A simple centered standing figure (two identical poses so the crossfade
 * is a no-op) plus the ground line. Follows the canvas + stroke conventions so
 * the FormSheet renders sensibly even before real art lands.
 *
 * Artists: DELETE the usage of this in your family file and draw two real poses.
 */
export default function PlaceholderArt() {
  // TODO(artist): replace with a real 2-pose illustration of this variation.
  const figure = (
    <>
      {/* head */}
      <circle cx={100} cy={29} r={7} />
      {/* neck + torso */}
      <line x1={100} y1={36} x2={100} y2={70} />
      {/* arms (hanging) */}
      <line x1={100} y1={44} x2={100} y2={60} />
      <line x1={100} y1={60} x2={100} y2={75} />
      {/* legs */}
      <line x1={100} y1={70} x2={100} y2={88} />
      <line x1={100} y1={88} x2={100} y2={106} />
      {/* joint dots */}
      <circle cx={100} cy={44} r={2.5} fill="currentColor" stroke="none" />
      <circle cx={100} cy={70} r={2.5} fill="currentColor" stroke="none" />
      <circle cx={100} cy={88} r={2.5} fill="currentColor" stroke="none" />
    </>
  );
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
      <line x1={15} y1={110} x2={185} y2={110} opacity={0.25} strokeWidth={1.5} />
      <g className="pose-a">{figure}</g>
      <g className="pose-b">{figure}</g>
    </svg>
  );
}
