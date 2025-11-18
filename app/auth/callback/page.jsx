"use client";

import { useEffect } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function AuthCallback() {
  const supabase = supabaseBrowser();

  useEffect(() => {
    async function handleCallback() {
      await supabase.auth.getSession();
      window.location.href = "/dashboard";
    }
    handleCallback();
  }, [supabase]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      Completing login…
    </div>
  );
}
