export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = await createServerSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) redirect("/auth/login");

  const user = session.user;

  async function logout() {
    "use server";
    const supabase = await createServerSupabase();
    await supabase.auth.signOut();
    redirect("/auth/login");
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-brand-dark">My Profile</h1>

      <section className="bg-white p-5 rounded-xl border shadow-sm space-y-4">
        <div>
          <p className="text-xs text-gray-500 uppercase mb-1">Email</p>
          <p className="text-sm font-medium">{user.email}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500 uppercase mb-1">User ID</p>
          <p className="text-xs text-gray-600">{user.id}</p>
        </div>
      </section>

      <form action={logout}>
        <button className="w-full bg-red-600 text-white py-3 rounded-xl">
          Log Out
        </button>
      </form>
    </div>
  );
}
