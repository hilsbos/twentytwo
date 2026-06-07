-- ============================================================================
-- Migration: add the Sunday 'core' day to the sessions.day_type CHECK.
--
-- Sunday is now a regular programmed training day ('core') instead of the old
-- flex/rest day. New sessions write day_type = 'core'; 'flex' must stay allowed
-- so historical rows written before this change continue to satisfy the check.
--
-- Idempotent: safe to re-run on an existing deployment. We drop the existing
-- column CHECK constraint (if present) and re-add it with the expanded value
-- set. The constraint name below is Postgres's default for a column-level CHECK
-- on sessions.day_type.
-- ============================================================================

alter table public.sessions
  drop constraint if exists sessions_day_type_check;

alter table public.sessions
  add constraint sessions_day_type_check
  check (day_type in ('push', 'legs', 'pull', 'flex', 'core'));
