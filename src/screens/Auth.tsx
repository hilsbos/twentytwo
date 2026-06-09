import { useEffect, useState } from 'react';
import type { Profile } from '../types';
import {
  getSession,
  signInWithMagicLink,
  signOut,
  createProfile,
} from '../lib/db';

export interface AuthProps {
  /** Called once a profile exists for the signed-in user. */
  onProfileReady: (profile: Profile) => void;
}

type Step = 'loading' | 'email' | 'sent' | 'name';

function Header({ sub }: { sub: string }) {
  return (
    <header className="app-header">
      <div className="kicker">Morning protocol · bodyweight</div>
      <h1 className="wordmark">
        Twenty<span className="twenty">Two</span>
      </h1>
      <p className="app-sub">{sub}</p>
    </header>
  );
}

function errMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === 'string') return e;
  return 'Something went wrong. Try again.';
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Auth({ onProfileReady }: AuthProps) {
  // If the user is already signed in (e.g. returned via magic link) but has no
  // profile, the App renders us so the user can pick a display name.
  const [step, setStep] = useState<Step>('loading');

  const [email, setEmail] = useState('');
  const [sentTo, setSentTo] = useState('');
  const [name, setName] = useState('');

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    getSession().then((session) => {
      if (!alive) return;
      // A session present here means: signed in, but App found no profile.
      setStep(session ? 'name' : 'email');
    });
    return () => {
      alive = false;
    };
  }, []);

  async function handleSendLink(e: React.FormEvent) {
    e.preventDefault();
    const addr = email.trim();
    if (!EMAIL_RE.test(addr)) {
      setError('Enter a valid email address.');
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await signInWithMagicLink(addr);
      setSentTo(addr);
      setStep('sent');
    } catch (err) {
      setError(errMessage(err));
    } finally {
      setBusy(false);
    }
  }

  function handleUseDifferentEmail() {
    setError(null);
    setSentTo('');
    setStep('email');
  }

  async function handleCreateProfile(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 1 || trimmed.length > 24) {
      setError('Pick a name between 1 and 24 characters.');
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const profile = await createProfile(trimmed);
      onProfileReady(profile);
    } catch (err) {
      setError(errMessage(err));
      setBusy(false);
    }
  }

  async function handleSignOutFromName() {
    setError(null);
    try {
      await signOut();
    } finally {
      setName('');
      setEmail('');
      setSentTo('');
      setStep('email');
    }
  }

  if (step === 'loading') {
    return (
      <div className="wrap">
        <Header sub="Daily calisthenics. 22 minutes. Anywhere." />
      </div>
    );
  }

  if (step === 'sent') {
    return (
      <div className="wrap">
        <Header sub="Check your email to finish signing in." />
        <div className="label">Magic link sent</div>
        <p className="focus" style={{ margin: '0 0 18px' }}>
          We sent a sign-in link to <b style={{ color: 'var(--text)' }}>{sentTo}</b>.
          Open it on this device to continue. No password needed.
        </p>
        <button
          type="button"
          className="muted-link"
          onClick={handleUseDifferentEmail}
        >
          Use a different email
        </button>
        {error && <p className="err">{error}</p>}
      </div>
    );
  }

  if (step === 'name') {
    return (
      <div className="wrap">
        <Header sub="One last thing — what should the crew call you?" />
        <form onSubmit={handleCreateProfile}>
          <div className="label">Display name</div>
          <input
            className="input"
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            placeholder="e.g. Patrick"
            maxLength={24}
            autoFocus
            autoComplete="nickname"
            aria-label="Display name"
          />
          <div style={{ height: 12 }} />
          <button className="btn" type="submit" disabled={busy || !name.trim()}>
            {busy ? 'Saving…' : 'Start training'}
          </button>
        </form>
        {error && <p className="err">{error}</p>}
        <div style={{ height: 14 }} />
        <button
          type="button"
          className="muted-link"
          onClick={handleSignOutFromName}
        >
          Sign out
        </button>
      </div>
    );
  }

  // step === 'email'
  return (
    <div className="wrap">
      <Header sub="Daily calisthenics. 22 minutes. Anywhere. Sign in to track it." />
      <form onSubmit={handleSendLink}>
        <div className="label">Sign in</div>
        <input
          className="input"
          type="email"
          inputMode="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          autoFocus
          aria-label="Email address"
        />
        <div style={{ height: 12 }} />
        <button className="btn" type="submit" disabled={busy || !email.trim()}>
          {busy ? 'Sending…' : 'Send magic link'}
        </button>
      </form>
      <p className="focus" style={{ marginTop: 16 }}>
        We'll email you a one-tap sign-in link. No password.
      </p>
      {error && <p className="err">{error}</p>}
    </div>
  );
}
