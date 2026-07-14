import * as React from "react"
import { Link } from "react-router-dom"
import {
  Store, Boxes, Wallet, BarChart3, Building2, Users, Sparkles, ArrowRight,
  Check, Star, Zap, ShieldCheck, Rocket,
} from "lucide-react"
import { GrainTile, GrainPill, type Tone } from "@/components/landing/grain-tile"
import { Grain } from "@/components/ui/grain"
import { cn } from "@/lib/utils"

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Nav />
      <Hero />
      <Stats />
      <Features />
      <Everything />
      <BigCta />
      <Footer />
    </div>
  )
}

/* ─────────────────────────────── Nav ─────────────────────────────── */
function Nav() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
      <Link to="/landing" className="flex items-center gap-2">
        <GrainTile tone="orange" depth={4} className="grid size-9 place-items-center rounded-xl">
          <Sparkles className="size-5" />
        </GrainTile>
        <span className="text-xl font-bold tracking-[-0.5px]">BuildERP</span>
      </Link>
      <nav className="hidden items-center gap-1 text-sm font-medium text-muted-foreground sm:flex">
        <a href="#fitur" className="rounded-lg px-3 py-2 hover:bg-accent hover:text-foreground transition-colors">Fitur</a>
        <a href="#kenapa" className="rounded-lg px-3 py-2 hover:bg-accent hover:text-foreground transition-colors">Kenapa kami</a>
        <a href="#harga" className="rounded-lg px-3 py-2 hover:bg-accent hover:text-foreground transition-colors">Harga</a>
      </nav>
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Masuk App <ArrowRight className="size-4" />
      </Link>
    </header>
  )
}

/* ─────────────────────────────── Hero ────────────────────────────── */
function Hero() {
  return (
    <section className="relative mx-auto max-w-5xl px-5 pb-16 pt-10 text-center sm:px-8 sm:pt-20">
      {/* floating grain pills */}
      <GrainPill tone="blue" icon={<Boxes className="size-4" />} label="Stok real-time" className="left-2 top-6 -rotate-6 sm:left-6 lg:left-0" />
      <GrainPill tone="green" icon={<Wallet className="size-4" />} label="Pembukuan otomatis" className="right-2 top-10 rotate-3 sm:right-6 lg:right-0" />
      <GrainPill tone="orange" icon={<Store className="size-4" />} label="Kasir ngebut" className="bottom-8 left-4 rotate-6 sm:left-10 lg:left-4" />
      <GrainPill tone="blue" icon={<BarChart3 className="size-4" />} label="Analitik harian" className="bottom-6 right-4 -rotate-3 sm:right-12 lg:right-6" />

      <span className="inline-flex items-center gap-1.5 rounded-full border bg-component px-3 py-1 text-sm font-medium text-muted-foreground shadow-sm">
        <Sparkles className="size-3.5 text-[#ef5c0c]" /> Next-level mini ERP buat UMKM
      </span>

      <h1 className="mx-auto mt-6 max-w-3xl text-[2.5rem] font-bold leading-[1.05] tracking-[-1.5px] sm:text-[4.25rem]">
        ERP mini buat UMKM.{" "}
        <span className="relative inline-block">
          <span className="relative z-10">Tapi bikin nagih.</span>
          <span className="absolute inset-x-0 bottom-1.5 -z-0 h-4 rounded bg-[#ff9d3c]/40 sm:bottom-2 sm:h-6" />
        </span>
      </h1>

      <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-xl">
        Kasir, stok, keuangan, sampai laporan — satu app yang enteng, rapi, dan
        enak dipakai tiap hari. Nggak ribet, nggak bikin pusing.
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link to="/">
          <GrainTile tone="orange" depth={6} className="rounded-2xl px-7 py-3.5">
            <span className="flex items-center gap-2 text-base font-semibold">
              <Rocket className="size-5" /> Mulai gratis
            </span>
          </GrainTile>
        </Link>
        <a href="#fitur" className="inline-flex items-center gap-2 rounded-2xl border bg-component px-6 py-3.5 text-base font-medium shadow-sm hover:bg-accent transition-colors">
          Lihat fitur <ArrowRight className="size-4" />
        </a>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">Gratis 14 hari · Tanpa kartu kredit</p>
    </section>
  )
}

