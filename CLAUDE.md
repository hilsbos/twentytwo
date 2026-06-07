# Twenty-Two — Morning Calisthenics App

Project context handoff. Read this first to continue work.

## What this is
A personal, phone-first **web app** for the Twenty-Two morning calisthenics
program: a Push / Legs / Pull rotation Mon–Sat plus a programmed Sunday core day,
runnable anywhere (home, hotel, travel) in 15–20 min/day. Goal is general "great shape" — lean and defined, not mass —
alongside a leaner body composition. Starting from zero, so habit-building matters
as much as the program; the product spine is ADHD-first (opens on today's workout,
one-tap logging, no breakable streaks).

The deliverable is the React app. `twenty-two-morning-calisthenics.html` at the
repo root is the **original Claude.ai artifact** — a HISTORICAL reference only, no
longer maintained or shipped.

## Stack & architecture
- **React 19 + Vite + TypeScript**, static build. No router, no state lib, no CSS
  framework — hand-rolled. Vite `base: './'`; all asset/manifest/icon paths are
  relative so `dist/` can be dropped under any subpath.
- **Supabase** (Postgres + magic-link auth + RLS) for accounts, logs, and the
  social layer. Schema is `supabase/schema.sql` (idempotent, full RLS):
  `profiles`, `sessions`, `set_logs`, `progression`. `sessions.day_type` allows
  `push`/`legs`/`pull`/`core`/`flex` — `core` is Sunday's programmed day; `flex`
  is retained only for historical rows and is no longer written. Migration:
  `supabase/migrations/2026-06-07_add_sunday_day.sql` (idempotent CHECK swap).
- Magic-link redirect uses `location.origin + location.pathname`, so every served
  subpath must be allow-listed in Supabase Auth → Redirect URLs.
- **Social layer is presence-only**: friends see each other's session presence and
  rolling consistency, **never reps or numbers**.
- Deploy target (later): **S3 + CloudFront** under a subpath (e.g. `/twenty-two/`).
  Build, upload `dist/`, and add that exact subpath to Supabase Redirect URLs.

### Layout
```
src/
  program.ts        program config (rotation, exercises, progression paths) — v2
  types.ts          shared contracts
  lib/logic.ts      pure, unit-tested logic (dates, targets, consistency, level-up)
  lib/supabase.ts   client init from env
  lib/db.ts         typed data-access wrappers (no UI logic)
  screens/          Auth / Today / Week
  components/        FormSheet (form guide sheet)
  illustrations/    per-exercise 2-pose SVGs + CONVENTIONS.md + registry test
  App.tsx           two-screen shell + auth gate
supabase/schema.sql, scripts/gen_icons.py, scripts/render-grid.tsx, docs/
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

## Program v2 (in src/program.ts) — what changed and why
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

Changes from v1 and their rationale:
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
  (Logic: `shouldSuggestAdvance` in `lib/logic.ts`.)

## Nutrition — the single highest-impact fix
Add **~25–30 g complete protein (whey or plant blend)** when the eating window
opens (~8:30am). The morning collagen smoothie is leucine-poor (~0.9 g vs the
~2.5–3 g per-meal leucine threshold for muscle protein synthesis), so collagen
stays only as a **tendon-support add-on**, not the protein source. Daily target
**1.6–2.2 g/kg**. The app's completion banner reminds the user ("~30g protein when the window opens").

## App features
- **Auth screen** — magic-link sign-in.
- **Today screen** — opens here. Today's day-type from rotation, warm-up
  (collapsed), exercise cards with one-tap set logging, floor mode, level-up
  prompt (when gated conditions met), completion banner.
- **Week screen** — rolling **7-day consistency** (count out of 7, no breakable
  streak; Sunday is the designated drop day, so 6 of 7 is a full win), plus
  **friends presence** (who trained, never reps).
- **Form guides** — per-exercise sheets with cues, using **"learn, then fade"**:
  the inline cue + form tag show while `familiarity < 3` distinct past sessions at
  that step, then fade out once the move is learned. (`FormSheet`, `fetchFamiliarity`.)
- **Floor mode** — the 10-min "bad day" floor; logs the session as
  `floor_mode = true` so consistency still counts.

## Illustration system
Custom **2-pose animated SVGs**, one file per exercise key in `src/illustrations/`
(default export = `VariationGuide[]` matching that key's `path` order). Two pose
groups `pose-a`/`pose-b` crossfade via CSS. The spec is
`src/illustrations/CONVENTIONS.md` — read it fully before drawing: fixed canvas
(`viewBox 0 0 200 120`), one consistent ~70px side-profile figure, `currentColor`
stroke, joint dots, one dashed movement arrow, 3 external-focus cues (≤6 words,
setup→drive→finish). **Render-verify loop is mandatory**: render the SVG with
headless Chrome, Read the PNG, and confirm the distinguishing feature is legible
before shipping a panel. `pushup.tsx` and `squat.tsx` are the finished references;
`scripts/render-grid.tsx` renders the full grid (`docs/exercise-guide-grid.png`).

## User preferences (learned)
- **NO day-color left stripe** on exercise cards. Keep the dark athletic theme
  (Oswald + Hanken Grotesk, lime `#C8FA4B` accent on `#0E100D`).
- Wants evidence-backed, specific, ranked recommendations — not generic advice.

## Dev commands
```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # tsc typecheck + vite build -> dist/
npm run preview   # serve the production build
npm test          # vitest run (pure-logic unit tests)
python3 scripts/gen_icons.py   # regenerate PWA icons (stdlib-only)
```
Env: copy `.env.example` → `.env.local`, set `VITE_SUPABASE_URL` and
`VITE_SUPABASE_ANON_KEY` (anon/publishable key only — never `service_role`).

## Backlog / next steps
1. **S3 + CloudFront deployment** under the subpath — user will provide setup
   details. Remember to allow-list the subpath in Supabase Redirect URLs.
2. **Pull-up progression module** — slot in once a doorway bar is acquired
   (dead hangs → negatives → first pull-up).
3. **Deeper nutrition layer** — beyond the completion-banner reminder (protein
   timing/tracking around the fasted window).
