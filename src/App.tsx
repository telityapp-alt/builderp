import { Routes, Route, useLocation } from "react-router-dom"
import { AppBackground } from "@/components/layout/app-background"
import Dock from "@/components/dock/dock"
import OverviewPage from "@/pages/overview"
import AppBuilderPage from "@/pages/app-builder"
import LandingPage from "@/pages/landing"
import { AccountingPage, InventoryPage, SettingsPage } from "@/pages/placeholder"

export default function App() {
  const { pathname } = useLocation()
  // Landing has its own chrome — keep the app dock off it.
  const hideDock = pathname.startsWith("/landing")

  return (
    <>
      <AppBackground />
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/builder" element={<AppBuilderPage />} />
        <Route path="/accounting" element={<AccountingPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
      {!hideDock && <Dock />}
    </>
  )
}
