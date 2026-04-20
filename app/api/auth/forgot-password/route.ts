import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { sendPasswordResetEmail } from "@/lib/email"
import crypto from "crypto"

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 })
  }

  const user = await db.user.findUnique({ where: { email } })

  // Always return success — don't reveal whether the email exists
  if (!user) {
    return NextResponse.json({ success: true })
  }

  // Delete any existing tokens for this email
  await db.passwordResetToken.deleteMany({ where: { email } })

  const token = crypto.randomBytes(32).toString("hex")
  const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

  await db.passwordResetToken.create({
    data: { email, token, expires },
  })

  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000"
  const resetUrl = `${baseUrl}/reset-password?token=${token}`

  try {
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Email timeout")), 20000)
    )
    await Promise.race([sendPasswordResetEmail(email, resetUrl), timeout])
  } catch (err) {
    console.error("Email send failed:", err)
    return NextResponse.json({ error: "Failed to send email. Please try again later." }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
