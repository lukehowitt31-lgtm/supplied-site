/**
 * Pipeline pull API for contact-form enquiries.
 *
 * GET /api/pipeline/enquiries
 *   Authorization: Bearer <PIPELINE_API_TOKEN>
 *   Query: since, source, kind, reviewStatus, module, limit
 *
 * Env:
 *   PIPELINE_API_TOKEN          — dedicated token (falls back to KNOWLEDGE_ADMIN_TOKEN)
 *   PIPELINE_WEBHOOK_URL        — optional POST destination on each new enquiry
 *   PIPELINE_WEBHOOK_SECRET     — HMAC secret for X-Supplied-Signature
 */
import { NextResponse, type NextRequest } from "next/server";
import {
  getPipelineToken,
  unauthorized,
  validatePipelineToken,
} from "@/lib/pipeline/auth";
import { getClientIp, rateLimit } from "@/lib/rateLimit";
import {
  parsePipelineModule,
  toPipelinePayload,
} from "@/lib/enquiries/pipeline";
import { listPipelineEnquiries } from "@/lib/enquiries/store";
import type { EnquiryKind, EnquirySource, EnquiryReviewStatus } from "@/lib/enquiries/types";

function guard(request: NextRequest) {
  const ip = getClientIp(request);
  const limiter = rateLimit(`pipeline-enquiries:${ip}`, {
    maxRequests: 60,
    windowMs: 60_000,
  });
  if (!limiter.ok) {
    return NextResponse.json({ error: "Rate limited" }, { status: 429 });
  }

  const token = getPipelineToken(request);
  if (!validatePipelineToken(token)) return unauthorized();
  return null;
}

export async function GET(request: NextRequest) {
  const blocked = guard(request);
  if (blocked) return blocked;

  const { searchParams } = request.nextUrl;
  const since = parseSince(searchParams.get("since"));
  const source = parseSource(searchParams.get("source"));
  const kind = parseKind(searchParams.get("kind"));
  const reviewStatus = parseReviewStatus(searchParams.get("reviewStatus"));
  const module = parsePipelineModule(searchParams.get("module"));
  const limit = parseLimit(searchParams.get("limit"));

  try {
    const records = await listPipelineEnquiries({
      since,
      source,
      kind,
      reviewStatus,
      module,
      limit,
    });

    return NextResponse.json(
      {
        enquiries: records.map(toPipelinePayload),
        meta: {
          count: records.length,
          limit,
          since: since ?? null,
          source: source ?? null,
          kind: kind ?? null,
          reviewStatus: reviewStatus ?? null,
          module: module ?? null,
        },
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Pipeline enquiry list failed:", error);
    return NextResponse.json({ error: "Failed to list" }, { status: 500 });
  }
}

function parseSince(value: string | null): string | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toISOString();
}

function parseSource(value: string | null): EnquirySource | undefined {
  if (value === "contact" || value === "cost-audit") return value;
  return undefined;
}

function parseKind(value: string | null): EnquiryKind | undefined {
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

function parseReviewStatus(value: string | null): EnquiryReviewStatus | undefined {
  if (value === "new" || value === "reviewed" || value === "ignored") {
    return value;
  }
  return undefined;
}

function parseLimit(value: string | null): number {
  const n = Number(value);
  if (!Number.isFinite(n)) return 50;
  return Math.min(Math.max(Math.floor(n), 1), 100);
}
