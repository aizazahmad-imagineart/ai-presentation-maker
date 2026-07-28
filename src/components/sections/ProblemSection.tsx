"use client";

import { Reveal } from "@/components/primitives/Reveal";

const POINTS: { index: string; lead: string; body: string }[] = [
  {
    index: "01",
    lead: "Creation is a grind.",
    body: "You spend hours structuring, writing, and formatting slides — then the room still asks, “what's the point?”",
  },
  {
    index: "02",
    lead: "Consistency doesn't scale.",
    body: "Nobody wants a deck that looks like five different people built it, especially in front of leadership.",
  },
  {
    index: "03",
    lead: "Your best material stays buried.",
    body: "The real content is already sitting in a report or a proposal — nobody wants to rebuild it slide by slide.",
  },
];

export function ProblemSection() {
  return (
    <section id="problem" className="border-b border-border-primary bg-surface-primary">
      <div className="container-page py-20 md:py-28">
        <Reveal className="max-w-[640px] mb-14 md:mb-16">
          <h2
            className="font-display font-semibold leading-[1.15] tracking-[-0.5px] m-0 text-content-primary"
            style={{ fontSize: "clamp(26px, 3.2vw, 40px)" }}
          >
            Why do most decks take longer than the meeting they&apos;re for?
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-x-8 gap-y-10">
          {POINTS.map((p, i) => (
            <Reveal key={p.index} delay={i * 80}>
              <div className="border-t border-border-secondary pt-5">
                <span className="font-mono text-[13px] text-content-tertiary tracking-[0.5px]">{p.index}</span>
                <p className="font-sans text-[16px] leading-[1.6] text-content-secondary mt-3">
                  <strong className="font-semibold text-content-primary">{p.lead}</strong> {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
