import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { createClient, type SanityClient } from "next-sanity";
import {
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
  sanityWriteToken,
} from "@/lib/sanity/env";
import { generateEmbedding, hashKbSource } from "@/lib/knowledge/embedding";
import { isKbCategory } from "@/lib/knowledge/categories";
import { getClientIp, rateLimit } from "@/lib/rateLimit";

const ADMIN_TOKEN = process.env.KNOWLEDGE_ADMIN_TOKEN;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

interface KbEntry {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  created_at: string;
}

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function validateToken(token: unknown): boolean {
  if (!ADMIN_TOKEN) return false;
  if (typeof token !== "string") return false;
  return token === ADMIN_TOKEN;
}

function ensureSanityWriteable(): NextResponse | null {
  if (!sanityProjectId || sanityProjectId.startsWith("YOUR_")) {
    return NextResponse.json(
      { error: "Sanity is not configured" },
      { status: 500 }
    );
  }
  if (!sanityWriteToken || sanityWriteToken.startsWith("YOUR_")) {
    return NextResponse.json(
      { error: "SANITY_API_WRITE_TOKEN is not configured" },
      { status: 500 }
    );
  }
  if (!OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is not configured" },
      { status: 500 }
    );
  }
  return null;
}

function getWriteClient(): SanityClient {
  return createClient({
    projectId: sanityProjectId,
    dataset: sanityDataset,
    apiVersion: sanityApiVersion,
    useCdn: false,
    token: sanityWriteToken,
  });
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

function generateKbId(question: string): string {
  const slug = slugify(question);
  const stamp = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 6);
  return `kbItem.${slug || "qa"}-${stamp}${rand}`;
}

interface RawKbDoc {
  _id?: string;
  question?: string;
  answer?: string;
  category?: string | null;
  _createdAt?: string;
}

function toEntry(doc: RawKbDoc | null | undefined): KbEntry | null {
  if (!doc || !doc._id) return null;
  return {
    id: doc._id,
    question: doc.question ?? "",
    answer: doc.answer ?? "",
    category: doc.category ?? null,
    created_at: doc._createdAt ?? new Date().toISOString(),
  };
}

function normaliseCategory(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return isKbCategory(trimmed) ? trimmed : "Other";
}

async function listEntries(client: SanityClient): Promise<KbEntry[]> {
  const docs = await client.fetch<RawKbDoc[]>(
    `*[_type == "kbItem"] | order(_createdAt desc){
      _id, question, answer, category, _createdAt
    }`
  );
  return docs
    .map(toEntry)
    .filter((entry): entry is KbEntry => entry !== null);
}

async function createKbItem(
  client: SanityClient,
  input: { question: string; answer: string; category?: string }
): Promise<KbEntry> {
  const question = input.question.trim();
  const answer = input.answer.trim();
  const category = normaliseCategory(input.category) ?? "Other";

  const embedding = await generateEmbedding(
    `${question}\n${answer}`,
    OPENAI_API_KEY as string
  );
  const hash = hashKbSource(question, answer);
  const _id = generateKbId(question);

  const doc = await client.create({
    _id,
    _type: "kbItem",
    question,
    answer,
    category,
    embedding,
    embeddingSourceHash: hash,
    embeddingUpdatedAt: new Date().toISOString(),
  });

  return {
    id: doc._id,
    question,
    answer,
    category,
    created_at: doc._createdAt,
  };
}

