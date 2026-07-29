"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/primitives/Reveal";

const STEPS: { title: string; body: string; image: string }[] = [
  {
    title: "Describe or upload",
    body: "Type a topic, paste an outline, or drop in a PDF. Tell it roughly how long the deck should be.",
    image: "/screenshots/flow-1-length.png",
  },
  {
    title: "Pick a visual style",
    body: "Let the AI choose a bold or professional look, or start from a template you like.",
    image: "/screenshots/flow-2-style.png",
  },
  {
    title: "Refine the outline",
    body: "Every slide's structure is laid out up front, in plain language, before a single visual is drawn.",
    image: "/screenshots/flow-3-outline.png",
  },
  {
    title: "Get your deck",
    body: "A fully designed, fully editable presentation — export to PPTX, PDF, or PNG whenever you're ready.",
    image: "/screenshots/flow-4-editor.png",
  },
];

/** Tracks which step block is nearest the viewport center — same cheap
 * IntersectionObserver approach as Reveal, just keyed to an index instead
 * of a single boolean. */
function useActiveStep(count: number) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = refs.current.findIndex((el) => el === entry.target);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [count]);

  return { active, refs };
}

export function HowItWorks() {
  const { active, refs } = useActiveStep(STEPS.length);

  return (
    <section id="how-it-works" className="border-b border-border-primary">
      <div className="container-page py-20 md:py-28">
        <Reveal className="max-w-[640px] mb-14 md:mb-20">
          <p className="font-mono text-[10.5px] font-semibold tracking-[1.8px] uppercase text-content-tertiary m-0">
            How It Works
          </p>
          <h2
            className="font-display font-semibold leading-[1.1] tracking-[-0.5px] mt-3.5 mb-0 text-content-primary"
            style={{ fontSize: "clamp(28px, 3.6vw, 44px)" }}
          >
            From text to <span className="font-serif-accent italic font-normal">slides</span> in four steps
          </h2>
          <p className="font-sans text-content-secondary leading-[1.7] mt-3.5 mb-0 max-w-[52ch]" style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}>
            No blank canvas, no formatting rabbit holes — the AI slide maker handles
            structure, writing, and design all at once.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-x-16">
          {/* Steps — normal document flow, each block tall enough to trigger the observer cleanly */}
          <div className="flex flex-col">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="py-14 md:py-0 md:min-h-screen md:flex md:flex-col md:justify-center"
              >
                <span
                  className="font-mono text-[13px] tracking-[0.5px] transition-colors duration-300"
                  style={{ color: active === i ? "var(--color-content-primary)" : "var(--color-content-tertiary)" }}
                >
                  0{i + 1}
                </span>
                <h3 className="font-sans font-semibold text-content-primary text-[22px] md:text-[26px] mt-3 mb-2.5">
                  {step.title}
                </h3>
                <p className="font-sans text-[16px] leading-[1.6] text-content-secondary m-0 max-w-[38ch]">
                  {step.body}
                </p>

                {/* Image follows inline on mobile, since sticky needs the md+ two-column layout */}
                <div className="md:hidden mt-8 rounded-xl border border-border-primary overflow-hidden">
                  <Image src={step.image} alt={step.title} width={1600} height={900} className="w-full h-auto block" />
                </div>
              </div>
            ))}
          </div>

          {/* Sticky visual — desktop only, vertically centered in the viewport
              while pinned, scaled up a touch on larger screens */}
          <div className="hidden md:block relative">
            <div className="sticky top-0 h-screen flex items-center">
              <div className="w-full rounded-xl border border-border-primary overflow-hidden shadow-[0_20px_48px_rgba(0,0,0,0.08)] xl:scale-110 2xl:scale-[1.2] transition-transform duration-500">
                {STEPS.map((step, i) => (
                  <Image
                    key={step.image}
                    src={step.image}
                    alt={step.title}
                    width={1600}
                    height={900}
                    className="w-full h-auto block transition-opacity duration-300"
                    style={{ display: active === i ? "block" : "none" }}
                    priority={i === 0}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
