import type {
  EnquiryKind,
  EnquiryRecord,
  EnquirySource,
} from "./types";

export type PipelineModule =
  | "new-business"
  | "cost-audit"
  | "plug-and-play"
  | "below-moq"
  | "partnership"
  | "supplier"
  | "spam"
  | "other";

export type PipelineRecommendedAction = "create_deal" | "review" | "ignore";

export const PIPELINE_MODULES = [
  "new-business",
  "cost-audit",
  "plug-and-play",
  "below-moq",
  "partnership",
  "supplier",
  "spam",
  "other",
] as const;

export interface PipelineEnquiryPayload {
  id: string;
  submittedAt: string;
  origin: "supplied-website";
  source: EnquirySource;
  sourceUrl: string;
  module: PipelineModule;
  recommendedAction: PipelineRecommendedAction;
  contact: {
    name: string;
    email: string;
    phone: string;
    company: string;
    jobTitle?: string;
  };
  project: {
    subject: string;
    message: string;
    productType: string;
    estimatedQuantity: string;
    packagingTypes: string[];
    volumeQty: number | null;
    volumeBand: EnquiryRecord["volumeBand"];
    belowMoq: boolean | null;
    complexity: EnquiryRecord["complexity"];
    specNotes: string;
    plugAndPlayFit: boolean;
  };
  costAudit?: {
    focusArea?: string;
    companyRevenue?: string;
    packagingSkus?: string;
    packagingSuppliers?: string;
  };
  qualification: {
    kind: EnquiryKind;
    reviewStatus: EnquiryRecord["reviewStatus"];
  };
  extra: Record<string, string>;
}

export interface PipelineEnquiryEvent {
  event: "enquiry.created";
  occurredAt: string;
  enquiry: PipelineEnquiryPayload;
}

function readExtra(extra: Record<string, string>, key: string): string | undefined {
  const value = extra[key]?.trim();
  return value ? value : undefined;
}

export function pipelineModule(record: EnquiryRecord): PipelineModule {
  if (record.kind === "spam") return "spam";
  if (record.kind === "supplier") return "supplier";
  if (record.kind === "partnership") return "partnership";
  if (record.kind === "other") return "other";
  if (record.source === "cost-audit") return "cost-audit";
  if (record.plugAndPlayFit) return "plug-and-play";
  if (record.belowMoq === true) return "below-moq";
  return "new-business";
}

export function pipelineRecommendedAction(
  record: EnquiryRecord
): PipelineRecommendedAction {
  const module = pipelineModule(record);
  if (module === "spam" || module === "supplier") return "ignore";
  if (module === "new-business" || module === "cost-audit") return "create_deal";
  return "review";
}

export function pipelineSourceUrl(source: EnquirySource): string {
  const site =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://www.suppliedpackaging.com";
  if (source === "cost-audit") return `${site}/packaging-cost-audit`;
  if (source === "packaging-review") return `${site}/packaging-review`;
  return `${site}/contact-us`;
}

export function toPipelinePayload(record: EnquiryRecord): PipelineEnquiryPayload {
  const extra = record.extra ?? {};
  const jobTitle = readExtra(extra, "jobTitle");
  const focusArea = readExtra(extra, "focusArea");
  const companyRevenue = readExtra(extra, "companyRevenue");
  const packagingSkus = readExtra(extra, "packagingSkus");
  const packagingSuppliers = readExtra(extra, "packagingSuppliers");

  const costAudit =
    record.source === "cost-audit" ||
    focusArea ||
    companyRevenue ||
    packagingSkus ||
    packagingSuppliers
      ? {
          ...(focusArea ? { focusArea } : {}),
          ...(companyRevenue ? { companyRevenue } : {}),
          ...(packagingSkus ? { packagingSkus } : {}),
          ...(packagingSuppliers ? { packagingSuppliers } : {}),
        }
      : undefined;

  return {
    id: record.id,
    submittedAt: record.submittedAt,
    origin: "supplied-website",
    source: record.source,
    sourceUrl: pipelineSourceUrl(record.source),
    module: pipelineModule(record),
    recommendedAction: pipelineRecommendedAction(record),
    contact: {
      name: record.name,
      email: record.email,
      phone: record.phone,
      company: record.company,
      ...(jobTitle ? { jobTitle } : {}),
    },
    project: {
      subject: record.subject,
      message: record.message,
      productType: record.productType,
      estimatedQuantity: record.estimatedQuantity,
      packagingTypes: record.packagingTypes,
      volumeQty: record.volumeQty,
      volumeBand: record.volumeBand,
      belowMoq: record.belowMoq,
      complexity: record.complexity,
      specNotes: record.specNotes,
      plugAndPlayFit: record.plugAndPlayFit,
    },
    ...(costAudit && Object.keys(costAudit).length > 0 ? { costAudit } : {}),
    qualification: {
      kind: record.kind,
      reviewStatus: record.reviewStatus,
    },
    extra,
  };
}

export function toPipelineEvent(record: EnquiryRecord): PipelineEnquiryEvent {
  return {
    event: "enquiry.created",
    occurredAt: new Date().toISOString(),
    enquiry: toPipelinePayload(record),
  };
}

export function parsePipelineModule(value: unknown): PipelineModule | undefined {
  if (typeof value !== "string") return undefined;
  return (PIPELINE_MODULES as readonly string[]).includes(value)
    ? (value as PipelineModule)
    : undefined;
}
