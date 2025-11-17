import { cookies } from "next/headers";
import { createServerClient } from "@supabase/auth-helpers-nextjs";

export const dynamic = "force-dynamic";

export default async function InsightsPage() {
  const cookieStore = cookies();

  // Server-side Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;
  if (!user) {
    return <p className="p-6">Please log in.</p>;
  }

  // Fetch reflections
  const { data } = await supabase
    .from("reflections")
    .select("summary, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <main className="p-6 pb-28">
      <h1 className="text-2xl font-semibold mb-4">Insights</h1>

      <div className="grid gap-4">
        {(!data || data.length === 0) && (
          <p className="text-gray-500">No insights yet.</p>
        )}

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
