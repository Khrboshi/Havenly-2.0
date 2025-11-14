"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "../../lib/session";
import BottomNav from "../../components/BottomNav";

export default function ProtectedLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const user = await getCurrentUser();
      if (!user) {
        router.push("/auth/login");
      } else {
        setLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="pb-20">
      {children}
      <BottomNav />
    </div>
  );
}
