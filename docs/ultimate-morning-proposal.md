# Twenty-Two → the "ultimate morning" — redesign proposal

**Status:** proposal for review. Nothing here is built except the protein tracker
(shipped separately, see §5). The training-side changes in §4 need your sign-off
on two tradeoffs (§6) before any `program.ts` edits.

## 1. The goal, restated honestly
A healthy body is trained across **six vectors**: strength, muscle, VO₂max
(cardio), mobility, bone density, body composition. The completeness analysis
(see the workflow summary) found Twenty-Two already covers **strength + muscle +
trunk** well, and **nails adherence** — but provides essentially zero **cardio**,
**dedicated mobility**, or **bone-grade loading**, and leaves **body composition**
(the thing that makes you look "defined") to diet, which the app only nudges.

"Perfect in every metric" is not a real target for any 22-min routine —
elite VO₂max, elite strength, and elite mobility actively compete. The realistic
and worthy target is **every vector at "very good," none neglected.** That is
reachable.

## 2. The core constraint: the clock
"Everything" needs *minutes*, and the program's superpower is a short, daily,
unbreakable morning. So the design rule is: **distribute the missing stimuli
across the week** (not every morning), keep each morning ≤ ~25 min, and accept
that **two pieces live partly outside the morning** (long Zone-2 cardio = a walk
habit; heavy/bone loading eventually = real external load).

## 3. The split — what's a code change vs a you-change
**You (no code):**
- **Doorway pull-up bar (~$25).** Highest-leverage item: unlocks vertical pull,
  grip, and heavier bone loading; prerequisite for the pull-up module. Until it
  exists, that module stays blocked.
- **A daily brisk walk.** Long Zone-2 can't fit the 22-min strength block; it must
  be incidental. The app can remind; it can't walk for you.

**Me (app/program):** the §4 module additions + the §5 protein tracker.

## 4. The redesign — per-day modules (for review)
Keep the spine (2-min warm-up + 3 main moves + core/finisher). Add a small
**day-specific module** so each missing vector lands at a defensible dose without
blowing up any morning. Every addition is **optional and floor-mode-collapsible**
— a bad day still drops to the 10-min core.

| Day | Module add (~4–8 min) | Vector closed | Notes / evidence |
|---|---|---|---|
| **Push** | Band **lateral raises** (2×12–20) + **4-min interval finisher** (e.g. 30s hard / 30s easy ×4) | lateral delt + VO₂max | intervals are the most time-efficient VO₂ stimulus; placed after lifting to minimize interference |
| **Legs** | Single-leg **calf raises** (2×) + **15–20 jumps/hops** | calves + **bone density** | impact is the most time-efficient BMD driver (hip/spine); **this is the philosophy-tradeoff item — see §6** |
| **Pull** | Doorway-bar **dead hangs → negatives** + light **neck**/grip | vertical pull + grip + bone load | gated on the bar; becomes the pull-up progression module |
| **Sun (core)** | **6–8 min mobility flow** (deep squat, 90/90, open-books, t-spine) | mobility | Sunday is already the deliberately light "drop day" — natural home |
| **Off the mat** | daily **walk** (Zone 2) + **protein check** (§5) | aerobic base + body comp | habit + the one app feature shipping now |

After this, all six vectors are served: strength/muscle (existing), VO₂max
(intervals + walks), mobility (Sunday), bone (hops + bar), body comp (protein +
diet), with the small omissions (lateral delt, calves, neck) closed.

## 5. The protein tracker (shipping now)
Body composition — "defined" — is set by energy balance + protein, not sets. The
app reminds but tracks nothing. Minimal fix, no calorie counting:

- **Data:** a per-day `protein_hit` boolean on `sessions` (additive migration).
- **UI:** one quiet toggle on Today, shown once the session is complete (you eat
  after training): `Had ~30g protein?` → tap → `Protein ✓`. Floor-collapsible,
  no numbers, no streak.
- **Why a boolean, not grams:** matches the app's no-friction, no-dashboard ethos;
  a daily yes/no builds the habit the science actually requires (hit the
  ~2.5–3 g leucine / ~30 g protein threshold per meal, 1.6–2.2 g/kg/day).

*(This is the one piece built in this pass; placement/copy shown for your OK
before deploy.)*

## 6. Two tradeoffs that are your call
1. **Morning-time creep.** "Everything" pushes some mornings ~15 → ~25 min,
   taxing the adherence thesis. *Mitigation:* every module optional +
   floor-collapsible; the core stays 15 min.
2. **Impact work (the hops).** Bone density wants impact, but plyometrics cut
   against the program's deliberate *no-plyo, injury-conservative, joints-first*
   identity. **Decision needed:** include a small, well-tolerated hop dose for
   bone health, or hold the no-impact line and accept maintenance-level BMD?

## 7. Suggested phasing
1. **Now:** protein tracker (done this pass) + you buy the bar / start walking.
2. **Phase 1 (low-conflict):** Sunday mobility flow; lateral raises + calf raises
   (tiny accessory adds, no time/philosophy cost).
3. **Phase 2 (needs §6 decision):** the interval finisher + the hop/impact dose.
4. **Phase 3 (needs the bar):** the vertical-pull / pull-up progression module
   (already in the backlog).

## 8. Open questions for you
- §6.2: include the impact/hops for bone, yes or no?
- Interval finisher: in-app as a programmed block, or just a reminder to do it?
- Is ~25-min mornings acceptable, or hard-cap at 20 and cut the lowest-value add?
