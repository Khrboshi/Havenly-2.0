"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <main className="p-6 pt-10 flex flex-col items-center text-center">
      
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-semibold text-[#0D7A7E] mb-4"
      >
        Havenly
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-slate-600 max-w-md leading-relaxed mb-8"
      >
        A gentle space to reflect, understand your emotions, 
        and build daily clarity — at your own pace.
      </motion.p>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Link href="/auth/signup" className="py-3 rounded-xl bg-[#0D7A7E] text-white font-medium">
          Create Account
        </Link>
        <Link href="/auth/login" className="py-3 rounded-xl bg-white border text-[#0D7A7E] font-medium">
          Log In
        </Link>
        <Link href="/about" className="text-slate-500 text-sm mt-2">
          Learn more about Havenly →
        </Link>
      </div>
    </main>
  );
}
