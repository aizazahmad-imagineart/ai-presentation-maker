---
name: imaginecomputer-subfeature-page
description: Build a new ImagineComputer sub-feature marketing/landing page (e.g. AI Resume Builder, AI Video Generator) that matches the AI Presentation Maker page's visual language, content architecture, and interaction patterns. Use whenever someone asks to create, build, or design a landing page for another ImagineComputer sub-feature, or asks to extend this site with a new feature page. Give it the feature's name and content copy (or a doc/PDF with the copy) — it runs the rest on its own using the design decisions already locked in from this session.
---

# ImagineComputer Sub-Feature Landing Page

This skill captures everything decided during the build of the **AI Presentation Maker**
page (`https://ai-presentation-maker-gilt.vercel.app`) — the reference implementation for
every ImagineComputer sub-feature marketing page. The goal: a teammate should be able to
hand over a feature name + content copy and get a finished, on-brand page back, without
re-deciding the visual system or re-discovering the same bugs.

**The visual direction is monochrome-first with real product imagery** — a deliberate
pivot away from an earlier purple/glass/gradient version that reviewers called
"conventional and AI-generic." Modeled on three successful sibling pages
([ai-film-studio](https://www.imagine.art/ai-film-studio),
[mcp](https://www.imagine.art/mcp), [ai-fashion-studio](https://www.imagine.art/ai-fashion-studio))
and [deck.gallery](https://www.deck.gallery/). Don't reach for the old purple/glass system —
it's documented in git history only, not something to revive.

**Read this file first, then load the reference file that matches what you're doing:**

| Reference | Read it for |
|---|---|
| [`references/brand-system.md`](references/brand-system.md) | Colors (monochrome + single accent), typography (Google Sans Flex + Instrument Serif italic accent), real-imagery rule, exact CSS tokens |
| [`references/page-architecture.md`](references/page-architecture.md) | The proven section order, what each section is *for*, and when to skip/merge one |
| [`references/component-patterns.md`](references/component-patterns.md) | Which components to reuse as-is, and the interaction patterns (marquee, sticky/scroll-zoom, spotlight hover) with file references |
| [`references/pitfalls.md`](references/pitfalls.md) | Specific bugs hit while building this — read before touching `globals.css` or writing scroll-driven animation |
| [`references/inspiration.md`](references/inspiration.md) | The reference sites this direction was built from, and what to take from each |

Also load, as needed:
- **`Guidelines/GUIDELINES.md`** — the base ImagineMCP brand kit (nav, footer, FAQ, typography/color rules). Still the source of truth for the monochrome chrome layer — and now much closer to how the whole page looks, not just the chrome.
- **`.claude/skills/ui-ux-pro-max/`** — general UI/UX pattern database (styles, palettes, font pairings, motion snippets). Useful for domain searches (`--domain landing`) but its color/font suggestions do **not** override this project's fixed brand system — treat it as a source of structural ideas only, and skip anything GSAP/Three.js-heavy (see pitfalls.md for why this project stays dependency-light).

## Workflow

1. **Get the inputs.** You need: the sub-feature's name and one-line positioning, the target
   audience, and content copy — ideally a PDF or doc laid out section-by-section like
   `AI Presentation Maker.pdf` was for this page. **Also ask for real product screenshots
   or output examples** — this direction depends on real imagery, not fabricated mockups
   (see "Real imagery only" below). If copy isn't provided, ask for it before writing
   placeholder copy yourself; don't invent product claims.
2. **Don't re-litigate the brand system.** Monochrome-first with at most one accent color
   used sparingly, Google Sans Flex + an italic serif for single emphasis words, real
   screenshots/imagery only, generous breathable spacing, `.container-page` rhythm — all
   fixed by `references/brand-system.md`. Only ask questions that are genuinely new for
   this feature (e.g. "does this feature have real screenshots yet, or real example
   outputs to show in a gallery?").
3. **Map the copy onto the proven architecture** in `references/page-architecture.md`.
   If the provided copy is missing a section (most commonly the Problem section), flag
   it and offer to draft one from context, same as was done for this page — don't just
   silently omit it.
4. **Reuse shared components as-is**: `SiteNav`, `SiteFooter`, `FaqSection`, `Button`,
   `Reveal`, `SpotlightCard`. Build new page-specific sections following the same visual
   idioms already established (plain editorial layouts, real imagery in generous frames,
   sticky/scroll-linked reveals, a single accent color used at most once or twice per
   page) rather than inventing new ones — consistency across sub-feature pages is the
   entire point of this skill.
5. **New page = new route in this same app** (e.g. `src/app/<feature-slug>/page.tsx`),
   reusing `src/app/globals.css` tokens and `src/components/*` — not a separate project —
   unless told otherwise.
6. **Before shipping**, run through `references/pitfalls.md` and do a real visual pass in
   a browser (desktop + mobile), same as this page's build process. Type-checking is not
   enough for this kind of visually-driven page.

## What "matching the visual language" means in practice

The bar isn't "looks similar" — it's "could sit in the same nav as AI Presentation Maker
without looking like a different product built it." That means: same font weights, same
restrained monochrome palette with at most one sparing accent color (not a new hue per
feature), real screenshots/output imagery given generous full-bleed treatment (never
squished into a small template box), the same editorial numbered-section rhythm, the same
icon library (Phosphor, used sparingly — most sections need none), and the same appetite
for less code over more decoration. If a genuinely new pattern is needed for this feature,
build it in the spirit of the existing ones (plain surfaces, real imagery, one confident
accent moment, generous whitespace) and add it to `component-patterns.md` for the next
person.

## Real imagery only — the single most important rule

Never fabricate product screenshots, stat numbers, customer logos, or quotes. If real
assets (screenshots, example outputs, testimonials) don't exist yet for this feature, say
so explicitly and ask for them — don't ship a CSS/gradient mockup dressed up as a product
shot. This was the #1 complaint that triggered the rebuild of the reference page; treat it
as non-negotiable for every page built with this skill.
