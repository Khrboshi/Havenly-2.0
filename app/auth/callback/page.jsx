"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function finalizeAuth() {
      try {
        const supabase = supabaseBrowser();
        // This will read tokens from URL (if present) and sync cookies
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          // No session – go to login
          router.replace("/auth/login");
          return;
        }

        router.replace("/dashboard");
      } catch (err) {
        console.error("Auth callback error:", err);
        router.replace("/auth/login");
      }
    }

    finalizeAuth();
  }, [router]);

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <p className="text-sm text-slate-600">Completing sign-in…</p>
    </main>
  );
}
