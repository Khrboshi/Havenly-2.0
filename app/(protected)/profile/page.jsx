"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserProfile, logoutUser } from "@/modules/profile/services";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function load() {
      const u = await getUserProfile();
      setUser(u);
    }
    load();
  }, []);

  async function logout() {
    const ok = await logoutUser();
    if (ok) router.push("/auth/login");
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

      <div className="bg-white border rounded-lg p-4 shadow-sm">
        <p className="text-gray-600 text-sm mb-1">Email</p>
        <p className="text-[#0D7A7E] font-medium">{user?.email ?? "Loading…"}</p>
      </div>

      <button
        onClick={logout}
        className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Log Out
      </button>
    </motion.div>
  );
}
