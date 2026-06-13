# twentyTwo → Whole-Day Companion: Evolution Proposal

*Prepared for owner review. No code has been written. This document is the decision artifact to approve, amend, or reject before any build.*

---

## 1. Context

### Why this, why now

twentyTwo today is an honest, disciplined calisthenics logger: it opens on the one next workout, logs with a tap, and never nags. It serves one slice of your day — the 22-minute morning movement — and serves it well.

But your stated ideal week is not a workout. It is a **rhythm you inhabit**: a sacred 2.5-hour morning (gratitude, breath, shower, meditation, sometimes the beach, a slow breakfast, then *"how positive do I want this day to be?"*); a compartmentalized workday of deliberate deep-work blocks with pauses *on purpose* between them; an evening that belongs to your wife and is deliberately open-ended; ashtanga Mon/Wed/Sun; the Friday-afternoon weekend boundary; and your own recurring self-check — *"where are we in the week?"*

Against that, the app has two honesty gaps that matter right now:

1. **It misrepresents your week.** On a yoga Monday, the app shows a workout you may skip and a consistency count that knows nothing about the movement you actually did. The number reads low; the next-thing it offers (a push-up) is wrong.
2. **It can't fuel you when you fuel yourself.** The single highest-impact body-composition lever — ~30g protein when the eating window opens — is currently *gated behind finishing the workout*. On the three yoga mornings you can't log it at all, even though that's exactly when it happens.

### The intended outcome

A calm companion that **reflects the rhythm you already live** — not a tracker that asks you to report your life, and emphatically not a dashboard you go to for a score. The North Star is the persona's own anti-goal, stated in his meditation: **"not another thing to tick off."** Every decision below is measured against whether it makes the day feel more *inhabited* or more *itemized*.

---

## 2. The strategic question: expand, stay, or rename?

**Recommendation: EXPAND — carefully, incrementally, and without renaming — keeping the 22-minute workout as the unconditional core.**

Three options were on the table:

- **Stay a workout app.** Rejected: it leaves the two honesty gaps above unfixed and ignores a real, specific persona need (the week is bigger than lifting).
- **Rename / reposition to a whole-day OS.** **Rejected, and this is a firm line.** Renaming before a single new feature has shipped and been *lived with* is dishonest — it promises an identity the product hasn't earned. The brand "TwentyTwo = the 22-minute morning dose" is a real asset; you do not trade a proven identity for an aspirational one on spec.
- **Expand the existing app, workout-first, one honest row at a time.** **Chosen.**

### How the 22-minute brand survives

The brand survives by **remaining the unconditional primary action.** This is the bright red line, stated precisely:

> twentyTwo stops being twentyTwo the moment (a) opening the app no longer reliably shows the workout as the primary action, or (b) any surface answers a question you did not come to ask.

Concretely, that means **rejecting the most seductive idea in the entire design exploration**: the "hour-gated Today spine" that would show a *different* primary action at 6am / 2pm / 9pm. That mechanism was pitched as the thing that *prevents* a dashboard. It is the opposite: an app whose primary content rearranges itself five times a day is a context-switching launcher — a dashboard that hides. **Today always opens on the workout.** New rituals may appear as *quiet secondary rows* (a morning-ritual line above; a protein toggle below), but they may never hide or demote the workout, and the app never opens on "it's 2pm, start a focus block."

The 22 minutes stays the only thing the app *coaches*. Everything else is a quiet presence mark or a calendar-derived reflection — never a programmed, rep-tracked, coached surface.

---

## 3. Architecture decision

### Data model: hybrid, not generalization

**Keep `sessions` exactly as the calisthenics rep-engine it is. Add exactly ONE generalized daily-mark table. Keep free text and focus-blocks separate.** Three tables total, two of them already exist untouched.

