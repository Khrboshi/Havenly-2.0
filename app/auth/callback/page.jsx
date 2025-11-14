"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    async function handleCallback() {
      // Pass full callback URL to Supabase
      const code = searchParams.get("code");
      if (!code) {
        router.push("/auth/login");
        return;
      }

      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Auth error:", error);
        router.push("/auth/login");
        return;
      }

      // Success → redirect user
      router.push("/dashboard");
    }

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="w-full h-screen flex items-center justify-center text-gray-600">
      Completing sign-in...
    </div>
  );
}
