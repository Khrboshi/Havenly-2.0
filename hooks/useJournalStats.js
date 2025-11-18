"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function useJournalStats() {
  const [journalCount, setJournalCount] = useState(0);
  const [reflectionCount, setReflectionCount] = useState(0);

  useEffect(() => {
    async function load() {
      const { count: jCount } = await supabase
        .from("journal")
        .select("*", { count: "exact", head: true });

      const { count: rCount } = await supabase
        .from("reflections")
        .select("*", { count: "exact", head: true });

      setJournalCount(jCount || 0);
      setReflectionCount(rCount || 0);
    }

    load();
  }, []);

  return { journalCount, reflectionCount };
}
