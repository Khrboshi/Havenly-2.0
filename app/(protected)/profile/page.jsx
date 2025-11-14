"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { getCurrentUser } from "../../../lib/session";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ username: "" });
  const [loading, setLoading] = useState(true);

  // Load user + profile
  useEffect(() => {
    async function load() {
      const u = await getCurrentUser();
      setUser(u);

      if (!u) return;

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", u.id)
        .single();

      if (data) setProfile({ username: data.username || "" });

      setLoading(false);
    }

    load();
  }, []);

  // Update profile in Supabase
  async function updateProfile() {
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        username: profile.username || null,
        updated_at: new Date(),
      });

    if (error) {
      alert("Failed to update profile.");
      return;
    }

    alert("Profile updated!");
  }

  // Logout
  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/auth/login";
  }

  if (loading) {
    return <div className="p-5 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-5 pb-24 space-y-6">
      <h1 className="text-2xl font-semibold">Your Profile</h1>

      {/* Email */}
      <div className="bg-white p-4 rounded-xl shadow">
        <p className="font-medium text-gray-700 mb-1">Email</p>
        <p className="text-sm text-gray-500">{user?.email}</p>
      </div>

      {/* Username */}
      <div className="bg-white p-4 rounded-xl shadow">
        <p className="font-medium text-gray-700 mb-2">Username</p>

        <input
          type="text"
          value={profile.username}
          onChange={(e) =>
            setProfile({ ...profile, username: e.target.value })
          }
          className="w-full border p-2 rounded"
          placeholder="Enter your username"
        />

        <button
          onClick={updateProfile}
          className="mt-3 bg-primary text-white w-full py-2 rounded"
        >
          Save
        </button>
      </div>

      {/* Logout */}
      <div className="bg-white p-4 rounded-xl shadow">
        <button
          onClick={logout}
          className="bg-red-500 text-white w-full py-2 rounded"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
