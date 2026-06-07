# Form-Guide System Review

A clarity audit of the exercise guidance system — the 2-pose SVG animations, the 3-cue
instructions, exercise notes/day-focus copy, and the FormSheet/Today presentation. The
user it must serve: a true beginner (possibly never trained), on a phone, possibly
mid-workout, deciding in seconds what to do with their body. Reviewers judged *renders*,
not source.

---

## 1. Verdict (three sentences)

The system is fundamentally sound — cues are disciplined and well-ordered, the crossfade
mechanism is mathematically correct, and most variations read clearly for a beginner. The
real problems cluster in two places: a handful of illustrations whose **distinguishing
feature doesn't render** (the band, the kneeling, the hip lift) or whose animation **teaches
the wrong motor pattern** (hollow holds animate as sit-ups, Pallof reads as a forward press),
and a thin but load-bearing layer of **undefined jargon** ("failure," "brace," missing units)
in exactly the copy a never-trained user depends on. None of these break the app, but several
will cause a beginner to either do the wrong movement or guess wrong about intensity — so they
are worth a single focused fixing pass before more friends use it.

---

## 2. Confirmed major issues

Ordered by user impact (wrong-movement and safety issues first, then ambiguity, then copy).

### 2.1 Hollow holds animate as repeated sit-ups, not a held position
- **Where:** `src/illustrations/hollow_hold.tsx` — all three variations (Tuck/One-leg/Full);
  note in `src/program.ts` (hollow_hold).
- **What a beginner sees:** pose-a is the figure lying **fully flat** on the floor, pose-b is
  the lifted dish. On the ~3.2s loop the body repeatedly rises off the floor into a banana and
  dissolves back down to flat — visually a slow crunch/sit-up rep. An upward arrow reinforces
  "lift," not "hold."
- **Why it matters:** this is the only ab-brace exercise in the program and the note itself
  calls it a hold you keep still. A beginner mid-workout will pulse up and down (the wrong motor
  pattern) instead of bracing. It also breaks the codebase's *own* hold convention: `side_plank`
  and `v_tuck_hold` keep the body off the floor in both poses (a shallow-vs-target hold), and
  CONVENTIONS.md line 193 describes the hollow as "arms & legs off floor" — yet pose-a puts them
  on the floor.
- **Fix:** make both poses a held dish differing only slightly (shallow dish → target dish),
  never touching down — exactly what `v_tuck_hold` already does. Add a "hold still" cue.

### 2.2 Pallof press reads as a forward chest-press, not a sideways anti-rotation hold
- **Where:** `src/illustrations/pallof_press.tsx` — all 4 variations; `src/program.ts:164–171`.
- **What a beginner sees:** the figure is in pure side-profile *facing* the door anchor, the band
  runs straight forward, and the press travels straight toward the anchor. This is visually
  indistinguishable from a band chest-press. Nothing conveys a sideways pull or a twist to resist.
