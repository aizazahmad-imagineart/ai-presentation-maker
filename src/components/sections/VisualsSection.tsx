"use client";

import { ImageSquare, ShapesIcon, FilmSlate } from "@phosphor-icons/react";
import { Reveal } from "@/components/primitives/Reveal";

const linkClass = "underline underline-offset-2 hover:text-content-primary transition-colors";

const CARDS: { icon: React.ReactNode; title: string; body: React.ReactNode }[] = [
  {
    icon: <ImageSquare size={20} weight="regular" />,
    title: "Original imagery, generated per slide",
    body: (
      <>
        Artwork made with an{" "}
        <a href="https://imagine.art/" target="_blank" rel="noopener noreferrer" className={linkClass}>
          AI art generator
        </a>{" "}
        to match your topic and tone without relying on a stock library.
      </>
    ),
  },
  {
    icon: <ShapesIcon size={20} weight="regular" />,
    title: "On-brand diagrams and icons",
    body: (
      <>
        Drawn with an{" "}
        <a href="https://www.imagine.art/ai-image-generator" target="_blank" rel="noopener noreferrer" className={linkClass}>
          AI image generator
        </a>{" "}
        to fit your palette from scratch, instead of a recolored template shape.
      </>
    ),
  },
  {
    icon: <FilmSlate size={20} weight="regular" />,
    title: "Lightweight motion where it helps",
    body: (
      <>
        Short and long form video for demos and product reveals generated with an{" "}
        <a href="http://imagine.art/ai-video-generator" target="_blank" rel="noopener noreferrer" className={linkClass}>
          AI video generator
        </a>{" "}
        or AI motion graphics generator.
      </>
    ),
  },
];

export function VisualsSection() {
  return (
    <section id="visuals" className="border-b border-border-primary">
      <div className="container-page py-20 md:py-28">
        <Reveal className="max-w-[640px] mb-14 md:mb-16">
          <h2
            className="font-display font-semibold leading-[1.1] tracking-[-0.5px] mb-0 text-content-primary"
            style={{ fontSize: "clamp(28px, 3.6vw, 44px)" }}
          >
            Bring Stunning Visuals in Your Slides Effortlessly
          </h2>
          <p className="font-sans text-content-secondary leading-[1.7] mt-3.5 mb-0 max-w-[52ch]" style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}>
            Imagine Computer&apos;s AI presentation maker is built on a full generative media
            engine and can create original art, diagrams, and motion for a deck.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-3 gap-x-8 gap-y-10">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 60}>
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-black/[0.04] text-content-primary shrink-0">
                {card.icon}
              </span>
              <h3 className="font-sans font-semibold text-content-primary text-[17px] mt-3 mb-1.5">{card.title}</h3>
              <p className="font-sans text-[15px] leading-[1.6] text-content-secondary m-0 max-w-[42ch]">{card.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
