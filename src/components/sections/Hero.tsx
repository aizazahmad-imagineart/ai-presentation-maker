"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Sparkle, FileText, ChartBar, UploadSimple } from "@phosphor-icons/react";
import { Reveal } from "@/components/primitives/Reveal";
import { ButtonLink } from "@/components/Button";

function FloatingChip({
  icon,
  className,
  pointerFlip = false,
}: {
  icon: React.ReactNode;
  className: string;
  pointerFlip?: boolean;
}) {
  return (
    <div className={`hidden lg:flex absolute items-center justify-center w-14 h-14 rounded-full glass-card shadow-[0_8px_24px_rgba(109,63,246,0.14)] text-content-primary ${className}`}>
      {icon}
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        aria-hidden="true"
        className="absolute text-accent/70"
        style={{
          bottom: pointerFlip ? undefined : -6,
          top: pointerFlip ? -6 : undefined,
          left: pointerFlip ? -6 : undefined,
          right: pointerFlip ? undefined : -6,
          transform: pointerFlip ? "rotate(180deg)" : "none",
        }}
      >
        <path d="M0 0L10 3L2 10Z" fill="currentColor" />
      </svg>
    </div>
  );
}

export function Hero() {
  const [prompt, setPrompt] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const generateHref = `https://www.imagine.art/computer${prompt.trim() ? `?prompt=${encodeURIComponent(prompt.trim())}` : ""}`;

  return (
    <section className="relative overflow-hidden border-b border-border-primary">
      {/* Ambient liquid-glass blobs */}
      <div aria-hidden="true" className="absolute -z-20 inset-0 overflow-hidden">
        <div className="blob absolute -top-24 left-[8%] w-[420px] h-[420px] bg-accent/25" />
        <div className="blob absolute top-10 right-[4%] w-[380px] h-[380px] bg-accent-pink/30" />
        <div className="blob absolute top-[60%] left-[38%] w-[320px] h-[320px] bg-accent-light/25" />
      </div>

      {/* Dot-grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: "radial-gradient(rgb(0 0 0 / 0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="container-page relative pt-[160px] pb-24 md:pt-[196px] md:pb-32">
        {/* Floating annotation chips */}
        <FloatingChip icon={<FileText size={22} weight="regular" />} className="left-[2%] top-[16%]" />
        <FloatingChip icon={<Sparkle size={22} weight="regular" className="text-accent" />} className="right-[4%] top-[6%]" pointerFlip />
        <FloatingChip icon={<ChartBar size={22} weight="regular" />} className="left-[8%] bottom-[8%]" />
        <div className="hidden lg:flex absolute items-center justify-center w-14 h-14 rounded-full glass-card shadow-[0_8px_24px_rgba(109,63,246,0.14)] right-[2%] bottom-[16%] p-3">
          <Image src="/imagine-logo.svg" alt="" width={28} height={28} aria-hidden="true" />
        </div>

        <Reveal className="flex flex-col items-center text-center max-w-[880px] mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full glass-card px-4 py-[7px] text-[13px] font-medium text-content-secondary mb-8">
            <Sparkle size={14} weight="fill" className="text-accent" />
            Text, outline, or PDF — in. Polished deck — out.
          </span>

          <h1
            className="font-display font-semibold capitalize leading-[1.02] tracking-[-1.5px] text-content-primary m-0"
            style={{ fontSize: "clamp(40px, 6.4vw, 84px)" }}
          >
            Your Next Deck, <br className="hidden sm:block" />
            Drafted In <span className="text-brand-gradient">Minutes</span>
          </h1>

          <p className="font-sans text-content-secondary leading-[1.7] tracking-[-0.005em] max-w-[560px] mt-7" style={{ fontSize: "clamp(16px, 1.6vw, 19px)" }}>
            Imagine Computer&apos;s AI presentation maker turns a rough idea, an outline, or an
            old PDF into a fully designed deck — written, structured, and styled in one pass.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 mt-10">
            <ButtonLink href="https://www.imagine.art/computer" size="lg" variant="brand">
              Generate Your First Deck
            </ButtonLink>
            <ButtonLink href="#showcase" size="lg" variant="ghost">
              See it at work
            </ButtonLink>
          </div>

          <p className="text-[13px] text-content-tertiary mt-5">No design skills or credit card needed.</p>
        </Reveal>

        {/* Try-it input bar */}
        <Reveal delay={120} className="max-w-[640px] mx-auto mt-16">
          <div
            className="flex items-center gap-2 rounded-[18px] glass-card shadow-[0_8px_32px_rgba(109,63,246,0.12)] p-2 pl-5 cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            <UploadSimple size={18} weight="regular" className="text-content-tertiary shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Add your topic, outline, or a PDF to get started…"
              className="flex-1 min-w-0 bg-transparent border-0 outline-none text-[15px] text-content-primary placeholder:text-content-tertiary"
            />
            <ButtonLink href={generateHref} size="md" variant="brand" className="shrink-0">
              Generate
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
