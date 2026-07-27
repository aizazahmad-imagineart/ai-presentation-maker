"use client";

import { useState } from "react";
import { Quotes, ArrowRight } from "@phosphor-icons/react";
import { Reveal } from "@/components/primitives/Reveal";
import { TESTIMONIALS } from "@/lib/data/testimonials";

const VISIBLE = 4;
const ROTATIONS = [0, -6, 5, -3];

/**
 * Comparison variant — a staggered, click-to-cycle card deck (inspired by
 * 21st.dev's "Stagger Testimonials"). Sits alongside the horizontal
 * scroller above so the two can be compared before picking one.
 */
export function StaggerTestimonials() {
  const [active, setActive] = useState(0);
  const total = TESTIMONIALS.length;

  return (
    <div className="bg-surface-primary border-t border-border-primary">
      <div className="container-page py-24 md:py-32">
        <Reveal className="max-w-[720px] mb-12 md:mb-14">
          <p className="font-mono text-[10.5px] font-semibold tracking-[1.8px] uppercase text-content-tertiary m-0">
            Comparison Layout
          </p>
          <h2
            className="font-display font-semibold capitalize leading-[1.05] tracking-[-0.5px] mt-3.5 mb-4 text-content-primary"
            style={{ fontSize: "clamp(28px, 3.4vw, 40px)" }}
          >
            Same Quotes, Staggered Deck
          </h2>
          <p className="font-sans text-content-secondary leading-[1.7] tracking-[-0.005em] m-0" style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}>
            Tap the top card to cycle through — for comparing against the scroller above.
          </p>
        </Reveal>

        <div className="relative h-[340px] sm:h-[300px] max-w-[560px] mx-auto select-none">
          {TESTIMONIALS.map((t, i) => {
            const pos = (i - active + total) % total;
            if (pos >= VISIBLE) return null;
            const isFront = pos === 0;
            return (
              <button
                key={t.name}
                onClick={() => setActive((a) => (a + 1) % total)}
                aria-label={isFront ? "Show next testimonial" : undefined}
                tabIndex={isFront ? 0 : -1}
                className="absolute inset-0 text-left rounded-3xl bg-white/95 backdrop-blur-xl border border-border-primary shadow-[0_16px_40px_rgba(109,63,246,0.16)] p-7 md:p-8 flex flex-col gap-5 transition-all duration-500 ease-out"
                style={{
                  zIndex: VISIBLE - pos,
                  transform: `translateY(${pos * 12}px) scale(${1 - pos * 0.05}) rotate(${ROTATIONS[pos]}deg)`,
                  opacity: pos === VISIBLE - 1 ? 0.5 : 1,
                  cursor: isFront ? "pointer" : "default",
                  pointerEvents: isFront ? "auto" : "none",
                }}
              >
                <Quotes size={26} weight="fill" className="text-accent/25" />
                <p className="font-sans text-[16px] leading-[1.6] text-content-primary m-0 flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="font-sans font-medium text-content-primary text-[14.5px] m-0">{t.name}</p>
                    <p className="font-sans text-[13.5px] text-content-tertiary m-0">{t.role}</p>
                  </div>
                  {isFront && (
                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-accent to-accent-pink text-white shrink-0">
                      <ArrowRight size={16} weight="bold" />
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
