import {
  PLUG_AND_PLAY_PRODUCTS,
  type Complexity,
  type EnquiryInput,
  type EnquiryKind,
  type VolumeBand,
} from "./types";

const PRODUCT_PATTERNS: { type: string; pattern: RegExp }[] = [
  { type: "Mailer boxes", pattern: /\bmailers?\s*boxes?\b|\be-?comm?erce\s*boxes?\b|\bpostal\s*boxes?\b/i },
  { type: "Rigid boxes", pattern: /\brigid\s*boxes?\b|\bgift\s*boxes?\b|\bmagnetic\s*boxes?\b|\bluxury\s*boxes?\b|\bhinged\s*lid\b/i },
  { type: "Shipping boxes", pattern: /\bshippers?\b|\bshipping\s*boxes?\b|\bouter\s*boxes?\b|\bcorrugated\s*boxes?\b/i },
  { type: "Paper mailers", pattern: /\bpaper\s*mailers?\b|\bpadded\s*mailers?\b|\bpoly\s*mailers?\b/i },
  { type: "Cartonboard / folding cartons", pattern: /\bcartonboard\b|\bfolding\s*cartons?\b|\bsleeves?\b|\bcartons?\b/i },
  { type: "Paper tubes", pattern: /\bpaper\s*tubes?\b|\bcylinders?\b|\btubes?\b/i },
  { type: "Pouches / bags", pattern: /\bpouches?\b|\bstand-?up\s*pouches?\b|\bbags?\b/i },
  { type: "Labels", pattern: /\blabels?\b|\bstickers?\b/i },
  { type: "Tissue / tape", pattern: /\btissue\b|\bpaper\s*tape\b|\bpackaging\s*tape\b/i },
  { type: "Advent calendars", pattern: /\badvent\b/i },
];

const PREMIUM_RE =
  /\b(foil(?:ing)?|hot\s*stamp|emboss(?:ing)?|deboss(?:ing)?|magnetic(?:\s*closure)?|velvet|suede|soft[\s-]*touch|spot\s*uv|litho|ribbon|silk\s*wrap|custom\s*structure)\b/i;
const MID_RE =
  /\b(inserts?|window|kraft|uncoated|dual[\s-]*wall|special\s*board|fitted\s*insert)\b/i;
const SIMPLE_RE =
  /\b(digital\s*print|standard|recycled|eco|flexo|plain)\b/i;

const SPAM_RE =
  /\b(seo\b|backlinks?|guest\s*post|crypto|nfts?|ranking\s*on\s*google)\b/i;
const SUPPLIER_RE =
  /\b(we\s+can\s+supply|factory\s+in\s+china|manufacturer\s+in|our\s+factory)\b/i;

function unique(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))];
}

