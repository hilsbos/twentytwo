# twentyTwo — Brainstorm: Honest, On-Brand Improvements

The app is shipped and live at shushu.be/twentytwo. The spine is solid: Today opens on the day's session with one-tap logging and optimistic rollback, the rolling-7 consistency metric correctly treats Sunday as the drop day (6/7 = full win), floor mode is wired end-to-end, and the learn-then-fade form guides work. What follows is a set of low-surface, evidence-honest refinements — almost all code-only, no schema changes — that make the program's existing intelligence *visible* without touching the sacred pre-workout flow.

Everything below survived adversarial review. Ranked by honest impact-per-effort, on-brand-ness first.

---

## Top picks

### 1. Floor-mode completion state — confirm "1 round = done" the instant it lands
**What:** When a floor-mode session completes (every `main` exercise has ≥1 set), give the existing FloorToggle a clear success affordance (reuse `--beat`/`--accent`) plus inline text like "Floor mode complete — you're done." No new UI element; the DoneBanner already fires.
**Why:** Floor mode is the app's most ADHD-friendly feature and the stated contract ("1 round = full win"), yet nothing confirms it the moment the last set lands — so users doubt it counts on exactly the days they're most likely to skip. This converts a hidden escape hatch into a believed, valid path.
**Files:** `src/screens/Today.tsx`, `src/styles.css`
**Impact: High · Effort: S · Risk: very low** (only risk is the state being too subtle — use high-contrast `--beat`/`--accent`).
*Note:* the critic folded the standalone "1/3 sets" progress-chip idea into this — the general counter was killed as redundant with the set-chip row; only the floor-mode "you're done" sliver was worth keeping.

### 2. Visible level-up tenure gate — explain *why* the app is holding you back
**What:** When an exercise's reps are maxed (`range[1]`) but tenure isn't met (`sessionsAtStep < 6`), show one quiet line on the card: e.g. "Top of range — level-up opens after a few more sessions at this step." Uses `familiarity` (already in scope) + `range[1]`; add a tiny logic helper alongside `shouldSuggestAdvance`.
**Why:** This is the single biggest motivation gap. `shouldSuggestAdvance` silently requires `sessionsAtStep >= 6`, so a beginner who hits top-of-range for weeks sees *nothing change* and may think the app is broken or that they've plateaued. Surfacing the gate turns an invisible hold into a trust-builder grounded in the documented tendon-lag rationale.
**Files:** `src/screens/Today.tsx`, `src/lib/logic.ts`
**Impact: High · Effort: S · Risk: low** (copy must read as "progressing toward," never "stuck").

### 3. Contextual protein-timing banner — derive the message from when you actually trained
**What:** Give `DoneBanner` the `completedAt` prop it currently lacks and branch the sub-line on the local completion hour: trained pre-breakfast → "~30g protein when the window opens (~8:30)"; trained later → "~30g protein soon (within a couple hours)." Optionally fade the "why" (leucine ~2.5g threshold; collagen is tendon-support, not protein) for the first ~3 sessions, then simplify to "~30g protein soon."
**Why:** The current banner ("~30g protein with your first meal") silently assumes every user trains fasted with an 8:30 window — exactly the unstated assumption the owner dislikes. `completed_at` already exists; this is pure UI logic, no schema change, and it kills three weaker overlapping ideas (separate leucine FormSheet modal, `DAYS[*].focus` hedge copy, CLAUDE.md edits) by merging them into one honest dynamic line.
**Files:** `src/screens/Today.tsx`, `src/styles.css`
**Impact: Medium-High · Effort: S · Risk: low** — but see **Gap: timezone correctness** below; `completed_at` is stored UTC, so convert to local before deriving the hour or it mislabels late-evening/early-morning sessions (the travel/hotel case).

### 4. Retry-with-backoff on db calls — never lose a rep to a 100ms signal drop
**What:** Wrap the supabase helpers in `retryAsync(fn, { maxAttempts: 3, baseDelayMs: 200, backoff: 2, jitter, hardCap: 5s })`. Set logging, floor toggle, level-up, and session creation all auto-recover; errors still roll back after the final failure. ~15 lines, no app-code change.
**Why:** Losing a rep on a brief signal drop mid-workout is the worst case for an ADHD user and directly threatens the core interaction. This is the lighter-weight 80% that the heavier IndexedDB queue should defer to.
**Files:** `src/lib/db.ts`, `src/lib/retry.ts`
**Impact: Medium-High · Effort: S · Risk: low** (jitter + hard cap; test with DevTools throttling).

