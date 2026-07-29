"use client";

import {
  ArrowsClockwise,
  PaintBrushBroad,
  FilePdf,
  ChartBar,
  ImageSquare,
  ShapesIcon,
  FilmSlate,
} from "@phosphor-icons/react";
import { Reveal } from "@/components/primitives/Reveal";

const CORE_FEATURES: { icon: React.ReactNode; title: string; body: string }[] = [
  {
    icon: <ArrowsClockwise size={20} weight="regular" />,
    title: "Fix the structure without starting over",
    body: "Reorder, merge, or trim your outline and the whole deck reflows instantly. A revision takes seconds instead of another afternoon.",
  },
  {
    icon: <PaintBrushBroad size={20} weight="regular" />,
    title: "Look consistent without policing every slide",
    body: "Set your logo, colors, and fonts once. Every slide falls in line automatically.",
  },
  {
    icon: <FilePdf size={20} weight="regular" />,
    title: "Turn your notes into a deck",
    body: "Upload the PDF sitting in a report or proposal and get back an editable, on-brand deck in minutes.",
  },
  {
    icon: <ChartBar size={20} weight="regular" />,
    title: "Auto-generated charts & data slides",
    body: "Paste in your numbers. Get back a slide-ready chart, styled to match the rest of your deck.",
  },
];

const MEDIA_FEATURES: { icon: React.ReactNode; title: string; body: string }[] = [
  {
    icon: <ImageSquare size={20} weight="regular" />,
    title: "Original imagery, generated per slide",
    body: "Artwork made with an AI art generator to match your topic and tone. No stock library.",
  },
  {
    icon: <ShapesIcon size={20} weight="regular" />,
    title: "On-brand diagrams and icons",
    body: "Drawn with an AI image generator to fit your palette from scratch, not a recolored template shape.",
  },
  {
    icon: <FilmSlate size={20} weight="regular" />,
    title: "Lightweight motion where it helps",
    body: "Short and long-form video for demos and product reveals, generated with an AI video generator or AI motion graphics generator.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="border-b border-border-primary">
      <div className="container-page py-20 md:py-28">
        <Reveal className="max-w-[640px] mb-14 md:mb-16">
          <p className="font-mono text-[10.5px] font-semibold tracking-[1.8px] uppercase text-content-tertiary m-0">
            Features
          </p>
          <h2
            className="font-display font-semibold leading-[1.1] tracking-[-0.5px] mt-3.5 mb-0 text-content-primary"
            style={{ fontSize: "clamp(28px, 3.6vw, 44px)" }}
          >
            Everything you need from an{" "}
            <span className="font-serif-accent italic font-normal">AI presentation maker</span>
          </h2>
          <p className="font-sans text-content-secondary leading-[1.7] mt-3.5 mb-0 max-w-[52ch]" style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}>
            It&apos;s built to solve every pain point you&apos;ve ever had with a traditional slide
            maker.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10 mb-16 md:mb-20">
          {CORE_FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 60}>
              <div className="flex gap-4">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-black/[0.04] text-content-primary shrink-0">
                  {f.icon}
                </span>
                <div>
                  <h3 className="font-sans font-semibold text-content-primary text-[17px] mb-1.5">{f.title}</h3>
                  <p className="font-sans text-[15px] leading-[1.6] text-content-secondary m-0 max-w-[46ch]">{f.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Dark band — generative media engine */}
        <Reveal>
          <div className="rounded-2xl bg-[#0d0d0d] p-8 md:p-12">
            <div className="max-w-[560px] mb-10">
              <p className="font-mono text-[10.5px] font-semibold tracking-[1.8px] uppercase text-white/40 m-0">
                Generative Media Engine
              </p>
              <h3
                className="font-display font-semibold leading-[1.15] tracking-[-0.5px] mt-3 mb-3 text-white"
                style={{ fontSize: "clamp(22px, 2.6vw, 32px)" }}
              >
                Stunning visuals, built in
              </h3>
              <p className="font-sans text-white/55 leading-[1.7] text-[15px] m-0">
                A full generative media engine creates original art, diagrams, and motion for
                every deck.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {MEDIA_FEATURES.map((f) => (
                <div key={f.title} className="flex flex-col gap-3">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.08] text-white shrink-0">
                    {f.icon}
                  </span>
                  <h4 className="font-sans font-medium text-white text-[15px] m-0">{f.title}</h4>
                  <p className="font-sans text-[13.5px] leading-[1.55] text-white/50 m-0">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
