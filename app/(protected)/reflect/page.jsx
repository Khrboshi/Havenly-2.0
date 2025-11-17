"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabase";

export const dynamic = "force-dynamic";

export default function ReflectPage() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendReflection = async () => {
    if (!text.trim()) return;

    setLoading(true);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      window.location.href = "/auth/login";
      return;
    }

    const res = await fetch("/api/insights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setResponse(data.summary || "Something went wrong.");
    setLoading(false);
  };

  return (
    <main className="p-6 pb-28">
      <h1 className="text-2xl font-semibold mb-4">Daily Reflection</h1>

      <textarea
        className="w-full border rounded-xl p-4 h-40"
        placeholder="Write your reflection…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={sendReflection}
        className="btn-primary mt-4"
        disabled={loading}
      >
        {loading ? "Processing..." : "Submit Reflection"}
      </button>

      {response && (
        <div className="mt-6 p-4 bg-white border rounded-xl shadow">
          <h2 className="font-medium mb-2">AI Insight</h2>
          <p className="text-slate-700">{response}</p>
        </div>
      )}
    </main>
  );
}
