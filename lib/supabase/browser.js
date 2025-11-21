"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Recommended browser-side Supabase client for Next.js 14.
 */
export function createBrowserSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

/** Backwards compatibility */
export const supabaseBrowser = createBrowserSupabase;
