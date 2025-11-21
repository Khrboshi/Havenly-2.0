export const dynamic = "force-dynamic";

import { createServerSupabase } from "@/lib/supabase/server";

export default async function JournalPage() {
  const supabase = await createServerSupabase();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  return (
    <div>
      <h1 className="text-2xl font-bold text-teal-700 mb-4">Daily Journal</h1>
      <p className="text-gray-600 mb-6">
        Write and reflect on your thoughts.
      </p>
      {/* Placeholder for journal input UI */}
    </div>
  );
}
