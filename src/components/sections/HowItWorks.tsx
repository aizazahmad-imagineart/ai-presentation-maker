"use client";

import { UploadSimple, MagicWand, PencilSimpleLine } from "@phosphor-icons/react";
import { Reveal } from "@/components/primitives/Reveal";

const STEPS: { index: string; icon: React.ReactNode; title: string; body: string }[] = [
  {
    index: "01",
    icon: <UploadSimple size={22} weight="regular" />,
    title: "Describe or upload",
    body: "Type a topic, paste an outline, or drop in a PDF in AI Chat. You can also drop inspiration from Pinterest or choose a built-in template.",
  },
  {
    index: "02",
    icon: <MagicWand size={22} weight="regular" />,
    title: "Let it generate",
    body: "Imagine Computer's AI slide maker drafts your outline, writes the slide copy, and lays out each screen in seconds.",
  },
  {
    index: "03",
    icon: <PencilSimpleLine size={22} weight="regular" />,
    title: "Refine & export",
    body: "Edit any slide in plain language. Apply your brand kit, then export to PPTX, PDF, or PNG.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden border-b border-border-primary bg-surface-primary">
      <div aria-hidden="true" className="absolute -z-10 inset-0 overflow-hidden">
        <div className="blob absolute bottom-[-10%] left-[-4%] w-[380px] h-[380px] bg-accent-pink/15" />
      </div>

      <div className="container-page py-24 md:py-32">
        <Reveal className="max-w-[720px] mb-16 md:mb-20">
          <p className="font-mono text-[10.5px] font-semibold tracking-[1.8px] uppercase text-content-tertiary m-0">
            How It Works
          </p>
          <h2
            className="font-display font-semibold capitalize leading-[1.05] tracking-[-0.5px] mt-3.5 mb-4 text-content-primary"
            style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
          >
            From Text To Slides In Three Steps
          </h2>
          <p className="font-sans text-content-secondary leading-[1.7] tracking-[-0.005em] m-0" style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}>
            No blank canvas, no formatting rabbit holes. Describe the presentation you need, and
            the AI handles structure, writing, and design at the same time.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {STEPS.map((step, i) => (
            <Reveal key={step.index} delay={i * 80}>
              <div className="h-full flex flex-col gap-5 rounded-3xl glass-card shadow-[0_2px_20px_rgba(109,63,246,0.06)] p-7 md:p-8">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[13px] text-content-tertiary tracking-[0.5px]">{step.index}</span>
                  <span className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-accent to-accent-pink text-white shadow-[0_4px_14px_rgba(109,63,246,0.35)]">
                    {step.icon}
                  </span>
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-content-primary text-[20px] mb-2">{step.title}</h3>
                  <p className="font-sans text-[15px] leading-[1.6] text-content-secondary m-0">{step.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
