export const dynamic = "force-dynamic";

import { createServerSupabase } from "@/lib/supabase/server";

export default async function AchievementsPage() {
  const supabase = await createServerSupabase();
  await supabase.auth.getSession();

  return (
    <div>
      <h1 className="text-2xl font-bold text-teal-700 mb-4">
        Achievements
      </h1>
      <p className="text-gray-600">Your milestones and progress.</p>
    </div>
  );
}
