/**
 * Read-only Sanity content hygiene report.
 *
 * Writes docs/content-audit.md. Does not mutate Sanity.
 * Uses SANITY_API_READ_TOKEN only. The write token is never read.
 *
 *   npm run audit:content
 *
 * Env (shell, else .env, else .env.local — shell wins):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID     required
 *   SANITY_API_READ_TOKEN             required
 *   NEXT_PUBLIC_SANITY_DATASET        optional, default "production"
 *   NEXT_PUBLIC_SANITY_API_VERSION    optional, default "2026-03-13"
 */

import { createRequire } from "node:module";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  allNumbers,
  CONTENT_TYPES,
  createReadClient,
  dedupeNumbers,
  docLabel,
  docTitle,
  fetchContentDocuments,
  hasHiddenChars,
  hiddenCharSummary,
  isRecord,
  loadEnv,
  mdCell,
  moqSentences,
  numbersNearMoq,
  previewText,
  publicationState,
  readString,
  type SanityDoc,
  slugOf,
  stripStega,
  walkStrings,
} from "./content-hygiene";

const REPORT_PATH = path.join(process.cwd(), "docs", "content-audit.md");
const SEO_FIELD = /(?:^|\.)seo\.(title|description)$/;
const MOQ_MENTION = /\bMOQs?\b|minimum|min\.?\s*order|order quantity/i;

interface StegaHit {
  doc: SanityDoc;
  path: string;
  summary: string;
  preview: string;
}

interface MoqRow {
  source: string;
  value: string;
  numbers: number[];
}

interface MoqReport {
  doc: SanityDoc;
  rows: MoqRow[];
  status: "match" | "mismatch" | "single" | "none";
}

interface FeatureUse {
  path: string;
  title: string;
}

interface DuplicateGroup {
  doc: SanityDoc;
  body: string;
  uses: FeatureUse[];
}

interface YearHit {
  doc: SanityDoc;
  path: string;
  years: number[];
  preview: string;
}

function arrayPath(base: string, item: unknown, index: number, field?: string): string {
  const key = isRecord(item) && typeof item._key === "string" ? item._key : null;
  const segment = key ? `${base}[_key==${JSON.stringify(key)}]` : `${base}[${index}]`;
  return field ? `${segment}.${field}` : segment;
}

function absent(source: string): MoqRow {
  return { source, value: "—", numbers: [] };
}

function row(source: string, raw: string, numbers: number[]): MoqRow {
  const clean = stripStega(raw).replace(/\s+/g, " ").trim();
  return {
    source,
    value: clean || "—",
    numbers: dedupeNumbers(numbers),
  };
}

function variantsIn(text: string): Array<"digital" | "flexo" | "default"> {
  const lower = text.toLowerCase();
  const named: Array<"digital" | "flexo"> = [];
  if (lower.includes("digital")) named.push("digital");
  if (lower.includes("flexo")) named.push("flexo");
  return named.length > 0 ? named : ["default"];
}

function numbersForVariant(text: string, variant: "digital" | "flexo"): number[] {
  const found: number[] = [];
  for (const match of text.matchAll(new RegExp(variant, "ig"))) {
    const at = match.index ?? 0;
    const before = allNumbers(text.slice(Math.max(0, at - 32), at));
    if (before.length > 0) {
      found.push(before[before.length - 1]);
      continue;
    }
    const after = allNumbers(text.slice(at + match[0].length, at + match[0].length + 40));
    if (after.length > 0) found.push(after[0]);
  }
  return dedupeNumbers(found);
}

function moqStatus(rows: MoqRow[]): MoqReport["status"] {
  const groups = new Map<string, number[][]>();
  const add = (variant: string, numbers: number[]) => {
    const unique = dedupeNumbers(numbers);
    if (unique.length === 0) return;
    const list = groups.get(variant) ?? [];
    list.push(unique);
    groups.set(variant, list);
  };

  for (const entry of rows) {
    if (entry.value === "—") continue;
    const variants = variantsIn(`${entry.source} ${entry.value}`);
    if (variants.length === 1) {
      add(variants[0], entry.numbers);
      continue;
    }
    for (const variant of variants) {
      if (variant === "default") continue;
      add(variant, numbersForVariant(entry.value, variant));
    }
  }

  const numericRows = rows.filter((entry) => entry.numbers.length > 0);
  if (numericRows.length === 0) return "none";

  let mismatch = false;
  for (const sets of groups.values()) {
    const signatures = new Set(sets.map((set) => set.join(",")));
    if (signatures.size > 1) mismatch = true;
  }

  const named = ["digital", "flexo"].filter((name) => groups.has(name));
  if (named.length > 0 && groups.has("default")) {
    const namedSignatures = new Set(
      named.flatMap((name) => (groups.get(name) ?? []).map((set) => set.join(",")))
    );
    for (const set of groups.get("default") ?? []) {
      if (!namedSignatures.has(set.join(","))) mismatch = true;
    }
  }

  if (mismatch) return "mismatch";
  return numericRows.length === 1 ? "single" : "match";
}

