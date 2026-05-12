/**
 * One-off migration: copy every row from the legacy Supabase `knowledge_hub`
 * table into Sanity as `kbItem` documents, re-generating embeddings via
 * OpenAI so the new RAG path works immediately.
 *
 * Idempotent — each Supabase row is mapped to a deterministic Sanity ID
 * (`kbItem.sb-<supabase_id>`), so re-running skips anything already present.
 *
 * Prerequisites in .env.local:
 *   - SUPABASE_URL
 *   - SUPABASE_SERVICE_ROLE_KEY
 *   - NEXT_PUBLIC_SANITY_PROJECT_ID
 *   - NEXT_PUBLIC_SANITY_DATASET
 *   - NEXT_PUBLIC_SANITY_API_VERSION
 *   - SANITY_API_WRITE_TOKEN
 *   - OPENAI_API_KEY
 *
 * Usage:
 *   npm run migrate:kb -- --dry-run     # preview, no writes, no embeds
 *   npm run migrate:kb                  # create new docs, skip existing
 *   npm run migrate:kb -- --overwrite   # re-embed + overwrite existing
 */

import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { createClient } from "next-sanity";

function loadEnvFile(filePath: string): void {
  if (!existsSync(filePath)) return;
  const contents = readFileSync(filePath, "utf8");
  for (const rawLine of contents.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq <= 0) continue;
    const key = line.slice(0, eq).trim();
    if (!key || process.env[key]) continue;
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

function hashSource(question: string, answer: string): string {
  return createHash("sha256")
    .update(`${question.trim()}\n${answer.trim()}`)
    .digest("hex");
}

function sanityIdFromSupabase(id: number): string {
  return `kbItem.sb-${id}`;
}

interface SupabaseRow {
  id: number;
  question: string;
  answer: string;
  category: string | null;
  created_at?: string;
}

async function fetchAllSupabaseRows(
  supabaseUrl: string,
  serviceRoleKey: string
): Promise<SupabaseRow[]> {
  const url = `${supabaseUrl.replace(/\/$/, "")}/rest/v1/knowledge_hub?select=id,question,answer,category,created_at&order=id.asc`;

  const response = await fetch(url, {
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      Accept: "application/json",
      // 0-9999 covers up to 10k rows; PostgREST default cap is 1000 without this.
      Range: "0-9999",
      Prefer: "count=exact",
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Supabase fetch failed ${response.status}: ${text}`);
  }

  return (await response.json()) as SupabaseRow[];
}

async function generateEmbedding(
  text: string,
  apiKey: string
): Promise<number[]> {
  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
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
  if (!Array.isArray(embedding)) {
    throw new Error("OpenAI embeddings response missing embedding vector");
  }
  return embedding;
}

async function main(): Promise<void> {
  const cwd = process.cwd();
  loadEnvFile(path.join(cwd, ".env.local"));

  const supabaseUrl = requiredEnv("SUPABASE_URL");
  const supabaseKey = requiredEnv("SUPABASE_SERVICE_ROLE_KEY");
  const projectId = requiredEnv("NEXT_PUBLIC_SANITY_PROJECT_ID");
  const dataset = requiredEnv("NEXT_PUBLIC_SANITY_DATASET");
  const apiVersion = requiredEnv("NEXT_PUBLIC_SANITY_API_VERSION");
  const writeToken = requiredEnv("SANITY_API_WRITE_TOKEN");
  const openaiKey = requiredEnv("OPENAI_API_KEY");
  const overwrite = process.argv.includes("--overwrite");
  const dryRun = process.argv.includes("--dry-run");

  console.log(
    `Pulling rows from Supabase (${new URL(supabaseUrl).host})...`
  );
  const rows = await fetchAllSupabaseRows(supabaseUrl, supabaseKey);
  console.log(`Fetched ${rows.length} rows from knowledge_hub.\n`);

  if (rows.length === 0) {
    console.log("Nothing to migrate.");
    return;
  }

  console.log(
    `Target: Sanity dataset "${dataset}"${dryRun ? " [DRY RUN]" : ""}${overwrite ? " [OVERWRITE]" : ""}\n`
  );

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: writeToken,
  });

  let created = 0;
  let updated = 0;
  let skipped = 0;
  let errors = 0;
  const errorSamples: string[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const question = (row.question ?? "").trim();
    const answer = (row.answer ?? "").trim();
    const category = (row.category ?? "Other").trim() || "Other";

    if (!question || !answer) {
      errors++;
      errorSamples.push(`Row ${row.id}: empty question or answer`);
      continue;
    }

    const sanityId = sanityIdFromSupabase(row.id);
    const sourceText = `${question}\n${answer}`;
    const hash = hashSource(question, answer);

    try {
      const existing = await client.getDocument(sanityId);

      if (existing && !overwrite) {
        skipped++;
        continue;
      }

      if (dryRun) {
        console.log(
          `[dry-run] ${existing ? "would update" : "would create"} ${sanityId}  ${question.slice(0, 60)}`
        );
        if (existing) updated++;
        else created++;
        continue;
      }

      const embedding = await generateEmbedding(sourceText, openaiKey);

      const fields = {
        question,
        answer,
        category,
        embedding,
        embeddingSourceHash: hash,
        embeddingUpdatedAt: new Date().toISOString(),
      };

      if (existing) {
        await client.patch(sanityId).set(fields).commit();
        updated++;
      } else {
        await client.create({ _id: sanityId, _type: "kbItem", ...fields });
        created++;
      }

      const done = created + updated;
      if (done % 25 === 0) {
        console.log(`Progress: ${done}/${rows.length}`);
      }

      // Gentle OpenAI rate-limit (~8 req/s)
      await new Promise((r) => setTimeout(r, 120));
    } catch (err) {
      errors++;
      const message = err instanceof Error ? err.message : String(err);
      errorSamples.push(`Row ${row.id}: ${message}`);
      console.error(`Row ${row.id} failed: ${message}`);
    }
  }

  console.log("\n=== Migration complete ===");
  console.log(`Created: ${created}`);
  console.log(`Updated: ${updated}`);
  console.log(`Skipped: ${skipped}${!overwrite && skipped > 0 ? "  (existing Sanity docs; pass --overwrite to re-embed)" : ""}`);
  console.log(`Errors:  ${errors}`);
  if (errorSamples.length > 0) {
    console.log("\nFirst few errors:");
    for (const sample of errorSamples.slice(0, 10)) {
      console.log(`  - ${sample}`);
    }
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Migration failed: ${message}`);
  process.exitCode = 1;
});
