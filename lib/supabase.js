"use client";

import { supabaseBrowser } from "./supabase/browser";

/**
 * Backwards-compatible export used in various client files
 * (login, signup, achievements, etc.).
 */
export const supabase = supabaseBrowser();
