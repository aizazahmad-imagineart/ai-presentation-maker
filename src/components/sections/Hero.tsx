"use client";

import { useRef, useState } from "react";
import { Sparkle, UploadSimple, X } from "@phosphor-icons/react";
import { Reveal } from "@/components/primitives/Reveal";
import { ButtonLink } from "@/components/Button";

export function Hero() {
  const [prompt, setPrompt] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const promptValue = file ? file.name : prompt;
  const generateHref = `https://www.imagine.art/computer${promptValue.trim() ? `?prompt=${encodeURIComponent(promptValue.trim())}` : ""}`;

  return (
    <section className="relative border-b border-border-primary">
      <div className="container-page min-h-screen flex flex-col items-center justify-center pt-[120px] pb-16 md:pt-[144px] md:pb-20">
        <div className="relative w-full flex flex-col items-center -mt-6 md:-mt-10">
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

          <Reveal className="flex flex-col items-center text-center max-w-[600px] mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-border-primary px-4 py-[7px] text-[13px] font-medium text-content-secondary mb-7">
              <Sparkle size={14} weight="fill" className="text-content-primary" />
              Text, outline, or PDF in. Polished deck out.
            </span>

            <h1
              className="font-display font-semibold capitalize leading-[1.04] tracking-[-1.5px] text-content-primary m-0"
              style={{ fontSize: "clamp(40px, 6vw, 76px)" }}
            >
              <span className="block font-mono text-[13px] md:text-[14px] font-semibold uppercase tracking-[1.8px] text-content-tertiary mb-3">
                AI Presentation Maker
              </span>
              Your Next Deck, Drafted{" "}
              <span className="font-serif-accent italic font-normal normal-case tracking-normal">in Minutes</span>
            </h1>

            <p className="font-sans text-content-secondary leading-[1.7] tracking-[-0.005em] max-w-[600px] mt-5" style={{ fontSize: "clamp(16px, 1.6vw, 19px)" }}>
              Imagine Computer&apos;s AI presentation maker turns a rough idea, an outline, or an old
              PDF into a fully designed deck. Written, structured, and styled in one pass, so the
              only thing left to do is present it.
            </p>
          </Reveal>

          {/* Try-it input bar */}
          <Reveal delay={100} className="w-full max-w-[700px] mx-auto mt-8">
            <div
              className="flex items-center gap-2 rounded-[14px] border border-border-secondary bg-white p-2 pl-5 cursor-text"
              onClick={() => inputRef.current?.focus()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.ppt,.pptx,.doc,.docx"
                className="hidden"
                onChange={(e) => {
                  const selected = e.target.files?.[0];
                  if (selected) {
                    setFile(selected);
                    setPrompt("");
                  }
                }}
              />
              <button
                type="button"
                aria-label="Upload a PDF"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="flex items-center justify-center w-8 h-8 rounded-full text-content-tertiary hover:text-content-primary hover:bg-black/[0.05] cursor-pointer shrink-0 transition-colors"
              >
                <UploadSimple size={18} weight="regular" />
              </button>
              <input
                ref={inputRef}
                type="text"
                value={promptValue}
                onChange={(e) => {
                  setFile(null);
                  setPrompt(e.target.value);
                }}
                readOnly={!!file}
                placeholder="Add your topic, outline, or a PDF to get started…"
                className="flex-1 min-w-0 bg-transparent border-0 outline-none text-[15px] text-content-primary placeholder:text-content-tertiary"
              />
              {file && (
                <button
                  type="button"
                  aria-label="Remove file"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="flex items-center justify-center text-content-tertiary hover:text-content-primary shrink-0 transition-colors"
                >
                  <X size={16} weight="regular" />
                </button>
              )}
              <ButtonLink href={generateHref} size="md" variant="brand" className="shrink-0">
                Generate
              </ButtonLink>
            </div>
          </Reveal>

          <p className="text-[13px] text-content-tertiary mt-5">No design skills or credit card needed.</p>
        </div>
      </div>
    </section>
  );
}
