"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    async function handleAuth() {
      // Parse the access token from the URL hash (#...)
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Callback Error:", error);
        router.push("/auth/login");
        return;
      }

      // User is authenticated → redirect
      router.push("/dashboard");
    }

    handleAuth();
  }, [router]);

  return (
    <div className="w-full h-screen flex items-center justify-center text-gray-600">
      Completing sign in...
    </div>
  );
}
