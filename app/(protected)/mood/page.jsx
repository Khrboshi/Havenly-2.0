export const dynamic = "force-dynamic";

import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function MoodPage() {
  const supabase = await createServerSupabase();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) redirect("/auth/login");

  async function saveMood(formData) {
    "use server";

    const supabase = await createServerSupabase();

    await supabase.from("mood_logs").insert({
      user_id: session.user.id,
      mood: formData.get("mood"),
    });
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#0D7A7E]">Mood Tracking</h1>
      <p className="text-gray-600 mb-4">Track how you're feeling today.</p>

      <form action={saveMood} className="space-y-4">
        <select
          name="mood"
          required
          className="p-3 border rounded-lg"
        >
          <option value="">Select your mood</option>
          <option value="happy">Happy</option>
          <option value="okay">Okay</option>
          <option value="sad">Sad</option>
          <option value="stressed">Stressed</option>
          <option value="grateful">Grateful</option>
        </select>

        <button className="px-6 py-3 bg-teal-700 text-white rounded-lg">
          Save Mood Log
        </button>
      </form>
    </div>
  );
}
