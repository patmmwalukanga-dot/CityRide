import { NextResponse, type NextRequest } from "next/server";
import { withLocaleHeader } from "@middleware/locale";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  return withLocaleHeader(request, response);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
