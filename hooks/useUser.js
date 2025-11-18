"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user || null);
    }

    load();
  }, []);

  return user;
}
