import * as React from "react"
import { createContext, useContext, useState } from "react"
import { useSound } from "use-sound"

/**
 * Central sound system — mirrors the portfolio dock's use-sound setup.
 * Sounds respect a single `enabled` flag (default OFF on mobile/touch).
 * The "turn-on" sound uses forceSoundEnabled so enabling audio is always audible.
 */

type SoundContextValue = {
  enabled: boolean
  setEnabled: (v: boolean) => void
  toggleEnabled: () => void
  playClick: () => void
  playLight: () => void
  playDark: () => void
  playOn: () => void
  playOff: () => void
  playError: () => void
}

const SoundContext = createContext<SoundContextValue | null>(null)

function isMobile() {
  if (typeof window === "undefined") return false
  return window.innerWidth <= 768
}

const soundOpts = (enabled: boolean) => ({ soundEnabled: enabled, volume: 0.5 })

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(!isMobile())

  const [playClick] = useSound("/sounds/click.wav", soundOpts(enabled))
  const [playLight] = useSound("/sounds/lightmode.wav", soundOpts(enabled))
  const [playDark] = useSound("/sounds/darkmode.wav", soundOpts(enabled))
  const [playOff] = useSound("/sounds/turn-off.wav", soundOpts(enabled))
  const [playError] = useSound("/sounds/error.wav", soundOpts(enabled))
  // Always audible so users hear audio switching back on.
  const [playOn] = useSound("/sounds/turn-on.wav", { forceSoundEnabled: true, volume: 0.5 })

  const toggleEnabled = () => setEnabled((v) => !v)

  const value: SoundContextValue = {
    enabled,
    setEnabled,
    toggleEnabled,
    playClick,
    playLight,
    playDark,
    playOn,
    playOff,
    playError,
  }

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}

export function useUiSound() {
  const ctx = useContext(SoundContext)
  if (!ctx) throw new Error("useUiSound must be used within <SoundProvider>")
  return ctx
}
