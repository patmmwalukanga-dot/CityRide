import type { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE } from "@constants/locales";

export function withLocaleHeader(request: NextRequest, response: NextResponse) {
  const locale = request.cookies.get("NEXT_LOCALE")?.value ?? DEFAULT_LOCALE;
  response.headers.set("x-app-locale", locale);
  return response;
}
