import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { formatCompact } from "@/lib/utils"

const data = [
  { month: "Jan", revenue: 42_000_000, expense: 28_000_000 },
  { month: "Feb", revenue: 48_500_000, expense: 30_100_000 },
  { month: "Mar", revenue: 51_200_000, expense: 33_400_000 },
  { month: "Apr", revenue: 47_800_000, expense: 31_900_000 },
  { month: "May", revenue: 58_300_000, expense: 35_600_000 },
  { month: "Jun", revenue: 64_900_000, expense: 38_200_000 },
  { month: "Jul", revenue: 71_400_000, expense: 40_800_000 },
]

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-md border bg-component px-3 py-2 shadow-md text-sm">
      <p className="font-medium mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} className="flex items-center gap-2 text-muted-foreground tabular">
          <span className="inline-block size-2 rounded-full" style={{ background: p.color }} />
          {p.dataKey === "revenue" ? "Pendapatan" : "Pengeluaran"}: Rp {formatCompact(p.value)}
        </p>
      ))}
    </div>
  )
}

export function RevenueChart() {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
          <defs>
            <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.35} />
              <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="exp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--chart-3))" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(var(--chart-3))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={44}
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            tickFormatter={(v) => formatCompact(v)}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke: "hsl(var(--border))" }} />
          <Area type="monotone" dataKey="revenue" stroke="hsl(var(--chart-1))" strokeWidth={2} fill="url(#rev)" />
          <Area type="monotone" dataKey="expense" stroke="hsl(var(--chart-3))" strokeWidth={2} fill="url(#exp)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
