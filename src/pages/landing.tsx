import * as React from "react"
import { Link } from "react-router-dom"
import {
  Store, Boxes, Wallet, BarChart3, Building2, Users, Sparkles, ArrowRight,
  Zap, ShieldCheck, Rocket,
} from "lucide-react"
import { GrainTile } from "@/components/landing/grain-tile"
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
      <Link to="/landing" className="inline-flex items-center rounded-xl border border-white/15 bg-white/10 px-4 py-2">
        <span className="text-xl font-medium tracking-[-0.5px] text-white">BuildERP</span>
      </Link>
      <nav className="hidden items-center gap-1 text-sm font-medium text-white/80 sm:flex">
        <a href="#fitur" className="rounded-lg px-3 py-2 hover:bg-white/10 hover:text-white transition-colors">Fitur</a>
        <a href="#kenapa" className="rounded-lg px-3 py-2 hover:bg-white/10 hover:text-white transition-colors">Kenapa kami</a>
        <a href="#harga" className="rounded-lg px-3 py-2 hover:bg-white/10 hover:text-white transition-colors">Harga</a>
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
    <section className="mx-auto max-w-4xl px-5 pb-16 pt-12 text-center sm:px-8 sm:pt-20">
      <span className="inline-flex items-center gap-1.5 rounded-xl border bg-component px-3 py-1 text-sm font-medium text-muted-foreground shadow-sm">
        Next-level mini ERP buat UMKM
      </span>

      <h1 className="mx-auto mt-6 max-w-3xl text-[2.5rem] font-semibold leading-[1.05] tracking-[-1.5px] text-white sm:text-[4rem]">
        Sistem komplit untuk UMKM.{" "}100% gratis.
      </h1>

      <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-xl">
        Kasir, stok, keuangan, sampai laporan — satu app yang enteng, rapi, dan
        enak dipakai tiap hari. Nggak ribet, nggak bikin pusing.
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link to="/">
          <GrainTile tone="orange" depth={5} className="rounded-2xl px-7 py-3.5">
            <span className="flex items-center gap-2 text-base font-medium">
              <Rocket className="size-5" /> Mulai gratis
            </span>
          </GrainTile>
        </Link>
        <a href="#fitur" className="inline-flex items-center gap-2 rounded-2xl border bg-component px-6 py-3.5 text-base font-medium shadow-sm hover:bg-accent transition-colors">
          Lihat fitur <ArrowRight className="size-4" />
        </a>
      </div>

      <p className="mt-4 text-sm text-white/80">Gratis 14 hari · Tanpa kartu kredit</p>
    </section>
  )
}

/* ────────────────────────────── Stats ────────────────────────────── */
const STATS = [
  { value: "2.400+", label: "UMKM aktif" },
  { value: "Rp 180M+", label: "Transaksi diproses" },
  { value: "99,9%", label: "Uptime" },
  { value: "4,9★", label: "Rating pengguna" },
]

function Stats() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-6 sm:px-8">
      <div className="grid grid-cols-2 divide-y divide-x rounded-2xl border bg-component sm:grid-cols-4 sm:divide-y-0">
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-1 px-4 py-5 text-center">
            <div className="text-2xl font-medium tabular leading-none">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ───────────────────────────── Features ──────────────────────────── */
const FEATURES: { icon: React.ReactNode; title: string; desc: string }[] = [
  { icon: <Store className="size-5" />, title: "Kasir / POS", desc: "Transaksi ngebut, struk rapi, jalan terus walau internet mati." },
  { icon: <Boxes className="size-5" />, title: "Stok & Gudang", desc: "Stok real-time, alarm barang menipis, dukung multi-gudang." },
  { icon: <Wallet className="size-5" />, title: "Pembukuan", desc: "Jurnal & laporan keuangan otomatis. Kamu tinggal terima beres." },
  { icon: <BarChart3 className="size-5" />, title: "Analitik", desc: "Grafik penjualan & produk terlaris yang update tiap hari." },
  { icon: <Building2 className="size-5" />, title: "Multi-cabang", desc: "Pantau semua toko dari satu dashboard, di mana pun kamu." },
  { icon: <Users className="size-5" />, title: "Pelanggan", desc: "Data pelanggan, poin loyalti, dan promo yang gampang diatur." },
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
          <GrainTile key={f.title} tone="dark" depth={6} className="flex flex-col gap-3 p-5">
            <span className="grid size-10 place-items-center rounded-xl bg-white/10">{f.icon}</span>
            <h3 className="text-xl font-medium tracking-[-0.3px]">{f.title}</h3>
            <p className="text-sm leading-relaxed text-white/70">{f.desc}</p>
          </GrainTile>
        ))}
      </div>
    </section>
  )
}

