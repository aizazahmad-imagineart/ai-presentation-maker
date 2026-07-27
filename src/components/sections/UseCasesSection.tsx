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
  sales: <Handshake size={22} weight="regular" />,
  marketing: <Megaphone size={22} weight="regular" />,
  startup: <RocketLaunch size={22} weight="regular" />,
  educator: <ChalkboardTeacher size={22} weight="regular" />,
  consultant: <ClipboardText size={22} weight="regular" />,
  operations: <GearSix size={22} weight="regular" />,
};

export function UseCasesSection() {
  return (
    <section
      id="use-cases"
      className="border-b border-border-primary relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0d0d0d 0%, #1a1030 55%, #0d0d0d 100%)" }}
    >
      <div aria-hidden="true" className="absolute -z-0 inset-0 overflow-hidden">
        <div className="blob absolute -top-20 right-[10%] w-[360px] h-[360px] bg-accent/25" />
        <div className="blob absolute bottom-[-15%] left-[6%] w-[320px] h-[320px] bg-accent-pink/15" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="container-page relative py-24 md:py-32">
        <Reveal className="max-w-[720px] mb-14 md:mb-16">
          <p className="font-mono text-[10.5px] font-semibold tracking-[1.8px] uppercase text-white/40 m-0">
            Use Cases
          </p>
          <h2
            className="font-display font-semibold capitalize leading-[1.05] tracking-[-0.5px] mt-3.5 mb-4 text-white"
            style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
          >
            Built For Every Team That Has To Present An Idea
          </h2>
          <p className="font-sans text-white/55 leading-[1.7] tracking-[-0.005em] m-0" style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}>
            Whatever the room looks like, the brief is usually the same: turn a rough idea into
            something worth someone&apos;s attention.
          </p>
        </Reveal>

        <div className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {USE_CASES.map((uc, i) => (
            <Reveal key={uc.title} delay={i * 60} className={uc.size === "lg" ? "lg:col-span-2" : ""}>
              <SpotlightCard className="h-full rounded-2xl">
                <div className="h-full flex flex-col gap-4 rounded-2xl glass-card-dark p-6 md:p-7 transition-colors duration-300 group-hover:bg-white/[0.09]">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-pink text-white shrink-0 shadow-[0_4px_14px_rgba(109,63,246,0.35)]">
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
