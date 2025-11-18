"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export default function ProfilePage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUserEmail(user?.email || null);
    }

    loadUser();
  }, []);

  async function logout() {
    try {
      await supabase.auth.signOut();

      // Clear cookies manually to prevent ghost sessions
      document.cookie = "sb-access-token=; Max-Age=0; path=/;";
      document.cookie = "sb-refresh-token=; Max-Age=0; path=/;";

      router.push("/");
    } catch (err) {
      console.error("Logout error:", err.message);
    }
  }

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <section>
        <h2 className="text-xl font-semibold text-[#0D7A7E]">Profile</h2>
        <p className="text-gray-600 text-sm mt-1">
          Manage your account and settings.
        </p>
      </section>

      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <p className="text-gray-600 text-sm mb-1">Email</p>
        <p className="text-[#0D7A7E] font-medium">
          {userEmail || "loading…"}
        </p>
      </div>

      <button
        onClick={logout}
        className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
      >
        Log Out
      </button>

      <button
        onClick={() => router.push("/dashboard")}
        className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition"
      >
        Back to Dashboard
      </button>
    </motion.div>
  );
}
