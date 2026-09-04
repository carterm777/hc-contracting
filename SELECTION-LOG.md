# Selection log — HC Contracting

Design system: `section-style-repo-animation+`. Every section ran the full
three-phase process (layout → visual style → animation) against the real
reference files, plus `image-and-visual-richness.md` and
`animation-and-motion-richness.md`.

Direction: **bold-geometric**, ambition level **maximal-and-layered**.
The whole design idea, per `DIRECTION.md`: Six Caps only works enormous, so the
oversized condensed headline stack *is* the identity. Two blues, black, white,
and Source Sans Pro doing all the quiet work.

---

## Step 0 — Page inventory

| # | Section | Type file used | Real imagery | Notes |
|---|---|---|---|---|
| 1 | Header (subheader + centred nav + call) | navigation | wordmark only | fixed by brief |
| 2 | Hero + photo-diagnosis widget | hero / interactive + forms | `home-hero` | fold constraint governs |
| 3 | Google Reviews | social-proof | none (type + Google mark) | fixed position |
| 4 | Trust Badges Banner | credibility | none (4 Lucide icons) | fixed position |
| 5 | Why Us | value-proposition | none (4 Lucide icons) | deliberate text/numeral slab |
| 6 | Services | services | 6 photos, one per service | photo-led |
| 7 | Service Area / Coverage | location | none (custom SVG schematic) | 10 towns |
| 8 | Our Story | about-story | `about-crew` | pull-quote moment |
| 9 | FAQ | faq | none | dense Q/A — text by decision |
| 10 | Final CTA | calls-to-action + forms | `flatlay-materials` | last conversion push |
| 11 | Footer | footer | none | 4 columns, fixed by brief |
| 12 | Mobile sticky call bar | calls-to-action | none | call-only |

Ambition is spent unevenly on purpose: the photo-diagnosis widget, the Services
mosaic and the Coverage schematic carry the weight; FAQ and the reviews grid stay
disciplined so the page has somewhere to rest.

### Type & colour notes
- **No font substitution needed.** The brief's *Six Caps* (400) and *Source Sans
  Pro* (400/600/700) both resolve on the Google Fonts CSS2 API — verified with a
  live request (HTTP 200, real `@font-face` blocks). Fallback for Six Caps is a
  condensed system stack (`Oswald`, `Arial Narrow`) so pre-swap layout is close.
- **Palette is the brief's fixed five.** `tokens.css` adds only tints/shades of
  those five (no new hues) plus four *platform* colours — Google blue/red/yellow/
  green and the Google review-star gold — used only inside the Google Reviews
  block, where recolouring them would break the one job that section has.
- **Type scale:** a five-step Six Caps display ramp (`--fs-d0`…`--fs-d4`) plus a
  dedicated oversized-numeral step and a widget step-numeral step, against a
  nine-step Source Sans body ramp. Hierarchy in the display face comes from size
  and tracking only — Six Caps has one weight.
- **Meta description** is the brief's sentence plus a two-word tail ("No
  runaround.", the brief's own vocabulary) to reach exactly 160 characters; the
  brief's own text is 146 and the spec requires 150–160.

### One build-level deviation
`src/lib/motion.js` and my `src/lib/hcmotion.js` contain JSX. Vite 5 only routes
`.jsx`/`.tsx` through the JSX loader, so a production build of the kit as shipped
fails at import-analysis. Rather than edit `vite.config.js` (which the brief says
to leave alone), both files were renamed to `.jsx`. Contents are unchanged.

---

## Sections

### 1. Navigation — Header
- **Layout:** Standard Horizontal Nav Bar, centred *(assigned)*. Beats Mega Menu
  Dropdown Nav on that entry's own Avoid-when — this is a one-page site, so a
  mega menu would be "empty scaffolding"; the two dropdowns it does need are
  panels hung off a standard bar instead.
