"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

// Dynamic — prevents prerendering on Vercel
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function finish() {
      // Read session from URL hash
      await supabase.auth.getSession();

      // Redirect to dashboard
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