function productMoq(doc: SanityDoc): MoqReport {
  const rows: MoqRow[] = [];

  const seo = isRecord(doc.seo) ? doc.seo : null;
  const seoDescription = readString(seo?.description);
  if (seoDescription && MOQ_MENTION.test(stripStega(seoDescription))) {
    const sentences = moqSentences(seoDescription);
    rows.push(row("seo.description", sentences, numbersNearMoq(seoDescription)));
  } else {
    rows.push(absent("seo.description"));
  }

  const heroStats = Array.isArray(doc.heroStats) ? doc.heroStats : [];
  let heroHits = 0;
  heroStats.forEach((stat, index) => {
    if (!isRecord(stat)) return;
    const val = readString(stat.val) ?? readString(stat.value) ?? "";
    const lbl = readString(stat.lbl) ?? readString(stat.label) ?? "";
    const combined = `${stripStega(val)} ${stripStega(lbl)}`.trim();
    if (!combined || !MOQ_MENTION.test(combined)) return;
    heroHits += 1;
    const source = `${arrayPath("heroStats", stat, index)} (${stripStega(lbl) || "unlabelled"})`;
    const shown = [stripStega(val), stripStega(lbl)].filter((part) => part.trim()).join(" — ");
    rows.push(row(source, shown || combined, allNumbers(stripStega(`${val} ${lbl}`))));
  });
  if (heroHits === 0) rows.push(absent("heroStats"));

  const specs = isRecord(doc.specs) ? doc.specs : null;
  const specsMoq = specs ? readString(specs.moq) : undefined;
  if (specsMoq !== undefined) {
    rows.push(row("specs.moq", specsMoq, allNumbers(stripStega(specsMoq))));
  } else {
    rows.push(absent("specs.moq"));
  }

  const detailed = Array.isArray(doc.detailedSpecs) ? doc.detailedSpecs : [];
  let detailedHits = 0;
  detailed.forEach((spec, index) => {
    if (!isRecord(spec)) return;
    const label = readString(spec.label) ?? "";
    const value = readString(spec.value) ?? "";
    if (!MOQ_MENTION.test(`${stripStega(label)} ${stripStega(value)}`)) return;
    detailedHits += 1;
    const source = `${arrayPath("detailedSpecs", spec, index)} (${stripStega(label) || "unlabelled"})`;
    rows.push(row(source, value, allNumbers(stripStega(value))));
  });
  if (detailedHits === 0) rows.push(absent("detailedSpecs MOQ rows"));

  const moqFromFields = findNamedFields(doc, "moqFrom");
  if (moqFromFields.length === 0) {
    rows.push(absent("moqFrom"));
  } else {
    for (const field of moqFromFields) {
      const text =
        typeof field.value === "number"
          ? String(field.value)
          : typeof field.value === "string"
            ? field.value
            : JSON.stringify(field.value);
      rows.push(row(field.path, text, allNumbers(stripStega(text))));
    }
  }

  const faqs = Array.isArray(doc.faqs) ? doc.faqs : [];
  let faqHits = 0;
  faqs.forEach((faq, index) => {
    if (!isRecord(faq)) return;
    const answer = readString(faq.answer);
    if (!answer || !MOQ_MENTION.test(stripStega(answer))) return;
    faqHits += 1;
    const question = stripStega(readString(faq.question) ?? "").trim();
    const source = question
      ? `${arrayPath("faqs", faq, index, "answer")} — ${question}`
      : arrayPath("faqs", faq, index, "answer");
    rows.push(row(source, moqSentences(answer), numbersNearMoq(answer)));
  });
  if (faqHits === 0) rows.push(absent("FAQ answers"));

  return { doc, rows, status: moqStatus(rows) };
}

function findNamedFields(
  value: unknown,
  keyName: string,
  currentPath = ""
): { path: string; value: unknown }[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) =>
      findNamedFields(item, keyName, arrayPath(currentPath, item, index))
    );
  }
  if (!isRecord(value)) return [];

  const hits: { path: string; value: unknown }[] = [];
  for (const [key, child] of Object.entries(value)) {
    if (key.startsWith("_")) continue;
    const next = currentPath ? `${currentPath}.${key}` : key;
    if (key === keyName) hits.push({ path: next, value: child });
    hits.push(...findNamedFields(child, keyName, next));
  }
  return hits;
}

