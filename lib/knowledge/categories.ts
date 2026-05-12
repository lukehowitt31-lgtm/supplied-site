export const KB_CATEGORIES = [
  "Mailer Boxes",
  "Rigid Boxes",
  "Shipping Boxes",
  "Paper Mailers",
  "Printed Cans",
  "Tissue Paper",
  "Paper Tape",
  "Advent Calendars",
  "MOQs & Pricing",
  "Print Methods",
  "Samples",
  "Lead Times",
  "Sustainability",
  "About Supplied",
  "Process",
  "Other",
] as const;

export type KbCategory = (typeof KB_CATEGORIES)[number];

export function isKbCategory(value: unknown): value is KbCategory {
  return (
    typeof value === "string" &&
    (KB_CATEGORIES as readonly string[]).includes(value)
  );
}
