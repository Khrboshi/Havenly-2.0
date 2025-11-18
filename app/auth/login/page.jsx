"use client";

import { useState } from "react";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { loginWithPasskey } from "@/lib/webauthn";
import { toast } from "sonner";

export default function LoginPage() {
  const supabase = supabaseBrowser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingPasskey, setLoadingPasskey] = useState(false);

  // ----------------------------------
  // Standard email/password login
  // ----------------------------------
  async function handleLogin(e) {
    e.preventDefault();
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    window.location.href = "/auth/callback";
  }

  // ----------------------------------
  // FaceID / TouchID Login
  // ----------------------------------
  async function handlePasskey() {
    try {
      setLoadingPasskey(true);
      await loginWithPasskey();
      toast.success("Logged in with FaceID / TouchID");
      window.location.href = "/dashboard";
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoadingPasskey(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-semibold mb-6">Log in</h1>

      <form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col gap-4">

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
          Log in
        </button>

        <button
          type="button"
          onClick={handlePasskey}
          disabled={loadingPasskey}
          className="w-full py-3 bg-[#0D7A7E] text-white rounded-xl mt-2"
        >
          {loadingPasskey ? "Processing…" : "Login with FaceID / TouchID"}
        </button>

        <Link href="/auth/signup" className="text-slate-500 text-sm mt-3">
          Create an account
        </Link>

      </form>
    </main>
  );
}
