"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabase } from "@/lib/supabase/browser";

const supabase = createBrowserSupabase();

export default function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;

        if (!isMounted) return;
        setUser(data?.user ?? null);
      } catch (e) {
        console.error("useUser error:", e);
        if (!isMounted) return;
        setUser(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();

    // Optional: keep user state in sync with auth changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!isMounted) return;
        setUser(session?.user ?? null);
      }
    );

    return () => {
      isMounted = false;
      subscription?.subscription?.unsubscribe?.();
    };
  }, []);

  return { user, loading };
}
