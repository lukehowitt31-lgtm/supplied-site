/**
 * Strip zero-width / Sanity stega characters from stored content.
 *
 * Default is a dry run: print the field diffs and write nothing.
 * Pass --write to patch documents with SANITY_API_WRITE_TOKEN.
 *
 *   npx tsx ./scripts/clean-stega.ts
 *   npx tsx ./scripts/clean-stega.ts --write
 *
 * Dry run reads SANITY_API_READ_TOKEN only.
 * --write also requires SANITY_API_WRITE_TOKEN. Do not combine the two flags.
 *
 * Same document set as scripts/content-audit.ts. Perspective raw, stega off,
 * so the diff is against stored strings.
 */

import { createClient } from "next-sanity";
import {
  createReadClient,
  docLabel,
  fetchContentDocuments,
  loadEnv,
  previewText,
  publicationState,
  requiredEnv,
  stripStega,
  visibleHidden,
  walkStrings,
  type SanityDoc,
} from "./content-hygiene";

interface FieldDiff {
  path: string;
  before: string;
  after: string;
}

interface DocDiff {
  doc: SanityDoc;
  fields: FieldDiff[];
}

function clip(value: string, max = 320): string {
  const flat = value.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  const marker = flat.indexOf("⟦");
  if (marker === -1) return `${flat.slice(0, max - 1)}…`;
  const start = Math.max(0, marker - 60);
  const end = Math.min(flat.length, marker + 200);
  return `${start > 0 ? "…" : ""}${flat.slice(start, end)}${end < flat.length ? "…" : ""}`;
}

function collectDiffs(docs: SanityDoc[]): DocDiff[] {
  const diffs: DocDiff[] = [];
  for (const doc of docs) {
    const fields: FieldDiff[] = [];
    for (const field of walkStrings(doc)) {
      const after = stripStega(field.value);
      if (after === field.value) continue;
      fields.push({
        path: field.path,
        before: clip(visibleHidden(field.value)),
        after: clip(previewText(after, 320)),
      });
    }
    if (fields.length > 0) diffs.push({ doc, fields });
  }
  return diffs;
}

function printDiffs(diffs: DocDiff[]): void {
  if (diffs.length === 0) {
    console.log("No stega or zero-width characters to strip.");
    return;
  }

  const fieldCount = diffs.reduce((sum, diff) => sum + diff.fields.length, 0);
  console.log(
    `Dry run. ${fieldCount} field${fieldCount === 1 ? "" : "s"} on ${diffs.length} document${diffs.length === 1 ? "" : "s"}. Nothing written.`
  );
  console.log("");

  for (const diff of diffs) {
    console.log(
      `${diff.doc._type}  ${docLabel(diff.doc)}  ${diff.doc._id}  ${publicationState(diff.doc._id)}`
    );
    for (const field of diff.fields) {
      console.log(`  ${field.path}`);
      console.log(`  - ${field.before}`);
      console.log(`  + ${field.after}`);
    }
    console.log("");
  }
}

async function writeDiffs(diffs: DocDiff[]): Promise<void> {
  const projectId = requiredEnv("NEXT_PUBLIC_SANITY_PROJECT_ID");
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2026-03-13";
  const token = requiredEnv("SANITY_API_WRITE_TOKEN");

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
    perspective: "raw",
    stega: false,
  });

  for (const diff of diffs) {
    const set: Record<string, string> = {};
    for (const field of walkStrings(diff.doc)) {
      const after = stripStega(field.value);
      if (after !== field.value) set[field.path] = after;
    }
    let patch = client.patch(diff.doc._id).set(set);
    if (diff.doc._rev) patch = patch.ifRevisionId(diff.doc._rev);
    await patch.commit();
    console.log(`Patched ${diff.doc._id} (${Object.keys(set).length} fields)`);
  }
}

async function main(): Promise<void> {
  const write = process.argv.includes("--write");
  const dryFlag = process.argv.includes("--dry-run");
  if (write && dryFlag) {
    console.error("Pass either --write or --dry-run, not both.");
    process.exit(1);
  }

  loadEnv();
  const client = createReadClient();
  const docs = await fetchContentDocuments(client);
  const diffs = collectDiffs(docs);
  printDiffs(diffs);

  if (!write) return;
  if (diffs.length === 0) return;
  await writeDiffs(diffs);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
