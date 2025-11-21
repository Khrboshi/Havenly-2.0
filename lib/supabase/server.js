"use server";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/auth-helpers-nextjs";

/**
 * Server-side Supabase client for Next.js 14 App Router.
 * Fully compatible with RLS, cookies, and Vercel deployments.
 */
export async function supabaseServer() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name, options) {
          cookieStore.set({ name, value: "", ...options, maxAge: 0 });
        }
      }
    }
  );
}