function parseNumber(raw: string): number | null {
  const cleaned = raw.replace(/,/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

export function parseVolumeFromText(text: string): {
  qty: number | null;
  raw: string;
} {
  if (!text.trim()) return { qty: null, raw: "" };

  const kMatch = text.match(/\b(\d+(?:\.\d+)?)\s*k\b/i);
  if (kMatch) {
    const qty = Math.round(parseFloat(kMatch[1]) * 1000);
    return { qty, raw: kMatch[0] };
  }

  const range = text.match(
    /\b(\d{1,3}(?:,\d{3})*|\d+)\s*(?:-|to|–|—)\s*(\d{1,3}(?:,\d{3})*|\d+)/i
  );
  if (range) {
    const low = parseNumber(range[1]);
    const high = parseNumber(range[2]);
    if (low != null && high != null) {
      return { qty: Math.round((low + high) / 2), raw: range[0] };
    }
  }

  const qtyMatch = text.match(
    /\b(\d{1,3}(?:,\d{3})+|\d{2,6})\s*(?:units?|pcs|pieces|boxes|mailers|qty|quantity)?\b/i
  );
  if (qtyMatch) {
    return { qty: parseNumber(qtyMatch[1]), raw: qtyMatch[0] };
  }

  return { qty: null, raw: "" };
}

function bandFromQuantityLabel(label: string): {
  band: VolumeBand;
  qty: number | null;
} {
  const t = label.toLowerCase();
  if (t.includes("under 100")) return { band: "micro", qty: 50 };
  if (t.includes("100–499") || t.includes("100-499")) {
    return { band: "small", qty: 300 };
  }
  if (t.includes("500–999") || t.includes("500-999")) {
    return { band: "mid", qty: 750 };
  }
  if (t.includes("5,000") || t.includes("5000")) {
    return { band: "production", qty: 5000 };
  }
  if (t.includes("1,000") || t.includes("1000")) {
    return { band: "production", qty: 2500 };
  }
  return { band: "unknown", qty: null };
}

function bandFromQty(qty: number | null): VolumeBand {
  if (qty == null) return "unknown";
  if (qty < 100) return "micro";
  if (qty < 500) return "small";
  if (qty < 1000) return "mid";
  return "production";
}

function productFamily(productType: string): string {
  const t = productType.toLowerCase();
  if (t.includes("rigid") || t.includes("gift")) return "rigid";
  if (t.includes("mailer box")) return "mailer";
  if (t.includes("paper mailer")) return "paper-mailer";
  if (t.includes("shipping") || t.includes("shipper")) return "shipping";
  if (t.includes("advent")) return "advent";
  if (t.includes("tissue")) return "tissue";
  if (t.includes("carton")) return "carton";
  return "other";
}

function isBelowMoq(
  productTypes: string[],
  qty: number | null,
  band: VolumeBand
): boolean | null {
  if (band === "unknown" && qty == null) return null;
  const families = productTypes.map(productFamily);
  const effectiveQty =
    qty ??
    (band === "micro"
      ? 50
      : band === "small"
        ? 300
        : band === "mid"
          ? 750
          : band === "production"
            ? 2500
            : null);
  if (effectiveQty == null) return null;

  const thresholds = families.map((family) => {
    if (family === "rigid") return 500;
    if (family === "advent") return 250;
    if (family === "tissue") return 5000;
    if (family === "mailer") return 1000;
    if (family === "paper-mailer" || family === "shipping" || family === "carton") {
      return 1000;
    }
    return 1000;
  });

  const threshold = thresholds.length > 0 ? Math.min(...thresholds) : 1000;
  return effectiveQty < threshold;
}

function detectComplexity(text: string): { complexity: Complexity; notes: string } {
  const notes: string[] = [];
  if (PREMIUM_RE.test(text)) {
    const match = text.match(new RegExp(PREMIUM_RE.source, "gi"));
    if (match) notes.push(...match.map((m) => m.toLowerCase()));
    return { complexity: "premium", notes: unique(notes).join(", ") };
  }
  if (MID_RE.test(text)) {
    const match = text.match(new RegExp(MID_RE.source, "gi"));
    if (match) notes.push(...match.map((m) => m.toLowerCase()));
    return { complexity: "mid", notes: unique(notes).join(", ") };
  }
  if (SIMPLE_RE.test(text)) {
    return { complexity: "simple", notes: "" };
  }
  return { complexity: "unspecified", notes: "" };
}

function detectKind(input: EnquiryInput, text: string): EnquiryKind {
  if (input.subject?.toLowerCase().includes("partnership")) return "partnership";
  if (SPAM_RE.test(text)) return "spam";
  if (SUPPLIER_RE.test(text)) return "supplier";
  return "genuine";
}

export function classifyEnquiry(input: EnquiryInput): {
  packagingTypes: string[];
  volumeRaw: string;
  volumeQty: number | null;
  volumeBand: VolumeBand;
  belowMoq: boolean | null;
  complexity: Complexity;
  specNotes: string;
  plugAndPlayFit: boolean;
  kind: EnquiryKind;
} {
  const text = [input.subject, input.message, input.productType, input.estimatedQuantity]
    .filter(Boolean)
    .join("\n");

  const fromForm = input.productType?.trim() ? [input.productType.trim()] : [];
  const fromMessage = PRODUCT_PATTERNS.filter((p) => p.pattern.test(text)).map(
    (p) => p.type
  );
  const packagingTypes = unique([...fromForm, ...fromMessage]);

  const fromLabel = input.estimatedQuantity
    ? bandFromQuantityLabel(input.estimatedQuantity)
    : { band: "unknown" as VolumeBand, qty: null };
  const parsed = parseVolumeFromText(input.message ?? "");

  const volumeQty = fromLabel.qty ?? parsed.qty;
  const volumeRaw = input.estimatedQuantity?.trim() || parsed.raw;
  const volumeBand =
    fromLabel.band !== "unknown" ? fromLabel.band : bandFromQty(volumeQty);

  const belowMoq = isBelowMoq(packagingTypes, volumeQty, volumeBand);
  const { complexity, notes } = detectComplexity(text);
  const kind = detectKind(input, text);

  const isPnpProduct = packagingTypes.some((type) =>
    (PLUG_AND_PLAY_PRODUCTS as readonly string[]).includes(type)
  );
  const plugAndPlayFit =
    kind === "genuine" &&
    belowMoq === true &&
    isPnpProduct &&
    complexity !== "premium";

  return {
    packagingTypes,
    volumeRaw,
    volumeQty,
    volumeBand,
    belowMoq,
    complexity,
    specNotes: notes,
    plugAndPlayFit,
    kind,
  };
}