**Why not generalize `sessions`:** it carries the `day_type` CHECK constraint (drives ROTATION, programPatterns, weekRecap, the level-up tenure gate), it is `unique(user_id, on_date)` (exactly one row per day — so it physically cannot hold "yoga AND calisthenics on the same Monday"), it owns the `set_logs` FK and `progression`, and it is **world-readable** (`sessions_select using(true)`) for the presence layer. Each of those is load-bearing for the workout engine and hostile to generalization. Adding a free-text column to a world-readable table would leak it to every authenticated user — guarded only by query discipline that *will* eventually slip.

**Why not five tables:** the domain analyses each independently invented near-identical tables (`morning_rituals`, `movement_logs`, `ritual_logs`, a `day_closed` column, an `intention` column). They share one shape and one privacy question. Five tables = five migrations, five wrapper pairs, five RLS reviews, five chances to leak. One table is the DRY, honest version and matches the codebase's existing enum-widening discipline (`2026-06-07_add_sunday_day.sql`).

```
TABLE 1  sessions / set_logs / progression   — UNCHANGED. The rep engine.
TABLE 2  life_events (NEW)                    — one row per (user_id, on_date, kind);
         kind ∈ {morning, yoga, beach, day_close} (append-only CHECK).
         Holds NO text → presence-safe BY CONSTRUCTION.
TABLE 3  focus_blocks (NEW, deferred)         — the ONE non-daily-binary grain
         (intra-day intervals); owner-only.
TABLE 4  daily_notes (NEW, deferred)          — owner-only free text (gratitude/intention);
         RLS forbids any authenticated-true read. Mirrors set_logs privacy.
```

`life_events` RLS mirrors `sessions`: `select to authenticated using(true)` (presence), `insert/delete` owner-only (`user_id = auth.uid()`), **no update** — a mark is create-or-delete, like the protein toggle on its own row. Because the table holds **no text columns**, presence-safety is structural, not a discipline we have to remember in every query.

**The consistency refactor:** `consistency7(sessions, todayISO)` becomes `consistencyWindow(dates: string[], todayISO)`. It is already internally just `new Set(on_date)` counting, so this is a near-zero-risk pure refactor. Each kind then gets its **own independent** streak-free 6-of-7 count. **Hard rule: never sum kinds into a combined number** — a combined "life-completion" count is exactly the breakable mega-streak the product forbids.

### Information architecture: two tabs, forever

`App.tsx` Screen union stays `'today' | 'week'`. No router (the no-router constraint holds trivially). Every domain in this proposal slots into one of these two surfaces or a modal launched from a row.

- **Today** = the single next intentional action. It opens on the workout, unconditionally. New rituals are *quiet secondary rows*, never a competing primary action, never an hour-gated content swap.
- **Week** = the zoomed-out rhythm mirror. Read-only. It is *allowed* to be denser because it is the tab you go to deliberately to answer "where are we in the week?" — not the one you open on.
- **The only third surface is a MODAL** — the meditation timer, launched *from* the morning-ritual row, reusing FormSheet's bottom-sheet shell. A timer is an enter-and-leave place, which is exactly what a modal is. A meditation *tab* would be a dashboard tile.

This keeps the app a companion (shows you the one next thing) rather than a dashboard (a place you go to see status).

---

## 4. Domain-by-domain spec

Each domain is rated against its job-to-be-done, what it reuses, and an effort estimate. Verdicts fold in the identity-guardian, feature-creep, and feasibility lenses. **Tier S** = ship now; **A** = strong fast-follow; **B** = proposal/copy-gated; **C** = cut or hard-defer.

