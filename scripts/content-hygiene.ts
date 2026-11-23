/**
 * Shared helpers for the Sanity content hygiene scripts.
 *
 * Reads use SANITY_API_READ_TOKEN only. Neither helper writes to Sanity.
 * Fetches use perspective "raw" and stega: false, so the strings are the
 * stored document values, not a visual-editing overlay.
 */

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { stegaClean } from "@sanity/client/stega";
import { createClient, type SanityClient } from "next-sanity";

export const CONTENT_TYPES = [
  "product",
  "blogPost",
  "clientStory",
  "homePage",
  "aboutPage",
  "merchPage",
  "partnershipsPage",
  "contactPage",
  "knowledgeHubPage",
  "clientStoriesHub",
  "costAuditPage",
  "packagingReviewPage",
  "productsIndexPage",
] as const;

export type ContentType = (typeof CONTENT_TYPES)[number];

export interface SanityDoc {
  _id: string;
  _type: string;
  _rev?: string;
  [key: string]: unknown;
}

export interface StringField {
  path: string;
  value: string;
}

/**
 * User-specified zero-width / stega ranges, plus the extra code points in
 * @sanity/client's stega alphabet (U+1D173–U+1D17A). U+2064 is in the
 * requested range and is not part of the official alphabet.
 */
const HIDDEN_SOURCE =
  "[\\u200B-\\u200D\\uFEFF\\u2060-\\u2064\\u{1D173}-\\u{1D17A}]";

const HIDDEN_CHAR = new RegExp(HIDDEN_SOURCE, "u");

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function stripStega(value: string): string {
  let next = value;
  try {
    const cleaned = stegaClean(value);
    if (typeof cleaned === "string") next = cleaned;
  } catch {
    next = value;
  }
  return next.replace(new RegExp(HIDDEN_SOURCE, "gu"), "");
}

export function hasHiddenChars(value: string): boolean {
  if (HIDDEN_CHAR.test(value)) return true;
  return stripStega(value) !== value;
}

export function hiddenCharSummary(value: string): string {
  const counts = new Map<string, number>();
  for (const char of value) {
    const codePoint = char.codePointAt(0);
    if (codePoint === undefined || !HIDDEN_CHAR.test(char)) continue;
    const label = `U+${codePoint.toString(16).toUpperCase().padStart(4, "0")}`;
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }
  if (counts.size === 0) return "stega payload";
  return [...counts.entries()].map(([label, count]) => `${label} ×${count}`).join(", ");
}

export function previewText(value: string, max = 110): string {
  const flat = value.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  return `${flat.slice(0, max - 1)}…`;
}

export function visibleHidden(value: string): string {
  let out = "";
  for (const char of value) {
    const codePoint = char.codePointAt(0);
    if (codePoint !== undefined && HIDDEN_CHAR.test(char)) {
      out += `⟦U+${codePoint.toString(16).toUpperCase().padStart(4, "0")}⟧`;
    } else {
      out += char;
    }
  }
  return out;
}

function segment(key: string): string {
  return /^[A-Za-z_][A-Za-z0-9_]*$/.test(key) ? key : JSON.stringify(key);
}

function arraySegment(item: unknown, index: number): string {
  if (isRecord(item) && typeof item._key === "string") {
    return `[_key==${JSON.stringify(item._key)}]`;
  }
  return `[${index}]`;
}

export function walkStrings(value: unknown, path = ""): StringField[] {
  if (typeof value === "string") {
    return path ? [{ path, value }] : [];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, index) =>
      walkStrings(item, `${path}${arraySegment(item, index)}`)
    );
  }

  if (!isRecord(value)) return [];

  const fields: StringField[] = [];
  for (const [key, child] of Object.entries(value)) {
    if (key.startsWith("_")) continue;
    const next = path ? `${path}.${segment(key)}` : segment(key);
    fields.push(...walkStrings(child, next));
  }
  return fields;
}

export function publicationState(id: string): "draft" | "published" | "version" {
  if (id.startsWith("drafts.")) return "draft";
  if (id.startsWith("versions.")) return "version";
  return "published";
}

export function slugOf(doc: SanityDoc): string | undefined {
  const slug = doc.slug;
  if (!isRecord(slug) || typeof slug.current !== "string") return undefined;
  const current = stripStega(slug.current).trim();
  return current || undefined;
}