- **Why it matters:** the picture **actively contradicts the note** ("Stand side-on so it tries to
  twist you - don't let it"). The three cues ("Resist the twist," "Don't let it rotate," "Stay
  facing forward") carry the entire anti-rotation concept with zero visual support — the exact
  failure mode for a beginner deciding in seconds. They will press forward into the band, which is
  a different exercise.
- **Fix:** the rotation axis is into the page, so pure side-profile can't show it. Add a small
  companion inset (overhead or 3/4 view) with the anchor **off to the side**, the band pulling the
  chest laterally, and a curved "twist" arrow the trunk resists (crossed out).

### 2.3 Glute-bridge hip lift is too small — the move's whole point doesn't read
- **Where:** `src/illustrations/glute_bridge.tsx` — all four variations (hip y=104 → y=96).
- **What a beginner sees:** the hip dot rises only ~8px in a 120-unit viewport. At lockout the
  figure is a shallow ramp; the hip dot (y=96) even sits *below* the knee (y=92), so the hips are
  the low point of the line, not the driven-up apex. The reduced-motion frame just looks like
  someone lying with one bent knee.
- **Why it matters:** the signature of a bridge — hips driven UP HIGH, shoulders–hips–knees in a
  strong straight line off the floor — is not visually present. CONVENTIONS §10 names this as the
  unmistakable feature; the art under-delivers against even its own movement arrow (which targets
  y≈84 while the body only travels to y=96).
- **Fix:** raise pose-b hip substantially (hip y≈84–86, shoulders near y≈104) so the ramp is steep
  and the lift obvious. Hold torso length at 28px.

### 2.4 Banded-RDL band (the distinguishing feature) is nearly invisible
- **Where:** `src/illustrations/hinge_raises.tsx` — LEFT mini-figure band line (lines 69 / 109,
  opacity 0.5, strokeWidth 2).
- **What a beginner sees:** in pose-a (where the loop dwells) the band runs from a barely-forward
  hand back to the foot, nearly parallel to and partly behind the leg, in a dim same-hue stroke —
  it reads as a shadow or a faint back-leg, not a band. The whole left figure reads as a plain
  standing stick figure. The band is legible only in pose-b.
- **Why it matters:** this family *is* the banded RDL; the leg-raise side carries no equipment, so
  nothing on the panel says "band" visually. CONVENTIONS §10/§12 require the distinguishing feature
  to be unmistakable in the render independent of text. A beginner learns there's a band only from
  the note.
- **Fix:** offset the holding hand further forward so band/arm/shin are three separate strokes;
  make the band heavier or dashed; add a small loop glyph at the foot anchor. Fix pose-a especially.

### 2.5 Tall-kneeling pulldown base reads as a standing figure
- **Where:** `src/illustrations/lat_pulldown.tsx` — `TallKneelingPulldownArt`, both poses.
- **What a beginner sees:** the leg goes hip(96,72) straight down to knee(96,92), then a short
  angled shin to the floor plus a toe tick — a normal standing leg with a slightly bent foot. The
  kneeling hip (y=72) is at the *same height* as the standing straight-arm variation's hip, so
  there is no shorter-than-standing cue. The base is identical across both poses, so the crossfade
  shows one merged standing leg.
- **Why it matters:** the §10 distinguishing feature is "tall-kneeling (both knees down, shins on
  the floor)" and it is not depicted at all. The art shows a standing figure while the cue says
  "Kneel tall" — a picture/text conflict. A beginner deciding from the picture will stand, changing
  the band geometry and the exercise.
- **Fix:** lay the shin horizontally along the floor with a clear right angle at the knee; lower the
  hips so "tall-kneeling" reads shorter than the standing variations.

### 2.6 Straight-arm pulldown pose-B reads as a BENT elbow
- **Where:** `src/illustrations/lat_pulldown.tsx` — `StraightArmPulldownArt`, pose-b (~lines 170–185).
- **What a beginner sees:** the solid arm runs down to the hip (shoulder 92,48 → hand 113,71) and
  the band runs back up to the high anchor (113,71 → 166,20). The two strokes meet at a low vertex
  and form a sharp "V" that, at phone size, reads as a bent elbow with the forearm angling back up.
  The dashed movement arc sits in the same valley, compounding the fold.
- **Why it matters:** this directly contradicts the variation's identity and its explicit cue 3
  "Keep the elbows straight." A beginner glancing at the end-pose frame sees the precise opposite of
  what the exercise is. (Mitigations exist — the door-anchor circle, no elbow joint dot, and the
  crossfade pairing with a clearly-straight pose-a — so this is the lightest of the art majors, but
  the static frame still folds.)
- **Fix:** end the hand lower/more forward so the arm is one long straight segment that does NOT
  vertex with the band at the hip; route the band to leave the hand at an obviously different angle;
  and/or fade the band to ~0.3 opacity and thinner so it can't read as a forearm.

### 2.7 Pike feet-on-floor: head circle merges with the pressing arm
- **Where:** `src/illustrations/pike_pushup.tsx` — `PikeFeetFloorArt` (index 0); cues/note
  `src/program.ts:34–43`.
