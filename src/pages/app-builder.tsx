import * as React from "react"
import { useMemo, useState } from "react"
import {
  Check, LayoutDashboard, ShoppingBag, Boxes, Users2, Plus, Trash2, Table2,
  BarChart3, Zap, Rocket, Eye, Circle, Search, Star, CreditCard, ListOrdered,
  LayoutGrid, PanelTop, GripVertical, Settings2, Palette, ShoppingCart, MousePointerClick,
} from "lucide-react"
import { PageShell, Section } from "@/components/layout/page-shell"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Grain } from "@/components/ui/grain"
import { cn } from "@/lib/utils"
import { useUiSound } from "@/components/sound/sound-provider"

/* ═══════════════════════ Feature ↔ Section catalog ═══════════════════════ */

type SectionId =
  | "header" | "search" | "product-grid" | "product-list"
  | "cart" | "checkout" | "stats" | "chart" | "reviews"

const SECTION_META: Record<SectionId, { name: string; icon: React.ComponentType<{ className?: string }> }> = {
  "header": { name: "Header", icon: PanelTop },
  "search": { name: "Search Bar", icon: Search },
  "product-grid": { name: "Product Grid", icon: LayoutGrid },
  "product-list": { name: "Product List", icon: ListOrdered },
  "cart": { name: "Keranjang", icon: ShoppingCart },
  "checkout": { name: "Checkout", icon: CreditCard },
  "stats": { name: "Stat Tiles", icon: Table2 },
  "chart": { name: "Chart", icon: BarChart3 },
  "reviews": { name: "Reviews", icon: Star },
}

type FeatureId = "catalog" | "cart" | "payments" | "analytics" | "reviews"

const FEATURES: { id: FeatureId; name: string; desc: string; sections: SectionId[] }[] = [
  { id: "catalog", name: "Katalog Produk", desc: "Daftar & grid produk", sections: ["product-grid", "product-list"] },
  { id: "cart", name: "Keranjang", desc: "Keranjang belanja", sections: ["cart"] },
  { id: "payments", name: "Pembayaran", desc: "Checkout & bayar", sections: ["checkout"] },
  { id: "analytics", name: "Analitik", desc: "Statistik & grafik", sections: ["stats", "chart"] },
  { id: "reviews", name: "Ulasan", desc: "Rating & review produk", sections: ["reviews"] },
]

const BASE_SECTIONS: SectionId[] = ["header", "search"]

/* ═══════════════════════════════ Page ════════════════════════════════════ */

export default function AppBuilderPage() {
  const { playClick } = useUiSound()
  const [tab, setTab] = useState<"configure" | "design">("configure")
  const [appName, setAppName] = useState("Toko Saya")

  const [features, setFeatures] = useState<Record<FeatureId, boolean>>({
    catalog: true, cart: true, payments: false, analytics: true, reviews: false,
  })
  const [placed, setPlaced] = useState<SectionId[]>(["header", "product-grid", "stats"])

  const availableSections = useMemo<SectionId[]>(() => {
    const enabled = FEATURES.filter((f) => features[f.id]).flatMap((f) => f.sections)
    return [...BASE_SECTIONS, ...enabled]
  }, [features])

  const switchTab = (t: "configure" | "design") => {
    playClick()
    setTab(t)
  }

  return (
    <PageShell
      title="App Builder"
      description="Rakit aplikasi dengan drag & drop — bukan ngoding dari nol, tinggal susun section jadi."
      actions={
        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" onClick={() => playClick()}>
            <Eye className="size-4 mr-1.5" /> Preview
          </Button>
          <Button size="sm" onClick={() => playClick()}>
            <Rocket className="size-4 mr-1.5" /> Deploy
          </Button>
        </div>
      }
    >
      <Section stagger={2}>
        {/* Top tabs — langsung di atas */}
        <div className="inline-flex self-start rounded-xl border bg-component p-1">
          <TabButton active={tab === "configure"} onClick={() => switchTab("configure")} icon={<Settings2 className="size-4" />}>
            Configure
          </TabButton>
          <TabButton active={tab === "design"} onClick={() => switchTab("design")} icon={<Palette className="size-4" />}>
            Design
          </TabButton>
        </div>
      </Section>

      <Section stagger={3}>
        {tab === "configure" ? (
          <ConfigureTab appName={appName} setAppName={setAppName} features={features} setFeatures={setFeatures} />
        ) : (
          <DesignTab appName={appName} availableSections={availableSections} placed={placed} setPlaced={setPlaced} />
        )}
      </Section>
    </PageShell>
  )
}

