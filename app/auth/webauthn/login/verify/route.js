import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(request) {
  const body = await request.json();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies }
  );

  const { data, error } = await supabase.auth.webauthn.verifyAuthentication(body);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // login success — cookies/session are now set
  return NextResponse.json({ success: true });
}
