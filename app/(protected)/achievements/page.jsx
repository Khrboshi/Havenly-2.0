export const dynamic = "force-dynamic";

import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AchievementsPage() {
  const supabase = await createServerSupabase();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.user) redirect("/auth/login");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#0D7A7E]">Achievements</h1>

      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <p className="text-sm text-gray-600">Your milestones will appear here.</p>
      </div>
    </div>
  );
}
