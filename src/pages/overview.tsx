import { Wallet, ShoppingCart, Users, Package } from "lucide-react"
import { PageShell, Section } from "@/components/layout/page-shell"
import { StatCard } from "@/components/dashboard/stat-card"
import { HeroCard } from "@/components/dashboard/hero-card"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatIDR } from "@/lib/utils"
import { useUiSound } from "@/components/sound/sound-provider"

const recentOrders = [
  { id: "INV-2041", customer: "Toko Berkah Jaya", amount: 2_450_000, status: "Lunas" },
  { id: "INV-2040", customer: "CV Sinar Mandiri", amount: 8_900_000, status: "Pending" },
  { id: "INV-2039", customer: "PT Nusantara Retail", amount: 15_200_000, status: "Lunas" },
  { id: "INV-2038", customer: "Warung Bu Sri", amount: 640_000, status: "Jatuh tempo" },
  { id: "INV-2037", customer: "Distributor Amanah", amount: 5_100_000, status: "Lunas" },
]

const statusVariant: Record<string, "success" | "warning" | "destructive"> = {
  "Lunas": "success",
  "Pending": "warning",
  "Jatuh tempo": "destructive",
}

export default function OverviewPage() {
  const { playClick } = useUiSound()

  return (
    <PageShell
      title="Overview"
      description="Ringkasan performa bisnis kamu bulan ini."
      actions={
        <Button size="sm" variant="secondary" onClick={() => playClick()}>
          Export
        </Button>
      }
    >
      {/* Hero */}
      <Section stagger={2}>
        <HeroCard />
      </Section>

      {/* KPI row */}
      <Section stagger={3}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard label="Pendapatan" value={formatIDR(71_400_000)} delta={12.4} hint="vs bulan lalu" icon={<Wallet className="size-4" />} />
          <StatCard label="Pesanan" value="1.284" delta={8.1} hint="342 minggu ini" icon={<ShoppingCart className="size-4" />} />
          <StatCard label="Pelanggan" value="892" delta={3.2} hint="24 baru" icon={<Users className="size-4" />} />
          <StatCard label="Stok Item" value="3.410" delta={-2.6} hint="18 menipis" icon={<Package className="size-4" />} />
        </div>
      </Section>

      {/* Chart + side panel */}
      <Section stagger={4}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader className="flex-row items-center justify-between">
              <div className="flex flex-col gap-1">
                <CardTitle>Arus Kas</CardTitle>
                <CardDescription>Pendapatan vs pengeluaran, 7 bulan terakhir</CardDescription>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-chart-1" /> Pendapatan</span>
                <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-chart-3" /> Pengeluaran</span>
              </div>
            </CardHeader>
            <CardContent>
              <RevenueChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ringkasan</CardTitle>
              <CardDescription>Bulan berjalan</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <SummaryRow label="Laba kotor" value={formatIDR(30_600_000)} />
              <SummaryRow label="Margin" value="42,8%" />
              <SummaryRow label="Piutang" value={formatIDR(9_540_000)} />
              <SummaryRow label="Utang" value={formatIDR(4_120_000)} />
              <div className="pt-2">
                <Button className="w-full" size="sm" onClick={() => playClick()}>
                  Lihat laporan lengkap
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Recent orders */}
      <Section stagger={5}>
        <Card>
          <CardHeader>
            <CardTitle>Transaksi Terbaru</CardTitle>
            <CardDescription>5 invoice terakhir</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto scrollbar-none">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground border-b">
                    <th className="font-medium px-5 py-2.5">Invoice</th>
                    <th className="font-medium px-5 py-2.5">Pelanggan</th>
                    <th className="font-medium px-5 py-2.5 text-right">Nominal</th>
                    <th className="font-medium px-5 py-2.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((o) => (
                    <tr key={o.id} className="border-b last:border-0 hover:bg-accent/50 transition-colors">
                      <td className="px-5 py-3 font-medium tabular">{o.id}</td>
                      <td className="px-5 py-3 text-muted-foreground">{o.customer}</td>
                      <td className="px-5 py-3 text-right tabular">{formatIDR(o.amount)}</td>
                      <td className="px-5 py-3 text-right">
                        <Badge variant={statusVariant[o.status]}>{o.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </Section>
    </PageShell>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium tabular">{value}</span>
    </div>
  )
}
