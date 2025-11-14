"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    async function handleCallback() {

      // Let Supabase read the URL hash and create a session
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Auth error:", error);
        router.push("/auth/login");
        return;
      }

      // User is authenticated → go to dashboard
      router.push("/dashboard");
    }

    handleCallback();
  }, [router]);

  return (
    <div className="w-full h-screen flex items-center justify-center text-gray-600">
      Finishing sign-in...
    </div>
  );
}
