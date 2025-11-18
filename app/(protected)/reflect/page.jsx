"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { toast } from "sonner";

export default function ReflectPage() {
  const supabase = supabaseBrowser();
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submitReflection = async () => {
    if (!text) return;
    setSubmitting(true);

    const res = await fetch("/api/insights", {
      method: "POST",
      body: JSON.stringify({ text }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Reflection saved.");
      setText("");
    } else {
      toast.error(data.error || "Something went wrong.");
    }

    setSubmitting(false);
  };

  return (
    <main className="p-6 pb-24">
      <h1 className="text-2xl font-bold mb-4">New Reflection</h1>

      <textarea
        className="w-full border p-4 rounded-xl min-h-[150px]"
        placeholder="Write your thoughts…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={submitReflection}
        disabled={submitting}
        className="mt-4 px-6 py-3 rounded-xl bg-black text-white disabled:opacity-50"
      >
        {submitting ? "Saving…" : "Save Reflection"}
      </button>
    </main>
  );
}
