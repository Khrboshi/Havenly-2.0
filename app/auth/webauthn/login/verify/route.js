import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(request) {
  const body = await request.json();
  const supabase = await supabaseServer();

  const { data, error } = await supabase.auth.webauthn.verifyAuthentication(
    body
  );

  if (error) {
    console.error("WebAuthn verifyAuthentication error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Session is persisted via cookies by Supabase
  return NextResponse.json({ success: true, data });
}