### [S] Nourishment — ungate the protein toggle
- **Job:** "Did I fuel myself first, before the world got a vote?" — on every morning, including the three yoga days when no workout completes.
- **Reuses:** `ProteinCheck` (`Today.tsx:427`), `toggleProtein` (`Today.tsx:212`, already lazily creates the day row via `ensureSession`), `setProteinHit` (`db.ts:236`), `sessions.protein_hit`. Zero new code beyond moving one render condition.
- **Change:** Remove the `{completedAt && …}` guard around `ProteinCheck` (`Today.tsx:340`) so it renders independent of workout completion. Render it as one quiet optional row, present-tense, never a red "incomplete" state. Keep the existing copy verbatim: *"Had ~30g protein?"* / *"Protein logged."*
- **Schema:** None.
- **Effort:** **S.** The single most-justified change in the whole proposal — already-shipped UI freed from a wrong gate.
- **v1 slice:** Ship first, alone.
- **Verdict:** Unanimous KEEP. **Hard cap: this is the only nutrition toggle.** No hydration boolean — two side-by-side morning toggles is the first step toward the checklist the meditation job forbids, and water is not the load-bearing lever protein is.

### [S] The week as rhythm — `rhythm.ts` + Week-position line + yoga/weekend markers
- **Job:** Answer your literal self-check — *"where are we in the week?"* — the instant the Week tab opens, including whether today is a yoga day and whether the weekend has begun.
- **Reuses:** The existing Week consistency prose slot (`Week.tsx:163–169`); the rotation strip + `DAY_CLASS` + `--day`/`is-*` machinery (`Week.tsx`, `styles.css`); `rotationIndex`/`localDateISO` (`logic.ts`).
- **New:** `src/rhythm.ts` — static client config: yoga = Mon/Wed/Sun, weekend starts Fri 14:30 local. One pure `weekPosition(todayISO, count)` function. A faint `is-weekend` background band + a quiet yoga glyph on the rotation strip (using a dedicated background, **not** the `--day` variable, to avoid a fifth day-color).
- **Schema:** None. Pure functions of the calendar.
- **Effort:** **S.**
- **v1 slice:** Ship the **week-position line** (the always-visible answer). The yoga/weekend strip glyphs live inside the *collapsed* Program section, so they don't answer the self-check on open — ship them as a trim within this phase or defer; the line alone is the value.
- **Verdict:** KEEP, **copy-gated.** The plumbing is honest and zero-risk. But the strings ("Friday — the week is yours now") edge toward coaching voice — **write the exact strings into a one-paragraph proposal for your sign-off before merge.** The function can land behind unapproved copy.
- **Honesty boundary (sharpest in the whole proposal):** The rolling-7 count stays **calisthenics-only** in this phase. The *line* may name today as a yoga day (the calendar is honestly knowable); the *count* must not absorb yoga (there is no yoga *data* yet — inflating the count from a static schedule is science-faking). The persona's self-check is also richer than a tally — *"Monday 6pm, work closed, day done well"* is a felt statement of position (week + day + judgment). The line should state **position**, the count answers **"is my rhythm holding."** They are two different needs; the line is the under-built one — favor it.

### [A] The morning ritual + meditation timer
- **Job:** "Before the world gets a vote, I take care of myself first" — a calm 30-minute sit and a quiet acknowledgment, never a checklist item.
- **Reuses:** `life_events` (kind `morning`); the protein-toggle interaction pattern; FormSheet's modal shell for the timer; the `is-morning {--day: var(--core)}` violet calm register.
- **New:** A single quiet **"Morning ritual"** row at the *top* of Today (morning hours only) that launches a full-screen **meditation timer modal**. One foreground timer primitive `lib/timer.ts` driven by **wall-clock delta** (`Date.now() − started_at`, recomputed on tick *and* `visibilitychange` — never an accumulating `setInterval`, which drifts badly over 30 min when backgrounded). Web Audio chime unlocked on the Start tap; Screen Wake Lock during the sit (fail silent); `navigator.vibrate` as Android-only progressive enhancement. Timer stamps `life_events('morning').completed_at` on finish.
- **Schema:** `life_events` with kind `morning` (see Phase 2 below).
- **Effort:** **M** (the timer is the bulk).
- **v1 slice:** Not v1. Ships as the increment *after* the data foundation, behind your preferred ultracode design→build→verify workflow. The ritual row can ship mark-only first and gain the timer as a fast-follow.
- **Verdict:** KEEP with eyes open. The modal is the correct shape and the timer is honestly feasible. **But this is the feature that most visibly widens the identity toward "wellness app."** The morning row is a second "first thing" competing with the workout for the opens-on-one-thing slot — acceptable *only* as one quiet line that does not push the workout below the fold.
- **Honest constraint, stated in-app:** **No background bell.** iOS standalone PWAs cannot reliably fire it, and a scheduled "time to meditate" nudge is the rejected tomorrow-whisper by another name. The chime rings only while the app is foregrounded — say exactly that.
- **The morning must stay ONE weighty moment, not a stack of taps.** The biggest risk here is the morning window filling with ritual-row + workout + protein + (later) intention, which *is* the checklist the meditation job names as the anti-goal. Nourishment/intention fold into the calm post-ritual surface as passive acknowledgments — never co-equal rows competing for the morning slot.

