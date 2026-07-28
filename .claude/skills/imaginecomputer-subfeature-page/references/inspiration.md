# Inspiration & Reference Links

What actually shaped the **current** (monochrome-first) direction, and what to take from
each. This replaced an earlier purple/glass direction after reviewers called it
"conventional and AI-generic" — the earlier reference set (presentations.ai, storydoc,
replit, a Dribbble concept, manus.im, 21st.dev component demos, a Three.js tunnel repo) is
no longer the basis for new pages; the sites below are. Revisit these before inventing a
new visual idiom for a future page — the answer is usually "adapt one of these into the
current brand system," not "design something new."

| Reference | What to take from it |
|---|---|
| [imagine.art/ai-film-studio](https://www.imagine.art/ai-film-studio) | A successful sibling ImagineArt sub-feature page proving the monochrome-plus-real-imagery direction works at this scale. Reference for restrained color use and how real media (not mockups) can carry an entire section. |
| [imagine.art/mcp](https://www.imagine.art/mcp) | The direct inspiration for this page's engagement patterns: sections presented in a breathable, spacious manner; subtle parallax; sections that **stick while scrolling** rather than just fading in. Directly inspired the `HowItWorks` sticky step-through visual and the `Hero` scroll-linked pin-and-zoom effect — both built as plain CSS `position: sticky` + a small scroll hook, not a new dependency. |
| [imagine.art/ai-fashion-studio](https://www.imagine.art/ai-fashion-studio) | The "What you can shoot" section's full-screen treatment of real output examples — inspiration for `ShowcaseSection`'s full-bleed dark grid of real deck-cover images, given generous room instead of squished into small cards. |
| [deck.gallery](https://www.deck.gallery/) | Source of the real example-output images used in `ShowcaseSection` (`public/decks/`), and a reference for how a gallery of real, professionally designed artifacts photographs better than any fabricated mockup could. Also worth revisiting for section-layout ideas specific to a "gallery of outputs" page. |

## What changed vs. the earlier direction

The previous iteration of this skill was built around a purple-accent, liquid-glass,
blob-background system with GSAP ScrollTrigger galleries and a Three.js tunnel background,
inspired by presentations.ai, storydoc, replit, a Dribbble concept, manus.im, and two
21st.dev component demos. That system is preserved only in git history — it produced real
issues (purple overuse reading as generic AI-SaaS, product screenshots squished into small
glass cards, heavier dependency footprint) that the sibling-page study above was
specifically commissioned to fix. Do not pull design ideas from that earlier reference set
for new pages; if in doubt, prefer "less code, more real imagery, one accent color at most."

## Also load

- **`.claude/skills/ui-ux-pro-max/`** — the general design-intelligence skill (styles,
  palettes, font pairings, motion snippets). Good for structural ideas via `--domain
  landing` searches. Its color/typography suggestions and any GSAP/heavy-motion snippets
  are **not** authoritative for this project — this project's palette, type system, and
  "plain CSS over animation libraries" preference are fixed (see `brand-system.md` and
  `component-patterns.md`).
- **`Guidelines/GUIDELINES.md`** — the original ImagineMCP brand kit this whole system is
  layered on top of (monochrome rule, nav/footer behavior, base type scale) — now much
  closer to how the entire page looks, not just the chrome.
