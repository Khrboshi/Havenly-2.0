"use client";

export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function finish() {
      const { data, error } = await supabase.auth.getSession();
      if (error) return router.replace("/auth/login");
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