### [A] Movement as a whole — yoga + beach marks
- **Job:** "Where am I in the week, movement-wise?" — the week honestly counts all movement, not just lifting.
- **Reuses:** `life_events` (CHECK widen to `yoga`, `beach`); `consistencyWindow`; `rhythm.ts`.
- **New:** On a yoga day, the Today movement slot **collapses to a one-tap "Ashtanga today" mark** with calisthenics shown explicitly *optional* below (do not render a full workout AND tell the user to ignore it — that is the most ADHD-hostile possible framing). Beach is a one-tap mark, any day. Week's rolling-7 becomes movement-honest via `consistencyWindow` (each kind counted **independently**, never summed).
- **Schema:** Append-only CHECK widen on `life_events`.
- **Effort:** **S each** (pure reuse of the morning-phase wrappers + the rhythm/consistency refactor).
- **v1 slice:** Not v1. Phase 1 already delivers yoga *awareness* on Week (markers + line) with zero data; logging yoga is additive and low-risk later. Defer until the morning ritual is lived-in.
- **Verdict:** KEEP, deferred. **Two framing corrections:** (1) **Beach is not movement** — it is sunlight-as-medicine on the nourishment axis ("medicine taken"), so frame it in the calm register, not as a workout-equivalent that the movement count treats like a yoga practice. (2) **Draw the consistency line at MOVEMENT** (calisthenics/yoga/beach). Do *not* let the rolling-7 ever absorb non-movement rituals (the morning sit, deep work) — that is where "did I move" silently becomes a life-completion score.
- **Decision gate:** `life_events.select` is world-readable, so yoga/beach marks **will** show to the crew unless filtered. Confirm you want friends to see "did yoga," or those kinds need an owner-only carve-out (which breaks the presence-safe-by-construction simplicity — flagged).

### [B] The tone-setting question + gratitude (free text)
- **Job:** "I set the tone with one question." The verb is **ASK**, not journal.
- **Reuses:** `daily_notes` (owner-only); the morning calm surface.
- **New:** This was originally specced as an `intention` text field (capture-only, display-only). **That misses the point.** Build the **question** — a single present-tense prompt on the morning surface (*"How positive do I want today to be?"*) with an optional one-line answer — not a notes field. The stored text is incidental; the ask is the feature. One-line input with a hard character cap so it physically cannot become a journal.
- **Schema:** `daily_notes(user_id, on_date, slot ∈ {gratitude, intention}, body, …)`, **owner-only RLS, no authenticated-true select.** Free text *physically cannot* reach the presence layer — this mirrors the `set_logs` privacy boundary and is the only safe home for it.
- **Effort:** **M** (new table + two text-capture interactions + a lock test asserting no world-readable table ever selects a text column).
- **v1 slice:** Not v1. **Hard copy gate** — this is a new interaction class (zero free text exists today) and the exact prompt/placeholder strings are precisely what you'll want to wordsmith. Ship only after a written proposal of the strings.
- **Verdict:** KEEP eventually, **reworked** from "intention field" to "the morning question," and **not on the Today workout screen** (free text above the first logged set is friction + journal creep). It lives on the morning calm surface.

