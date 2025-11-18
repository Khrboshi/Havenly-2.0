"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { loginWithPasskey } from "@/lib/webauthn";

export default function LoginPage() {
  const supabase = supabaseBrowser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleEmailLogin(e) {
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

  async function handlePasskey() {
    try {
      setLoading(true);
      await loginWithPasskey(email);
      toast.success("Logged in with FaceID / TouchID");
      window.location.href = "/dashboard";
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-semibold mb-6">Log in</h1>

      <form
        onSubmit={handleEmailLogin}
        className="w-full max-w-sm flex flex-col gap-4"
      >
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
          disabled={loading || !email}
          className="bg-teal-700 text-white py-3 rounded-xl disabled:opacity-50"
        >
          {loading ? "Processing…" : "Login with FaceID / TouchID"}
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
import { loginWithPasskey } from "@/lib/webauthn";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  async function handlePasskey() {
    try {
      const result = await loginWithPasskey(email);

      if (result.success) {
        toast.success("Logged in with FaceID / TouchID");
        window.location.href = "/dashboard";
      } else {
        toast.error(result.error || "Failed to login");
      }
    } catch (err) {
      toast.error("Biometric login failed. Try manual login.");
    }
  }

  return (
    <div className="p-6">
      {/* Email input */}
      <input
        className="w-full border p-3 rounded mb-3"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Normal login button here... */}

      <button
        onClick={handlePasskey}
        className="w-full bg-teal-600 text-white p-3 rounded mt-4"
      >
        Login with FaceID / TouchID
      </button>
    </div>
  );
}
