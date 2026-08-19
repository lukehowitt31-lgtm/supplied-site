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

export type EnquirySource = "contact" | "cost-audit";
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
  monthly: { month: string; total: number; belowMoq: number; plugAndPlay: number }[];
}

export const PLUG_AND_PLAY_PRODUCTS = [
  "Mailer boxes",
  "Rigid boxes",
  "Shipping boxes",
  "Paper mailers",
] as const;
