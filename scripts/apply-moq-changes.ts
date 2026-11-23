/**
 * Apply the field replacements in docs/sanity-moq-changes.md.
 *
 * Default is a dry run: print each document id, field path, current value
 * and new value. Nothing is written.
 *
 *   npx tsx ./scripts/apply-moq-changes.ts
 *   npx tsx ./scripts/apply-moq-changes.ts --write
 *
 * A field is patched only when the stored value still equals the "current"
 * text in the doc. A mismatch is skipped and reported.
 *
 * The mailer-box price answer and the knowledge-hub price answer are never
 * patched. Published documents and drafts.<id>, when that draft exists, are
 * separate documents. Each gets one transaction.
 *
 * Dry run reads SANITY_API_READ_TOKEN only.
 * --write also requires SANITY_API_WRITE_TOKEN. Do not combine the two flags.
 */

import { readFileSync } from "node:fs";
import path from "node:path";
import { createClient, type SanityClient } from "next-sanity";
import {
  createReadClient,
  isRecord,
  loadEnv,
  requiredEnv,
  type SanityDoc,
} from "./content-hygiene";

const SOURCE = path.join(process.cwd(), "docs", "sanity-moq-changes.md");

/** Price answers the operator will edit by hand. */
const SKIPPED_PRICE_KEYS = ["4WosXPXvlMgq3tPqrVL5xh", "rOv2v1AtN64guwYLFkM4Is"];

interface Change {
  documentId: string;
  path: string;
  expected: string | string[];
  next: string | string[];
}

function fences(text: string): string[] {
  return [...text.matchAll(/```[^\n]*\n([\s\S]*?)\n```/g)].map((match) => match[1]);
}

function isPriceSection(heading: string, fieldPath: string): boolean {
  if (/how much do custom mailer boxes cost/i.test(heading)) return true;
  return SKIPPED_PRICE_KEYS.some((key) => fieldPath.includes(key));
}

function stringTarget(fieldPath: string): string {
  if (fieldPath.startsWith("detailedSpecs[")) return `${fieldPath}.value`;
  if (fieldPath.startsWith("faqs[")) return `${fieldPath}.answer`;
  if (fieldPath.startsWith("faqCategories[")) return `${fieldPath}.a`;
  return fieldPath;
}

function parseSection(documentId: string, block: string): Change[] {
  const newline = block.indexOf("\n");
  const heading = (newline === -1 ? block : block.slice(0, newline)).trim();
  const body = newline === -1 ? "" : block.slice(newline + 1);
  const pathMatch = heading.match(/`([^`]+)`/);
  if (!pathMatch) return [];

  const fieldPath = pathMatch[1];
  if (isPriceSection(heading, fieldPath)) return [];

  if (/Current title:/.test(body) && /Current body:/.test(body)) {
    const blocks = fences(body);
    if (blocks.length !== 4) {
      throw new Error(`${documentId} ${fieldPath}: expected 4 fences for title and body, found ${blocks.length}`);
    }
    return [
      { documentId, path: `${fieldPath}.title`, expected: blocks[0], next: blocks[1] },
      { documentId, path: `${fieldPath}.body`, expected: blocks[2], next: blocks[3] },
    ];
  }

  if (/Current value `/.test(body)) {
    const current = body.match(/Current value `([^`]*)`, label `([^`]*)`/);
    if (!current) {
      throw new Error(`${documentId} ${fieldPath}: could not read the current hero value and label`);
    }
    const blocks = fences(body);
    if (blocks.length < 1) {
      throw new Error(`${documentId} ${fieldPath}: missing replacement value`);
    }
    const changes: Change[] = [
      { documentId, path: `${fieldPath}.val`, expected: current[1], next: blocks[0] },
    ];
    if (!/Leave the label/.test(body)) {
      if (blocks.length < 2) {
        throw new Error(`${documentId} ${fieldPath}: missing replacement label`);
      }
      changes.push({
        documentId,
        path: `${fieldPath}.lbl`,
        expected: current[2],
        next: blocks[1],
      });
    }
    return changes;
  }

  const blocks = fences(body);
  if (blocks.length !== 2) {
    throw new Error(`${documentId} ${fieldPath}: expected current and replacement fences, found ${blocks.length}`);
  }

  if (fieldPath === "facts") {
    return [
      {
        documentId,
        path: fieldPath,
        expected: blocks[0].split("\n"),
        next: blocks[1].split("\n"),
      },
    ];
  }

  return [
    {
      documentId,
      path: stringTarget(fieldPath),
      expected: blocks[0],
      next: blocks[1],
    },
  ];
}

