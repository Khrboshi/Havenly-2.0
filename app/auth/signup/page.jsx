"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setStatusMsg("");
    setErrorMsg("");

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

    setStatusMsg("Account created! Please check your email to confirm.");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-semibold mb-6">Join Havenly</h1>

      <form onSubmit={handleSignup} className="w-full max-w-sm flex flex-col gap-4">

        {errorMsg && (
          <p className="text-red-600 text-sm">{errorMsg}</p>
        )}

        {statusMsg && (
          <p className="text-green-600 text-sm">{statusMsg}</p>
        )}

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
          Create Account
        </button>

        <Link href="/auth/login" className="text-slate-500 text-sm">
          Already have an account? Log in
        </Link>
      </form>
    </main>
  );
}
toast.success("Account created!");
window.location.href = "/auth/passkey";
