export interface VectorItem {
  embedding: number[];
}

export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) return 0;

  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    const av = a[i];
    const bv = b[i];
    dot += av * bv;
    normA += av * av;
    normB += bv * bv;
  }

  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  if (denom === 0) return 0;
  return dot / denom;
}

export function topKSimilar<T extends VectorItem>(
  query: number[],
  items: T[],
  options: { k?: number; threshold?: number } = {}
): Array<T & { similarity: number }> {
  const { k = 5, threshold = 0.45 } = options;
  if (query.length === 0 || items.length === 0) return [];

  const scored: Array<T & { similarity: number }> = [];
  for (const item of items) {
    if (!Array.isArray(item.embedding) || item.embedding.length === 0) continue;
    const similarity = cosineSimilarity(query, item.embedding);
    if (similarity >= threshold) {
      scored.push({ ...item, similarity });
    }
  }

  scored.sort((a, b) => b.similarity - a.similarity);
  return scored.slice(0, k);
}