/* ──────────────────────────── Everything ─────────────────────────── */
const REASONS: React.ReactNode[] = [
  <Zap className="size-5" key="z" />,
  <ShieldCheck className="size-5" key="s" />,
  <Sparkles className="size-5" key="k" />,
]
const REASON_DATA = [
  { title: "Enteng & ngebut", desc: "Dibuat buat HP kentang sekalipun. Buka app, langsung jalan." },
  { title: "Data aman", desc: "Backup otomatis di cloud. Data bisnismu nggak akan hilang." },
  { title: "Enak dipakai", desc: "Desain rapi & minimalis. Karyawan baru langsung bisa." },
]

function Everything() {
  return (
    <section id="kenapa" className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
      <SectionHead
        eyebrow="Kenapa BuildERP"
        title="Bukan ERP korporat yang bikin pusing"
        subtitle="Kami rancang khusus buat warung, toko, dan bisnis kecil yang mau naik kelas."
      />
      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-center">
        {/* reasons — neutral cards */}
        <div className="flex flex-col gap-3">
          {REASON_DATA.map((r, i) => (
            <div key={r.title} className="flex items-start gap-4 rounded-2xl border bg-component p-4 shadow-sm">
              <GrainTile tone="dark" depth={3} className="grid size-10 shrink-0 place-items-center rounded-xl">
                {REASONS[i]}
              </GrainTile>
              <div className="flex flex-col gap-0.5">
                <h3 className="text-base font-medium">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* mock app preview inside a dark grain card */}
        <GrainTile tone="dark" depth={7} className="p-4 sm:p-5">
          <div className="rounded-2xl border border-white/10 bg-[#0d0e11] p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">Dashboard</span>
              <span className="flex gap-1">
                <span className="size-2 rounded-full bg-white/20" />
                <span className="size-2 rounded-full bg-white/20" />
                <span className="size-2 rounded-full bg-white/20" />
              </span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {[["Omzet", "71 jt"], ["Order", "1.284"], ["Produk", "342"], ["Cabang", "6"]].map(([k, v]) => (
                <div key={k} className="rounded-xl border border-white/10 bg-white/5 p-2.5">
                  <div className="text-[10px] text-white/50">{k}</div>
                  <div className="text-base font-medium tabular text-white">{v}</div>
                </div>
              ))}
            </div>
            <div className="mt-2 flex h-16 items-end gap-1.5 rounded-xl border border-white/10 p-2">
              {[40, 65, 50, 80, 60, 95, 75, 88].map((h, i) => (
                <span key={i} className={cn("flex-1 rounded-sm", i === 5 ? "bg-[#ff9436]" : "bg-white/25")} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </GrainTile>
      </div>
    </section>
  )
}

/* ───────────────────────────── Big CTA ───────────────────────────── */
function BigCta() {
  return (
    <section id="harga" className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
      <GrainTile tone="dark" depth={9} className="rounded-[2rem] px-6 py-14 text-center sm:px-10 sm:py-20">
        <div className="flex flex-col items-center text-white">
          <h2 className="max-w-2xl text-[2rem] font-semibold leading-tight tracking-[-1px] sm:text-[3rem]">
            Siap bikin bisnismu naik kelas?
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/70 sm:text-xl">
            Gabung 2.400+ UMKM yang udah ngerapihin bisnisnya pakai BuildERP.
          </p>
          <Link to="/" className="mt-8">
            <GrainTile tone="orange" depth={5} className="rounded-2xl px-8 py-4">
              <span className="flex items-center gap-2 text-base font-medium">
                <Rocket className="size-5" /> Mulai sekarang, gratis
              </span>
            </GrainTile>
          </Link>
          <p className="mt-4 text-sm text-white/60">Setup 5 menit · Bisa dibatalkan kapan aja</p>
        </div>
      </GrainTile>
    </section>
  )
}

/* ───────────────────────────── Footer ────────────────────────────── */
function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <div className="flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-8 sm:flex-row">
        <div className="inline-flex items-center rounded-xl border border-white/15 bg-white/10 px-3.5 py-1.5">
          <span className="font-medium tracking-[-0.5px] text-white">BuildERP</span>
        </div>
        <p className="text-sm text-white/80">© 2026 BuildERP · Dibuat buat UMKM Indonesia</p>
        <Link to="/" className="text-sm font-medium text-white hover:underline">Masuk App →</Link>
      </div>
    </footer>
  )
}

/* ───────────────────────────── shared ────────────────────────────── */
function SectionHead({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="inline-flex items-center gap-1.5 rounded-xl border bg-component px-3 py-1 text-sm font-medium text-muted-foreground shadow-sm">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-[1.75rem] font-medium leading-tight tracking-[-0.7px] text-white sm:text-[2.5rem]">{title}</h2>
      <p className="mt-3 text-base leading-relaxed text-white/80 sm:text-xl">{subtitle}</p>
    </div>
  )
}