- **What a beginner sees:** in pose-a the straight pressing-arm line passes ~3px from the head-circle
  center (inside r=7) — the head reads as a bead threaded on the arm. In pose-b the elbow joint dot
  falls *inside* the head circle (5px from center) — head and bent arm fuse into one blob. The figure
  reads as a triangle with a lump, not a person with the head pointing down between the hands.
- **Why it matters:** the pike's distinguishing feature is the head pointing down toward the floor
  between the hands — exactly what the merge destroys. CONVENTIONS §198: "If the distinguishing
  feature isn't instantly readable in your render, the panel fails." The crossfade makes it worse
  (two overlapping head circles bisected by lines).
- **Fix:** offset the head clear of the arm line (lift it forward/up, like the archer fix). *(The
  secondary "bent stance-leg reads as a second arm" sub-claim is weak — a side-profile pike legitimately
  has a slightly bent front leg — so prioritize the head/arm separation only.)*

### 2.8 Reduced-motion / mid-crossfade hollow-hold figure is an unreadable tangle
- **Where:** `src/illustrations/hollow_hold.tsx` (Tuck, index 0) + the `prefers-reduced-motion` rules
  in `src/styles.css`.
- **What a beginner sees:** for OS-level reduced-motion users this is the *permanent* image — pose-b
  solid + pose-a ghost at 0.25 opacity renders **two head circles** (~19 units apart) and the
  lying-flat legs crossing through the tucked legs into a knot. The 50/50 crossfade midpoint is worse:
  two equally bright heads and an X of flat-vs-tucked legs. The supine start and tucked end occupy
  nearly the same space, so superimposing them is illegible.
- **Why it matters:** a never-trained reduced-motion user gets a two-headed tangle as the only image
  of the move. (Note: the live loop also passes through a ~0.47/0.47 simultaneous-opacity frame around
  1480ms, so the tangle flashes there too — broader than "live is fine.") This is the same root cause
  as 2.1: pose-a is "lying flat" and overlaps pose-b badly.
- **Fix:** the 2.1 fix largely solves this. If pose-a becomes a shallow held dish instead of flat-on-floor,
  the two poses separate cleanly. Alternatively, for lying-down holds show only pose-b, or ghost just the
  limb delta rather than a whole second figure.

### 2.9 "Stop 1–2 reps short of failure" — undefined jargon, the only intensity instruction
*(Two reviewers filed this; consolidated.)*
- **Where:** `src/program.ts:200` (push focus), `:221` (core focus, which drops "of failure"
  entirely → "Stop 1-2 reps short"); surfaced in DayHeader `.focus` (`Today.tsx:320`).
- **What a beginner sees:** the word "failure" appears exactly once in all of `src/` and is never
  defined. It sits at the tail of a dense, low-contrast grey focus paragraph (var(--muted), 13.5px),
  easy to skim past. There is no onboarding screen, no FormSheet gloss, no "reps in the tank" concept.
- **Why it matters:** the entire self-regulating progression model rests on RIR (reps-in-reserve). A
  never-trained user has never trained to failure, so "stop 2 reps before a point you've never reached"
  is unactionable — they will either grind to true failure (day-one burnout/injury) or stop far too
  short to ever progress.
