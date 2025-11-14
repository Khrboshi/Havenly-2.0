export const dynamic = "force-dynamic";
import { supabase } from "../../../lib/supabase";

export default async function InsightsPage() {
  const session = await supabase.auth.getSession();
  const user = session.data.session?.user;

  if (!user) return <p className="p-6">Please log in.</p>;

  const { data } = await supabase
    .from("reflections")
    .select("summary, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <main className="p-6 pb-28">
      <h1 className="text-2xl font-semibold mb-4">Insights</h1>

      <div className="grid gap-4">
        {data?.map((item, idx) => (
          <div
            key={idx}
            className="p-4 bg-white border rounded-xl shadow"
          >
            <p className="text-slate-700">{item.summary}</p>
            <p className="text-xs text-slate-500 mt-1">
              {new Date(item.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
