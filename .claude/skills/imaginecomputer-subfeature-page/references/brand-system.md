# Brand System

The base rules come from `Guidelines/GUIDELINES.md` (the ImagineMCP kit: monochrome,
navbar/footer behavior, type scale). This file documents **what this project's second,
current iteration does on top of it** — a monochrome-first system with real imagery and at
most one sparing accent moment. An earlier purple/glass/gradient version existed first and
was reworked after reviewer feedback called it "conventional and AI-generic" (purple
overuse, squished fake product mockups, em-dash-heavy copy). Do not revive that system —
this file describes the current, correct one.

## Why (almost) no color

`GUIDELINES.md` says the site is strictly monochrome with no colored accent. The three
successful sibling pages this rebuild studied —
[ai-film-studio](https://www.imagine.art/ai-film-studio), [mcp](https://www.imagine.art/mcp),
[ai-fashion-studio](https://www.imagine.art/ai-fashion-studio) — mostly honor that: black,
white, greys, real photography/screenshots doing the visual work instead of a brand
gradient. Where they do use color, it's **one hue, used once or twice, deliberately** — not
a palette applied throughout every card and icon chip the way the earlier purple system did.

**The resolution for this page:** monochrome everywhere by default. If a page wants a single
"pop" moment (a small decorative flourish near the hero, one highlighted word), use the
legacy ImagineArt secondary orange below — sparingly, as a signature touch, never as a
recurring card/button/icon color.

```css
--color-accent-orange: rgb(251 86 7); /* #FB5607 — the only sanctioned accent, used sparingly */
```

**Never** introduce a new accent hue per feature, and never spread the accent across
buttons, icon chips, or card backgrounds — that's what made the previous version read as
generic. If it's used, it should be countable on one hand per page (e.g. two small
decorative Sparkle marks near the hero headline, as on the reference page).

Primary CTAs are plain monochrome: `bg-content-primary text-white hover:bg-black` (see
`Button.tsx`'s `brand` variant) — not a gradient, not the accent color.

## Typography

Google Sans Flex remains the only sans typeface, weights capped at `font-semibold` (600).
New in this iteration: **Instrument Serif** (italic only, via `next/font/google`,
`--font-serif-accent`) used for a single emphasis word or short phrase per heading — e.g.
"Drafted **in Minutes**" in the hero, "From text to **slides**" in How It Works. Apply as
`font-serif-accent italic font-normal` on a `<span>`, overriding the heading's `capitalize`/
tracking with `normal-case tracking-normal` on that span. This is the one place where a
different typeface is allowed — don't introduce a second display font anywhere else, and
don't use the serif for more than one short phrase per section.

Headings: Title Case (`capitalize`), tight tracking (`tracking-[-0.5px]` to
`tracking-[-1.5px]` depending on size). Body: sentence case, `text-content-secondary`,
generous line-height (`leading-[1.6]`–`leading-[1.75]`). Eyebrows: `font-mono text-[10.5px]
font-semibold tracking-[1.8px] uppercase text-content-tertiary`.

## Real imagery only, given room to breathe

The single biggest fix in this rebuild: **every product visual is a real screenshot or real
example output**, never a fabricated CSS/gradient mockup standing in for a UI. Real assets
live in `public/screenshots/` (actual product-flow screenshots) and `public/decks/` (real
example outputs, e.g. deck covers). Give them generous, near-full-width frames — a plain
`rounded-xl`/`rounded-2xl border border-border-primary` card with a soft shadow is enough
chrome; never scale a real screenshot down into a small template-sized box just to fit a
grid cell, that's exactly the "squished" complaint that triggered this rebuild. If a
feature doesn't have real assets yet, say so explicitly and ask for them rather than
faking a mockup — see `pitfalls.md` #7 and the SKILL.md "Real imagery only" rule.

## Surfaces

Plain, opaque surfaces only: `bg-white` cards with `border border-border-primary` (or
`border-border-secondary` for lighter internal dividers) and an optional soft shadow
(`shadow-[0_20px_48px_rgba(0,0,0,0.08)]` is the standard resting shadow for a lifted
product screenshot). **No glass/blur cards, no ambient color blobs, no colored gradient
backgrounds** — the earlier `.glass-card`/`.glass-card-dark`/`.blob`/`.bg-brand-gradient`
utilities have been removed from `globals.css`. Dark sections use a plain near-black
(`bg-[#0a0a0a]`), not a purple-tinted gradient.

## Container & spacing rhythm — unchanged, still load-bearing

- `.container-page`: max-width 1240px, **horizontal padding only** (see `pitfalls.md` for
  why this must stay longhand, not stylistic).
- Section vertical rhythm: `py-20 md:py-28` is the current standard (the earlier
  `py-24 md:py-32` was tuned down slightly once color/blobs stopped doing visual work and
  breathing room + real imagery needed to carry sections instead).
- Sections separate via a plain `border-b border-border-primary` hairline — no background
  shift, no blob decoration needed. If a section wants more separation, a dark
  (`bg-[#0a0a0a]`) background band is enough (see `ShowcaseSection.tsx`).

## Icons

Phosphor (`@phosphor-icons/react`), used sparingly and almost always monochrome
(`text-content-primary` or `text-content-tertiary`, `weight="regular"` or `weight="fill"`
for small filled marks like the hero eyebrow's Sparkle). **No gradient icon chips** — the
earlier `bg-gradient-to-br from-accent to-accent-pink` chip pattern is gone along with the
purple system. Most sections in the current architecture use zero icons at all, relying on
numbered indices (`01`, `02`, `03`) or real imagery instead — prefer that first.
