import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean)

export async function POST(req: Request) {
  const { name, email, password } = await req.json()

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Sab fields fill karo" }, { status: 400 })
  }
  if (password.length < 6) {
    return NextResponse.json({ error: "Password kam az kam 6 characters ka hona chahiye" }, { status: 400 })
  }

  const existing = await db.user.findUnique({ where: { email: email.toLowerCase() } })
  if (existing) {
    return NextResponse.json({ error: "Ye email pehle se registered hai" }, { status: 400 })
  }

  const hashed = await bcrypt.hash(password, 12)
  const role = ADMIN_EMAILS.includes(email.toLowerCase()) ? "ADMIN" : "MEMBER"

  await db.user.create({
    data: {
      name,
      email: email.toLowerCase(),
      password: hashed,
      role,
    },
  })

  return NextResponse.json({ success: true })
}
