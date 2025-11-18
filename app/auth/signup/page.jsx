"use client";

import { useState } from "react";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function SignupPage() {
  const supabase = supabaseBrowser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSignup(e) {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    alert("Check your email for confirmation link");
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-semibold mb-6">Create Account</h1>

      <form onSubmit={handleSignup} className="w-full max-w-sm flex flex-col gap-4">

        {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

        <input
          type="email"
          placeholder="Email"
          className="border px-4 py-3 rounded-xl w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border px-4 py-3 rounded-xl w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="bg-black text-white py-3 rounded-xl">
          Sign up
        </button>

        <Link href="/auth/login" className="text-slate-500 text-sm mt-3">
          Already have an account?
        </Link>

      </form>
    </main>
  );
}
