/**
 * Supplied Knowledge Hub — Q&A Ingestion Script
 *
 * Embeds all Q&A pairs via OpenAI text-embedding-3-small and stores them
 * in the Supabase knowledge_hub table for vector similarity search.
 *
 * Prerequisites:
 *   1. Run scripts/supabase-knowledge-hub.sql in your Supabase SQL editor
 *   2. Add OPENAI_API_KEY to .env.local
 *
 * Usage:
 *   npx tsx scripts/ingest-knowledge-hub.ts
 *   npx tsx scripts/ingest-knowledge-hub.ts --clear   # wipe table first
 */

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { createClient } from "@supabase/supabase-js";

// ── Env loading (same pattern as seed script) ────────────────

function loadEnvFile(filePath: string): void {
  if (!existsSync(filePath)) return;
  const contents = readFileSync(filePath, "utf8");
  for (const rawLine of contents.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq <= 0) continue;
    const key = line.slice(0, eq).trim();
    if (!key || process.env[key]) continue;
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

// ── Q&A data ─────────────────────────────────────────────────
// Add new entries here and re-run this script to ingest them.

interface QnAItem {
  category: string;
  question: string;
  answer: string;
}

const QNA_DATA: QnAItem[] = [
  // ── Mailer Boxes ───────────────────────────────────────────
  {
    category: "Mailer Boxes",
    question: "What types of mailer boxes does Supplied offer?",
    answer:
      "We offer custom printed mailer boxes in E and B flute corrugated board. Styles include tuck-front, crash-lock, and magnetic closure.",
  },
  {
    category: "Mailer Boxes",
    question: "What is the difference between E flute and B flute mailer boxes?",
    answer:
      "E flute is thinner and gives a smoother print surface, ideal for premium presentation. B flute is thicker and offers more structural protection, better suited for heavier products.",
  },
  {
    category: "Mailer Boxes",
    question: "Can I get full colour print on the inside of my mailer box?",
    answer:
      "Yes. We offer full inside and outside print on mailer boxes, so your unboxing experience can be as branded as the exterior.",
  },

  // ── MOQs & Pricing ────────────────────────────────────────
  {
    category: "MOQs & Pricing",
    question: "What is the minimum order quantity for mailer boxes?",
    answer:
      "Digital mailer boxes start from just 100 units, making them ideal for new brands or product launches.",
  },
  {
    category: "MOQs & Pricing",
    question: "At what quantity does flexo printing become available for mailer boxes?",
    answer:
      "Flexo printing is available from 2,000 units. At this quantity the unit cost drops significantly compared to digital.",
  },
  {
    category: "MOQs & Pricing",
    question: "What is the approximate cost per unit for mailer boxes at 250 units?",
    answer:
      "At 250 units, printed digitally, you're looking at approximately £1.50–£3.00 per unit. We'll always provide an exact quote based on your specific size and spec.",
  },
  {
    category: "MOQs & Pricing",
    question: "What is the MOQ for rigid boxes?",
    answer: "The minimum order quantity for rigid boxes is 500 units.",
  },
  {
    category: "MOQs & Pricing",
    question: "What is the approximate unit cost for rigid boxes?",
    answer:
      "As a rough guide, rigid boxes are approximately £3–£5 per unit at 500 units. We'll provide an exact quote based on your dimensions and specification.",
  },
  {
    category: "MOQs & Pricing",
    question: "What is the MOQ for printed shipping boxes?",
    answer:
      "Flexo printed shipping boxes start from 2,000 units. Digital printing is available from 250 units.",
  },
  {
    category: "MOQs & Pricing",
    question: "Are there plate charges for printed cans?",
    answer:
      "No. Digital printing on cans requires no plates, so there are no upfront tooling costs.",
  },
  {
    category: "MOQs & Pricing",
    question: "What is the lowest MOQ Supplied offers?",
    answer:
      "Our lowest MOQ is 100 units for digitally printed mailer boxes — one of the lowest in the market.",
  },
  {
    category: "MOQs & Pricing",
    question: "How much can I save by consolidating packaging through Supplied?",
    answer:
      "Brands that consolidate their packaging through Supplied save an average of 23% compared to managing multiple suppliers directly.",
  },
  {
    category: "MOQs & Pricing",
    question: "Are diecut tools a one-off charge?",
    answer:
      "Yes. Diecut tools cost approximately £600–£800 and are retained for repeat orders, so you won't be charged again on reorders of the same structure.",
  },

  // ── Print Methods ─────────────────────────────────────────
  {
    category: "Print Methods",
    question: "What print method is used for mailer boxes at low quantities?",
    answer:
      "Orders under 1,000 units are printed digitally, which means no plate charges and fast turnaround.",
  },
  {
    category: "Print Methods",
    question: "What print method is used for mailer boxes at higher quantities?",
    answer:
      "From 2,000 units we use flexo printing, which reduces the unit cost but requires stereo (plate) charges of approximately £300–£450.",
  },
  {
    category: "Print Methods",
    question: "Are there plate charges for mailer boxes?",
    answer:
      "Digital mailer boxes have no plate charges. Flexo printing requires stereo charges of approximately £300–£450.",
  },
  {
    category: "Print Methods",
    question: "What is digital printing?",
    answer:
      "Digital printing applies ink directly from a digital file with no printing plates required. It's ideal for quantities under 1,000 units and produces high-quality full colour results.",
  },
  {
    category: "Print Methods",
    question: "What is flexo printing?",
    answer:
      "Flexo (flexographic) printing uses engraved rubber or polymer plates to apply ink at high speed. It's cost-effective at volume but requires upfront stereo (plate) charges.",
  },
  {
    category: "Print Methods",
    question: "What are stereo charges?",
    answer:
      "Stereos are the printing plates used in flexo printing. They typically cost £300–£450 and are a one-off charge per design.",
  },
  {
    category: "Print Methods",
    question: "What is litho-lam printing?",
    answer:
      "Litho-lam (lithographic lamination) involves printing a high-quality sheet offset and laminating it to corrugated board. It gives a premium finish and is available for mailer boxes from 1,000 units.",
  },
  {
    category: "Print Methods",
    question: "When does digital printing make more sense than flexo?",
    answer:
      "Digital printing is better suited to quantities under 1,000 units, designs with lots of colour variation, or where you want to avoid upfront plate costs.",
  },
  {
    category: "Print Methods",
    question: "When does flexo printing make more sense than digital?",
    answer:
      "Flexo becomes more cost-effective from around 2,000 units. The unit cost drops significantly once plate charges are spread across a larger run.",
  },

  // ── Samples ───────────────────────────────────────────────
  {
    category: "Samples",
    question: "Can I get a sample mailer box before placing an order?",
    answer:
      "Yes. Unprinted structural samples are free of charge. Printed pre-production samples are available for a small charge, which is credited against your first order. Note that printed samples are not available for flexo print runs.",
  },

  // ── Rigid Boxes ───────────────────────────────────────────
  {
    category: "Rigid Boxes",
    question: "What types of rigid boxes does Supplied offer?",
    answer:
      "We offer magnetic closure, lift-off lid, drawer, and hinged rigid boxes. All are made from FSC-certified greyboard.",
  },
  {
    category: "Rigid Boxes",
    question: "What finishes are available on rigid boxes?",
    answer:
      "Rigid boxes can be finished with soft-touch lamination, foil blocking, embossing, and spot UV. Combinations are also possible.",
  },

  // ── Shipping Boxes ────────────────────────────────────────
  {
    category: "Shipping Boxes",
    question: "What shipping box styles does Supplied offer?",
    answer:
      "We supply 0201 style regular slotted shipping boxes, available plain or fully branded.",
  },

  // ── Paper Mailers ─────────────────────────────────────────
  {
    category: "Paper Mailers",
    question: "What are paper mailers?",
    answer:
      "Paper mailers are a sustainable alternative to plastic poly mailers — fully recyclable, with peel-seal closure and tear strip for easy returns.",
  },

  // ── Printed Cans ──────────────────────────────────────────
  {
    category: "Printed Cans",
    question: "What type of cans does Supplied offer?",
    answer:
      "We offer digitally printed aluminium cans using CMYK printing directly onto the can surface. No printing plates are required.",
  },

  // ── Tissue Paper ──────────────────────────────────────────
  {
    category: "Tissue Paper",
    question: "What is the MOQ for tissue paper?",
    answer: "The minimum order quantity for tissue paper is 5,000 sheets.",
  },

  // ── Paper Tape ────────────────────────────────────────────
  {
    category: "Paper Tape",
    question: "What is the MOQ for paper tape?",
    answer: "The minimum order quantity is 72 rolls.",
  },

  // ── Advent Calendars ──────────────────────────────────────
  {
    category: "Advent Calendars",
    question: "When should I start planning my advent calendar?",
    answer:
      "We recommend starting 4–5 months before your planned launch date to allow time for design, sampling, and production.",
  },

  // ── Lead Times ────────────────────────────────────────────
  {
    category: "Lead Times",
    question: "What is the lead time for rigid boxes?",
    answer:
      "Rigid boxes typically have a 4–6 week lead time from artwork approval.",
  },
  {
    category: "Lead Times",
    question: "What is the lead time for tissue paper?",
    answer: "Tissue paper has a 4–6 week lead time from artwork approval.",
  },
  {
    category: "Lead Times",
    question: "What is Supplied's typical lead time?",
    answer:
      "Lead times vary by product. Rigid boxes and tissue paper are typically 4–6 weeks from artwork approval. Digital products are generally faster. We confirm exact timelines at the quoting stage.",
  },

  // ── Sustainability ────────────────────────────────────────
  {
    category: "Sustainability",
    question: "Is Supplied's packaging recyclable?",
    answer:
      "Yes. We offer a 100% recyclable range across all product categories, designed to meet current and incoming regulatory requirements.",
  },
  {
    category: "Sustainability",
    question: "What is PPWR?",
    answer:
      "PPWR stands for the EU Packaging and Packaging Waste Regulation. It sets mandatory requirements for recyclability, recycled content, and labelling across all packaging sold in the EU.",
  },
  {
    category: "Sustainability",
    question: "When does PPWR come into force?",
    answer:
      "PPWR is being phased in from 2025, with key compliance milestones running through to 2030.",
  },
  {
    category: "Sustainability",
    question: "Is Supplied packaging PPWR compliant?",
    answer:
      "Yes. All packaging we design and supply is PPWR compliant from the outset — it's built into our sourcing and design process, not bolted on afterwards.",
  },
  {
    category: "Sustainability",
    question: "Does Supplied offer FSC certified packaging?",
    answer:
      "Yes. FSC certified options are available across our full range, including mailer boxes, rigid boxes, shipping boxes, and paper-based products.",
  },
  {
    category: "Sustainability",
    question: "Is Supplied packaging PFAS-free?",
    answer:
      "Yes. Our packaging range is PFAS-free. PFAS are chemicals increasingly restricted under EU and UK regulation due to their environmental persistence.",
  },

  // ── About Supplied ────────────────────────────────────────
  {
    category: "About Supplied",
    question: "What is Supplied?",
    answer:
      "Supplied is an end-to-end packaging consultancy based in London, helping fast-growing DTC and ecommerce brands source, design, and manage their packaging supply chain.",
  },
  {
    category: "About Supplied",
    question: "Where is Supplied based?",
    answer: "Supplied has offices in London and Warsaw, Poland.",
  },
  {
    category: "About Supplied",
    question: "How many suppliers does Supplied work with?",
    answer:
      "We work with a network of 30+ vetted suppliers across 12 countries globally.",
  },
  {
    category: "About Supplied",
    question: "What is Supplied's on-time delivery rate?",
    answer: "We achieve 98% on-time delivery across our managed projects.",
  },
  {
    category: "About Supplied",
    question: "Which well-known brands has Supplied worked with?",
    answer:
      "Our clients include TRIP, Healf, Wild, SURI, Glow For It, Polestar, and Sneak Energy, among others.",
  },

  // ── Process ───────────────────────────────────────────────
  {
    category: "Process",
    question: "What happens after I approve a quote?",
    answer:
      "Once you approve the quote, we move into structural design and artwork. After your sign-off on pre-production samples, manufacturing begins.",
  },
  {
    category: "Process",
    question: "Does Supplied handle logistics and delivery?",
    answer:
      "Yes. We manage logistics and freight as part of our end-to-end service, so your packaging arrives at your warehouse ready to use.",
  },
  {
    category: "Process",
    question: "Can Supplied help with structural design?",
    answer:
      "Yes. Structural design is part of our service. We engineer packaging to your product dimensions and brand requirements from the ground up.",
  },
  {
    category: "Process",
    question: "Does Supplied help with artwork and pre-press?",
    answer:
      "Yes. We offer artwork and pre-press support to ensure your files are production-ready and print correctly first time.",
  },
];

// ── OpenAI embedding ─────────────────────────────────────────

async function generateEmbedding(
  text: string,
  apiKey: string
): Promise<number[]> {
  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: text,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI embeddings error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  return data.data[0].embedding;
}

// ── Main ─────────────────────────────────────────────────────

async function main(): Promise<void> {
  const cwd = process.cwd();
  loadEnvFile(path.join(cwd, ".env.local"));

  const supabaseUrl = requiredEnv("SUPABASE_URL");
  const supabaseKey = requiredEnv("SUPABASE_SERVICE_ROLE_KEY");
  const openaiKey = requiredEnv("OPENAI_API_KEY");
  const shouldClear = process.argv.includes("--clear");

  const supabase = createClient(supabaseUrl, supabaseKey);

  if (shouldClear) {
    console.log("Clearing existing knowledge_hub rows...");
    const { error } = await supabase
      .from("knowledge_hub")
      .delete()
      .neq("id", 0);
    if (error) {
      console.error("Failed to clear table:", error.message);
      process.exitCode = 1;
      return;
    }
    console.log("Table cleared.");
  }

  console.log(`Starting ingestion of ${QNA_DATA.length} Q&A pairs...`);

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < QNA_DATA.length; i++) {
    const item = QNA_DATA[i];

    try {
      const textToEmbed = `${item.question} ${item.answer}`;
      const embedding = await generateEmbedding(textToEmbed, openaiKey);

      const { error } = await supabase.from("knowledge_hub").insert({
        question: item.question,
        answer: item.answer,
        category: item.category,
        embedding,
      });

      if (error) {
        console.error(`Error inserting item ${i + 1}:`, error.message);
        errorCount++;
      } else {
        successCount++;
        if (successCount % 10 === 0) {
          console.log(`Progress: ${successCount}/${QNA_DATA.length} inserted`);
        }
      }

      // Rate limiting
      await new Promise((r) => setTimeout(r, 100));
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`Exception on item ${i + 1}:`, message);
      errorCount++;
    }
  }

  console.log(`\nIngestion complete.`);
  console.log(`Success: ${successCount} | Errors: ${errorCount}`);
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Ingestion failed: ${message}`);
  process.exitCode = 1;
});
