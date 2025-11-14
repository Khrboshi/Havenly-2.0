"use client";

import { useState } from "react";
import { signIn } from "../../../lib/auth";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      window.location.href = "/reflect"; // Redirect after login
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-semibold mb-6">Log in</h1>

      <form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col gap-4">
        
        {errorMsg && (
          <p className="text-red-600 text-sm">{errorMsg}</p>
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

        <button className="btn-primary">Log in</button>

        <Link href="/auth/signup" className="text-slate-500 text-sm">
          Create an account
        </Link>
      </form>
    </main>
  );
}
