export const CONTACT_PRODUCT_TYPES = [
  "Mailer boxes",
  "Rigid boxes",
  "Shipping boxes",
  "Paper mailers",
  "Cartonboard / folding cartons",
  "Paper tubes",
  "Pouches / bags",
  "Labels",
  "Tissue / tape",
  "Other / not sure",
] as const;

export const CONTACT_QUANTITY_BANDS = [
  "Under 100",
  "100–499",
  "500–999",
  "1,000–4,999",
  "5,000+",
  "Not sure yet",
] as const;

export const HEARD_ABOUT_OPTIONS = [
  "Google search",
  "ChatGPT or another AI assistant",
  "LinkedIn",
  "Recommendation from someone",
  "Event",
  "Email from Supplied",
  "Other",
] as const;

export type HeardAboutOption = (typeof HEARD_ABOUT_OPTIONS)[number];

/** Options that reveal the optional "Tell us more" field. */
export const HEARD_ABOUT_DETAIL_OPTIONS = [
  "Recommendation from someone",
  "Other",
] as const satisfies readonly HeardAboutOption[];

export function isHeardAboutOption(value: string): value is HeardAboutOption {
  return (HEARD_ABOUT_OPTIONS as readonly string[]).includes(value);
}

export function heardAboutNeedsDetail(value: string): boolean {
  return (HEARD_ABOUT_DETAIL_OPTIONS as readonly string[]).includes(value);
}

/** @deprecated Public forms use HEARD_ABOUT_OPTIONS. Kept for the contact-page fallback. */
export const CONTACT_REFERRAL_SOURCES = HEARD_ABOUT_OPTIONS;

export type EnquirySource = "contact" | "cost-audit" | "packaging-review";
export type EnquiryKind =
  | "genuine"
  | "spam"
  | "supplier"
  | "partnership"
  | "other";
export type EnquiryReviewStatus = "new" | "reviewed" | "ignored";
export type VolumeBand = "micro" | "small" | "mid" | "production" | "unknown";
export type Complexity = "simple" | "mid" | "premium" | "unspecified";

export interface EnquiryInput {
  source: EnquirySource;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
  productType?: string;
  estimatedQuantity?: string;
  extra?: Record<string, string>;
  heardAbout?: string;
  heardAboutDetail?: string;
  referrer?: string;
  landingPage?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  attributionCapturedAt?: string;
  spamSuspected?: boolean;
}

export interface EnquiryRecord {
  id: string;
  submittedAt: string;
  source: EnquirySource;
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  productType: string;
  estimatedQuantity: string;
  packagingTypes: string[];
  volumeRaw: string;
  volumeQty: number | null;
  volumeBand: VolumeBand;
  belowMoq: boolean | null;
  complexity: Complexity;
  specNotes: string;
  plugAndPlayFit: boolean;
  kind: EnquiryKind;
  reviewStatus: EnquiryReviewStatus;
  notes: string;
  extra: Record<string, string>;
  heardAbout: string;
  heardAboutDetail: string;
  referrer: string;
  landingPage: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  attributionCapturedAt: string;
  spamSuspected: boolean;
}

export interface EnquiryInsights {
  total: number;
  genuine: number;
  belowMoq: number;
  plugAndPlay: number;
  productionScale: number;
  unknownVolume: number;
  belowMoqShare: number;
  plugAndPlayShare: number;
  productMixBelowMoq: { label: string; count: number }[];
  quantityBands: { label: string; count: number }[];
  referralSources: { label: string; count: number }[];
  monthly: { month: string; total: number; belowMoq: number; plugAndPlay: number }[];
}

export const PLUG_AND_PLAY_PRODUCTS = [
  "Mailer boxes",
  "Rigid boxes",
  "Shipping boxes",
  "Paper mailers",
] as const;
