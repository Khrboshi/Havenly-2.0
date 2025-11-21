export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";

export default async function MoodPage() {
  const supabase = createServerSupabase();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0D7A7E]">Log Your Mood</h1>
      <p className="text-sm text-gray-600 mt-2">
        Tap a mood in the app UI to start building your trend.
      </p>
    </div>
  );
}
