"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export const dynamic = "force-dynamic";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function finish() {
      // Forces Supabase to refresh session:
      await supabase.auth.getSession();

      router.replace("/dashboard");
    }

    finish();
  }, [router]);

  return (
    <div className="w-full h-screen flex items-center justify-center text-gray-600">
      Completing sign in…
    </div>
  );
}
