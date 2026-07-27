"use client";

import { DotsSixVertical, CursorClick, Sparkle, Check, FilePdf } from "@phosphor-icons/react";

/** Small "selected element" corner handles — the visual shorthand for "this is editable." */
function Handles() {
  const pos = [
    "top-[-4px] left-[-4px]",
    "top-[-4px] right-[-4px]",
    "bottom-[-4px] left-[-4px]",
    "bottom-[-4px] right-[-4px]",
  ];
  return (
    <>
      {pos.map((p) => (
        <span key={p} className={`absolute ${p} w-[7px] h-[7px] rounded-[1.5px] bg-white border border-accent shadow-[0_0_0_1px_rgba(109,63,246,0.15)]`} />
      ))}
    </>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-border-primary shadow-[0_4px_12px_rgba(109,63,246,0.12)] px-2.5 py-1 text-[11px] font-medium text-content-secondary whitespace-nowrap">
      {children}
    </span>
  );
}

function MockPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-full min-h-[168px] rounded-2xl bg-white/70 border border-border-primary overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: "radial-gradient(rgb(0 0 0 / 0.06) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
      <div className="relative w-full h-full flex items-center justify-center p-6">{children}</div>
    </div>
  );
}

/** "Fix the structure" — a slide bar mid-drag, being reordered. */
export function ReorderMock() {
  return (
    <MockPanel>
      <div className="w-full max-w-[240px] flex flex-col gap-2.5">
        <div className="flex items-center gap-2 rounded-lg bg-black/[0.04] px-2.5 py-2">
          <DotsSixVertical size={13} className="text-content-tertiary shrink-0" />
          <div className="h-1.5 flex-1 rounded-full bg-black/[0.1]" />
        </div>

        <div className="relative">
          <div className="relative flex items-center gap-2 rounded-lg bg-white px-2.5 py-2 shadow-[0_10px_24px_rgba(109,63,246,0.22)] rotate-[-1.5deg]">
            <Handles />
            <DotsSixVertical size={13} className="text-accent shrink-0" />
            <div className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-accent/40 to-accent-pink/40" />
            <CursorClick size={14} weight="fill" className="text-content-primary absolute -right-3 -bottom-3" />
          </div>
          <div className="absolute -top-6 right-0">
            <Chip>Reordering…</Chip>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-black/[0.04] px-2.5 py-2">
          <DotsSixVertical size={13} className="text-content-tertiary shrink-0" />
          <div className="h-1.5 flex-1 rounded-full bg-black/[0.1]" />
        </div>
      </div>
    </MockPanel>
  );
}

/** "Look consistent" — three thumbnails sharing one applied brand palette. */
export function BrandMock() {
  return (
    <MockPanel>
      <div className="w-full max-w-[260px] flex flex-col items-center gap-4">
        <div className="flex gap-2.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-[64px] h-[46px] rounded-md bg-white border border-border-primary overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
              <div className="h-[7px] bg-gradient-to-r from-accent to-accent-pink" />
              <div className="p-1.5 flex flex-col gap-1">
                <div className="h-[3px] w-4/5 rounded-full bg-black/[0.1]" />
                <div className="h-[3px] w-3/5 rounded-full bg-black/[0.08]" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          {["bg-accent", "bg-accent-pink", "bg-accent-light", "bg-content-primary"].map((c) => (
            <span key={c} className={`w-4 h-4 rounded-full ${c} ring-2 ring-white shadow-sm`} />
          ))}
        </div>
        <Chip>
          <Check size={12} weight="bold" className="text-accent" />
          Applied to all slides
        </Chip>
      </div>
    </MockPanel>
  );
}

/** "Turn your notes into a deck" — PDF in, slides out. */
export function PdfToDeckMock() {
  return (
    <MockPanel>
      <div className="w-full max-w-[260px] flex items-center justify-center gap-3">
        <div className="flex flex-col items-center gap-2">
          <span className="flex items-center justify-center w-11 h-14 rounded-lg bg-white border border-border-primary shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-content-tertiary">
            <FilePdf size={20} weight="fill" className="text-accent/70" />
          </span>
          <span className="text-[10px] text-content-tertiary">report.pdf</span>
        </div>

        <div className="flex flex-col items-center gap-1 text-accent">
          <Sparkle size={14} weight="fill" />
          <div className="w-8 h-px bg-gradient-to-r from-accent/30 to-accent" />
        </div>

        <div className="relative flex gap-1.5">
          {[0, 1].map((i) => (
            <div key={i} className="w-[52px] h-[64px] rounded-md bg-white border border-border-primary shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-1.5 flex flex-col gap-1">
              <div className="h-[5px] w-3/5 rounded-full bg-gradient-to-r from-accent/50 to-accent-pink/50" />
              <div className="flex-1 rounded-sm bg-black/[0.04]" />
            </div>
          ))}
          <span className="absolute -top-5 -right-2">
            <Chip>3 slides</Chip>
          </span>
        </div>
      </div>
    </MockPanel>
  );
}

/** "Auto-generated charts" — a chart, freshly dropped onto the slide. */
export function ChartMock() {
  const bars = [40, 70, 55, 90, 65];
  return (
    <MockPanel>
      <div className="relative w-full max-w-[220px]">
        <div className="relative rounded-xl bg-white border border-border-primary shadow-[0_10px_24px_rgba(109,63,246,0.16)] p-4">
          <Handles />
          <div className="flex items-end gap-2 h-[80px]">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-accent to-accent-pink"
                style={{ height: `${h}%`, opacity: 0.55 + i * 0.09 }}
              />
            ))}
          </div>
        </div>
        <div className="absolute -top-6 right-0">
          <Chip>
            <Check size={12} weight="bold" className="text-accent" />
            Chart applied
          </Chip>
        </div>
      </div>
    </MockPanel>
  );
}
