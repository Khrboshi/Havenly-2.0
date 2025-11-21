"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabase } from "@/lib/supabase/browser";

const supabase = createBrowserSupabase();

export default function useMoodHistory(limit = 30) {
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const { data, error } = await supabase
          .from("moods")
          .select("score, created_at")
          .order("created_at", { ascending: true })
          .limit(limit);

        if (error) throw error;

        if (!isMounted) return;
        setMoods(data || []);
      } catch (e) {
        console.error("useMoodHistory error:", e);
        if (!isMounted) return;
        setMoods([]);
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [limit]);

  return moods;
}
