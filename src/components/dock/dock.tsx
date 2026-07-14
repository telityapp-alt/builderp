import * as React from "react"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useLocation } from "react-router-dom"
import { useTheme } from "next-themes"
import { Sun, Moon, Volume2, VolumeX, X } from "lucide-react"

import {
  OverviewOutlined, OverviewFilled,
  BuilderOutlined, BuilderFilled,
  AccountingOutlined, AccountingFilled,
  InventoryOutlined, InventoryFilled,
  SettingsOutlined, SettingsFilled,
} from "@/components/icons"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MotionLink } from "./custom-motion-link"
import { useUiSound } from "@/components/sound/sound-provider"

type NavItem = {
  href: string
  label: string
  Outlined: React.ComponentType<{ className?: string }>
  Filled: React.ComponentType<{ className?: string }>
  match: (pathname: string) => boolean
}

const NAV: NavItem[] = [
  { href: "/", label: "Overview", Outlined: OverviewOutlined, Filled: OverviewFilled, match: (p) => p === "/" },
  { href: "/builder", label: "App Builder", Outlined: BuilderOutlined, Filled: BuilderFilled, match: (p) => p.startsWith("/builder") },
  { href: "/accounting", label: "Accounting", Outlined: AccountingOutlined, Filled: AccountingFilled, match: (p) => p.startsWith("/accounting") },
  { href: "/inventory", label: "Inventory", Outlined: InventoryOutlined, Filled: InventoryFilled, match: (p) => p.startsWith("/inventory") },
  { href: "/modules", label: "Modules", Outlined: SettingsOutlined, Filled: SettingsFilled, match: (p) => p.startsWith("/modules") },
]

const DOCK_SHADOW =
  "shadow-[_0_1px_1px_-0.5px_rgba(0,0,0,0.04),_0_3px_3px_-1.5px_rgba(0,0,0,0.04),_0_12px_12px_-6px_rgba(0,0,0,0.04)]"

export default function Dock() {
  const { theme, setTheme } = useTheme()
  const { pathname } = useLocation()
  const [mounted, setMounted] = useState(false)

  const { enabled: soundEnabled, toggleEnabled, playClick, playLight, playDark, playOn, playOff } = useUiSound()

  const [showHint, setShowHint] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const dismissed = localStorage.getItem("dock-hint-dismissed")
    if (!dismissed) setShowHint(true)
  }, [])

  const dismissHint = () => {
    setShowHint(false)
    localStorage.setItem("dock-hint-dismissed", "1")
  }

  const handleNavClick = () => {
    playClick()
    dismissHint()
  }

  const handleThemeClick = () => {
    if (theme === "dark") {
      setTheme("light")
      playLight()
    } else {
      setTheme("dark")
      playDark()
    }
  }

  const handleAudioClick = () => {
    if (soundEnabled) playOff()
    else playOn()
    toggleEnabled()
  }

  if (!mounted) return null

  return (
    <div className="w-full px-4 fixed flex flex-col gap-2 items-center rounded-lg bottom-4 left-1/2 -translate-x-1/2 max-w-fit z-50">
      {showHint && (
        <div className="bg-component w-fit font-medium text-sm pl-3 pr-2 py-1.5 rounded-2xl flex gap-2 z-20 items-center whitespace-nowrap shadow-lg border">
          Coba klik menu di bawah ini
          <button
            onClick={dismissHint}
            aria-label="Tutup"
            className="rounded-full p-0.5 opacity-60 hover:opacity-100 hover:bg-accent transition-opacity"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}

      <motion.div
        className={`w-full px-2 py-2 bg-component border scrollbar-none overflow-y-hidden overflow-x-auto sm:overflow-visible rounded-2xl w-fit flex h-[3.5rem] items-center gap-2 relative z-10 ${DOCK_SHADOW}`}
      >
        {NAV.map((item) => (
          <AppIcon
            key={item.href}
            href={item.href}
            label={item.label}
            isActive={item.match(pathname)}
            FilledIcon={item.Filled}
            OutlinedIcon={item.Outlined}
            onClick={handleNavClick}
          />
        ))}

        <Separator className="mx-1.5" orientation="vertical" />

        <ModeToggle
          handleClick={handleThemeClick}
          FilledIcon={Sun}
          OutlinedIcon={Moon}
          ariaLabel="Toggle Theme"
          isActive={theme === "dark"}
        />
        <ModeToggle
          handleClick={handleAudioClick}
          FilledIcon={Volume2}
          OutlinedIcon={VolumeX}
          ariaLabel="Toggle Audio"
          isActive={soundEnabled}
          className="audio-toggle-button"
        />
      </motion.div>
    </div>
  )
}

interface AppIconProps {
  href: string
  label: string
  isActive: boolean
  FilledIcon: React.ComponentType<{ className?: string }>
  OutlinedIcon: React.ComponentType<{ className?: string }>
  onClick: () => void
}

function AppIcon({ href, label, isActive, FilledIcon, OutlinedIcon, onClick }: AppIconProps) {
  const Icon = isActive ? FilledIcon : OutlinedIcon
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <MotionLink
            href={href}
            className={`shrink-0 overflow-hidden flex h-10 rounded-xl items-center justify-center px-[10px] ${isActive ? "bg-component-active" : "hover:bg-accent"} relative`}
            onClick={onClick}
          >
            <Icon className="h-5 w-5 shrink-0 relative z-10" />
            <AnimatePresence initial={false}>
              {isActive && (
                <motion.span
                  key="label"
                  initial={{ opacity: 0, width: 0, marginLeft: 4 }}
                  animate={{ opacity: 1, width: "auto", marginLeft: 4 }}
                  transition={{ type: "spring", duration: 0.6, bounce: 0 }}
                  exit={{
                    opacity: 0,
                    width: 0,
                    marginLeft: 0,
                    transition: {
                      opacity: { duration: 0.2 },
                      marginLeft: { delay: 0.2, duration: 0.2 },
                      width: { type: "spring", duration: 0.6, bounce: 0 },
                    },
                  }}
                  className="text-sm font-medium whitespace-nowrap overflow-hidden text-accent-foreground leading-snug relative z-10"
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>
          </MotionLink>
        </TooltipTrigger>
        <TooltipContent>
          <span>{label}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

interface ModeToggleProps {
  handleClick: () => void
  FilledIcon: React.ComponentType<{ className?: string }>
  OutlinedIcon: React.ComponentType<{ className?: string }>
  ariaLabel: string
  isActive?: boolean
  className?: string
}

function ModeToggle({ handleClick, FilledIcon, OutlinedIcon, ariaLabel, isActive = true, className }: ModeToggleProps) {
  const Icon = isActive ? FilledIcon : OutlinedIcon
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClick}
            aria-label={ariaLabel}
            className={`shrink-0 aspect-square w-[2.5rem] h-[2.5rem] rounded-xl relative flex items-center justify-center ${className ?? ""}`}
          >
            <Icon className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>{ariaLabel}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

AppIcon.displayName = "AppIcon"
ModeToggle.displayName = "ModeToggle"
