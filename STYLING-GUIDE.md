# BuildERP — Styling Guide

> Panduan styling **sama persis** kayak app ini. Setiap page / app baru wajib konsisten: **compact, minimalis, hue-220 netral, grain, Duolingo 3D**. Semua angka di-extract langsung dari source (`tailwind.config.ts`, `src/globals.css`, `src/components/ui/grain.tsx`, `src/components/landing/grain-tile.tsx`, dst). Jangan ngarang, ikutin ini.

---

## 0. Prinsip

1. **Minimalis & compact.** Warna netral abu kebiruan (`hue 220`). Font kecil, padding secukupnya, border tipis, shadow halus. Ruang kosong itu fitur.
2. **No ALL-CAPS, no extra-bold.** Nggak ada `uppercase`. Heading = `font-medium`, display gede maksimal `font-semibold`. **Jangan `font-bold`.**
3. **Warna = aksen, bukan dekorasi.** Default = netral / **dark card** kita. Warna dipakai **hemat**:
   - **Orange = highlight & aksen utama** (CTA utama, kata highlight di hero, ikon aksen).
   - **Blue = aksen sekunder** (chart, ikon tertentu).
   - **Mayoritas = dark / neutral grain card.**
   - **🚫 NGGAK ADA GREEN.** Kita nggak pakai hijau buat dekorasi/highlight.
4. **Grain itu identitas.** "Hero moment" pakai **hard grain** + **Duolingo 3D shadow**. Tapi jangan norak — grain di card besar / aksen, bukan tiap elemen.
5. **Ada suaranya.** Interaksi penting (klik nav, toggle theme/audio) ada sound halus.

---

## 1. Stack

| Hal | Pakai |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS + CSS variables (HSL) |
| Class merge | `clsx` + `tailwind-merge` → `cn()` |
| Variants | `class-variance-authority` (cva) |
| Animasi | `framer-motion` (spring) |
| Sound | `use-sound` (via `SoundProvider`) |
| Theme | `next-themes` (`attribute="class"`, `defaultTheme="system"`) |
| Ikon | `lucide-react` + custom dual (outlined/filled) |
| Chart | `recharts` |

```ts
// src/lib/utils.ts
export function cn(...i: ClassValue[]) { return twMerge(clsx(i)) }
export function formatIDR(v: number)     // Intl id-ID currency IDR, 0 desimal
export function formatCompact(v: number) // Intl notation:"compact"
```

---

## 2. Design tokens (CSS variables) — copy 1:1

Base **hue 220**. Warna disimpan sebagai channel HSL, dibungkus `hsl(var(--x))`.

```css
/* src/globals.css */
@layer base {
  :root {
    --background: 0 0% 98%;          /* hampir putih, BUKAN #fff */
    --foreground: 220 5% 13%;
    --component: 220 7% 100%;        /* permukaan card/dock */
    --component-active: 220 7% 92%;
    --popover: 0 0% 100%;
    --primary: 220 7% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 220 4.8% 95.9%;
    --muted: 220 4.8% 95.9%;
    --muted-foreground: 220 3% 40%;
    --accent: 220 7% 93%;            /* hover */
    --destructive: 0 84.2% 60.2%;
    --warning: 38 92% 50%;
    --border: 220 7% 90%;
    --input: 220 7% 85%;
    --ring: 220 7% 10%;
    --sidebar: 220 7% 95%;
    --radius: 0.5rem;                /* 8px */
    --chart-1: 220 70% 50%; --chart-2: 160 60% 45%; --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%; --chart-5: 340 75% 55%;
  }
  .dark {
    --background: 0 0% 4%;           /* near-black, BUKAN #000 */
    --foreground: 0 0% 98%;
    --component: 220 13% 8%;         /* dark card kita */
    --component-active: 220 13% 14%;
    --primary: 0 0% 98%;
    --primary-foreground: 220 5.9% 10%;
    --secondary: 220 3.7% 15.9%;
    --muted: 220 3.7% 15.9%;
    --muted-foreground: 0 0% 71%;
    --accent: 220 13% 11%;
    --warning: 38 92% 55%;
    --border: 220 3.7% 15.9%;
    --ring: 220 4.9% 83.9%;
    --sidebar: 220 13% 8%;
    /* chart-* versi dark lebih terang */
  }
}
```

