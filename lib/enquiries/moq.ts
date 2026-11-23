import { CONTACT_QUANTITY_BANDS } from "./types";

interface ProductQuantityRule {
  match: RegExp;
  min: number;
  hint: string;
  extraOptions?: string[];
}

/** Floors match the minimums published on the contact page. */
const PRODUCT_QUANTITY_RULES: ProductQuantityRule[] = [
  {
    match: /paper mailer/i,
    min: 1000,
    hint: "Paper mailers start from 1,000 units.",
  },
  {
    match: /mailer box/i,
    min: 1000,
    hint: "Larger formats from 1,000; smaller sizes from 3,000.",
  },
  {
    match: /rigid/i,
    min: 500,
    hint: "Rigid boxes start from 500 units.",
  },
  {
    match: /shipping|shipper/i,
    min: 1000,
    hint: "Shipping boxes start from 1,000 units.",
  },
  {
    match: /carton/i,
    min: 1000,
    hint: "Cartonboard boxes start from 1,000 units.",
  },
  {
    match: /tube/i,
    min: 1000,
    hint: "Paper tubes start from 1,000 units.",
  },
  {
    match: /pouch|\bbags?\b/i,
    min: 1000,
    hint: "Pouches and bags start from 1,000 units.",
  },
  {
    match: /label/i,
    min: 1000,
    hint: "Labels start from 1,000 units.",
  },
  {
    match: /tissue|tape/i,
    min: 5000,
    hint: "Tissue from 5,000 sheets. Paper tape from 72 rolls.",
    extraOptions: ["72+ rolls (paper tape)"],
  },
  {
    match: /advent/i,
    min: 250,
    hint: "Advent calendars start from 250 units.",
  },
  {
    match: /other|not sure/i,
    min: 1000,
    hint: "Most other formats start from 1,000 units.",
  },
];

export function quantityRuleForProduct(product: string): ProductQuantityRule | undefined {
  const name = product.trim();
  if (!name) return undefined;
  return PRODUCT_QUANTITY_RULES.find((rule) => rule.match.test(name));
}

/** Lower bound of a band. "Not sure" has no bound and stays available. */
export function quantityBandFloor(label: string): number | null {
  const text = label.trim().toLowerCase();
  if (!text || /not sure/.test(text)) return null;
  if (/^under\b/.test(text)) return 0;
  const match = text.replace(/,/g, "").match(/(\d+)/);
  return match ? Number(match[1]) : null;
}

export function quantityChoicesForProduct(
  product: string,
  bands: readonly string[] = CONTACT_QUANTITY_BANDS
): { options: string[]; hint: string } {
  const rule = quantityRuleForProduct(product);
  if (!rule) return { options: [], hint: "" };

  const eligible = bands.filter((band) => {
    const floor = quantityBandFloor(band);
    return floor == null || floor >= rule.min;
  });
  const unsure = eligible.filter((band) => /not sure/i.test(band));
  const ranged = eligible.filter((band) => !/not sure/i.test(band));
  const extras = (rule.extraOptions ?? []).filter((option) => !ranged.includes(option));

  return {
    options: [...ranged, ...extras, ...unsure],
    hint: rule.hint,
  };
}

export function isQuantityAllowedForProduct(product: string, quantity: string): boolean {
  const chosen = quantity.trim();
  if (!chosen) return true;
  const { options } = quantityChoicesForProduct(product);
  return options.includes(chosen);
}
