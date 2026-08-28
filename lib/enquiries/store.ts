import "server-only";

import { createClient, type SanityClient } from "next-sanity";
import {
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
  sanityWriteToken,
} from "@/lib/sanity/env";
import { classifyEnquiry } from "./classify";
import { decryptText, encryptText } from "./crypto";
import { buildEnquiryInsights } from "./insights";
import { pipelineModule, type PipelineModule } from "./pipeline";
import type {
  EnquiryInput,
  EnquiryInsights,
  EnquiryKind,
  EnquiryRecord,
  EnquiryReviewStatus,
  EnquirySource,
  VolumeBand,
  Complexity,
} from "./types";
import { dispatchEnquiryCreated } from "./webhook";

interface RawEnquiryDoc {
  _id?: string;
  submittedAt?: string;
  _createdAt?: string;
  source?: string;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  extra?: string;
  productType?: string;
  estimatedQuantity?: string;
  packagingTypes?: string[];
  volumeRaw?: string;
  volumeQty?: number | null;
  volumeBand?: string;
  belowMoq?: boolean | null;
  complexity?: string;
  specNotes?: string;
  plugAndPlayFit?: boolean;
  kind?: string;
  reviewStatus?: string;
  notes?: string;
}

const ENQUIRY_PROJECTION = `{
  _id, submittedAt, _createdAt, source, name, company, email, phone,
  subject, message, extra, productType, estimatedQuantity, packagingTypes,
  volumeRaw, volumeQty, volumeBand, belowMoq, complexity, specNotes,
  plugAndPlayFit, kind, reviewStatus, notes
}`;

function getWriteClient(): SanityClient {
  if (!sanityProjectId || sanityProjectId.startsWith("YOUR_")) {
    throw new Error("Sanity is not configured");
  }
  if (!sanityWriteToken || sanityWriteToken.startsWith("YOUR_")) {
    throw new Error("SANITY_API_WRITE_TOKEN is not configured");
  }

  return createClient({
    projectId: sanityProjectId,
    dataset: sanityDataset,
    apiVersion: sanityApiVersion,
    useCdn: false,
    token: sanityWriteToken,
  });
}

function generateEnquiryId(): string {
  const stamp = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  return `enquiry.${stamp}${rand}`;
}

function asSource(value: unknown): EnquirySource {
  if (value === "cost-audit" || value === "packaging-review") return value;
  return "contact";
}

function asKind(value: unknown): EnquiryKind {
  if (
    value === "spam" ||
    value === "supplier" ||
    value === "partnership" ||
    value === "other"
  ) {
    return value;
  }
  return "genuine";
}

function asReviewStatus(value: unknown): EnquiryReviewStatus {
  if (value === "reviewed" || value === "ignored") return value;
  return "new";
}

function asBand(value: unknown): VolumeBand {
  if (
    value === "micro" ||
    value === "small" ||
    value === "mid" ||
    value === "production"
  ) {
    return value;
  }
  return "unknown";
}

function asComplexity(value: unknown): Complexity {
  if (value === "simple" || value === "mid" || value === "premium") return value;
  return "unspecified";
}

function parseExtra(value: string | undefined): Record<string, string> {
  const raw = decryptText(value ?? "");
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }
    const extra: Record<string, string> = {};
    for (const [key, item] of Object.entries(parsed)) {
      if (typeof item === "string" && item.trim()) extra[key] = item;
    }
    return extra;
  } catch {
    return {};
  }
}

function toRecord(doc: RawEnquiryDoc | null | undefined): EnquiryRecord | null {
  if (!doc?._id) return null;
  return {
    id: doc._id,
    submittedAt: doc.submittedAt || doc._createdAt || new Date().toISOString(),
    source: asSource(doc.source),
    name: decryptText(doc.name ?? ""),
    company: decryptText(doc.company ?? ""),
    email: decryptText(doc.email ?? ""),
    phone: decryptText(doc.phone ?? ""),
    subject: doc.subject ?? "",
    message: decryptText(doc.message ?? ""),
    productType: doc.productType ?? "",
    estimatedQuantity: doc.estimatedQuantity ?? "",
    packagingTypes: Array.isArray(doc.packagingTypes) ? doc.packagingTypes : [],
    volumeRaw: doc.volumeRaw ?? "",
    volumeQty: typeof doc.volumeQty === "number" ? doc.volumeQty : null,
    volumeBand: asBand(doc.volumeBand),
    belowMoq: typeof doc.belowMoq === "boolean" ? doc.belowMoq : null,
    complexity: asComplexity(doc.complexity),
    specNotes: doc.specNotes ?? "",
    plugAndPlayFit: Boolean(doc.plugAndPlayFit),
    kind: asKind(doc.kind),
    reviewStatus: asReviewStatus(doc.reviewStatus),
    notes: decryptText(doc.notes ?? ""),
    extra: parseExtra(doc.extra),
  };
}

function clip(value: string | undefined, max: number): string {
  return (value ?? "").trim().slice(0, max);
}