function featureDuplicates(doc: SanityDoc): DuplicateGroup[] {
  if (!Array.isArray(doc.features)) return [];

  const groups = new Map<string, { body: string; uses: FeatureUse[] }>();
  doc.features.forEach((feature, index) => {
    let title = "(untitled)";
    let body = "";
    let fieldPath = `features[${index}]`;

    if (typeof feature === "string") {
      body = feature;
      title = "(string feature)";
    } else if (isRecord(feature)) {
      fieldPath = arrayPath("features", feature, index, "body");
      title = stripStega(readString(feature.title) ?? "").trim() || "(untitled)";
      body = readString(feature.body) ?? "";
    } else {
      return;
    }

    const normalised = stripStega(body).replace(/\s+/g, " ").trim();
    if (!normalised) return;
    const existing = groups.get(normalised);
    const use = { path: fieldPath, title };
    if (existing) existing.uses.push(use);
    else groups.set(normalised, { body: normalised, uses: [use] });
  });

  return [...groups.values()]
    .filter((group) => group.uses.length > 1)
    .map((group) => ({ doc, body: group.body, uses: group.uses }));
}

function stegaHits(docs: SanityDoc[]): StegaHit[] {
  const hits: StegaHit[] = [];
  for (const doc of docs) {
    for (const field of walkStrings(doc)) {
      if (!hasHiddenChars(field.value)) continue;
      hits.push({
        doc,
        path: field.path,
        summary: hiddenCharSummary(field.value),
        preview: previewText(stripStega(field.value)),
      });
    }
  }
  return hits;
}

function yearHits(docs: SanityDoc[]): YearHit[] {
  const hits: YearHit[] = [];
  for (const doc of docs) {
    for (const field of walkStrings(doc)) {
      if (!SEO_FIELD.test(field.path)) continue;
      const clean = stripStega(field.value);
      const years = dedupeNumbers(
        [...clean.matchAll(/\b(?:19|20)\d{2}\b/g)]
          .map((match) => Number(match[0]))
          .filter((year) => year < 2027)
      );
      if (years.length === 0) continue;
      hits.push({
        doc,
        path: field.path,
        years,
        preview: previewText(clean, 180),
      });
    }
  }
  return hits;
}

function statusLabel(status: MoqReport["status"]): string {
  if (status === "mismatch") return "Mismatch";
  if (status === "match") return "Match";
  if (status === "single") return "Single source";
  return "No MOQ values";
}

function formatNumbers(values: number[]): string {
  return values.length > 0 ? values.join(", ") : "—";
}

function heading(doc: SanityDoc): string {
  return `${doc._type} · ${docLabel(doc)} · \`${doc._id}\` · ${publicationState(doc._id)}`;
}

type AgreedSlug = "mailer-boxes" | "shipping-boxes" | "printed-tubes" | "printed-cans";

interface AgreedMoq {
  digital: number | null;
  litho: number | null;
  flexo: number | null;
  lowest: number;
}

/** Final MOQs. null means that route is not offered. */
const AGREED_MOQ: Record<AgreedSlug, AgreedMoq> = {
  "mailer-boxes": { digital: 500, litho: 1000, flexo: 3000, lowest: 500 },
  "shipping-boxes": { digital: null, litho: null, flexo: 1000, lowest: 1000 },
  "printed-tubes": { digital: null, litho: 1000, flexo: null, lowest: 1000 },
  "printed-cans": { digital: 1000, litho: null, flexo: null, lowest: 1000 },
};

const AGREED_SLUGS = Object.keys(AGREED_MOQ) as AgreedSlug[];

const PRODUCT_MENTION: Record<AgreedSlug, RegExp> = {
  "mailer-boxes": /mailer box(?:es)?/i,
  "shipping-boxes": /shipping box(?:es)?/i,
  "printed-tubes": /(?:paper|printed) tubes?/i,
  "printed-cans": /printed cans?|aluminium cans?/i,
};

interface Drift {
  source: string;
  path: string;
  reasons: string[];
  excerpt: string;
}

interface FallbackProduct {
  slug: string;
  moqFrom?: number;
  shortDescription?: string;
  description?: string;
  facts?: string[];
  features?: Array<string | { title?: string; body?: string }>;
  specs?: { moq?: string; printOptions?: string };
  detailedSpecs?: Array<{ label?: string; value?: string }>;
  seo?: { title?: string; description?: string };
  heroStats?: Array<{ val?: string; lbl?: string }>;
  faqs?: Array<{ question?: string; answer?: string }>;
}

