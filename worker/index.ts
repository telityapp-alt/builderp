export interface Env {
  ASSETS: Fetcher
  SUPABASE_URL?: string
  SUPABASE_SERVICE_ROLE_KEY?: string
}

const router: Record<string, (request: Request, env: Env) => Response | Promise<Response>> = {
  "GET /api/health": () => Response.json({ ok: true, service: "buildapp" }),
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.pathname.startsWith("/api/")) {
      const handler = router[`${request.method} ${url.pathname}`]
      if (handler) return handler(request, env)
      return Response.json({ error: "Not found" }, { status: 404 })
    }

    return env.ASSETS.fetch(request)
  },
} satisfies ExportedHandler<Env>