/* ────────────────────────────── Stats ────────────────────────────── */
const STATS: { value: string; label: string; tone: Tone }[] = [
  { value: "2.400+", label: "UMKM aktif", tone: "orange" },
  { value: "Rp 180M+", label: "Transaksi diproses", tone: "blue" },
  { value: "99,9%", label: "Uptime", tone: "green" },
  { value: "4,9★", label: "Rating pengguna", tone: "orange" },
]

function Stats() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {STATS.map((s) => (
          <GrainTile key={s.label} tone={s.tone} depth={5} className="px-4 py-5 text-center">
            <div className="text-[1.75rem] font-bold tabular leading-none">{s.value}</div>
            <div className="mt-1.5 text-sm font-medium opacity-90">{s.label}</div>
          </GrainTile>
        ))}
      </div>
    </section>
  )
}

/* ───────────────────────────── Features ──────────────────────────── */
const FEATURES: { icon: React.ReactNode; title: string; desc: string; tone: Tone }[] = [
  { icon: <Store className="size-6" />, title: "Kasir / POS", desc: "Transaksi ngebut, struk rapi, jalan terus walau internet mati.", tone: "orange" },
  { icon: <Boxes className="size-6" />, title: "Stok & Gudang", desc: "Stok real-time, alarm barang menipis, dukung multi-gudang.", tone: "blue" },
  { icon: <Wallet className="size-6" />, title: "Pembukuan", desc: "Jurnal & laporan keuangan otomatis. Kamu tinggal terima beres.", tone: "green" },
  { icon: <BarChart3 className="size-6" />, title: "Analitik", desc: "Grafik penjualan & produk terlaris yang update tiap hari.", tone: "blue" },
  { icon: <Building2 className="size-6" />, title: "Multi-cabang", desc: "Pantau semua toko dari satu dashboard, di mana pun kamu.", tone: "orange" },
  { icon: <Users className="size-6" />, title: "Pelanggan", desc: "Data pelanggan, poin loyalti, dan promo yang gampang diatur.", tone: "green" },
]

function Features() {
  return (
    <section id="fitur" className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
      <SectionHead
        eyebrow="Semua yang kamu butuh"
        title="Satu app, semua urusan bisnis"
        subtitle="Nggak perlu 5 aplikasi beda. Semua kebutuhan operasional UMKM ada di sini."
      />
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <GrainTile key={f.title} tone={f.tone} depth={7} className="flex flex-col gap-3 p-5">
            <span className="grid size-11 place-items-center rounded-xl bg-white/20">{f.icon}</span>
            <h3 className="text-xl font-bold tracking-[-0.3px]">{f.title}</h3>
            <p className="text-sm leading-relaxed opacity-90">{f.desc}</p>
          </GrainTile>
        ))}
      </div>
    </section>
  )
}

/* ──────────────────────────── Everything ─────────────────────────── */
const REASONS: { icon: React.ReactNode; title: string; desc: string; tone: Tone }[] = [
  { icon: <Zap className="size-5" />, title: "Enteng & ngebut", desc: "Dibuat buat HP kentang sekalipun. Buka app, langsung jalan.", tone: "orange" },
  { icon: <ShieldCheck className="size-5" />, title: "Data aman", desc: "Backup otomatis di cloud. Data bisnismu nggak akan hilang.", tone: "blue" },
  { icon: <Sparkles className="size-5" />, title: "Enak dipakai", desc: "Desain rapi & minimalis. Karyawan baru langsung bisa.", tone: "green" },
]

