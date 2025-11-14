"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import BottomNav from "../../components/BottomNav";

export default function ProtectedLayout({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getSession();
      const session = data?.session;

      if (!session) {
        router.replace("/auth/login");
      } else {
        setChecking(false);
      }
    }

    checkUser();
  }, [router]);

  if (checking) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-600">
        Loading…
      </div>
    );
  }

  return (
    <div className="pb-20"> 
      {children}
      <BottomNav />
    </div>
  );
}
