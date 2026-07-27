"use client";

import { Quotes } from "@phosphor-icons/react";
import { Reveal } from "@/components/primitives/Reveal";
import { TESTIMONIALS } from "@/lib/data/testimonials";

function TestimonialCard({ quote, name, role }: { quote: string; name: string; role: string }) {
  return (
    <div className="w-[320px] sm:w-[360px] shrink-0 h-full flex flex-col gap-6 rounded-3xl glass-card shadow-[0_2px_20px_rgba(109,63,246,0.06)] p-7 md:p-8">
      <Quotes size={28} weight="fill" className="text-accent/25" />
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
    <section id="testimonials" className="relative overflow-hidden border-b border-border-primary">
      <div aria-hidden="true" className="absolute -z-10 inset-0 overflow-hidden">
        <div className="blob absolute top-[-10%] left-[20%] w-[380px] h-[380px] bg-accent/10" />
      </div>

      <div className="container-page pt-24 md:pt-32 pb-14 md:pb-16">
        <Reveal className="max-w-[720px]">
          <p className="font-mono text-[10.5px] font-semibold tracking-[1.8px] uppercase text-content-tertiary m-0">
            Testimonials
          </p>
          <h2
            className="font-display font-semibold capitalize leading-[1.05] tracking-[-0.5px] mt-3.5 mb-0 text-content-primary"
            style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
          >
            Loved By People Who Used To Hate Making Slides
          </h2>
        </Reveal>
      </div>

      {/* Marquee: continuous right-to-left drift, pauses on hover. Full-bleed
          edge-to-edge with a fade mask at both ends. overflow-hidden (not
          -auto) on purpose — this track is animation-driven, not a manual
          scroll area, and auto would risk a stray scrollbar on either axis. */}
      <div
        className="group relative w-full overflow-hidden pb-24 md:pb-32"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div
          className="flex gap-5 w-max animate-marquee group-hover:[animation-play-state:paused]"
          style={{ animationDuration: "60s" }}
        >
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} quote={t.quote} name={t.name} role={t.role} />
          ))}
        </div>
      </div>
    </section>
  );
}
