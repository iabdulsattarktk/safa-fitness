import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import SignOutButton from "@/components/auth/SignOutButton"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Panel | Safa Fitness Club",
}

export default async function AdminPage() {
  const session = await auth()
  if (!session) redirect("/login")
  if (session.user.role !== "ADMIN") redirect("/dashboard")

  const members = await db.user.findMany({
    where: { role: "MEMBER" },
    include: { membership: true },
    orderBy: { createdAt: "desc" },
  })

  const totalMembers = members.length
  const activeMembers = members.filter((m) => m.membership?.status === "ACTIVE").length
  const expiredMembers = members.filter((m) => m.membership?.status === "EXPIRED").length
  const noMembership = members.filter((m) => !m.membership).length

  const planLabels: Record<string, string> = {
    BASIC: "Basic", CHAMPION: "Champion", ELITE: "Elite"
  }
  const planColors: Record<string, string> = {
    BASIC:    "text-blue-400 bg-blue-400/10",
    CHAMPION: "text-[#f5a623] bg-[#f5a623]/10",
    ELITE:    "text-purple-400 bg-purple-400/10",
  }
  const statusColors: Record<string, string> = {
    ACTIVE:  "text-green-400 bg-green-400/10",
    EXPIRED: "text-red-400 bg-red-400/10",
    PENDING: "text-yellow-400 bg-yellow-400/10",
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-20 pb-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {session.user.image && (
              <Image
                src={session.user.image}
                alt="Admin"
                width={44}
                height={44}
                className="rounded-full border-2 border-[#f5a623]/40"
              />
            )}
            <div>
              <h1
                className="text-2xl font-bold uppercase text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Admin <span className="text-[#f5a623]">Panel</span>
              </h1>
              <p className="text-gray-500 text-sm">{session.user.email}</p>
            </div>
          </div>
          <SignOutButton />
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Total Members",   value: totalMembers,   color: "text-white" },
            { label: "Active",          value: activeMembers,  color: "text-green-400" },
            { label: "Expired",         value: expiredMembers, color: "text-red-400" },
            { label: "No Membership",   value: noMembership,   color: "text-gray-400" },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-4 text-center">
              <p className={`text-3xl font-bold ${stat.color}`} style={{ fontFamily: "var(--font-display)" }}>
                {stat.value}
              </p>
              <p className="text-gray-600 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Members Table */}
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#2a2a2a]">
            <h2
              className="text-white font-bold uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              All Members
            </h2>
          </div>

          {members.length === 0 ? (
            <div className="py-16 text-center text-gray-600 text-sm">
              No members yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#2a2a2a] text-gray-600 text-xs uppercase tracking-wider">
                    <th className="text-left px-6 py-3">Member</th>
                    <th className="text-left px-4 py-3">Plan</th>
                    <th className="text-left px-4 py-3">Status</th>
                    <th className="text-left px-4 py-3">Expiry</th>
                    <th className="text-left px-4 py-3">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr
                      key={member.id}
                      className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a] transition-colors"
                    >
                      {/* Member info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {member.image ? (
                            <Image
                              src={member.image}
                              alt={member.name ?? ""}
                              width={32}
                              height={32}
                              className="rounded-full flex-shrink-0"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center text-gray-400 text-xs font-bold flex-shrink-0">
                              {member.name?.[0] ?? "?"}
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-white font-medium truncate">{member.name ?? "—"}</p>
                            <p className="text-gray-600 text-xs truncate">{member.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Plan */}
                      <td className="px-4 py-4">
                        {member.membership ? (
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${planColors[member.membership.plan]}`}>
                            {planLabels[member.membership.plan]}
                          </span>
                        ) : (
                          <span className="text-gray-600 text-xs">—</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        {member.membership ? (
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusColors[member.membership.status]}`}>
                            {member.membership.status}
                          </span>
                        ) : (
                          <span className="text-gray-600 text-xs">No Plan</span>
                        )}
                      </td>

                      {/* Expiry */}
                      <td className="px-4 py-4 text-gray-400 text-xs">
                        {member.membership?.endDate
                          ? new Date(member.membership.endDate).toLocaleDateString("en-PK", {
                              day: "numeric", month: "short", year: "numeric",
                            })
                          : "—"}
                      </td>

                      {/* Joined */}
                      <td className="px-4 py-4 text-gray-500 text-xs">
                        {new Date(member.createdAt).toLocaleDateString("en-PK", {
                          day: "numeric", month: "short", year: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </main>
  )
}
