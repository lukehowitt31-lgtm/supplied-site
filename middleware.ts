import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOST = "www.suppliedpackaging.com";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const { pathname, search } = request.nextUrl;

  const isNonCanonical =
    host.includes("supplied.agency") ||
    (host.includes("suppliedpackaging.com") && !host.startsWith("www."));

  if (isNonCanonical) {
    const destination = new URL(
      `https://${CANONICAL_HOST}${pathname}${search}`
    );
    return NextResponse.redirect(destination, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Run on all paths except Next.js internals and static assets.
     * _next/static, _next/image, favicon.ico, images/, etc.
     */
    "/((?!_next/static|_next/image|favicon\\.ico|images/|studio).*)",
  ],
};
