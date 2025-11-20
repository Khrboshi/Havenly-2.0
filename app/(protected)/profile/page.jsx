import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/session";
import { createServerSupabase } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const session = await getServerSession();
  const supabase = createServerSupabase();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const user = session.user;

  async function logout() {
    "use server";
    const supabase = createServerSupabase();
    await supabase.auth.signOut();
    redirect("/auth/login");
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <section>
        <h1 className="text-2xl font-bold text-[#0D7A7E]">My Profile</h1>
        <p className="text-sm text-gray-600 mt-1">
          Manage your account and preferences.
        </p>
      </section>

      {/* User Info Card */}
      <section className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
        <div>
          <p className="text-xs uppercase text-gray-500 mb-1">Email</p>
          <p className="text-sm font-medium text-gray-700">{user.email}</p>
        </div>

        <div>
          <p className="text-xs uppercase text-gray-500 mb-1">User ID</p>
          <p className="text-xs text-gray-500">{user.id}</p>
        </div>
      </section>

      {/* Account Actions */}
      <section className="space-y-3">
        <a
          href="/auth/passkey"
          className="block w-full py-3 text-center border border-[#0D7A7E] text-[#0D7A7E] rounded-xl font-medium hover:bg-[#E6F4F3] transition"
        >
          Enable FaceID / TouchID
        </a>

        <form action={logout}>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-xl font-medium hover:bg-red-700 transition"
          >
            Log Out
          </button>
        </form>
      </section>
    </div>
  );
}