- **Visual style:** Bold Color-Block Nav Bar *(assigned)*, `bold-geometric` —
  black contact band stacked on a deep brand-blue nav band, so the top edge of
  the page is a colour block rather than a white strip with links in it.
- **Animation:** Underline Grow on Hover (per link, 240ms scaleX from left) +
  Nav Background Fade-In on Scroll, inverted: instead of fading in, the contact
  band collapses to zero height past 24px and the bar gains elevation. Elevation
  pass added CTA Button Magnetic Hover (3px pull) on the header call button.
- **Element sequence:** no entrance (present at first paint). Resting-state
  behaviours: link underline sweep, panel link inset-on-hover, magnetic CTA,
  brand rule colour shift. Reduced motion: transitions collapse via `motion.css`.
- **Mobile:** no hamburger. A scrollable link rail sits under the bar and
  collapses to zero height on first scroll, leaving wordmark + click-to-call.

### 2. Hero
- **Layout:** Asymmetric Layered Hero *(assigned)*. Four layers: white ground →
  photographic field bleeding off the right edge → bright-blue corner block →
  the brand-blue widget panel sitting on the field. Beats Split-Screen Hero
  because a 50/50 split gives the photo weight the fold constraint cannot spare.
- **Visual style:** Editorial Typographic Overlap *(assigned)* + **Image with
  Color-Block Corner Accent** (featured technique, use 1 of 2) + Full-Bleed
  Background Photo with Foreground Card for the field itself.
- **Animation:** Staggered Load-In *(assigned)*, trigger `load` because nothing
  above the fold will ever receive a scroll event.
- **Element sequence / motion budget (6 groups):**
  1. `0ms` eyebrow + Conduit Rule (custom technique 2)
  2. `180ms` H1, line-by-line Clip Reveal, 120ms between lines (custom technique 1)
  3. `420ms` widget panel, load-rise
  4. `560ms` subheadline, load-rise
  5. `680ms` the four value badges as one unit
  6. `800ms` CTA pair as one unit; `940ms` the service-area rail
  Resting state: Voltage Sweep on both buttons (custom technique 3), Button
  Magnetic Hover on the call button. Elevation pass added Layered Parallax Drift
  at 0.06 on the field photo (desktop only, flattened below 900px and under
  reduced motion by `useParallax`). Reduced motion: `[data-load]` and the clip
  lines resolve instantly.
- **Fold:** H1 (3 lines) + subheadline + 4 badges + click-to-call + Services CTA
  + widget all clear 1440×900 and 390×844 with zero scroll.
- **Deviation:** the hero does not carry the `.section` class. Its vertical
  rhythm is dictated by the fold constraint, not the page rhythm, so it owns its
  own padding rather than overriding `base.css`.

### 2b. Photo-diagnosis widget — the signature element
- **Layout:** Multi-Step Form (`forms`) over Quiz or Assessment Widget
  (`interactive`). Three gated steps — 01 The Photo / 02 The Problem /
  03 The Callback — rather than one tall column. This is the decision that makes
  the fold constraint survivable on a 390px phone, and it is also the better
  form: three short asks convert better than one long one.
- **Visual style:** Bold Color-Blocked Interactive Panel *(assigned)* — solid
  brand-blue block, black strip across the top carrying an oversized condensed
  step numeral, white boxed inputs, zero border radius anywhere.
- **Animation:** Step-by-Step Reveal (pane clip-rises on each step change) +
  Multi-Step Progress Bar Transition (the strip's bottom rule *is* the three
  segment meter) + Field Focus Highlight + Success State Confirmation. Custom
  technique 4, **Odometer**, drives the step numeral: a masked vertical reel of
  numerals that slides, so 01→02→03 reads as a mechanical counter rather than a
  text swap.
- **Element sequence:** the whole panel enters as one unit in the hero's
  load-in; inside it, one pane swaps for one pane, never two staggering.
- Reassurance microcopy is a permanent strip on the panel foot, not a caption.
  Success state repeats the phone number, receipts the submission, and offers
  click-to-call and reset.

