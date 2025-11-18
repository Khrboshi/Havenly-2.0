import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req) {
  const res = NextResponse.next({
    request: { headers: req.headers },
  });

  // Create authenticated supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: (name) => req.cookies.get(name)?.value,
        set: (name, value, options) =>
          res.cookies.set(name, value, options),
        remove: (name, options) =>
          res.cookies.set(name, "", { ...options, maxAge: 0 }),
      },
    }
  );

  // Load session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const pathname = req.nextUrl.pathname;

  const protectedRoutes = [
    "/dashboard",
    "/mood",
    "/journal",
    "/reflect",
    "/insights",
    "/profile",
  ];

  // Redirect unauthenticated users
  if (
    protectedRoutes.some((route) => pathname.startsWith(route)) &&
    !session
  ) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Allow access
  return res;
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
