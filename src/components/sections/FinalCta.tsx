"use client";

import { Reveal } from "@/components/primitives/Reveal";
import { ButtonLink } from "@/components/Button";

export function FinalCta() {
  return (
    <section id="get-started" className="bg-[#0d0d0d]">
      <div className="container-page py-24 md:py-32">
        <Reveal className="flex flex-col items-center text-center max-w-[640px] mx-auto">
          <h2
            className="font-display font-semibold leading-[1.1] tracking-[-0.5px] text-white m-0"
            style={{ fontSize: "clamp(30px, 4vw, 52px)" }}
          >
            Start with the free AI <span className="font-serif-accent italic font-normal">presentation maker</span> today
          </h2>
          <p className="font-sans text-white/55 leading-[1.7] max-w-[420px] mt-5" style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}>
            Describe your topic, attach a file, or paste an outline. Your first draft is one
            prompt away.
          </p>
          <div className="mt-9">
            <ButtonLink href="https://www.imagine.art/computer" size="lg" variant="white">
              Generate Your First Deck
            </ButtonLink>
          </div>
          <p className="text-[13px] text-white/35 mt-5">No design skills or credit card needed.</p>
        </Reveal>
      </div>
    </section>
  );
}