function Everything() {
  return (
    <section id="kenapa" className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
      <SectionHead
        eyebrow="Kenapa BuildERP"
        title="Bukan ERP korporat yang bikin pusing"
        subtitle="Kami rancang khusus buat warung, toko, dan bisnis kecil yang mau naik kelas."
      />
      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
        {/* reasons list */}
        <div className="flex flex-col gap-3">
          {REASONS.map((r) => (
            <div key={r.title} className="flex items-start gap-4 rounded-2xl border bg-component p-4 shadow-sm">
              <GrainTile tone={r.tone} depth={4} className="grid size-11 shrink-0 place-items-center rounded-xl">
                {r.icon}
              </GrainTile>
              <div className="flex flex-col gap-0.5">
                <h3 className="text-base font-semibold">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* mock app preview inside an orange grain card */}
        <div className="relative overflow-hidden rounded-3xl p-4 sm:p-6"
          style={{ background: "radial-gradient(120% 130% at 50% 0%, #ffcf9c 0%, #ff9436 40%, #f5620f 100%)" }}>
          <Grain opacity={0.95} blend="overlay" size={110} />
          <div className="relative z-10 rounded-2xl border bg-background p-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Dashboard</span>
              <span className="flex gap-1">
                <span className="size-2 rounded-full bg-[#ff5f57]" />
                <span className="size-2 rounded-full bg-[#febc2e]" />
                <span className="size-2 rounded-full bg-[#28c840]" />
              </span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {[["Omzet", "71 jt", "green"], ["Order", "1.284", "blue"], ["Produk", "342", "orange"], ["Cabang", "6", "blue"]].map(([k, v, tone]) => (
                <GrainTile key={k} tone={tone as Tone} depth={3} className="p-2.5">
                  <div className="text-[10px] font-medium opacity-90">{k}</div>
                  <div className="text-base font-bold tabular">{v}</div>
                </GrainTile>
              ))}
            </div>
            <div className="mt-2 flex h-16 items-end gap-1.5 rounded-xl border p-2">
              {[40, 65, 50, 80, 60, 95, 75, 88].map((h, i) => (
                <span key={i} className="flex-1 rounded-sm bg-[#ff9436]" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────────── Big CTA ───────────────────────────── */
function BigCta() {
  return (
    <section id="harga" className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
      <div className="relative overflow-hidden rounded-[2rem] px-6 py-14 text-center shadow-[0_12px_0_0_#124a9c,0_28px_44px_-14px_rgba(20,60,120,0.55)] sm:px-10 sm:py-20"
        style={{ background: "radial-gradient(120% 140% at 50% 0%, #7cc0ff 0%, #3d8bf0 42%, #1f6fe0 100%)" }}>
        <Grain opacity={0.95} blend="overlay" size={110} />
        <GrainPill tone="orange" icon={<Star className="size-4" />} label="Mythos class" className="left-6 top-8 -rotate-6 sm:left-16" />
        <GrainPill tone="green" icon={<Check className="size-4" />} label="Stabil" className="right-6 top-9 rotate-3 sm:right-16" />
        <div className="relative z-10 flex flex-col items-center text-white">
          <h2 className="max-w-2xl text-[2rem] font-bold leading-tight tracking-[-1px] sm:text-[3.25rem]">
            Siap bikin bisnismu naik kelas?
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/90 sm:text-xl">
            Gabung 2.400+ UMKM yang udah ngerapihin bisnisnya pakai BuildERP.
          </p>
          <Link to="/" className="mt-8">
            <GrainTile tone="cream" depth={6} className="rounded-2xl px-8 py-4">
              <span className="flex items-center gap-2 text-base font-bold">
                <Rocket className="size-5" /> Mulai sekarang, gratis
              </span>
            </GrainTile>
          </Link>
          <p className="mt-4 text-sm text-white/80">Setup 5 menit · Bisa dibatalkan kapan aja</p>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────────── Footer ────────────────────────────── */
function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <div className="flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
        <div className="flex items-center gap-2">
          <GrainTile tone="orange" depth={3} className="grid size-7 place-items-center rounded-lg">
            <Sparkles className="size-4" />
          </GrainTile>
          <span className="font-bold tracking-[-0.5px]">BuildERP</span>
        </div>
        <p className="text-sm text-muted-foreground">© 2026 BuildERP · Dibuat buat UMKM Indonesia</p>
        <Link to="/" className="text-sm font-medium hover:underline">Masuk App →</Link>
      </div>
    </footer>
  )
}

/* ───────────────────────────── shared ────────────────────────────── */
function SectionHead({ eyebrow, title, subtitle, className }: { eyebrow: string; title: string; subtitle: string; className?: string }) {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      <span className="inline-flex items-center gap-1.5 rounded-full border bg-component px-3 py-1 text-sm font-medium text-muted-foreground shadow-sm">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-[1.75rem] font-bold leading-tight tracking-[-0.7px] sm:text-[2.5rem]">{title}</h2>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-xl">{subtitle}</p>
    </div>
  )
}
