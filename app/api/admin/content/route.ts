import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { CONTENT_DEFAULTS } from "@/lib/site-content"
import { NextResponse } from "next/server"

async function requireAdmin() {
  const session = await auth()
  if (!session || session.user.role !== "ADMIN") return null
  return session
}

export async function GET() {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const rows = await db.siteContent.findMany()
  const overrides = Object.fromEntries(rows.map((r) => [r.key, r.value]))

  const content = Object.entries(CONTENT_DEFAULTS).map(([key, meta]) => ({
    key,
    value: overrides[key] ?? meta.value,
    label: meta.label,
    type: meta.type,
    isDefault: !overrides[key],
  }))

  return NextResponse.json(content)
}

export async function PATCH(req: Request) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const { key, value } = await req.json()
  if (!key || typeof value !== "string") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }
  if (!CONTENT_DEFAULTS[key]) {
    return NextResponse.json({ error: "Unknown key" }, { status: 400 })
  }

  const meta = CONTENT_DEFAULTS[key]
  await db.siteContent.upsert({
    where: { key },
    create: { key, value, type: meta.type as never, label: meta.label },
    update: { value },
  })

  return NextResponse.json({ ok: true })
}
