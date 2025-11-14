"use client";

import { supabase } from "../../../lib/supabase";

export default function ProfilePage() {
  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/auth/login";
  };

  return (
    <main className="p-6 pb-28">
      <h1 className="text-2xl font-semibold mb-4">Profile</h1>

      <div className="bg-white shadow border rounded-xl p-4">
        <p className="text-slate-700 mb-4">Logged in user</p>

        <button onClick={logout} className="btn-secondary">
          Log out
        </button>
      </div>
    </main>
  );
}