export function docTitle(doc: SanityDoc): string {
  const candidates = [doc.name, doc.title, doc.internalTitle, doc.clientName];
  for (const candidate of candidates) {
    if (typeof candidate === "string" && stripStega(candidate).trim()) {
      return stripStega(candidate).trim();
    }
  }
  return doc._id;
}

export function docLabel(doc: SanityDoc): string {
  const slug = slugOf(doc);
  const title = docTitle(doc);
  return slug ? `${title} (\`${slug}\`)` : title;
}

export function mdCell(value: string): string {
  return value.replace(/\|/g, "\\|").replace(/\r?\n/g, " ").replace(/`/g, "'").trim();
}

function loadEnvFile(filePath: string, locked: Set<string>): void {
  if (!existsSync(filePath)) return;
  const content = readFileSync(filePath, "utf8");
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const idx = line.indexOf("=");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    if (!key || locked.has(key)) continue;
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

export function loadEnv(): void {
  const locked = new Set(Object.keys(process.env));
  const root = process.cwd();
  loadEnvFile(path.join(root, ".env"), locked);
  loadEnvFile(path.join(root, ".env.local"), locked);
}

export function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    console.error(`Missing required env var: ${name}`);
    process.exit(1);
  }
  return value;
}

export function createReadClient(): SanityClient {
  const projectId = requiredEnv("NEXT_PUBLIC_SANITY_PROJECT_ID");
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2026-03-13";
  const token = requiredEnv("SANITY_API_READ_TOKEN");

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
    perspective: "raw",
    stega: false,
  });
}

export async function fetchContentDocuments(client: SanityClient): Promise<SanityDoc[]> {
  const docs = await client.fetch<SanityDoc[]>(
    `*[_type in $types] | order(_type asc, _id asc)`,
    { types: [...CONTENT_TYPES] },
    { perspective: "raw", stega: false }
  );
  return docs.filter(
    (doc): doc is SanityDoc =>
      isRecord(doc) && typeof doc._id === "string" && typeof doc._type === "string"
  );
}

export function readString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  return value;
}

export function allNumbers(text: string): number[] {
  const found: number[] = [];
  for (const match of text.matchAll(/(\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?)(\s*[kK])?/g)) {
    let n = Number(match[1].replace(/,/g, ""));
    if (!Number.isFinite(n)) continue;
    if (match[2]) n = Math.round(n * 1000);
    found.push(n);
  }
  return found;
}

export function dedupeNumbers(values: number[]): number[] {
  return [...new Set(values)].sort((a, b) => a - b);
}

/** Numbers that sit next to an MOQ / "minimum" mention, not elsewhere in the sentence. */
export function numbersNearMoq(text: string): number[] {
  const clean = stripStega(text);
  const found: number[] = [];
  for (const match of clean.matchAll(/\bMOQ\b|minimum/gi)) {
    const at = match.index ?? 0;
    const rest = clean.slice(at);
    const sentenceBreak = rest.search(/[.!?\n]/);
    const sentenceEnd = sentenceBreak === -1 ? clean.length : at + sentenceBreak;
    const after = clean.slice(
      at + match[0].length,
      Math.min(sentenceEnd, at + match[0].length + 160)
    );
    const clause =
      after.split(/\b(?:lead time|price|cost|£)\b|\d[\d,]*\s*(?:weeks?|days?)/i)[0] ?? "";
    found.push(...allNumbers(clause));

    const before = clean.slice(Math.max(0, at - 16), at);
    const beforeMatches = [
      ...before.matchAll(/(\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?)(\s*[kK])?/g),
    ];
    const adjacent = beforeMatches.at(-1);
    if (!adjacent || adjacent.index === undefined) continue;
    const trailing = before.slice(adjacent.index + adjacent[0].length);
    if (/^[\s,+–\-]*$/.test(trailing)) found.push(...allNumbers(adjacent[0]));
  }
  return dedupeNumbers(found);
}

export function moqSentences(text: string): string {
  const clean = stripStega(text).replace(/\s+/g, " ").trim();
  const parts = clean
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter((part) => /\bMOQ\b|minimum/i.test(part));
  return parts.join(" ") || clean;
}
