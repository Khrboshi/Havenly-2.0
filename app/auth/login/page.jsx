"use client";

import { useState } from "react";
import { loginAction } from "./actions";

export default function LoginPage() {
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7FBFA] px-6">
      <form
        action={async (formData) => {
          const result = await loginAction(formData);

          if (result?.error) {
            setError(result.error);
          }
        }}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-teal-700 mb-6">Log In</h1>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <label className="block mb-4">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            name="email"
            required
            className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-600 outline-none"
            placeholder="you@example.com"
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            name="password"
            required
            className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-600 outline-none"
            placeholder="••••••••"
          />
        </label>

        <button
          type="submit"
          className="w-full py-3 bg-teal-700 text-white rounded-lg font-medium hover:bg-teal-800 transition"
        >
          Log In
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <a
            href="/auth/signup"
            className="text-teal-700 font-medium hover:underline"
          >
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
