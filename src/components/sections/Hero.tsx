"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Sparkle, UploadSimple } from "@phosphor-icons/react";
import { Reveal } from "@/components/primitives/Reveal";
import { ButtonLink } from "@/components/Button";

const MAX_SCALE = 1.45;

/** Pins the target while its (much taller) track scrolls through, scaling it
 * up toward full-bleed at the track's midpoint and back down to its resting
 * size by the end — a scroll-linked "zoom in, then release" for a hero
 * screenshot, without pulling in an animation library for one effect. */
function useScrollZoom() {
  const trackRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const track = trackRef.current;
        const target = targetRef.current;
        if (!track || !target) return;
        const vh = window.innerHeight;
        const total = track.offsetHeight - vh;
        if (total <= 0) return;
        const scrolled = Math.min(Math.max(-track.getBoundingClientRect().top, 0), total);
        const p = scrolled / total; // 0 -> 1 across the pinned distance
        const scale = 1 + (MAX_SCALE - 1) * (1 - Math.abs(p - 0.5) * 2);
        target.style.transform = `scale(${Math.max(1, scale)})`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return { trackRef, targetRef };
}

export function Hero() {
  const [prompt, setPrompt] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const generateHref = `https://www.imagine.art/computer${prompt.trim() ? `?prompt=${encodeURIComponent(prompt.trim())}` : ""}`;
  const { trackRef, targetRef } = useScrollZoom();

  return (
    <section className="relative border-b border-border-primary">
      <div className="container-page pt-[120px] pb-4 md:pt-[144px] md:pb-6">
        {/* Signature accent sparkles — the one spot of color on an otherwise
            monochrome page, echoing MCP/Fashion Studio's single-accent rule */}
        <Sparkle
          size={46}
          weight="fill"
          style={{ color: "#FB5607" }}
          className="hidden lg:block absolute left-[16%] top-[18%] rotate-[-12deg]"
        />
        <Sparkle
          size={22}
          weight="fill"
          style={{ color: "#FB5607" }}
          className="hidden lg:block absolute right-[18%] top-[30%] rotate-[10deg] opacity-70"
        />

        <Reveal className="flex flex-col items-center text-center max-w-[800px] mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-border-primary px-4 py-[7px] text-[13px] font-medium text-content-secondary mb-7">
            <Sparkle size={14} weight="fill" className="text-content-primary" />
            Text, outline, or PDF in. Polished deck out.
          </span>

          <h1
            className="font-display font-semibold capitalize leading-[1.04] tracking-[-1.5px] text-content-primary m-0"
            style={{ fontSize: "clamp(40px, 6vw, 76px)" }}
          >
            Your Next Deck, Drafted{" "}
            <span className="font-serif-accent italic font-normal normal-case tracking-normal">in Minutes</span>
          </h1>

          <p className="font-sans text-content-secondary leading-[1.7] tracking-[-0.005em] max-w-[540px] mt-5" style={{ fontSize: "clamp(16px, 1.6vw, 19px)" }}>
            Turn a rough idea, an outline, or an old PDF into a fully designed deck —
            written, structured, and styled in one pass.
          </p>

          <p className="text-[13px] text-content-tertiary mt-5">No design skills or credit card needed.</p>
        </Reveal>

        {/* Try-it input bar */}
        <Reveal delay={100} className="max-w-[600px] mx-auto mt-8">
          <div
            className="flex items-center gap-2 rounded-[14px] border border-border-secondary bg-white p-2 pl-5 cursor-text"
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

      {/* Real product output, presented like a product video: pinned while
          its track scrolls by, zooming to full-bleed at the midpoint, then
          releasing back to resting size as the page continues past it. */}
      <div ref={trackRef} className="relative h-[220vh]">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div ref={targetRef} className="container-page w-full will-change-transform">
            <div className="rounded-2xl border border-border-primary overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.1)]">
              <Image
                src="/screenshots/flow-4-editor.png"
                alt="A finished, editable deck generated by Imagine Computer"
                width={1920}
                height={1080}
                className="w-full h-auto block"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
