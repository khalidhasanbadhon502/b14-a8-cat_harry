import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "better-auth.session_token";

export function proxy(request: NextRequest) {
  // Unified auth (better-auth) stores its session in this cookie.
  const token = request.cookies.get(SESSION_COOKIE)?.value;

  const { pathname } = request.nextUrl;

  // Pages that stay open for unauthenticated visitors.
  const isPublicPath = pathname === "/login" || pathname === "/register";

  // 1. No session and not on a public page -> send to /login.
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. Has a session and tries to visit /login or /register -> send home.
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets).*)",
  ],
};
