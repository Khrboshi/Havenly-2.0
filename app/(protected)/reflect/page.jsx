"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function ReflectPage() {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submitReflection = async () => {
    if (!text.trim()) {
      toast.error("Reflection cannot be empty.");
      return;
    }

    setSubmitting(true);

    // 1️⃣ Get current user
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) {
      toast.error("You must be logged in.");
      setSubmitting(false);
      return;
    }

    // 2️⃣ Save reflection in `reflections` table
    const { error: reflectError } = await supabase
      .from("reflections")
      .insert({
        user_id: user.id,
        content: text
      });

    if (reflectError) {
      console.error("Reflection Save Error:", reflectError);
      toast.error("Failed to save reflection.");
      setSubmitting(false);
      return;
    }

    // 3️⃣ Generate AI insight
    const res = await fetch("/api/insights", {
      method: "POST",
      body: JSON.stringify({ text })
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("AI Error:", data.error);
      toast.error("Reflection saved but failed to generate insight.");
      setSubmitting(false);
      setText(""); // Still clear text
      return;
    }

    // 4️⃣ Success
    toast.success("Reflection and insight saved.");
    setText("");
    setSubmitting(false);
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daily Reflection</h1>

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
        {submitting ? "Processing…" : "Submit Reflection"}
      </button>
    </main>
  );
}
