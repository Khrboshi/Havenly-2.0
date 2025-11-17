"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export const dynamic = "force-dynamic";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function finish() {
      // Refresh session + force Supabase to write auth cookies
      await supabase.auth.getSession();

      // Short delay ensures cookies are written before redirect
      setTimeout(() => {
        router.replace("/dashboard");
      }, 100);
    }

    finish();
  }, [router]);

  return (
    <div className="w-full h-screen flex items-center justify-center text-gray-600">
      Completing sign in…
    </div>
  );
}
