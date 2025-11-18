"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    // Success → force navigation to dashboard
    router.push("/dashboard");
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white border rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold text-[#0D7A7E] mb-4">Log In</h2>

      {errorMsg && <p className="text-red-600 mb-4">{errorMsg}</p>}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full mt-1 p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            name="password"
            required
            className="w-full mt-1 p-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-[#0D7A7E] text-white rounded-lg"
        >
          {loading ? "Logging in…" : "Log In"}
        </button>
      </form>
    </div>
  );
}
