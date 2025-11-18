"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function useMoodHistory(limit = 30) {
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("moods")
        .select("score, created_at")
        .order("created_at", { ascending: true })
        .limit(limit);

      setMoods(data || []);
    }

    load();
  }, [limit]);

  return moods;
}
