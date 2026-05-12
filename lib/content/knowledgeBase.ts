import "server-only";

import { groq } from "next-sanity";
import { sanityFetch } from "@/lib/sanity/fetch";

export interface KnowledgeBaseItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  embedding: number[];
}

const knowledgeBaseQuery = groq`
  *[_type == "kbItem" && defined(embedding) && length(embedding) > 0]{
    "id": _id,
    question,
    answer,
    category,
    embedding
  }
`;

interface SanityKbDoc {
  id?: string | null;
  question?: string | null;
  answer?: string | null;
  category?: string | null;
  embedding?: unknown;
}

function isNumberArray(value: unknown): value is number[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((v) => typeof v === "number" && Number.isFinite(v))
  );
}

function mapDoc(doc: SanityKbDoc): KnowledgeBaseItem | null {
  const id = doc.id?.trim();
  const question = doc.question?.trim();
  const answer = doc.answer?.trim();
  const category = doc.category?.trim() ?? "Other";
  if (!id || !question || !answer) return null;
  if (!isNumberArray(doc.embedding)) return null;
  return { id, question, answer, category, embedding: doc.embedding };
}

/**
 * Fetch all knowledge-base Q&A items with embeddings from Sanity.
 * Cached via Next.js fetch tag "knowledgeHubKb" — invalidated by the
 * embedding webhook when items are added/edited.
 */
export async function getKnowledgeBase(): Promise<KnowledgeBaseItem[]> {
  try {
    const docs = await sanityFetch<SanityKbDoc[] | null>({
      query: knowledgeBaseQuery,
      tags: ["knowledgeHubKb"],
    });
    if (!Array.isArray(docs)) return [];
    return docs
      .map(mapDoc)
      .filter((item): item is KnowledgeBaseItem => item !== null);
  } catch (error) {
    console.error("getKnowledgeBase failed:", error);
    return [];
  }
}
