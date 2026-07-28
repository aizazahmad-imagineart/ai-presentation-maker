"use client";

import { Quotes } from "@phosphor-icons/react";
import { Reveal } from "@/components/primitives/Reveal";
import { TESTIMONIALS } from "@/lib/data/testimonials";

function TestimonialCard({ quote, name, role }: { quote: string; name: string; role: string }) {
  return (
    <div className="w-[320px] sm:w-[360px] shrink-0 h-full flex flex-col gap-6 rounded-2xl border border-border-primary bg-white p-7 md:p-8">
      <Quotes size={26} weight="fill" className="text-black/10" />
      <p className="font-sans text-[16px] leading-[1.6] text-content-primary m-0 flex-1">&ldquo;{quote}&rdquo;</p>
      <div>
        <p className="font-sans font-medium text-content-primary text-[14.5px] m-0">{name}</p>
        <p className="font-sans text-[13.5px] text-content-tertiary m-0">{role}</p>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="border-b border-border-primary">
      <div className="container-page pt-20 md:pt-28 pb-14 md:pb-16">
        <Reveal className="max-w-[640px]">
          <p className="font-mono text-[10.5px] font-semibold tracking-[1.8px] uppercase text-content-tertiary m-0">
            Testimonials
          </p>
          <h2
            className="font-display font-semibold leading-[1.1] tracking-[-0.5px] mt-3.5 mb-0 text-content-primary"
            style={{ fontSize: "clamp(28px, 3.6vw, 44px)" }}
          >
            People who used to hate making slides
          </h2>
        </Reveal>
      </div>

      {/* Marquee: continuous right-to-left drift, pauses on hover. Full-bleed
          edge-to-edge with a fade at both ends. overflow-hidden (not -auto)
          on purpose — this track is animation-driven, not a manual scroll
          area, and auto would risk a stray scrollbar on either axis.
          Edge fade is two plain gradient divs, not CSS mask-image — masking
          this element triggered a headless-screenshot compositing bug during
          QA (see skill pitfalls.md #3); solid divs render identically and
          sidestep it entirely. */}
      <div className="group relative w-full overflow-hidden pb-24 md:pb-32">
        <div
          className="flex gap-5 w-max animate-marquee group-hover:[animation-play-state:paused]"
          style={{ animationDuration: "60s" }}
        >
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} quote={t.quote} name={t.name} role={t.role} />
          ))}
        </div>
        <div aria-hidden="true" className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div aria-hidden="true" className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
