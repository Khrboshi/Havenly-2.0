"use client";

import { createBrowserClient } from "@supabase/ssr";

let browserClient;

/**
 * Browser-side Supabase client (singleton).
 * Use this in client components only.
 */
export function supabaseBrowser() {
  if (!browserClient) {
    browserClient = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }

  return browserClient;
}
