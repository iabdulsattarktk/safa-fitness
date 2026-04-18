"use client"

import { signOut } from "next-auth/react"
import { useState } from "react"

export default function SignOutButton() {
  const [loading, setLoading] = useState(false)

  return (
    <button
      onClick={async () => {
        setLoading(true)
        await signOut({ callbackUrl: "/" })
      }}
      disabled={loading}
      className="px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white border border-[#2a2a2a] hover:border-[#444] rounded-lg transition-colors disabled:opacity-50"
    >
      {loading ? "Signing out..." : "Sign Out"}
    </button>
  )
}
