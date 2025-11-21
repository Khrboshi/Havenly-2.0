export const dynamic = "force-dynamic";

import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function MoodPage() {
  const supabase = await createServerSupabase();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.user) redirect("/auth/login");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#0D7A7E]">Track Your Mood</h1>
      <p className="text-gray-600 text-sm">
        How are you feeling right now?
      </p>

      <div className="flex gap-4">
        {["😞", "😐", "🙂", "😊", "🤩"].map((mood, i) => (
          <button
            key={i}
            className="text-4xl bg-white p-4 rounded-xl shadow-sm hover:scale-105 transition"
          >
            {mood}
          </button>
        ))}
      </div>
    </div>
  );
}
