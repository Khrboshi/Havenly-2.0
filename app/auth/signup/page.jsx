"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [infoMsg, setInfoMsg] = useState(null);

  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setInfoMsg(null);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (!email || !password) {
      setErrorMsg("Email and password are required.");
      setLoading(false);
      return;
    }

    const supabase = supabaseBrowser();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    if (data.session) {
      router.replace("/dashboard");
      return;
    }

    setInfoMsg("Account created. Please check your email to confirm.");
    setLoading(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-6 bg-white border rounded-xl shadow-sm">

        <h1 className="text-2xl font-semibold text-[#0D7A7E] mb-2">
          Create Account
        </h1>

        {errorMsg && (
          <p className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
            {errorMsg}
          </p>
        )}

        {infoMsg && (
          <p className="mb-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md p-2">
            {infoMsg}
          </p>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full p-2.5 border rounded-lg focus:ring-[#0D7A7E]"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              minLength={6}
              className="w-full p-2.5 border rounded-lg focus:ring-[#0D7A7E]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#0D7A7E] text-white rounded-lg disabled:bg-gray-400"
          >
            {loading ? "Creating…" : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-xs text-center">
          Already have an account?{" "}
          <a href="/auth/login" className="text-[#0D7A7E] underline">
            Log in
          </a>
        </p>

      </div>
    </main>
  );
}
