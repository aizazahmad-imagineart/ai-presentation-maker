# Page Architecture

The proven section order, in the order they appear on `AI Presentation Maker`. This is a
narrative arc (Hook → Proof → How it works → Depth → Belonging → Social proof → Objection
handling → Close) — treat it as the default skeleton for any sub-feature page, and only
deviate when the feature's own content genuinely doesn't fit a section, not by default.

1. **Nav** (`SiteNav`, unchanged) — fixed, transparent-to-glass-pill on scroll.

2. **Hero** — eyebrow pill (glass, small Sparkle icon), big Title-Case H1 with one word
   in the brand gradient (`.text-brand-gradient`) or muted (`text-black/35`), one-sentence
   subhead, primary CTA (`variant="brand"`) + secondary ghost CTA linking to the proof
   section, micro-copy ("No design skills or credit card needed" — adapt per feature),
   floating annotation chips (small glass circles with a Phosphor icon + tiny triangle
   pointer, `hidden lg:flex` since they clutter mobile), dot-grid + blob background.
   **The "try it" bar is a real, focusable `<input>`, not static placeholder text** —
   clicking it must let the user type, and ideally the typed value flows into the CTA
   link as a query param. Don't ship a fake, unclickable hint.

3. **Problem** — name the pain *before* the pitch. Eyebrow "The Problem", a two-line
   heading (muted rhetorical question, then a bold statement), 3 cards each with a
   bold lead-in phrase + one supporting sentence, small gradient stacked-square glyph.
   Synthesize this from pain points already implied in the feature's other copy if it
   isn't given explicitly — don't skip it just because it wasn't handed to you outright.

4. **Showcase / Proof** — "see it at work." If real product screenshots exist, use them.
   If not, build clearly-fake, clearly-labeled illustrative mockups (a title bar +
   gradient content block + caption like `Generated from: "..."`) and say explicitly
   that they're placeholders pending real assets — never present a fabricated mockup as
   a real screenshot. For a feature where "browsing multiple results/outputs" is core to
   the story, consider the scroll-driven horizontal gallery pattern (see
   `component-patterns.md` → GSAP horizontal magnify gallery) instead of a static grid.

5. **How It Works** — 3 numbered step cards (Describe/Upload → Generate → Refine/Export,
   or whatever the feature's actual 3-step flow is). Index number top-left, gradient
   icon chip top-right, title + one-sentence body.

6. **Features** — a bento grid of the core capabilities (2 full-width + 2 half-width is
   the established rhythm, but let content density decide), each card with a gradient
   icon chip, title, body, **and a small illustrative "editing capability" demo panel**
   (selection handles, a drag-cursor glyph, a floating status chip like "Reordering…" or
   "Applied to all slides") — this made the abstract capability claims resonate far more
   than icon+text alone. If the feature has a distinct "engine" or standout sub-capability
   cluster (e.g. the generative media engine here), give it its own deeper dark purple
   sub-band nested inside this section rather than a fifth bento cell.

7. **Use Cases** — persona/vertical grid (who is this for), dark purple-black gradient
   background, gradient icon chips, optionally with the cursor-tracked spotlight hover
   glow (`SpotlightCard`) for extra polish. Base the persona list on the feature's actual
   target users — don't reuse the presentation-maker personas verbatim.

8. **Testimonials** — prefer the **continuous marquee** pattern (slow auto-scroll,
   pause on hover, full-bleed, edge-fade mask) over a manually-dragged horizontal
   scroller — it reads as more alive and needs zero user interaction to appreciate.
   Keep the heading in `.container-page`, let the marquee track itself bleed full width.

9. **FAQ** — reuse `FaqSection` as-is, **accordion closed by default**. Update the
   `FAQ` data array (`src/lib/data/faq.ts`) per feature; keep the FAQPage JSON-LD.

10. **Final CTA** — dark purple-black gradient band, heading with one gradient/muted
    word, one-sentence subhead, single primary CTA, micro-copy. A decorative background
    effect (blob glow, or something more ambitious like the 3D tunnel — see
    `component-patterns.md`) is welcome here since it's the last thing someone sees, but
    it must be **strictly background**: never replace, obscure, or compete with the
    actual CTA text. Add a scrim behind the text if the effect is busy.

11. **Footer** (`SiteFooter`, unchanged).

## When to deviate

- Missing a natural "Problem" angle → still add one; nearly every feature has a "this
  used to be slow/inconsistent/manual" framing somewhere in its other copy.
- Two feature clusters that don't share a natural single heading → two separate Features
  sub-sections (bento + dark band) is the established pattern, already used once.
- No real customer testimonials yet → don't fabricate quotes or stats. Say so and ask,
  same as was flagged for the placeholder showcase mockups on this page.
