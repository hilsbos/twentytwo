import { useEffect, useState } from 'react';
import type { Session as AuthSession } from '@supabase/supabase-js';
import type { Profile } from './types';
import { getSession, onAuthChange, getProfile, signOut } from './lib/db';
import Auth from './screens/Auth';
import Today from './screens/Today';
import Week from './screens/Week';
import InstallHint from './components/InstallHint';

type Phase = 'loading' | 'auth' | 'app';
type Screen = 'today' | 'week';

function BrandBar() {
  return (
    <div className="brandbar">
      <span className="mark" aria-hidden="true">
        22
      </span>
      <span className="name">
        Twenty&nbsp;<span className="two">Two</span>
      </span>
    </div>
  );
}

export default function App() {
  const [phase, setPhase] = useState<Phase>('loading');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [screen, setScreen] = useState<Screen>('today'); // Today is ALWAYS initial
  // If boot stalls (slow/hung auth fetch), surface a reload instead of staying
  // on a silent black screen forever.
  const [bootSlow, setBootSlow] = useState(false);

  // Resolve auth + profile on boot and whenever auth changes.
  useEffect(() => {
    let alive = true;

    async function resolve(session: AuthSession | null) {
      if (!session) {
        if (!alive) return;
        setProfile(null);
        setPhase('auth');
        return;
      }
      try {
        const p = await getProfile();
        if (!alive) return;
        if (p) {
          setProfile(p);
          setPhase('app');
        } else {
          // Signed in but no profile yet -> Auth handles the name step.
          setProfile(null);
          setPhase('auth');
        }
      } catch {
        if (!alive) return;
        setPhase('auth');
      }
    }

    getSession().then(resolve);
    const off = onAuthChange((session) => {
      // Don't downgrade the app once a profile is established by name step;
      // re-resolve so sign-out and magic-link return both work.
      resolve(session);
    });

    return () => {
      alive = false;
      off();
    };
  }, []);

  // Watchdog: if we're still resolving auth after 8s, something is wrong
  // (hung token refresh, flaky network) — offer a reload rather than black.
  useEffect(() => {
    if (phase !== 'loading') {
      setBootSlow(false);
      return;
    }
    const t = setTimeout(() => setBootSlow(true), 8000);
    return () => clearTimeout(t);
  }, [phase]);

  function handleProfileReady(p: Profile) {
    setProfile(p);
    setScreen('today');
    setPhase('app');
  }

  async function handleSignOut() {
    try {
      await signOut();
    } finally {
      setProfile(null);
      setPhase('auth');
    }
  }

  if (phase === 'loading') {
    // Same slim bar the signed-in app shows, so the daily open doesn't flash
    // a big header before settling.
    return (
      <div className="wrap">
        <BrandBar />
        {bootSlow ? (
          <div className="boot-slow" role="alert">
            <p>Taking longer than usual to load.</p>
            <button
              type="button"
              className="btn"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        ) : (
          <p className="boot-hint" aria-live="polite">
            Loading…
          </p>
        )}
      </div>
    );
  }

  if (phase === 'auth' || !profile) {
    return (
      <>
        <InstallHint />
        <Auth onProfileReady={handleProfileReady} />
      </>
    );
  }

  return (
    <>
      <InstallHint />
      <header className="wrap">
        <BrandBar />
      </header>
      <nav className="wrap nav" role="tablist" aria-label="Sections">
        <button
          className="nav-tab"
          role="tab"
          aria-selected={screen === 'today'}
          onClick={() => setScreen('today')}
        >
          Today
        </button>
        <button
          className="nav-tab"
          role="tab"
          aria-selected={screen === 'week'}
          onClick={() => setScreen('week')}
        >
          Week
        </button>
      </nav>

      {screen === 'today' ? (
        <Today profile={profile} />
      ) : (
        <Week profile={profile} onSignOut={handleSignOut} />
      )}
    </>
  );
}
