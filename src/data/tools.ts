export interface Tool {
  slug: string
  name: string
  category: string
  note: string
}

export const TOOL_CATEGORIES = ["Keuangan", "Inventory", "Produksi", "HR"] as const

export const TOOLS: Tool[] = [
  { slug: "hitung-hpp", name: "Hitung HPP", category: "Keuangan", note: "Harga pokok penjualan dari bahan, tenaga kerja, overhead." },
  { slug: "metode-persediaan", name: "Metode Persediaan", category: "Inventory", note: "Bandingkan valuasi stok pakai FIFO, LIFO, atau rata-rata." },
  { slug: "margin-markup", name: "Margin & Markup", category: "Keuangan", note: "Hitung margin, markup, dan harga jual ideal." },
  { slug: "break-even-point", name: "Break Even Point", category: "Keuangan", note: "Titik impas dari biaya tetap, variabel, dan harga jual." },
  { slug: "economic-order-quantity", name: "Economic Order Quantity", category: "Inventory", note: "Jumlah order optimal biar biaya simpan & pesan minimal." },
  { slug: "reorder-point", name: "Reorder Point", category: "Inventory", note: "Kapan waktu terbaik buat restock tiap item." },
  { slug: "depresiasi-aset", name: "Depresiasi Aset", category: "Keuangan", note: "Penyusutan aset pakai garis lurus atau saldo menurun." },
  { slug: "kalkulator-payroll", name: "Kalkulator Payroll", category: "HR", note: "Estimasi gaji bersih, potongan, dan tunjangan karyawan." },
  { slug: "konversi-satuan", name: "Konversi Satuan", category: "Produksi", note: "Ubah satuan bahan baku & produk antar unit." },
  { slug: "kapasitas-produksi", name: "Kapasitas Produksi", category: "Produksi", note: "Estimasi output maksimal lini produksi per periode." },
  { slug: "cash-flow-projector", name: "Cash Flow Projector", category: "Keuangan", note: "Proyeksi arus kas masuk & keluar beberapa bulan ke depan." },
  { slug: "invoice-generator", name: "Invoice Generator", category: "Keuangan", note: "Bikin invoice profesional siap kirim ke pelanggan." },
]
