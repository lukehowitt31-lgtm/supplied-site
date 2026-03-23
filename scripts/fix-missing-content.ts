import { readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { createClient } from "next-sanity";

function loadEnv() {
  const content = readFileSync(path.join(process.cwd(), ".env.local"), "utf-8");
  const get = (k: string) =>
    content
      .split("\n")
      .find((l) => l.startsWith(k))
      ?.split("=")
      .slice(1)
      .join("=")
      .trim() || "";
  return {
    projectId: get("NEXT_PUBLIC_SANITY_PROJECT_ID"),
    dataset: get("NEXT_PUBLIC_SANITY_DATASET"),
    apiVersion: get("NEXT_PUBLIC_SANITY_API_VERSION"),
    token: get("SANITY_API_WRITE_TOKEN"),
  };
}

const glaizeSections = [
  {
    _type: "object",
    sectionId: "context",
    tag: "The Context",
    heading: "A last-minute collaboration.",
    headingAccent: "An immovable deadline.",
  },
  {
    _type: "object",
    sectionId: "challenge",
    tag: "The Challenge",
    heading: "Multiple pressures.",
    headingAccent: "No margin for error.",
    body: "Under normal conditions, artwork and colour approvals alone can take 1–2 weeks. Here, the entire project had to move from brief to delivery in 3.5 weeks.",
    items: [
      { _type: "object", title: "No finalised artwork or colour approvals at project start" },
      { _type: "object", title: "A fixed Grand Prix deadline that could not move" },
      { _type: "object", title: "Production of just 200 units at premium quality" },
      { _type: "object", title: "EU litho production required (not standard UK supply)" },
      { _type: "object", title: "Physical colour matching to Aston Martin Green" },
      { _type: "object", title: "Structural spec transfer from UK to EU production" },
    ],
  },
  {
    _type: "object",
    sectionId: "sprint",
    tag: "Our Approach",
    heading: "Engineered as a ",
    headingAccent: "controlled sprint",
    body: "This wasn't about rushing. It was about controlled pace and precision handling.",
    items: [
      { _type: "object", value: "01", title: "Immediate Brief Alignment", body: "Scope, constraints and budget locked within 24 hours to avoid drift." },
      { _type: "object", value: "02", title: "Structural Spec Transfer", body: "Replicated the profile of Glaize's existing D2C mailer, ensuring consistency despite switching production geography." },
      { _type: "object", value: "03", title: "Accelerated Colour Matching", body: "Aston Martin Green was physically colour matched and approved through an expedited loop — precision without compromise." },
      { _type: "object", value: "04", title: "Parallel Workflow", body: "Artwork refinement, print preparation and production scheduling ran simultaneously rather than sequentially to protect time." },
      { _type: "object", value: "05", title: "Secured Production Slot", body: "EU litho production capacity was secured early, keeping the timeline protected all the way to the line." },
    ],
  },
  {
    _type: "object",
    sectionId: "results",
    tag: "The Result",
    heading: "It crossed the finish line ",
    headingAccent: "exactly on schedule.",
    items: [
      { _type: "object", value: "200", title: "Premium litho mailer boxes produced" },
      { _type: "object", value: "3.5 wks", title: "End-to-end delivery" },
      { _type: "object", value: "Zero", title: "Delays — on time for Grand Prix" },
      { _type: "object", title: "On budget" },
      { _type: "object", title: "Aston Martin Green matched precisely" },
      { _type: "object", title: "No late adjustments, no quality drift" },
    ],
  },
  {
    _type: "object",
    sectionId: "takeaway",
    tag: "The Takeaway",
    heading: "When timelines are fixed and expectations are exacting, transactional suppliers struggle to keep pace. This project wasn't just about speed. It was about disciplined execution under pressure — aligning structure, colour and cost while protecting a non-negotiable deadline.",
    body: "Exceptional packaging performance isn't accidental. ",
    headingAccent: "It's engineered.",
  },
  {
    _type: "object",
    sectionId: "cta",
    heading: "Need packaging that performs ",
    headingAccent: "under pressure?",
    body: "We engineer results, not excuses.",
  },
];

const tripSections = [
  {
    _type: "object",
    sectionId: "context",
    tag: "The Context",
    heading: "A supply chain built for",
    headingAccent: "yesterday's demand.",
  },
  {
    _type: "object",
    sectionId: "challenge",
    tag: "The Challenge",
    heading: "Three interconnected pressures",
    headingAccent: "holding growth back.",
    items: [
      { _type: "object", value: "01", title: "Long Lead Times", body: "Sourcing from China took over 12 weeks, creating bottlenecks that made it difficult to respond quickly to market demand and inventory fluctuations." },
      { _type: "object", value: "02", title: "Cost vs. Flexibility", body: "TRIP needed a more agile supply chain that would allow them to scale production based on fluctuating demand while maintaining competitive pricing." },
      { _type: "object", value: "03", title: "Brand Integrity", body: "As a brand with a strong identity, TRIP required precise colour matching to ensure product consistency, making any supplier transition more complex." },
    ],
  },
  {
    _type: "object",
    sectionId: "solution",
    tag: "Our Solution",
    heading: "A structured transition to",
    headingAccent: "European production.",
    items: [
      { _type: "object", value: "01", title: "Faster Sourcing & Production", body: "We sourced the product from Europe, successfully cutting the total lead time from 12+ weeks to just 5–6 weeks." },
      { _type: "object", value: "02", title: "Competitive Pricing with Scalability", body: "We structured a cost-effective solution that matched — and in many cases outperformed — the CN supplier's pricing, with a scalable model that improves with volume." },
      { _type: "object", value: "03", title: "Two-Stage Sampling for Accuracy", body: "Blank samples confirmed size, material quality and structural integrity. Printed samples delivered within 3 weeks allowed TRIP to assess colour accuracy before full production." },
      { _type: "object", value: "04", title: "Streamlined Order Process", body: "With the new supply chain in place, TRIP can now place orders with confidence, securing deliveries in under 6 weeks with full visibility." },
    ],
  },
  {
    _type: "object",
    sectionId: "results",
    tag: "The Results",
    items: [
      { _type: "object", value: "50%", title: "Faster lead times — from 12+ weeks to just 5–6 weeks" },
      { _type: "object", value: "Better", title: "Cost efficiency than CN, with long-term savings through scalable volumes" },
      { _type: "object", value: "Monthly", title: "Replenishment orders — a supply chain that supports rapid growth" },
    ],
  },
  {
    _type: "object",
    sectionId: "takeaway",
    tag: "The Takeaway",
    heading: "Fast-growing brands can't afford supply chains that hold them back. By transitioning TRIP's tube production from China to Europe, we halved their lead times, improved cost efficiency, and gave them the agility to scale on their terms.",
    body: "Better supply chains aren't just about speed. They're about ",
    headingAccent: "control, confidence, and growth without friction.",
  },
  {
    _type: "object",
    sectionId: "cta",
    heading: "Supply chain holding you back from ",
    headingAccent: "scaling faster?",
    body: "Let's fix that.",
  },
];

const quotes: Record<string, { quote: string; quoteAuthor: string; quoteRole: string }> = {
  healf: {
    quote: "From ideation to execution, the attention to detail and care shown by Supplied is second to none. They delivered a high-quality product with an incredibly fast turnaround, and were an absolute pleasure to work with throughout.",
    quoteAuthor: "Oscar",
    quoteRole: "Head of Brand, Healf",
  },
  spacegoods: {
    quote: "The box became part of the brand experience — not just the packaging around it.",
    quoteAuthor: "Spacegoods Team",
    quoteRole: "",
  },
  "glaize-x-aston-martin": {
    quote: "We work with many suppliers, but very few are as helpful, supportive and flexible as Supplied. They always find a solution for anything you throw at them and the communication is always 10/10. Marcos, Alex and the team are amazing to work with and I highly recommend their services.",
    quoteAuthor: "Glaize Team",
    quoteRole: "",
  },
  trip: {
    quote: "Supplied made everything super easy by quickly finding more cost effective packaging options with faster lead times, handling all the details, and getting the samples perfect on the first try. Our Supply team seamlessly switched from old to new supply without impacting customer orders.",
    quoteAuthor: "Emily Gault",
    quoteRole: "Innovation & Implementation Manager, TRIP",
  },
  "glow-for-it": {
    quote: "We worked with Marcos, Alex, and Luke for our recent influencer box edit project and they were truly AMAZING! They went absolutely above and beyond to meet our tight deadlines and even hand-delivered samples to our office to help improve timelines. The quality of the box itself was beautiful, and it really exceeded our expectations.",
    quoteAuthor: "Daisy Kelly",
    quoteRole: "CEO & Founder, Glow For It",
  },
  "uncle-matts-hats": {
    quote: "The packaging was so fundamental to our product proposition and before we started talking to other suppliers, I really thought it may not be able to be done! The whole process became instantly easier once we started working with the Supplied team!",
    quoteAuthor: "Steve Willicott",
    quoteRole: "Founder, Uncle Matt's Hats",
  },
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

  const slugs = [
    "healf", "spacegoods", "glaize-x-aston-martin",
    "trip", "glow-for-it", "uncle-matts-hats",
  ];

  for (const slug of slugs) {
    console.log(`\n--- ${slug} ---`);

    const forcePatch: Record<string, unknown> = {};

    // Force-set quotes for all stories
    if (quotes[slug]) {
      forcePatch.quote = quotes[slug].quote;
      forcePatch.quoteAuthor = quotes[slug].quoteAuthor;
      if (quotes[slug].quoteRole) {
        forcePatch.quoteRole = quotes[slug].quoteRole;
      }
    }

    // Force-set full sections for Glaize and TRIP
    if (slug === "glaize-x-aston-martin") {
      forcePatch.sections = glaizeSections;
    } else if (slug === "trip") {
      forcePatch.sections = tripSections;
    }

    if (Object.keys(forcePatch).length === 0) {
      console.log("  No fixes needed");
      continue;
    }

    for (const idPrefix of ["clientStory.", "drafts.clientStory."]) {
      const docId = `${idPrefix}${slug}`;
      try {
        const doc = await client.getDocument(docId);
        if (!doc) {
          console.log(`  - ${docId} not found, skipping`);
          continue;
        }
        await client.patch(docId).set(forcePatch).commit({ autoGenerateArrayKeys: true });
        console.log(`  ✓ Patched: ${docId}`);
      } catch (err) {
        console.error(`  ✗ Failed: ${docId}`, err);
      }
    }
  }

  // Verify final state
  console.log("\n--- Final verification ---");
  const docs = await client.fetch(`*[_type == "clientStory" && !(_id in path("drafts.**"))]{
    _id, title, "slug": slug.current,
    heroHeadline,
    "sectionCount": count(sections),
    "sectionIds": sections[].sectionId,
    quote,
    quoteAuthor
  }`);
  for (const d of docs) {
    console.log(`  ${d.title}: ${d.sectionCount} sections [${d.sectionIds?.join(", ")}] | quote=${d.quote ? "✓" : "✗"} | author=${d.quoteAuthor || "—"}`);
  }

  console.log("\n✅ All fixes applied.");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
