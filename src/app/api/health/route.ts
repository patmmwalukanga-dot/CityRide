import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "nextjs-project-template",
    timestamp: new Date().toISOString(),
  });
}
