import { NextResponse, type NextRequest } from "next/server";
import {
  getAdminToken,
  unauthorized,
  validateAdminToken,
} from "@/lib/admin/auth";
import { getClientIp, rateLimit } from "@/lib/rateLimit";
import { listEnquiries, updateEnquiry } from "@/lib/enquiries/store";
import type { EnquiryKind, EnquiryReviewStatus } from "@/lib/enquiries/types";

function guard(request: NextRequest, bodyToken?: unknown) {
  const ip = getClientIp(request);
  const limiter = rateLimit(`admin-enquiries:${ip}`, {
    maxRequests: 30,
    windowMs: 60_000,
  });
  if (!limiter.ok) {
    return NextResponse.json({ error: "Rate limited" }, { status: 429 });
  }

  const token = getAdminToken(request, bodyToken, { allowQuery: false });
  if (!validateAdminToken(token)) return unauthorized();
  return null;
}

export async function GET(request: NextRequest) {
  const blocked = guard(request);
  if (blocked) return blocked;

  try {
    const data = await listEnquiries();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Enquiry list failed:", error);
    return NextResponse.json(
      { error: "Failed to list" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as
    | {
        token?: unknown;
        id?: unknown;
        kind?: unknown;
        reviewStatus?: unknown;
        notes?: unknown;
        belowMoq?: unknown;
        plugAndPlayFit?: unknown;
      }
    | null;

  const blocked = guard(request, body?.token);
  if (blocked) return blocked;

  const id = typeof body?.id === "string" ? body.id : "";
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const kind = parseKind(body?.kind);
  const reviewStatus = parseReviewStatus(body?.reviewStatus);

  try {
    const entry = await updateEnquiry({
      id,
      kind,
      reviewStatus,
      notes: typeof body?.notes === "string" ? body.notes : undefined,
      belowMoq:
        body?.belowMoq === null
          ? null
          : typeof body?.belowMoq === "boolean"
            ? body.belowMoq
            : undefined,
      plugAndPlayFit:
        typeof body?.plugAndPlayFit === "boolean"
          ? body.plugAndPlayFit
          : undefined,
    });
    return NextResponse.json({ entry });
  } catch (error) {
    if (error instanceof Error && error.message === "Not found") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    console.error("Enquiry update failed:", error);
    return NextResponse.json(
      { error: "Failed to update" },
      { status: 500 }
    );
  }
}

function parseKind(value: unknown): EnquiryKind | undefined {
  if (
    value === "genuine" ||
    value === "spam" ||
    value === "supplier" ||
    value === "partnership" ||
    value === "other"
  ) {
    return value;
  }
  return undefined;
}

function parseReviewStatus(value: unknown): EnquiryReviewStatus | undefined {
  if (value === "new" || value === "reviewed" || value === "ignored") {
    return value;
  }
  return undefined;
}
