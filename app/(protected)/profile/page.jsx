"use client";

import { motion } from "framer-motion";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const supabase = supabaseBrowser();
  const router = useRouter();

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <main className="p-6 pb-24 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto w-28 h-28 rounded-full bg-gradient-to-br from-teal-400 to-teal-700 flex items-center justify-center text-white text-4xl font-semibold shadow-lg"
      >
        😊
      </motion.div>

      <h1 className="text-2xl font-bold mt-6 text-[#0D7A7E]">Your Profile</h1>

      <button
        onClick={logout}
        className="mt-6 px-6 py-3 bg-red-500 text-white rounded-xl"
      >
        Log Out
      </button>
    </main>
  );
}
