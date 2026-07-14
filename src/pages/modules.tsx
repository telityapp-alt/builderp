import * as React from "react"
import { Link } from "react-router-dom"
import {
  LayoutDashboard, Blocks, Wallet, Package, Factory, ShieldCheck,
  ShoppingCart, Users, Settings2, ArrowRight,
} from "lucide-react"
import { PageShell, Section } from "@/components/layout/page-shell"
import { Grain } from "@/components/ui/grain"
import { cn } from "@/lib/utils"

const MODULES: { href: string; label: string; note: string; icon: React.ReactNode }[] = [
  { href: "/", label: "Overview", note: "Ringkasan performa bisnis kamu.", icon: <LayoutDashboard className="size-5" /> },
  { href: "/builder", label: "App Builder", note: "Rakit dashboard & modul sendiri.", icon: <Blocks className="size-5" /> },
  { href: "/accounting", label: "Accounting", note: "Pembukuan & laporan keuangan.", icon: <Wallet className="size-5" /> },
  { href: "/inventory", label: "Inventory", note: "Stok, gudang, dan perpindahan barang.", icon: <Package className="size-5" /> },
  { href: "/manufacturing", label: "Manufacturing", note: "Work order & proses produksi.", icon: <Factory className="size-5" /> },
  { href: "/quality-control", label: "Quality Control", note: "Inspeksi mutu & pencatatan cacat.", icon: <ShieldCheck className="size-5" /> },
  { href: "/purchasing", label: "Purchasing", note: "Pesanan pembelian ke supplier.", icon: <ShoppingCart className="size-5" /> },
  { href: "/hr", label: "HR & Payroll", note: "Data karyawan & penggajian.", icon: <Users className="size-5" /> },
  { href: "/settings", label: "Settings", note: "Profil bisnis, pengguna, preferensi.", icon: <Settings2 className="size-5" /> },
]

export default function ModulesPage() {
  return (
    <PageShell title="Modules" description="Semua modul Mini ERP kamu, dalam satu tempat.">
      <Section stagger={2}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {MODULES.map((m) => (
            <ModuleCard key={m.href} {...m} />
          ))}
        </div>
      </Section>
    </PageShell>
  )
}

function ModuleCard({ href, label, note, icon }: { href: string; label: string; note: string; icon: React.ReactNode }) {
  return (
    <Link
      to={href}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-component p-4",
        "flex items-start gap-3 shadow-sm transition-colors hover:bg-accent/60"
      )}
    >
      <Grain opacity={0.05} blend="overlay" size={48} />
      <span className="relative z-10 grid size-9 shrink-0 place-items-center rounded-lg bg-accent text-foreground">
        {icon}
      </span>
      <span className="relative z-10 flex flex-1 flex-col gap-0.5 min-w-0">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-xs text-muted-foreground leading-relaxed">{note}</span>
      </span>
      <ArrowRight className="relative z-10 mt-1 size-4 shrink-0 text-muted-foreground opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
    </Link>
  )
}
