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

**Read this file first, then load the reference file that matches what you're doing:**

| Reference | Read it for |
|---|---|
| [`references/brand-system.md`](references/brand-system.md) | Colors, typography, the monochrome+purple rule, glass/blob aesthetic, exact CSS tokens |
| [`references/page-architecture.md`](references/page-architecture.md) | The proven section order, what each section is *for*, and when to skip/merge one |
| [`references/component-patterns.md`](references/component-patterns.md) | Which components to reuse as-is, and the interaction patterns (marquee, spotlight hover, GSAP scroll galleries, tunnel backgrounds) with file references |
| [`references/pitfalls.md`](references/pitfalls.md) | Specific bugs hit while building this — read before touching `globals.css` or writing scroll-driven animation |
| [`references/inspiration.md`](references/inspiration.md) | The reference sites/components this whole direction was built from |

Also load, as needed:
- **`Guidelines/GUIDELINES.md`** — the base ImagineMCP brand kit (nav, footer, FAQ, typography/color rules). Still the source of truth for the monochrome chrome layer.
- **`.claude/skills/ui-ux-pro-max/`** — general UI/UX pattern database (styles, palettes, font pairings, GSAP snippets). Useful for domain searches (`--domain landing`, `--domain gsap`) but its color/font suggestions do **not** override this project's fixed brand system — treat it as a source of structural/motion ideas only.

## Workflow

1. **Get the inputs.** You need: the sub-feature's name and one-line positioning, the target
   audience, and content copy — ideally a PDF or doc laid out section-by-section like
   `AI Presentation Maker.pdf` was for this page. If copy isn't provided, ask for it before
   writing placeholder copy yourself; don't invent product claims.
2. **Don't re-litigate the brand system.** Monochrome chrome + purple accent, Google Sans
   Flex, glass/blob aesthetic, `.container-page` rhythm — all fixed by
   `references/brand-system.md`. Only ask questions that are genuinely new for this
   feature (e.g. "does this feature have a real demo screenshot yet, or do we need a
   placeholder mock again?").
3. **Map the copy onto the proven architecture** in `references/page-architecture.md`.
   If the provided copy is missing a section (most commonly the Problem section), flag
   it and offer to draft one from context, same as was done for this page — don't just
   silently omit it.
4. **Reuse shared components as-is**: `SiteNav`, `SiteFooter`, `FaqSection`, `Button`,
   `Reveal`, `SpotlightCard`. Build new page-specific sections following the same visual
   idioms already established (glass cards, blob backgrounds, gradient icon chips,
   marquee testimonials, etc.) rather than inventing new ones — consistency across
   sub-feature pages is the entire point of this skill.
5. **New page = new route in this same app** (e.g. `src/app/<feature-slug>/page.tsx`),
   reusing `src/app/globals.css` tokens and `src/components/*` — not a separate project —
   unless told otherwise.
6. **Before shipping**, run through `references/pitfalls.md` and do a real visual pass in
   a browser (desktop + mobile), same as this page's build process. Type-checking is not
   enough for this kind of visually-driven page.

## What "matching the visual language" means in practice

The bar isn't "looks similar" — it's "could sit in the same nav as AI Presentation Maker
without looking like a different product built it." That means: same font weights, same
purple gradient (not a new accent color), same card treatment (glass over blobs, or the
opaque variant when cards stack), same section rhythm and spacing, same icon library
(Phosphor) and chip style. If a genuinely new pattern is needed for this feature, build it
in the spirit of the existing ones (purple gradient, generous spacing, subtle motion) and
add it to `component-patterns.md` for the next person.