- **Fix:** define it once in plain language at first appearance: "stop when you think you have ~2 clean
  reps left in the tank (don't grind to total exhaustion)." Could live in the FormSheet note or a
  one-time first-session tip.

### 2.10 Timed-move target/log line shows no unit — "30 · 30 · 30" could be reps or seconds
- **Where:** `src/screens/Today.tsx` target line (lines 466–474) and SetChip labels (line 583 unlogged
  "Set N", line 581 logged bare value).
- **What a beginner sees:** for timed moves (hollow, plank, side plank, v-tuck — unit "secs") the inline
  target renders as "beat 30 · 30 · 30" with no unit, identical in form to a reps target; the chip after
  logging shows a bare "34". The unit *is* present, but only on the header chip ("3×20–45 sec") one line
  up in a separate tappable header — not on the actionable line they read mid-set.
- **Why it matters:** at the precise point of decision (setting a hold goal, or reading the logged chip),
  seconds and reps are visually indistinguishable. (Severity is slightly generous since the unit is one
  line above on the same card — but the action line itself drops it.)
- **Fix:** append the unit to the target line ("beat 30 · 30 · 30 sec") and/or show the unit on the
  logged chip value for timed exercises.

### 2.11 Undefined "brace" and "hinge" in the cues CONVENTIONS bans jargon from
*(Filed as a broad "dense jargon" major; verification narrowed it — presented here at its true scope.)*
- **Where:** cues — `pallof_press.tsx:378` "Stand tall, brace once"; `dead_bug.tsx:345` "Brace, low back
  pinned"; `reverse_lunge.tsx:244` "Stand tall and braced"; core focus `program.ts:221` "Brace hard";
  `hinge_raises.tsx:133` "Hinge hips back, back long." Plus jargon path labels on the always-visible card
  face ("Bulgarian split", "Pistol progression", "Deficit / jump", "Banded RDL").
- **What a beginner sees:** "brace" and "hinge" appear inside the 3-cue lists — the one place CONVENTIONS
  §8 (line 169) explicitly bans jargon — and are never defined anywhere in the app. A never-trained user
  does not know "brace" = tighten the stomach hard as if about to be punched, or "hinge" = push the hips
  back.
- **Why it matters / scope correction:** the original finding claimed the §8 ban covers all path labels,
  names, and notes — it does **not** (§8 governs cues only, and §10 deliberately adopts "Bulgarian split
  squat"/"pistol squat" as canonical names). Several flagged terms are already glossed inline — e.g.
  "B-stance" is paired with the cue "Set one heel as a kickstand" (`glute_bridge.tsx:331`). So this is
  **closer to moderate than major**: only ~2 terms ("brace," "hinge") are genuinely in-scope and
  undefined. But that core is real.
- **Fix:** gloss "brace" and "hinge" once at first use ("brace = tighten your stomach hard"; "hinge = push
  your hips back like closing a car door with your butt"). Optionally gloss the jargon path labels that sit
  on the card face with no adjacent plain-language cue.

---

## 3. Themes across the minor / polish findings

The minors cluster into six patterns. Representative examples with locations below; the full itemized
list is the appendix table in §7.

### Theme A — Equipment / resistance line is too faint to identify
The thin opacity-0.5 resistance strokes don't read as the implement they represent, on a phone, at ~50%
mini-figure scale.
- Curls towel/band line, `curls_plank.tsx` `CurlsPlankArt` (12px line at opacity 0.5) — reads as nothing.
- Door anchor is an abstract high corner with no doorframe/handle, `lat_pulldown.tsx` &
  `band_pull_apart.tsx`.
- *(Same root cause as majors 2.4 banded-RDL and 2.6 band-as-forearm — the band-stroke convention is the
  system's weakest visual primitive. Worth treating as one workstream.)*

### Theme B — Holds animate like reps (over-promised motion)
Isometric holds carry directional arrows and "press" cues, inviting the wrong action.
- Wall handstand hold: sideways arrow + "Press the floor away" cue, `pike_pushup.tsx`
  `WallHandstandHoldArt` (index 3).
- Pallof tall-kneeling hold: arrow points at the band, not a body action, `pallof_press.tsx`
  `TallKneelingHoldArt` (index 0).
- V-tuck hold "looser → tighter" delta is imperceptible (a few px), `v_tuck_hold.tsx`.
- *(Shares the root with majors 2.1/2.8. A general "hold" treatment — swap the arrow for a hold/clock
  glyph, make both poses near-identical — would fix the whole cluster.)*

### Theme C — Sibling variations weakly distinguished at thumbnail scale
Adjacent progressions in a family look near-identical when scanned fast.
- Tuck vs One-leg vs Full hollow — the leg story doesn't read 1→2→3, `hollow_hold.tsx`.
- Two-leg vs B-stance bridge differ only by one ambiguous extra limb, `glute_bridge.tsx` (0/1/2).
- Reverse vs walking lunge differentiated almost solely by the arrow, `reverse_lunge.tsx` (0/1).
- All three lat-pulldowns look alike at thumbnail size, `lat_pulldown.tsx`.

### Theme D — Crossfade double-exposure & low-amplitude loops
Mechanical consequences of the (correct) 2-pose crossfade when poses sit close in space.
- Mid-crossfade "two heads" / snowman for ~0.25s each half-cycle, **all families**; worst on row & squat.
- Row start/end nearly identical — the loop barely moves, `row.tsx` table-row variations.
- Heel-tap dead-bug leg overlays into a zigzag, `dead_bug.tsx` `HeelTapDeadBugArt`.
- Curl mini-figure motion too small to read as a curl, `curls_plank.tsx`.
- Loop band "grows" from one-hand oval to two-hand lens, `band_pull_apart.tsx` `LoopBandArmsOutArt`.
- *(Two cheap global levers help several of these at once: widen the pose delta where travel is small,
  and either shorten the fade band (42–50% → 46–50%) or lengthen the loop to ~4–4.5s so the
  double-exposure window is a smaller fraction.)*

### Theme E — Missing feet / limb-vs-limb ambiguity on floor figures
- Archer/decline/diamond floor figures show no foot tick, so legs read as arms, `pushup.tsx`
  `ArcherPushupArt`(4)/`DeclinePushupArt`(2), `triceps_press.tsx` diamond (idx 2).
- Assisted-archer far arm passes through the head; crossfade double-heads, `pushup.tsx`
  `AssistedArcherPushupArt` (index 3).
- Decline/hands-elevated pose-b breaks into a pike instead of a straight plank, `pushup.tsx` (2/0).
- One-arm row free arm clusters at the chest, `row.tsx` `OneArmRowArt`.
- Side-plank supporting forearm extends past the head, `side_plank.tsx`.
- *(Same family as majors 2.7 head/arm merge — a "keep the head clear of limb lines, add a foot tick"
  pass would clean up most of these.)*

### Theme F — Personal-program jargon & UI register leaks into beginner copy
Author shorthand and program context that a friend using this cold won't parse.
- "scapular push-ups" warm-up chip — jargon with no form sheet behind it, `program.ts:19`.
- "Floor: 1 round of the mains" — "floor"/"mains" undefined, `Today.tsx:336–337`.
- "~30g protein when the window opens" — assumes the fasting-window concept, `Today.tsx:592–598`.
- "regress a step" (notes) vs "Level up" (UI) — mismatched register, no down-level button.
- "3-second descent" vs "lower for a 3-count" — inconsistent tempo phrasing; avoid "eccentric" in UI.
- First-cue affordance can expose a setup-only or jargon cue ("dish shape") as the lone visible
  instruction, `Today.tsx:464`; `dead_bug[1]`, `v_tuck_hold[0]`.
- *(Same family as major 2.9/2.11 — the whole copy layer needs one beginner-language pass.)*

A few first-session UX nits sit outside these themes and are listed in the appendix: warm-up collapsed by
default (a first-timer may skip it), first-session logs always turn celebratory green even below range,
and the stepper defaults to the bottom of the range.

---

## 4. What's working — do not touch

These were explicitly praised and verified clear. Preserve them; don't regress them while fixing the above.

- **Cue discipline (the strongest part of the system).** Every variation has exactly 3 cues, ≤6 words,
  verb-first imperative, external-focus, ordered setup→drive→finish, and the first cue stands alone for
  the inline learn-then-fade affordance. Examples: "Push the floor away," "Make the body a table"
  (glute_bridge), "so it tries to twist you - don't let it" (pallof). **Do not water these down when
  glossing jargon — add definitions, don't rewrite the cues.**
- **Crossfade timing math.** Complementary dissolve, opacities sum to ~1.0, no blank frame and no
  double-bright frame; the -1.6s delay is correct. This is the intended baseline — don't let a future
  author "fix" it. (The double-head *image* is a pose-placement issue, not a timing issue.)
- **Reduced-motion fallback (in general).** pose-b solid + pose-a ghost @0.25 reads as a prior position
  on most moves (squat is excellent). The hollow-hold exception (2.8) is a pose-overlap problem, not a
  fallback-design problem.
- **Side plank** — the orientation success of the set; long diagonal on one forearm reads unmistakably as
  side-lying, "Top arm reach" is a perfect distinguishing feature.
- **Feet-elevated row** — clearest equipment in its group (raised block + level body); the model the
  under-table panels should follow.
- **Band pull-apart (arms-out)** — arms-together → arms-swept-wide with a stretched band is an
  unmistakable "pull apart."
- **Forearm plank** (right of `curls_plank`) — reads correctly as a static forearm hold; the clock glyph
  disambiguates it.
- **Pallof STANCE progression** (tall-kneel/stand/split) and **lat-pulldown anchor placement** (high, at
  the top of the door) and **face-pull anchor** (at face height, distinct from overhead) — all read at a
  glance. *(Note: the Pallof stance read is good even though the anti-rotation direction (2.2) is not —
  keep the stances, add the inset.)*
- **Header set chip units** ("3×20–40 sec" vs "3×8–15 reps") and **day-focus "why" lines** are clear.
- **"Per side" / "Count per side" notes** correctly flag the unilateral-counting trap.
- **The learn-then-fade design** (form tag + inline first cue only while familiarity < 3) — good
  decluttering for a phone-first beginner.

---

## 5. Recommended action plan (if you decide to fix)

Three batches by leverage. Sizes are rough.

### Batch 1 — Wrong-movement & safety fixes (do these; highest impact, small surface)
The handful where a beginner does the *wrong thing*:
1. **Hollow holds (2.1 + 2.8)** — make both poses a held dish (shallow → target, never on the floor) +
   "hold still" cue. One file, fixes the sit-up animation AND the reduced-motion tangle together.
2. **Pallof anti-rotation inset (2.2)** — add a small overhead/3-4 companion diagram with a side anchor +
   crossed-out twist arrow. Largest single piece of new art here, but it's the only fix for a picture that
   contradicts its own note.
3. **Glute-bridge hip lift (2.3)** — raise pose-b hip to y≈84–86. Trivial coordinate change across 4
   variations.
4. **Define "failure" / RIR once (2.9)** and **add units to the timed target/log line (2.10)** — two small
   copy/JSX edits that fix the intensity model and the reps-vs-seconds ambiguity.

*Rough size: half a day. This batch removes every "beginner does the wrong exercise or wrong intensity"
risk.*

### Batch 2 — "Distinguishing feature doesn't render" art fixes (do these; medium)
Where the move is *identifiable but wrong-looking* or unreadable:
5. **Tall-kneeling base (2.5)** — lay the shin flat, lower the hips.
6. **Straight-arm pulldown bent-elbow (2.6)** — straighten the arm segment / fade the band.
7. **Banded-RDL band (2.4)** + the Theme-A band/anchor legibility cluster — treat the faint resistance
   stroke as one workstream: heavier/dashed band, foot-anchor loop glyph, minimal door detail. Fixes 2.4
   plus several minors at once.
8. **Pike head/arm merge (2.7)** + the Theme-E "head clear of limbs / add foot ticks" pass.

*Rough size: one to two days of SVG nudging. Batch the band-legibility and head-clearance changes since
they recur across many files.*

### Batch 3 — Copy & polish (worthwhile, low urgency)
9. **One beginner-language copy pass (Theme F + 2.11):** gloss "brace"/"hinge" in cues; reword
   "scapular push-ups," "Floor/mains," "the window opens," "regress a step"; standardize tempo phrasing.
   Cheap, high-readability return.
10. **Two global animation levers (Theme D):** widen pose deltas where travel is small (row, curls, v-tuck
    hold); optionally lengthen the loop to ~4–4.5s or tighten the fade band to shrink the double-exposure
    window. These help many minors at once.
11. **First-session UX nits:** expand warm-up by default on session 1; first-session under-range logs read
    neutral, not celebratory green.

### Explicitly skip (not worth it)
- **Sibling-thumbnail distinctness (Theme C)** as a project — the FormSheet always shows the variation
  *name* above the art and the path "now" label, so siblings are disambiguated by text in practice. Only
  exaggerate where a batch-1/2 fix already touches the file.
- **A "START" marker on pose-a / direction labeling** — the symmetric crossfade plus the ordered cues and
  inline setup cue already carry direction; reviewers refuted the "50/50 guess" claim. Don't add chrome.
- **Crossfade timing math** — it's correct; leave it.
- **Cue/note redundancy and "regress vs level up" register** — polish only; fold into the Batch-3 copy pass
  if convenient, otherwise skip.

---

## 6. Refuted-on-verification appendix

These were filed as majors but did **not** survive adversarial re-rendering. Listed so you know they were
considered and can ignore them.

- **One-leg hollow reads as an unparseable tangle** — refuted; the held pose (on screen ~85% of the loop)
  reads clearly (one up-spike + one long-low line); the filed arm geometry was wrong, and the double-head
  is the universal brief crossfade artifact, not a panel defect.
- **Deep pike ≈ feet-elevated pike** — refuted; pose-b differs in fold depth, forearm angle, head-on-floor
  vs floating, and arrow length; legible in solo phone-width renders.
- **Under-table row equipment reads as an overhead bar** — refuted; the figure clearly lies *under* and
  pulls up, and the co-located title/cue/note say "table" in plain words. Art-polish nit at most.
- **Dead bug reads as a seated figure** — refuted; the horizontal floor-level torso dominates; a seated
  read needs a vertical spine, which no panel has. The "Opposite arm + leg" panel is decisively flat.
- **V-tuck panel: neither mini-figure reads as a human** — refuted/overstated; heads are visible, both
  motion arrows label the moves, and the always-present name/cues/note name dish/rock/V-tuck/sit-bones.
  Real but *minor* weakness (compact figures), not a catastrophe.
- **Direction is reversible — depends entirely on the arrow** — refuted; the ordered setup→drive→finish
  cues (co-presented, with cue[0] pinned inline) carry direction independent of the arrow.
- **Two unnamed bands — user can't tell which band a move needs** — refuted; the "ONE loop band only"
  premise is obsolete (user owns both bands per current CLAUDE.md), and long-band moves consistently say
  "anchor over a door" + draw a door, while loop moves say "above the knees" / "under the feet" and draw
  no door.

---

## 7. Appendix — full itemized minor / polish list

| # | Severity | Where (file / variation) | Issue | Theme |
|---|----------|--------------------------|-------|-------|
| 1 | minor | `hollow_hold.tsx` (0/1/2) | Tuck/One-leg/Full weakly distinguished; Tuck draws one tucked leg, not "both knees" | C |
| 2 | minor | `pike_pushup.tsx` `WallHandstandHoldArt` (3) | Isometric hold shows sideways arrow + "Press the floor away" cue | B |
| 3 | minor | `pushup.tsx` `AssistedArcherPushupArt` (3) | Crossfade double-heads; far arm passes through head | D / E |
| 4 | minor | `pushup.tsx` `ArcherPushupArt`(4)/`DeclinePushupArt`(2), `triceps_press.tsx` diamond (2) | No foot tick — legs read as arms / sphinx | E |
| 5 | minor | `pushup.tsx` `DeclinePushupArt`(2)/`HandsElevatedPushupArt`(0) | pose-b breaks into a pike instead of a straight plank | E |
| 6 | minor | `glute_bridge.tsx` (0/1/2) | Two-leg vs B-stance vs single-leg only weakly distinct at phone glance | C |
| 7 | minor | `reverse_lunge.tsx` (0/1) | Reverse vs walking lunge differentiated almost solely by the arrow | C |
| 8 | polish | `hinge_raises.tsx` panel + cues; `program.ts` note | Two-move order relies on left-right reading + "Then" — no 1/2 marker | — |
| 9 | minor | `curls_plank.tsx` `CurlsPlankArt` (left) | Towel/band resistance line nearly invisible; towel-vs-band unresolved | A |
| 10 | minor | `curls_plank.tsx` `CurlsPlankArt` (left) | Curl motion too small/subtle to read as a biceps curl | D |
| 11 | minor | `lat_pulldown.tsx` (kneel/straight-arm/one-arm) | All three look near-identical at thumbnail size | C |
| 12 | polish | `lat_pulldown.tsx` & `band_pull_apart.tsx` | Door anchor lacks any door detail — reads as abstract corner | A |
| 13 | polish | `row.tsx` `OneArmRowArt` pose-b | Free arm + working arm cluster at the chest | E |
| 14 | polish | `band_pull_apart.tsx` `LoopBandArmsOutArt` | Band "grows" from one-hand oval to two-hand lens in crossfade | D |
| 15 | minor | `dead_bug.tsx` `HeelTapDeadBugArt` | Heels-to-floor overlay creates an unreadable leg zigzag | D |
| 16 | minor | `v_tuck_hold.tsx` (right mini) | pose-a vs pose-b (looser vs tighter V) imperceptible | B |
| 17 | minor | `pallof_press.tsx` `TallKneelingHoldArt` (0) | Hold barely moves; arrow points at the band, not a body action | B |
| 18 | polish | `side_plank.tsx` (all) | Supporting forearm extends past the head, reads oddly | E |
| 19 | minor | `Today.tsx:464`; `dead_bug[1]`, `v_tuck_hold[0]` | First-cue affordance exposes setup-only / jargon ("dish shape") cues | F |
| 20 | polish | `styles.css` `poseCrossfade` | Crossfade timing math is correct — document as intended baseline (praise) | — |
| 21 | minor | all variations, ~1.4–1.6s & 3.0–3.2s crossover | Mid-crossfade double-exposure shows two heads (~0.25s each half-cycle) | D |
| 22 | minor | FormSheet `.guide-svg` at phone width | Movement arrow too small/faint, especially next to the body | D |
| 23 | polish | `styles.css` `poseCrossfade` 3.2s | ~1.34s per pose adequate but tight while reading 3 cues; consider 4–4.5s | D |
| 24 | polish | `prefers-reduced-motion` rules | Reduced-motion ghost reads correctly as prior position (praise; keep) | — |
| 25 | minor | `row.tsx` table-row variations | Start/end poses nearly identical — crossfade has almost nothing to dissolve | D |
| 26 | minor | CONVENTIONS §4 vs FormSheet render | Nothing on screen states pose-a=START / pose-b=END | D |
| 27 | minor | `program.ts` (31/200/221) | "3-second descent" / "3-count" / "eccentric" stated as a number, inconsistent | F |
| 28 | minor | `program.ts:19`; Today.tsx Warmup | "scapular push-ups" warm-up chip — jargon, no form sheet | F |
| 29 | minor | `Today.tsx:336–337` | "Floor: 1 round of the mains" uses internal jargon | F |
| 30 | minor | `Today.tsx:592–598` | "~30g protein when the window opens" assumes fasting-window concept | F |
| 31 | polish | FormSheet (cues then note) | Cue/note redundancy pushes the new info (regression rule) down | F |
| 32 | polish | `program.ts` notes vs `Today.tsx:497–503` | "regress a step" (notes) vs "Level up" (UI) — mismatched register, no down button | F |
| 33 | minor | `Today.tsx` Warmup (warmupOpen=false) | Warm-up collapsed by default — first-timer may skip it | — |
| 34 | minor | `Today.tsx` SetChip logged state | First-session logs turn celebratory green even below target | — |
| 35 | polish | `Today.tsx` SetChip defaultValue | Stepper defaults to bottom of range, not a neutral value | — |
