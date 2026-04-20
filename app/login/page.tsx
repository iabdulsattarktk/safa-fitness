import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import LoginForm from "@/components/auth/LoginForm"
import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Member Login | Safa Fitness Club",
  description: "Login to your Safa Fitness Club member account.",
}

export default async function LoginPage() {
  const session = await auth()
  if (session) redirect("/dashboard")

  return (
    <main data-auth className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f5a623]/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-8 shadow-2xl shadow-black/60">

          <div className="flex justify-center mb-8">
            <Image
              src="/images/logo.webp"
              alt="Safa Fitness Club"
              width={160}
              height={48}
              className="h-10 w-auto object-contain"
              priority
            />
          </div>

          <div className="text-center mb-8">
            <h1
              className="text-3xl font-bold uppercase text-white mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Member <span className="text-[#f5a623]">Login</span>
            </h1>
            <p className="text-gray-500 text-sm">
              Sign in to your member portal
            </p>
          </div>

          <LoginForm />

          <div className="mt-8 pt-6 border-t border-[#2a2a2a] text-center">
            <p className="text-gray-600 text-xs">
              Not a member yet?{" "}
              <a href="/pricing" className="text-[#f5a623] hover:text-[#e09410] transition-colors">
                View Membership Plans
              </a>
            </p>
          </div>

        </div>

        <div className="text-center mt-4">
          <a href="/" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">
            ← Back to Website
          </a>
        </div>
      </div>
    </main>
  )
}
