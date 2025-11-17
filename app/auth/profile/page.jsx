"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        window.location.href = "/auth/login";
      } else {
        setUser(data.user);
      }
    }
    loadUser();
  }, []);

  if (!user) return <p className="p-6">Loading...</p>;

  return (
    <main className="p-6 pb-24">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <p className="font-semibold">{user.email}</p>
      </div>

      <button
        className="bg-red-500 text-white px-4 py-2 rounded-xl"
        onClick={async () => {
          await supabase.auth.signOut();
          window.location.href = "/";
        }}
      >
        Log out
      </button>
    </main>
  );
}
