import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PROTECTED_PATHS = ["/dashboard", "/providers", "/admin"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const accessToken = request.cookies.get("sb-access-token")?.value
  const role = request.cookies.get("sb-role")?.value || "patient"

  const requiresProtection = PROTECTED_PATHS.some((path) => pathname.startsWith(path))

  if (requiresProtection && !accessToken) {
    const redirectUrl = new URL("/auth", request.url)
    redirectUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(redirectUrl)
  }

  if (pathname.startsWith("/admin") && role !== "admin") {
    const redirectUrl = new URL("/dashboard", request.url)
    redirectUrl.searchParams.set("notice", "admin")
    return NextResponse.redirect(redirectUrl)
  }

  if (pathname.startsWith("/auth") && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/providers/:path*", "/admin/:path*", "/auth/:path*"],
}