> Catatan: token `--success` (hijau) dipakai cuma buat **status fungsional** (mis. badge "Lunas", indikator sukses) — **bukan** buat dekorasi/highlight. Highlight visual = **orange**.

**Aturan wajib:**
- Background **jangan** pure `#fff` / `#000`.
- Permukaan (card/dock/tooltip) pakai `bg-component`, **bukan** `bg-background`.
- Hover selalu `bg-accent`. Aktif `bg-component-active`. Teks sekunder `text-muted-foreground`.

---

## 3. Typography

```css
@font-face { font-family:'Sohne'; src:url('/fonts/soehne-buch.woff2') format('woff2'); font-weight:400; }
@font-face { font-family:'Sohne'; src:url('/fonts/soehne-kraftig.woff2') format('woff2'); font-weight:500; }
@font-face { font-family:'Plantijn'; src:url('/fonts/martina-plantijn-italic.woff2') format('woff2'); font-weight:400; font-style:italic; }
:root { --font-sohne:'Sohne',sans-serif; --font-plantijn:'Plantijn',serif; --font-handwritten:'Kalam',cursive; }
```

- **Sohne** cuma **400 & 500**. Nggak ada bold 700. (Substitusi: **Inter** / **Geist**.)
- Font di-serve dari `/public/fonts/`.

### Skala font (Tailwind `fontSize` di-override total)

```ts
fontSize: { xs:"0.8rem", sm:"0.875rem", base:"1rem", baseSerif:"1.063rem", xl:"1.25rem", "2xl":"1.5rem", "6xl":"4rem" }
```

> ⚠️ **PENTING:** cuma `text-xs/sm/base/baseSerif/xl/2xl/6xl` yang ada. `text-lg`, `text-3xl`, `text-4xl`, `text-5xl` **NGGAK ADA** → class-nya ilang diam-diam. Ukuran lain pakai **arbitrary**: `text-[2rem]`, `text-[3.25rem]`.

### Base rules

```css
body { @apply bg-background font-sans text-foreground selection:bg-[#95a5ac40]; }
h1,h2,h3 { @apply font-medium; }             /* medium, BUKAN bold */
h1 { @apply text-xl; }  h2 { @apply text-xl; }
h3 { @apply text-base tracking-[-0.21px]; }
p  { @apply text-base tracking-[-0.21px]; }
em { @apply font-serif font-medium; }
```

- Signature: negative tracking tipis `tracking-[-0.21px]` di `p` & `h3`. Display gede `tracking-[-0.5px]` s/d `-1.5px`.
- **Nggak ada `uppercase` / `tracking-wide`. Nggak ada `font-bold`.**
- Angka: `.tabular { font-feature-settings:"tnum","zero"; }` — wajib di metric/tabel/harga.

---

## 4. Radius, shadow, spacing

**Radius** (`--radius:0.5rem`): `lg`=8px, `md`=6px, `sm`=4px. Praktik:
- Card `rounded-2xl` (16px), hero `rounded-3xl` (24px), item/chip `rounded-xl` (12px), tombol `rounded-md` (6px), badge `rounded-lg`.
- Pola: **container makin gede makin bulat, isinya lebih kecil.**

**Shadow halus signature** (card floating, dock):
```
shadow-[_0_1px_1px_-0.5px_rgba(0,0,0,0.04),_0_3px_3px_-1.5px_rgba(0,0,0,0.04),_0_12px_12px_-6px_rgba(0,0,0,0.04)]
```
Card biasa cukup `shadow-sm`. **Jangan** shadow tebal/gelap.

**Spacing compact (global):**
- Card padding = **`p-4`**. Header & content `p-4`.
- `PageShell`: `gap-5 sm:gap-6`, `p-5 sm:p-6 sm:pt-12`, bottom **`pb-40 sm:pb-44`** (biar nggak ketutup dock).
- Section gap `gap-4`, grid `gap-3 sm:gap-4`. Rapet tapi lega.

---

## 5. ⭐ GRAIN — sistem tekstur (identitas utama)

**Hard grain**, bukan halus.

