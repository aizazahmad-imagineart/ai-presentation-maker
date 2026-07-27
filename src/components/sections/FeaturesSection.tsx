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
import { ReorderMock, BrandMock, PdfToDeckMock, ChartMock } from "./FeatureMocks";

const CORE_FEATURES: { icon: React.ReactNode; title: string; body: string; span?: boolean; visual: React.ReactNode }[] = [
  {
    icon: <ArrowsClockwise size={22} weight="regular" />,
    title: "Fix the structure without starting over",
    body: "A slide needs to move, a section needs to grow, a point needs cutting. Reorder, merge, or trim your outline and the whole deck reflows instantly — a revision takes seconds instead of another afternoon.",
    span: true,
    visual: <ReorderMock />,
  },
  {
    icon: <PaintBrushBroad size={22} weight="regular" />,
    title: "Look consistent without policing every slide",
    body: "Set your logo, colors, and fonts once, and every slide falls in line automatically — the whole presentation reads as one coherent story.",
    visual: <BrandMock />,
  },
  {
    icon: <FilePdf size={22} weight="regular" />,
    title: "Turn your notes into a deck",
    body: "Upload the PDF sitting in a report or proposal and get back an editable, on-brand deck in minutes. No more content search and restructuring.",
    visual: <PdfToDeckMock />,
  },
  {
    icon: <ChartBar size={22} weight="regular" />,
    title: "Auto-generated charts & data slides",
    body: "Paste in your numbers and get back a slide-ready chart, styled to match the rest of your deck — clear the moment the slide loads.",
    span: true,
    visual: <ChartMock />,
  },
];

const MEDIA_FEATURES: { icon: React.ReactNode; title: string; body: string }[] = [
  {
    icon: <ImageSquare size={20} weight="regular" />,
    title: "Original imagery, generated per slide",
    body: "Artwork matched to your topic and tone without relying on a stock library.",
  },
  {
    icon: <ShapesIcon size={20} weight="regular" />,
    title: "On-brand diagrams and icons",
    body: "Drawn to fit your palette from scratch, instead of a recolored template shape.",
  },
  {
    icon: <FilmSlate size={20} weight="regular" />,
    title: "Lightweight motion where it helps",
    body: "Short and long-form video for demos and product reveals, generated alongside the deck.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative overflow-hidden border-b border-border-primary">
      <div aria-hidden="true" className="absolute -z-10 inset-0 overflow-hidden">
        <div className="blob absolute top-[6%] right-[-8%] w-[420px] h-[420px] bg-accent/12" />
      </div>

      <div className="container-page py-24 md:py-32">
        <Reveal className="max-w-[720px] mb-14 md:mb-16">
          <p className="font-mono text-[10.5px] font-semibold tracking-[1.8px] uppercase text-content-tertiary m-0">
            Features
          </p>
          <h2
            className="font-display font-semibold capitalize leading-[1.05] tracking-[-0.5px] mt-3.5 mb-4 text-content-primary"
            style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
          >
            Everything You Need From An AI Presentation Maker
          </h2>
          <p className="font-sans text-content-secondary leading-[1.7] tracking-[-0.005em] m-0" style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}>
            Beyond generating slides, it&apos;s built to handle the entire lifecycle of a deck —
            solving the pain points you&apos;ve always had with a traditional slide maker.
          </p>
        </Reveal>

        {/* Bento grid — structure & consistency */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6">
          {CORE_FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 70} className={f.span ? "md:col-span-2" : ""}>
              <div
                className={`h-full rounded-3xl glass-card shadow-[0_2px_20px_rgba(109,63,246,0.06)] p-7 md:p-9 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(109,63,246,0.14)] ${
                  f.span ? "grid md:grid-cols-[1.1fr_1fr] gap-8 items-center" : "flex flex-col gap-5"
                }`}
              >
                <div className={f.span ? "order-1" : ""}>
                  <span className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-accent to-accent-pink text-white shrink-0 shadow-[0_4px_14px_rgba(109,63,246,0.35)] mb-5">
                    {f.icon}
                  </span>
                  <h3 className="font-sans font-semibold text-content-primary mb-2" style={{ fontSize: "clamp(18px, 1.8vw, 22px)" }}>
                    {f.title}
                  </h3>
                  <p className="font-sans text-[15px] leading-[1.6] text-content-secondary m-0 max-w-[52ch]">{f.body}</p>
                </div>
                <div className={f.span ? "order-2" : "mt-1"}>{f.visual}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Deep-purple band — generative media engine */}
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl p-8 md:p-12" style={{ background: "linear-gradient(160deg, #0d0d0d 0%, #1a1030 55%, #0d0d0d 100%)" }}>
            <div aria-hidden="true" className="absolute -z-0 inset-0 overflow-hidden">
              <div className="blob absolute -top-16 left-[10%] w-[300px] h-[300px] bg-accent/30" />
              <div className="blob absolute bottom-[-20%] right-[6%] w-[280px] h-[280px] bg-accent-pink/20" />
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
            <div className="relative max-w-[640px] mb-10">
              <p className="font-mono text-[10.5px] font-semibold tracking-[1.8px] uppercase text-accent-light/80 m-0">
                Generative Media Engine
              </p>
              <h3
                className="font-display font-semibold capitalize leading-[1.1] tracking-[-0.5px] mt-3 mb-3 text-white"
                style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
              >
                Bring Stunning Visuals To Your Slides Effortlessly
              </h3>
              <p className="font-sans text-white/55 leading-[1.7] text-[15px] m-0">
                Built on a full generative media engine that creates original art, diagrams, and
                motion for every deck.
              </p>
            </div>

            <div className="relative grid sm:grid-cols-3 gap-4">
              {MEDIA_FEATURES.map((f) => (
                <div key={f.title} className="rounded-2xl glass-card-dark p-5 flex flex-col gap-3">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.1] text-accent-light shrink-0">
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