export function parseChanges(markdown: string): Change[] {
  const changes: Change[] = [];
  const sections = markdown.split(/\n(?=## )/).filter((section) => section.startsWith("## "));
  for (const section of sections) {
    const idMatch = section.match(/Document `([^`]+)`/);
    if (!idMatch) continue;
    const documentId = idMatch[1];
    const subsections = section.split(/\n(?=### )/).slice(1);
    for (const subsection of subsections) {
      changes.push(...parseSection(documentId, subsection));
    }
  }
  return changes;
}

function readAt(root: unknown, sanityPath: string): unknown {
  let current: unknown = root;
  const tokens = sanityPath.matchAll(/([A-Za-z_][A-Za-z0-9_]*)|\[_key=="([^"]+)"\]/g);
  for (const token of tokens) {
    if (current == null) return undefined;
    if (token[1]) {
      if (!isRecord(current)) return undefined;
      current = current[token[1]];
      continue;
    }
    if (!Array.isArray(current)) return undefined;
    current = current.find((item) => isRecord(item) && item._key === token[2]);
  }
  return current;
}

function valuesMatch(actual: unknown, expected: string | string[]): boolean {
  if (Array.isArray(expected)) {
    return (
      Array.isArray(actual) &&
      actual.length === expected.length &&
      actual.every((item, index) => item === expected[index])
    );
  }
  return actual === expected;
}

function formatValue(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value) && value.every((item) => typeof item === "string")) {
    return value.join("\n");
  }
  return JSON.stringify(value);
}

interface FieldPlan {
  path: string;
  expected: string | string[];
  actual: unknown;
  next: string | string[];
  match: boolean;
}

interface DocumentPlan {
  id: string;
  rev?: string;
  found: boolean;
  fields: FieldPlan[];
}

function planDocument(id: string, doc: SanityDoc | undefined, changes: Change[]): DocumentPlan {
  if (!doc) return { id, found: false, fields: [] };
  return {
    id,
    rev: doc._rev,
    found: true,
    fields: changes.map((change) => {
      const actual = readAt(doc, change.path);
      return {
        path: change.path,
        expected: change.expected,
        actual,
        next: change.next,
        match: valuesMatch(actual, change.expected),
      };
    }),
  };
}

function printPlan(plans: DocumentPlan[]): void {
  for (const plan of plans) {
    console.log(plan.id);
    if (!plan.found) {
      console.log("  no document");
      console.log("");
      continue;
    }
    for (const field of plan.fields) {
      console.log(`  ${field.path}`);
      if (field.match) {
        console.log(`    current: ${formatValue(field.actual)}`);
        console.log(`    new: ${formatValue(field.next)}`);
      } else {
        console.log("    skip: stored value does not match the current text");
        console.log(`    expected: ${formatValue(field.expected)}`);
        console.log(`    actual: ${formatValue(field.actual)}`);
      }
    }
    console.log("");
  }
}

function printSummary(plans: DocumentPlan[], priceSkips: string[]): void {
  const found = plans.filter((plan) => plan.found);
  const absent = plans.filter((plan) => !plan.found);
  const draftsAbsent = absent.filter((plan) => plan.id.startsWith("drafts."));
  const publishedAbsent = absent.filter((plan) => !plan.id.startsWith("drafts."));
  const matches = found.reduce((sum, plan) => sum + plan.fields.filter((field) => field.match).length, 0);
  const skips = found.flatMap((plan) =>
    plan.fields.filter((field) => !field.match).map((field) => `${plan.id} ${field.path}`)
  );

  console.log("Summary");
  console.log(`  Would patch: ${matches} field${matches === 1 ? "" : "s"} on ${found.length} document${found.length === 1 ? "" : "s"}`);
  console.log(`  Skipped, value changed: ${skips.length}`);
  for (const skip of skips) console.log(`    ${skip}`);
  console.log(`  Published documents missing: ${publishedAbsent.length}`);
  for (const plan of publishedAbsent) console.log(`    ${plan.id}`);
  console.log(`  Drafts not present: ${draftsAbsent.length}`);
  for (const plan of draftsAbsent) console.log(`    ${plan.id}`);
  console.log(`  Price answers left for hand edit: ${priceSkips.length}`);
  for (const skip of priceSkips) console.log(`    ${skip}`);
}

async function writePlans(client: SanityClient, plans: DocumentPlan[]): Promise<void> {
  for (const plan of plans) {
    if (!plan.found) continue;
    const set: Record<string, string | string[]> = {};
    for (const field of plan.fields) {
      if (!field.match) continue;
      set[field.path] = field.next;
    }
    const count = Object.keys(set).length;
    if (count === 0) {
      console.log(`Skipped ${plan.id}: no fields still match`);
      continue;
    }
    let patch = client.patch(plan.id).set(set);
    if (plan.rev) patch = patch.ifRevisionId(plan.rev);
    await client.transaction().patch(patch).commit();
    console.log(`Patched ${plan.id} (${count} field${count === 1 ? "" : "s"})`);
  }
}

function priceSkips(markdown: string): string[] {
  const skips: string[] = [];
  for (const section of markdown.split(/\n(?=## )/)) {
    const idMatch = section.match(/Document `([^`]+)`/);
    if (!idMatch) continue;
    for (const subsection of section.split(/\n(?=### )/).slice(1)) {
      const heading = subsection.slice(0, subsection.indexOf("\n")).trim();
      const pathMatch = heading.match(/`([^`]+)`/);
      if (!pathMatch) continue;
      if (isPriceSection(heading, pathMatch[1])) skips.push(`${idMatch[1]} ${pathMatch[1]}`);
    }
  }
  return skips;
}

async function main(): Promise<void> {
  const write = process.argv.includes("--write");
  const dryFlag = process.argv.includes("--dry-run");
  if (write && dryFlag) {
    console.error("Pass either --write or --dry-run, not both.");
    process.exit(1);
  }

  const markdown = readFileSync(SOURCE, "utf8").replace(/\r\n/g, "\n");
  const changes = parseChanges(markdown);
  if (changes.length === 0) {
    throw new Error(`No changes parsed from ${SOURCE}`);
  }

  const byDocument = new Map<string, Change[]>();
  for (const change of changes) {
    const list = byDocument.get(change.documentId) ?? [];
    list.push(change);
    byDocument.set(change.documentId, list);
  }

  loadEnv();
  const readClient = createReadClient();
  const ids = [...byDocument.keys()].flatMap((id) => [id, `drafts.${id}`]);
  const docs = await readClient.fetch<SanityDoc[]>(
    `*[_id in $ids]`,
    { ids },
    { perspective: "raw", stega: false }
  );
  const byId = new Map(docs.map((doc) => [doc._id, doc]));

  const plans: DocumentPlan[] = [];
  for (const [documentId, documentChanges] of byDocument) {
    plans.push(planDocument(documentId, byId.get(documentId), documentChanges));
    plans.push(planDocument(`drafts.${documentId}`, byId.get(`drafts.${documentId}`), documentChanges));
  }

  const mode = write ? "Write" : "Dry run. Nothing written.";
  console.log(`${mode} ${changes.length} fields from docs/sanity-moq-changes.md.`);
  console.log("");
  printPlan(plans);
  printSummary(plans, priceSkips(markdown));

  if (!write) return;

  const projectId = requiredEnv("NEXT_PUBLIC_SANITY_PROJECT_ID");
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2026-03-13";
  const token = requiredEnv("SANITY_API_WRITE_TOKEN");
  const writeClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
    perspective: "raw",
    stega: false,
  });
  await writePlans(writeClient, plans);
}

const isDirectRun = process.argv[1]?.includes("apply-moq-changes");
if (isDirectRun) {
  main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
}
