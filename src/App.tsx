import { Routes, Route } from "react-router-dom"
import { AppBackground } from "@/components/layout/app-background"
import Dock from "@/components/dock/dock"
import OverviewPage from "@/pages/overview"
import AppBuilderPage from "@/pages/app-builder"
import { AccountingPage, InventoryPage, SettingsPage } from "@/pages/placeholder"

export default function App() {
  return (
    <>
      <AppBackground />
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/builder" element={<AppBuilderPage />} />
        <Route path="/accounting" element={<AccountingPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
      <Dock />
    </>
  )
}
