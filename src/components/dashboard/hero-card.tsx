import * as React from "react"
import { Sparkles } from "lucide-react"
import { Grain } from "@/components/ui/grain"

/**
 * Overview hero — orange HARD-grain surface with a big, tilted 3D "Duolingo"
 * pressable button (a line of text above it) and small Duolingo-style label
 * blocks around it (solid, flat bottom shadow, no icon).
 */
export function HeroCard() {
  return (
    <div
      className="relative overflow-hidden rounded-3xl px-6 py-12 shadow-[0_10px_0_0_#c14a08,0_26px_40px_-12px_rgba(150,50,0,0.5)] sm:px-10 sm:py-16"
      style={{
        background:
          "radial-gradient(120% 140% at 50% 0%, #ffd9a8 0%, #ff9d3c 34%, #ff7a1a 62%, #f0590d 100%)",
      }}
    >
      {/* Hard grain over the whole card */}
      <Grain opacity={0.95} blend="overlay" size={110} />
      {/* Soft glow highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(closest-side, #fff3 0%, transparent 100%)" }}
      />

      {/* Duolingo-style label blocks (no icon, not too cornered) */}
      <DuoBlock className="left-8 top-9 -rotate-3 sm:left-16 sm:top-10" label="Scalable" />
      <DuoBlock className="right-8 top-10 rotate-2 sm:right-20 sm:top-11" label="Secure" />
      <DuoBlock className="bottom-10 left-10 rotate-3 sm:bottom-12 sm:left-24" label="Stable" />
      <DuoBlock className="bottom-9 right-8 -rotate-2 sm:bottom-11 sm:right-16" label="Production grade" />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-3 text-center">
        <span className="text-2xl font-semibold tracking-[-0.5px] text-white/90 sm:text-[2.25rem] leading-none drop-shadow-sm">
          Memperkenalkan
        </span>

        {/* Big tilted 3D pressable button (grain inside too) */}
        <div className="rotate-[-3deg]">
          <div className="relative flex items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-b from-[#ff9231] to-[#ef5c0c] px-6 py-3.5 sm:px-9 sm:py-5 shadow-[0_8px_0_0_#b83c00,0_18px_30px_-8px_rgba(150,50,0,0.6)]">
            <Grain opacity={0.9} blend="overlay" size={90} />
            <Sparkles className="relative z-10 size-8 shrink-0 text-white sm:size-11" />
            <span className="relative z-10 text-[2rem] font-bold tracking-[-0.5px] text-white sm:text-[3.25rem] leading-none whitespace-nowrap">
              App&nbsp;Builder
            </span>
          </div>
        </div>

        <p className="mt-1 max-w-md text-sm leading-relaxed text-white/90 sm:text-base">
          Rakit dashboard, accounting, sampai mini-ERP — semua dari satu tempat.
        </p>
      </div>
    </div>
  )
}

function DuoBlock({ className, label }: { className?: string; label: string }) {
  return (
    <div
      className={`absolute z-10 hidden rounded-xl bg-[#fff5ec] px-3 py-1.5 text-sm font-medium text-[#7c2d12] shadow-[0_4px_0_0_#eab892] sm:block ${className ?? ""}`}
    >
      {label}
    </div>
  )
}