### [B] End-of-day reflection / completion-time stat
- **Job:** "How did I do?" — answered without a dashboard or a daily-summary surface.
- **Reuses:** `completionHourLocal` (`logic.ts:188`), `weekRecap`, the existing Sunday `RecapSheet`.
- **New:** One line in the *existing* Sunday RecapSheet: typical training hour (*"~6:40am most mornings"*), computed from the mean of `completionHourLocal()` values, **hidden below 3 sessions** (never a misleading single-point claim). Add `typicalHour?: number | null` to the `WeekRecap` interface, computed in the same in-window loop.
- **Schema:** None.
- **Effort:** **S.**
- **v1 slice:** Fast-follow, not v1. Adds words to a surface you've told us to keep quiet.
- **Verdict:** KEEP the recap-time line. **CUT the "On track" word-line on the Week count.** A positive-only badge that *vanishes* below 6/7 is a breakable signal by absence — the user learns its disappearance means "behind," which is the streak-guilt the spine forbids. The existing lime-at-6 + "6 in a week is a full win" caption already says this, more calmly.

### [C] Day-close evening toggle — **CUT**
- **Job (as specced):** A one-tap "day closed" mark in evening hours.
- **Why cut:** It solves a job you already do *without* the app, and it puts a tap **inside the exact window you reserve for being phone-down with your wife** — the app intruding on the one block that should be un-tracked. It also depends on hour-gating Today (the rejected mechanism). The relationship and the close are better served by leaving them deliberately unmeasured — the same way reps stay private. **Some things should not be a mark; the evening is the clearest one.**
- **Verdict:** Drop from the roadmap unless you explicitly ask, and even then proposal-first and gated out of the open-ended evening.

### [C] Focus blocks (deep-work logger + tiers) — **CUT from twentyTwo**
- **Job:** Compartmentalized deep-work blocks, three descending-energy tiers (lead/second/side), step away on purpose between them.
- **Why cut:** This is the clearest "different product" in the set — a productivity/time-tracker bolted onto a calisthenics app, sharing no movement identity. The interaction design (one-tap, no timer, no project names, neutral empty dots) is genuinely brand-faithful, and the data spine (`focus_blocks` as the one non-daily-binary grain) is correct — **but small-and-on-the-wrong-product is still wrong-product.** The persona masters time by stepping *away* from tools; a block-logger is the single capability most likely to make the app feel like the productivity dashboard you explicitly don't want.
- **The missed nuance, for the record:** even if built, the spec flattened the tiers into a pickable menu when your day is a *sequenced descending arc* (heaviest first, lightest last). The transition *between* blocks — the deliberate pause you're proud of mastering — was modeled as dead air, when it's the actual verb of your workday.
- **Verdict:** If you want this, it is a **separate sibling app** that reuses the code spine (the one-tap pattern, `consistencyWindow`, the retry/upsert wrappers transfer cleanly). Do not bolt a tab onto twentyTwo. Hard-defer behind explicit demand.

### [C] Wife-as-crew (`profiles.partner_id`) — **DEFER**
- **Job:** A quiet shared signal that you're both taking care of yourselves.
- **Why defer:** The honest, in-taste expression is real — she appears as an ordinary presence-only crew row (no reps, no numbers, no new screen). But it delivers **nothing until a second real account is actively training**, and auth is still SES-sandbox. Building partner-pinning before there's a partner *account* is speculative.
- **Two corrections if it ever ships:** (1) **Don't pin/label her above the count** — a named, prioritized observer turns the streak-free 6-of-7 into relationship pressure on a low week; ship her as an ordinary row. (2) **Be honest that presence is globally visible** — the crew filter is "everyone except me" with no friendship gate, so her presence is visible to *all* authenticated users; a friendship/circle filter is arguably a privacy prerequisite for a spouse dimension, not a clean defer.
- **Verdict:** Revisit when a real second relationship exists in the data.

