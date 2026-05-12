export const KB_CATEGORIES = [
  "About Supplied",
  "Account Management",
  "Advent Calendars",
  "Cartonboard",
  "Corrugated Technical",
  "Ecommerce Packaging",
  "Getting Started",
  "Industries",
  "Inserts",
  "Labels",
  "Lead Times",
  "Logistics",
  "Mailer Boxes",
  "MOQs & Pricing",
  "Packaging Strategy",
  "Paper Mailers",
  "Paper Tape",
  "Pouches & Bags",
  "Print Methods",
  "Printed Cans",
  "Process",
  "QA & Quality",
  "Rigid Boxes",
  "Samples",
  "Shipping Boxes",
  "Supplier Network",
  "Sustainability",
  "Tissue Paper",
  "Other",
] as const;

export type KbCategory = (typeof KB_CATEGORIES)[number];

export function isKbCategory(value: unknown): value is KbCategory {
  return (
    typeof value === "string" &&
    (KB_CATEGORIES as readonly string[]).includes(value)
  );
}
