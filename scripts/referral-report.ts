/**
 * Read-only referral report for Sanity documents of _type "enquiry".
 *
 * Queries every enquiry, decrypts only the `extra` blob with the existing
 * helper, and prints aggregated counts for Aug–Nov 2026 (Europe/London).
 * Names, emails, phone numbers, company names and message bodies are not
 * fetched and are not printed.
 *
 * Does not write to Sanity. Uses the read token only.
 *
 * Env (shell or .env.local; .env is a fallback):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID     required
 *   SANITY_API_READ_TOKEN             required (read-only; write token is never read)
 *   ENQUIRY_ENCRYPTION_KEY            required, unless KNOWLEDGE_ADMIN_TOKEN is set
 *   KNOWLEDGE_ADMIN_TOKEN             used only when ENQUIRY_ENCRYPTION_KEY is unset
 *                                     (same fallback as lib/enquiries/crypto.ts)
 *   NEXT_PUBLIC_SANITY_DATASET        optional, default "production"
 *   NEXT_PUBLIC_SANITY_API_VERSION    optional, default "2026-03-13"
 *
 *   npm run report:referrals
 */

import { createRequire } from "node:module";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { createClient } from "next-sanity";

const REPORT_MONTHS = ["2026-08", "2026-09", "2026-10", "2026-11"] as const;
type ReportMonth = (typeof REPORT_MONTHS)[number];

const MONTH_LABEL: Record<ReportMonth, string> = {
  "2026-08": "Aug 2026",
  "2026-09": "Sep 2026",
  "2026-10": "Oct 2026",
  "2026-11": "Nov 2026",
};

const BLANK = "(blank)";
const REDACTED = "(redacted)";
const UNDECRYPTABLE = "(undecryptable)";
const UNABLE_TO_DECRYPT = "[unable to decrypt]";

const SERVICE_BY_SOURCE: Record<string, string> = {
  "cost-audit": "Packaging cost audit",
  "packaging-review": "Packaging review",
};

interface EnquiryProjection {
  submittedAt?: string;
  _createdAt?: string;
  extra?: string;
  productType?: string;
  packagingTypes?: unknown;
  source?: string;
}

function stubServerOnly(): void {
  const require = createRequire(import.meta.url);
  const resolved = require.resolve("server-only");
  require.cache[resolved] = {
    id: resolved,
    filename: resolved,
    loaded: true,
    exports: {},
  } as NodeModule;
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

function loadEnv(): void {
  const locked = new Set(Object.keys(process.env));
  const root = process.cwd();
  loadEnvFile(path.join(root, ".env"), locked);
  loadEnvFile(path.join(root, ".env.local"), locked);
}

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    console.error(`Missing required env var: ${name}`);
    process.exit(1);
  }
  return value;
}

function monthKey(iso: string | undefined): ReportMonth | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
  }).formatToParts(date);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const key = `${year}-${month}`;
  return (REPORT_MONTHS as readonly string[]).includes(key)
    ? (key as ReportMonth)
    : null;
}

function containsEmail(text: string): boolean {
  return text.includes("@");
}

function containsPhone(text: string): boolean {
  const digits = text.replace(/\D/g, "");
  return digits.length >= 7;
}

