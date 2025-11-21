export const dynamic = "force-dynamic";

import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function JournalPage() {
  const supabase = await createServerSupabase();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) redirect("/auth/login");

  async function saveJournal(formData) {
    "use server";

    const supabase = await createServerSupabase();
    const entry = formData.get("entry");

    await supabase.from("journal_entries").insert({
      user_id: session.user.id,
      entry,
    });
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#0D7A7E]">Daily Journal</h1>
      <p className="text-gray-600 mb-4">Write and reflect on your thoughts.</p>

      <form action={saveJournal} className="space-y-4">
        <textarea
          name="entry"
          className="w-full p-4 border rounded-lg"
          rows={8}
          placeholder="Write your thoughts..."
          required
        />

        <button className="px-6 py-3 bg-teal-700 text-white rounded-lg">
          Save Journal Entry
        </button>
      </form>
    </div>
  );
}
