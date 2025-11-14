export const dynamic = "force-dynamic";
import { supabase } from "../../../lib/supabase";

export default async function JournalPage() {
  const session = await supabase.auth.getSession();
  const user = session.data.session?.user;

  if (!user) return <p className="p-6">Please log in.</p>;

  const { data } = await supabase
    .from("reflections")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <main className="p-6 pb-28">
      <h1 className="text-2xl font-semibold mb-4">Journal</h1>

      {data?.length === 0 && (
        <p className="text-slate-500">No reflections yet.</p>
      )}

      <div className="grid gap-4">
        {data?.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-white border rounded-xl shadow"
          >
            <p className="text-slate-700 mb-2">{item.summary}</p>
            <p className="text-xs text-slate-500">
              {new Date(item.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
