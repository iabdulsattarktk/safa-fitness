"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(data.error || "Kuch error aya, dobara try karo")
    } else {
      router.push("/login?registered=1")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-400 text-sm mb-1.5">Full Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Apna naam likhو"
          className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#f5a623] transition-colors"
        />
      </div>

      <div>
        <label className="block text-gray-400 text-sm mb-1.5">Email Address</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@gmail.com"
          className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#f5a623] transition-colors"
        />
      </div>

      <div>
        <label className="block text-gray-400 text-sm mb-1.5">Password</label>
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#f5a623] transition-colors"
        />
        <p className="text-gray-600 text-xs mt-1">Kam az kam 6 characters</p>
      </div>

      {error && (
        <p className="text-red-400 text-sm text-center">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#f5a623] hover:bg-[#e09410] disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold text-sm py-3.5 rounded-xl transition-colors duration-200"
      >
        {loading ? "Creating account..." : "Create Account"}
      </button>

      <p className="text-center text-gray-600 text-xs">
        Pehle se account hai?{" "}
        <Link href="/login" className="text-[#f5a623] hover:text-[#e09410] transition-colors">
          Sign In karo
        </Link>
      </p>
    </form>
  )
}