### [C] Deferred polish (a class, not individual builds)
Breath-pacer animation, mood/energy scales, gratitude history, interval bells, friendship filter, close-of-day banner copy, breakfast/coffee copy line, between-sets rest-cue line. Individually several are harmless (the rest-cue line is genuinely tiny and zero-schema); as a *class* they are polish that arrives only after the spine proves itself. The rest-cue line, if ever built, is presentational text reusing the existing inline-cue slot (a card-level line shown when ≥1 but not all sets of a main move are logged — there is no between-chips slot), with a hard "this is a setter, no countdown" guard.

---

## 5. Design language: one system, two registers

**Do not introduce a second theme.** Stay inside the one token system in `styles.css` (`--bg #0e100d`, Oswald + Hanken Grotesk, lime `--accent #c8fa4b`, the day hues, the surface/line scale). The athletic identity rides on three levers — **lime as reward, Oswald uppercase as the "do this" voice, fast spring motion.** Calm moments differ by **subtracting** from those three, not by adding colors or fonts. This yields two registers — **"drive"** (training) and **"settle"** (ritual) — distinguished by restraint, mirroring your own contrast between the energized workday and the sacred unhurried morning.

1. **Color.** Reserve lime for "a beat was earned." Calm surfaces (meditation, gratitude, morning ritual) never take a full lime fill — that reads as "you scored," wrong for a 30-min sit. Add one helper: `is-morning { --day: var(--core) }` reusing the existing violet `--core (#c9a0f0)` as the "ritual/inward" hue, so calm screens read unmistakably as *not a training screen* while staying in-palette. Optionally one semantic alias `--calm: var(--core)` so calm references intent, retunable in one place. A genuine calm completion (timer done) uses the `.set-chip.met` treatment (14% tint + thin outline), never `.set-chip.beat` (full fill).
2. **Typography.** Training = Oswald-led. Calm = Hanken-led, with Oswald shrunk to the existing `.form-sheet-kicker` (11px, 0.16em, `--faint`) for brand continuity. Never set a meditation/gratitude prompt in Oswald uppercase — all-caps imperative is the opposite of "before the world gets a vote." The timer numerals are the lone Oswald exception: large, still, centered, calm weight, no uppercase tension.
3. **Motion.** Calm surfaces reuse the existing `fadeIn` (0.18s) / `sheetUp` (0.28s) for entrance. **No pop/glow/pulse on calm confirmations** — cross-fade the state instead. A future breath-pacer is the only justified slow custom animation (~4s ease-in-out, consistent with the existing 4.2s pose crossfade) and must add a `prefers-reduced-motion` fallback like the pose crossfade already has.

**The canary to watch:** the violet calm register makes the app visibly bi-modal. That's good for taste — but if the violet/calm surface area ever rivals the lime/training surface area, the repositioning has *already happened in fact*, even if nothing was renamed.

Net new design surface: **one helper class, one optional alias, one editorial rule.** Every calm feature composes from existing primitives.

---

## 6. Timers, offline, notifications — the honest approach

**Ship foreground-only timers. Never promise a background buzz.** Confirmed in-repo: no service worker, no Notification API, no SW registration. The persona is *present* with the timer (sitting in meditation) — he is not asking to be pulled out of life by an alert. Foreground timing is the correct fit, not a compromise.

- **The one technical must:** drive the clock from a **wall-clock delta** (`Date.now() − started_at`, recomputed on tick *and* `visibilitychange`), never an accumulating `setInterval` (it freezes/throttles when backgrounded and drifts badly over 30 minutes). Store `started_at` so a reopened timer resumes at the honest elapsed time. Stamp `completed_at` with `toISOString()` (UTC) to stay compatible with `completionHourLocal`. Build the primitive once (`lib/timer.ts`), reuse for any timed surface.
- **Completion feedback:** Web Audio chime (AudioContext unlocked on the Start tap) + `navigator.vibrate` as Android-only progressive enhancement (iOS Safari has no Vibration API — treat as absent). Screen Wake Lock during an active sit (iOS 16.4+ / Android, fail silent where unsupported). The honest UX: *"the bell rings when you finish, while the app is open."*

