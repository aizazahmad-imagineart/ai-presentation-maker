# Page Architecture

The proven section order, in the order they appear on `AI Presentation Maker`
(`src/app/page.tsx`). This is a narrative arc (Hook → Problem → Proof → How it works →
Depth → Belonging → Social proof → Objection handling → Close) — treat it as the default
skeleton for any sub-feature page, and only deviate when the feature's own content
genuinely doesn't fit a section, not by default.

1. **Nav** (`SiteNav`, unchanged) — fixed, transparent-to-solid-pill on scroll.

2. **Hero** (`Hero.tsx`) — small eyebrow pill (plain border, tiny Sparkle icon), big
   Title-Case H1 with one short phrase in italic Instrument Serif
   (`font-serif-accent italic font-normal normal-case`), one-sentence subhead, a single
   real focusable "try it" input bar (`<input>` + `Generate` button that carries the typed
   value into the CTA link as a query param — **not** a fake unclickable hint, and **not**
   a pair of separate CTA buttons; the current page intentionally dropped the two-button
   layout in favor of just the input bar). Below the text: a real product screenshot,
   presented as a "product video" — pinned via `position: sticky` inside a tall track and
   scroll-linked scaled up toward full-bleed then released (see `component-patterns.md` →
   scroll-linked pin-and-zoom). Optionally, one small signature accent moment (e.g. two
   Sparkle marks in the sanctioned accent orange, flanking the headline at a slight tilt,
   `hidden lg:block` since they clutter mobile) — see `brand-system.md` for the one-accent
   rule. Keep vertical spacing tight enough that the product visual is visible near the
   fold; don't let hero text padding push it fully below it.

3. **Problem** (`ProblemSection.tsx`) — name the pain *before* the pitch, as a plain
   editorial numbered list (`01`/`02`/`03` in mono, no cards/icons/backgrounds), each point
   a bold lead-in phrase + one supporting sentence. `border-t border-border-secondary`
   only for separation. Synthesize this from pain points already implied in the feature's
   other copy if it isn't given explicitly — don't skip it just because it wasn't handed
   to you outright.

4. **Showcase / Proof** (`ShowcaseSection.tsx`) — "see it at work," on a dark
   (`bg-[#0a0a0a]`) full-bleed band. A plain grid (`grid-cols-2 md:grid-cols-3`) of real
   example-output images (deck covers, generated results — whatever the feature actually
   produces), each in a generous `aspect-[4/3]` cell with a subtle hover lift. **Only use
   real assets here** — if none exist yet, say so and ask, don't fabricate a mockup (see
   `pitfalls.md` #7).

5. **How It Works** (`HowItWorks.tsx`) — a two-column layout: steps in normal flow on the
   left (index number, title, one-sentence body, mono step counter), a `position: sticky`
   real-screenshot visual on the right that swaps images as the user scrolls past each step
   (see `component-patterns.md` → sticky step-through visual). Mobile falls back to an
   inline screenshot under each step. 3-4 steps is the established range — use however many
   the feature's actual flow needs, don't pad or compress to hit a specific count.

6. **Features** (`FeaturesSection.tsx`) — the core capabilities, presented plainly (short
   heading + body per capability, real supporting imagery where it helps, no gradient icon
   chips). Let content density and the feature's own shape decide the layout — a plain
   grid, an alternating text/image layout, or a single strong image per capability are all
   fine; the through-line is monochrome, breathable, real imagery over icon+text filler.

7. **Use Cases** (`UseCasesSection.tsx`) — persona/vertical grid (who is this for). Plain
   cards (`bg-white border border-border-primary`), optionally with the cursor-tracked
   spotlight hover glow (`SpotlightCard`, default white glow) for extra polish. Base the
   persona list on the feature's actual target users — don't reuse the presentation-maker
   personas verbatim.

8. **Testimonials** (`TestimonialsSection.tsx`) — the **continuous marquee** pattern (slow
   auto-scroll, pause on hover, full-bleed, gradient-div edge fade — not `mask-image`, see
   `pitfalls.md` #3) over a manually-dragged horizontal scroller — it reads as more alive
   and needs zero user interaction to appreciate. Keep the heading in `.container-page`,
   let the marquee track itself bleed full width. Only use real testimonials; if none exist
   yet, flag it rather than inventing quotes.

9. **FAQ** (`FaqSection.tsx`) — reuse as-is, **accordion open by default** (pass
   `defaultOpen` on every row — this is a deliberate reversal from an earlier
   closed-by-default version). Update the `FAQ` data array (`src/lib/data/faq.ts`) per
   feature; keep the FAQPage JSON-LD.

10. **Final CTA** (`FinalCta.tsx`) — plain dark (`bg-[#0a0a0a]` or near-black) band, heading
    with at most one muted/emphasized word, one-sentence subhead, single primary CTA,
    micro-copy. No blob glow, no 3D background — a decorative background effect is no
    longer part of the standard pattern here (the earlier version's Three.js tunnel
    background was removed entirely; don't reintroduce heavy decoration for this section
    unless specifically asked).

11. **Footer** (`SiteFooter`, unchanged).

## When to deviate

- Missing a natural "Problem" angle → still add one; nearly every feature has a "this used
  to be slow/inconsistent/manual" framing somewhere in its other copy.
- Two feature clusters that don't share a natural single heading → two separate `Features`
  sub-sections is fine, but keep both monochrome/plain — don't give one a colorful
  treatment to "differentiate" it.
- No real showcase imagery or testimonials yet → don't fabricate them. Say so and ask, same
  as was flagged for this page originally, and hold that section back until real assets
  arrive rather than shipping a placeholder mockup.