function normaliseReferral(raw: string): string {
  const text = raw
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
    .replace(/^[\s"'.,;:!?()-]+|[\s"'.,;:!?()-]+$/g, "");
  if (!text) return "";
  if (containsEmail(text) || containsPhone(text)) return REDACTED;

  const compact = text.replace(/[^a-z0-9]+/g, "");

  if (
    compact === "ai" ||
    compact === "aisearch" ||
    compact === "genai" ||
    compact === "llm" ||
    compact.includes("chatgpt") ||
    compact.includes("openai") ||
    compact.includes("perplexity") ||
    compact.includes("claude") ||
    compact.includes("gemini") ||
    /^gpt\d*$/.test(compact) ||
    /\bai\b/.test(text) ||
    text.includes("chat gpt") ||
    text.includes("chat-gpt") ||
    /\bcopilot\b/.test(text) ||
    text.includes("ai search")
  ) {
    return "ai";
  }

  if (
    compact === "google" ||
    compact === "googlesearch" ||
    compact === "googlecom" ||
    /\bgoogle\b/.test(text)
  ) {
    return "google";
  }
  if (compact === "linkedin" || text === "linked in") return "linkedin";
  if (compact === "instagram" || compact === "insta" || /^ig\b/.test(text)) {
    return "instagram";
  }
  if (compact === "facebook" || compact === "fb" || compact === "meta") {
    return "facebook";
  }
  if (compact === "tiktok" || text === "tik tok") return "tiktok";
  if (compact === "youtube" || compact === "yt") return "youtube";
  if (
    compact === "twitter" ||
    compact === "x" ||
    text === "twitter/x" ||
    text === "x.com" ||
    text === "x / twitter"
  ) {
    return "twitter/x";
  }

  if (
    text === "existing customer" ||
    text === "existing client" ||
    text === "customer" ||
    text === "returning customer"
  ) {
    return "existing customer";
  }
  if (
    text === "referral" ||
    text.startsWith("referral") ||
    text.includes("word of mouth") ||
    text.includes("colleague") ||
    text.includes("recommend") ||
    text === "friend" ||
    text === "a friend" ||
    /\bclient\b/.test(text)
  ) {
    return "referral";
  }
  if (text.includes("agency") || text === "partner" || text === "partners") {
    return "agency or partner";
  }
  if (
    text.includes("trade show") ||
    text.includes("tradeshow") ||
    text.includes("exhibition") ||
    text.includes("trade show or event") ||
    text === "event" ||
    text === "events"
  ) {
    return "trade show or event";
  }
  if (
    text.includes("podcast") ||
    text.includes("article") ||
    text === "press" ||
    /\bpress\b/.test(text)
  ) {
    return "article, podcast, or press";
  }
  if (
    compact === "email" ||
    compact === "newsletter" ||
    text === "e-mail" ||
    text === "e mail"
  ) {
    return "email";
  }
  if (compact === "other" || text === "n/a" || text === "na" || text === "none") {
    return "other";
  }

  return text;
}

type ReferralOutcome =
  | { kind: "blank" }
  | { kind: "undecryptable" }
  | { kind: "answer"; label: string };

function referralFromExtra(
  extra: string | undefined,
  decryptText: (value: string) => string
): ReferralOutcome {
  if (!extra?.trim()) return { kind: "blank" };
  const decrypted = decryptText(extra);
  if (!decrypted) return { kind: "blank" };
  if (decrypted === UNABLE_TO_DECRYPT) return { kind: "undecryptable" };

  let parsed: unknown;
  try {
    parsed = JSON.parse(decrypted);
  } catch {
    return { kind: "undecryptable" };
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return { kind: "blank" };
  }

  const value = (parsed as Record<string, unknown>).referralSource;
  if (typeof value !== "string") return { kind: "blank" };
  const label = normaliseReferral(value);
  if (!label) return { kind: "blank" };
  return { kind: "answer", label };
}

function productLabels(doc: EnquiryProjection): string[] {
  const fromTypes = Array.isArray(doc.packagingTypes)
    ? doc.packagingTypes
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim())
        .filter((item) => item.length > 0 && item.length <= 80)
        .filter((item) => !containsEmail(item) && !containsPhone(item))
    : [];
  if (fromTypes.length > 0) return [...new Set(fromTypes)];

  const product = doc.productType?.trim() ?? "";
  if (
    product &&
    product.length <= 80 &&
    !containsEmail(product) &&
    !containsPhone(product)
  ) {
    return [product];
  }

  const service = doc.source ? SERVICE_BY_SOURCE[doc.source] : undefined;
  return service ? [service] : [];
}

function emptyMonthCounts(): Record<ReportMonth, number> {
  return { "2026-08": 0, "2026-09": 0, "2026-10": 0, "2026-11": 0 };
}

function padEnd(value: string, width: number): string {
  return value.length >= width ? value : value + " ".repeat(width - value.length);
}

function renderTable(
  rowHeader: string,
  columns: string[],
  rows: { label: string; values: number[] }[]
): string {
  const labelWidth = Math.max(rowHeader.length, ...rows.map((row) => row.label.length));
  const widths = columns.map((column, index) =>
    Math.max(column.length, ...rows.map((row) => String(row.values[index] ?? 0).length))
  );
  const header =
    padEnd(rowHeader, labelWidth) +
    "  " +
    columns.map((column, index) => column.padStart(widths[index])).join("  ");
  const body = rows.map(
    (row) =>
      padEnd(row.label, labelWidth) +
      "  " +
      row.values.map((value, index) => String(value).padStart(widths[index])).join("  ")
  );
  return [header, ...body].join("\n");
}

async function main(): Promise<void> {
  stubServerOnly();
  loadEnv();

  const projectId = requiredEnv("NEXT_PUBLIC_SANITY_PROJECT_ID");
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
  const apiVersion =
    process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2026-03-13";
  const readToken = requiredEnv("SANITY_API_READ_TOKEN");
  if (
    !process.env.ENQUIRY_ENCRYPTION_KEY?.trim() &&
    !process.env.KNOWLEDGE_ADMIN_TOKEN?.trim()
  ) {
    console.error(
      "Missing required env var: ENQUIRY_ENCRYPTION_KEY (or KNOWLEDGE_ADMIN_TOKEN)"
    );
    process.exit(1);
  }

  const { decryptText } = await import("../lib/enquiries/crypto");

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: readToken,
    perspective: "published",
  });

  const docs = await client.fetch<EnquiryProjection[]>(
    `*[_type == "enquiry"]{
      submittedAt,
      _createdAt,
      extra,
      productType,
      packagingTypes,
      source
    }`,
    {},
    { perspective: "published" }
  );

  const totals = emptyMonthCounts();
  const blanks = emptyMonthCounts();
  const undecryptable = emptyMonthCounts();
  const answers = new Map<string, Record<ReportMonth, number>>();
  const products = new Map<ReportMonth, Map<string, number>>(
    REPORT_MONTHS.map((month) => [month, new Map()])
  );
  let outsideWindow = 0;

  for (const doc of docs) {
    const month = monthKey(doc.submittedAt || doc._createdAt);
    if (!month) {
      outsideWindow += 1;
      continue;
    }

    totals[month] += 1;
    const referral = referralFromExtra(doc.extra, decryptText);
    if (referral.kind === "blank") blanks[month] += 1;
    else if (referral.kind === "undecryptable") undecryptable[month] += 1;
    else {
      const row = answers.get(referral.label) ?? emptyMonthCounts();
      row[month] += 1;
      answers.set(referral.label, row);
    }

    const productCounts = products.get(month);
    if (!productCounts) continue;
    for (const label of productLabels(doc)) {
      productCounts.set(label, (productCounts.get(label) ?? 0) + 1);
    }
  }

  const monthHeaders = REPORT_MONTHS.map((month) => MONTH_LABEL[month]);
  const columns = [...monthHeaders, "Total"];
  const withTotal = (counts: Record<ReportMonth, number>): number[] => {
    const values = REPORT_MONTHS.map((month) => counts[month]);
    return [...values, values.reduce((sum, value) => sum + value, 0)];
  };

  const answerRows = [...answers.entries()]
    .map(([label, counts]) => ({ label, values: withTotal(counts) }))
    .sort((a, b) => {
      const totalA = a.values[a.values.length - 1] ?? 0;
      const totalB = b.values[b.values.length - 1] ?? 0;
      return totalB - totalA || a.label.localeCompare(b.label, "en-GB");
    });

  const summaryRows = [
    ...answerRows,
    { label: BLANK, values: withTotal(blanks) },
  ];
  const undecryptableTotal = REPORT_MONTHS.reduce(
    (sum, month) => sum + undecryptable[month],
    0
  );
  if (undecryptableTotal > 0) {
    summaryRows.push({ label: UNDECRYPTABLE, values: withTotal(undecryptable) });
  }
  summaryRows.push({ label: "total enquiries", values: withTotal(totals) });

  const lines: string[] = [
    "Referral report (read-only)",
    "Window: Aug–Nov 2026 (Europe/London)",
    `Enquiries read: ${docs.length}`,
    `Outside window: ${outsideWindow}`,
    "",
    "Referral answer × month. Free text is lowercased, trimmed, and grouped.",
    "Blank means the referral field was empty or absent.",
    "",
    renderTable("referral", columns, summaryRows),
    "",
    "Top 5 products or services per month.",
    "Uses packaging types when stored, otherwise the product field, otherwise the form (cost audit or packaging review).",
    "An enquiry with several packaging types is counted once for each.",
    "",
  ];

  for (const month of REPORT_MONTHS) {
    lines.push(MONTH_LABEL[month]);
    const ranked = [...(products.get(month)?.entries() ?? [])].sort(
      (a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "en-GB")
    );
    const top = ranked.slice(0, 5);
    if (top.length === 0) {
      lines.push("  No product or service stored.");
    } else {
      top.forEach(([label, count], index) => {
        lines.push(`  ${index + 1}. ${label}  ${count}`);
      });
    }
    lines.push("");
  }

  console.log(lines.join("\n").trimEnd());
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Report failed";
  console.error(message);
  process.exit(1);
});
