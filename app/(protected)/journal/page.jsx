export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";

export default async function JournalPage() {
  const supabase = createServerSupabase();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const { data: reflections, error } = await supabase
    .from("reflections")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Load reflections error:", error);
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-[#0D7A7E]">My Journal</h1>
      {reflections?.map((entry) => (
        <div
          key={entry.id}
          className="p-4 bg-white border rounded-lg shadow-sm"
        >
          {/* Adjust fields depending on your DB schema */}
          {entry.question && (
            <p className="text-sm text-gray-600">{entry.question}</p>
          )}
          <p className="mt-2 text-gray-800">{entry.answer || entry.content}</p>
        </div>
      ))}
      {(!reflections || reflections.length === 0) && (
        <p className="text-sm text-gray-500">
          No journal entries yet. Start by reflecting today.
        </p>
      )}
    </div>
  );
}
