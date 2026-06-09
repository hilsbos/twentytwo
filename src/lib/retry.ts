// Small retry-with-backoff wrapper for the write paths. Losing a logged rep to a
// brief signal drop mid-workout is the worst case for this app, so the mutations
// auto-recover from transient failures before surfacing an error to the UI.

export interface RetryOptions {
  /** Total attempts including the first. */
  maxAttempts?: number;
  /** Delay before the 2nd attempt; grows by `factor` each time. */
  baseDelayMs?: number;
  factor?: number;
  /** Upper bound on any single backoff wait. */
  maxDelayMs?: number;
  /** Return false to fail fast (e.g. integrity/auth errors that won't recover). */
  shouldRetry?: (err: unknown) => boolean;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Permanent failures that retrying cannot fix: Postgres integrity violations
 * (SQLSTATE class 23, e.g. unique/foreign-key/check) and auth/RLS rejections.
 * Everything else (network blips, timeouts, 5xx) is treated as transient.
 */
export function defaultShouldRetry(err: unknown): boolean {
  const e = err as { code?: unknown; status?: unknown } | null;
  const code = e && typeof e.code === 'string' ? e.code : '';
  if (code.startsWith('23')) return false; // integrity violation
  const status = e && typeof e.status === 'number' ? e.status : 0;
  if (status === 401 || status === 403 || status === 422) return false;
  return true;
}

export async function retryAsync<T>(
  fn: () => Promise<T>,
  opts: RetryOptions = {},
): Promise<T> {
  const {
    maxAttempts = 3,
    baseDelayMs = 200,
    factor = 2,
    maxDelayMs = 5000,
    shouldRetry = defaultShouldRetry,
  } = opts;

  let attempt = 0;
  for (;;) {
    try {
      return await fn();
    } catch (err) {
      attempt += 1;
      if (attempt >= maxAttempts || !shouldRetry(err)) throw err;
      // Exponential backoff with full jitter, capped.
      const ceiling = Math.min(maxDelayMs, baseDelayMs * factor ** (attempt - 1));
      await sleep(Math.random() * ceiling);
    }
  }
}
