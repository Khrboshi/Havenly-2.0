"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    // Manual redirect after successful signup
    if (data.user) {
      router.push("/dashboard");
    } else {
      // In email-confirmation mode
      router.push("/auth/login?checkEmail=true");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold text-[#0D7A7E] mb-4">Create Account</h2>

      {errorMsg && (
        <p className="text-red-600 text-sm mb-4">{errorMsg}</p>
      )}

      <form onSubmit={handleSignup} className="space-y-4">
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
          {loading ? "Creating account…" : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
