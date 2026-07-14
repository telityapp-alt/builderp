import { PageShell, Section } from "@/components/layout/page-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PlaceholderPageProps {
  title: string
  description: string
  modules: { name: string; note: string }[]
}

/**
 * Shared "coming soon" page for nav destinations not built yet
 * (Analytics, Accounting, Inventory, Settings). Keeps the exact shell + styling.
 */
export function PlaceholderPage({ title, description, modules }: PlaceholderPageProps) {
  return (
    <PageShell title={title} description={description} actions={<Badge variant="secondary">Segera hadir</Badge>}>
      <Section stagger={2}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {modules.map((m) => (
            <Card key={m.name} className="p-5 flex flex-col gap-2">
              <h3 className="text-base font-medium">{m.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{m.note}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section stagger={3}>
        <Card>
          <CardContent className="p-8 flex flex-col items-center text-center gap-2">
            <p className="text-base font-medium">Modul ini lagi dibangun</p>
            <p className="text-sm text-muted-foreground max-w-sm">
              Base dashboard-nya udah siap. Halaman {title.toLowerCase()} akan diisi pakai styling &amp; komponen yang sama persis.
            </p>
          </CardContent>
        </Card>
      </Section>
    </PageShell>
  )
}

export function AccountingPage() {
  return (
    <PlaceholderPage
      title="Accounting"
      description="Pembukuan, jurnal, dan laporan keuangan otomatis."
      modules={[
        { name: "Jurnal Umum", note: "Pencatatan transaksi double-entry yang rapi dan bisa ditelusuri." },
        { name: "Buku Besar", note: "Saldo tiap akun ter-update otomatis dari setiap transaksi." },
        { name: "Laba Rugi", note: "Laporan P&L per periode dengan breakdown biaya." },
        { name: "Neraca", note: "Posisi aset, kewajiban, dan ekuitas secara real-time." },
      ]}
    />
  )
}

export function InventoryPage() {
  return (
    <PlaceholderPage
      title="Inventory"
      description="Kelola stok, gudang, dan perpindahan barang."
      modules={[
        { name: "Stok Produk", note: "Level stok per item, per gudang, dengan notifikasi menipis." },
        { name: "Purchase Order", note: "Buat dan lacak pesanan ke supplier sampai barang diterima." },
        { name: "Stock Transfer", note: "Perpindahan barang antar gudang dengan histori lengkap." },
        { name: "Stock Opname", note: "Penyesuaian stok fisik vs sistem secara berkala." },
      ]}
    />
  )
}

export function SettingsPage() {
  return (
    <PlaceholderPage
      title="Settings"
      description="Atur profil bisnis, pengguna, dan preferensi aplikasi."
      modules={[
        { name: "Profil Bisnis", note: "Nama, logo, alamat, dan info pajak perusahaan." },
        { name: "Pengguna & Peran", note: "Undang tim dan atur hak akses tiap peran." },
        { name: "Integrasi", note: "Sambungkan Supabase, payment gateway, dan layanan lain." },
        { name: "Preferensi", note: "Mata uang, format tanggal, dan bahasa aplikasi." },
      ]}
    />
  )
}

export function ManufacturingPage() {
  return (
    <PlaceholderPage
      title="Manufacturing"
      description="Work order, bill of material, dan proses produksi."
      modules={[
        { name: "Work Order", note: "Rencanakan dan lacak proses produksi per batch." },
        { name: "Bill of Material", note: "Daftar komponen & bahan baku per produk jadi." },
        { name: "Jadwal Produksi", note: "Kapasitas mesin & lini produksi per periode." },
        { name: "Biaya Produksi", note: "Hitung HPP dari bahan, tenaga kerja, dan overhead." },
      ]}
    />
  )
}

export function QualityControlPage() {
  return (
    <PlaceholderPage
      title="Quality Control"
      description="Inspeksi mutu, pencatatan cacat, dan standar produksi."
      modules={[
        { name: "Inspeksi Masuk", note: "Cek kualitas bahan baku dari supplier." },
        { name: "Inspeksi Produksi", note: "Sampling mutu di tiap tahap produksi." },
        { name: "Laporan Cacat", note: "Catat dan lacak akar masalah defect produk." },
        { name: "Standar Mutu", note: "Kriteria & checklist QC per jenis produk." },
      ]}
    />
  )
}

export function PurchasingPage() {
  return (
    <PlaceholderPage
      title="Purchasing"
      description="Pesanan pembelian dan hubungan dengan supplier."
      modules={[
        { name: "Purchase Request", note: "Ajuan kebutuhan barang dari tiap divisi." },
        { name: "Purchase Order", note: "Pesanan resmi ke supplier dengan approval." },
        { name: "Data Supplier", note: "Kontak, harga, dan riwayat transaksi supplier." },
        { name: "Penerimaan Barang", note: "Cocokkan barang masuk dengan PO terkait." },
      ]}
    />
  )
}

export function HRPage() {
  return (
    <PlaceholderPage
      title="HR & Payroll"
      description="Data karyawan, absensi, dan penggajian."
      modules={[
        { name: "Data Karyawan", note: "Profil, kontrak, dan dokumen tiap karyawan." },
        { name: "Absensi", note: "Kehadiran, cuti, dan izin karyawan." },
        { name: "Penggajian", note: "Hitung gaji, tunjangan, dan potongan otomatis." },
        { name: "Evaluasi Kinerja", note: "Penilaian performa karyawan per periode." },
      ]}
    />
  )
}
