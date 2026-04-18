import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check session cookie (Auth.js v5 uses "authjs." prefix)
  const sessionToken =
    request.cookies.get("authjs.session-token")?.value ||
    request.cookies.get("__Secure-authjs.session-token")?.value

  const isLoggedIn = !!sessionToken

  // All protected routes require login
  const isProtected =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin")

  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Already logged in user trying to visit /login
  if (pathname === "/login" && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login"],
}
