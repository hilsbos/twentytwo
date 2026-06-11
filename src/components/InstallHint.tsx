import { useState } from 'react';

// Safari can throw on ANY localStorage access ("Block All Cookies", old
// private mode) — and this runs during render at the top of the app, so a
// bare throw would white-screen everything. Degrade to "hint shows again".
function safeGetDismissed(): boolean {
  try {
    return localStorage.getItem('a2hs-dismissed') === '1';
  } catch {
    return false;
  }
}

// iOS has no programmatic install prompt — the share sheet is the only path
// to the home screen, so this one-line hint is the whole "install" flow.
// Shown only on iOS Safari (not already installed), until dismissed.
function shouldShow(): boolean {
  if (typeof window === 'undefined') return false;
  const ios = /iPhone|iPad|iPod/.test(navigator.userAgent);
  const standalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as { standalone?: boolean }).standalone === true;
  return ios && !standalone && !safeGetDismissed();
}

/** The iOS share glyph: rounded square with an up-arrow rising from its top. */
function ShareIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 6H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 10V2M5.5 4.5 8 2l2.5 2.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function InstallHint() {
  const [show, setShow] = useState(shouldShow);

  if (!show) return null;

  function dismiss() {
    try {
      localStorage.setItem('a2hs-dismissed', '1');
    } catch {
      // Storage blocked: still hide for this session.
    }
    setShow(false);
  }

  return (
    <div className="wrap">
      <div className="install-hint" role="note">
        <p>
          Add to Home Screen: tap <ShareIcon /> then 'Add to Home Screen'
        </p>
        <button
          type="button"
          className="install-x"
          aria-label="Dismiss"
          onClick={dismiss}
        >
          ×
        </button>
      </div>
    </div>
  );
}
