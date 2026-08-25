import "server-only";

import { timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";

export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function expectedPipelineToken(): string | undefined {
  return (
    process.env.PIPELINE_API_TOKEN?.trim() ||
    process.env.KNOWLEDGE_ADMIN_TOKEN?.trim() ||
    undefined
  );
}

export function validatePipelineToken(token: unknown): boolean {
  const expected = expectedPipelineToken();
  if (!expected || typeof token !== "string" || token.length === 0) {
    return false;
  }

  const actual = Buffer.from(token);
  const wanted = Buffer.from(expected);
  if (actual.length !== wanted.length) return false;
  return timingSafeEqual(actual, wanted);
}

export function getPipelineToken(request: Request): string | null {
  const auth = request.headers.get("authorization");
  if (auth && auth.slice(0, 7).toLowerCase() === "bearer ") {
    const token = auth.slice(7).trim();
    return token.length > 0 ? token : null;
  }
  return null;
}
