"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const { data, error } = await supabase.auth.signInWithPassword({
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

    // Supabase will set the auth cookies AFTER callback
    window.location.href = "/auth/callback";
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

        <Link href="/auth/signup" className="text-slate-500 text-sm">
          Create an account
        </Link>
      </form>
    </main>
  );
}
"use client";
import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { loginWithPasskey } from "@/lib/webauthn";
import { toast } from "sonner";
import Link from "next/link";

export default function LoginPage() {
  const supabase = supabaseBrowser();
  const [loading, setLoading] = useState(false);

  async function handlePasskey() {
    try {
      setLoading(true);
      await loginWithPasskey();
      toast.success("Logged in with FaceID / TouchID");
      window.location.href = "/dashboard";
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-6 max-w-md mx-auto text-center space-y-6">
      <h1 className="text-3xl font-bold">Welcome Back</h1>

      {/* email/password UI stays the same */}

      <button
        onClick={handlePasskey}
        disabled={loading}
        className="w-full py-3 bg-black text-white rounded-xl mt-6"
      >
        {loading ? "Processing…" : "Login with FaceID / TouchID"}
      </button>

      <p className="text-sm text-slate-500 mt-4">
        New? <Link href="/auth/signup">Create account</Link>
      </p>
    </main>
  );
}
