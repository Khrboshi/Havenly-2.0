import { NextResponse } from "next/server";

export function middleware(request) {
  const protectedPaths = [
    "/dashboard",
    "/mood",
    "/journal",
    "/reflect",
    "/insights",
    "/profile",
  ];

  const pathname = request.nextUrl.pathname;
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));
  const user = request.cookies.get("sb-access-token");

  if (isProtected && !user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
