import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

// POST /api/exercises  { exerciseId }  — toggle saved/unsaved
export async function POST(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { exerciseId } = await req.json()
  if (!exerciseId) return NextResponse.json({ error: "Missing exerciseId" }, { status: 400 })

  const existing = await db.userExercise.findUnique({
    where: { userId_exerciseId: { userId: session.user.id, exerciseId } },
  })

  if (existing) {
    await db.userExercise.delete({ where: { id: existing.id } })
    return NextResponse.json({ saved: false })
  } else {
    await db.userExercise.create({ data: { userId: session.user.id, exerciseId } })
    return NextResponse.json({ saved: true })
  }
}