### `Grain` (`src/components/ui/grain.tsx`)
```
<svg width='120' height='120'>
  <filter id='g'>
    <feTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/>
    <feColorMatrix type='saturate' values='0'/>          <!-- grayscale -->
    <feComponentTransfer>                                 <!-- kontras tinggi = HARD -->
      <feFuncR type='linear' slope='2.2' intercept='-0.6'/>
      <feFuncG type='linear' slope='2.2' intercept='-0.6'/>
      <feFuncB type='linear' slope='2.2' intercept='-0.6'/>
    </feComponentTransfer>
  </filter>
  <rect width='100%' height='100%' filter='url(#g)'/>
</svg>
```
Di-encode `encodeURIComponent` → `HARD_GRAIN_URL`.

```tsx
<Grain opacity={0.9} blend="overlay" size={100} />   // absolute inset-0, pointer-events-none
```

**Kunci "hard": `slope 2.2 / intercept -0.6` + `mix-blend-overlay` + opacity ~0.85–0.95.** Jangan `soft-light` (halus).

| Tempat | opacity | size |
|---|---|---|
| Hero card orange | 0.95 | 110 |
| Tombol 3D dalam hero | 0.90 | 90 |
| Card orange (App Builder Design) | 0.95 | 100 |
| GrainTile (landing) | 0.85 | 90 |

Cara pasang:
```tsx
<div className="relative overflow-hidden rounded-3xl ...">
  <Grain opacity={0.95} blend="overlay" size={110} />
  <div className="relative z-10">{konten}</div>   {/* konten WAJIB z-10 di atas grain */}
</div>
```

---

## 6. ⭐ DUOLINGO 3D + Grain Tiles

Card/tombol dengan "bibir" bawah solid → kelihatan bisa dipencet.

### Resep
```
shadow-[0_8px_0_0_<warna-gelap>, 0_18px_30px_-8px_rgba(...)]   // layer 1 = bibir 3D flat
```

### `GrainTile` (`src/components/landing/grain-tile.tsx`)
**Default `dark`** (dark card kita). **Tanpa green.**

```tsx
export type Tone = "dark" | "orange" | "blue" | "cream"

const TONES = {
  dark:   { from:"#262930", to:"#141619", shadow:"#090a0c", text:"#fff"    }, // DEFAULT — mayoritas
  orange: { from:"#ff9d3c", to:"#ef5c0c", shadow:"#b83c00", text:"#fff"    }, // HIGHLIGHT + aksen utama
  blue:   { from:"#4aa8ff", to:"#1f6fe0", shadow:"#124a9c", text:"#fff"    }, // aksen sekunder
  cream:  { from:"#fff6ec", to:"#ffe9d3", shadow:"#eab892", text:"#7c2d12" },
}
// boxShadow = `0 {depth}px 0 0 {shadow}, 0 {depth*2+4}px {depth*3}px -{depth}px rgba(10,15,25,0.4)`
// default: tone="dark", depth=8, grain=0.85
```

```tsx
<GrainTile tone="dark" depth={6} className="flex flex-col gap-3 p-5">…</GrainTile>
<GrainTile tone="orange" depth={5} className="rounded-2xl px-7 py-3.5">CTA highlight</GrainTile>
```

### Aturan warna (JANGAN norak)
- **Mayoritas block = `dark`** (grain dark grey, konsisten).
- **`orange` = highlight** — CTA utama, kata highlight. Grain-nya orange.
- **`blue` = aksen sekunder** — hemat.
- **🚫 Nggak pakai green.** 🚫 Nggak ada pill floating berhamburan.

### Hero card (Overview) — contoh
```tsx
<div className="relative overflow-hidden rounded-3xl px-6 py-12 sm:px-10 sm:py-16
     shadow-[0_10px_0_0_#c14a08,0_26px_40px_-12px_rgba(150,50,0,0.5)]"   // Duolingo shadow di CARD
     style={{ background:"radial-gradient(120% 140% at 50% 0%, #ffd9a8 0%, #ff9d3c 34%, #ff7a1a 62%, #f0590d 100%)" }}>
  <Grain opacity={0.95} blend="overlay" size={110} />
  {/* label kecil ala Duolingo (bukan glass): bg cream + shadow-[0_4px_0_0_#eab892], rounded-xl, no icon */}
  <div className="rotate-[-3deg]">                                        {/* tombol miring */}
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#ff9231] to-[#ef5c0c]
         px-9 py-5 shadow-[0_8px_0_0_#b83c00,0_18px_30px_-8px_rgba(150,50,0,0.6)]">
      <Grain opacity={0.9} blend="overlay" size={90} />
      <span className="relative z-10 text-[3.25rem] font-bold ...">App Builder</span>
    </div>
  </div>
</div>
```
> Hero centerpiece boleh `font-bold` (display khusus). Di tempat lain **hindari** bold.