export async function GET(request: NextRequest) {
  const ip = getClientIp(request);
  const limiter = rateLimit(ip, { maxRequests: 30, windowMs: 60_000 });
  if (!limiter.ok) {
    return NextResponse.json({ error: "Rate limited" }, { status: 429 });
  }

  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  if (!validateToken(token)) return unauthorized();

  const guard = ensureSanityWriteable();
  if (guard) return guard;

  try {
    const entries = await listEntries(getWriteClient());
    return NextResponse.json({ entries });
  } catch (error) {
    console.error("KB admin list failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to list" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const limiter = rateLimit(ip, { maxRequests: 30, windowMs: 60_000 });
  if (!limiter.ok) {
    return NextResponse.json({ error: "Rate limited" }, { status: 429 });
  }

  const body = (await request.json().catch(() => null)) as
    | {
        token?: unknown;
        question?: unknown;
        answer?: unknown;
        category?: unknown;
        items?: unknown;
      }
    | null;

  if (!body || !validateToken(body.token)) return unauthorized();

  const guard = ensureSanityWriteable();
  if (guard) return guard;

  const client = getWriteClient();

  // ── Batch import path ─────────────────────────────────────
  if (Array.isArray(body.items)) {
    const items = body.items as Array<{
      question?: unknown;
      answer?: unknown;
      category?: unknown;
    }>;

    let success = 0;
    let errors = 0;
    const errorMessages: string[] = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const question =
        typeof item.question === "string" ? item.question.trim() : "";
      const answer =
        typeof item.answer === "string" ? item.answer.trim() : "";
      const category =
        typeof item.category === "string" ? item.category : undefined;

      if (!question || !answer) {
        errors++;
        errorMessages.push(`Item ${i + 1}: missing question or answer`);
        continue;
      }

      try {
        await createKbItem(client, { question, answer, category });
        success++;
        // gentle OpenAI rate limit
        await new Promise((r) => setTimeout(r, 120));
      } catch (err) {
        errors++;
        errorMessages.push(
          `Item ${i + 1}: ${err instanceof Error ? err.message : "failed"}`
        );
      }
    }

    if (success > 0) revalidateTag("knowledgeHubKb", "max");

    return NextResponse.json({
      success,
      errors,
      errorMessages: errorMessages.slice(0, 10),
    });
  }

  // ── Single create path ────────────────────────────────────
  const question = typeof body.question === "string" ? body.question.trim() : "";
  const answer = typeof body.answer === "string" ? body.answer.trim() : "";
  const category =
    typeof body.category === "string" ? body.category : undefined;

  if (!question || !answer) {
    return NextResponse.json(
      { error: "question and answer are required" },
      { status: 400 }
    );
  }

  try {
    const entry = await createKbItem(client, { question, answer, category });
    revalidateTag("knowledgeHubKb", "max");
    return NextResponse.json({ entry });
  } catch (error) {
    console.error("KB admin create failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const ip = getClientIp(request);
  const limiter = rateLimit(ip, { maxRequests: 30, windowMs: 60_000 });
  if (!limiter.ok) {
    return NextResponse.json({ error: "Rate limited" }, { status: 429 });
  }

  const body = (await request.json().catch(() => null)) as
    | {
        token?: unknown;
        id?: unknown;
        question?: unknown;
        answer?: unknown;
        category?: unknown;
      }
    | null;

  if (!body || !validateToken(body.token)) return unauthorized();

  const guard = ensureSanityWriteable();
  if (guard) return guard;

  const id = typeof body.id === "string" ? body.id : "";
  const question =
    typeof body.question === "string" ? body.question.trim() : "";
  const answer = typeof body.answer === "string" ? body.answer.trim() : "";
  const category = normaliseCategory(body.category) ?? "Other";

  if (!id || !question || !answer) {
    return NextResponse.json(
      { error: "id, question and answer are required" },
      { status: 400 }
    );
  }

  try {
    const embedding = await generateEmbedding(
      `${question}\n${answer}`,
      OPENAI_API_KEY as string
    );
    const hash = hashKbSource(question, answer);

    const client = getWriteClient();
    const updated = await client
      .patch(id)
      .set({
        question,
        answer,
        category,
        embedding,
        embeddingSourceHash: hash,
        embeddingUpdatedAt: new Date().toISOString(),
      })
      .commit<RawKbDoc>();

    revalidateTag("knowledgeHubKb", "max");

    return NextResponse.json({
      entry: toEntry(updated) ?? {
        id,
        question,
        answer,
        category,
        created_at: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("KB admin update failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const ip = getClientIp(request);
  const limiter = rateLimit(ip, { maxRequests: 30, windowMs: 60_000 });
  if (!limiter.ok) {
    return NextResponse.json({ error: "Rate limited" }, { status: 429 });
  }

  const body = (await request.json().catch(() => null)) as
    | { token?: unknown; id?: unknown }
    | null;

  if (!body || !validateToken(body.token)) return unauthorized();

  const guard = ensureSanityWriteable();
  if (guard) return guard;

  const id = typeof body.id === "string" ? body.id : "";
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  try {
    const client = getWriteClient();
    await client.delete(id);
    revalidateTag("knowledgeHubKb", "max");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("KB admin delete failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete" },
      { status: 500 }
    );
  }
}
