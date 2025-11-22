// app/api/insights/route.js
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getUserStats } from "@/modules/data/stats";
import { getMoodTrend } from "@/modules/ai/actions";

export async function GET() {
  const stats = await getUserStats();
  const aiTrend = await getMoodTrend();

  return NextResponse.json({
    stats,
    forecast: aiTrend?.forecast ?? null,
  });
}