### 5. Sunday Recap (proposal C3) — "the week came together," tap-to-open
**What:** On Sunday core-session completion, add a "THE WEEK CAME TOGETHER · tap to see" DoneBanner variant that opens a FormSheet: patterns hit this week (✓✓ / ✓ / · ), real sets logged, any level-ups (min→max `step_index` per key). 100% from `fetchMyHistory` already loaded in Today; tap-to-open (not auto) preserves the calm "done" moment.
**Why:** The highest-emotion moment to show the machine working is when the week closes — and it has zero mid-week footprint (fires only Sunday, Today untouched). Floor-mode honesty is already baked in: the set total reveals depth even though a floor day earns a ✓. Self-only data, never touches presence.
**Files:** `src/screens/Today.tsx`, `src/lib/logic.ts`
**Impact: High · Effort: M · Risk: low** — needs the fresh-user empty state ("log a few sessions to see your week close"; see **Gap: cold-start convention**).

### 6. Lazy-load illustrations by day-type — cut the initial bundle
**What:** Split `src/illustrations/index.ts` into per-day entry points (push/legs/pull/core) loaded via dynamic `import()` keyed on `dayType`, behind a Suspense boundary (fallback art already exists). Illustrations are ~54% of source; Today shows only one day's exercises; Week never needs them.
**Why:** The single highest impact-per-line perf win, and on-mission — the ADHD spine is "Today opens fast." Vite already warns about chunk size.
**Files:** `src/illustrations/index.ts`, `src/screens/Today.tsx`, `vite.config.ts`
**Impact: High · Effort: M · Risk: medium** — verify the real bundle delta with a build (don't trust the quoted 537kB→~250kB), confirm `guideFor`/`FormSheet` still resolve, and tune `manualChunks` if needed.

### 7. Integration tests for Today's error paths
**What:** New `src/screens/Today.test.tsx` (Vitest + userEvent, mocked supabase): (a) `handleLog` catches a network error and reverts UI state, (b) `ensureSession` dedupes concurrent taps via `sessionPromiseRef`, (c) floor-toggle rollback on failure.
**Why:** These are the friction-bearing paths, each with one line of currently-untested error handling, and only pure logic is tested today. The owner's "evidence-backed" value applies to reliability: an untested rollback path is probably-broken.
**Files:** `src/screens/Today.test.tsx`, `src/lib/db.test.ts`, `package.json`
**Impact: High · Effort: M · Risk: low** (mocking the supabase client is the right scope; may be brittle if Today refactors).

---

## Worth doing, lower priority

- **Tomorrow whisper (proposal C4):** extend `DoneBanner.sub` with tomorrow's pattern + one-phrase recovery reason, keyed on whether tomorrow differs, **with the tenure fade** (full text ~2 weeks, then just the pattern name). Verify the reason against `ROTATION` exhaustively. Code-only, S.
- **Refine FloorToggle copy** to read as a proactive year-round option ("Low on time or energy? One round of the mains still counts.") — one static copy change, zero new state. (Replaces the rejected fade-in toast.)
- **Visual affirmation on the 6/7 consistency number:** tint the already-rendered count `--accent` at ≥6. No new helper, no new logic — the insight and caption already exist on Week.
- **aria-labels on set chips** ("Set 2, logged 12 reps, target 15") so screen readers surface progress from state, not DOM position. Skip the arrow-key batch-entry scheme (wrong priority for a phone-first app).
- **Bump stepper +/−/Log tap targets to ≥48px** (pure CSS). Treat the narrow-phone two-row reflow as a separate change, only if real one-handed testing on the owner's phone shows the single row is unreachable.
- **Lift the muted gray secondary text** (`.faint`, unit labels) toward AA/AAA. The lime is already very high contrast — don't add a second accent color; fix the grays.
- **Run the §11 render-verify loop on multi-move panels** (`hinge_raises`, `curls_plank`, `v_tuck`) and bump only the labels that are actually illegible — prefer larger `<text>` at spec minimum over opacity-rect backplates that clutter the line language.

---

## Considered & cut (don't re-litigate)

- **Optional Sunday posterior-chain block (toggle in settings):** directly threatens the load-bearing "Sunday is the drop day, miss it and still win 6/7" philosophy, and there is no settings screen — that's friction the app deliberately avoids. **Reframe instead:** if the documented hamstring gap is worth closing, close it *in the program* — promote banded RDL to a `main` move or add a hamstring rung to the legs-day path, making it 2×/wk by construction with zero new UI. A `program.ts` edit, not a feature.
- **Friends' day-type pattern signals (P/L/Pl/C next to crew names):** leaks a friend's schedule/program-state; the presence contract is deliberately thin ("trained today" + rolling count). Leave the friends contract untouched; if any texture is wanted, put it on *my own* row only.
- **Full IndexedDB offline sync queue + `synced_at` schema column:** too heavy for a single-user app and Today already does optimistic-update-with-rollback. Start with retry-with-backoff (Top pick #4); escalate only if real-world testing shows reps still lost across app-close. Don't add the schema column speculatively.
- **Standalone "1/3 sets done" progress chip:** duplicates info already legible from the set-chip row; visual noise against "minimalistic but complete." Surviving sliver folded into floor-mode completion (#1).
- **Fading toast at first-set log:** transient UI at the exact moment the user wants zero friction; toasts are easily missed on mobile. Folded into a static FloorToggle copy change.
- **Second lighter-lime accent for WCAG AAA small text:** premise is overstated (#C8FA4B on #0E100D is well above AA) and dilutes the guarded dark-athletic palette. The grays are the real risk.
- **Coverage Matrix (C5) / Body Map (C7) now:** both gate on authoring `src/lib/muscles.ts` + its registry test (a second source of truth with real editorial/maintenance cost). Keep deferred — see below.

---

## Gaps surfaced (from the critic — fold into the relevant work)

1. **Timezone/midnight correctness is a precondition for any `completed_at`-derived feature.** Sessions key on `localDateISO(new Date())` but `completed_at` is stored UTC (`toISOString()`). Any feature reading it (the protein-timing banner #3, the Sunday recap, a future simulator) must convert back to local, or it mislabels late-evening/early-morning sessions — the exact travel/hotel scenario the app targets. Flag this before shipping #3.
2. **A shared cold-start convention for my-data panels.** C3 and any per-day expand get hit by a brand-new user with near-zero logs. Adopt one rule: any my-data panel with insufficient history shows a calm "log a few sessions to see this" rather than rendering misleading near-empty visuals — protecting the no-science-faking rule at the moment data is thinnest.
3. **First-session-ever onboarding sliver.** Today already opens the warm-up for first-timers, but there's no orientation of the open→log→done contract. One dismissible line at the top on the zero-history case ("Tap a set to log it. One round on a bad day still counts."), gated strictly on `hasPriorSession === false` (already computed). Bridges the habit-formation goal CLAUDE.md weights as heavily as the program; zero friction for returning users.
4. **PWA / Add-to-Home-Screen for habit formation.** The whole spine is a daily cue — an icon on the home screen vs. a forgotten URL is the difference. Nobody verified the manifest `start_url`/`scope` actually yield a clean installable PWA under the `/twentytwo` subpath. Worth verifying the manifest + a quiet, once-dismissible A2HS hint. High-leverage, on-spine, unproposed.
5. **Make the level-up tenure gate visible** — already promoted to Top pick #2.

---

## Suggested next 1–2 things to actually build

**Build first: the "honest-confirmation" S-effort bundle — #1 Floor-mode completion + #2 Visible tenure gate + #3 Contextual protein banner (with the timezone fix).** Three small, code-only, on-brand changes that each close a real trust/motivation gap the app currently has *silently*, with no schema change and no risk to the Today flow. They share the same DoneBanner/card surface, so they're cheap to ship together, and they make the program's existing intelligence visible — the core theme of this whole brainstorm.

**Build second: #5 Sunday Recap (proposal C3, RECOMMENDED package), paired with #4 retry-backoff and the #6 lazy-load.** C3 is the emotional payoff at the week's close with zero mid-week footprint; #4 and #6 harden the daily interaction while you're in the code. Keep the muscle map (C5/C7) deferred and documented in CLAUDE.md until per-muscle granularity is actually wanted — the future pull-up module will touch that map anyway, so author it once, when a concept truly needs it.
