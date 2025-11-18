import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req) {
  const res = NextResponse.next();

  // Create the Supabase client with auth helpers
  const supabase = createMiddlewareClient({ req, res });

  // This refreshes the session if needed and applies auth cookies
  await supabase.auth.getSession();

  return res;
}

// Protect ALL routes inside /(protected)
export const config = {
  matcher: ["/(protected)/(.*)"],
};
