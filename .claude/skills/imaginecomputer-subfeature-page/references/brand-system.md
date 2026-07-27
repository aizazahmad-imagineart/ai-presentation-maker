# Brand System

The base rules come from `Guidelines/GUIDELINES.md` (the ImagineMCP kit: monochrome,
navbar/footer behavior, type scale). This file documents **what this project added on
top of it** — the purple accent + liquid-glass system — which `GUIDELINES.md` alone does
not cover, and which is now the standard for every sub-feature page.

## Why there's a purple accent at all

`GUIDELINES.md` says the site is strictly monochrome with no colored accent. That rule
still governs the **chrome** — nav, footer, body text. But the actual ImagineArt brand
mark (`Guidelines/assets/imagine-logo.svg`) is a purple-to-pink gradient, and the real
`imagine.art/computer` page uses color throughout its content sections (colorful hero
art, pastel gradient toolkit cards). The resolution, confirmed live in this project:
**monochrome chrome, purple-accented content.** Don't relitigate this — it was an
explicit, deliberate call, not an oversight.

## Core palette (sampled from `imagine-logo.svg`)

```css
--color-accent-deep: #240e77;
--color-accent: #6d3ff6;        /* primary CTA / icon-chip purple */
--color-accent-hover: #5a2fe0;
--color-accent-light: #a189e1;
--color-accent-pink: #cc98f8;
--color-accent-soft: #f2c2fa;

--color-brand-from: #34195b;    /* gradient text/bg endpoints */
--color-brand-via: #6d3ff6;
--color-brand-to: #cc98f8;
```

Use via Tailwind utilities generated from these theme tokens: `bg-accent`,
`text-accent`, `from-accent`/`to-accent-pink` gradients, `.bg-brand-gradient` /
`.text-brand-gradient` for the 3-stop gradient.

**Never** introduce a different accent hue. If a new sub-feature "needs its own color,"
the answer is still purple — differentiate through content and imagery, not palette.

## Typography — unchanged from GUIDELINES.md

Google Sans Flex only, weights capped at `font-semibold` (600), Title Case headings
(`capitalize`), sentence-case body, mono/uppercase eyebrows. See `GUIDELINES.md` §2 for
the full rules — nothing about this changed.

## Liquid glass

Two card surfaces, chosen by what's *behind* the card, not by preference:

- **`.glass-card`** — `background: rgb(255 255 255 / 0.6)` + `backdrop-blur(24px)
  saturate(160%)` + a faint white border. Use when the card sits **over a blob/gradient
  background** and letting color bleed through is the point (feature cards, problem
  cards, showcase cards).
- **`.glass-card-dark`** — the same idea at `rgb(255 255 255 / 0.06)`, for cards on the
  dark purple-black gradient sections.
- **Do not** use either translucent variant when cards can visually **stack directly on
  top of other text content** (e.g. a card-deck/stack UI) — 60% opacity isn't enough to
  mask what's underneath and the text bleeds together illegibly. Use a near-opaque
  surface there instead (`bg-white/95 backdrop-blur-xl border border-border-primary`),
  confirmed the hard way in `StaggerTestimonials.tsx`.

## Ambient blobs

`.blob` utility (`border-radius: 9999px; filter: blur(64px);`) applied to absolutely
positioned, oversized, low-opacity colored divs (`bg-accent/25`, `bg-accent-pink/20`,
etc.) behind hero/feature/CTA content. This is the primary way color and depth enter an
otherwise white or near-black section — reach for 2–3 blobs per section that needs visual
richness, not a flat color fill.

## Dark sections

Never flat `#0d0d0d`. Use:

```css
background: linear-gradient(160deg, #0d0d0d 0%, #1a1030 55%, #0d0d0d 100%);
```

optionally layered with a faint white grid-line texture (`background-size` around
20–24px — bigger reads as cluttered against card borders, this was tuned down mid-project)
and 1–2 `.blob` accents in accent/accent-pink.

## Container & spacing rhythm

- `.container-page`: max-width 1240px, **horizontal padding only** (see
  `pitfalls.md` for why this is load-bearing, not stylistic).
- Section vertical rhythm: `py-24 md:py-32`. `py-16 md:py-24` was the original
  Guidelines-kit default and reads as squished for this richer, more spacious visual
  style — don't go back to it.
- Sections separate via `border-b border-border-primary` **plus** a background-color
  shift or blob decoration — a hairline alone isn't enough visual separation at this
  density of content.

## Icons

Phosphor (`@phosphor-icons/react`), `weight="regular"` by default. Feature/use-case icon
chips: `flex items-center justify-center rounded-full bg-gradient-to-br from-accent
to-accent-pink text-white` with a soft matching shadow
(`shadow-[0_4px_14px_rgba(109,63,246,0.35)]`) — this is the standard "here's a capability"
chip used throughout the page. Reuse it rather than a flat single-color chip.
