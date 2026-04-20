"use client"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

function Eye() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  )
}

function EyeOff() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  )
}

function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  if (!token) {
    return (
      <div className="text-center py-4">
        <p className="text-red-400 text-sm mb-4">
          This reset link is invalid. Please request a new one.
        </p>
        <Link href="/forgot-password" className="text-[#f5a623] hover:text-[#e09410] text-sm transition-colors">
          Forgot Password
        </Link>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) {
      setErrorMsg("Passwords do not match.")
      return
    }
    setStatus("loading")
    setErrorMsg("")

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      setErrorMsg(data.error ?? "Something went wrong. Please try again.")
      setStatus("error")
    } else {
      setStatus("success")
      setTimeout(() => router.push("/login"), 2500)
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-4">
        <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Password Updated!
        </h2>
        <p className="text-gray-400 text-sm">Redirecting you to login...</p>
      </div>
    )
  }

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold uppercase text-white mb-2"
          style={{ fontFamily: "var(--font-display)" }}>
          New <span className="text-[#f5a623]">Password</span>
        </h1>
        <p className="text-gray-500 text-sm">Choose a strong new password for your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-400 text-sm mb-1.5">New Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl px-4 py-3 pr-11 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#f5a623] transition-colors"
            />
            <button type="button" onClick={() => setShowPassword(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}>
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          <p className="text-gray-600 text-xs mt-1">Minimum 8 characters</p>
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1.5">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl px-4 py-3 pr-11 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#f5a623] transition-colors"
            />
            <button type="button" onClick={() => setShowConfirm(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              aria-label={showConfirm ? "Hide password" : "Show password"}>
              {showConfirm ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>

        {(status === "error" || errorMsg) && (
          <p className="text-red-400 text-sm text-center">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-[#f5a623] hover:bg-[#e09410] disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold text-sm py-3.5 rounded-xl transition-colors duration-200"
        >
          {status === "loading" ? "Saving..." : "Save New Password"}
        </button>
      </form>
    </>
  )
}

export default function ResetPasswordPage() {
  return (
    <main data-auth className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f5a623]/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-8 shadow-2xl shadow-black/60">
          <div className="flex justify-center mb-8">
            <Link href="/">
              <Image src="/images/logo.webp" alt="Safa Fitness Club" width={160} height={48}
                className="h-10 w-auto object-contain" priority />
            </Link>
          </div>
          <Suspense fallback={<p className="text-gray-400 text-center text-sm">Loading...</p>}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
