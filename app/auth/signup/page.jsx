"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setInfoMsg(null);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      setLoading(false);
      return;
    }

    const supabase = supabaseBrowser();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      // If email confirmation is enabled, this callback is used:
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/auth/callback`,
      },
    });

    if (error) {
      console.error("SIGNUP ERROR →", error);
      setErrorMsg(error.message || "Unable to create account. Please try again.");
      setLoading(false);
      return;
    }

    // If Supabase returns a session, user is logged in immediately.
    if (data.session) {
      router.replace("/dashboard");
      return;
    }

    // Otherwise, email confirmation is required.
    setInfoMsg(
      "Account created. Please check your email to confirm your address before logging in."
    );
    setLoading(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-6 bg-white border rounded-xl shadow-sm">
        <h1 className="text-2xl font-semibold text-[#0D7A7E] mb-2">
          Create your Havenly account
        </h1>
        <p className="text-sm text-slate-600 mb-6">
          A calm, private space for your thoughts, mood, and reflections.
        </p>

        {errorMsg && (
          <p className="mb-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
            {errorMsg}
          </p>
        )}

        {infoMsg && (
          <p className="mb-3 text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-md px-3 py-2">
            {infoMsg}
          </p>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className="w-full mt-1 p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D7A7E]"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              minLength={6}
              className="w-full mt-1 p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D7A7E]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 bg-[#0D7A7E] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg"
          >
            {loading ? "Creating account…" : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-xs text-slate-500 text-center">
          Already have an account?{" "}
          <a href="/auth/login" className="text-[#0D7A7E] underline">
            Log in
          </a>
        </p>
      </div>
    </main>
  );
}
