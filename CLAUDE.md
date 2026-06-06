# Twenty-Two — Morning Calisthenics Project

Context handoff from a Claude.ai conversation. Read this first to continue the project.

## What this is
A personal morning calisthenics program for a user starting from zero, designed to
be runnable **anywhere** (home, hotel, travel) in **15–20 minutes a day**. The goal
is general "great shape" — lean and defined, not bodybuilder mass. The user is also
working toward a leaner body composition.

The current deliverable is `twenty-two-morning-calisthenics.html` — a self-contained,
phone-friendly reference card (no build step, no dependencies; open it in a browser).

## Hard constraints (these drove the design)
- **Starting fresh** — not currently training. Habit-building matters as much as the program.
- **Daily, morning, fasted** — trains before the eating window opens (~8:30am). First
  meal is a collagen smoothie.
- **Equipment: bodyweight + ONE leg loop band only.** No pull-up bar, no long bands (yet).
- **Time: 15–20 min/session**, with a 10-min "bad day" floor.
- Wants evidence-backed, specific, ranked recommendations — not generic advice.

## Program structure (what's in the HTML)
- 6 training mornings + 1 flex day, rotating **Push / Legs / Pull** so each muscle is
  hit ~2×/week with 48–72h recovery (the reason daily training works here).
- Each session: ~2-min warm-up + 3 main moves (3 sets, stop 1–2 reps short of failure,
  3-sec eccentric) + a core/finisher.
- Progressive overload without weights: reps first → harder variation → slower tempo.

## Evidence basis (for reference)
- Bodyweight near failure builds muscle comparable to weights when load is matched
  (Kikuchi & Nakazato 2017; Schoenfeld 2021). Time-efficient protocols (15–20 min)
  produce real strength/body-comp gains (2025 ACSM update).
- Beginner timeline: feel stronger 2–3 wks (neural), visible definition 6–12 wks,
  "great shape" over 3–6 months. Track reps, not the mirror, early on.

## Known gap / top recommendation
Pulling is under-served with current equipment (legs and pushing are fully covered).
The single highest-leverage upgrade: a **doorway pull-up bar** or **long door-anchor
resistance bands** (~$20–25, travel-packable). Once acquired, the pull day can add
dead hangs → negatives → first pull-up.

## Backlog / next steps
1. **Nutrition layer** — protein timing around the fasted morning window; the collagen
   smoothie is an incomplete protein, so adding a complete protein (whey/plant blend)
   would better support muscle building. Protein target ~1.6–2.2 g/kg.
2. **Progress tracker** — simple way to log reps per exercise per day (the program's
   progression rules depend on beating last week's numbers).
3. **Pull-up progression module** — to slot in once a bar/bands are acquired.
4. Optional: evolve the single HTML file into a small trackable web app.

## Working notes
- Keep the aesthetic of the HTML (dark athletic theme, Oswald + Hanken Grotesk, lime
  accent) if extending it.
- No localStorage was used in the original artifact (it ran in a sandbox); in a real
  Claude Code project you're free to use localStorage/IndexedDB for the tracker.
