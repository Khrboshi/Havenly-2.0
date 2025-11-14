"use client";

import { useState } from "react";

export default function ReflectPage() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendReflection = async () => {
    if (!text.trim()) return;
    setLoading(true);

    const res = await fetch("/api/insights", {
      method: "POST",
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setResponse(data.summary || "Something went wrong.");
    setLoading(false);
  };

  return (
    <main className="p-6 pb-28">
      <h1 className="text-2xl font-semibold mb-4">Reflect</h1>

      <textarea
        className="w-full h-40 p-4 border rounded-xl bg-white shadow text-slate-700"
        placeholder="Write your thoughts…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={sendReflection}
        className="btn-primary mt-4"
        disabled={loading}
      >
        {loading ? "Thinking…" : "Get Insight"}
      </button>

      {response && (
        <div className="mt-6 p-4 bg-slate-50 border rounded-xl text-slate-700">
          {response}
        </div>
      )}
    </main>
  );
}
