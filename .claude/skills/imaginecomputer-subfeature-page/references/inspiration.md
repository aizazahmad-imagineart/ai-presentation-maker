# Inspiration & Reference Links

What actually shaped this direction, and what to take from each. Revisit these before
inventing a new visual idiom for a future page — the answer is usually "adapt one of
these into the existing brand system," not "design something new."

| Reference | What to take from it |
|---|---|
| [imagine.art/computer](https://www.imagine.art/computer) | The real sibling ImagineComputer page — ground truth that the brand is monochrome chrome + purple/colorful content, not strictly monochrome everywhere. Also has an actual "AI Slides" card in its toolkit grid worth checking for copy/positioning consistency. |
| [presentations.ai](https://www.presentations.ai/) | Hero structure (pill badge + centered headline + single CTA + product shot), a clean 2×3 feature grid, and a "Problem" section with isometric-block icons — the direct inspiration for adding the Problem section to this page's architecture. |
| [storydoc.com](https://www.storydoc.com/) | Restrained purple-as-the-only-accent execution: solid purple CTA buttons, one purple word inside an otherwise dark headline, a deep purple gradient trust-strip band instead of pure black. This is the closest external reference to "monochrome ink + one confident purple accent." |
| [replit.com](https://replit.com/) | Oversized rounded bento cards, blob-shaped testimonial carousel — reference for scale and confidence in card shapes. |
| [Clause — Contract Management Landing Page](https://dribbble.com/shots/23713828-Clause-Contract-Management-Landing-Page) (Dipa UI/UX) | Bold/confident scale, dotted-grid hero texture, floating circular avatar/icon chips with small pointer-triangle annotations, dark full-bleed "integration" band with logo tiles, product-screenshot-in-card features, centered pull-quote testimonial, stat strip. Directly inspired the Hero's floating annotation chips and the dark band pattern — reinterpreted at ≤ `font-semibold` weight and purple instead of lime, per the brand rules. |
| [manus.im/features/webapp](https://manus.im/features/webapp), [manus.im/solutions/marketing](https://manus.im/solutions/marketing) | Illustrated content + a functional-looking "editable canvas" panel overlay (selection handles, resize handles, floating "Suggest images ✨" control, drag-cursor annotation) — directly inspired `FeatureMocks.tsx`'s selection-handle + drag-cursor + status-chip pattern for making feature cards feel like real, editable software instead of static icon+text. |
| [21st.dev — Spotlight Card](https://21st.dev/@easemize/components/spotlight-card) | The cursor-tracked glow-ring hover pattern, adapted into `SpotlightCard.tsx`. |
| [21st.dev — Stagger Testimonials](https://21st.dev/@vaib215/components/stagger-testimonials) | The click-to-cycle card-deck pattern, adapted into `StaggerTestimonials.tsx` as a comparison alternative to the marquee. |
| [thebuggeddev/delphi](https://github.com/thebuggeddev/delphi) | Three.js infinite-tunnel technique (segments recycling along a camera path), adapted into `TunnelBackground.tsx` — swapped scroll-driven camera motion for constant ambient drift, and Unsplash photo textures for canvas-drawn brand-colored slide mockups. |

## Also load

- **`.claude/skills/ui-ux-pro-max/`** — the general design-intelligence skill (67 styles,
  161 palettes, GSAP motion snippets, landing-page structure patterns). Good for
  structural/motion ideas via `--domain landing` or `--domain gsap` searches. Its color
  and typography suggestions are **not** authoritative for this project — this project's
  palette and type system are fixed (see `brand-system.md`).
- **`Guidelines/GUIDELINES.md`** — the original ImagineMCP brand kit this whole system is
  layered on top of (monochrome rule, nav/footer behavior, base type scale).
