"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

// Force dynamic route (fixes Vercel build errors)
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = false;

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function finish() {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Auth error:", error);
        router.replace("/auth/login");
        return;
      }

      router.replace("/dashboard");
    }

    finish();
  }, [router]);

  return (
    <div className="w-full h-screen flex items-center justify-center text-gray-600">
      Completing sign in...
    </div>
  );
}
