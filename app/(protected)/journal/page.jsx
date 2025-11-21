export const dynamic = "force-dynamic";

import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function JournalPage() {
  const supabase = await createServerSupabase();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.user) redirect("/auth/login");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#0D7A7E]">Daily Journal</h1>
      <p className="text-gray-600 text-sm">
        Reflect on your thoughts for today.
      </p>

      <textarea
        className="w-full h-40 p-4 border rounded-xl focus:ring-2 focus:ring-teal-600 outline-none"
        placeholder="Write your thoughts..."
      ></textarea>

      <button className="px-6 py-3 bg-teal-700 text-white rounded-lg hover:bg-teal-800">
        Save Entry
      </button>
    </div>
  );
}
