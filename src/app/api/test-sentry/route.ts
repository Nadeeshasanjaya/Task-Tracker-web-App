import { NextResponse } from "next/server";

export async function GET() {
  throw new Error("Test error for Sentry integration");
  return NextResponse.json({ ok: true });
}