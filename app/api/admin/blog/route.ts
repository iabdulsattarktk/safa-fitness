import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await auth()
  if (!session || session.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const posts = await db.blogPost.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] })
  return NextResponse.json(posts)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session || session.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const post = await db.blogPost.create({ data: body })
  return NextResponse.json(post)
}