function TabButton({
  active, onClick, icon, children,
}: { active: boolean; onClick: () => void; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-sm font-medium transition-colors",
        active ? "bg-component-active text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {icon}
      {children}
    </button>
  )
}

/* ═══════════════════════════ Configure tab ═══════════════════════════════ */

const STEPS = [
  { id: "template", label: "Template", desc: "Cetakan awal" },
  { id: "products", label: "Product Handling", desc: "Data & field produk" },
  { id: "features", label: "Feature Handling", desc: "Aktifkan fitur" },
  { id: "automations", label: "Automations", desc: "Aturan otomatis" },
  { id: "deploy", label: "Deploy", desc: "Rilis ke produksi" },
] as const
type StepId = (typeof STEPS)[number]["id"]

function ConfigureTab({
  appName, setAppName, features, setFeatures,
}: {
  appName: string
  setAppName: (v: string) => void
  features: Record<FeatureId, boolean>
  setFeatures: React.Dispatch<React.SetStateAction<Record<FeatureId, boolean>>>
}) {
  const { playClick } = useUiSound()
  const [active, setActive] = useState<StepId>("products")
  const activeIndex = STEPS.findIndex((s) => s.id === active)

  const goStep = (id: StepId) => {
    playClick()
    setActive(id)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* App name — sekarang jadi section di dalam Configure */}
      <Card className="flex items-center gap-3 p-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-foreground/5 text-sm font-medium text-foreground/60">
          {appName.charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-1 flex-col">
          <span className="text-xs text-muted-foreground">Nama aplikasi</span>
          <input
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            className="rounded-md bg-transparent text-base font-medium focus:outline-none"
            aria-label="Nama aplikasi"
          />
        </div>
        <Badge variant="success">Draft</Badge>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-4">
      {/* steps rail */}
      <Card className="p-3 h-fit lg:sticky lg:top-6">
        <div className="flex items-center justify-between px-2 py-1.5 mb-1">
          <span className="text-sm font-medium">Langkah</span>
          <Badge variant="secondary">{activeIndex + 1}/{STEPS.length}</Badge>
        </div>
        <div className="flex flex-col">
          {STEPS.map((step, i) => {
            const isActive = step.id === active
            const isDone = i < activeIndex
            return (
              <button
                key={step.id}
                onClick={() => goStep(step.id)}
                className={cn(
                  "group relative flex items-start gap-3 rounded-xl px-2.5 py-2.5 text-left transition-colors",
                  isActive ? "bg-component-active" : "hover:bg-accent"
                )}
              >
                {i < STEPS.length - 1 && (
                  <span className="absolute left-[26px] top-9 h-[calc(100%-14px)] w-px bg-border" />
                )}
                <span
                  className={cn(
                    "relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-medium tabular",
                    isDone ? "bg-[hsl(var(--success))] text-white"
                      : isActive ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  )}
                >
                  {isDone ? <Check className="size-3.5" /> : i + 1}
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-medium leading-tight">{step.label}</span>
                  <span className="text-xs text-muted-foreground leading-tight mt-0.5">{step.desc}</span>
                </span>
              </button>
            )
          })}
        </div>
      </Card>

      {/* step content */}
      <Card className="p-4 min-h-[420px]">
        {active === "template" && <StepTemplate />}
        {active === "products" && <StepProducts />}
        {active === "features" && <StepFeatures features={features} setFeatures={setFeatures} />}
        {active === "automations" && <StepAutomations />}
        {active === "deploy" && <StepDeploy />}
      </Card>
      </div>
    </div>
  )
}

const TEMPLATES = [
  { id: "dashboard", name: "Dashboard", note: "Analitik & KPI", icon: LayoutDashboard },
  { id: "pos", name: "Point of Sale", note: "Kasir & transaksi", icon: ShoppingBag },
  { id: "inventory", name: "Inventory", note: "Stok & gudang", icon: Boxes },
  { id: "crm", name: "CRM", note: "Pelanggan & leads", icon: Users2 },
]

