import * as React from "react"
import { cn } from "@/lib/utils"

interface PageShellProps {
  title: string
  description?: string
  actions?: React.ReactNode
  children: React.ReactNode
  className?: string
}

/**
 * Standard page container: centered, max-width, generous bottom padding so the
 * floating dock never covers content, plus orchestration stagger on entry.
 */
export function PageShell({ title, description, actions, children, className }: PageShellProps) {
  return (
    <main
      className={cn(
        "flex flex-col max-w-5xl mx-auto gap-5 sm:gap-6 p-5 sm:p-6 sm:pt-12 pb-40 sm:pb-44 orchestration",
        className
      )}
    >
      <header
        className="flex items-start justify-between gap-4 w-full"
        style={{ "--stagger": 1 } as React.CSSProperties}
      >
        <div className="flex flex-col gap-1">
          <h1>{title}</h1>
          {description && (
            <p className="text-base text-muted-foreground leading-relaxed">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </header>
      {children}
    </main>
  )
}

/** Convenience wrapper to apply the stagger index to a section. */
export function Section({
  stagger,
  className,
  children,
}: {
  stagger: number
  className?: string
  children: React.ReactNode
}) {
  return (
    <section
      className={cn("flex flex-col gap-4 w-full", className)}
      style={{ "--stagger": stagger } as React.CSSProperties}
    >
      {children}
    </section>
  )
}
