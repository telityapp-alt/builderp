import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Hard grain overlay — high-contrast grayscale fractal noise (feTurbulence).
 * Rendered as a tiled SVG data URI, blended over whatever sits beneath it.
 * Encoded via encodeURIComponent so all special chars are safe.
 */
const GRAIN_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'>" +
  "<filter id='g'>" +
  "<feTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/>" +
  "<feColorMatrix type='saturate' values='0'/>" +
  "<feComponentTransfer>" +
  "<feFuncR type='linear' slope='2.2' intercept='-0.6'/>" +
  "<feFuncG type='linear' slope='2.2' intercept='-0.6'/>" +
  "<feFuncB type='linear' slope='2.2' intercept='-0.6'/>" +
  "</feComponentTransfer>" +
  "</filter>" +
  "<rect width='100%' height='100%' filter='url(#g)'/>" +
  "</svg>"

export const HARD_GRAIN_URL = `url("data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}")`

interface GrainProps {
  className?: string
  opacity?: number
  blend?: React.CSSProperties["mixBlendMode"]
  size?: number
}

export function Grain({ className, opacity = 0.9, blend = "overlay", size = 100 }: GrainProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        backgroundImage: HARD_GRAIN_URL,
        backgroundSize: `${size}px ${size}px`,
        opacity,
        mixBlendMode: blend,
      }}
    />
  )
}