**What NOT to promise — a hard NO in every phase:**
- No background reminders, scheduled nudges, or local notifications of any kind. Unreliable on iOS standalone PWAs *and* a direct violation of the rejected tomorrow-whisper / no-nag / streak-free taste. A 6am "time to meditate" push is the C4 whisper by another name. Any reminder mechanism is an automatic spec failure.
- No `rest_seconds` / `inter_set_timing` / `breath_count` / sleep / mood / energy / minutes / calorie columns — data the app cannot honestly know.

**Service worker:** optional, decoupled, and **not needed for any timer.** Adopt only if offline-shell caching is wanted for flaky hotel wifi (a separate benefit complementing `lib/retry.ts`), via `vite-plugin-pwa`, **cache-only**, honoring the deliberate no-`--delete` hashed-chunk deploy rule. A SW does not unlock background timers or iOS push — never adopt it for that reason, and never add Web Push.

---

## 7. Identity guardrails — the lines this must never cross

These are hard limits. Crossing any one means the app has stopped being twentyTwo.

1. **The workout is the unconditional primary action.** Today opens on it, every day. New rituals are quiet secondary rows; they never hide or demote it. **The hour-gated "Today spine" that swaps the primary action by time of day is rejected** — it is the dashboard-launcher in disguise, the single line not to cross.
2. **Two tabs forever** (`'today' | 'week'`). No third tab for anything — not meditation, not focus, not nourishment. The only third surface is the meditation timer as a modal launched from a row.
3. **Streak-free, per-kind, never summed.** Each kind gets its own independent 6-of-7 count. A combined count is a breakable mega-streak. The consistency count never absorbs non-movement rituals — the line is drawn at MOVEMENT.
4. **Presence is column-thin by construction.** Any world-readable table (`life_events`) holds no free text. Free text lives only in owner-only tables (`daily_notes`). Locked with a test asserting no text column is ever selected from a world-readable query.
5. **No background reminders, nudges, or notifications — ever, in any feature.**
6. **Present-tense, one-line copy.** The completion banner stays one line. No tomorrow-whisper. No daily-summary surface. No new user-facing copy ships without exact-string sign-off.
7. **The morning is one weighty moment, not a stack of taps.** Bias hard toward fewer, sequenced, inhabited moments and against tiling every persona sentence into its own toggle. When in doubt between "capture it with a tap" and "leave it un-tracked and trust him," **leave it un-tracked.** The app reflects the rhythm you live; it does not ask you to report it.

**Explicitly cut from v1 (and mostly from the roadmap):** focus blocks, the day-close toggle, the hydration boolean, wife-as-crew, free-text intention/gratitude, the week-recap-on-Week-tab, the "On track" badge, and every deferred-polish item in §4's last entry.

---

## 8. Phased roadmap

Ordered by dependency and risk. Each phase ships independently and is reversible. The spine: ship the two zero-schema pieces first, then lay the ONE shared data foundation, then grow Today's quiet rows on top of it.

**Phase 0 — ship this week (zero schema, no copy gate)**
- (a) **Ungate the protein toggle.** Effort S. The keystone — and the proof that Today can carry a non-workout action.
- (b) **Week-position line** (+ optional Sunday recap-time stat). Effort S, pure functions. **Copy-gated:** exact strings to you for sign-off; plumbing lands behind them.
- *Blocks:* nothing structurally; de-risks the whole premise.

**Phase 1 — the foundation (no Postgres)**
- `src/rhythm.ts` static config (yoga Mon/Wed/Sun, weekend Fri 14:30) → yoga/weekend markers on the existing Week strip. Effort S.
- `consistency7` → `consistencyWindow(dates, todayISO)` pure refactor. Effort S.
- *Blocks:* every later kind-count. **Must land before any `life_events` count** or you ship two parallel counters. **Decision gate:** confirm yoga days and the Friday boundary are correct/stable before hardcoding.

