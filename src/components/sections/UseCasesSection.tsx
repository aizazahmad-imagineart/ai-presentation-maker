"use client";

import {
  Handshake,
  Megaphone,
  RocketLaunch,
  ChalkboardTeacher,
  ClipboardText,
  GearSix,
} from "@phosphor-icons/react";
import { Reveal } from "@/components/primitives/Reveal";
import { SpotlightCard } from "@/components/primitives/SpotlightCard";
import { USE_CASES, type UseCase } from "@/lib/data/useCases";

const ICONS: Record<UseCase["icon"], React.ReactNode> = {
  sales: <Handshake size={20} weight="regular" />,
  marketing: <Megaphone size={20} weight="regular" />,
  startup: <RocketLaunch size={20} weight="regular" />,
  educator: <ChalkboardTeacher size={20} weight="regular" />,
  consultant: <ClipboardText size={20} weight="regular" />,
  operations: <GearSix size={20} weight="regular" />,
};

export function UseCasesSection() {
  return (
    <section id="use-cases" className="border-b border-border-primary bg-[#0a0a0a] relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="container-page relative py-20 md:py-28">
        <Reveal className="max-w-[640px] mb-14 md:mb-16">
          <p className="font-mono text-[10.5px] font-semibold tracking-[1.8px] uppercase text-white/40 m-0">
            Use Cases
          </p>
          <h2
            className="font-display font-semibold leading-[1.1] tracking-[-0.5px] mt-3.5 mb-4 text-white"
            style={{ fontSize: "clamp(28px, 3.6vw, 44px)" }}
          >
            Built for every team with an idea to <span className="font-serif-accent italic font-normal">present</span>
          </h2>
        </Reveal>

        <div className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {USE_CASES.map((uc, i) => (
            <Reveal key={uc.title} delay={i * 60} className={uc.size === "lg" ? "lg:col-span-2" : ""}>
              <SpotlightCard className="h-full rounded-2xl">
                <div className="h-full flex flex-col gap-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] p-6 md:p-7 transition-colors duration-300 group-hover:bg-white/[0.07]">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.08] text-white shrink-0">
                    {ICONS[uc.icon]}
                  </span>
                  <div>
                    <h3 className="font-sans font-medium text-white text-[17px] mb-1.5">{uc.title}</h3>
                    <p className="font-sans text-[14px] leading-[1.55] text-white/50 m-0 max-w-[42ch]">{uc.body}</p>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
