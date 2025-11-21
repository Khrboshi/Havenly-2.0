export const dynamic = "force-dynamic";

import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function InsightsPage() {
  const supabase = await createServerSupabase();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.user) redirect("/auth/login");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#0D7A7E]">Your Insights</h1>
      <p className="text-sm text-gray-600">
        AI-powered trends based on your reflections and moods.
      </p>

      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <p className="text-gray-500 italic">Insights will appear here.</p>
      </div>
    </div>
  );
}
