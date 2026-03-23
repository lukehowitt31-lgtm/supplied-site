import { readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { createClient } from "next-sanity";

function loadEnv() {
  const content = readFileSync(path.join(process.cwd(), ".env.local"), "utf-8");
  const get = (k: string) =>
    content.split("\n").find((l) => l.startsWith(k))?.split("=").slice(1).join("=").trim() || "";
  return {
    projectId: get("NEXT_PUBLIC_SANITY_PROJECT_ID"),
    dataset: get("NEXT_PUBLIC_SANITY_DATASET"),
    apiVersion: get("NEXT_PUBLIC_SANITY_API_VERSION"),
    token: get("SANITY_API_WRITE_TOKEN"),
  };
}

const contextBodies: Record<string, string> = {
  healf: [
    "When we began working with Healf nearly two years ago, the brand was accelerating rapidly. A lean team. Exceptional marketing execution. Clear premium positioning.",
    "But packaging had not yet been structured for scale. Lead times ranged from two weeks for plain UK shippers to up to three months for cost-first overseas supply. Forecasting was reactive. Supplier sourcing was fragmented.",
    "At modest growth, that's inefficient. At 434% annual growth, it becomes a risk.",
  ].join("\n"),

  spacegoods: [
    "When we first began working with Spacegoods, the brand was entering a new phase. Seed investment secured. Team expanding. Momentum building.",
    "The first conversation wasn't about becoming a long-term packaging partner. It was about upgrading their mailer boxes. Functional, but inefficient. The brand was bold and visually distinctive — the packaging didn't yet reflect that.",
    "The first project was simple: introduce branded mailer boxes. What followed was something bigger.",
  ].join("\n"),

  "glaize-x-aston-martin": [
    "When Glaize secured a last-minute collaboration opportunity with Aston Martin ahead of the British Grand Prix, the clock started immediately.",
    "This wasn't a routine packaging project. It was a limited-edition mailer box tied to one of the most high-profile weekends in the racing calendar. The timeline was immovable. The brand expectations were exacting. The margin for error was zero.",
    "Aston Martin Green isn't just a colour — it's heritage. It required precise physical colour matching, not a simple Pantone reference.",
  ].join("\n"),

  trip: [
    "TRIP, one of the UK's fastest-growing CBD brands, had built significant retail and D2C momentum. But their tube packaging supply chain — sourced from China — was creating friction at the rate they were scaling.",
    "Lead times of 12+ weeks were creating bottlenecks, making it difficult to respond quickly to market demand and inventory fluctuations.",
  ].join("\n"),

  "glow-for-it": [
    "Glow For It approached us with a high-profile project — a premium packaging experience for a collaboration with Kyra-Mae, a prominent influencer. The project faced several challenges from the outset.",
    "The packaging needed to be bespoke, beautiful, and ready for a pre-campaign photoshoot — all within an extremely compressed timeline.",
  ].join("\n"),

  "uncle-matts-hats": [
    "Uncle Matt's Hats isn't just a cap brand. It's a tribute to Matt — a brother, an uncle, and someone who, like so many, faced silent struggles with mental health. Every hat sold helps spark much-needed conversations and reminds people that it's okay to speak up, and okay not to have it all figured out.",
    "The brand's heart and honesty hit us straight away — so we made it our mission to deliver packaging that matched that same authenticity.",
    "They wanted their hats to ship in ice cream tubs. Because just like a brain freeze, life can hit you with those unexpected moments where everything feels overwhelming. The packaging had to tell that story.",
  ].join("\n"),
};

async function main() {
  const env = loadEnv();
  const client = createClient({
    projectId: env.projectId,
    dataset: env.dataset,
    apiVersion: env.apiVersion,
    token: env.token,
    useCdn: false,
    perspective: "raw",
  });

  for (const [slug, body] of Object.entries(contextBodies)) {
    console.log(`\n--- ${slug} ---`);

    for (const prefix of ["clientStory.", "drafts.clientStory."]) {
      const docId = `${prefix}${slug}`;
      try {
        const doc = await client.getDocument(docId);
        if (!doc) { console.log(`  - ${docId} not found`); continue; }

        const sections = (doc as Record<string, unknown>).sections as Array<Record<string, unknown>> | undefined;
        if (!Array.isArray(sections)) { console.log(`  - ${docId} has no sections`); continue; }

        const ctxIdx = sections.findIndex((s) => s.sectionId === "context");
        if (ctxIdx === -1) { console.log(`  - ${docId} has no context section`); continue; }

        await client
          .patch(docId)
          .set({ [`sections[${ctxIdx}].body`]: body })
          .commit();
        console.log(`  ✓ ${docId} context body set`);
      } catch (err) {
        console.error(`  ✗ ${docId} failed:`, err);
      }
    }
  }

  console.log("\n✅ Context bodies seeded.");
}

main().catch((err) => { console.error("Fatal:", err); process.exit(1); });
