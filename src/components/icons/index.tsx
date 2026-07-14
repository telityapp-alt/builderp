import * as React from "react"

type IconProps = { className?: string }

/**
 * Dual-state nav icons (outlined default / filled when active),
 * matching the portfolio dock convention. 24×24, currentColor.
 */

// ── Overview / Dashboard ─────────────────────────────────────
export function OverviewOutlined({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  )
}
export function OverviewFilled({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  )
}

// ── Analytics ────────────────────────────────────────────────
export function AnalyticsOutlined({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 3v16.5a1.5 1.5 0 0 0 1.5 1.5H21" />
      <rect x="7" y="12" width="3" height="5" rx="0.8" />
      <rect x="12.5" y="8" width="3" height="9" rx="0.8" />
      <rect x="18" y="5" width="3" height="12" rx="0.8" />
    </svg>
  )
}
export function AnalyticsFilled({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 3v16.5a1.5 1.5 0 0 0 1.5 1.5H21" />
      <rect x="7" y="12" width="3" height="5" rx="0.8" fill="currentColor" />
      <rect x="12.5" y="8" width="3" height="9" rx="0.8" fill="currentColor" />
      <rect x="18" y="5" width="3" height="12" rx="0.8" fill="currentColor" />
    </svg>
  )
}

// ── App Builder (stacked blocks) ─────────────────────────────
export function BuilderOutlined({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1.6" />
      <rect x="14" y="3" width="7" height="7" rx="1.6" />
      <rect x="3" y="14" width="7" height="7" rx="1.6" />
      <path d="M17.5 14v7M14 17.5h7" />
    </svg>
  )
}
export function BuilderFilled({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1.6" fill="currentColor" />
      <rect x="14" y="3" width="7" height="7" rx="1.6" fill="currentColor" />
      <rect x="3" y="14" width="7" height="7" rx="1.6" fill="currentColor" />
      <path d="M17.5 14v7M14 17.5h7" />
    </svg>
  )
}

// ── Accounting / Wallet ──────────────────────────────────────
export function AccountingOutlined({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="6" width="18" height="14" rx="2.5" />
      <path d="M3 9h18" />
      <circle cx="16.5" cy="14.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  )
}
export function AccountingFilled({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="6" width="18" height="14" rx="2.5" fill="currentColor" />
      <circle cx="16.5" cy="14.5" r="1.3" className="fill-component" />
    </svg>
  )
}

// ── Inventory / ERP (cube) ───────────────────────────────────
export function InventoryOutlined({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2.8 21 7.5v9L12 21.2 3 16.5v-9L12 2.8Z" />
      <path d="M3.3 7.6 12 12l8.7-4.4" />
      <path d="M12 12v9" />
    </svg>
  )
}
export function InventoryFilled({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2.8 21 7.5v9L12 21.2 3 16.5v-9L12 2.8Z" fill="currentColor" />
      <path d="M3.3 7.6 12 12l8.7-4.4" className="stroke-component" />
      <path d="M12 12v9" className="stroke-component" />
    </svg>
  )
}

// ── Settings / Gear ──────────────────────────────────────────
export function SettingsOutlined({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z" />
    </svg>
  )
}
export function SettingsFilled({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z" />
      <circle cx="12" cy="12" r="3" className="fill-component" />
    </svg>
  )
}
