# Twenty-Two — Morning Calisthenics App

Project context handoff. Read this first to continue work.

## What this is
A personal, phone-first **web app** for the Twenty-Two morning calisthenics
program: a Push / Legs / Pull rotation Mon–Sat plus a programmed Sunday core day,
runnable anywhere (home, hotel, travel) in **22 min/day** — the brand *is* the dose
(TwentyTwo = a 22-minute morning; surface "22 minutes", never "15–20", in all copy).
Goal is general "great shape" — lean and defined, not mass —
alongside a leaner body composition. Starting from zero, so habit-building matters
as much as the program; the product spine is ADHD-first (opens on today's workout,
one-tap logging, no breakable streaks).

The deliverable is the React app. `docs/legacy-reference-card.html` is the
**original Claude.ai artifact** — a historical reference only, not shipped.

## Stack & architecture
- **React 19 + Vite + TypeScript**, static build. No router, no state lib, no CSS
  framework — hand-rolled. Vite `base: './'`; all asset/manifest/icon paths are
  relative so `dist/` can be dropped under any subpath. PWA: installable on
  Android (WebAPK) with zero extra code; iOS gets a dismissible add-to-home-screen
  hint (`InstallHint`, iOS-Safari-only).
- **Supabase** (Postgres + email-code auth + RLS) for accounts, logs, and the
  social layer. Schema is `supabase/schema.sql` (idempotent, full RLS):
  `profiles`, `sessions`, `set_logs`, `progression`. `sessions.day_type` allows
  `push`/`legs`/`pull`/`core`/`flex` — `core` is Sunday's programmed day; `flex`
  is retained only for historical rows and is no longer written.
  `sessions.protein_hit` (boolean) backs the protein tracker. Migrations:
  `2026-06-07_add_sunday_day.sql`, `2026-06-08_add_protein_hit.sql` (both idempotent).
- **Auth is a 6-digit email code**, not a magic link: `signInWithOtp` sends,
  `verifyOtp({ type: 'email' })` verifies in-app (`db.ts`). The Supabase
  **Magic Link email template carries `{{ .Token }}`** (code-only — the link+code
  dual template is an unresolved upstream bug and prefetch-fragile). Magic links
  were abandoned because iOS standalone PWAs have storage isolated from Safari —
  a mailed link signs into Safari, never the installed app.
- Auth email sends via **AWS SES SMTP**: `code@shushu.be`, us-east-1, send-only
  IAM user `twentytwo-ses-smtp`. **Production access pending** at time of
  writing — sandbox mode only delivers to verified addresses.
- **Social layer is presence-only**: friends see each other's session presence and
  rolling consistency, **never reps or numbers**.
- **Deployed at https://shushu.be/twentytwo/** — `./deploy.sh` (scoped IAM
  profile `twentytwo-deploy`). The assets sync deliberately does **not**
  `--delete` old hashed chunks: a stale cached HTML must still find its JS, or
  the app black-screens. Full infra details + rollback: `docs/infra.md`.

### Layout
```
src/
  program.ts        program config (rotation, exercises, progression paths)
  types.ts          shared contracts
  lib/logic.ts      pure, unit-tested logic (dates, targets, consistency, level-up)
  lib/retry.ts      retry-with-backoff wrapper for write paths
  lib/supabase.ts   client init from env
  lib/db.ts         typed data-access wrappers (no UI logic)
  screens/          Auth / Today / Week (+ Auth.test.tsx, Today.test.tsx)
  components/       FormSheet (form guide sheet), InstallHint (iOS A2HS hint)
  illustrations/    per-exercise 2-pose SVGs + CONVENTIONS.md + registry test
  App.tsx           two-screen shell (brand bar + nav) + auth gate + boot watchdog
supabase/           schema.sql + migrations/
scripts/            gen_icons.py, render-grid.tsx
docs/               infra.md, program-view-proposal.md,
                    ultimate-morning-proposal.md, improvements-brainstorm.md,
                    form-guide-review.md, exercise-guide-grid.png,
                    legacy-reference-card.html
deploy.sh           one-command production deploy (see docs/infra.md)
```

