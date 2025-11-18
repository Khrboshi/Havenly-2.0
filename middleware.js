import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.pathname;

  // Protected routes
  const protectedRoutes = [
    "/dashboard",
    "/mood",
    "/journal",
    "/reflect",
    "/insights",
    "/profile",
  ];

  const isProtected = protectedRoutes.some((route) =>
    url.startsWith(route)
  );

  // Supabase stores access token inside this cookie:
  const hasSession = req.cookies.get("sb-access-token");

  // If route is protected and no session → redirect to login
  if (isProtected && !hasSession) {
    const loginUrl = new URL("/auth/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/mood/:path*",
    "/journal/:path*",
    "/reflect/:path*",
    "/insights/:path*",
    "/profile/:path*",
  ],
};
