"use client";

import { Reveal } from "@/components/primitives/Reveal";
import { ButtonLink } from "@/components/Button";
import { TunnelBackground } from "./TunnelBackground";

export function FinalCta() {
  return (
    <section
      id="get-started"
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0d0d0d 0%, #1a1030 55%, #0d0d0d 100%)" }}
    >
      <TunnelBackground />

      {/* Scrim behind the text for contrast, independent of what the tunnel is doing */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(13,13,13,0.55), transparent 70%)" }}
      />

      <div className="container-page relative py-24 md:py-36">
        <Reveal className="flex flex-col items-center text-center max-w-[680px] mx-auto">
          <h2
            className="font-display font-semibold capitalize leading-[1.05] tracking-[-0.5px] text-white m-0"
            style={{ fontSize: "clamp(32px, 4.4vw, 56px)" }}
          >
            Start With The <span className="text-brand-gradient">Free</span> AI Presentation Maker Today
          </h2>
          <p className="font-sans text-white/55 leading-[1.7] max-w-[440px] mt-5" style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}>
            Describe your topic, attach a file, or paste an outline. Your first draft just awaits
            a prompt.
          </p>
          <div className="mt-10">
            <ButtonLink href="https://www.imagine.art/computer" size="lg" variant="brand">
              Generate Your First Deck
            </ButtonLink>
          </div>
          <p className="text-[13px] text-white/35 mt-5">No design skills or credit card needed.</p>
        </Reveal>
      </div>
    </section>
  );
}
