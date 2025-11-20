"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  async function handleLogin(e) {
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

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message || "Login failed.");
      setLoading(false);
      return;
    }

    const { data } = await supabase.auth.getSession();
    if (!data?.session) {
      setErrorMsg("Login failed: no session.");
      setLoading(false);
      return;
    }

    router.replace("/dashboard");
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-6 bg-white border rounded-xl shadow-sm">
        <h1 className="text-2xl font-semibold text-[#0D7A7E] mb-2">Welcome Back</h1>

        {errorMsg && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
            {errorMsg}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
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
              className="w-full p-2.5 border rounded-lg focus:ring-[#0D7A7E]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#0D7A7E] text-white rounded-lg disabled:bg-gray-400"
          >
            {loading ? "Logging in…" : "Log In"}
          </button>
        </form>

        <p className="mt-4 text-xs text-center">
          New here?{" "}
          <a href="/auth/signup" className="text-[#0D7A7E] underline">
            Create an account
          </a>
        </p>
      </div>
    </main>
  );
}
