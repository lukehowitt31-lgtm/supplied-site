import "server-only";

import { createHash } from "node:crypto";

const OPENAI_EMBEDDING_URL = "https://api.openai.com/v1/embeddings";
const OPENAI_EMBEDDING_MODEL = "text-embedding-3-small";

/**
 * Stable hash of the question+answer pair, used to detect when the
 * source content has changed and a re-embed is needed.
 */
export function hashKbSource(question: string, answer: string): string {
  return createHash("sha256")
    .update(`${question.trim()}\n${answer.trim()}`)
    .digest("hex");
}

export async function generateEmbedding(
  text: string,
  apiKey: string
): Promise<number[]> {
  const response = await fetch(OPENAI_EMBEDDING_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: OPENAI_EMBEDDING_MODEL,
      input: text,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `OpenAI embeddings error ${response.status}: ${errorText}`
    );
  }

  const data = (await response.json()) as {
    data?: Array<{ embedding?: number[] }>;
  };

  const embedding = data.data?.[0]?.embedding;
  if (!Array.isArray(embedding) || embedding.length === 0) {
    throw new Error("OpenAI embeddings response missing embedding vector");
  }

  return embedding;
}
