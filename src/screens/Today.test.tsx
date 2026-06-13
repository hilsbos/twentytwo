// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import type { Session, SetLog } from '../types';

// --- mock the data layer (no network in tests) ---
vi.mock('../lib/db', () => ({
  fetchMyHistory: vi.fn(),
  fetchProgression: vi.fn(),
  fetchFamiliarity: vi.fn(),
  getOrCreateTodaySession: vi.fn(),
  logSet: vi.fn(),
  markCompleted: vi.fn(),
  setFloorMode: vi.fn(),
  setProteinHit: vi.fn(),
  advanceStep: vi.fn(),
}));

// Keep cards art-free so the lazy guide loader never runs during these tests.
vi.mock('../illustrations', () => ({
  isGuidable: () => false,
  loadGuide: vi.fn().mockResolvedValue(null),
}));

import Today from './Today';
import { localDateISO } from '../lib/logic';
import {
  fetchMyHistory,
  fetchProgression,
  fetchFamiliarity,
  getOrCreateTodaySession,
  logSet,
  markCompleted,
  setFloorMode,
  setProteinHit,
} from '../lib/db';

const profile = { id: 'u1', display_name: 'Pat' };
const fakeSession: Session = {
  id: 's1',
  user_id: 'u1',
  on_date: '2026-06-08',
  day_type: 'push',
  floor_mode: false,
  protein_hit: false,
  completed_at: null,
};
const savedLog = (over: Partial<SetLog> = {}): SetLog => ({
  id: 'l1',
  session_id: 's1',
  user_id: 'u1',
  exercise_key: 'x',
  set_number: 1,
  value: 10,
  step_index: 0,
  ...over,
});

/** A promise whose resolution we control, to model an in-flight network call. */
function deferred<T>() {
  let resolve!: (v: T) => void;
  const promise = new Promise<T>((r) => (resolve = r));
  return { promise, resolve };
}

beforeEach(() => {
  vi.mocked(fetchMyHistory).mockResolvedValue([]);
  vi.mocked(fetchProgression).mockResolvedValue(new Map());
  vi.mocked(fetchFamiliarity).mockResolvedValue(new Map());
  vi.mocked(markCompleted).mockResolvedValue(undefined);
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

/** Open the Nth still-unlogged "Set 1" chip and confirm its logged value. */
async function logFirstUnloggedSet(user: ReturnType<typeof userEvent.setup>) {
  const chips = screen.getAllByRole('button', { name: /Set 1, not logged/i });
  await user.click(chips[0]);
  await user.click(screen.getByText('Log'));
}

describe('Today — set logging error paths', () => {
  it('rolls back the optimistic log and surfaces a retry hint when the save fails', async () => {
    const user = userEvent.setup();
    vi.mocked(getOrCreateTodaySession).mockResolvedValue(fakeSession);
    vi.mocked(logSet).mockRejectedValue(new Error('network down'));

    render(<Today profile={profile} />);
    // Wait for the initial load to settle (a Set 1 chip is present).
    await screen.findAllByRole('button', { name: /Set 1, not logged/i });

    await logFirstUnloggedSet(user);

    // The failed save reverts to an unlogged chip and shows the retry hint.
    expect(
      await screen.findByText(/did not save/i),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole('button', { name: /Set 1, not logged/i }).length,
    ).toBeGreaterThan(0);
  });

  it('dedupes concurrent first taps into a single session creation', async () => {
    const user = userEvent.setup();
    const gate = deferred<Session>();
    vi.mocked(getOrCreateTodaySession).mockReturnValue(gate.promise);
    vi.mocked(logSet).mockImplementation(async (a) =>
      savedLog({ exercise_key: a.exerciseKey, set_number: a.setNumber }),
    );

    render(<Today profile={profile} />);
    await screen.findAllByRole('button', { name: /Set 1, not logged/i });

    // Two logs fired while the session creation is still in flight.
    await logFirstUnloggedSet(user); // ex A, set 1
    await logFirstUnloggedSet(user); // ex B, set 1 (A's is now logged)

    gate.resolve(fakeSession);

    await waitFor(() => expect(logSet).toHaveBeenCalledTimes(2));
    // ...but the session was created exactly once (sessionPromiseRef dedupe).
    expect(getOrCreateTodaySession).toHaveBeenCalledTimes(1);
  });

  it('reverts the floor-mode toggle when persisting it fails', async () => {
    const user = userEvent.setup();
    vi.mocked(getOrCreateTodaySession).mockResolvedValue(fakeSession);
    vi.mocked(logSet).mockImplementation(async (a) =>
      savedLog({ exercise_key: a.exerciseKey, set_number: a.setNumber }),
    );
    vi.mocked(setFloorMode).mockRejectedValue(new Error('offline'));

    render(<Today profile={profile} />);
    await screen.findAllByRole('button', { name: /Set 1, not logged/i });

    // Establish today's session first (floor persists only once a session exists).
    await logFirstUnloggedSet(user);
    await waitFor(() => expect(getOrCreateTodaySession).toHaveBeenCalled());

    const toggle = screen.getByRole('button', { name: /low day/i });
    expect(toggle).toHaveAttribute('aria-pressed', 'false');

    await user.click(toggle);

    // The failed persist reverts the switch and shows a retry hint.
    expect(await screen.findByText(/Could not save floor mode/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /low day/i }),
    ).toHaveAttribute('aria-pressed', 'false');
  });

  it('shows the protein check every morning (before any workout) and persists a tap', async () => {
    const user = userEvent.setup();
    // No today session in history — a brand-new, nothing-logged morning.
    vi.mocked(fetchMyHistory).mockResolvedValue([]);
    vi.mocked(getOrCreateTodaySession).mockResolvedValue({
      ...fakeSession,
      on_date: localDateISO(new Date()),
    });
    vi.mocked(setProteinHit).mockResolvedValue(undefined);

    render(<Today profile={profile} />);

    // Renders independent of completion — present from first paint.
    const toggle = await screen.findByRole('button', {
      name: /had ~30g protein/i,
    });
    await user.click(toggle);

    expect(await screen.findByText(/protein logged/i)).toBeInTheDocument();
    expect(setProteinHit).toHaveBeenCalledWith('s1', true);
  });

  it('logging protein with no workout does not mark the session completed', async () => {
    const user = userEvent.setup();
    vi.mocked(fetchMyHistory).mockResolvedValue([]);
    vi.mocked(getOrCreateTodaySession).mockResolvedValue({
      ...fakeSession,
      on_date: localDateISO(new Date()),
    });
    vi.mocked(setProteinHit).mockResolvedValue(undefined);

    render(<Today profile={profile} />);

    const toggle = await screen.findByRole('button', {
      name: /had ~30g protein/i,
    });
    await user.click(toggle);

    // The protein write lands...
    await waitFor(() => expect(setProteinHit).toHaveBeenCalledWith('s1', true));
    // ...but the session is never completed (no set_logs, completed_at stays null),
    // so a protein-only morning cannot inflate the trained count or crew presence.
    expect(markCompleted).not.toHaveBeenCalled();
  });
});