---

## 7. Core components (cva)

- **Button** (`ui/button.tsx`): base `rounded-md text-base font-medium ... transition-colors`; variants default(bg-primary)/destructive/outline/secondary/ghost/link; sizes default `h-10 px-4 py-2`, sm `h-9 px-3 text-sm`, lg `h-11 px-8`, icon `h-10 w-10`. Link naik `-translate-y-0.5` pas hover.
- **Badge** (`ui/badge.tsx`): `rounded-lg border px-2.5 py-0.5 text-xs`; variants default/secondary/**success**/**warning**/destructive/outline.
- **Card** (`ui/card.tsx`): `rounded-2xl border border-border bg-component shadow-sm`; Header/Content `p-4`; Title `text-base font-medium tracking-[-0.21px]`.
- **Tooltip**: `bg-component border rounded-md px-3 py-1.5 text-sm shadow-md` + `animate-in fade-in-0 zoom-in-95`.
- **Stat/KPI tile:** `Card p-4`, angka `text-2xl font-medium tabular`, delta `text-[hsl(var(--success))]` / `text-destructive`.
- **Filter pill aktif:** invert → `bg-foreground text-background`.
- **Toggle switch:** `h-5 w-9 rounded-full p-0.5` + knob `size-4 rounded-full bg-white` (`translate-x-4` pas on).

---

## 8. ⭐ DOCK (nav signature)

Floating dock bawah-tengah, mounted global di luar `<Routes>`.
```
"px-2 py-2 bg-component border rounded-2xl w-fit flex h-[3.5rem] items-center gap-2 shadow-[...0.04...]"
fixed bottom-4 left-1/2 -translate-x-1/2
```
- Tiap tujuan punya **pasangan ikon Outlined + Filled**. Aktif = **filled + `bg-component-active` + label expand** (animasi `width:0→auto`).
- Ikon `h-5 w-5`, item `h-10 rounded-xl px-[10px]`. Separator + toggle theme (Sun/Moon) & audio (Volume2/VolumeX). Tooltip Radix. Hint via `localStorage["dock-hint-dismissed"]`.
- **Disembunyiin per-route:** `const hideDock = pathname.startsWith("/landing"); {!hideDock && <Dock/>}`.
- Motion: `{ type:"spring", duration:0.6, bounce:0 }`. Reveal pakai **width** (bukan scale).

---

## 9. 🔊 SOUND SYSTEM

`SoundProvider` (`src/components/sound/sound-provider.tsx`), expose `useUiSound()`.

| File (`/public/sounds/`) | Buat |
|---|---|
| `click.wav` | klik nav / aksi utama |
| `darkmode.wav` / `lightmode.wav` | toggle theme |
| `turn-on.wav` / `turn-off.wav` | toggle audio |
| `error.wav` | validasi gagal |

```tsx
const soundOpts = (enabled) => ({ soundEnabled: enabled, volume: 0.5 })
useSound("/sounds/click.wav", soundOpts(enabled))
useSound("/sounds/turn-on.wav", { forceSoundEnabled: true, volume: 0.5 })  // selalu bunyi pas nyalain
const { playClick, toggleEnabled, enabled } = useUiSound()
```
**Aturan:** default **mute di mobile** (`innerWidth<=768`); state `enabled` → `soundEnabled` semua sound; tombol audio disembunyiin di touch (`@media (hover:none){ .audio-toggle-button{display:none} }`); sound pendek & subtle, cuma di aksi penting.

---

## 10. Layout & background

**Wallpaper (semua page, termasuk landing — bukan dark paksa):**
```tsx
<div className="fixed inset-0 -z-10 bg-cover bg-center block sm:hidden"
     style={{ backgroundImage:"url(/wallpaper/background-mobile-hd-grain.webp)" }} />
<div className="fixed inset-0 -z-10 bg-cover bg-center hidden sm:block"
     style={{ backgroundImage:"url(/wallpaper/background-desktop-hd-grain.webp)" }} />
```