## Equipment reality (drove program v2)
- Bodyweight **+ leg loop band (~15–30 lb)** — the load tool (squats, bridges,
  banded RDL, hinge).
- **+ a long flat Theraband (~5–11 lb, light)** — NOT a load tool. Used for
  face-pulls, lat pulldowns, and band triceps work where light tension + range is
  the point. Anchored over the top of a door.
- The old "ONE leg loop band only" constraint is **obsolete** — ignore it.
- Still no pull-up bar. A doorway bar remains the top hardware upgrade (unlocks
  dead hangs → negatives → first pull-up).

## The program (src/program.ts) — current state and why
**All 7 days are real programming.** Mon–Sat rotate Push/Legs/Pull (each muscle
~2×/week with 48–72h recovery); **Sunday is a programmed `core` day** — dead bug,
band anti-rotation (Pallof) press, side plank, + a hollow-rock/V-tuck finisher.
The flex/rest day is gone. Sunday rounds out the week with dedicated trunk work
(anti-extension, anti-rotation, anti-side-bend) the push/legs/pull split only
brushes, and is the deliberately quiet **designated drop day** — so missing it
still leaves 6 of 7 = a full win, and consistency never depends on a perfect 7.

Each session: ~2-min warm-up + 3 main moves (3 sets, stop 1–2 reps short of
failure, 3-sec eccentric) + a core/finisher. Overload order: reps → harder
variation → slower tempo.

Evidence-review changes (v1 → current) and their rationale:
- **Lat pulldown added** (band over the door) — was the single biggest gap: the
  program had zero vertical pull.
- **Chair dips removed → band triceps work** — dips put an untrained user's
  anterior shoulder at risk; band pushdown/overhead extension train triceps without
  that strain.
- **Band walks cut → banded RDL + leg raises** — the hip hinge and hamstrings were
  untrained; RDL loads them, leg raises cover anterior core.
- **Row leads with under-table row** (lie under a sturdy table, chest to edge);
  towel-around-a-door-handle is a travel **fallback** note, not the primary cue.
- **Intermediate progression rungs added** to bridge big jumps: assisted archer
  (push-up), deep pike (pike push-up), B-stance glute bridge.
- **Level-up suggestions are tenure-gated**: only suggested after hitting top of
  range AND `sessionsAtStep >= 6` per step (~3 wks at 2×/wk). Tendon adaptation
  lags muscle by 2–3 months, so we don't push variations on rep performance alone.
  (Logic: `advanceState` / `shouldSuggestAdvance` in `lib/logic.ts`; the gate is
  visible in the UI, not silent.)

This evolution history lives **here only** — user-facing copy is present tense
and never references what the program used to be.

