export const dynamic = "force-dynamic";

import { createServerSupabase } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = await createServerSupabase();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  return (
    <div>
      <h1 className="text-2xl font-bold text-teal-700 mb-4">Profile</h1>
      <p className="text-gray-600">Manage your account settings.</p>

      <div className="mt-6 p-4 bg-white border shadow rounded-lg">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
    </div>
  );
}
