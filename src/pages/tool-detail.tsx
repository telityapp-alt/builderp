import { useParams, Navigate, Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { PageShell, Section } from "@/components/layout/page-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TOOLS } from "@/data/tools"

export default function ToolDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const tool = TOOLS.find((t) => t.slug === slug)

  if (!tool) return <Navigate to="/modules" replace />

  return (
    <PageShell
      title={tool.name}
      description={tool.note}
      actions={<Badge variant="secondary">{tool.category}</Badge>}
    >
      <Section stagger={2}>
        <Link to="/modules" className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="size-4" /> Kembali ke Modules
        </Link>
      </Section>

      <Section stagger={3}>
        <Card>
          <CardContent className="p-8 flex flex-col items-center text-center gap-2">
            <p className="text-base font-medium">Tool ini lagi dibangun</p>
            <p className="text-sm text-muted-foreground max-w-sm">
              Kalkulator &quot;{tool.name}&quot; akan diisi pakai styling &amp; komponen yang sama persis dengan modul lain.
            </p>
          </CardContent>
        </Card>
      </Section>
    </PageShell>
  )
}