**Phase 2 — the one new table + morning ritual + timer** *(your ultracode workflow)*
- `life_events` table, kind `morning` only; RLS mirrors `sessions`; idempotent migration. Effort M.
- `db` wrappers (`markLifeEvent`/`clearLifeEvent`/`fetchLifeEvents`) cloned from `setProteinHit` + `retryAsync`.
- One quiet morning-ritual row (top of Today, morning hours, violet calm register).
- Meditation timer modal + `lib/timer.ts` (wall-clock delta). Effort M (timer is the bulk).
- *Blocks:* the entire whole-day model — Phases 3–4 are just CHECK widens on this table. **Decision gate:** meditation default duration (30 min); does the timer ship with the row or as a fast-follow (the row can ship mark-only first)?

**Phase 3 — cheap kind-widens** *(append-only CHECK)*
- Add `yoga`, `beach` kinds; yoga-day movement-slot collapse; movement-honest Week count (independent per kind). Effort S each.
- *Blocks:* nothing. **Decision gate:** should yoga/beach marks be crew-visible (they will be, given world-readable RLS), or owner-only?

**Phase 4 — evening bookend** *(reconsider entirely — see §4)*
- The day-close mark is **recommended for cut.** If pursued, it is a `life_events` kind (never a `sessions.day_closed` column), evening-gated, copy-first — and must respect the veto on any wind-down/reflection text.

**Phase 5 — owner-private free text** *(copy-gated, proposal-first)*
- `daily_notes` table; the morning **question** (not an intention field) + a gratitude line on the morning surface. Effort M. **Hard gate:** exact strings approved before build.

**Phase 6 — focus blocks** *(recommended for cut from twentyTwo)*
- If built at all, a **separate sibling app**, not a tab. Reuses the code spine. Hard-defer behind explicit demand.

**Phase 7 — wife-as-crew** *(leaf, deferred)*
- Single optional `profiles.partner_id` column; ordinary crew row (no pin/label). **Prerequisite:** a real second registered account actively training.

---

## 9. Open decisions for the owner

These are the specific yes/no choices that gate the build. Nothing past Phase 1 starts until the ones it depends on are answered.

1. **Expand vs. stay vs. rename** — confirm: **expand, workout-first, no rename.** (§2)
2. **Phase 0 protein ungate** — ship it now, alone? (Strong yes recommended.)
3. **Week-position line copy** — approve the exact strings (a one-paragraph proposal will follow), or hold the line indefinitely?
4. **`rhythm.ts` constants** — confirm yoga = **Mon/Wed/Sun** and weekend boundary = **Fri 14:30 local** are correct and stable.
5. **Meditation timer** — build it at all? If yes: default **30 min**? Ship with the ritual row, or row-first and timer as fast-follow? Confirm you accept **foreground-only, no background bell.**
6. **Yoga/beach crew visibility** — should friends see "did yoga / beach" presence marks (world-readable, simple), or stay owner-only (private, but breaks presence-safe-by-construction)?
7. **Day-close mark** — confirm **CUT** (recommended), keeping the evening deliberately un-tracked?
8. **Focus blocks** — confirm **CUT from twentyTwo**; revisit only as a separate sibling app on explicit demand?
9. **Hydration toggle** — confirm **CUT** (protein is the one nutrition lever)?
10. **Free-text question/gratitude (Phase 5)** — pursue eventually as **the morning question** (not a journal), copy-gated? Yes / no / later.
11. **Wife-as-crew** — defer until a second account is live? (Recommended yes.)

The recommended minimum that ships real value this week, violates zero constraints, and proves the premise: **Phase 0 only** (protein ungate + the week-position line behind approved copy). Everything else earns its place one honest row at a time.