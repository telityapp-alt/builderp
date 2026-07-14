import * as React from "react"
import { Link } from "react-router-dom"
import {
  LayoutDashboard, Blocks, Wallet, Package, Factory, ShieldCheck,
  ShoppingCart, Users, Settings2, Search,
} from "lucide-react"
import { PageShell, Section } from "@/components/layout/page-shell"
import { GrainTile } from "@/components/landing/grain-tile"
import { TOOLS, TOOL_CATEGORIES } from "@/data/tools"
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

      <Section stagger={3} className="gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-medium tracking-[-0.3px]">Tools</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Library kalkulator & utilitas siap pakai buat bisnis kamu.
          </p>
        </div>
        <ToolsLibrary />
      </Section>
    </PageShell>
  )
}

function ModuleCard({ href, label, note, icon }: { href: string; label: string; note: string; icon: React.ReactNode }) {
  return (
    <Link to={href} className="block">
      <GrainTile tone="dark" depth={4} grain={0.7} pressable className="flex items-start gap-3 p-4">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white/10">{icon}</span>
        <span className="flex flex-1 flex-col gap-0.5 min-w-0">
          <span className="text-sm font-medium">{label}</span>
          <span className="text-xs text-white/60 leading-relaxed">{note}</span>
        </span>
      </GrainTile>
    </Link>
  )
}

function ToolsLibrary() {
  const [query, setQuery] = React.useState("")
  const [category, setCategory] = React.useState<string>("Semua")

  const filtered = TOOLS.filter((t) => {
    const matchesCategory = category === "Semua" || t.category === category
    const matchesQuery =
      query.trim() === "" ||
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.category.toLowerCase().includes(query.toLowerCase())
    return matchesCategory && matchesQuery
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari tools..."
            className="w-full rounded-xl border border-border bg-component py-2 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {["Semua", ...TOOL_CATEGORIES].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-xl border px-3 py-1.5 text-xs font-medium transition-colors",
                category === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-component text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">Nggak ada tools yang cocok.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {filtered.map((t) => (
            <ToolCard key={t.slug} slug={t.slug} name={t.name} category={t.category} note={t.note} />
          ))}
        </div>
      )}
    </div>
  )
}

function ToolCard({ slug, name, category, note }: { slug: string; name: string; category: string; note: string }) {
  return (
    <Link to={`/tools/${slug}`} className="block">
      <GrainTile tone="orange" depth={4} grain={0.7} pressable className="flex flex-col gap-3 p-4" style={{ color: "#1a1206" }}>
        <span className="inline-flex w-fit items-center rounded-lg bg-black/10 px-2 py-0.5 text-[10px] font-medium">
          {category}
        </span>
        <span className="flex flex-col gap-1">
          <span className="text-sm font-medium">{name}</span>
          <span className="text-xs text-black/70 leading-relaxed">{note}</span>
        </span>
      </GrainTile>
    </Link>
  )
}