**Page shell:**
```tsx
<main className="flex flex-col max-w-5xl mx-auto gap-5 sm:gap-6 p-5 sm:p-6 sm:pt-12 pb-40 sm:pb-44 orchestration">
```
`max-w-5xl`, `mx-auto`, **`pb-40 sm:pb-44` wajib**.

**Entrance stagger:**
```css
.orchestration > * { animation: enter 0.6s ease both; animation-delay: calc(120ms * var(--stagger)); }
@keyframes enter { from{opacity:0; transform:translateY(4px)} to{opacity:1; transform:none} }
```
Kasih tiap anak `style={{ "--stagger": n }}`.

---

## 11. Pola halaman khusus

### App Builder (`/builder`)
- **2 tab di atas** (`bg-component border p-1 rounded-xl`): **Configure** | **Design**.
- **Configure**: name bar (section paling atas) + steps rail kiri + konten step (Product/Feature Handling, Automations, Deploy).
- **Design**: drag-and-drop. Kiri palette (muncul sesuai fitur di Configure). Tengah **card orange hard-grain compact** nge-hug **screen mockup** (`w-[270px] sm:w-[300px]`, aspect `9/18`, no phone chrome). Kanan **editor panel** yang keluar pas section di-klik.
- Native DnD: `draggable` + `dataTransfer.setData("text/plain", id)` → dropzone `onDrop`.

### Landing (`/landing`)
- **Rute sendiri, dock disembunyiin**, pakai wallpaper.
- **Mayoritas block = `GrainTile tone="dark"`** (dark grey grain).
- **Orange = highlight** (hero CTA, underline hero, eyebrow). **Blue = aksen kecil.** **🚫 Nggak ada green. 🚫 Nggak ada pills. 🚫 Nggak ada font-bold** (heading `font-medium`, display `font-semibold`).
- Section: Nav → Hero → Stats (card netral) → Features (6 dark tile) → Kenapa (card netral + mock dashboard di dark tile) → Big CTA (dark tile + orange button) → Footer.

---

## 12. Detail kecil

```css
::-webkit-scrollbar { width:4px; height:6px; }
::-webkit-scrollbar-thumb { background:#888; border-radius:5px; }
.scrollbar-none { scrollbar-width:none; } .scrollbar-none::-webkit-scrollbar{ display:none }
body.no-scroll { overflow:hidden; }
selection: bg-[#95a5ac40]
```

---

## 13. ✅ Checklist app baru sama persis

1. [ ] Copy `tailwind.config.ts`, CSS variables (§2), `@font-face` + base rules (§3).
2. [ ] Copy `lib/utils.ts`. Install `clsx tailwind-merge class-variance-authority`.
3. [ ] Install `framer-motion use-sound next-themes lucide-react recharts` + Radix seperlunya.
4. [ ] Copy `public/fonts/`, `public/sounds/`, `public/wallpaper/`.
5. [ ] Copy `ui/grain.tsx` + `landing/grain-tile.tsx`.
6. [ ] Copy `button`, `badge`, `card`, `tooltip`, `separator`.
7. [ ] Shell: `ThemeProvider` → `SoundProvider` → `<App/>`; dock global di luar routes.
8. [ ] Page lewat `PageShell` (pb-40, orchestration). Angka pakai `.tabular`.

## 14. Aturan "JANGAN"
- ❌ `uppercase` / `tracking-wide`.
- ❌ `font-bold` (kecuali 1 display hero khusus). Heading = `font-medium`.
- ❌ Pure `#fff` / `#000` background.
- ❌ Shadow tebal/gelap (pakai halus `0.04` / `shadow-sm`; 3D pakai Duolingo `0_Ypx_0_0`).
- ❌ **GREEN buat highlight/dekorasi.** Highlight = **orange**. Green cuma status fungsional yang subtle.
- ❌ Warna norak / berhamburan. Mayoritas dark/netral, orange highlight, blue aksen.
- ❌ Grain `soft-light` (harus `overlay` + kontras tinggi = **hard grain**).
- ❌ Pills floating sana-sini. Layout rapi & minimalis.
- ❌ Font gede sembarang (`text-lg`/`3xl`/`4xl`/`5xl` NGGAK ADA → pakai `text-[…]`).
- ❌ Lupa `pb-40` & `.tabular`.
