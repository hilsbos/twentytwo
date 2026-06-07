# Program View — Proposal

**For:** the app owner, to review and decide.
**Produces no code.** This document picks what gets built next.

The ask: a section that shows the **whole week at once** — how the 7 days fit together, which muscles each day hits, how the sequencing respects recovery, whether the week is effective as a whole, and "some form of simulation." Make visible how everything comes together, **without touching the sacred Today flow** (open → log first set → done).

Everything below is grounded in the actual code: `ROTATION` and `DAYS` in `src/program.ts`, the logic in `src/lib/logic.ts` (`shouldSuggestAdvance`, `consistency7`, `isSessionComplete`), the data layer in `src/lib/db.ts` (`fetchMyHistory`, `fetchProgression`, `fetchFamiliarity`), and the existing CSS in `src/styles.css`.

---

## 1. The idea in one paragraph

Today the app is a perfect *keyhole* — it shows you exactly the one session in front of you and nothing else. That's correct for the ADHD daily flow, but it means the program's intelligence is invisible: the user never sees that the rotation gives every muscle ~72h to recover *while training daily*, never sees that pull/posterior is genuinely thinner than push (the documented gap), never sees their own logged week add up to a covered body. A **Program view** — a zoomed-out section living on the **Week** screen (and one closing moment on Today's completion banner) — answers "is this week well-built, and am I living inside it?" using only facts derivable from the static program structure and the user's own logs. It never injects clutter into the pre-workout flow. It turns the program from a stack of daily cards into a visible machine.

**Privacy invariant (load-bearing).** Every new panel here is **self-only** — it reads `fetchMyHistory` / `fetchProgression` / `fetchFamiliarity` (my data) and never writes to or reads from the presence layer. The friends contract is unchanged: the crew still sees presence + rolling consistency, never reps, sets, volume, or simulation output. On Week, the new PROGRAM section sits **below consistency and above the crew list** (consistency → Program → crew), so the social block keeps its position and none of the new my-data visuals can leak into what friends see.

---

## 2. What we can honestly show

### Derivable today, zero new data (pure `ROTATION` arithmetic — these are facts, not heuristics)

`ROTATION = [push, legs, pull, push, legs, pull, core]` (`program.ts:4`). From the array indices alone:

- **Frequency:** push 2×, legs 2×, pull 2×, core 1× per week.
- **Recovery spacing:** push at idx 0 & 3 = 3 days = **72h apart**; legs idx 1 & 4 = 72h; pull idx 2 & 5 = 72h. Every trained pattern rests 72h — inside the cited 48–72h window. This is the program's core thesis (daily training that still recovers) and it's *exact array math*, no science claim.
- **Weekly working sets per pattern** (main moves only; `main:true`):
  - Push: pushup(3) + pike(3) + triceps(3) = 9/day × 2 = **~18/wk**
  - Legs: squat(3) + glute_bridge(3) + reverse_lunge(3) = 9/day × 2 = **~18/wk** (main-only; the `main:false` `hinge_raises` 2 sets are counted separately as finisher volume, not folded in)
  - Pull: row(3) + band_pull_apart(3) + lat_pulldown(3) = 9/day × 2 = **~18/wk**
  - Core: dead_bug(3) + pallof(3) + side_plank(3) = 9 × 1 = **~9/wk**
  - ⚠️ **Correctness note:** several concept mockups in the source brief say "~6 sets per muscle." That is the per-*exercise-pair* count, not per-*pattern*. The honest per-pattern figure is **~18/18/18/9** (push/legs/pull/core, main moves only). Whatever ships must use this, and must label it **"working sets/week"** (a structural count), never "growth."
  - 🔁 **Two core numbers, on purpose:** C1's bar shows **core ~9** because it counts *main moves per PATTERN* (the three `main:true` core exercises × 1 day). C5's matrix row shows **core ~14** because it counts *per-MUSCLE*, which is a different measurement — it sums every set that loads core across the whole week: Sunday's 3 main core moves (9) + the `v_tuck` finisher (3) + the 0.5× secondary core contributions from `hollow_hold`, `curls_plank`, and `hinge_raises` on other days. Both are derivable; they answer different questions (pattern volume vs muscle volume). Neither figure may appear under the other's label.

### Derivable from the user's own logs (already fetched)

- `fetchMyHistory(35)` (`db.ts:78`) → sessions + set_logs (each with `step_index`), 35-day window.
- `fetchProgression()` (`db.ts:221`) → current `step_index` per exercise.
- `fetchFamiliarity()` (`db.ts:254`) → distinct past sessions at the current step = the **tenure number** the level-up gate reads.
- `consistency7()` (`logic.ts:102`) → rolling 7-day trained-day count.
- `shouldSuggestAdvance()` (`logic.ts:74`) → the real level-up rule: **all sets at `range[1]` AND `sessionsAtStep >= 6`**.

### The one gap that gates the per-muscle concepts

**No exercise→muscle map exists.** `Exercise` (`types.ts:4`) has key/name/sets/unit/range/path/note/main — **no muscle field**, and there is no MUSCLES constant. Any concept that shows per-*muscle* volume needs a new static table authored once (Appendix A). This is legitimate editorial config — the same nature as the `path[]` arrays — **not an invented number**. It must ship with a registry-style test (mirroring `src/illustrations/registry.test.ts`, which already asserts every key has a guide) so an added exercise can't silently blank a muscle row.

### Claims the app will NEVER make (honesty boundary)

- ❌ No "muscle built %", "activation %", "growth %", or any body-composition number.
- ❌ No single false-precise dates ("Archer in 6 weeks"). Projections are **ranges**, framed "at your current pace · an estimate, not a promise."
- ❌ No rep-slope curve-fitting on a beginner over a ≤35-day window (the source brief's "Path-to-Milestone" — **cut**, see §3).
- ❌ The MEV reference (~6–12 weekly sets is the literature floor) is shown as a **research range/zone**, never a personal pass/fail score. Copy says "meets the research floor," not "optimal for you."
- ❌ Per-muscle attribution is labeled **"primary movers,"** never claimed as isolation precision.
- ❌ "Effectiveness" = weekly sets per muscle, frequency, and 48–72h spacing only. Nothing else.

---

## 3. The concepts (survivors)

Each: pitch · mockup (560px / day-colors) · 5s+30s read · data · effort. Effort is S/M/L in workflow terms (code vs art vs new logic+tests).

Day colors throughout: **push = lime `--push`, legs = amber `--legs`, pull = cyan `--pull`, core = violet `--core`** (`styles.css:16–19`).

---

### C1 · The Machine — tappable PROGRAM section inside Week  *(effort: M)*

**Pitch.** One zoomed-out block, collapsed below the existing consistency view on Week, that answers *every* sub-question at once: the rotation, frequency/recovery, weekly working-set volume, and a per-day exercise expand. The single best "how it all fits" answer, and it needs **no muscle map and no new art** — pure `ROTATION` + `DAYS` + sets, plus the `fetchProgression` already loaded for the per-day chips.

**C1 contains the recovery ribbon.** The "THE ROTATION" + "FREQUENCY · RECOVERY" strips at the top of C1 *are* C2's content, integrated. So **RECOMMENDED (which ships C1) already includes the recovery-ribbon visual** — C2 is not a missing piece. C2 exists as a *standalone* card only for the MINIMAL package, where C1 isn't built; the two never ship together.

```
┌──────────────────────────────┐ 560px
│  5 / 7   mornings this week   │   (existing consistency)
│  M T W T F S S  (week-dots)   │
│                               │
│  HOW THE WEEK FITS TOGETHER ▸ │   ← collapsed; tap to expand
│ ───────────────────────────── │
│  THE ROTATION                 │
│  ┌──┬──┬──┬──┬──┬──┬──┐        │
│  │Pu│Le│Pl│Pu│Le│Pl│Co│       │  tinted: lime/amber/cyan/lime/
│  └──┴──┴──┴──┴◯─┴──┴──┘        │         amber/cyan/violet
│   M  T  W  T  F  S  S   ◯=today│  (reuses .day-dot.today ring)
│                               │
│  FREQUENCY · RECOVERY         │
│  Push  2×/wk · 72h apart      │
│  Legs  2×/wk · 72h apart      │
│  Pull  2×/wk · 72h apart      │
│  Core  1×/wk                  │
│                               │
│  WEEKLY WORKING SETS          │
│  Push ████████████  ~18       │
│  Legs ████████████  ~18       │
│  Pull ████████████  ~18       │
│  Core ██████        ~9        │
│                               │
│  Each pattern trained 2×/wk,  │
│  ~3 days apart — the window   │
│  that lets daily work.        │
└──────────────────────────────┘
```

- **5s:** four evenly-spaced patterns, today is ringed, nothing collides.
- **30s:** read the frequency rows and the working-set bars; confirm 72h spacing and that core is the only 1× pattern. Tap a day to expand its exercise list (name · sets×range · current path-step chip, rendered exactly as Today does).
- **Data:** 100% `ROTATION` + `DAYS` + `dayTypeFor` (`logic.ts:17`). Per-day expand uses `fetchProgression` (already in app). No muscle map. No new art.
- **Permanence (by design):** unlike C4's whisper (which *fades* with tenure because it's pushed at you on the banner), C1 is **permanent but collapsed** — opt-in, tap-to-expand, never auto-shown. It doesn't fade, because a pull-to-open reference adds no friction once internalized; it just sits there for when you want it. C1 is also static config, so it **renders with zero logs** (no empty state needed) — only the per-day expand's path-step chips need `fetchProgression`, and absent that they simply show the base variation.
- **Build:** code only. New collapsible section component on Week (same `aria-expanded` pattern as Today's Warmup), one pure `weeklyVolume()` helper, reuse `.ptag`/`.path-step`/`.day-dot` CSS.

---

### C2 · Recovery Ribbon — 48–72h spacing as a timeline  *(effort: S)*

**Pitch.** The smallest possible win that carries the program's whole thesis. A 7-column timeline, one thin lane per pattern, showing each session node and the recovery window flowing to the next. Makes "daily training that still recovers" literally visible. **Zero new data, zero muscle map, zero honesty risk.** Best impact-per-effort in the set; the strongest single-thing-to-build if only one ships.

```
┌──────────────────────────────┐
│  RECOVERY · how the week      │
│  breathes                     │
│        M   T   W   T   F   S  S│
│  PUSH  ●━━━━━━━━●··········    │ lime · 72h
│  LEGS  ···●━━━━━━━━●······     │ amber· 72h
│  PULL  ······●━━━━━━━━●··      │ cyan · 72h
│  CORE  ····················●   │ violet· 1×
│  ──────────────────────────── │
│  every pattern rests ~72h     │
│  between hits                 │
└──────────────────────────────┘
```

- **5s:** four neat, evenly-staggered ribbons.
- **30s:** trace a lane to read the actual rest gap; spot that Sunday core is the lone 1× pattern.
- **Data:** `ROTATION` indices only. The "72h" is arithmetic on array positions. Reuses `.day-dot.trained .pip` recolored to `--day`.
- **Build:** code only, small. **Ships standalone only in MINIMAL** (where C1 isn't built); in RECOMMENDED/FULL it lives inside C1 as the top strip, so it is never a separate card alongside C1.

---

### C3 · Sunday Recap — "the week came together" on core-day completion  *(effort: M)*

**Pitch.** The highest-motivation moment to show the machine working is the instant the week closes — finishing Sunday's core session. Surface a one-screen recap of what the body actually did, from the user's own logs, then vanish until next Sunday. **Zero mid-week footprint; Today's pre-workout flow untouched.**

```
  (Sunday, core session just completed)
┌──────────────────────────────┐
│ ░ DONE — THE WEEK CAME ░░░░░░ │  ← existing DoneBanner,
│ ░ TOGETHER · tap to see ░░░░░ │    Sunday variant
└──────────────────────────────┘
        ↑ tap opens FormSheet ↓
┌──────────────────────────────┐
│ THIS WEEK              ✕      │
│   6 / 7 mornings             │
│  PATTERNS HIT                │
│  Push  ✓ ✓                   │
│  Legs  ✓ ✓                   │
│  Pull  ✓ ·   (one to go)     │
│  Core  ✓                     │
│  72 sets logged              │
│  LEVELED UP                  │
│  › Push-up → Decline         │
│  › Squat → Pause squat       │
│  See you Monday — push day.  │
└──────────────────────────────┘
```

- **5s:** mornings count + a row of pattern checks.
- **30s:** see which pattern was missed (honest, no guilt: "one to go"), total sets, and any level-ups.
- **Data:** 100% from `fetchMyHistory` already loaded in Today. Patterns = group completed sessions by `day_type` this week. Level-ups = compare min vs max `step_index` per `exercise_key` across the week's logs. `consistency7` for the count. **No muscle map.** Reuses `FormSheet` chrome (`styles.css:872`) and `DoneBanner` (`:576`).
- **Floor-mode honesty:** "sets logged" reads `set_logs` directly, so floor days (1 set/main) contribute their real, lower count — no inflation. Pattern checks follow `isSessionComplete`, which treats a floor session as complete-with-1-set, so a floor day **does** earn a ✓. That's defensible (the morning happened), but means "Pull ✓✓" can include floor sessions; the set total below it is what reveals depth, so the two are read together and the recap never overclaims.
- **Build:** code only. Edge case: fresh user with no prior step has no "before" → omit the level-up section.

---

### C4 · Tomorrow whisper — a one-line bridge between days  *(effort: S)*

**Pitch.** The cheapest way to make the rotation feel connected: extend the existing DoneBanner sub-line with what tomorrow trains and why it follows today. Teaches the machine ambiently, one day at a time, then fades with tenure. **A thread, not the picture — best paired with C1/C2, never the sole answer.**

```
  (any day, session just completed — first ~2 weeks)
┌──────────────────────────────┐
│██ DONE — SEE YOU TOMORROW ████│
│  Tomorrow: legs — different   │
│  muscles, so today's press    │
│  recovers. ~30g protein soon. │
└──────────────────────────────┘
  (after ~2 weeks — faded)
│  Tomorrow: legs · ~30g protein│
```

- **5s:** what's next, and the one-phrase reason.
- **30s:** the recovery logic (today's pattern rests while tomorrow's runs) stated honestly, no number to break.
- **Data:** `dayTypeFor(today+1)` from `ROTATION`. Tenure fade reuses history length already in Today. No new data, no new component — extends `DoneBanner.sub`.
- **Build:** code only, small. One templated sentence keyed on whether tomorrow is a different pattern.

---

### C5 · Weekly Coverage Matrix — muscle × day grid  *(effort: M, gated on muscle map)*

**Pitch.** A compact grid (rows = muscle, cols = 7 days) where each cell is a day-colored dot weighted by that day's set-volume for that muscle, with a weekly total on the right edge. In one glance: which muscles are covered, how often, and where the **honest pull/posterior gap** is — the sparse Back/Biceps/Hamstring rows show it by construction.

```
┌──────────────────────────────┐
│  COVERAGE      M T W T F S S /wk│
│  ────────────────────────────  │
│  Chest      ● · · ● · · ·   ~6 │
│  Shoulders  ● · ◐ ● · ◐ ·   ~8 │
│  Triceps    ● · · ● · · ·   ~6 │
│  Quads      · ● · · ● · ·   ~6 │
│  Glutes     · ● · · ● · ·   ~6 │
│  Hamstr     · ◐ · · ◐ · ·   ~4 │
│  Back/Lats  · · ● · · ● ·   ~6 │
│  R.delt     · · ● · · ● ·   ~9 │
│  Biceps     · · ◐ · · ◐ ·   ~4 │
│  Core       ◐ ◐ ◐ ◐ ◐ ◐ ●  ~14│
│  ────────────────────────────  │
│  · primary  ◐ secondary        │
│  cols tinted by day color      │
└──────────────────────────────┘
```

- **5s:** a colored constellation — every row has ≥2 lit dots; core is lit daily; Back/Biceps/Hamstrings visibly dim.
- **30s:** scan a row for spacing (Chest Mon+Thu = 72h) and read the right-edge weekly total.
- **Data:** dot weights = sum of `ex.sets` per muscle per day via the **muscle map (Appendix A)**. Frequency from `ROTATION`. Reuses `.day-dot .pip` (16px) recolored per column. **Requires the muscle map + its test.** Each right-edge total is the fractional sum over the week — e.g. **R.delt ~9** = band_pull_apart primary (1.0×3) + row secondary (0.5×3), ×2 pull days = 6 + 3. (The mockup's "~6" undercounts the row secondary; ship the full fractional figure so no total looks invented — Appendix A is the source of every cell.)
- **Build:** code + new static map + test. The dot fill weights must map to a stated rule (primary = 1.0×sets, secondary = 0.5×sets) shown in the legend, or they look arbitrary. **Note the core row reads ~14 here, not C1's ~9** — this is the per-*muscle* sum (main + finisher primaries + 0.5× secondaries), a different measurement from C1's per-*pattern* main-move count (see §2 reconciliation). The two must never be shown under the same label.
- **Risk:** 10 rows × 7 cols is dense at 320px content width; mitigate by using full 560 phone width with a 2-letter label gutter.

---

### C6 · Week Simulator — project my own progression forward  *(effort: M)*

**Pitch.** The honest answer to "some form of simulation." For each exercise it reads the user's real current step (`fetchProgression`) and tenure (`fetchFamiliarity`), then projects forward by walking the app's **actual** state machine — the `sessionsAtStep >= 6` gate and double-progression — never a fictional curve. Surfaces the earliest defensible advance as a **range**. An optimistic/steady toggle makes the one real assumption (beat-rate) explicit.

```
┌──────────────────────────────┐
│  WEEK SIMULATOR               │
│  where the path takes you     │
│   [ steady ◐ optimistic ]     │
│  PUSH-UP                      │
│  Std ●─ Decline ○─ Archer ○   │  reuses .path / .path-step.now
│  next: Decline · tenure 4/6   │
│  ETA ~2 wks if you cap sets   │
│  PIKE PUSH-UP                 │
│  Feet-up ●─ Deep ○─ Wall ○    │
│  tenure 6/6 ✓ — gate open;    │
│  advance when you hit 10      │
│  ─────────────────────────────│
│  assumes 2 sessions/wk at     │
│  your pace · an estimate,     │
│  not a promise.               │
└──────────────────────────────┘
```

- **5s:** which exercise is closest to leveling up.
- **30s:** read the tenure gate (X/6) and the rep gate per exercise, and *why* each is or isn't being suggested.
- **Data:** `fetchProgression`, `fetchFamiliarity`, `shouldSuggestAdvance`'s `>=6` constant + path length, `consistency7` for cadence. **No muscle map.** Only new code: a pure `projectAdvance(stepIndex, sessionsAtStep, beatRate)`.
- **Build:** code + new pure function + a guard test (`projectAdvance` with sessionsAtStep≥6 + capped sets must agree with `shouldSuggestAdvance === true`).
- **Risk:** "simulation" is the most seductive place to lie — outputs must be ranges, labeled estimates, driven only by the real gate. Graceful empty state for brand-new users ("log a few sessions to see your trajectory").

---

### C7 · Body Map — a 2-pose SVG silhouette that fills across the week  *(effort: L, art + muscle map)*

**Pitch.** The most on-brand, emotionally legible visual: one figure in the established CONVENTIONS.md line language whose ~6 movement regions light up in each pattern's day-color as the user logs sessions. By Sunday a full week shows a fully-lit, mixed-color figure — "machine complete." The strongest extension of the app's SVG identity, and the heaviest.

```
┌──────────────────────────────┐
│  THIS WEEK, HEAD TO TOE       │
│         ___                   │
│        ( o )                  │
│       /|███|\  shoulders lime │  ███ trained 2× (full)
│        |███|   chest  ✓✓      │
│        |▓▓▓|   lats   ▓ cyan  │  ▓▓▓ trained 1× (half)
│        |▒▒▒|   core   ▒ viol  │
│       / |█| \  glutes ✓✓amber │  outline = untrained
│         | |    quads          │
│  Push ✓✓  Pull ▓·  Legs ✓✓    │
│  Core ▒ · Pull once — Sat     │
│  closes it. (tap for details) │
└──────────────────────────────┘
```

- **5s:** "my body got hit this week" — coverage as a picture; a dim region = a missed pattern.
- **30s:** tap a region to see which day/exercises lit it.
- **Data:** coverage state from the user's sessions by `day_type` (already fetched) + a **region→pattern map** (lighter than the full muscle map — just push/pull/legs/core per region). Plus **one new hand-drawn SVG figure** with named region paths.
- **Build:** **art + code + map.** Front/standing anatomy figure is a *deliberate departure* from the side-profile convention (only the lateral band-walk front view exists today, §9) and requires the mandatory **§11 render-verify loop** (scratch HTML → Chrome headless screenshot → Read + look). Highest maintenance: figure + region map kept in sync with `program.ts`.
- **Risk:** a glowing silhouette implies anatomical precision — label regions as **movement patterns** ("push/pull/legs/core"), never precise muscle names or activation %.

---

### Considered and cut (one line each, with the reason)

- **Path-to-Milestone (rep-slope projection)** — **cut.** Naive linear rep-slope on a beginner over a ≤35-day window is the one place the app would manufacture false precision. C6 delivers the same "where does this go" feeling honestly by walking the real `>=6` gate instead of fitting a curve.
- **Stick-Figure Heat-Map (front/back, static volume)** — cut. Redundant: C5 covers the numbers, C7 is the better silhouette. Duplicate art cost for no new information.
- **The Weekly Map (standalone X-ray screen)** — folded into C1. C1 delivers the same content collapsed inside Week without a whole new screen/route.
- **Planned vs Logged / Planned vs last-week delivery** — deferred. Sound and honest, but each adds a panel for a slice C5 + C3 already cover. Future enhancement.
- **What-if coverage toggles (skip Sundays / floor-only)** — deferred. Lowest honesty risk (pure re-summing), but needs C5's bars as context first; a secondary control, not a core "see the week" answer.
- **Pull-bar acquisition preview** — deferred, but **revisit when the CLAUDE.md pull-up module is actually built** — it de-risks that future work by staging the inert config.

---

## 4. Three packages

### MINIMAL — "How the week breathes"
**C2 Recovery Ribbon + C4 Tomorrow whisper.**
- **Sees:** one calm ROTATION-derived ribbon on Week (72h recovery made visible) + a one-line daily bridge on the completion banner.
- **Build:** 2 small code tasks. **No** muscle map, **no** art, **no** new logic+tests beyond trivial helpers, **no** logs required (Ribbon) / logs already loaded (whisper).
- **Does NOT include:** per-muscle coverage, any simulation, any recap.
- **If only one thing ships:** C2 alone. It carries the program's whole thesis for the least surface area.

### RECOMMENDED — "The Machine"  ⭐
**C1 The Machine + C3 Sunday Recap + C4 Tomorrow whisper.**
- **Sees:** the full zoomed-out program (rotation + the recovery-ribbon strip — C2's content, built into C1 — + correct ~18/18/18/9 working-set bars + per-day exercise expand) collapsed below consistency on Week; the emotional "week came together" recap at Sunday completion; the daily thread for free. **The recovery ribbon is present** (it is C1's top strip), so RECOMMENDED is not missing the 72h-spacing visual.
- **Build:** 3 code tasks. **Deliberately avoids the muscle map and new SVG art** — answers fit/recovery/volume/coverage honestly using only `ROTATION` + sets + existing logs. Ships fast, never fakes science. New: `weeklyVolume()` helper, a collapsible Week section, a Sunday DoneBanner variant + FormSheet recap, a banner sub-line.
- **Does NOT include:** per-muscle granularity (the muscle map), forward simulation, the anatomy figure.
- **Best impact-to-risk ratio of the three.** Optional layer: drop **C5 Coverage Matrix** into C1's expanded view — *only* if you commit to the muscle map + `muscles.test.ts` + the correct fractional math.

### FULL VISION — "Living inside the program"
**C1 + C3 + C4 + C5 Coverage Matrix + C6 Week Simulator + C7 Body Map.**
- **Sees:** everything in Recommended, plus per-muscle coverage (Matrix, surfacing the honest pull/posterior gap), a defensible forward simulation grounded in the real `>=6` gate, and the strongest on-brand visual (the silhouette that fills across the week).
- **Build:** Recommended's 3 code tasks **+** the **muscle map + its registry test** (Appendix A) **+** C5/C6 code **+ one render-verified SVG figure** for C7 (the single art task, the §11 loop, the highest maintenance item).
- **Does NOT include:** rep-slope projection (cut), the deferred planned-vs-logged / what-if / pull-bar panels.

---

## 5. Sequencing & simulation specifics (plain-language algorithms)

### Recovery spacing (C1, C2) — exact, no assumptions
Walk `ROTATION`. For each pattern, find its index positions; gap in days = difference × 24h. Push {0,3}→72h, legs {1,4}→72h, pull {2,5}→72h, core {6}→1×/wk only. The "72h" and "2×/wk" labels are arithmetic on the array; if `ROTATION` ever changes, they re-derive automatically. **No uncertainty — these are facts about the config.**

### Weekly working sets (C1, C5) — structural count
For each pattern, sum `ex.sets` over `main:true` exercises in `DAYS[type]`, multiply by that type's count in `ROTATION`. Push/legs/pull = 9×2 = ~18 each; core = 9×1 = ~9. **Stated assumption:** this counts *main* moves; finishers (`main:false` — hollow_hold, hinge_raises, curls_plank, v_tuck) add hamstring/biceps/core volume separately, which is *why those rows are genuinely thin* (an honest signal, not a bug). Labeled "working sets/week," never growth.

### Per-muscle attribution (C5, C7) — editorial, flagged
Each logged or planned set attributes **1.0 to its primary muscle, 0.5 to each secondary**, from the static map (Appendix A). Display values rounded to ~0.5 and prefixed "~". **Stated assumption:** primary/secondary split is an editorial judgment (a push-up also loads core/serratus); labeled "primary movers," never isolation precision. The MEV reference band (~6–12 sets/wk) is shown as a research *zone*, never a per-user score.

### Forward simulation (C6) — walks the real state machine
For each exercise: current `step_index` (`fetchProgression`) + `sessionsAtStep` (`fetchFamiliarity`). A step clears when **both** real gates pass: all sets at `range[1]` AND `sessionsAtStep >= 6`. Time-to-clear = `max(sessions until reps reach range[1] at the assumed beat-rate, sessions until 6 accrue)` ÷ the user's per-muscle cadence. **That cadence is derived, not assumed:** `consistency7` gives trained-*days*/wk (0–7); each pattern occupies a fixed share of `ROTATION` (2 of 7 days for push/legs/pull), so per-muscle sessions/wk = `trainedDays/wk × (patternDaysInRotation / 7)` — e.g. 7 trained days × 2/7 ≈ 2 push sessions/wk. The "~2 sessions/wk" in the mockup is the output of this step, not a hand-wave. **Stated assumptions, surfaced in the UI:** (a) future beat-rate — exposed as the optimistic/steady toggle, not hidden; (b) each future step resets reps to `range[0]` and takes the 6-session tenure floor. **Uncertainty framing:** every output is a **range** ("~2 wks"), every screen carries "an estimate, not a promise," and there is a "too early to project" / "gate open, advance when you hit X" branch instead of extrapolating from noise. It simulates the *program's own logic*, which is fully derivable — never a strength or size number.

### Coverage state (C7) — counts of logged events only
For the rolling 7 days, a region is "trained 2×/1×/0×" by counting distinct `day_type` sessions that drive it. Full opacity at prescribed frequency, half at one, outline-only at zero. **Honest by construction:** floor-mode days that logged fewer sets read lower — that's real, not punitive.

---

## 6. Open decisions for you

1. **Which package?**
   **Recommendation: RECOMMENDED (The Machine + Sunday Recap + Tomorrow whisper).** It answers all of the user's sub-questions honestly with no muscle map and no new art, so it ships fast and carries zero science-faking risk. Add the Coverage Matrix later if per-muscle granularity proves wanted.

2. **Author the exercise→muscle map now, or defer?**
   It gates C5 and C7 (and all the deferred per-muscle panels) — **and the future CLAUDE.md pull-up module touches it too** (adding vertical-pull-from-a-bar means new Back/Lats/Biceps entries in `muscles.ts`, so the map is a shared dependency of both C5 and that backlog work, slightly strengthening the case for authoring it sooner). **Recommendation: defer until you choose to build C5.** It's real editorial work + a second source of truth needing a test. Recommended package doesn't need it; don't pay the cost until a concept requires it. When you do, ship `src/lib/muscles.ts` + `muscles.test.ts` together (Appendix A).

3. **Is the simulation (C6) worth its honesty burden?**
   It's the most literal answer to "some form of simulation," and it's defensible *because* it walks the real `>=6` gate. **Recommendation: yes, but only in Full Vision, and only with the range/toggle/"not a promise" framing and the guard test.** Without those it becomes the place the app lies.

4. **Build the Body Map figure (C7) — the one art + render-verify task?**
   It's the most emotionally legible and most on-brand, but it's the only Large item: new front-view SVG (a deliberate convention departure), the §11 render loop, and the highest ongoing maintenance. **Recommendation: Full Vision only, and only if you have appetite for the art loop. If C5 already shipped, C7 is a want, not a need — the numbers already tell the coverage story.**

5. **Where does the zoomed-out view live — collapsed-on-Week or its own tab?**
   **Recommendation: collapsed section on Week (C1's approach), not a new route.** Keeps Today sacred, reuses the screen that already owns the zoomed-out headspace, and the source brief's standalone "Weekly Map" screen added a route for the same content.

6. **Sunday Recap (C3) — auto-open on completion, or tap-to-open?**
   **Recommendation: tap-to-open from the banner.** Auto-opening a sheet the instant a session completes risks friction at the one moment the user wants the calm "done" feeling. The banner gains "the week came together · tap to see"; if they never tap, nothing is lost.

---

## Appendix A — proposed exercise→muscle map (only needed for C5 / C7)

Static config in a new pure module `src/lib/muscles.ts`, keyed by the exact `exercise.key` values in `program.ts`. **primary = 1.0×sets, secondary = 0.5×sets.** Ships with `muscles.test.ts` asserting every `DAYS[*].exercises[*].key` has an entry (mirrors `src/illustrations/registry.test.ts`).

| key | primary (1.0) | secondary (0.5) |
|---|---|---|
| `pushup` | chest | shoulders, triceps |
| `pike_pushup` | shoulders | triceps, chest |
| `triceps_press` | triceps | — |
| `hollow_hold` | core | — |
| `squat` | quads | glutes |
| `glute_bridge` | glutes | hamstrings |
| `reverse_lunge` | quads | glutes |
| `hinge_raises` | hamstrings | glutes, core |
| `row` | back/lats | biceps, rear delts |
| `band_pull_apart` | rear delts | back/lats |
| `lat_pulldown` | back/lats | biceps |
| `curls_plank` | biceps | core |
| `dead_bug` | core | — |
| `pallof_press` | core | — |
| `side_plank` | core | — |
| `v_tuck_hold` | core | — |

**Note:** hamstrings and biceps volume comes *only* from `main:false` finishers (`hinge_raises` 2 sets, `curls_plank` 3 sets) — so those rows are genuinely the thinnest. That honest signal is the same "pull/posterior is under-served" story CLAUDE.md names, and it falls out of the map for free.
