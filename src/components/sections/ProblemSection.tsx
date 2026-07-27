"use client";

import { Reveal } from "@/components/primitives/Reveal";

const POINTS: { lead: string; body: string }[] = [
  {
    lead: "Creation is a grind.",
    body: "You spend hours structuring, writing, and formatting slides — then the room still asks, “what's the point?”",
  },
  {
    lead: "Consistency doesn't scale.",
    body: "Nobody wants a deck that looks like five different people built it, especially in front of leadership.",
  },
  {
    lead: "Your best material stays buried.",
    body: "The real content is already sitting in a report or a proposal — nobody wants to rebuild it slide by slide.",
  },
];

function StackGlyph() {
  return (
    <div className="relative w-11 h-11 shrink-0">
      <div className="absolute inset-0 rounded-xl bg-accent/10" />
      <div className="absolute inset-[6px] rounded-lg bg-accent/25" />
      <div className="absolute inset-[12px] rounded-md bg-gradient-to-br from-accent to-accent-pink" />
    </div>
  );
}

export function ProblemSection() {
  return (
    <section id="problem" className="relative overflow-hidden border-b border-border-primary bg-surface-primary">
      <div aria-hidden="true" className="absolute -z-10 inset-0 overflow-hidden">
        <div className="blob absolute top-[10%] right-[-6%] w-[360px] h-[360px] bg-accent-light/15" />
      </div>

      <div className="container-page py-24 md:py-32">
        <Reveal className="max-w-[760px] mb-16 md:mb-20">
          <p className="font-mono text-[10.5px] font-semibold tracking-[1.8px] uppercase text-content-tertiary m-0">
            The Problem
          </p>
          <h2
            className="font-display font-semibold leading-[1.1] tracking-[-0.5px] mt-3.5 mb-0 text-content-primary"
            style={{ fontSize: "clamp(28px, 3.6vw, 44px)" }}
          >
            <span className="block text-content-secondary">Why do most decks take longer than the meeting they&apos;re for?</span>
            <span className="block capitalize">Presentation-Building Is A Time Problem.</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {POINTS.map((p, i) => (
            <Reveal key={p.lead} delay={i * 80}>
              <div className="h-full flex flex-col gap-5 rounded-3xl glass-card shadow-[0_2px_20px_rgba(109,63,246,0.06)] p-7 md:p-8">
                <StackGlyph />
                <p className="font-sans text-[16px] leading-[1.6] text-content-secondary m-0">
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
