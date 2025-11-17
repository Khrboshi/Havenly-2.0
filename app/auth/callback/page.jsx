"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function finish() {
      await supabase.auth.getSession();

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
