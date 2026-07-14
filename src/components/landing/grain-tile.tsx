import * as React from "react"
import { Grain } from "@/components/ui/grain"
import { cn } from "@/lib/utils"

/**
 * Colored grain tiles with a Duolingo-style flat 3D bottom shadow.
 * Used all over the landing page. Tones: orange / blue / green.
 */
export type Tone = "orange" | "blue" | "green" | "cream"

const TONES: Record<Tone, { from: string; to: string; shadow: string; text: string }> = {
  orange: { from: "#ff9d3c", to: "#ef5c0c", shadow: "#b83c00", text: "#ffffff" },
  blue: { from: "#4aa8ff", to: "#1f6fe0", shadow: "#124a9c", text: "#ffffff" },
  green: { from: "#54d17a", to: "#1f9d4d", shadow: "#137a37", text: "#ffffff" },
  cream: { from: "#fff6ec", to: "#ffe9d3", shadow: "#eab892", text: "#7c2d12" },
}

interface GrainTileProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: Tone
  depth?: number
  grain?: number
}

export function GrainTile({
  tone = "orange",
  depth = 8,
  grain = 0.9,
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
        boxShadow: `0 ${depth}px 0 0 ${t.shadow}, 0 ${depth * 2 + 4}px ${depth * 3}px -${depth}px rgba(120,50,0,0.35)`,
        ...style,
      }}
      {...props}
    >
      <Grain opacity={grain} blend="overlay" size={90} />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

/** Small floating label pill in a grain tone (for hero decorations). */
export function GrainPill({
  tone = "orange",
  icon,
  label,
  className,
}: {
  tone?: Tone
  icon?: React.ReactNode
  label: string
  className?: string
}) {
  const t = TONES[tone]
  return (
    <div
      className={cn("absolute z-10 hidden items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-semibold sm:inline-flex", className)}
      style={{
        background: `linear-gradient(to bottom, ${t.from}, ${t.to})`,
        color: t.text,
        boxShadow: `0 4px 0 0 ${t.shadow}`,
      }}
    >
      {icon}
      {label}
    </div>
  )
}
