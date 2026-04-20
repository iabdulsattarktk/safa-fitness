import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import SignOutButton from "@/components/auth/SignOutButton"
import ExerciseLibrary from "@/components/dashboard/ExerciseLibrary"
import WorkoutPlans from "@/components/dashboard/WorkoutPlans"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Dashboard | Safa Fitness Club",
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect("/login")
  if (session.user.role === "ADMIN") redirect("/admin")

  const savedExercises = await db.userExercise.findMany({
    where: { userId: session.user.id },
    select: { exerciseId: true },
    orderBy: { createdAt: "asc" },
  })
  const savedIds = savedExercises.map((e) => e.exerciseId)

  const membership = await db.membership.findUnique({ where: { userId: session.user.id } })

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-20 pb-16 px-4">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* ── Top bar ── */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt=""
                width={44}
                height={44}
                className="rounded-full border-2 border-[#2a2a2a]"
              />
            ) : (
              <div className="w-11 h-11 rounded-full bg-[#f5a623]/20 flex items-center justify-center text-[#f5a623] font-bold text-base">
                {session.user.name?.[0] ?? "M"}
              </div>
            )}
            <div>
              <h1 className="text-xl font-bold uppercase text-white" style={{ fontFamily: "var(--font-display)" }}>
                Hey, <span className="text-[#f5a623]">{session.user.name?.split(" ")[0]}</span>
              </h1>
              <p className="text-gray-500 text-xs">{session.user.email}</p>
            </div>
          </div>
          <SignOutButton />
        </div>

        {/* ── Membership badge ── */}
        {membership ? (
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
            membership.status === "ACTIVE"
              ? "bg-green-400/5 border-green-400/20"
              : "bg-red-400/5 border-red-400/20"
          }`}>
            <span className="text-lg">{membership.status === "ACTIVE" ? "✅" : "⚠️"}</span>
            <div>
              <p className="text-white text-sm font-semibold">
                {membership.plan.charAt(0) + membership.plan.slice(1).toLowerCase()} Membership
                <span className={`ml-2 text-xs font-bold px-2 py-0.5 rounded-full ${
                  membership.status === "ACTIVE" ? "text-green-400 bg-green-400/10" : "text-red-400 bg-red-400/10"
                }`}>
                  {membership.status}
                </span>
              </p>
              <p className="text-gray-500 text-xs">
                {membership.status === "ACTIVE"
                  ? `Valid until ${new Date(membership.endDate).toLocaleDateString("en-PK", { day: "numeric", month: "long", year: "numeric" })}`
                  : "Your membership has expired — visit the gym to renew"}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-[#2a2a2a] bg-[#141414]">
            <p className="text-gray-400 text-sm">No active membership yet.</p>
            <a href="/pricing" className="text-[#f5a623] text-xs font-bold hover:text-[#e09410] transition-colors">
              View Plans →
            </a>
          </div>
        )}

        {/* ── Workout Plans ── */}
        <WorkoutPlans />

        {/* ── Exercise Library ── */}
        <ExerciseLibrary
          savedIds={savedIds}
          userName={session.user.name ?? "Member"}
        />

      </div>
    </main>
  )
}
