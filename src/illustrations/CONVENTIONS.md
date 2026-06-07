# Twenty-Two exercise illustrations — drawing conventions

Read this completely before drawing. Twelve artists draw inside this system; the
goal is that all twelve draw **the same person** doing different movements, and
that a stranger glancing at any panel recognizes the exercise.

The two fully-worked reference implementations are:
- `src/illustrations/pushup.tsx` — step index **1 ("Standard")** is finished art.
- `src/illustrations/squat.tsx` — step index **0 ("Bodyweight 3s down")** is finished art.

Open those two files alongside this doc. They are the ground truth; this doc is
the spec they obey.

---

## 1. Canvas

- `<svg viewBox="0 0 200 120">` — width 200, height 120, **no** width/height attrs
  (the container sizes it). Always include `aria-hidden="true"` on the svg; the
  FormSheet labels the figure in text.
- Coordinate space: **x grows right, y grows DOWN** (SVG default). "Up" in the
  world = smaller y.
- Keep all art within roughly **x ∈ [20, 180], y ∈ [18, 112]** so nothing clips.
- **Side-profile view ALWAYS** (figure faces right, i.e. moving/looking toward
  +x), so working joint angles read. The only exceptions are explicitly-allowed
  front views for lateral band walks (see §9).

## 2. Color & stroke (set on the svg root, inherited)

The svg inherits `currentColor` from the card, which is the day accent. Do **not**
hardcode colors on strokes. On the root `<svg>` set:

```jsx
<svg viewBox="0 0 200 120" aria-hidden="true"
     fill="none" stroke="currentColor"
     strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
```

- Figure limbs/torso: inherit (strokeWidth 3, round caps/joins, **no fill**).
- Head: `<circle r={7} fill="none" />` (stroke only).
- Joint dots: small **filled** circles, `r={2.5} fill="currentColor" stroke="none"`.
  Place one at each rendered joint that bends (shoulder, elbow, hip, knee). Skip
  wrist/ankle dots unless a joint angle there is load-bearing.
- Ground line: `<line>` at **y = 110**, faint: `opacity={0.25} strokeWidth={1.5}`.
  Span roughly x 15→185. It lives OUTSIDE the pose groups (static scenery).
- Equipment (wall, chair, door, bench, block, band, towel): single thin lines,
  `opacity={0.5}`. Static scenery unless the equipment itself moves with the body
  (e.g. a band being stretched — then the band's moving end is inside the pose
  groups; its anchor stays static).

## 3. Figure proportions — CONCRETE NUMBERS (memorize these)

One consistent ~**70px-tall** person. Segment **lengths** (draw the figure at
whatever orientation the move needs, but keep these segment lengths):

| Segment            | Length (px) |
|--------------------|-------------|
| Head radius        | 7           |
| Neck (head→shoulders) | 8        |
| Torso (shoulders→hip) | 26       |
| Upper arm (shoulder→elbow) | 16  |
| Forearm (elbow→wrist)      | 15  |
| Thigh (hip→knee)   | 18          |
| Shin (knee→ankle)  | 18          |
| Foot (ankle→toe)   | 9           |
| Hand               | (none — end forearm at wrist) |

Derived: a fully-extended arm = 31px; a fully-extended leg = 36px; standing
figure crown-to-ground ≈ 7(head r, top half above neck point) → neck 8 → torso 26
→ leg 36 ≈ **~76px**, head adds its radius on top. Treat **70–76px** as correct
standing height.

**Anchor convention:** define the **hip point** (the pelvis) first, then build
torso up to the shoulder point, neck+head above that, arms from the shoulder,
legs down from the hip. Working out from the hip keeps every artist's figure the
same size.

A neutral standing figure for reference (hip at 100,70):
- hip (pelvis): (100, 70)
- shoulders: (100, 44)   [26 up from hip]
- neck/head-base: (100, 36) [8 up]
- head center: (100, 29)  [head sits with its bottom near the neck-base]
- elbow (arm hanging): (100, 60); wrist: (100, 75)
- knee: (100, 88); ankle: (100, 106); toe: (109, 106)

(For most exercises the torso tilts or the figure is horizontal — rebuild from the
hip using the same lengths.)

## 4. Pose group structure (REQUIRED shape of every Art component)

```jsx
export default function StandardPushupArt() {
  return (
    <svg viewBox="0 0 200 120" aria-hidden="true"
         fill="none" stroke="currentColor"
         strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
      {/* --- static scenery (ground, equipment, movement arrow) --- */}
      <line x1={15} y1={110} x2={185} y2={110} opacity={0.25} strokeWidth={1.5} />
      {/* equipment lines here, opacity .5 */}
      {/* movement arrow here (see §6) */}

      {/* --- pose A: start position --- */}
      <g className="pose-a">
        {/* limbs, torso, head, joint dots for the START pose */}
      </g>

      {/* --- pose B: end / contracted position --- */}
      <g className="pose-b">
        {/* limbs, torso, head, joint dots for the END pose */}
      </g>
    </svg>
  );
}
```

- **Exactly two** pose groups, classed `pose-a` (start) and `pose-b` (end). The
  crossfade is done entirely in CSS (`.guide-svg` rules). Do NOT add inline
  animation, `<animate>`, transitions, or opacity to the groups — CSS owns it.
- Everything that does **not** move between the two poses (ground, wall, chair,
  band anchor, the movement arrow) lives **outside** both groups as static
  scenery, so it doesn't flicker during the crossfade.
- Each pose group is a complete figure (its own head, torso, limbs, dots). They
  overlap in space; the crossfade dissolves between them.

## 5. Joint dots