export async function persistEnquiry(input: EnquiryInput): Promise<EnquiryRecord> {
  const classified = classifyEnquiry(input);
  const extra = input.extra
    ? encryptText(JSON.stringify(input.extra).slice(0, 4000))
    : "";

  const created = await getWriteClient().create<RawEnquiryDoc>({
    _id: generateEnquiryId(),
    _type: "enquiry",
    submittedAt: new Date().toISOString(),
    source: input.source,
    name: encryptText(clip(input.name, 200)),
    company: encryptText(clip(input.company, 200)),
    email: encryptText(clip(input.email, 320)),
    phone: encryptText(clip(input.phone, 40)),
    subject: clip(input.subject, 120),
    message: encryptText(clip(input.message, 8000)),
    extra,
    productType: clip(input.productType, 80),
    estimatedQuantity: clip(input.estimatedQuantity, 40),
    packagingTypes: classified.packagingTypes,
    volumeRaw: classified.volumeRaw,
    volumeQty: classified.volumeQty,
    volumeBand: classified.volumeBand,
    belowMoq: classified.belowMoq,
    complexity: classified.complexity,
    specNotes: classified.specNotes,
    plugAndPlayFit: classified.plugAndPlayFit,
    kind: classified.kind,
    reviewStatus: "new",
    notes: "",
  });

  const record = toRecord(created);
  if (!record) {
    throw new Error("Failed to persist enquiry");
  }

  void dispatchEnquiryCreated(record);
  return record;
}

export async function listEnquiries(): Promise<{
  enquiries: EnquiryRecord[];
  insights: EnquiryInsights;
}> {
  const docs = await getWriteClient().fetch<RawEnquiryDoc[]>(
    `*[_type == "enquiry"] | order(submittedAt desc)${ENQUIRY_PROJECTION}`
  );

  const enquiries = docs
    .map(toRecord)
    .filter((row): row is EnquiryRecord => row !== null);

  return {
    enquiries,
    insights: buildEnquiryInsights(enquiries),
  };
}

export async function updateEnquiry(input: {
  id: string;
  kind?: EnquiryKind;
  reviewStatus?: EnquiryReviewStatus;
  notes?: string;
  belowMoq?: boolean | null;
  plugAndPlayFit?: boolean;
}): Promise<EnquiryRecord> {
  if (!input.id.startsWith("enquiry.")) {
    throw new Error("Not found");
  }

  const client = getWriteClient();
  const existing = await client.fetch<{ _id: string } | null>(
    `*[_id == $id && _type == "enquiry"][0]{ _id }`,
    { id: input.id }
  );
  if (!existing) {
    throw new Error("Not found");
  }

  const patch: Record<string, unknown> = {};
  if (input.kind) patch.kind = input.kind;
  if (input.reviewStatus) patch.reviewStatus = input.reviewStatus;
  if (typeof input.notes === "string") {
    patch.notes = encryptText(input.notes.slice(0, 5000));
  }
  if (input.belowMoq !== undefined) patch.belowMoq = input.belowMoq;
  if (typeof input.plugAndPlayFit === "boolean") {
    patch.plugAndPlayFit = input.plugAndPlayFit;
  }

  if (Object.keys(patch).length === 0) {
    throw new Error("Not found");
  }

  const updated = await client
    .patch(input.id)
    .set(patch)
    .commit<RawEnquiryDoc>();

  const record = toRecord(updated);
  if (!record) {
    throw new Error("Failed to update enquiry");
  }
  return record;
}

export interface PipelineEnquiryFilters {
  since?: string;
  source?: EnquirySource;
  kind?: EnquiryKind;
  reviewStatus?: EnquiryReviewStatus;
  module?: PipelineModule;
  limit?: number;
}

export async function listPipelineEnquiries(
  filters: PipelineEnquiryFilters = {}
): Promise<EnquiryRecord[]> {
  const limit = Math.min(Math.max(filters.limit ?? 50, 1), 100);
  const fetchLimit = filters.module ? Math.min(limit * 4, 200) : limit;

  const docs = await getWriteClient().fetch<RawEnquiryDoc[]>(
    `*[
      _type == "enquiry"
      && (!defined($since) || submittedAt >= $since)
      && (!defined($source) || source == $source)
      && (!defined($kind) || kind == $kind)
      && (!defined($reviewStatus) || reviewStatus == $reviewStatus)
    ] | order(submittedAt desc)[0...$fetchLimit]${ENQUIRY_PROJECTION}`,
    {
      since: filters.since ?? null,
      source: filters.source ?? null,
      kind: filters.kind ?? null,
      reviewStatus: filters.reviewStatus ?? null,
      fetchLimit,
    }
  );

  const records = docs
    .map(toRecord)
    .filter((row): row is EnquiryRecord => row !== null);

  const filtered = filters.module
    ? records.filter((row) => pipelineModule(row) === filters.module)
    : records;

  return filtered.slice(0, limit);
}

export async function getEnquiryById(
  id: string
): Promise<EnquiryRecord | null> {
  if (!id.startsWith("enquiry.")) return null;

  const doc = await getWriteClient().fetch<RawEnquiryDoc | null>(
    `*[_id == $id && _type == "enquiry"][0]${ENQUIRY_PROJECTION}`,
    { id }
  );

  return toRecord(doc);
}
