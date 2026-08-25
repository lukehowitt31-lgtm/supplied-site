import { NextResponse, type NextRequest } from "next/server";
import {
  getPipelineToken,
  unauthorized,
  validatePipelineToken,
} from "@/lib/pipeline/auth";
import { getClientIp, rateLimit } from "@/lib/rateLimit";
import { toPipelinePayload } from "@/lib/enquiries/pipeline";
import { getEnquiryById } from "@/lib/enquiries/store";

function guard(request: NextRequest) {
  const ip = getClientIp(request);
  const limiter = rateLimit(`pipeline-enquiry:${ip}`, {
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

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const blocked = guard(request);
  if (blocked) return blocked;

  const { id } = await context.params;
  const decoded = decodeURIComponent(id);

  try {
    const record = await getEnquiryById(decoded);
    if (!record) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(
      { enquiry: toPipelinePayload(record) },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Pipeline enquiry fetch failed:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
