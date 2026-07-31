"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/primitives/Reveal";
import { ButtonLink } from "@/components/Button";

const STEPS: { title: string; body: string; image: string }[] = [
  {
    title: "Describe or upload",
    body: "Type a topic, paste an outline, or drop in a PDF in AI Chat. You can also drop inspirations from Pinterest or choose built-in templates.",
    image: "/screenshots/flow-0-hero.png",
  },
  {
    title: "Let it generate",
    body: "Imagine Computer’s AI slide maker drafts your outline, writes the slide copy, and lays out each screen in seconds.",
    image: "/screenshots/flow-3-outline.png",
  },
  {
    title: "Refine & export",
    body: "Edit any slide in plain language. Ask for changes in specific sections without breaking the design. Apply your brand kit, then export to PPTX, PDF, or PNG.",
    image: "/screenshots/flow-4-editor.png",
  },
];

const FEATURES: { title: string; body: string; image: string }[] = [
  {
    title: "Fix the structure without starting over",
    body: "Feedback always lands after the first draft. A slide needs to move, a section needs to grow, a point needs cutting. Reorder, merge, or trim your outline and the whole deck reflows instantly, so a revision takes seconds instead of another afternoon.",
    image: "/screenshots/flow-3-outline.png",
  },
  {
    title: "Look consistent without policing every slide",
    body: "Nobody wants a deck that looks like five different people built it, especially when it’s going in front of your leadership team. Set your logo, colors, and fonts once, and every slide falls in line automatically, so the whole presentation reads as one coherent story.",
    image: "/screenshots/flow-2-style.png",
  },
  {
    title: "Turn your notes into a deck",
    body: "Your best material is usually sitting in a report, a proposal, or a one-pager nobody wants to rebuild slide by slide. Upload the PDF and get back an editable, on-brand deck in minutes. No more content search and restructuring.",
    image: "/screenshots/flow-0-hero.png",
  },
  {
    title: "Auto-generated charts & data slides",
    body: "Data only convinces someone when they can actually visualize it. Paste in your numbers and get back a slide-ready chart, styled to match the rest of your deck, so the story your data tells is clear the moment the slide loads.",
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

export function HowItWorks({ id = "how-it-works", variant = "scroll" }: { id?: string; variant?: "scroll" | "cards" }) {
  const items = variant === "cards" ? STEPS : FEATURES;
  const { active, refs } = useActiveStep(items.length);
  const dark = variant === "cards";

  return (
    <section id={id} className={`border-b border-border-primary ${dark ? "bg-[#0a0a0a]" : ""}`}>
      <div className="container-page py-20 md:py-28">
        <Reveal className="max-w-[640px] mb-14 md:mb-20">
          <p className={`font-mono text-[10.5px] font-semibold tracking-[1.8px] uppercase m-0 ${dark ? "text-white/40" : "text-content-tertiary"}`}>
            {variant === "cards" ? "How It Works" : "Features"}
          </p>
          <h2
            className={`font-display font-semibold leading-[1.1] tracking-[-0.5px] mt-3.5 mb-0 ${dark ? "text-white" : "text-content-primary"}`}
            style={{ fontSize: "clamp(28px, 3.6vw, 44px)" }}
          >
            {variant === "cards" ? (
              "From Text to Slides in Three Steps"
            ) : (
              <>
                Everything you need from an{" "}
                <span className="font-serif-accent italic font-normal">AI presentation maker</span>
              </>
            )}
          </h2>
          <p className={`font-sans leading-[1.7] mt-3.5 mb-0 max-w-[52ch] ${dark ? "text-white/55" : "text-content-secondary"}`} style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}>
            {variant === "cards" ? (
              "No blank canvas, no formatting rabbit holes. Describe the presentation you need, and the AI slide maker handles structure, writing, and design at the same time."
            ) : (
              "Beyond generating slides, it's built to handle the entire lifecycle of a deck. It is built to solve every pain point you have ever had with a traditional slide maker."
            )}
          </p>
        </Reveal>

        {variant === "cards" ? (
          <div className="grid grid-cols-3 gap-x-6 md:gap-x-10">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 60}>
                <span className="font-mono text-[13px] text-white/40 tracking-[0.5px]">0{i + 1}</span>
                <h3 className="font-sans font-semibold text-white text-[17px] md:text-[22px] mt-3 mb-2.5">
                  {step.title}
                </h3>
                <p className="font-sans text-[13.5px] md:text-[15px] leading-[1.6] text-white/55 m-0">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </div>
        ) : (
        <div className="grid md:grid-cols-2 gap-x-16">
          {/* Steps — normal document flow, each block tall enough to trigger the observer cleanly */}
          <div className="flex flex-col">
            {items.map((step, i) => (
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
                <h3 className="font-sans font-semibold text-content-primary text-[22px] md:text-[26px] mt-3 mb-2.5 w-[544px] max-w-full">
                  {step.title}
                </h3>
                <p className="font-sans text-[16px] leading-[1.6] text-content-secondary m-0 max-w-[38ch]">
                  {step.body}
                </p>

                <ButtonLink href="https://www.imagine.art/computer/agent/slides" variant="brand" size="md" className="mt-5 w-fit">
                  Try it now
                </ButtonLink>

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
              <div className="w-full translate-x-[10px] rounded-xl border border-border-primary overflow-hidden shadow-[0_20px_48px_rgba(0,0,0,0.08)] xl:scale-110 2xl:scale-[1.2] transition-transform duration-500">
                {items.map((step, i) => (
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
        )}
      </div>
    </section>
  );
}
