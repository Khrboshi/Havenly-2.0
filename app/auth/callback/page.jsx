"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function run() {
      try {
        const supabase = supabaseBrowser();
        await supabase.auth.getSession();
        router.replace("/dashboard");
      } catch {
        router.replace("/auth/login");
      }
    }
    run();
  }, [router]);

  return (
    <main className="h-screen w-full flex items-center justify-center">
      <p className="text-sm text-slate-600">Completing sign-in…</p>
    </main>
  );
}
