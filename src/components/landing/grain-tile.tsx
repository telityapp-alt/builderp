import * as React from "react"
import { Grain } from "@/components/ui/grain"
import { cn } from "@/lib/utils"

/**
 * Grain tiles with a Duolingo-style flat 3D bottom shadow.
 * Default is `dark` (our neutral dark card, hue-220) — used for most blocks.
 * orange / blue are accents; orange is used for highlights. No green.
 */
export type Tone = "dark" | "orange" | "blue" | "cream"

const TONES: Record<Tone, { from: string; to: string; shadow: string; text: string }> = {
  dark: { from: "#262930", to: "#141619", shadow: "#090a0c", text: "#ffffff" },
  orange: { from: "#ff9d3c", to: "#ef5c0c", shadow: "#b83c00", text: "#ffffff" },
  blue: { from: "#4aa8ff", to: "#1f6fe0", shadow: "#124a9c", text: "#ffffff" },
  cream: { from: "#fff6ec", to: "#ffe9d3", shadow: "#eab892", text: "#7c2d12" },
}

interface GrainTileProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: Tone
  depth?: number
  grain?: number
}

export function GrainTile({
  tone = "dark",
  depth = 8,
  grain = 0.85,
  className,
  children,
  style,
  ...props
}: GrainTileProps) {
  const t = TONES[tone]
  return (
    <div
      className={cn("relative overflow-hidden rounded-2xl", className)}
      style={{
        background: `linear-gradient(to bottom, ${t.from}, ${t.to})`,
        color: t.text,
        boxShadow: `0 ${depth}px 0 0 ${t.shadow}, 0 ${depth * 2 + 4}px ${depth * 3}px -${depth}px rgba(10,15,25,0.4)`,
        ...style,
      }}
      {...props}
    >
      <Grain opacity={grain} blend="overlay" size={90} />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
