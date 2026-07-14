import * as React from "react"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  label: string
  value: string
  delta?: number
  hint?: string
  icon?: React.ReactNode
}

/** Compact KPI tile — bg-component surface, tabular figures, subtle up/down delta. */
export function StatCard({ label, value, delta, hint, icon }: StatCardProps) {
  const positive = (delta ?? 0) >= 0
  return (
    <Card className="p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        {icon && <span className="text-muted-foreground">{icon}</span>}
      </div>
      <div className="flex items-end justify-between gap-2">
        <span className="text-2xl font-medium tabular tracking-[-0.4px]">{value}</span>
        {typeof delta === "number" && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-medium tabular",
              positive ? "text-[hsl(var(--success))]" : "text-destructive"
            )}
          >
            {positive ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
            {Math.abs(delta)}%
          </span>
        )}
      </div>
      {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
    </Card>
  )
}
