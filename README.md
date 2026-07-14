# BuildApp v0 — Dashboard Base

Base dashboard untuk apps builder (accounting, mini ERP, dst). Styling **100% mengikuti** `portofolio-nabil` — lihat `STYLING-GUIDE.md` di repo portfolio. Dibangun dengan React + Vite + Tailwind, siap disambung ke Cloudflare Workers + Supabase nanti.

## Jalanin

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

## Yang udah ada

- **Dock signature** floating di bawah tengah — ikon outlined→filled, label expand pas aktif, tooltip, hint pertama kali.
- **Sound system** (`use-sound`) — klik dock, toggle theme, toggle audio. Default mute di mobile; tombol audio disembunyiin di device touch.
- **Wallpaper grain** di semua halaman (`AppBackground`) + scrim biar konten kebaca di light/dark.
- **Design tokens** identik (hue 220, Sohne font, no all-caps, compact) — di `src/globals.css` + `tailwind.config.ts`.
- **Pages**: Overview (KPI, chart arus kas, tabel transaksi) + placeholder Analytics / Accounting / Inventory / Settings.

## Struktur

```
src/
  components/
    dock/            # dock signature + MotionLink
    sound/           # SoundProvider (use-sound)
    layout/          # AppBackground, PageShell
    dashboard/       # StatCard, RevenueChart
    ui/              # button, badge, tooltip, separator, card
    icons/           # dual-state nav icons (outlined/filled)
  pages/             # overview + placeholder pages
  lib/utils.ts       # cn(), formatIDR(), formatCompact()
public/
  fonts/  sounds/  wallpaper/
```

## Langkah berikutnya

- Sambungkan Supabase (isi `.env` dari `.env.example`).
- Isi modul Accounting / Inventory pakai komponen `Card` + `PageShell` yang sama.
- Deploy ke Cloudflare (Workers/Pages).
