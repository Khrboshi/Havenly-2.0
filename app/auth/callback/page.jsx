"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export const dynamic = "force-dynamic";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function processCallback() {
      // This exchanges the redirect code for a real session AND sets the cookies
      const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);

      if (error) {
        console.error("Callback error:", error);
      }

      router.replace("/dashboard");
    }

    processCallback();
  }, [router]);

  return (
    <div className="w-full h-screen flex items-center justify-center text-gray-600">
      Completing sign in…
    </div>
  );
}
