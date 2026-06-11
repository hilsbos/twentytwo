import { useEffect, useState } from 'react';
import type { Profile } from '../types';
import {
  getSession,
  signInWithMagicLink,
  verifyEmailCode,
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
  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Resend countdown (Supabase rate-limits OTP requests to one per 60s).
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

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
      setCode('');
      setCooldown(60);
      setStep('sent');
    } catch (err) {
      setError(errMessage(err));
    } finally {
      setBusy(false);
    }
  }

  async function handleVerify(value: string) {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      await verifyEmailCode(sentTo, value);
      // Success: advance to the name step LOCALLY. Existing users with a
      // profile get unmounted by App's onAuthChange a beat later; without
      // this, a profile-less first-timer would hang on "Verifying…" forever
      // (App re-renders the same 'auth' branch, so Auth never remounts and
      // its mount-time getSession→'name' check never re-runs).
      setError(null);
      setBusy(false);
      setStep('name');
    } catch {
      setError("That code didn't work — check the latest email or resend.");
      setBusy(false);
    }
  }

  function handleCodeChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const digits = ev.target.value.replace(/\D/g, '').slice(0, 6);
    setCode(digits);
    if (digits.length === 6) void handleVerify(digits);
  }

  async function handleVerifySubmit(e: React.FormEvent) {
    e.preventDefault();
    if (code.length === 6) await handleVerify(code);
  }

  async function handleResend() {
    if (cooldown > 0 || busy) return;
    setBusy(true);
    setError(null);
    try {
      await signInWithMagicLink(sentTo);
      setCode('');
      setCooldown(60);
    } catch (err) {
      setError(errMessage(err));
    } finally {
      setBusy(false);
    }
  }

  function handleUseDifferentEmail() {
    setError(null);
    setSentTo('');
    setCode('');
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
        <Header sub="Check your email for a code." />
        <form onSubmit={handleVerifySubmit}>
          <div className="label">Enter code</div>
          <p className="focus" style={{ margin: '0 0 12px' }}>
            Enter the 6-digit code we emailed to{' '}
            <b style={{ color: 'var(--text)' }}>{sentTo}</b>.
          </p>
          <input
            className="input"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            value={code}
            onChange={handleCodeChange}
            placeholder="123456"
            autoComplete="one-time-code"
            autoFocus
            aria-label="6-digit code"
          />
          <div style={{ height: 12 }} />
          <button className="btn" type="submit" disabled={busy || code.length < 6}>
            {busy ? 'Verifying…' : 'Verify code'}
          </button>
        </form>
        {error && <p className="err">{error}</p>}
        <div style={{ height: 14 }} />
        <div style={{ display: 'flex', gap: 16 }}>
          <button
            type="button"
            className="muted-link"
            onClick={handleResend}
            disabled={cooldown > 0 || busy}
          >
            {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend code'}
          </button>
          <button
            type="button"
            className="muted-link"
            onClick={handleUseDifferentEmail}
          >
            Use a different email
          </button>
        </div>
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
          {busy ? 'Sending…' : 'Email me a code'}
        </button>
      </form>
      <p className="focus" style={{ marginTop: 16 }}>
        We'll email you a 6-digit code. No password.
      </p>
      {error && <p className="err">{error}</p>}
    </div>
  );
}