function offeredNumbers(slug: AgreedSlug): number[] {
  const agreed = AGREED_MOQ[slug];
  return [agreed.digital, agreed.litho, agreed.flexo].filter(
    (value): value is number => value !== null
  );
}

function quantityNumbers(text: string): number[] {
  const found = [...numbersNearMoq(text)];
  const pattern =
    /(\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?)(\s*[kK])?(?=\s*(?:\+(?!\d)|units\b|quantity\b|cans\b)|\s*\(?\s*(?:digital|litho|flexo|offset)\b)/gi;
  for (const match of text.matchAll(pattern)) {
    if (match[1].startsWith("0")) continue;
    let value = Number(match[1].replace(/,/g, ""));
    if (!Number.isFinite(value)) continue;
    if (match[2]) value = Math.round(value * 1000);
    found.push(value);
  }
  return dedupeNumbers(found);
}

function isQuantityClaim(text: string): boolean {
  return /\bMOQ\b|\bminimum\b|\bfrom\s+\d|\bstarts?\s+from\b|\bat\s+\d[\d,]*\s+quantity/i.test(
    text
  );
}

function withoutDenials(text: string, route: string): string {
  const pattern = new RegExp(
    `[^.!?\\n]*(?:do not|don't|dont|not offer|no ${route})[^.!?\\n]*${route}[^.!?\\n]*`,
    "gi"
  );
  return text.replace(pattern, " ");
}

function mentionsRoute(text: string, route: "digital" | "litho" | "flexo" | "offset"): boolean {
  const kept = withoutDenials(text, route);
  if (route === "offset") return /\boffset\b/i.test(kept);
  return new RegExp(`\\b${route}`, "i").test(kept);
}

function formatQuantity(value: number): string {
  return value.toLocaleString("en-GB");
}

function driftFor(
  slug: AgreedSlug,
  source: string,
  fieldPath: string,
  text: string,
  dedicated: boolean,
  flagVague = false
): Drift | null {
  const clean = stripStega(text).replace(/\s+/g, " ").trim();
  if (!clean) return null;

  const agreed = AGREED_MOQ[slug];
  const allowed = new Set(offeredNumbers(slug));
  const numbers = dedicated ? dedupeNumbers(allNumbers(clean)) : quantityNumbers(clean);
  const reasons: string[] = [];

  for (const value of numbers) {
    if (!allowed.has(value)) {
      reasons.push(`${formatQuantity(value)} is not an agreed MOQ`);
    }
  }

  const claim = dedicated || isQuantityClaim(clean);
  if (claim && allowed.size > 1 && numbers.length > 0) {
    const missing = [...allowed].filter((value) => !numbers.includes(value));
    if (missing.length > 0) {
      reasons.push(
        `omits ${missing.map((value) => formatQuantity(value)).join(", ")}`
      );
    }
  }

  if (dedicated && numbers.length === 0) {
    reasons.push("does not state an agreed quantity");
  }

  if (agreed.digital === null && mentionsRoute(clean, "digital")) {
    reasons.push("digital is not offered");
  }
  if (agreed.litho === null && (mentionsRoute(clean, "litho") || mentionsRoute(clean, "offset"))) {
    reasons.push("litho/offset is not offered");
  }
  if (agreed.flexo === null && mentionsRoute(clean, "flexo")) {
    reasons.push("flexo is not offered");
  }
  if (
    flagVague &&
    /\blow MOQs?\b|more flexible on volume|volumes are flexible/i.test(clean) &&
    !numbers.some((value) => allowed.has(value))
  ) {
    reasons.push("describes the minimum as flexible instead of the agreed quantity");
  }

  if (reasons.length === 0) return null;
  return { source, path: fieldPath, reasons, excerpt: previewText(clean, 180) };
}

function pushDrift(drifts: Drift[], drift: Drift | null): void {
  if (drift) drifts.push(drift);
}

function productFieldDrifts(slug: AgreedSlug, source: string, product: FallbackProduct): Drift[] {
  const drifts: Drift[] = [];
  const check = (fieldPath: string, text: string | undefined, dedicated: boolean) => {
    if (!text) return;
    pushDrift(drifts, driftFor(slug, source, fieldPath, text, dedicated));
  };

  if (product.moqFrom !== undefined && product.moqFrom !== AGREED_MOQ[slug].lowest) {
    drifts.push({
      source,
      path: "moqFrom",
      reasons: [
        `moqFrom is ${formatQuantity(product.moqFrom)}; agreed lowest is ${formatQuantity(AGREED_MOQ[slug].lowest)}`,
      ],
      excerpt: String(product.moqFrom),
    });
  }

  check("shortDescription", product.shortDescription, false);
  check("description", product.description, false);
  check("specs.moq", product.specs?.moq, true);
  check("specs.printOptions", product.specs?.printOptions, false);
  check("seo.title", product.seo?.title, false);
  check("seo.description", product.seo?.description, false);

  product.facts?.forEach((fact, index) => check(`facts[${index}]`, fact, false));
  product.features?.forEach((feature, index) => {
    if (typeof feature === "string") {
      check(`features[${index}]`, feature, false);
      return;
    }
    check(`features[${index}].title`, feature.title, false);
    check(`features[${index}].body`, feature.body, false);
  });
  product.detailedSpecs?.forEach((spec, index) => {
    const label = spec.label ?? "";
    const dedicated = MOQ_MENTION.test(`${label} ${spec.value ?? ""}`);
    check(`detailedSpecs[${index}] (${label || "unlabelled"})`, spec.value, dedicated);
  });
  product.heroStats?.forEach((stat, index) => {
    const label = stat.lbl ?? "";
    const value = stat.val ?? "";
    const combined = `${value} ${label}`.trim();
    const dedicated =
      MOQ_MENTION.test(combined) ||
      (/digital|litho|flexo|offset/i.test(combined) && allNumbers(combined).length > 0);
    check(`heroStats[${index}] (${label || "unlabelled"})`, combined, dedicated);
  });
  product.faqs?.forEach((faq, index) => {
    check(
      `faqs[${index}] ${faq.question ?? ""}`.trim(),
      `${faq.question ?? ""} ${faq.answer ?? ""}`.trim(),
      false
    );
  });

  return drifts;
}

function sentenceDrifts(source: string, fieldPath: string, text: string): Drift[] {
  const clean = stripStega(text);
  const sentences = clean
    .split(/(?<=(?<!\d)[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
  const drifts: Drift[] = [];
  sentences.forEach((sentence, index) => {
    for (const slug of AGREED_SLUGS) {
      if (!PRODUCT_MENTION[slug].test(sentence)) continue;
      pushDrift(
        drifts,
        driftFor(slug, source, `${fieldPath} sentence ${index + 1}`, sentence, false, true)
      );
    }
  });
  return drifts;
}

function sanityProductDrifts(docs: SanityDoc[]): Drift[] {
  const drifts: Drift[] = [];
  for (const doc of docs) {
    if (doc._type !== "product") continue;
    const slug = slugOf(doc);
    if (!slug || !AGREED_SLUGS.includes(slug as AgreedSlug)) continue;
    const agreedSlug = slug as AgreedSlug;
    const source = `Sanity \`${doc._id}\``;
    const specs = isRecord(doc.specs) ? doc.specs : undefined;
    drifts.push(
      ...productFieldDrifts(agreedSlug, source, {
        slug,
        shortDescription: readString(doc.shortDescription),
        description: readString(doc.description),
        facts: Array.isArray(doc.facts)
          ? doc.facts.filter((fact): fact is string => typeof fact === "string")
          : [],
        features: Array.isArray(doc.features)
          ? doc.features.flatMap((feature) =>
              isRecord(feature)
                ? [{ title: readString(feature.title), body: readString(feature.body) }]
                : []
            )
          : [],
        specs: {
          moq: readString(specs?.moq),
          printOptions: readString(specs?.printOptions),
        },
        detailedSpecs: Array.isArray(doc.detailedSpecs)
          ? doc.detailedSpecs.flatMap((spec) =>
              isRecord(spec)
                ? [{ label: readString(spec.label), value: readString(spec.value) }]
                : []
            )
          : [],
        seo: isRecord(doc.seo)
          ? { title: readString(doc.seo.title), description: readString(doc.seo.description) }
          : undefined,
        heroStats: Array.isArray(doc.heroStats)
          ? doc.heroStats.flatMap((stat) =>
              isRecord(stat) ? [{ val: readString(stat.val), lbl: readString(stat.lbl) }] : []
            )
          : [],
        faqs: Array.isArray(doc.faqs)
          ? doc.faqs.flatMap((faq) =>
              isRecord(faq)
                ? [{ question: readString(faq.question), answer: readString(faq.answer) }]
                : []
            )
          : [],
      })
    );
  }
  return drifts;
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

async function codeFallbackDrifts(): Promise<Drift[]> {
  stubServerOnly();
  const legacy = await import("../lib/content/legacyProducts");
  const contact = await import("../lib/content/contact");
  const hub = await import("../lib/content/knowledgeHub");
  const drifts: Drift[] = [];

  for (const product of legacy.products as FallbackProduct[]) {
    if (!AGREED_SLUGS.includes(product.slug as AgreedSlug)) continue;
    drifts.push(
      ...productFieldDrifts(
        product.slug as AgreedSlug,
        "code fallback `lib/content/legacyProducts.ts`",
        product
      )
    );
  }

  const notice = contact.fallbackContactPageContent.moqNotice;
  for (const item of notice.items) {
    const slug = AGREED_SLUGS.find((candidate) =>
      PRODUCT_MENTION[candidate].test(item.product)
    );
    if (!slug) continue;
    pushDrift(
      drifts,
      driftFor(
        slug,
        "code fallback `lib/content/contact.ts`",
        `moqNotice.items ${item.product}`,
        `${item.product} ${item.quantity} ${item.note ?? ""}`,
        false
      )
    );
  }
  drifts.push(
    ...sentenceDrifts(
      "code fallback `lib/content/contact.ts`",
      "moqNotice.footnote",
      notice.footnote
    )
  );

  for (const category of hub.fallbackKnowledgeHubContent.faqCategories) {
    for (const faq of category.faqs) {
      drifts.push(
        ...sentenceDrifts(
          "code fallback `lib/content/knowledgeHub.ts`",
          faq.q,
          `${faq.q} ${faq.a}`
        )
      );
    }
  }

  for (const relativePath of [
    "lib/content/home.ts",
    "components/sections/HeroSpread.tsx",
    "components/sections/KnowledgeHub.tsx",
    "app/api/chat/route.ts",
    "PIPELINE_KNOWLEDGE_BASE.md",
  ]) {
    const text = readFileSync(path.join(process.cwd(), relativePath), "utf8");
    text.split(/\r?\n/).forEach((line, index) => {
      drifts.push(
        ...sentenceDrifts(
          `code fallback \`${relativePath}\``,
          `${relativePath}:${index + 1}`,
          line
        )
      );
    });
  }

  return drifts;
}

function hubDocumentDrifts(docs: SanityDoc[]): Drift[] {
  const drifts: Drift[] = [];
  for (const doc of docs) {
    if (doc._type !== "knowledgeHubPage" && doc._type !== "contactPage") continue;
    const source = `Sanity \`${doc._id}\``;
    for (const field of walkStrings(doc)) {
      if (!AGREED_SLUGS.some((slug) => PRODUCT_MENTION[slug].test(field.value))) continue;
      drifts.push(...sentenceDrifts(source, field.path, field.value));
    }
  }
  return drifts;
}

function stegaSection(): string {
  return `## Stega and visual editing

### Production fetches

\`lib/sanity/client.ts\` builds both \`sanityClient\` and \`sanityPreviewClient\` with \`stega: { studioUrl: "/backstage" }\`. In \`@sanity/client\` the default is \`stega.enabled: false\`. Passing that object merges \`studioUrl\` onto the default and leaves encoding off. \`studioUrl\` is only used once a fetch sets \`stega: true\`; the client requires it in that case, which is why it is set on the client.

\`lib/sanity/fetch.ts\` is the fetch the site uses. It checks \`draftMode()\`:

- Draft mode on: \`perspective: "drafts"\`, \`stega: true\`, no cache.
- Draft mode off: \`perspective: "published"\`, \`stega: false\`, with tag revalidation.

A normal production render does not enable draft mode, so the fetch passes \`stega: false\`. Stega characters are not inserted into the HTML on those requests.

Presentation (\`sanity/presentation.ts\`) enables draft mode through \`/api/draft-mode/enable\`. That preview session is the one that fetches with stega on. \`components/ui/AccentHeading.tsx\` leaves those characters untouched in draft mode so the click-to-edit overlay can map the rendered text back to a field.

### How the characters get into stored content

Stega is a response transform. Content Lake does not store the characters on its own. They land in a document when an already-encoded string is saved.

The likely routes:

1. Copying text from the Presentation preview, where stega is on, and pasting it into a Studio field. The invisible characters travel on the clipboard.
2. A script or mutation that fetched with stega enabled and wrote the encoded strings back.
3. A visual-editing control writing the encoded preview string into the field without running \`stegaClean\` before save.

\`lib/content/products.ts\`, \`lib/content/home.ts\`, \`lib/content/costAudit.ts\` and \`lib/content/packagingReview.ts\` strip a wider zero-width range when they read. That hides stored characters on the page. It does not delete them from the dataset. This audit fetches with \`stega: false\` and perspective \`raw\`, so a hit below is stored content, including drafts.

\`stegaClean\` from \`@sanity/client/stega\` removes runs of four or more characters from the official alphabet (U+200B–U+200D, U+2060–U+2063, U+FEFF, and U+1D173–U+1D17A). The cleaner runs \`stegaClean\`, then strips the requested ranges at any length, including a single character and U+2064, and any leftover musical-symbol code points from that alphabet.`;
}

function renderReport(input: {
  generatedAt: string;
  dataset: string;
  projectId: string;
  docs: SanityDoc[];
  stega: StegaHit[];
  moq: MoqReport[];
  duplicates: DuplicateGroup[];
  years: YearHit[];
  drifts: Drift[];
}): string {
  const { generatedAt, dataset, projectId, docs, stega, moq, duplicates, years, drifts } = input;
  const mismatches = moq.filter((entry) => entry.status === "mismatch");
  const byType = new Map<string, number>();
  for (const doc of docs) byType.set(doc._type, (byType.get(doc._type) ?? 0) + 1);

  const lines: string[] = [
    "# Content audit",
    "",
    `Generated ${generatedAt}. Read-only. Nothing was written to Sanity.`,
    "",
    `Project \`${projectId}\`, dataset \`${dataset}\`, perspective \`raw\`, stega encoding off. Drafts, published documents and version documents are separate rows.`,
    "",
    `Documents scanned: **${docs.length}**.`,
    "",
    ...[...byType.entries()].map(([type, count]) => `- ${type}: ${count}`),
    "",
    "## Summary",
    "",
    `- Zero-width or stega fields: **${stega.length}**`,
    `- Products with disagreeing MOQ numbers: **${mismatches.length}** of ${moq.length}`,
    `- Duplicated feature-body groups: **${duplicates.length}**`,
    `- SEO titles or descriptions containing a year before 2027: **${years.length}**`,
    `- Agreed-MOQ drift on mailer boxes, shipping boxes, printed tubes and printed cans: **${drifts.length}**`,
    "",
    stegaSection(),
    "",
    "## 1. Zero-width and stega characters",
    "",
    "A field is listed when it contains U+200B–U+200D, U+FEFF, U+2060–U+2064, a run of those, or a code point from the official stega alphabet (U+1D173–U+1D17A). The preview is the text after those characters are removed.",
    "",
  ];

  if (stega.length === 0) {
    lines.push("No stored fields contain those characters.", "");
  } else {
    let currentId = "";
    for (const hit of stega) {
      if (hit.doc._id !== currentId) {
        if (currentId) lines.push("");
        currentId = hit.doc._id;
        lines.push(`### ${heading(hit.doc)}`, "");
        lines.push("| Field | Characters | Clean preview |", "| --- | --- | --- |");
      }
      lines.push(
        `| \`${mdCell(hit.path)}\` | ${mdCell(hit.summary)} | ${mdCell(hit.preview) || "—"} |`
      );
    }
    lines.push("");
  }

  lines.push(
    "## 2. Product MOQ values",
    "",
    "Each product document is shown with every MOQ-bearing value found in `seo.description`, `heroStats` (value or label mentions MOQ, minimum, or order quantity), `specs.moq`, `detailedSpecs` rows whose label or value mentions MOQ or minimum, `moqFrom` anywhere on the document, and FAQ answers that mention minimum or MOQ.",
    "",
    "Numbers in prose are taken from the sentence next to that mention, so a lead time or a price is not treated as an MOQ. `1K` is read as 1,000. Dedicated MOQ fields contribute every number in the field. Digital and flexo figures are compared with their own kind. An unlabeled figure mismatches when it is not the same set as one of those labelled figures. A **mismatch** is two different number sets in the same group, including a single figure against a range. An empty source is not a mismatch. `moqFrom` is not on the product schema; it is reported when a document still has the field.",
    ""
  );

  if (moq.length === 0) {
    lines.push("No product documents.", "");
  }

  for (const entry of moq) {
    lines.push(`### ${heading(entry.doc)}`, "");
    lines.push(`**${statusLabel(entry.status)}.**`, "");
    lines.push("| Source | Value | Numbers |", "| --- | --- | --- |");
    for (const item of entry.rows) {
      lines.push(
        `| ${mdCell(item.source)} | ${mdCell(previewText(item.value, 180)) || "—"} | ${formatNumbers(item.numbers)} |`
      );
    }
    lines.push("");
  }

  lines.push(
    "## 3. Duplicated feature body copy",
    "",
    "Within one product document, feature bodies that match after stega characters are removed and whitespace is collapsed. Empty bodies are ignored. Draft and published copies of the same product are separate documents.",
    ""
  );

  if (duplicates.length === 0) {
    lines.push("No duplicated feature bodies.", "");
  }

  for (const group of duplicates) {
    lines.push(`### ${heading(group.doc)}`, "");
    lines.push(`Shared body: ${mdCell(previewText(group.body, 240))}`, "");
    for (const use of group.uses) {
      lines.push(`- \`${use.path}\` — ${mdCell(use.title)}`);
    }
    lines.push("");
  }

  lines.push(
    "## 4. SEO titles and descriptions with a year before 2027",
    "",
    "Checked every string at a path ending in `seo.title` or `seo.description`. A four-digit year from 1900–2026 is a hit. 2027 and later are not.",
    ""
  );

  if (years.length === 0) {
    lines.push("No SEO title or description contains a year before 2027.", "");
  } else {
    lines.push("| Document | State | Field | Years | Text |", "| --- | --- | --- | --- | --- |");
    for (const hit of years) {
      lines.push(
        `| ${mdCell(docTitle(hit.doc))} (\`${slugOf(hit.doc) ?? hit.doc._id}\`) | ${publicationState(hit.doc._id)} | \`${hit.path}\` | ${hit.years.join(", ")} | ${mdCell(hit.preview)} |`
      );
    }
    lines.push("");
  }

  lines.push(
    "## 5. Agreed MOQ drift",
    "",
    "Checked mailer boxes, shipping boxes, printed tubes and printed cans against the agreed table in `scripts/content-audit.ts`. Digital / litho / flexo is null when that route is not offered. The lowest offered figure is the code `moqFrom`.",
    "",
    "A non-empty Sanity field wins over the code fallback at render time. `moqFrom` is code-only and is not rendered. The contact MOQ notice has no Sanity value, so its code fallback is what the contact page shows. The knowledge-hub answer is the Sanity document when that page has FAQ categories.",
    "",
    "A hit is a quantity that is not in the agreed set, a dedicated MOQ field that omits one of the offered routes, or a route the table marks as not offered. A price sentence that states a quantity is checked against the same table.",
    ""
  );

  if (drifts.length === 0) {
    lines.push("No drift against the agreed MOQs.", "");
  } else {
    let currentSource = "";
    for (const drift of drifts) {
      if (drift.source !== currentSource) {
        if (currentSource) lines.push("");
        currentSource = drift.source;
        lines.push(`### ${drift.source}`, "");
      }
      lines.push(
        `- \`${mdCell(drift.path)}\` — ${mdCell(drift.reasons.join("; "))}. ${mdCell(drift.excerpt)}`
      );
    }
    lines.push("");
  }

  lines.push(
    "## Scope",
    "",
    `Types: ${CONTENT_TYPES.map((type) => `\`${type}\``).join(", ")}.`,
    "",
    "Section 5 also reads `lib/content/legacyProducts.ts`, `lib/content/contact.ts`, `lib/content/knowledgeHub.ts`, `lib/content/home.ts`, `components/sections/HeroSpread.tsx`, `components/sections/KnowledgeHub.tsx`, `app/api/chat/route.ts` and `PIPELINE_KNOWLEDGE_BASE.md`. Categories, team members, knowledge-hub Q&A documents, site settings and enquiries were not scanned.",
    ""
  );

  return `${lines.join("\n").replace(/\n{3,}/g, "\n\n")}\n`;
}

async function main(): Promise<void> {
  loadEnv();
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || "";
  const client = createReadClient();
  const docs = await fetchContentDocuments(client);
  const products = docs.filter((doc) => doc._type === "product");

  const stega = stegaHits(docs);
  const moq = products.map(productMoq);
  const duplicates = products.flatMap(featureDuplicates);
  const years = yearHits(docs);
  const drifts = [
    ...(await codeFallbackDrifts()),
    ...sanityProductDrifts(docs),
    ...hubDocumentDrifts(docs),
  ];

  const markdown = renderReport({
    generatedAt: new Date().toISOString(),
    dataset,
    projectId,
    docs,
    stega,
    moq,
    duplicates,
    years,
    drifts,
  });

  mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  writeFileSync(REPORT_PATH, markdown, "utf8");

  const mismatches = moq.filter((entry) => entry.status === "mismatch").length;
  console.log(`Wrote ${path.relative(process.cwd(), REPORT_PATH)}`);
  console.log(
    `Documents ${docs.length}. Stega fields ${stega.length}. MOQ mismatches ${mismatches}. Duplicate feature groups ${duplicates.length}. SEO year hits ${years.length}. Agreed-MOQ drift ${drifts.length}.`
  );
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
