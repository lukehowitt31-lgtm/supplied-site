/**
 * One-shot cleanup: delete any kbItem documents whose _id does NOT follow
 * the `kbItem.sb-<n>` pattern. These are leftovers from an earlier
 * migration attempt that used a hardcoded seed list (49 docs) before the
 * script was rewritten to pull from Supabase.
 *
 * Safe — only touches docs with non-Supabase-shaped IDs. The 365
 * Supabase-sourced docs (kbItem.sb-1, kbItem.sb-2, ...) are untouched.
 *
 * Usage:
 *   npm run cleanup:kb -- --dry-run   # list what would be deleted
 *   npm run cleanup:kb                # actually delete
 */

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

async function main(): Promise<void> {
  loadEnvFile(path.join(process.cwd(), ".env.local"));

  const projectId = requiredEnv("NEXT_PUBLIC_SANITY_PROJECT_ID");
  const dataset = requiredEnv("NEXT_PUBLIC_SANITY_DATASET");
  const apiVersion = requiredEnv("NEXT_PUBLIC_SANITY_API_VERSION");
  const writeToken = requiredEnv("SANITY_API_WRITE_TOKEN");
  const dryRun = process.argv.includes("--dry-run");

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: writeToken,
  });

  const docs = await client.fetch<
    Array<{ _id: string; question: string }>
  >(
    `*[_type == "kbItem" && !(_id match "kbItem.sb-*") && !(_id match "drafts.kbItem.sb-*")]{
      _id, question
    }`
  );

  console.log(
    `Found ${docs.length} kbItem docs that are not Supabase-sourced.\n`
  );

  if (docs.length === 0) {
    console.log("Nothing to clean up.");
    return;
  }

  if (dryRun) {
    for (const doc of docs) {
      console.log(`[dry-run] would delete  ${doc._id}  ${doc.question}`);
    }
    console.log(`\nDry run complete. ${docs.length} docs would be deleted.`);
    return;
  }

  let deleted = 0;
  let errors = 0;
  for (const doc of docs) {
    try {
      await client.delete(doc._id);
      deleted++;
      console.log(`Deleted ${doc._id}`);
    } catch (err) {
      errors++;
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`Failed to delete ${doc._id}: ${msg}`);
    }
  }

  console.log(`\n=== Cleanup complete ===`);
  console.log(`Deleted: ${deleted}`);
  console.log(`Errors:  ${errors}`);
}

main().catch((err) => {
  const msg = err instanceof Error ? err.message : String(err);
  console.error(`Cleanup failed: ${msg}`);
  process.exitCode = 1;
});
