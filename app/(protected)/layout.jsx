import { getServerSession } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({ children }) {
  // Get authenticated session on the server
  const session = await getServerSession();

  // If no session → redirect to login
  if (!session) {
    redirect("/auth/login");
  }

  // If user is authenticated → render protected content
  return <div className="min-h-screen w-full">{children}</div>;
}
