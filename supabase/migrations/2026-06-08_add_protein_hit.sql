-- ============================================================================
-- Migration: add per-day protein tracking to sessions.
--
-- Body composition ("lean and defined") is set by diet, not sets. The app only
-- reminded; this adds a one-tap daily "had my ~30g protein" flag so the habit is
-- trackable without calorie counting. A boolean per day — no numbers, no streak.
--
-- Additive and idempotent: a new column with a default, safe to re-run.
-- ============================================================================

alter table public.sessions
  add column if not exists protein_hit boolean not null default false;
