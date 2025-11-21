import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const supabase = await supabaseServer();

  const { data, error } = await supabase.auth.webauthn.createAuthentication({
    email,
  });

  if (error) {
    console.error("WebAuthn createAuthentication error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}
