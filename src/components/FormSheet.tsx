import { useEffect, useRef } from 'react';
import type { VariationGuide } from '../illustrations/types';

export interface FormSheetProps {
  /** Exercise display name, e.g. "Push-up". */
  exerciseName: string;
  /** Current variation name (the step), e.g. "Standard". */
  variationName: string;
  /** The guide for the current variation (art + cues). */
  guide: VariationGuide;
  /** The exercise note from program.ts (optional). */
  note?: string;
  /** Close handler (backdrop tap, X button, or Escape). */
  onClose: () => void;
}

/**
 * Bottom sheet that teaches the current exercise variation: a looping 2-pose
 * illustration, the variation name, 3 coaching cues, and the exercise note.
 * Modal: role=dialog + aria-modal, body scroll locked while open, Escape and
 * backdrop tap close it. The card header opens this (see Today.tsx).
 */
export default function FormSheet({
  exerciseName,
  variationName,
  guide,
  note,
  onClose,
}: FormSheetProps) {
  const titleId = `form-sheet-title`;
  const closeRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll while open; restore on close.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Escape to close; move focus to the close button on open and restore focus
  // to the triggering element (the card header) on close.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    const trigger = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      trigger?.focus();
    };
  }, [onClose]);

  const { Art, cues } = guide;
  const realCues = cues.filter((c) => c.trim().length > 0);

  return (
    <div className="form-sheet-backdrop" onClick={onClose}>
      <div
        className="form-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="form-sheet-head">
          <div>
            <div className="form-sheet-kicker">{exerciseName}</div>
            <h2 id={titleId} className="form-sheet-title">
              {variationName}
            </h2>
          </div>
          <button
            ref={closeRef}
            className="form-sheet-x"
            type="button"
            aria-label="Close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="guide-svg">
          <Art />
        </div>

        {realCues.length > 0 && (
          <ul className="form-sheet-cues">
            {realCues.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        )}

        {note && <p className="form-sheet-note">{note}</p>}
      </div>
    </div>
  );
}
