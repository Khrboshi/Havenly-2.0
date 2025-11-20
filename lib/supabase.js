"use client";

import { supabaseBrowser } from "./supabase/browser";

/**
 * Legacy export so your old code (login, signup, achievements)
 * continues to work without refactoring.
 */
export const supabase = supabaseBrowser();
