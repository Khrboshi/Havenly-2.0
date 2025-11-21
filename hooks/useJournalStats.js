"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabase } from "@/lib/supabase/browser";

const supabase = createBrowserSupabase();

export default function useJournalStats() {
  const [journalCount, setJournalCount] = useState(0);
  const [reflectionCount, setReflectionCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const { count: jCount, error: jError } = await supabase
          .from("journal")
          .select("*", { count: "exact", head: true });

        if (jError) throw jError;

        const { count: rCount, error: rError } = await supabase
          .from("reflections")
          .select("*", { count: "exact", head: true });

        if (rError) throw rError;

        if (!isMounted) return;

        setJournalCount(jCount || 0);
        setReflectionCount(rCount || 0);
      } catch (e) {
        console.error("useJournalStats error:", e);
        if (!isMounted) return;
        setJournalCount(0);
        setReflectionCount(0);
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  return { journalCount, reflectionCount };
}
