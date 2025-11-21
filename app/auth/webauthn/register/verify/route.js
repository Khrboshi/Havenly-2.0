import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(request) {
  const body = await request.json();
  const supabase = await supabaseServer();

  const { data, error } = await supabase.auth.webauthn.verifyRegistration(
    body
  );

  if (error) {
    console.error("WebAuthn verifyRegistration error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, data });
}
