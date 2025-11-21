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
          if (result?.error) setError(result.error);
          // No manual redirect here – server action handles it
        }}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-teal-700 mb-6">Log In</h1>

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <label className="block mb-3">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            name="email"
            required
            className="mt-1 w-full border rounded-lg px-3 py-2"
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            name="password"
            required
            className="mt-1 w-full border rounded-lg px-3 py-2"
          />
        </label>

        <button
          type="submit"
          className="w-full py-3 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
