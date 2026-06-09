import { useEffect, useState } from 'react';
import type { Profile } from '../types';
import { consistency7, localDateISO } from '../lib/logic';
import { fetchPresence } from '../lib/db';

export interface WeekProps {
  profile: Profile;
  onSignOut: () => void;
}

const APP_VERSION = 'v1.0.0';
const WEEKDAY_LETTERS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

type PresenceSession = {
  user_id: string;
  on_date: string;
  completed_at: string | null;
};

interface CrewMember {
  id: string;
  name: string;
  trainedToday: boolean;
  count: number;
  lastDate: string | null;
}

/** Weekday letter (M..S) for a YYYY-MM-DD date, Monday-first. */
function weekdayLetter(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const idx = (new Date(y, m - 1, d).getDay() + 6) % 7;
  return WEEKDAY_LETTERS[idx];
}

/** Human "last trained" relative copy from a YYYY-MM-DD date. */
function relativeLast(iso: string, todayISO: string): string {
  const a = parseLocal(iso);
  const b = parseLocal(todayISO);
  const days = Math.round((b.getTime() - a.getTime()) / 86_400_000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 14) return 'last week';
  return `${Math.floor(days / 7)} weeks ago`;
}

function parseLocal(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export default function Week({ profile, onSignOut }: WeekProps) {
  const todayISO = localDateISO(new Date());
  const [crew, setCrew] = useState<CrewMember[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Gate the count so we never flash a misleading "0" before data arrives.
  const [loaded, setLoaded] = useState(false);

  // My own consistency comes from presence sessions too (single fetch).
  const [mine, setMine] = useState<{
    count: number;
    days: { date: string; trained: boolean }[];
  }>(() => consistency7([], todayISO));

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        const { profiles, sessions } = await fetchPresence(7);
        if (!alive) return;

        const sessByUser = new Map<string, PresenceSession[]>();
        for (const s of sessions) {
          const arr = sessByUser.get(s.user_id) ?? [];
          arr.push(s);
          sessByUser.set(s.user_id, arr);
        }

        // My rolling 7-day consistency.
        const mySessions = (sessByUser.get(profile.id) ?? []).map((s) => ({
          id: '',
          user_id: s.user_id,
          on_date: s.on_date,
          day_type: 'push' as const,
          floor_mode: false,
          protein_hit: false,
          completed_at: s.completed_at,
        }));
        setMine(consistency7(mySessions, todayISO));

        // Crew: everyone except me. Presence only — sessions, never reps.
        const members: CrewMember[] = profiles
          .filter((p) => p.id !== profile.id)
          .map((p) => {
            const theirs = sessByUser.get(p.id) ?? [];
            const dates = new Set(theirs.map((s) => s.on_date));
            const lastDate =
              theirs.length > 0
                ? theirs.reduce(
                    (max, s) => (s.on_date > max ? s.on_date : max),
                    theirs[0].on_date,
                  )
                : null;
            return {
              id: p.id,
              name: p.display_name,
              trainedToday: dates.has(todayISO),
              count: countLast7(theirs, todayISO),
              lastDate,
            };
          })
          .sort((a, b) => {
            // Trained-today first, then by count, then name.
            if (a.trainedToday !== b.trainedToday) return a.trainedToday ? -1 : 1;
            if (b.count !== a.count) return b.count - a.count;
            return a.name.localeCompare(b.name);
          });

        setCrew(members);
        setError(null);
        setLoaded(true);
      } catch {
        if (!alive) return;
        setError('Could not load the crew. Pull to refresh.');
        setCrew([]);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [profile.id, todayISO]);

  return (
    <div className="wrap">
      <section className="consistency">
        <div className={`big${loaded && mine.count >= 6 ? ' is-win' : ''}`}>
          {loaded ? mine.count : '–'}
          <span className="slash"> / 7</span>
        </div>
        <p className="cap">mornings this week — 6 in a week is a full win</p>
      </section>

      <div className="week-dots">
        {mine.days.map((d) => {
          const isToday = d.date === todayISO;
          return (
            <div
              key={d.date}
              className={
                'day-dot' +
                (d.trained ? ' trained' : '') +
                (isToday ? ' today' : '')
              }
            >
              <span className="lt">{weekdayLetter(d.date)}</span>
              <span className="pip" />
            </div>
          );
        })}
      </div>

      <section className="crew">
        <p className="label">The crew</p>

        {crew === null ? (
          <p className="crew-empty">Loading the crew…</p>
        ) : error ? (
          <p className="crew-empty">{error}</p>
        ) : crew.length === 0 ? (
          <p className="crew-empty">
            Share the link — accountability works better with company.
          </p>
        ) : (
          crew.map((m) => (
            <div className="friend-row" key={m.id}>
              <div>
                <div className="friend-name">{m.name}</div>
                {m.trainedToday ? (
                  <div className="friend-status today">
                    <span className="live" />
                    trained today
                  </div>
                ) : (
                  <div className="friend-status">
                    last:{' '}
                    {m.lastDate ? relativeLast(m.lastDate, todayISO) : 'no sessions yet'}
                  </div>
                )}
              </div>
              <span className="friend-count">{m.count}</span>
            </div>
          ))
        )}
      </section>

      <footer className="app-footer">
        <button className="muted-link" onClick={onSignOut}>
          Sign out
        </button>
        <span className="ver">twentyTwo {APP_VERSION}</span>
      </footer>
    </div>
  );
}

/** Distinct trained calendar days within the rolling last-7-day window. */
function countLast7(sessions: PresenceSession[], todayISO: string): number {
  const window = new Set<string>();
  const today = parseLocal(todayISO);
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    window.add(localDateISO(d));
  }
  const trained = new Set<string>();
  for (const s of sessions) {
    if (window.has(s.on_date)) trained.add(s.on_date);
  }
  return trained.size;
}
