// app/(protected)/profile/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserProfile, logoutUser } from "@/modules/profile/services";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const u = await getUserProfile();
        setUser(u);
      } finally {
        setLoadingUser(false);
      }
    }
    load();
  }, []);

  async function logout() {
    if (loggingOut) return;

    setLoggingOut(true);
    const ok = await logoutUser();

    if (ok) {
      router.push("/auth/login");
    } else {
      setLoggingOut(false);
      alert("Could not log out. Please try again.");
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
          View your account details and manage your session.
        </p>
      </section>

      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <p className="text-gray-600 text-sm mb-1">Email</p>
        <p className="text-[#0D7A7E] font-medium">
          {loadingUser ? "Loading…" : user?.email ?? "Unknown"}
        </p>
      </div>

      <button
        onClick={logout}
        disabled={loggingOut}
        className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition disabled:bg-red-300"
      >
        {loggingOut ? "Logging out…" : "Log out"}
      </button>

      <button
        onClick={() => router.push("/dashboard")}
        className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition"
      >
        Back to dashboard
      </button>
    </motion.div>
  );
}
