import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOST = "www.suppliedpackaging.com";

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://*.google-analytics.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io https://*.google-analytics.com https://*.googletagmanager.com",
  "font-src 'self'",
  "connect-src 'self' https://cdn.sanity.io https://*.sanity.io https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  "frame-src 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

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

  const response = NextResponse.next();

  if (!pathname.startsWith("/backstage")) {
    response.headers.set("Content-Security-Policy", CSP);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|images/).*)",
  ],
};
