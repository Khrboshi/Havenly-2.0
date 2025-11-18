import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone();

  const protectedRoutes = [
    "/dashboard",
    "/mood",
    "/journal",
    "/reflect",
    "/insights",
    "/profile",
  ];

  const pathname = req.nextUrl.pathname;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Read Supabase auth cookie directly
  const accessToken = req.cookies.get("sb-access-token")?.value;

  // If entering protected route without token → redirect to login
  if (isProtected && !accessToken) {
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
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
