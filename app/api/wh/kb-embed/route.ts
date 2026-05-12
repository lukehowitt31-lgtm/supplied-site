import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "next-sanity";
import { parseBody } from "next-sanity/webhook";
import {
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
  sanityRevalidateSecret,
  sanityWriteToken,
} from "@/lib/sanity/env";
import { generateEmbedding, hashKbSource } from "@/lib/knowledge/embedding";
import { getClientIp, rateLimit } from "@/lib/rateLimit";

interface KbWebhookBody {
  _id?: string;
  _type?: string;
  question?: string;
  answer?: string;
  embeddingSourceHash?: string;
}

export async function GET() {
  return NextResponse.json(
    { ok: false, message: "Method not allowed" },
    { status: 405 }
  );
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const limiter = rateLimit(ip, { maxRequests: 30, windowMs: 60_000 });
  if (!limiter.ok) {
    return NextResponse.json(
      { ok: false, message: "Rate limited" },
      { status: 429 }
    );
  }

  if (!sanityRevalidateSecret || sanityRevalidateSecret.startsWith("YOUR_")) {
    return NextResponse.json(
      { ok: false, message: "Webhook secret not configured." },
      { status: 500 }
    );
  }

  const { body, isValidSignature } = await parseBody<KbWebhookBody>(
    request,
    sanityRevalidateSecret,
    true
  );

  if (!isValidSignature || !body) {
    return NextResponse.json(
      { ok: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  if (body._type !== "kbItem") {
    return NextResponse.json({ ok: true, skipped: "not-a-kb-item" });
  }

  const { _id, question, answer, embeddingSourceHash } = body;

  if (!_id || !question?.trim() || !answer?.trim()) {
    return NextResponse.json({
      ok: true,
      skipped: "missing-question-or-answer",
    });
  }

  const sourceText = `${question.trim()}\n${answer.trim()}`;
  const hash = hashKbSource(question, answer);

  if (hash === embeddingSourceHash) {
    return NextResponse.json({ ok: true, skipped: "unchanged" });
  }

  if (!sanityWriteToken || sanityWriteToken.startsWith("YOUR_")) {
    return NextResponse.json(
      { ok: false, message: "Sanity write token not configured." },
      { status: 500 }
    );
  }

  const openaiKey = process.env.OPENAI_API_KEY;
  if (!openaiKey) {
    return NextResponse.json(
      { ok: false, message: "OPENAI_API_KEY not configured." },
      { status: 500 }
    );
  }

  try {
    const embedding = await generateEmbedding(sourceText, openaiKey);

    const writeClient = createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      useCdn: false,
      token: sanityWriteToken,
    });

    await writeClient
      .patch(_id)
      .set({
        embedding,
        embeddingSourceHash: hash,
        embeddingUpdatedAt: new Date().toISOString(),
      })
      .commit({ visibility: "async" });

    revalidateTag("knowledgeHubKb", "max");

    return NextResponse.json({
      ok: true,
      embeddedDimensions: embedding.length,
    });
  } catch (error) {
    console.error("KB embed webhook failed:", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error ? error.message : "Unknown embedding error",
      },
      { status: 500 }
    );
  }
}
