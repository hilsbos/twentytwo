-- ============================================================================
-- Twenty-Two — Supabase schema (idempotent; paste into the SQL editor)
-- Postgres + magic-link auth + RLS. No anon access to anything.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 24),
  created_at timestamptz not null default now()
);

create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  on_date date not null,
  day_type text not null check (day_type in ('push', 'legs', 'pull', 'flex')),
  floor_mode boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  unique (user_id, on_date)
);

create table if not exists public.set_logs (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  exercise_key text not null,
  set_number int not null check (set_number between 1 and 10),
  value int not null check (value between 0 and 1000),
  step_index int not null default 0,
  created_at timestamptz not null default now(),
  unique (session_id, exercise_key, set_number)
);

create table if not exists public.progression (
  user_id uuid not null references public.profiles (id) on delete cascade,
  exercise_key text not null,
  step_index int not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, exercise_key)
);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------

create index if not exists sessions_user_date_idx
  on public.sessions (user_id, on_date desc);
create index if not exists set_logs_user_created_idx
  on public.set_logs (user_id, created_at desc);
create index if not exists set_logs_session_idx
  on public.set_logs (session_id);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.profiles    enable row level security;
alter table public.sessions    enable row level security;
alter table public.set_logs    enable row level security;
alter table public.progression enable row level security;

-- profiles: everyone authenticated may read (names power presence);
--           you may only insert/update your own row.
drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles
  for select to authenticated using (true);

drop policy if exists profiles_insert on public.profiles;
create policy profiles_insert on public.profiles
  for insert to authenticated with check (id = auth.uid());

drop policy if exists profiles_update on public.profiles;
create policy profiles_update on public.profiles
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

-- sessions: readable by all authenticated users (presence is the social feature);
--           writable only by their owner.
drop policy if exists sessions_select on public.sessions;
create policy sessions_select on public.sessions
  for select to authenticated using (true);

drop policy if exists sessions_insert on public.sessions;
create policy sessions_insert on public.sessions
  for insert to authenticated with check (user_id = auth.uid());

drop policy if exists sessions_update on public.sessions;
create policy sessions_update on public.sessions
  for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists sessions_delete on public.sessions;
create policy sessions_delete on public.sessions
  for delete to authenticated using (user_id = auth.uid());

-- set_logs: reps are PRIVATE — owner only. Writes must also point at a session
-- the same user owns (sessions are world-readable for presence, so user_id alone
-- would let a caller attach rows to another user's session_id).
drop policy if exists set_logs_all on public.set_logs;

drop policy if exists set_logs_select on public.set_logs;
create policy set_logs_select on public.set_logs
  for select to authenticated using (user_id = auth.uid());

drop policy if exists set_logs_insert on public.set_logs;
create policy set_logs_insert on public.set_logs
  for insert to authenticated with check (
    user_id = auth.uid()
    and exists (
      select 1 from public.sessions s
      where s.id = set_logs.session_id and s.user_id = auth.uid()
    )
  );

drop policy if exists set_logs_update on public.set_logs;
create policy set_logs_update on public.set_logs
  for update to authenticated
  using (user_id = auth.uid())
  with check (
    user_id = auth.uid()
    and exists (
      select 1 from public.sessions s
      where s.id = set_logs.session_id and s.user_id = auth.uid()
    )
  );

drop policy if exists set_logs_delete on public.set_logs;
create policy set_logs_delete on public.set_logs
  for delete to authenticated using (user_id = auth.uid());

-- progression: owner only, all operations.
drop policy if exists progression_all on public.progression;
create policy progression_all on public.progression
  for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
