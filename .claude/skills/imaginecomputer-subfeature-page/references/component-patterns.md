# Component Patterns

This project stays dependency-light on purpose ("keep it simple... efficient, less code"
was an explicit directive during the rebuild) — every pattern below is plain CSS + at most
a small `useEffect`/`IntersectionObserver` hook, no GSAP, no Three.js, no animation
libraries. An earlier version of this page used GSAP ScrollTrigger (a horizontal magnify
gallery) and a Three.js infinite-tunnel background; both were removed entirely in the
monochrome rebuild in favor of the lighter patterns below. Don't reintroduce either
dependency for a new page unless the user explicitly asks for that level of motion.

## Reuse as-is, unchanged, across every sub-feature page

| Component | Path | Notes |
|---|---|---|
| `SiteNav` | `src/components/SiteNav.tsx` | Update `NAV_LINKS` anchors to match the new page's section ids. Logo/CTA behavior stays identical. |
| `SiteFooter` | `src/components/SiteFooter.tsx` | Never changes per page. |
| `FaqSection` | `src/components/FaqSection.tsx` | Swap the data it reads (`src/lib/data/faq.ts`) per feature. Renders **open by default** (`defaultOpen` passed on every `FaqRow`) — this reversed an earlier closed-by-default decision; keep it open unless told otherwise. Emits FAQPage JSON-LD automatically. |
| `Button` / `ButtonLink` | `src/components/Button.tsx` | 4 variants: `brand` (plain monochrome `bg-content-primary` → `hover:bg-black`, the primary CTA — **not** a gradient), `ghost`, `white` (for on-dark secondary), `muted`. Never invent a 5th, never recolor `brand` to the accent orange. |
| `Reveal` | `src/components/primitives/Reveal.tsx` | Scroll-reveal wrapper (blur+fade+translate in). Skips the animation for anything already in the viewport at mount — this is what stops the hero from blur-flashing on load. Use it on every section heading by default; for a grid of many small items, wrap the **whole grid in one `Reveal`** rather than one per item (see `pitfalls.md` #10 — too many individually-animated layers can break headless screenshot QA, and it's less code anyway). |

## Reusable interaction primitives

### `SpotlightCard` (`src/components/primitives/SpotlightCard.tsx`)
A thin gradient ring that lights up near the cursor on hover, tracked via CSS custom
properties (`--spot-x`/`--spot-y`) set from `onMouseMove` — no layout thrashing. Wrap any
card that benefits from a "premium hover" moment. Default `glow` is now **white**
(`rgba(255,255,255,0.9)`), not purple — pass a custom `glow` only for the rare deliberate
accent moment, never as the default.

### Sticky step-through visual (pattern in `HowItWorks.tsx`)
For a "steps" or "how it works" section paired with a real screenshot per step: render the
steps in normal document flow in one column, and in a second column put a `sticky top-0
h-screen flex items-center` wrapper holding a stack of `Image`s (all absolutely rendered in
the same spot, toggled via `style={{ display: active === i ? "block" : "none" }}`). Track
which step is active with a small `IntersectionObserver`-based hook
(`rootMargin: "-45% 0px -45% 0px"` so the "active" step is whichever one crosses the
viewport's vertical center):

```tsx
function useActiveStep(count: number) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = refs.current.findIndex((el) => el === entry.target);
          if (idx !== -1) setActive(idx);
        }
      });
    }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [count]);
  return { active, refs };
}
```

No scroll library, no `position: fixed` math — `position: sticky` inside a tall-enough
parent column does the pinning for free. On larger screens the pinned visual can be scaled
up slightly (`xl:scale-110 2xl:scale-[1.2]`) so it doesn't look small and lost in extra
whitespace. Fall back to inline (non-sticky) images per step on mobile (`md:hidden`) since
sticky needs the two-column desktop layout to make sense.

### Scroll-linked pin-and-zoom hero visual (pattern in `Hero.tsx`)
For a hero product screenshot that should feel like a "product video" — scaling up to
near-full-bleed as the user scrolls into it, then releasing back to its resting size as
they scroll past — use a tall track (`h-[220vh]`) with a `sticky top-0 h-screen` inner
wrapper, and drive a `transform: scale()` off scroll position with a single
`requestAnimationFrame`-throttled scroll listener computing a triangular-wave progress
value:

```tsx
const MAX_SCALE = 1.45;
function useScrollZoom() {
  const trackRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const track = trackRef.current, target = targetRef.current;
        if (!track || !target) return;
        const vh = window.innerHeight;
        const total = track.offsetHeight - vh;
        if (total <= 0) return;
        const scrolled = Math.min(Math.max(-track.getBoundingClientRect().top, 0), total);
        const p = scrolled / total; // 0 -> 1 across the pinned distance
        const scale = 1 + (MAX_SCALE - 1) * (1 - Math.abs(p - 0.5) * 2); // triangular wave
        target.style.transform = `scale(${Math.max(1, scale)})`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, []);
  return { trackRef, targetRef };
}
```

Respects `prefers-reduced-motion`. This replaced an earlier GSAP `ScrollTrigger` approach
for the same kind of effect — the plain-JS version is fewer lines and has no dependency.

### Marquee testimonials (pattern in `TestimonialsSection.tsx`)
Continuous slow auto-scroll, not a manual drag-scroller:
- Duplicate the data array once (`[...ITEMS, ...ITEMS]`) and render both copies in one
  `flex w-max` track — this is what makes the loop seamless at the `translateX(-50%)` mark.
- Apply the existing `.animate-marquee` class (defined in `globals.css`, `@keyframes
  marquee` from `translateX(0)` to `translateX(-50%)`) with a slow custom
  `animationDuration` (60s felt right for ~6-8 cards) via inline style.
- Pause on hover: `group` on the wrapper, `group-hover:[animation-play-state:paused]`
  on the track.
- Full-bleed + edge fade: wrapper is `w-full overflow-hidden` (not `overflow-x-auto` — it's
  animation-driven, not manually scrollable, and `-auto` risks a stray scrollbar). **Fade
  the edges with two plain `absolute inset-y-0 w-16 md:w-32 bg-gradient-to-r/l from-white
  to-transparent` divs, not `mask-image`** — masking this element triggered a headless
  screenshot compositing bug during QA (see `pitfalls.md` #3); solid gradient divs render
  identically and sidestep it entirely.
- Card background: a fixed pixel width (`w-[320px] sm:w-[360px] shrink-0`), plain
  `bg-white border border-border-primary` — no glass/blur.

### Editorial numbered sections (pattern in `ProblemSection.tsx`)
For a "name the pain" or any list-of-N-points section that doesn't need imagery: skip cards
entirely. A plain numbered layout (`01`/`02`/`03` in `font-mono`, monochrome, no
icon/background/border-radius chrome) reads as more confident and less "generic SaaS
template" than a bento of icon cards — this was one of the concrete fixes for the
"too conventional and AI" feedback. Reach for this before reaching for a card grid.

### Real-imagery grid (pattern in `ShowcaseSection.tsx`)
For a "see it at work" / gallery section: a plain `grid grid-cols-2 md:grid-cols-3 gap-4`
of real example-output images (`Image ... fill className="object-cover"` inside an
`aspect-[4/3] rounded-lg overflow-hidden` cell), each with a subtle
`group-hover:scale-[1.03]` lift. No captions needed if the images speak for themselves. On
a dark section background (`bg-[#0a0a0a]`), this alone carries a huge amount of visual
weight for very little code — prefer it over a more elaborate scroll-driven gallery unless
there's a strong reason to add the complexity back.

## Shared CSS utilities (`src/app/globals.css`)

`.reveal` / `.reveal-visible` (+ direction variants), `.no-scrollbar`, `.bleed-scroller`,
`.animate-marquee` (+ `@keyframes marquee`), `.animate-tool-slide-up`, `.animate-word-in`.
The earlier `.glass-card` / `.glass-card-dark` / `.blob` / `.bg-brand-gradient` /
`.text-brand-gradient` utilities have been **removed** — don't reference them in new code.
Read `brand-system.md` for what each remaining utility is for before reaching for a new
custom class.
