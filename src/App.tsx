import { useEffect, useState } from 'react';
import type { Session as AuthSession } from '@supabase/supabase-js';
import type { Profile } from './types';
import { getSession, onAuthChange, getProfile, signOut } from './lib/db';
import Auth from './screens/Auth';
import Today from './screens/Today';
import Week from './screens/Week';

type Phase = 'loading' | 'auth' | 'app';
type Screen = 'today' | 'week';

export default function App() {
  const [phase, setPhase] = useState<Phase>('loading');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [screen, setScreen] = useState<Screen>('today'); // Today is ALWAYS initial

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
    return (
      <div className="wrap">
        <header className="app-header">
          <div className="kicker">Morning protocol · bodyweight</div>
          <h1 className="wordmark">
            Twenty<span className="twenty">Two</span>
          </h1>
        </header>
      </div>
    );
  }

  if (phase === 'auth' || !profile) {
    return <Auth onProfileReady={handleProfileReady} />;
  }

  return (
    <>
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
