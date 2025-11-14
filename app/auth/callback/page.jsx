"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    async function completeAuth() {
      // Force Supabase to process hash (#access_token=...)
      if (window.location.hash.includes("access_token")) {
        supabase.auth.onAuthStateChange(() => {});
      }

      // Get session AFTER Supabase processes the hash
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Auth callback error:", error);
        router.push("/auth/login");
        return;
      }

      if (session) {
        router.push("/dashboard");
      } else {
        // Wait a bit and try again — needed on Vercel sometimes
        setTimeout(completeAuth, 300);
      }
    }

    completeAuth();
  }, [router]);

  return (
    <div className="w-full h-screen flex items-center justify-center text-gray-600">
      Completing sign in...
    </div>
  );
}
