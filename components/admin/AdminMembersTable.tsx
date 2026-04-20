"use client"

import { useState } from "react"
import Image from "next/image"

type Member = {
  id: string
  name: string | null
  email: string
  image: string | null
  phone: string | null
  createdAt: string
  membership: {
    plan: string
    status: string
    endDate: string | null
  } | null
}

const PLAN_COLORS: Record<string, string> = {
  BASIC: "text-blue-400 bg-blue-400/10",
  CHAMPION: "text-[#f5a623] bg-[#f5a623]/10",
  ELITE: "text-purple-400 bg-purple-400/10",
}
const STATUS_COLORS: Record<string, string> = {
  ACTIVE: "text-green-400 bg-green-400/10",
  EXPIRED: "text-red-400 bg-red-400/10",
  PENDING: "text-yellow-400 bg-yellow-400/10",
}

export default function AdminMembersTable({ members }: { members: Member[] }) {
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("ALL")
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const filtered = members.filter((m) => {
    const q = search.toLowerCase()
    const matchSearch = !q || (m.name?.toLowerCase().includes(q) ?? false) || m.email.toLowerCase().includes(q)
    const matchStatus =
      filterStatus === "ALL" ||
      (filterStatus === "ACTIVE" && m.membership?.status === "ACTIVE") ||
      (filterStatus === "EXPIRED" && m.membership?.status === "EXPIRED") ||
      (filterStatus === "NONE" && !m.membership)
    return matchSearch && matchStatus
  })

  const allSelected = filtered.length > 0 && filtered.every((m) => selected.has(m.id))

  const toggleAll = () => {
    const next = new Set(selected)
    if (allSelected) filtered.forEach((m) => next.delete(m.id))
    else filtered.forEach((m) => next.add(m.id))
    setSelected(next)
  }

  const toggle = (id: string) => {
    const next = new Set(selected)
    next.has(id) ? next.delete(id) : next.add(id)
    setSelected(next)
  }

  const bulkEmail = () => {
    const emails = members
      .filter((m) => selected.has(m.id))
      .map((m) => m.email)
      .join(",")
    window.location.href = `mailto:${emails}?subject=Safa Fitness Club — Important Update`
  }

  return (
    <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-[#2a2a2a]">
        <h2
          className="text-white font-bold uppercase mr-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          All Members
        </h2>

        <input
          type="text"
          placeholder="Search name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[180px] bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#f5a623]/40"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-1.5 text-sm text-gray-400 outline-none cursor-pointer"
        >
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="EXPIRED">Expired</option>
          <option value="NONE">No Plan</option>
        </select>

        {selected.size > 0 && (
          <button
            onClick={bulkEmail}
            className="flex items-center gap-2 px-4 py-1.5 bg-[#f5a623] hover:bg-[#e09410] text-black text-sm font-bold rounded-lg transition-colors"
          >
            ✉ Email {selected.size} selected
          </button>
        )}

        <span className="text-gray-600 text-xs ml-auto whitespace-nowrap">
          {filtered.length} of {members.length} members
        </span>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center text-gray-600 text-sm">No members found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#2a2a2a] text-gray-600 text-xs uppercase tracking-wider">
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="accent-[#f5a623] w-4 h-4 cursor-pointer"
                  />
                </th>
                <th className="text-left px-4 py-3">Member</th>
                <th className="text-left px-4 py-3">Phone</th>
                <th className="text-left px-4 py-3">Plan</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Expiry</th>
                <th className="text-left px-4 py-3">Joined</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((member) => (
                <tr
                  key={member.id}
                  onClick={() => toggle(member.id)}
                  className={`border-b border-[#1a1a1a] transition-colors cursor-pointer ${
                    selected.has(member.id) ? "bg-[#f5a623]/5" : "hover:bg-[#1a1a1a]"
                  }`}
                >
                  <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selected.has(member.id)}
                      onChange={() => toggle(member.id)}
                      className="accent-[#f5a623] w-4 h-4 cursor-pointer"
                    />
                  </td>

                  <td className="px-4 py-4">
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
                          {member.name?.[0]?.toUpperCase() ?? "?"}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-white font-medium truncate">{member.name ?? "—"}</p>
                        <p className="text-gray-600 text-xs truncate">{member.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-gray-400 text-xs">
                    {member.phone ?? "—"}
                  </td>

                  <td className="px-4 py-4">
                    {member.membership ? (
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${PLAN_COLORS[member.membership.plan] ?? ""}`}>
                        {member.membership.plan.charAt(0) + member.membership.plan.slice(1).toLowerCase()}
                      </span>
                    ) : (
                      <span className="text-gray-600 text-xs">—</span>
                    )}
                  </td>

                  <td className="px-4 py-4">
                    {member.membership ? (
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${STATUS_COLORS[member.membership.status] ?? ""}`}>
                        {member.membership.status}
                      </span>
                    ) : (
                      <span className="text-gray-600 text-xs">No Plan</span>
                    )}
                  </td>

                  <td className="px-4 py-4 text-gray-400 text-xs">
                    {member.membership?.endDate
                      ? new Date(member.membership.endDate).toLocaleDateString("en-PK", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </td>

                  <td className="px-4 py-4 text-gray-500 text-xs">
                    {new Date(member.createdAt).toLocaleDateString("en-PK", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
