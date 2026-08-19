import "server-only";

import { timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";

export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export function validateAdminToken(token: unknown): boolean {
  const expected = process.env.KNOWLEDGE_ADMIN_TOKEN;
  if (!expected || typeof token !== "string" || token.length === 0) {
    return false;
  }

  const actual = Buffer.from(token);
  const wanted = Buffer.from(expected);
  if (actual.length !== wanted.length) return false;
  return timingSafeEqual(actual, wanted);
}

export function getAdminToken(
  request: Request,
  bodyToken?: unknown,
  options?: { allowQuery?: boolean }
): string | null {
  const auth = request.headers.get("authorization");
  if (auth && auth.slice(0, 7).toLowerCase() === "bearer ") {
    const token = auth.slice(7).trim();
    return token.length > 0 ? token : null;
  }

  if (options?.allowQuery !== false) {
    try {
      const url = new URL(request.url);
      const queryToken = url.searchParams.get("token");
      if (queryToken) return queryToken;
    } catch {
      // ignore malformed URLs
    }
  }

  if (typeof bodyToken === "string" && bodyToken.trim()) {
    return bodyToken.trim();
  }

  return null;
}
