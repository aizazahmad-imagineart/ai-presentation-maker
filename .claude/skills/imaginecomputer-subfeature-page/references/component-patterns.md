# Component Patterns

## Reuse as-is, unchanged, across every sub-feature page

| Component | Path | Notes |
|---|---|---|
| `SiteNav` | `src/components/SiteNav.tsx` | Update `NAV_LINKS` anchors to match the new page's section ids. Logo/CTA behavior stays identical. |
| `SiteFooter` | `src/components/SiteFooter.tsx` | Never changes per page. |
| `FaqSection` | `src/components/FaqSection.tsx` | Swap the data it reads (`src/lib/data/faq.ts`) per feature. Renders **closed by default** — don't pass `defaultOpen`. Emits FAQPage JSON-LD automatically. |
| `Button` / `ButtonLink` | `src/components/Button.tsx` | 4 variants: `brand` (purple gradient-shadow, the primary CTA), `ghost`, `white` (for on-dark secondary), `muted`. Never invent a 5th. |
| `Reveal` | `src/components/primitives/Reveal.tsx` | Scroll-reveal wrapper (blur+fade+translate in). Skips the animation for anything already in the viewport at mount — this is what stops the hero from blur-flashing on load. Use it on every section heading/card by default. |

## Reusable interaction primitives

### `SpotlightCard` (`src/components/primitives/SpotlightCard.tsx`)
A thin gradient ring that lights up near the cursor on hover, tracked via CSS custom
properties (`--spot-x`/`--spot-y`) set from `onMouseMove` — no layout thrashing. Wrap any
card that benefits from a "premium hover" moment; used on `UseCasesSection`'s persona
cards. Pass `glow` to recolor if ever needed, but default purple is standard.

### Marquee testimonials (pattern in `TestimonialsSection.tsx`)
Continuous slow auto-scroll, not a manual drag-scroller:
- Duplicate the data array once (`[...ITEMS, ...ITEMS]`) and render both copies in one
  `flex w-max` track — this is what makes the loop seamless at the `xPercent: -50%` mark.
- Apply the existing `.animate-marquee` class (defined in `globals.css`, `@keyframes
  marquee` from `translateX(0)` to `translateX(-50%)`) with a slow custom
  `animationDuration` (60s felt right for ~6 cards) via inline style.
- Pause on hover: `group` on the wrapper, `group-hover:[animation-play-state:paused]`
  on the track.
- Full-bleed + edge fade: wrapper is `w-full overflow-hidden` (not `overflow-x-auto` —
  it's animation-driven, not manually scrollable, and `-auto` risks a stray scrollbar),
  with a CSS `mask-image: linear-gradient(to right, transparent, black 6%, black 94%,
  transparent)` for the fade.
- Card background: a fixed pixel width (`w-[320px] sm:w-[360px] shrink-0`), not the
  `team-card-item` clamp utility (see `pitfalls.md` for why mixing that utility with
  per-breakpoint width overrides is fragile).

### Staggered card-deck alternative (`StaggerTestimonials.tsx`)
A click-to-cycle stacked deck (front card visible, 3 more peeking behind at decreasing
scale/opacity/rotation), inspired by 21st.dev's "Stagger Testimonials." Currently kept on
this page **specifically as a side-by-side comparison** against the marquee — pick one
approach per new page, don't ship both unless you actually want the comparison. **Lesson
learned building this**: the front card must use a near-opaque background
(`bg-white/95 backdrop-blur-xl`), not `.glass-card` — at 60% opacity the stacked cards'
text bleeds through the front card and becomes unreadable clutter. Any UI where content
sits directly behind other content (not a colorful blob) needs the opaque treatment.

### Illustrative "editing capability" mockups (`FeatureMocks.tsx`)
Small canvas-free, pure-CSS/SVG mockups that make an abstract feature claim tangible:
selection-handle corners (4 small squares at a bounding box's corners), a drag-cursor
glyph, floating status chips ("Reordering…", "Applied to all slides", "3 slides"). Built
as one `MockPanel` wrapper + one bespoke mini-layout per feature card. Use this pattern
instead of a plain icon+text card whenever a feature is fundamentally about *editing* or
*transforming* something — it reads far more convincingly than an icon.

### GSAP horizontal magnify gallery (`ShowcaseSection.tsx`)
For a "browse several outputs" section that deserves more than a static grid: the row
pins full-bleed (edge-to-edge, not `.container-page`) via `ScrollTrigger({pin: true,
scrub: true})` while page-scroll drives every card through the viewport; each card
individually scales 1→2→1 as it crosses center using a **per-card ScrollTrigger keyed to
`containerAnimation: masterTween`** (GSAP's technique for linking child triggers to a
horizontal master tween's timeline instead of real scroll pixels). Read the full
implementation before reproducing this — the `containerAnimation` + `start:'left right'`
/ `end:'right left'` positions are exactly tuned so the timeline midpoint always lands on
a card's center crossing the viewport's center, regardless of card/viewport width. See
`pitfalls.md` for the sizing/measurement traps hit building this.

### Decorative Three.js background (`TunnelBackground.tsx`)
A slow, continuously-looping 3D tunnel (adapted from
[thebuggeddev/delphi](https://github.com/thebuggeddev/delphi)) used behind the Final CTA.
Key adaptation points if reused elsewhere:
- Runs on a constant per-frame increment (`camera.position.z -= SPEED`), **not** tied to
  `window.scrollY` like the original — this is ambient decoration, not a scrollytelling
  hero.
- Textures are drawn on an offscreen `<canvas>` at runtime in the brand palette (small
  "slide" mockups), then wrapped in `THREE.CanvasTexture` — **never** pull in external
  stock-photo URLs the way the original does.
- Mount it as an `absolute inset-0` layer with `alpha: true` on the renderer, sitting
  **behind** the section's real text content, with a scrim (`radial-gradient` dark
  overlay) between the canvas and the text for contrast insurance. It must never replace
  or obscure the actual copy — it's decoration, full stop.
- Segments recycle (reposition + repopulate) as they pass out of camera view, so it loops
  indefinitely without a visible reset.
- Heavy for a small decorative touch — use sparingly (this page uses it in exactly one
  section) and skip it entirely on a page that doesn't have a strong "closing moment" to
  justify the weight.

## Shared CSS utilities (`src/app/globals.css`)

`.glass-card` / `.glass-card-dark`, `.blob`, `.bg-brand-gradient` / `.text-brand-gradient`,
`.animate-marquee` (+ `@keyframes marquee`), `.bleed-scroller`, `.team-card-item`,
`.reveal` / `.reveal-visible` (+ direction variants). Read `brand-system.md` for what each
is for before reaching for a new custom class — most needs are already covered.