## Nutrition — the single highest-impact fix
Add **~25–30 g complete protein (whey or plant blend)** when the eating window
opens (~8:30am). The morning collagen smoothie is leucine-poor (~0.9 g vs the
~2.5–3 g per-meal leucine threshold for muscle protein synthesis), so collagen
stays only as a **tendon-support add-on**, not the protein source. Daily target
**1.6–2.2 g/kg**. In-app: the completion banner reminds ("~30g protein when the
window opens"), and a **one-tap protein toggle** appears after completion,
persisted to `sessions.protein_hit`.

## App features
- **Auth screen** — email a 6-digit code, numeric input with
  `autoComplete="one-time-code"` (iOS autofills from Mail), auto-submit at 6
  digits, resend with 60s cooldown.
- **Today screen** — opens here. Today's day-type from rotation, warm-up
  (collapsed), exercise cards with one-tap set logging (aria-labeled set chips,
  always-visible Form button), floor mode (with its own done state), level-up
  prompt with the tenure gate shown, finisher required before completion,
  one-line completion banner, protein toggle, and a **Sunday recap sheet**
  ("the week came together") once the core day completes.
- **Week screen** — rolling **7-day consistency** (count out of 7, no breakable
  streak; Sunday is the designated drop day, so 6 of 7 is a full win — the count
  shows a placeholder until data arrives, never a misleading 0), **friends
  presence** (who trained, never reps), and the **Program View (C1 "The
  Machine")**: a collapsed, tap-to-expand section showing the rotation,
  per-pattern frequency and 72h recovery spacing, weekly working-set bars, and
  per-day exercise detail — all derived from `program.ts` at render time
  (`programPatterns` in `lib/logic.ts`). Deferred C-pieces (Week Simulator,
  muscle map) per `docs/program-view-proposal.md`.
- **Form guides** — per-exercise sheets with cues, opened via the always-visible
  Form button on each card; the inline **"learn, then fade"** cue shows while
  `familiarity < 3` distinct past sessions at that step, then fades once the
  move is learned. (`FormSheet`, `fetchFamiliarity`.)
- **Floor mode** — the 10-min "bad day" floor; logs the session as
  `floor_mode = true` so consistency still counts.
- **Resilience** — writes go through `lib/retry.ts` (exponential backoff, full
  jitter) so a logged rep survives flaky hotel wifi; a boot watchdog surfaces a
  reload prompt if the auth fetch hangs instead of leaving a blank screen.
- **Tests** — pure-logic unit tests plus integration tests for the two critical
  screens (`Today.test.tsx`, `Auth.test.tsx`).

## Illustration system
Custom **2-pose animated SVGs**, one file per exercise key in `src/illustrations/`
(default export = `VariationGuide[]` matching that key's `path` order). Two pose
groups `pose-a`/`pose-b` crossfade via CSS. **Lazy-loaded**: `all.ts` is the heavy
registry behind a dynamic `import()`; `index.ts` exports only the eager
`GUIDABLE_KEYS` list, and `registry.test.ts` guards that the two stay in sync.
The spec is `src/illustrations/CONVENTIONS.md` — read it fully before drawing:
fixed canvas (`viewBox 0 0 200 120`), one consistent ~70px side-profile figure,
`currentColor` stroke, joint dots, one dashed movement arrow, 3 external-focus
cues (≤6 words, setup→drive→finish). **Render-verify loop is mandatory**: render
the SVG with headless Chrome, Read the PNG, and confirm the distinguishing
feature is legible before shipping a panel. `pushup.tsx` and `squat.tsx` are the
finished references; `scripts/render-grid.tsx` renders the full grid
(`docs/exercise-guide-grid.png`).

## User preferences (learned)
- **NO day-color left stripe** on exercise cards. Keep the dark athletic theme
  (Oswald + Hanken Grotesk, lime `#C8FA4B` accent on `#0E100D`).
- UI taste: **minimalistic but complete** — quiet brand presence (slim brand
  bar), no dashboards, nothing that adds friction before the first logged set.
- **Completion banner stays one line.** Owner rejected denser copy and explicitly
  rejected the C4 "tomorrow whisper" — do not re-add it anywhere.
- **User-facing copy is present tense only** — never reference what the program
  used to be (history belongs in this doc, not the app). No science-faking:
  never display data the app can't honestly know.
- Wants evidence-backed, specific, ranked recommendations — not generic advice.
- For substantial features/changes, prefers **ultracode multi-agent workflows**
  (design → build → adversarial verify); for brainstorms, a written proposal
  doc to review before any code (see `docs/program-view-proposal.md`,
  `docs/ultimate-morning-proposal.md`).

## Dev commands
```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # tsc typecheck + vite build -> dist/
npm run preview   # serve the production build
npm test          # vitest run (logic unit tests + screen integration tests)
python3 scripts/gen_icons.py   # regenerate PWA icons (stdlib-only)
```
Env: copy `.env.example` → `.env.local`, set `VITE_SUPABASE_URL` and
`VITE_SUPABASE_ANON_KEY` (anon/publishable key only — never `service_role`).

## Backlog / next steps
1. **Ultimate-morning Phase 1** — ready to build: Sunday mobility flow, band
   lateral raises, single-leg calf raises (low-conflict additions). **Phase 2 is
   blocked on two owner decisions**: include impact/hops for bone density, yes
   or no; interval finisher programmed vs a reminder. See
   `docs/ultimate-morning-proposal.md`.
2. **Pull-up progression module** — blocked on the doorway bar purchase
   (dead hangs → negatives → first pull-up).
3. **Nutrition timing layer** — beyond the one-tap protein toggle (timing/amount
   tracking around the fasted window), only if the owner still wants it.