### 3. Google Reviews
- **Layout:** Testimonial Card Grid *(assigned)*. Six equal tiles: the
  aggregate-rating callout is tile one, so the rating lives *inside* the grid
  rather than floating above it. Beats Testimonial Carousel — five short quotes
  scan faster than they rotate.
- **Visual style:** Star Rating Bold Color Accent *(assigned)*, `bold-geometric`.
  The aggregate tile is a solid brand block with white stars and an oversized
  Six Caps score; the five review tiles keep Google's own review gold and the
  four-colour Google mark, so the block reads as Google at a glance.
- **Animation:** Staggered Rise per tile (0.18 threshold / −12% rootMargin) +
  Star Rating Fill Animation on Scroll (one 70ms sweep, 0.25 threshold) +
  Counting Numerals on the aggregate score (1500ms, ease-out-expo, once).
  Hover: Magnetic Lift on the review cards (6px + shadow + top-rule colour).
- **Element sequence:** section head → aggregate tile → five cards at 40ms
  offsets; inside a card, avatar+name+meta+logo move as one unit, then the star
  sweep, then the quote. Reduced motion handled by `motion.css`.
- Marked as placeholder content with a labelled note under the grid.

### 4. Trust Badges Banner
- **Layout:** Certification Badge Wall, flattened to a single full-width row of
  exactly four.
- **Visual style:** Badge or Seal Bold Treatment *(assigned)* on a deep brand-blue
  band. Elevation pass replaced the outlined plates with solid bright-blue
  blocks — the entry's whole point is a confident anchor, and outlined plates
  were reading as four thin glyphs from a distance.
- **Animation:** Badge Fade and Scale-In on Scroll — title first (Clip Reveal),
  then the four badges stagger left to right at 110ms. Hover lifts the plate.
- **Element sequence:** title → badge 1..4, each badge's plate + label + note
  moving as one unit.
- All four icons (`BadgeCheck`, `MapPin`, `Award`, `ThumbsUp`) share one box, one
  stroke weight and one optical centre; labels carry a `min-height` so the notes
  sit on a common baseline whether the label wraps or not.

### 5. Why Us
- **Layout:** Numbered Reasons List *(assigned)* — the four reasons are a real
  01–04 sequence, arranged 2×2 so the section stays a slab rather than a ladder.
- **Visual style:** Oversized Number Typography *(assigned)*, `editorial` inside
  a `bold-geometric` page. The numerals are set at more than twice the heading
  size; this is the only place on the page Six Caps is used purely as ornament.
  Section is text-only **by decision**: four abstract claims have no honest
  photograph, and the black slab is the page's tonal counterweight.
- **Animation:** Sequential Reveal on Scroll + Underline Draw Animation on each
  item's rule (520ms, 260ms after the item lands) + **Cursor-Reactive Glow**
  across the slab. This is the page's single cursor-glow surface, per that
  entry's 1–2-per-page limit.
- **Element sequence:** head → item 1..4 at 120ms, each item's numeral + heading
  + rule + copy + icon plate moving as one unit, then a closing CTA band.

