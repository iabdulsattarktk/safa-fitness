import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { pathname } = req.nextUrl
  const session = req.auth

  // Dashboard — sirf logged-in users
  if (pathname.startsWith("/dashboard") && !session) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Trainer panel — sirf TRAINER ya ADMIN
  if (pathname.startsWith("/trainer")) {
    if (!session) return NextResponse.redirect(new URL("/login", req.url))
    const role = session.user?.role
    if (role !== "TRAINER" && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }

  // Admin panel — sirf ADMIN
  if (pathname.startsWith("/admin")) {
    if (!session) return NextResponse.redirect(new URL("/login", req.url))
    if (session.user?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/dashboard/:path*", "/trainer/:path*", "/admin/:path*"],
}
