"use client";

import { useState } from "react";
import { signUp } from "@/lib/auth";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      setStatusMsg("Please check your email to confirm your account.");
    } catch (err) {
      setStatusMsg(err.message);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-semibold mb-6">Join Havenly</h1>

      <form onSubmit={handleSignup} className="w-full max-w-sm flex flex-col gap-4">

        {statusMsg && (
          <p className="text-slate-600 text-sm">{statusMsg}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="input border px-4 py-3 rounded-xl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="input border px-4 py-3 rounded-xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn-primary">Create Account</button>

        <Link href="/auth/login" className="text-slate-500 text-sm">
          Already have an account? Log in
        </Link>
      </form>
    </main>
  );
}