### 6. Services
- **Layout:** Full-Width Service Showcase *(assigned)* for the flagship, then a
  five-tile asymmetric mosaic for the rest.
  **Deviation, with reason:** six full-width bands trips that entry's own
  Avoid-when ("many services need covering, since full-width bands add
  significant scroll length") — six bands would have added roughly 3,000px of
  desktop scroll. The showcase treatment is therefore spent once, on Mobile
  Electrical Service Calls, which is the service that actually differentiates
  this business. The other five keep the same photo-led caption-overlay visual
  style in a Grid-Breaking Oversized Image mosaic (2-wide, 1, 1 / 2-wide,
  2-wide), which is what the assigned treatment lost against.
- **Visual style:** Full-Photo Card Background with Text Overlay (the brief's
  "Bold Caption Overlay" resolved to the real entry of that shape) +
  Grid-Breaking Oversized Image.
- **Animation:** Staggered Grid Fade-In on Scroll + Image Zoom on Hover (1.07,
  900ms ease-out-quart) + a caption rule that grows and a bright-blue corner
  arrow that clip-wipes in. Elevation pass added Slow Ambient Drift to the
  flagship band's photograph — the page's only continuous background motion.
- **Element sequence:** split head (title, then lede) → flagship band as one
  focus-pull unit → tiles 1..5 at 90ms in reading order → closing CTA block.

### 7. Service Area / Coverage
- **Layout:** Service Area List or Coverage Zone Grid *(assigned)* — the ten
  named communities as a real two-column list beside a schematic.
- **Visual style:** Industrial Grid Coverage Map *(assigned)*,
  `industrial-utilitarian` — a drafting-table plot with a fine grid, dashed range
  rings, spokes from the hub, and *square* nodes, because every other mark on
  this page is square. Drawn as inline SVG plus positioned HTML labels so the
  type stays crisp.
- **Animation:** Depth Settle on the plot + **Coverage Zone Highlight on Hover**,
  cross-linked in both directions (hovering a town in the list lights its node
  and its spoke, and vice versa). Elevation pass added Sequential Line Draw: each
  spoke draws outward from the hub, `pathLength="100"` so the stroke maths is
  independent of the schematic's aspect ratio, with the node marks and labels
  arriving behind them. Explicit reduced-motion fallback written for all three.
- **Element sequence:** eyebrow+title → body copy → area list → CTA strip on the
  left; on the right the plot settles, then spokes at 65ms, then nodes at 55ms.

### 8. Our Story
- **Layout:** Values-Led Story Block *(assigned)* — the narrative resolves into
  the three principles the client's own copy names ("name the problem straight,
  fix it properly, and skip the runaround"), rather than a fabricated timeline.
- **Visual style:** Bold Pull-Quote Colour Block (the brief's phrasing; the
  matching real entry is Editorial Pull-Quote Typography, executed as a colour
  block) + **Image with Color-Block Corner Accent** (featured technique, use 2 of
  2) + a black date plate hung off the photo's bottom edge.
- **Animation:** Staggered Rise per paragraph, Pull-Quote Fade and Scale-In as
  its own beat after the surrounding prose settles, value rules drawing in, and
  the media column pinned (Story Section Sticky Scroll Progress) on desktop only.
- **Element sequence:** photo (settle) → eyebrow+title → paragraph 1 → pull-quote
  as a standalone beat → paragraphs 2–3 → three value cards at 110ms.

### 9. FAQ
- **Layout:** Grid of Question Cards *(assigned)* — six short answers in a
  two-column card grid rather than one long stacked list.
- **Visual style:** Boxed Card Accordion *(assigned)*,
  `industrial-utilitarian` — square corners, a heavy left rule that turns brand
  blue when open, elevation only on hover. **Text-only by decision**: six dense
  Q/A pairs are exactly the case `image-and-visual-richness.md` names as the
  honest exception, and the section is the page's quiet beat before the CTA.
- **Animation:** Accordion Expand and Collapse with height transition
  (`grid-template-rows: 0fr → 1fr`, 380ms) + Icon Morph (a plus rotating 180°
  into a minus) + Staggered Fade-In on Scroll per row. Collapsed panels are
  `visibility: hidden` on a delay so they stay out of the accessibility tree.
- **Element sequence:** split head → question rows top to bottom at 90ms, each
  row's text + icon as one unit.

### 10. Final CTA
- **Layout:** Split CTA with Form *(assigned)* — the ask on the left, a
  three-field estimate request on the right, so the page ends with both a call
  and a capture. Click-to-text sits beside click-to-call.
- **Visual style:** Bold Color-Blocked Banner *(assigned)* + Duotone Background
  Wash Behind Photo — the materials flat-lay sits at 16% under a heavy brand wash
  so it reads as texture, not as a competing image — plus an oversized ghosted
  "FIXED" bleeding off the bottom-left.
- **Animation:** Staggered Rise per group, Success State Confirmation on submit,
  Field Focus Highlight on every input. Elevation pass added Button Magnetic
  Hover on the primary call button, matching the hero's.
- **Element sequence:** eyebrow+rule → title (Clip Reveal) → lede → CTA pair as
  one unit → reassurance line → the form panel as its own unit.

### 11. Footer
- **Layout:** Mega Footer *(assigned)* — four columns exactly as the brief
  specifies, plus a base row.
- **Visual style:** Bold Color-Block Footer *(assigned)*, **resolved to black
  rather than blue**. That entry's Avoid-when is "that same bold colour has
  already been used heavily elsewhere on the page" — brand blue already carries
  the trust band, the widget, the pull-quote and the final CTA, so the bold block
  here is the palette's other absolute.
- **Animation:** Link Column Staggered Fade-In on Scroll, one group per column
  at 110ms, left to right. Hover: Underline Sweep on every link, plus a lift and
  colour inversion on the social marks.

### 12. Mobile sticky call bar
- **Layout:** Sticky or Floating CTA Bar, call-only.
- **Animation:** Sticky Bar Slide-In on Scroll Threshold — appears past 420px,
  the whole bar as one unit, nothing staggering inside it. Hidden above 900px and
  above the fold so the hero screenshot stays clean; `tabindex` is removed while
  it is off-screen.

---

## Site-specific motion techniques (required: at least three)

1. **Line-by-line Clip Reveal** (`.hcx-line__in`) — the kit's Clip Reveal masks a
   whole block. This masks each line of a Six Caps stack horizontally and
   staggers them at 110–120ms, which is the only way an eight-word condensed
   stack reads as being *uncovered* rather than wiped. Used on the H1 and every
   H2. Reduced motion: `clip-path: none`, no transition.
2. **Conduit Rule** (`.hcx-rule`) — Sequential Line Draw with a square terminal
   that lands 520ms after the line: a junction box at the end of a conduit run,
   which is what this trade actually looks at. Used on every eyebrow.
3. **Voltage Sweep** (`.btn::before`) — Underline Sweep rebuilt as a colour
   block: the inverse colour clip-wipes across the button from the left on
   hover/focus and the label inverts with it, because this page's language is
   colour blocks, not underlines.
4. **Odometer** (`.hcx-odo`) — Step-by-Step Reveal expressed as a masked vertical
   numeral reel in the widget's black strip, so the step number physically
   travels rather than swapping.

Plus `useMagnet`, a small (3–4px) Button Magnetic Hover honouring that entry's
premium-execution note about keeping the pull tiny.

---

## Pass 1 — Elevation sweep

| Section | Change | Why |
|---|---|---|
| Header | Added CTA Button Magnetic Hover (3px) | The one nav element that should feel alive was inert under the cursor. |
| Hero | Added Layered Parallax Drift (0.06) on the field photo; gave the image 18% extra height so the drift never exposes an edge | The layout is explicitly a layered composition; that entry exists to activate exactly this. Desktop-only, flattened under reduced motion. |
| Hero | Removed the ghosted "EDMONTON" behind the H1; added a bottom service-area rail instead | Chanel's rule. The ghost word fragmented around the headline and read as an artefact; the rail fills the same dead space with something a local visitor actually wants. |
| Reviews | Card foot ("Verified on Google") pinned with `margin-block-start:auto`; avatar initials moved from Six Caps to the body face | Left as-is on motion — already carries three techniques. The empty pockets under short quotes were the flatness, not the animation. Six Caps at 25px produced a 7px-wide letter. |
| Trust banner | Outlined icon plates → solid bright-blue blocks; title up a step with a rule; labels given a shared `min-height` | Badge or Seal **Bold** Treatment — the first pass executed it thin. |
| Why Us | Icon moved out of the text column into a bordered plate at the row's right edge; numerals up 15% | Fixed a stacked icon-over-heading pocket and gave each row left-to-right tension. |
| Services | Slow Ambient Drift on the flagship band photo; split head (title left, lede right) | The band is the page's biggest still image and had no life. The head was centring itself because `.shell` and a `max-width` sat on the same element. |
| Coverage | Sequential Line Draw on the spokes, plus staggered node marks and labels | A technical schematic that assembles itself is the single most premium thing the section can do; the first pass only settled the container. |
| Story | Corner accent tucked inside the photo instead of floating clear of it; plate label re-ordered above the year; pull-quote hard-split into two balanced lines | The technique is "tucked into one corner", not "floating beside it"; "DO." was orphaned on its own line. |
| FAQ | Split head only | Already at appropriate ambition: this is the page's deliberate quiet beat and the content does not support more. |
| Final CTA | Button Magnetic Hover on the call button; ghost word opacity 0.07 → 0.10 | Matches the hero's primary CTA; the ghost was invisible enough to read as a smudge. |
| Footer | Left as-is | Already at appropriate ambition — column stagger plus per-link sweep is the right load for a sitemap. |

## Pass 2 — Coherence sweep

Read the whole page again after Pass 1 landed.

- **Background rhythm holds.** white → paper → deep blue → black → white (with
  dark photo bands) → mist → white → paper → brand blue → black. No two adjacent
  sections share a ground.
- **Head compositions vary deliberately:** stacked (Reviews, Why), split with a
  rule (Services, FAQ), in-column (Coverage, Story, CTA). Reviews and Why are
  both stacked but sit either side of the trust band.
- **Motion budget checked and accepted.** One continuous ambient effect on the
  page (the Services band). One cursor-glow surface (Why Us). One count-up
  (Reviews). Magnetic hover appears three times, always on the same primary
  click-to-call, which reads as consistency rather than scatter. The Clip Reveal
  on every H2 is the deliberate signature repeat, not a variety failure.
- **Walked back:** nothing from Pass 1 made the page busier. The one thing
  removed in Pass 1 (the hero ghost word) stayed removed — the Final CTA's ghost
  "FIXED" is enough of that device for one page.
- **Left flat on purpose:** FAQ (dense Q/A, the honest text-only case) and Why Us
  (four abstract claims with no honest photograph; the black slab is the page's
  tonal counterweight).
- **Repeated CTA family:** four in-page CTA blocks (Why Us band, Services foot,
  Coverage strip, FAQ foot) plus the header, hero, final CTA and sticky bar. They
  share one construction — a block with a heavy left rule, or a display line with
  a button — retuned per background tone. Kept as a family rather than flattened
  to one, because a black band and a mist block cannot take the same treatment.
- **Accessibility pass:** the focus ring default moved from bright blue to ink
  (most surfaces are white or brand blue), with dark bands flipping to bright
  blue, so the ring never disappears into its own background. Verified by tabbing
  40 stops — every focusable element resolves to a 2px solid outline.

---

## Verification

- `shot.mjs`: 1 `<h1>`, no heading skips, no horizontal overflow at 390 or 1440,
  no missing alt, no broken images, robots + title + 160-char description
  present, 11 `tel:` and 2 `sms:` links, no console errors, no failed requests.
- Overflow re-checked independently at 360 / 390 / 414 / 600 / 768 / 900 / 1024 /
  1280 / 1440 / 1600 / 1920 — `scrollWidth === innerWidth` at every one.
- Reduced-motion render checked with `prefers-reduced-motion: reduce` emulated:
  nothing stays hidden, clipped or zero-opacity.
- Widget states (step 2, step 3, submitted) captured and reviewed.
- Fold constraint verified in `_shots/desktop-fold.png` and
  `_shots/mobile-fold.png`.