Filled dots (`r=2.5 fill="currentColor" stroke="none"`) at the joints that bend
in THIS movement, in BOTH pose groups: shoulder, elbow, hip, knee. They make the
articulation legible. A pushup pose group, e.g., has dots at shoulder, elbow,
hip, knee.

## 6. Movement arrow (exactly one, static scenery)

One dashed arrow showing travel direction from pose-a toward pose-b (e.g. the
hips rising, the chest dropping). Spec:

```jsx
<g opacity={0.6}>
  <path d="M <x1> <y1> L <x2> <y2>" strokeWidth={2} strokeDasharray="4 3" />
  {/* arrowhead: two short strokes at the tip */}
  <path d="M <tipx-6> <tipy-4> L <x2> <y2> L <tipx-6> <tipy+4>" strokeWidth={2} />
</g>
```

Place it near (but not overlapping) the part of the body that travels most. Curve
it with a quadratic (`Q`) if the motion is an arc. Keep it OUTSIDE the pose
groups.

## 7. Naming & exports

- One file per exercise family: `src/illustrations/<exercise_key>.tsx`
  (keys: pushup, pike_pushup, triceps_press, hollow_hold, squat, glute_bridge,
  reverse_lunge, hinge_raises, row, band_pull_apart, lat_pulldown, curls_plank).
- The file's **default export** is `VariationGuide[]` whose **length and order
  exactly match** that key's `path` array in `src/program.ts`. Index === step_index.
- Name each Art function descriptively, e.g. `function DiamondPushupArt()`.
- Cues: exactly 3 strings per guide (see §8).

## 8. Cues (motor-learning rules — enforced)

- Exactly **3** per variation.
- **<= 6 words** each.
- **Verb-first imperative** ("Push the floor away", not "You should push…").
- **External focus** — describe the effect on the environment/object, not the
  muscle: ✅ "push the floor away", "crush the band", "reach the wall";
  ❌ "contract your glutes", "engage your lats".
- Order: **setup → drive → finish**.
- One internal-ish SETUP cue is acceptable (e.g. "ribs down", "long spine").
- No jargon a beginner wouldn't know (no "scapular retraction", "posterior tilt").
- Multi-move panels: the 3 cues cover the distinct movements, one each.

## 9. Multi-move panels (hinge_raises, curls_plank)

These keys have a single path entry but show 2–3 movements. Draw **smaller
side-by-side mini-figures** (scale the proportions down ~50%, keep them legible),
each still a 2-pose animated figure inside the SAME `pose-a` / `pose-b` groups
(i.e. pose-a holds the start of every mini-figure, pose-b holds the end of every
mini-figure). Label-free; the cues name the moves. **Front view is allowed only
for the lateral band walk** (sideways stepping cannot read in profile); keep the
others in profile.

## 10. Distinguishing feature — make it UNMISTAKABLE

Each variation has one feature that must be visually obvious. Non-exhaustive:

- **diamond** pushup = hands together under the chest (draw both hands meeting).
- **archer** pushup = one arm extended straight out to the side, weight over the other.
- **decline** pushup = FEET up on a raised block, body angled head-down.
- **hands-elevated** pushup = HANDS on a raised edge, body angled head-up.
- **pike** pushup = inverted-V (pike) hips high, head toward floor.
- **pistol** squat = one leg extended straight forward off the floor.
- **Bulgarian** split squat = rear foot up on a bench behind.
- **hollow** hold = supine, shallow banana/dish shape, arms & legs off floor.
- **towel row** = body leaning back from a vertical door line, pulling toward it.
- **superman** = prone, chest & arms & legs lifted off the floor.
- **glute bridge** = supine, hips driven up, shins vertical.

If the distinguishing feature isn't instantly readable in your render, the panel
fails review — fix it before moving on.

## 11. Render-verify loop (MANDATORY — do not trust coordinates)

Chrome headless: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`

1. Write a scratch HTML file in `/tmp` that embeds your SVG markup three times on
   a `#0E100D` background with the figure in `#C8FA4B`: (a) pose-a only, (b)
   pose-b only, (c) both overlaid. (Set `color:#C8FA4B` on a wrapper so
   `currentColor` resolves.)
2. Render it:
   ```
   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
     --headless=new --screenshot=/tmp/<name>.png \
     --window-size=1200,800 --hide-scrollbars file:///tmp/<file>.html
   ```
3. **Read the PNG with the Read tool and LOOK at it.** Does pose-a read as the
   start? pose-b as the end? Is the distinguishing feature unmistakable? Would a
   stranger name the exercise?
4. Iterate on coordinates until yes. Do not ship art you haven't looked at.

A ready-made scratch template is in `pushup.tsx`'s development; the quickest path
is to copy the reference file's `<svg>` body into the three slots.

## 12. Readability checklist (every panel must pass)

- [ ] Side-profile (or allowed front view); figure faces +x.
- [ ] Correct segment lengths (§3) — same person as the references.
- [ ] Ground line at y=110, opacity .25; figure stands/lies on it sensibly.
- [ ] Exactly two pose groups (`pose-a`, `pose-b`); both complete figures.
- [ ] Static scenery (ground, equipment, arrow) OUTSIDE the groups.
- [ ] Exactly one movement arrow, dashed, opacity .6, pointing a→b.
- [ ] Joint dots at the bending joints in both poses.
- [ ] Equipment present where the move needs it, opacity .5.
- [ ] **Distinguishing feature unmistakable** (§10).
- [ ] 3 cues, <=6 words, verb-first, external focus, setup→drive→finish.
- [ ] Rendered with Chrome and visually confirmed.
