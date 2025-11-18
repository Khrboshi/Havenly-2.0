"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageLoader from "@/components/PageLoader";

export default function ProtectedLayout({ children }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const token = document.cookie.includes("sb-access-token");

    if (!token) {
      router.push("/");
    } else {
      setAllowed(true);
    }
  }, [router]);

  if (!allowed) return <PageLoader />;

  return <>{children}</>;
}
