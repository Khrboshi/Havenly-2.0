import { getServerSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";

/** Fetch reflections (journal entries) */
async function loadJournalEntries(userId) {
  const supabase = createServerSupabase();

  const { data, error } = await supabase
    .from("reflections")
    .select("id, question, answer, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Journal load error:", error);
    return [];
  }

  return data || [];
}

export default async function JournalPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const entries = await loadJournalEntries(session.user.id);

  return (
    <div className="space-y-8">

      {/* Header */}
      <section>
        <h1 className="text-2xl font-bold text-[#0D7A7E]">Journal</h1>
        <p className="text-sm text-gray-600 mt-1">
          Your recent reflections and insights.
        </p>
      </section>

      {/* New Entry Button */}
      <a
        href="/reflect"
        className="block w-full text-center py-3 bg-[#0D7A7E] text-white rounded-xl font-medium shadow-sm hover:bg-[#0B666A] transition"
      >
        Write a New Reflection
      </a>

      {/* Journal Entries */}
      <section className="space-y-4">
        {entries.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-10">
            No reflections yet. Start your first one above.
          </p>
        )}

        {entries.map((entry) => (
          <div
            key={entry.id}
            className="bg-white border rounded-xl p-4 shadow-sm"
          >
            <p className="text-xs text-gray-400 mb-2">
              {new Date(entry.created_at).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>

            {entry.question && (
              <p className="text-sm font-semibold text-gray-700 mb-1">
                {entry.question}
              </p>
            )}

            <p className="text-sm text-gray-600 whitespace-pre-line">
              {entry.answer}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
