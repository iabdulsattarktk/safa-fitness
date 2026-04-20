"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 5000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
      <div className="flex items-center gap-3 bg-[#1a2a1a] border border-green-500/40 text-green-300 px-5 py-3.5 rounded-2xl shadow-2xl shadow-black/60 min-w-[300px] max-w-sm">
        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-sm font-medium flex-1">{message}</p>
        <button onClick={onClose} className="text-green-500/60 hover:text-green-400 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const [showToast, setShowToast] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })

    const data = await res.json()

    if (!res.ok) {
      setErrorMsg(data.error ?? "Something went wrong. Please try again.")
      setStatus("error")
    } else {
      setStatus("sent")
      setShowToast(true)
    }
  }

  return (
    <main data-auth className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
      {showToast && (
        <Toast
          message="Reset link sent! Check your inbox (and spam folder)."
          onClose={() => setShowToast(false)}
        />
      )}
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

          {status === "sent" ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
                Check Your Email
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                If <strong className="text-white">{email}</strong> is registered with us,
                you will receive a password reset link shortly. Please also check your spam folder.
              </p>
              <Link href="/login"
                className="text-[#f5a623] hover:text-[#e09410] text-sm font-medium transition-colors">
                ← Back to Login
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold uppercase text-white mb-2"
                  style={{ fontFamily: "var(--font-display)" }}>
                  Forgot <span className="text-[#f5a623]">Password</span>
                </h1>
                <p className="text-gray-500 text-sm">
                  Enter your email and we will send you a reset link
                </p>
              </div>

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

                {status === "error" && (
                  <p className="text-red-400 text-sm text-center">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-[#f5a623] hover:bg-[#e09410] disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold text-sm py-3.5 rounded-xl transition-colors duration-200"
                >
                  {status === "loading" ? "Sending..." : "Send Reset Link"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link href="/login" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
                  ← Back to Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
