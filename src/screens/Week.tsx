import { useEffect, useMemo, useRef, useState } from 'react';
import type { DayType, Profile } from '../types';
import {
  consistencyWindow,
  localDateISO,
  programPatterns,
  rotationIndex,
} from '../lib/logic';
import { isWeekendOpen, weekPosition, YOGA_DAYS } from '../rhythm';
import { DAYS, ROTATION } from '../program';
import { fetchPresence, fetchProgression } from '../lib/db';

export interface WeekProps {
  profile: Profile;
  onSignOut: () => void;
}

const APP_VERSION = 'v1.0.0';
const WEEKDAY_LETTERS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const DAY_CLASS: Record<DayType, string> = {
  push: 'is-push',
  legs: 'is-legs',
  pull: 'is-pull',
  core: 'is-core',
};
const DAY_SHORT: Record<DayType, string> = {
  push: 'Pu',
  legs: 'Le',
  pull: 'Pl',
  core: 'Co',
};
const DAY_WORD: Record<DayType, string> = {
  push: 'Push',
  legs: 'Legs',
  pull: 'Pull',
  core: 'Core',
};

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
  }>(() => consistencyWindow([], todayISO));

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

        // My rolling 7-day consistency. Only completed_at != null counts as
        // trained — a bare protein-only morning (completed_at null) must not.
        const myTrainedDates = (sessByUser.get(profile.id) ?? [])
          .filter((s) => s.completed_at != null)
          .map((s) => s.on_date);
        setMine(consistencyWindow(myTrainedDates, todayISO));

        // Crew: everyone except me. Presence only — sessions, never reps.
        const members: CrewMember[] = profiles
          .filter((p) => p.id !== profile.id)
          .map((p) => {
            // Trained = a completed session (floor or full). A protein-only
            // morning has completed_at null and never reads as trained.
            const theirs = (sessByUser.get(p.id) ?? []).filter(
              (s) => s.completed_at != null,
            );
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
              trainedToday: theirs.some((s) => s.on_date === todayISO),
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
        {loaded && <p className="week-pos">{weekPosition(new Date()).line}</p>}
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

      <ProgramSection />

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

// ===========================================================================
// Program section — how the week fits together (collapsed by default)
// ===========================================================================
function ProgramSection() {
  const [open, setOpen] = useState(false);
  // Index into ROTATION of the day whose exercise list is expanded.
  const [openDay, setOpenDay] = useState<number | null>(null);
  // Current path step per exercise — fetched once, on first expand.
  const [progression, setProgression] = useState<Map<string, number>>(new Map());
  const fetchedRef = useRef(false);

  const patterns = useMemo(() => programPatterns(), []);
  const maxSets = Math.max(...patterns.map((p) => p.weeklySets));
  const now = new Date();
  const todayIdx = rotationIndex(now);
  // The weekend band "opens" live mid-Friday (Fri ≥ 14:30, else Sat/Sun).
  const weekendOpen = isWeekendOpen(now);

  useEffect(() => {
    if (!open || fetchedRef.current) return;
    fetchedRef.current = true;
    let alive = true;
    fetchProgression().then(
      (m) => {
        if (alive) setProgression(m);
      },
      () => {
        // Non-fatal: chips fall back to the first variation of each path.
      },
    );
    return () => {
      alive = false;
    };
  }, [open]);

  return (
    <section className="program">
      <button
        className="program-toggle"
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        How the week fits together
        <span className="chev" aria-hidden="true">
          {open ? '–' : '+'}
        </span>
      </button>

      {open && (
        <div className="program-body">
          {/* the rotation */}
          <div>
            <p className="label">The rotation</p>
            <div className="rota">
              {ROTATION.map((t, i) => {
                // Weekend band: Sat/Sun always; Friday only once it's open.
                const isWeekend = i === 5 || i === 6 || (i === 4 && weekendOpen);
                const isYoga = YOGA_DAYS.has(i);
                return (
                  <div
                    key={i}
                    className={
                      `rota-day ${DAY_CLASS[t]}` +
                      (i === todayIdx ? ' today' : '') +
                      (isWeekend ? ' is-weekend' : '')
                    }
                  >
                    <span className="rota-box">
                      {DAY_SHORT[t]}
                      {isYoga && (
                        <span className="rota-yoga" role="img" aria-label="yoga day" />
                      )}
                    </span>
                    <span className="lt">{WEEKDAY_LETTERS[i]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* frequency · recovery */}
          <div>
            <p className="label">Frequency · recovery</p>
            <div className="freq">
              {patterns.map((p) => (
                <p key={p.type} className={`freq-row ${DAY_CLASS[p.type]}`}>
                  <span className="fq-name">{DAY_WORD[p.type]}</span>
                  <span className="fq-detail">
                    {p.perWeek}×/wk
                    {p.gapHours !== null ? ` · ${p.gapHours}h apart` : ''}
                  </span>
                </p>
              ))}
            </div>
          </div>

          {/* weekly working sets */}
          <div>
            <p className="label">Weekly working sets</p>
            <div className="setbars">
              {patterns.map((p) => (
                <div key={p.type} className={`setbar ${DAY_CLASS[p.type]}`}>
                  <span className="sb-name">{DAY_WORD[p.type]}</span>
                  <span className="sb-track">
                    <span
                      className="sb-fill"
                      style={{ width: `${(p.weeklySets / maxSets) * 100}%` }}
                    />
                  </span>
                  <span className="sb-num">~{p.weeklySets}</span>
                </div>
              ))}
            </div>
          </div>

          {/* day by day */}
          <div>
            <p className="label">Day by day</p>
            <div className="pdays">
              {ROTATION.map((t, i) => {
                const expanded = openDay === i;
                return (
                  <div key={i} className={`pday ${DAY_CLASS[t]}`}>
                    <button
                      type="button"
                      className="pday-head"
                      aria-expanded={expanded}
                      onClick={() => setOpenDay(expanded ? null : i)}
                    >
                      <span className="pday-lt">{WEEKDAY_LETTERS[i]}</span>
                      <span className="ptag">{DAY_WORD[t]}</span>
                      <span className="chev" aria-hidden="true">
                        {expanded ? '–' : '+'}
                      </span>
                    </button>
                    {expanded && (
                      <div className="pday-body">
                        {DAYS[t].exercises.map((ex) => {
                          const step = progression.get(ex.key) ?? 0;
                          const unit = ex.unit === 'secs' ? 'sec' : 'reps';
                          return (
                            <div className="pday-ex" key={ex.key}>
                              <div className="pday-ex-top">
                                <span className="pday-ex-name">{ex.name}</span>
                                {!ex.main && (
                                  <span className="pday-fin">finisher</span>
                                )}
                                <span className="pday-ex-sets">
                                  {ex.sets}×{ex.range[0]}
                                  {ex.range[1] !== ex.range[0]
                                    ? `–${ex.range[1]}`
                                    : ''}{' '}
                                  {unit}
                                </span>
                              </div>
                              <div className="path">
                                {ex.path.map((s, si) => (
                                  <span
                                    key={si}
                                    className={`path-step${si === step ? ' now' : ''}`}
                                  >
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
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
