"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { LogOut, Settings, Trash2, User } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    reflections: 0,
    moods: 0,
    streak: 0,
  });

  useEffect(() => {
    async function loadUser() {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        window.location.href = "/auth/login";
        return;
      }

      setUser(data.user);

      // Load stats from DB
      const reflections = await supabase
        .from("reflections")
        .select("*", { count: "exact", head: true })
        .eq("user_id", data.user.id);

      const moods = await supabase
        .from("moods")
        .select("*", { count: "exact", head: true })
        .eq("user_id", data.user.id);

      const streakData = await supabase
        .from("streaks")
        .select("*")
        .eq("user_id", data.user.id)
        .single();

      setStats({
        reflections: reflections.count || 0,
        moods: moods.count || 0,
        streak: streakData?.current_streak || 0,
      });
    }

    loadUser();
  }, []);

  if (!user) return <p className="p-6">Loading...</p>;

  return (
    <main className="p-6 pb-24">
      {/* Animated Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <motion.div
          initial={{ scale: 0.7 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-teal-700 flex items-center justify-center shadow-lg"
        >
          <User size={50} className="text-white" />
        </motion.div>

        <h1 className="text-3xl font-bold mt-4">Your Profile</h1>
        <p className="text-slate-500 mt-1">{user.email}</p>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-3 gap-3 mb-8"
      >
        <ProfileStat label="Reflections" value={stats.reflections} />
        <ProfileStat label="Mood Logs" value={stats.moods} />
        <ProfileStat label="Streak" value={stats.streak} />
      </motion.div>

      {/* Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-3"
      >
        <ActionButton
          icon={<Settings size={20} />}
          label="Account Settings"
          onClick={() => alert("Coming soon!")}
        />

        <ActionButton
          icon={<LogOut size={20} />}
          label="Log Out"
          danger={false}
          onClick={async () => {
            await supabase.auth.signOut();
            window.location.href = "/";
          }}
        />

        <ActionButton
          icon={<Trash2 size={20} />}
          label="Delete Account"
          danger={true}
          onClick={() => alert("Feature coming soon.")}
        />
      </motion.div>
    </main>
  );
}

/* --- Components --- */

function ProfileStat({ label, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      className="bg-white rounded-xl shadow-sm p-3 text-center"
    >
      <p className="text-xl font-bold text-teal-600">{value}</p>
      <p className="text-xs text-slate-500 mt-1">{label}</p>
    </motion.div>
  );
}

function ActionButton({ icon, label, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center p-4 rounded-xl shadow-sm bg-white 
        ${danger ? "text-red-600" : "text-slate-700"} 
        hover:bg-slate-50 active:scale-[0.98] transition`}
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
