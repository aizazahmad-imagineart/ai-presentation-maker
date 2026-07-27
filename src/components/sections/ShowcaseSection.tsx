"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Reveal } from "@/components/primitives/Reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Placeholder deck mockups — abstract compositions standing in for real
 * exported deck screenshots. Swap `MOCK_DECKS` for actual product output
 * before launch (see AI Presentation Maker.pdf, "Just add sample pictures here").
 */
const MOCK_DECKS: { prompt: string; title: string; bars: number[] }[] = [
  { prompt: "“Q3 growth strategy for the board”", title: "Q3 Growth Strategy", bars: [45, 70, 55, 85] },
  { prompt: "“Onboarding deck for new hires”", title: "Welcome Aboard", bars: [60, 40, 75, 50] },
  { prompt: "“Investor update — Series A traction”", title: "Series A Traction", bars: [35, 65, 80, 95] },
  { prompt: "“Client workshop readout”", title: "Workshop Readout", bars: [55, 55, 40, 70] },
];

function MockSlide({ title, bars }: { title: string; bars: number[] }) {
  return (
    <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-gradient-to-br from-accent/12 via-accent-pink/8 to-accent-light/14 p-4 flex flex-col justify-between">
      <div aria-hidden="true" className="absolute -top-8 -right-6 w-24 h-24 rounded-full bg-accent-pink/25 blur-2xl" />
      <div aria-hidden="true" className="absolute -bottom-10 -left-6 w-28 h-28 rounded-full bg-accent/20 blur-2xl" />
      <span className="relative font-sans font-medium text-content-primary text-[11px] leading-tight">{title}</span>
      <div className="relative flex items-end gap-1.5 h-10">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 rounded-t-[3px] bg-white/75" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

export function ShowcaseSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!trackRef.current || !pinRef.current || !rowRef.current) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const cards = cardRefs.current.filter((c): c is HTMLDivElement => Boolean(c));
        if (!cards.length) return;
        const lastCard = cards[cards.length - 1];

        // Row travels from mostly (not fully) off-screen right to a resting
        // spot where the LAST card's center lines up with the viewport's
        // horizontal center. Starting at 60% of viewport width — rather than
        // 100% — means the first card is already peeking in as soon as the
        // section pins, instead of the pin opening on a blank frame.
        // Measured via offsetLeft/offsetWidth (not scrollWidth) since the row
        // is overflow-visible at this breakpoint, where scrollWidth is
        // unreliable for a non-scrolling element.
        const getPositions = () => {
          const viewportW = window.innerWidth;
          const rowContentWidth = lastCard.offsetLeft + lastCard.offsetWidth;
          const lastCardWidth = lastCard.offsetWidth;
          const startX = viewportW * 0.6;
          const endX = viewportW / 2 - (rowContentWidth - lastCardWidth / 2);
          return { startX, endX, travel: startX - endX };
        };

        // Both endpoints are passed as functions (not pre-computed numbers)
        // so invalidateOnRefresh actually re-measures them.
        const masterTween = gsap.fromTo(
          rowRef.current,
          { x: () => getPositions().startX },
          {
            x: () => getPositions().endX,
            ease: "none",
            scrollTrigger: {
              trigger: trackRef.current,
              start: "top top",
              end: () => `+=${getPositions().travel}`,
              scrub: 0.6,
              pin: pinRef.current,
              pinSpacing: true,
              invalidateOnRefresh: true,
            },
          },
        );

        if (document.fonts?.ready) {
          document.fonts.ready.then(() => ScrollTrigger.refresh());
        }

        // Per-card magnify + depth-of-field: each card sharpens into focus
        // and scales up to 2x as it crosses center, then softens back out —
        // smoothing what would otherwise be an abrupt overlap between the
        // scaled-up card and its neighbors. Timed via containerAnimation so
        // it stays locked to the master horizontal tween; the 0.5 timeline
        // midpoint always lands exactly when a card's center crosses the
        // viewport's center, regardless of card/viewport width.
        const cardTriggers = cards.map((card) =>
          gsap
            .timeline({
              scrollTrigger: {
                trigger: card,
                containerAnimation: masterTween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            })
            .fromTo(card, { filter: "blur(8px)", opacity: 0.45 }, { filter: "blur(0px)", opacity: 1, ease: "power1.inOut" }, 0)
            .to(card, { scale: 2, zIndex: 10, ease: "power1.inOut" }, 0)
            .to(card, { scale: 1, zIndex: 1, ease: "power1.inOut" }, 0.5)
            .to(card, { filter: "blur(8px)", opacity: 0.45, ease: "power1.inOut" }, 0.5),
        );

        return () => {
          cardTriggers.forEach((tl) => tl.scrollTrigger?.kill());
        };
      });

      return () => mm.revert();
    },
    { scope: trackRef },
  );

  return (
    <section id="showcase" className="relative overflow-hidden border-b border-border-primary">
      <div className="container-page pt-24 md:pt-32">
        <Reveal className="max-w-[720px] mb-14 md:mb-16">
          <p className="font-mono text-[10.5px] font-semibold tracking-[1.8px] uppercase text-content-tertiary m-0">
            See It At Work
          </p>
          <h2
            className="font-display font-semibold capitalize leading-[1.05] tracking-[-0.5px] mt-3.5 mb-4 text-content-primary"
            style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
          >
            See Our AI PowerPoint Presentation Maker At Work
          </h2>
          <p className="font-sans text-content-secondary leading-[1.7] tracking-[-0.005em] m-0" style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}>
            Every deck below started as a single line of text. The AI read the brief, wrote the
            narrative, chose a layout, and built the slides — no template required.
          </p>
        </Reveal>
      </div>

      {/* Scroll-driven horizontal gallery: pins full-bleed edge-to-edge while
          page scroll carries every card through the viewport, magnifying
          each as it crosses center, until the last card settles at rest —
          then normal vertical scroll resumes. */}
      <div ref={trackRef}>
        <div ref={pinRef} className="md:h-screen flex items-center md:overflow-hidden">
          <div
            ref={rowRef}
            className="flex items-center gap-6 md:gap-20 overflow-x-auto no-scrollbar snap-x snap-mandatory pl-5 pr-5 pb-6 md:overflow-visible md:snap-none md:pl-0 md:pr-0 md:pb-0"
          >
            {MOCK_DECKS.map((deck, i) => (
              <div
                key={deck.prompt}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="w-[80vw] max-w-[360px] md:max-w-none md:w-[340px] shrink-0"
                style={{ transformOrigin: "50% 50%" }}
              >
                <div className="rounded-2xl glass-card shadow-[0_2px_20px_rgba(109,63,246,0.08)] p-3.5 h-full flex flex-col gap-3">
                  <MockSlide title={deck.title} bars={deck.bars} />
                  <p className="font-sans text-[10.5px] leading-[1.4] text-content-tertiary italic m-0">
                    Generated from: {deck.prompt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