function StepTemplate() {
  const [picked, setPicked] = useState("pos")
  return (
    <StepBody title="Pilih Template" subtitle="Cetakan awal yang bisa kamu ubah sepenuhnya.">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {TEMPLATES.map((t) => {
          const Icon = t.icon
          const on = picked === t.id
          return (
            <button
              key={t.id}
              onClick={() => setPicked(t.id)}
              className={cn(
                "flex flex-col items-start gap-3 rounded-xl border p-4 text-left transition-colors",
                on ? "border-primary bg-component-active" : "border-border hover:bg-accent"
              )}
            >
              <span className={cn("flex size-9 items-center justify-center rounded-lg", on ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground")}>
                <Icon className="size-5" />
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-medium">{t.name}</span>
                <span className="text-xs text-muted-foreground">{t.note}</span>
              </span>
            </button>
          )
        })}
      </div>
    </StepBody>
  )
}

function StepProducts() {
  const [fields, setFields] = useState([
    { name: "nama", type: "Text" },
    { name: "harga", type: "Number" },
    { name: "stok", type: "Number" },
    { name: "kategori", type: "Select" },
  ])
  const addField = () => setFields((f) => [...f, { name: "field_baru", type: "Text" }])
  const remove = (i: number) => setFields((f) => f.filter((_, idx) => idx !== i))

  return (
    <StepBody title="Product Handling" subtitle="Tabel “Produk” — atur field dan tipe datanya.">
      <div className="overflow-hidden rounded-xl border">
        <div className="flex items-center gap-2 border-b bg-secondary/40 px-4 py-2.5">
          <Table2 className="size-4 text-muted-foreground" />
          <span className="text-sm font-medium">Produk</span>
          <Badge variant="secondary" className="ml-auto">{fields.length} field</Badge>
        </div>
        <div className="divide-y">
          {fields.map((f, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-2.5">
              <span className="size-1.5 rounded-full bg-chart-1" />
              <span className="flex-1 text-sm font-medium tabular">{f.name}</span>
              <Badge variant="outline" className="text-xs">{f.type}</Badge>
              <button onClick={() => remove(i)} className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-destructive transition-colors" aria-label="Hapus field">
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
        <button onClick={addField} className="flex w-full items-center gap-2 border-t px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent transition-colors">
          <Plus className="size-4" /> Tambah field
        </button>
      </div>
    </StepBody>
  )
}

function StepFeatures({
  features, setFeatures,
}: {
  features: Record<FeatureId, boolean>
  setFeatures: React.Dispatch<React.SetStateAction<Record<FeatureId, boolean>>>
}) {
  const { playClick } = useUiSound()
  const toggle = (id: FeatureId) => {
    playClick()
    setFeatures((f) => ({ ...f, [id]: !f[id] }))
  }
  return (
    <StepBody title="Feature Handling" subtitle="Fitur yang aktif akan muncul jadi section siap drag di tab Design.">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {FEATURES.map((f) => {
          const on = features[f.id]
          return (
            <button
              key={f.id}
              onClick={() => toggle(f.id)}
              className={cn(
                "flex items-center gap-3 rounded-xl border p-4 text-left transition-colors",
                on ? "border-primary/40 bg-component-active" : "border-border hover:bg-accent"
              )}
            >
              <div className="flex flex-1 flex-col">
                <span className="text-sm font-medium">{f.name}</span>
                <span className="text-xs text-muted-foreground">{f.desc}</span>
                <span className="mt-1 text-xs text-muted-foreground">
                  {f.sections.length} section: {f.sections.map((s) => SECTION_META[s].name).join(", ")}
                </span>
              </div>
              <span className={cn("flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors", on ? "bg-[hsl(var(--success))]" : "bg-secondary")}>
                <span className={cn("size-4 rounded-full bg-white transition-transform", on && "translate-x-4")} />
              </span>
            </button>
          )
        })}
      </div>
    </StepBody>
  )
}

function StepAutomations() {
  const rules = [
    { when: "Stok produk < 10", then: "Kirim notifikasi ke admin", on: true },
    { when: "Invoice jatuh tempo", then: "Kirim email pengingat", on: true },
    { when: "Pesanan baru masuk", then: "Buat jurnal otomatis", on: false },
  ]
  return (
    <StepBody title="Automations" subtitle="Aturan “kalau begini, lakukan begitu”.">
      <div className="flex flex-col gap-3">
        {rules.map((r, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border bg-component p-4">
            <Zap className="size-4 shrink-0 text-[hsl(var(--warning))]" />
            <div className="flex flex-1 flex-col sm:flex-row sm:items-center sm:gap-2 text-sm">
              <span className="text-muted-foreground">Kalau</span>
              <span className="font-medium">{r.when}</span>
              <span className="text-muted-foreground">→</span>
              <span className="font-medium">{r.then}</span>
            </div>
            <span className={cn("flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors", r.on ? "bg-[hsl(var(--success))]" : "bg-secondary")}>
              <span className={cn("size-4 rounded-full bg-white transition-transform", r.on && "translate-x-4")} />
            </span>
          </div>
        ))}
      </div>
    </StepBody>
  )
}

function StepDeploy() {
  const logs = [
    { label: "Build aplikasi", done: true },
    { label: "Optimasi aset", done: true },
    { label: "Provision Supabase", done: true },
    { label: "Publish ke Cloudflare", done: false },
  ]
  return (
    <StepBody title="Deploy" subtitle="Rilis aplikasi ke produksi.">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-3 rounded-xl border bg-component p-4">
          <span className="text-sm font-medium">Target</span>
          <div className="flex items-center gap-2 rounded-lg bg-secondary/40 px-3 py-2 text-sm">
            <Rocket className="size-4 text-[#e8620f]" /> Cloudflare Workers
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-secondary/40 px-3 py-2 text-sm">
            <Boxes className="size-4 text-chart-2" /> Supabase (database)
          </div>
          <Button className="mt-1 w-full"><Rocket className="size-4 mr-1.5" /> Deploy sekarang</Button>
        </div>
        <div className="flex flex-col gap-2.5 rounded-xl border bg-component p-4">
          <span className="text-sm font-medium">Status build</span>
          {logs.map((l, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              {l.done ? <Check className="size-4 text-[hsl(var(--success))]" /> : <Circle className="size-4 animate-pulse text-muted-foreground" />}
              <span className={l.done ? "text-foreground" : "text-muted-foreground"}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </StepBody>
  )
}

/* ═══════════════════════════════ Design tab ══════════════════════════════ */

function DesignTab({
  appName, availableSections, placed, setPlaced,
}: {
  appName: string
  availableSections: SectionId[]
  placed: SectionId[]
  setPlaced: React.Dispatch<React.SetStateAction<SectionId[]>>
}) {
  const { playClick } = useUiSound()
  const [dragOver, setDragOver] = useState(false)
  const [selected, setSelected] = useState<number | null>(0)

  const addSection = (id: SectionId) => {
    playClick()
    setSelected(placed.length) // select the newly added one
    setPlaced((p) => [...p, id])
  }
  const removeAt = (i: number) => {
    setPlaced((p) => p.filter((_, idx) => idx !== i))
    setSelected(null)
  }
  const selectAt = (i: number) => {
    playClick()
    setSelected(i)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const id = e.dataTransfer.getData("text/plain") as SectionId
    if (id) addSection(id)
  }

  const selectedId = selected !== null ? placed[selected] : undefined

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[190px_minmax(0,1fr)_260px]">
      {/* palette */}
      <Card className="p-3 h-fit lg:sticky lg:top-6">
        <div className="px-2 py-1.5 mb-1">
          <span className="text-sm font-medium">Section</span>
          <p className="text-xs text-muted-foreground mt-0.5">Tarik / klik buat nambah</p>
        </div>
        <div className="flex flex-col gap-1.5">
          {availableSections.map((id) => {
            const meta = SECTION_META[id]
            const Icon = meta.icon
            return (
              <div
                key={id}
                draggable
                onDragStart={(e) => e.dataTransfer.setData("text/plain", id)}
                onClick={() => addSection(id)}
                className="flex cursor-grab items-center gap-2 rounded-xl border bg-component px-3 py-2 text-sm font-medium hover:bg-accent active:cursor-grabbing transition-colors"
              >
                <GripVertical className="size-3.5 text-muted-foreground/60" />
                <Icon className="size-4 text-muted-foreground" />
                {meta.name}
              </div>
            )
          })}
        </div>
        <p className="mt-3 px-2 text-xs text-muted-foreground">
          Mau section lain? Aktifkan fiturnya di tab <span className="font-medium text-foreground">Configure</span>.
        </p>
      </Card>

      {/* compact orange hard-grain card hugging the screen mockup */}
      <div className="flex justify-center">
        <div
          className="relative h-fit w-fit overflow-hidden rounded-3xl p-2.5 sm:p-3"
          style={{ background: "radial-gradient(120% 130% at 50% 0%, #ffcf9c 0%, #ff9436 40%, #f5620f 100%)" }}
        >
          <Grain opacity={0.95} blend="overlay" size={100} />

          {/* Screen-size mockup (no phone chrome) */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            className={cn(
              "relative z-10 aspect-[9/18] w-[270px] overflow-hidden rounded-[1.75rem] border-2 bg-background shadow-2xl transition-colors sm:w-[300px]",
              dragOver ? "border-white" : "border-white/70"
            )}
          >
            <div className="h-full overflow-y-auto scrollbar-none">
              {placed.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
                  <LayoutGrid className="size-6 text-muted-foreground" />
                  <p className="text-sm font-medium">Layar kosong</p>
                  <p className="text-xs text-muted-foreground">Tarik section dari kiri ke sini.</p>
                </div>
              ) : (
                <div className="flex flex-col">
                  {placed.map((id, i) => (
                    <div
                      key={i}
                      onClick={() => selectAt(i)}
                      className={cn(
                        "group relative cursor-pointer",
                        selected === i && "ring-2 ring-inset ring-primary"
                      )}
                    >
                      <SectionPreview id={id} appName={appName} />
                      <button
                        onClick={(e) => { e.stopPropagation(); removeAt(i) }}
                        className="absolute right-1.5 top-1.5 z-10 rounded-full bg-background/80 p-1 text-muted-foreground opacity-0 shadow-sm backdrop-blur transition-opacity hover:text-destructive group-hover:opacity-100"
                        aria-label="Hapus section"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* editor panel — muncul pas satu section di-klik */}
      <div className="lg:sticky lg:top-6 h-fit">
        {selectedId ? (
          <EditorPanel key={selected} sectionId={selectedId} />
        ) : (
          <Card className="flex flex-col items-center gap-2 p-6 text-center">
            <MousePointerClick className="size-5 text-muted-foreground" />
            <p className="text-sm font-medium">Belum ada yang dipilih</p>
            <p className="text-xs text-muted-foreground">Klik section di layar buat munculin blok editornya.</p>
          </Card>
        )}
      </div>
    </div>
  )
}

/* ── Per-section editor: klik section → keluar blok-blok pengaturan ──────── */
type EditorControl =
  | { kind: "text"; label: string; value: string }
  | { kind: "toggle"; label: string; on: boolean }
  | { kind: "select"; label: string; options: string[]; value: string }
  | { kind: "chips"; label: string; options: string[]; active: string[] }

const EDITORS: Record<SectionId, EditorControl[]> = {
  "header": [
    { kind: "text", label: "Judul", value: "Toko Saya" },
    { kind: "toggle", label: "Tampilkan menu", on: true },
    { kind: "toggle", label: "Sticky di atas", on: true },
  ],
  "search": [
    { kind: "text", label: "Placeholder", value: "Cari produk…" },
    { kind: "toggle", label: "Live search", on: true },
  ],
  "product-grid": [
    { kind: "select", label: "Kolom", options: ["2", "3"], value: "2" },
    { kind: "toggle", label: "Tampilkan harga", on: true },
    { kind: "toggle", label: "Tampilkan rating", on: false },
    { kind: "select", label: "Urutkan", options: ["Terbaru", "Terlaris", "Harga"], value: "Terbaru" },
  ],
  "product-list": [
    { kind: "toggle", label: "Tampilkan gambar", on: true },
    { kind: "toggle", label: "Tampilkan stok", on: true },
    { kind: "select", label: "Urutkan", options: ["Nama", "Harga", "Stok"], value: "Nama" },
  ],
  "cart": [
    { kind: "toggle", label: "Tampilkan qty", on: true },
    { kind: "toggle", label: "Tampilkan subtotal", on: true },
  ],
  "checkout": [
    { kind: "chips", label: "Metode bayar", options: ["QRIS", "Transfer", "COD"], active: ["QRIS", "Transfer"] },
    { kind: "toggle", label: "Butuh alamat", on: true },
  ],
  "stats": [
    { kind: "chips", label: "Metrik", options: ["Omzet", "Order", "Pelanggan", "Stok"], active: ["Omzet", "Order"] },
    { kind: "select", label: "Kolom", options: ["2", "3", "4"], value: "2" },
  ],
  "chart": [
    { kind: "select", label: "Tipe", options: ["Bar", "Line", "Area"], value: "Bar" },
    { kind: "select", label: "Periode", options: ["7 hari", "30 hari", "12 bulan"], value: "7 hari" },
  ],
  "reviews": [
    { kind: "toggle", label: "Tampilkan bintang", on: true },
    { kind: "select", label: "Jumlah", options: ["3", "5", "10"], value: "3" },
  ],
}

function EditorPanel({ sectionId }: { sectionId: SectionId }) {
  const meta = SECTION_META[sectionId]
  const Icon = meta.icon
  return (
    <Card className="p-3">
      <div className="mb-2 flex items-center gap-2 px-1 py-1">
        <Icon className="size-4 text-muted-foreground" />
        <span className="text-sm font-medium">Edit: {meta.name}</span>
      </div>
      <div className="flex flex-col gap-2">
        {EDITORS[sectionId].map((c, i) => (
          <ControlBlock key={i} control={c} />
        ))}
      </div>
    </Card>
  )
}

function ControlBlock({ control }: { control: EditorControl }) {
  if (control.kind === "toggle") return <ToggleControl label={control.label} initial={control.on} />
  if (control.kind === "text") return <TextControl label={control.label} initial={control.value} />
  if (control.kind === "select") return <SelectControl label={control.label} options={control.options} initial={control.value} />
  return <ChipsControl label={control.label} options={control.options} initial={control.active} />
}

const blockCls = "rounded-xl border bg-component p-3"

function ToggleControl({ label, initial }: { label: string; initial: boolean }) {
  const [on, setOn] = useState(initial)
  return (
    <div className={cn(blockCls, "flex items-center justify-between")}>
      <span className="text-sm">{label}</span>
      <button
        onClick={() => setOn((v) => !v)}
        className={cn("flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors", on ? "bg-[hsl(var(--success))]" : "bg-secondary")}
        aria-label={label}
      >
        <span className={cn("size-4 rounded-full bg-white transition-transform", on && "translate-x-4")} />
      </button>
    </div>
  )
}

function TextControl({ label, initial }: { label: string; initial: string }) {
  const [value, setValue] = useState(initial)
  return (
    <div className={cn(blockCls, "flex flex-col gap-1.5")}>
      <span className="text-xs text-muted-foreground">{label}</span>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="rounded-md border bg-background px-2.5 py-1.5 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  )
}

function SelectControl({ label, options, initial }: { label: string; options: string[]; initial: string }) {
  const [value, setValue] = useState(initial)
  return (
    <div className={cn(blockCls, "flex flex-col gap-1.5")}>
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => setValue(o)}
            className={cn(
              "rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
              value === o ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-accent"
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}

function ChipsControl({ label, options, initial }: { label: string; options: string[]; initial: string[] }) {
  const [active, setActive] = useState<string[]>(initial)
  const toggle = (o: string) =>
    setActive((a) => (a.includes(o) ? a.filter((x) => x !== o) : [...a, o]))
  return (
    <div className={cn(blockCls, "flex flex-col gap-1.5")}>
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => {
          const on = active.includes(o)
          return (
            <button
              key={o}
              onClick={() => toggle(o)}
              className={cn(
                "inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
                on ? "border-primary bg-component-active" : "border-border hover:bg-accent"
              )}
            >
              {on && <Check className="size-3" />}
              {o}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ── Hardcoded section previews rendered inside the screen mockup ─────────── */
function SectionPreview({ id, appName }: { id: SectionId; appName: string }) {
  switch (id) {
    case "header":
      return (
        <div className="flex items-center justify-between border-b bg-component px-3 py-2.5">
          <span className="text-sm font-semibold">{appName}</span>
          <span className="flex flex-col gap-[3px]">
            <span className="h-0.5 w-4 rounded bg-foreground/70" />
            <span className="h-0.5 w-4 rounded bg-foreground/70" />
            <span className="h-0.5 w-4 rounded bg-foreground/70" />
          </span>
        </div>
      )
    case "search":
      return (
        <div className="px-3 py-2">
          <div className="flex items-center gap-1.5 rounded-lg border bg-secondary/40 px-2.5 py-1.5">
            <Search className="size-3 text-muted-foreground" />
            <span className="text-[11px] text-muted-foreground">Cari produk…</span>
          </div>
        </div>
      )
    case "product-grid":
      return (
        <div className="grid grid-cols-2 gap-2 p-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-1 rounded-lg border bg-component p-1.5">
              <div className="aspect-square rounded bg-foreground/5" />
              <span className="h-1.5 w-3/4 rounded bg-foreground/15" />
              <span className="h-1.5 w-1/2 rounded bg-chart-1/60" />
            </div>
          ))}
        </div>
      )
    case "product-list":
      return (
        <div className="flex flex-col divide-y">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-2">
              <div className="size-8 shrink-0 rounded bg-foreground/5" />
              <div className="flex flex-1 flex-col gap-1">
                <span className="h-1.5 w-2/3 rounded bg-foreground/15" />
                <span className="h-1.5 w-1/3 rounded bg-chart-1/60" />
              </div>
            </div>
          ))}
        </div>
      )
    case "cart":
      return (
        <div className="flex flex-col gap-2 p-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="size-7 rounded bg-foreground/5" />
              <span className="h-1.5 flex-1 rounded bg-foreground/15" />
              <span className="text-[10px] tabular text-muted-foreground">×1</span>
            </div>
          ))}
          <div className="mt-1 flex items-center justify-between border-t pt-2 text-[11px] font-medium">
            <span>Total</span><span className="tabular">Rp 240.000</span>
          </div>
        </div>
      )
    case "checkout":
      return (
        <div className="flex flex-col gap-2 p-3">
          <span className="h-6 rounded-md border bg-secondary/40" />
          <span className="h-6 rounded-md border bg-secondary/40" />
          <div className="mt-1 flex items-center justify-center rounded-md bg-primary py-1.5 text-[11px] font-medium text-primary-foreground">
            Bayar sekarang
          </div>
        </div>
      )
    case "stats":
      return (
        <div className="grid grid-cols-2 gap-2 p-3">
          {[["Omzet", "71 jt"], ["Order", "1.284"]].map(([k, v]) => (
            <div key={k} className="flex flex-col gap-0.5 rounded-lg border bg-component p-2">
              <span className="text-[10px] text-muted-foreground">{k}</span>
              <span className="text-sm font-medium tabular">{v}</span>
            </div>
          ))}
        </div>
      )
    case "chart":
      return (
        <div className="p-3">
          <div className="flex h-16 items-end gap-1.5 rounded-lg border bg-component p-2">
            {[40, 65, 50, 80, 60, 95, 75].map((h, i) => (
              <span key={i} className="flex-1 rounded-sm bg-chart-1/70" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      )
    case "reviews":
      return (
        <div className="flex flex-col gap-2 p-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-1 rounded-lg border bg-component p-2">
              <span className="flex gap-0.5 text-[hsl(var(--warning))]">
                {Array.from({ length: 5 }).map((_, s) => <Star key={s} className="size-2.5 fill-current" />)}
              </span>
              <span className="h-1.5 w-full rounded bg-foreground/10" />
              <span className="h-1.5 w-2/3 rounded bg-foreground/10" />
            </div>
          ))}
        </div>
      )
  }
}

/* ─────────────────────────── shared ───────────────────────────────────── */
function StepBody({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-medium">{title}</h2>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      {children}
    </div>
  )
}
