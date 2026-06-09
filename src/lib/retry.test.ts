import { describe, it, expect, vi } from 'vitest';
import { retryAsync, defaultShouldRetry } from './retry';

// baseDelayMs: 0 keeps the backoff waits ~instant so tests don't sleep.
const fast = { baseDelayMs: 0 };

describe('retryAsync', () => {
  it('returns the result on the first success (no retry)', async () => {
    const fn = vi.fn().mockResolvedValue('ok');
    await expect(retryAsync(fn, fast)).resolves.toBe('ok');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('retries a transient failure then succeeds', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error('network blip'))
      .mockResolvedValue('ok');
    await expect(retryAsync(fn, fast)).resolves.toBe('ok');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('throws after exhausting maxAttempts', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('still down'));
    await expect(retryAsync(fn, { ...fast, maxAttempts: 3 })).rejects.toThrow(
      'still down',
    );
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('fails fast (no retry) when shouldRetry returns false', async () => {
    const integrity = { code: '23505', message: 'duplicate key' };
    const fn = vi.fn().mockRejectedValue(integrity);
    await expect(retryAsync(fn, fast)).rejects.toBe(integrity);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('defaultShouldRetry', () => {
  it('does NOT retry integrity violations (SQLSTATE class 23)', () => {
    expect(defaultShouldRetry({ code: '23505' })).toBe(false);
    expect(defaultShouldRetry({ code: '23503' })).toBe(false);
  });

  it('does NOT retry auth/validation rejections', () => {
    expect(defaultShouldRetry({ status: 401 })).toBe(false);
    expect(defaultShouldRetry({ status: 403 })).toBe(false);
    expect(defaultShouldRetry({ status: 422 })).toBe(false);
  });

  it('retries network-ish errors and unknown shapes', () => {
    expect(defaultShouldRetry(new Error('fetch failed'))).toBe(true);
    expect(defaultShouldRetry({ status: 503 })).toBe(true);
    expect(defaultShouldRetry(null)).toBe(true);
  });
});
