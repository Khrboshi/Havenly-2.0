export const dynamic = "force-dynamic";

import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function InsightsPage() {
  const supabase = await createServerSupabase();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) redirect("/auth/login");

  const { data: moods } = await supabase
    .from("mood_logs")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  const { data: journals } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#0D7A7E]">Insights</h1>
      <p className="text-gray-600">Visual summaries of your logs.</p>

      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Recent Mood Logs</h2>
        <ul className="space-y-2">
          {moods?.map((m) => (
            <li key={m.id} className="p-3 bg-white border rounded">
              {m.mood} – {new Date(m.created_at).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Recent Journal Entries</h2>
        <ul className="space-y-2">
          {journals?.map((j) => (
            <li key={j.id} className="p-3 bg-white border rounded">
              {j.entry} – {new Date(j.created_at).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
