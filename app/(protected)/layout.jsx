import { supabaseServer } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({ children }) {
  // Get Supabase client
  const supabase = await supabaseServer();

  // Load session on the server
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If no session → redirect to login
  if (!session) {
    redirect("/auth/login");
  }

  // If user is authenticated → render protected content
  return (
    <div className="min-h-screen w-full">
      {children}
    </div>
  );
}
