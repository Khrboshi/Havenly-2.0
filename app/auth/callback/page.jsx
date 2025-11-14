"use client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function handleSignIn() {
      // Let Supabase parse the URL hash automatically
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Supabase callback error:", error);
        router.replace("/auth/login");
        return;
      }

      // Successful session
      router.replace("/dashboard");
    }

    handleSignIn();
  }, [router]);

  return (
    <div className="w-full h-screen flex items-center justify-center text-gray-600">
      Completing sign-in...
    </div>
  );
}
