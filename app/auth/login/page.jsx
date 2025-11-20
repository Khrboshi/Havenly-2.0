"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      setLoading(false);
      return;
    }

    const supabase = supabaseBrowser();

    // 1) Try to sign in
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("LOGIN ERROR →", error);
      setErrorMsg(error.message || "Unable to log in. Please try again.");
      setLoading(false);
      return;
    }

    // 2) Ensure session is established and cookies synced
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setErrorMsg("Login failed: no active session. Please try again.");
      setLoading(false);
      return;
    }

    // 3) Redirect to dashboard (middleware will verify session)
    router.replace("/dashboard");
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-6 bg-white border rounded-xl shadow-sm">
        <h1 className="text-2xl font-semibold text-[#0D7A7E] mb-2">
          Welcome back
        </h1>
        <p className="text-sm text-slate-600 mb-6">
          Log in to continue your reflections and mood tracking.
        </p>

        {errorMsg && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
            {errorMsg}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
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
              autoComplete="current-password"
              className="w-full mt-1 p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D7A7E]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 bg-[#0D7A7E] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg"
          >
            {loading ? "Logging in…" : "Log In"}
          </button>
        </form>

        <p className="mt-4 text-xs text-slate-500 text-center">
          New to Havenly?{" "}
          <a href="/auth/signup" className="text-[#0D7A7E] underline">
            Create an account
          </a>
        </p>
      </div>
    </main>
  );
}
