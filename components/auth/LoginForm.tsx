"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (res?.error) {
      setError("Email ya password galat hai.")
    } else {
      router.push("/dashboard")
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#f5a623] transition-colors"
        />
      </div>

      {error && (
        <p className="text-red-400 text-sm text-center">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#f5a623] hover:bg-[#e09410] disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold text-sm py-3.5 rounded-xl transition-colors duration-200"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>

      <p className="text-center text-gray-600 text-xs">
        Account nahi hai?{" "}
        <Link href="/register" className="text-[#f5a623] hover:text-[#e09410] transition-colors">
          Register karo
        </Link>
      </p>
    </form>
  )
}
