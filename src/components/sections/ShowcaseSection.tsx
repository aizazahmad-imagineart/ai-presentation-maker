"use client";

import Image from "next/image";
import { Reveal } from "@/components/primitives/Reveal";

/**
 * Real, professionally designed decks — not fabricated mockups. Standing in
 * for actual Imagine Computer output until real generated-deck exports
 * replace them; swap the /public/decks files when those exist.
 */
const DECKS = [
  "/decks/deck-01.jpg",
  "/decks/deck-02.jpg",
  "/decks/deck-03.jpg",
  "/decks/deck-04.jpg",
  "/decks/deck-05.jpg",
  "/decks/deck-06.jpg",
  "/decks/deck-07.jpg",
  "/decks/deck-08.jpg",
  "/decks/deck-09.jpg",
];

export function ShowcaseSection() {
  return (
    <section id="showcase" className="border-b border-border-primary bg-[#0a0a0a]">
      <div className="container-page py-20 md:py-28">
        <Reveal className="max-w-[640px] mb-14 md:mb-16">
          <p className="font-mono text-[10.5px] font-semibold tracking-[1.8px] uppercase text-white/40 m-0">
            See It At Work
          </p>
          <h2
            className="font-display font-semibold leading-[1.1] tracking-[-0.5px] mt-3.5 mb-4 text-white"
            style={{ fontSize: "clamp(28px, 3.6vw, 44px)" }}
          >
            Every deck below started as a single line of text
          </h2>
          <p className="font-sans text-white/55 leading-[1.7] m-0" style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}>
            The AI read the brief, wrote the narrative, chose a layout, and built the slides.
            No template required.
          </p>
        </Reveal>

        <Reveal className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {DECKS.map((src) => (
            <div key={src} className="relative w-full aspect-[4/3] rounded-lg overflow-hidden group">
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
