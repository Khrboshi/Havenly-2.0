"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = false;

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function finish() {
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
