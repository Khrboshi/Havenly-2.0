export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";

export default async function JournalPage() {
  const supabase = await createServerSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) redirect("/auth/login");

  const { data: entries } = await supabase
    .from("journal")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-brand-dark">My Journal</h1>

      {entries?.map(entry => (
        <div key={entry.id} className="p-4 bg-white border rounded-xl shadow-sm">
          <p className="text-sm text-gray-600">{entry.content}</p>
        </div>
      ))}
    </div>
  );
}
