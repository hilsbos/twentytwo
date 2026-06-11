// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';

// --- mock the data layer (no network in tests) ---
vi.mock('../lib/db', () => ({
  getSession: vi.fn(),
  signInWithMagicLink: vi.fn(),
  verifyEmailCode: vi.fn(),
  signOut: vi.fn(),
  createProfile: vi.fn(),
}));

import Auth from './Auth';
import { getSession, signInWithMagicLink, verifyEmailCode } from '../lib/db';

beforeEach(() => {
  vi.mocked(getSession).mockResolvedValue(null);
  vi.mocked(signInWithMagicLink).mockResolvedValue(undefined);
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

/** Render signed-out, request a code for `email`, and return the code input. */
async function requestCode(
  user: ReturnType<typeof userEvent.setup>,
  email = 'pat@example.com',
) {
  render(<Auth onProfileReady={vi.fn()} />);
  await user.type(await screen.findByLabelText('Email address'), email);
  await user.click(screen.getByRole('button', { name: 'Email me a code' }));
  return screen.findByLabelText('6-digit code');
}

describe('Auth — email-code sign-in', () => {
  it('sends the code on email submit and shows the code step', async () => {
    const user = userEvent.setup();

    await requestCode(user);

    expect(signInWithMagicLink).toHaveBeenCalledWith('pat@example.com');
    expect(screen.getByLabelText('6-digit code')).toBeInTheDocument();
  });

  it('auto-verifies once 6 digits are typed', async () => {
    const user = userEvent.setup();
    vi.mocked(verifyEmailCode).mockResolvedValue(undefined);

    const codeInput = await requestCode(user);
    await user.type(codeInput, '123456');

    await waitFor(() =>
      expect(verifyEmailCode).toHaveBeenCalledWith('pat@example.com', '123456'),
    );
    expect(verifyEmailCode).toHaveBeenCalledTimes(1);
  });

  it('shows the error copy on a failed verify and lets you retype', async () => {
    const user = userEvent.setup();
    vi.mocked(verifyEmailCode)
      .mockRejectedValueOnce(new Error('expired'))
      .mockResolvedValue(undefined);

    const codeInput = await requestCode(user);
    await user.type(codeInput, '111111');

    expect(
      await screen.findByText(
        "That code didn't work — check the latest email or resend.",
      ),
    ).toBeInTheDocument();

    await user.clear(codeInput);
    await user.type(codeInput, '222222');

    await waitFor(() =>
      expect(verifyEmailCode).toHaveBeenLastCalledWith(
        'pat@example.com',
        '222222',
      ),
    );
  });
});
