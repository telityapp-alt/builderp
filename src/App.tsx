import { Routes, Route, useLocation } from "react-router-dom"
import { AppBackground } from "@/components/layout/app-background"
import Dock from "@/components/dock/dock"
import OverviewPage from "@/pages/overview"
import AppBuilderPage from "@/pages/app-builder"
import LandingPage from "@/pages/landing"
import ModulesPage from "@/pages/modules"
import ToolDetailPage from "@/pages/tool-detail"
import {
  AccountingPage, InventoryPage, SettingsPage,
  ManufacturingPage, QualityControlPage, PurchasingPage, HRPage,
} from "@/pages/placeholder"

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
        <Route path="/modules" element={<ModulesPage />} />
        <Route path="/tools/:slug" element={<ToolDetailPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/manufacturing" element={<ManufacturingPage />} />
        <Route path="/quality-control" element={<QualityControlPage />} />
        <Route path="/purchasing" element={<PurchasingPage />} />
        <Route path="/hr" element={<HRPage />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
      {!hideDock && <Dock />}
    </>
  )
}
