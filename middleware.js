import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req) {
  const res = NextResponse.next();

  // Attach Supabase middleware client (handles session cookies)
  const supabase = createMiddlewareClient({ req, res });

  // This line ensures cookies are updated properly
  await supabase.auth.getSession();

  return res;
}

// Pages protected under (protected)
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/mood/:path*",
    "/reflect/:path*",
    "/journal/:path*",
    "/achievements/:path*",
    "/insights/:path*",
  ],
};
