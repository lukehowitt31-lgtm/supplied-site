import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { createClient } from "next-sanity";

function loadEnvFile(filePath: string): void {
  if (!existsSync(filePath)) return;
  const content = readFileSync(filePath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

function requiredEnv(name: string): string {
  const val = process.env[name];
  if (!val) throw new Error(`Missing env var: ${name}`);
  return val;
}

interface StoryContent {
  slug: string;
  title: string;
  clientName: string;
  industry: string;
  heroHeadline: string;
  heroSubheadline?: string;
  heroTags: string[];
  challenge: string;
  solution: string;
  result: string;
  metrics: Array<{ val: string; lbl: string }>;
  quote: string;
  quoteAuthor: string;
  quoteRole: string;
  ctaLabel: string;
  ctaHref: string;
  sections: Array<{
    sectionId: string;
    tag?: string;
    heading?: string;
    headingAccent?: string;
    body?: string;
    items?: Array<{ title?: string; body?: string; value?: string }>;
  }>;
}

const stories: StoryContent[] = [
  {
    slug: "healf",
    title: "Healf",
    clientName: "Healf",
    industry: "Health & Wellness",
    heroHeadline: "The Packaging Infrastructure Behind 434% Growth.",
    heroTags: ["End-to-End Partner", "Forecast-Led Supply", "EU Production", "10–15 SKUs", "434% Growth Year"],
    challenge: "When we began working with Healf nearly two years ago, the brand was accelerating rapidly. A lean team. Exceptional marketing execution. Clear premium positioning.",
    solution: "But packaging had not yet been structured for scale. Lead times ranged from two weeks for plain UK shippers to up to three months for cost-first overseas supply. Forecasting was reactive. Supplier sourcing was fragmented.",
    result: "At modest growth, that's inefficient. At 434% annual growth, it becomes a risk.",
    metrics: [
      { val: "434%", lbl: "Growth Year" },
      { val: "10–15", lbl: "SKUs Managed" },
      { val: "6–10", lbl: "Deliveries/Year" },
      { val: "30%+", lbl: "Cost Saving" },
    ],
    quote: "From ideation to execution, the attention to detail and care shown by Supplied is second to none. They delivered a high-quality product with an incredibly fast turnaround, and were an absolute pleasure to work with throughout.",
    quoteAuthor: "Oscar",
    quoteRole: "Head of Brand, Healf",
    ctaLabel: "Start a Project",
    ctaHref: "/contact-us",
    sections: [
      {
        sectionId: "context",
        tag: "The Context",
        heading: "A brand scaling fast.",
        headingAccent: "Packaging hadn't caught up.",
      },
      {
        sectionId: "challenge",
        tag: "The Challenge",
        heading: "Three structural issues",
        headingAccent: "blocking scale.",
        items: [
          { value: "01", title: "Reactive Sourcing", body: "Suppliers selected opportunistically, without long-term forecasting or supply chain visibility." },
          { value: "02", title: "Brand Misalignment", body: "Plain shipper boxes with branded tape did not reflect Healf's premium positioning." },
          { value: "03", title: "Lead Time Volatility", body: "Two-week local turnaround versus three-month overseas production created instability and stock risk." },
        ],
      },
      {
        sectionId: "ownership",
        tag: "What We Took Ownership Of",
        heading: 'From "ordered when needed" to',
        headingAccent: "engineered infrastructure.",
        items: [
          { title: "5 core D2C shipper SKUs" },
          { title: "Annual premium Advent Calendar" },
          { title: "Healf:Zone flagship device packaging" },
          { title: "Branded tape" },
          { title: "Merch and experiential packaging" },
          { title: "Structured forecast planning" },
          { title: "Delivery scheduling aligned to 3PL" },
          { title: "10–15 SKUs across 6–10 shipments/year" },
        ],
      },
      {
        sectionId: "results",
        tag: "The Results",
        body: "Packaging is no longer a stress point internally. It is structured, predictable and aligned with brand ambition.",
        items: [
          { value: "434%", body: "Growth supported without packaging bottlenecks" },
          { value: "10–15", body: "Active SKUs managed under one partner" },
          { value: "6–10", body: "Structured deliveries annually" },
          { value: "30%+", body: "Cost saving vs equivalent sourced elsewhere" },
        ],
      },
      {
        sectionId: "takeaway",
        tag: "The Takeaway",
        heading: "High-growth brands do not struggle because of marketing. They struggle when operational complexity catches up. Packaging is often one of the first pressure points — fragmented sourcing, unstable lead times, poor cost visibility.",
        body: "For Healf, we removed packaging as a growth risk. We built the infrastructure behind the scenes so scale could happen without friction.",
      },
      {
        sectionId: "cta",
        heading: "Scaling quickly and packaging still",
        headingAccent: "feels reactive?",
        body: "Let's structure it properly.",
      },
    ],
  },
  {
    slug: "spacegoods",
    title: "Spacegoods",
    clientName: "Spacegoods",
    industry: "D2C & Retail",
    heroHeadline: "Come for the project.|Stay for the partnership.",
    heroTags: ["D2C & Retail", "Monthly Supply Cadence", "Crash-Lock Engineering", "Tesco Launch", "Brand-Led Packaging"],
    challenge: "When we first began working with Spacegoods, the brand was entering a new phase. Seed investment secured. Team expanding. Momentum building.",
    solution: "The first conversation wasn't about becoming a long-term packaging partner. It was about upgrading their mailer boxes. Functional, but inefficient. The brand was bold and visually distinctive — the packaging didn't yet reflect that.",
    result: "The first project was simple: introduce branded mailer boxes. What followed was something bigger.",
    metrics: [
      { val: "10+", lbl: "SKUs Managed" },
      { val: "+122%", lbl: "Search Growth" },
      { val: "~30%", lbl: "Cost Optimisation" },
      { val: "Tesco", lbl: "Retail Launch" },
    ],
    quote: "The box became part of the brand experience — not just the packaging around it.",
    quoteAuthor: "Spacegoods Team",
    quoteRole: "",
    ctaLabel: "Start a Project",
    ctaHref: "/contact-us",
    sections: [
      {
        sectionId: "context",
        tag: "The Context",
        heading: "It started with",
        headingAccent: "a better mailer box.",
      },
      {
        sectionId: "journey",
        tag: "The Journey",
        items: [
          { value: "Phase 01", title: "Elevating the Mailer", body: "We developed Spacegoods' first branded mailer boxes — upgrading the unboxing experience while maintaining cost discipline. We optimised down to three core formats and introduced a crash-lock structure for the larger format, significantly improving packing speed at the 3PL.\n---\nThe box became part of the brand experience — not just the packaging around it." },
          { value: "Phase 02", title: "Growth Accelerates", body: "During active supply, Spacegoods experienced +122% increase in search interest, +75.7% organic session growth, and +45% share of voice. We established a consistent monthly delivery rhythm — flexing when needed as volume swelled.\n---\nPackaging didn't slow growth. It supported it." },
          { value: "Phase 03", title: "From Project to Partnership", body: "The relationship naturally evolved. We began managing D2C mailers, starter kit packaging, retail product cartons, and auxiliary projects. Today we manage 10+ SKUs for Spacegoods.\n---\nNot because we pitched a partnership. But because value was proven early." },
          { value: "Phase 04", title: "Structuring for Retail", body: "When Spacegoods secured Tesco distribution, we engineered retail-ready cartons retaining their signature semi-opaque, pearlescent finish through specialist laminates and layered print techniques. Visually striking. Retail compliant. Cost controlled.\n---\nAnd critically — ready in time for launch." },
        ],
      },
      {
        sectionId: "growth",
        tag: "Market Impact During Supply",
        items: [
          { value: "+122%", title: "Search interest growth" },
          { value: "+75.7%", title: "Organic session growth" },
          { value: "+45%", title: "Share of voice increase" },
          { value: "+450%", title: "Rainbow Dust review breakout" },
        ],
      },
      {
        sectionId: "operational",
        tag: "Operational Impact",
        items: [
          { title: "Reduction in unnecessary box variation" },
          { title: "Structured monthly delivery cadence" },
          { title: "Improved 3PL packing efficiency via crash-lock formats" },
          { title: "Cost optimisation across retail cartons (est. up to 30%)" },
          { title: "Strategic supply chain monitoring as volume scales" },
          { title: "Packaging evolves with the business — never static" },
        ],
      },
      {
        sectionId: "brand",
        tag: "Brand Impact",
        heading: "The packaging became part of the conversation. Not just a container.",
        headingAccent: "But an extension of the brand.",
        items: [
          { title: "Increased UGC featuring packaging" },
          { title: "Positive customer inbound" },
          { title: "Daily DMs from other brands" },
        ],
      },
      {
        sectionId: "takeaway",
        tag: "The Takeaway",
        heading: "This wasn't about a single box redesign. It was about building the foundations of a structured packaging system — one capable of supporting D2C scale and retail expansion simultaneously.",
        body: "When given time and trust, we don't just deliver packaging. We build infrastructure. And when growth accelerates, that infrastructure becomes",
        headingAccent: "invaluable.",
      },
      {
        sectionId: "cta",
        heading: "Ready to turn a project into",
        headingAccent: "a partnership?",
        body: "Let's start with what you need today.",
      },
    ],
  },
  {
    slug: "glaize-x-aston-martin",
    title: "Glaize × Aston Martin",
    clientName: "Glaize",
    industry: "Limited Edition",
    heroHeadline: "Glaize × Aston Martin",
    heroSubheadline: "Crossing the finish line with a limited-edition collaboration — delivered in just 3.5 weeks.",
    heroTags: ["Limited Edition", "Litho Production", "3.5 Week Turnaround", "Physical Colour Match", "British Grand Prix"],
    challenge: "When Glaize secured a last-minute collaboration opportunity with Aston Martin ahead of the British Grand Prix, the clock started immediately.",
    solution: "This wasn't a routine packaging project. It was a limited-edition mailer box tied to one of the most high-profile weekends in the racing calendar. The timeline was immovable. The brand expectations were exacting. The margin for error was zero.",
    result: "Aston Martin Green isn't just a colour — it's heritage. It required precise physical colour matching, not a simple Pantone reference.",
    metrics: [
      { val: "200", lbl: "Limited Edition Units" },
      { val: "3.5", lbl: "Weeks End-to-End" },
      { val: "Zero", lbl: "Delays" },
      { val: "Exact", lbl: "Colour Match" },
    ],
    quote: "The team moved mountains to deliver on time. You don't find that kind of commitment easily.",
    quoteAuthor: "Glaize Team",
    quoteRole: "",
    ctaLabel: "Start a Project",
    ctaHref: "/contact-us",
    sections: [
      {
        sectionId: "context",
        tag: "The Context",
        heading: "A last-minute collaboration.",
        headingAccent: "An immovable deadline.",
      },
      {
        sectionId: "cta",
        heading: "Got a deadline that",
        headingAccent: "can't move?",
        body: "We'll get it done.",
      },
    ],
  },
  {
    slug: "trip",
    title: "TRIP",
    clientName: "TRIP",
    industry: "Supply Chain",
    heroHeadline: "Accelerating Supply Chains for a|Fast-Growing Brand.",
    heroSubheadline: "Reducing lead times, improving flexibility, and maintaining brand integrity — all while keeping costs competitive.",
    heroTags: ["Custom Rigid Tube", "Custom Inner Collar", "EU Production", "Supply Chain Success"],
    challenge: "TRIP, one of the UK's fastest-growing CBD brands, had built significant retail and D2C momentum. But their tube packaging supply chain — sourced from China — was creating friction at the rate they were scaling.",
    solution: "Lead times of 12+ weeks were creating bottlenecks, making it difficult to respond quickly to market demand and inventory fluctuations.",
    result: "",
    metrics: [
      { val: "–6 wks", lbl: "Lead Time Reduction" },
      { val: "50%", lbl: "Faster Turnaround" },
      { val: "<6 wks", lbl: "New Lead Time" },
      { val: "Monthly", lbl: "Replenishment Orders" },
    ],
    quote: "Supplied completely transformed our tube supply chain. The speed and flexibility we have now is game-changing for us.",
    quoteAuthor: "TRIP Team",
    quoteRole: "",
    ctaLabel: "Start a Project",
    ctaHref: "/contact-us",
    sections: [
      {
        sectionId: "context",
        tag: "The Context",
        heading: "A supply chain built for",
        headingAccent: "yesterday's demand.",
      },
      {
        sectionId: "cta",
        heading: "Supply chain holding you",
        headingAccent: "back?",
        body: "Let's fix it together.",
      },
    ],
  },
  {
    slug: "glow-for-it",
    title: "Glow For It",
    clientName: "Glow For It",
    industry: "Influencer Collab",
    heroHeadline: "Delivering Premium Packaging|Under Pressure.",
    heroSubheadline: "A high-profile influencer collaboration for a fast-growing beauty brand — from brief to order in just 20 days.",
    heroTags: ["Custom Mailer Box", "Custom Insert", "UK Production", "Influencer Collaboration"],
    challenge: "Glow For It approached us with a high-profile project — a premium packaging experience for a collaboration with Kyra-Mae, a prominent influencer. The project faced several challenges from the outset.",
    solution: "The packaging needed to be bespoke, beautiful, and ready for a pre-campaign photoshoot — all within an extremely compressed timeline.",
    result: "",
    metrics: [
      { val: "20", lbl: "Days Brief to Order" },
      { val: "1 day", lbl: "First Design Version" },
      { val: "On time", lbl: "Delivery Hit" },
      { val: "Kyra-Mae", lbl: "Influencer Collab" },
    ],
    quote: "We worked with Marcos, Alex, and Luke for our recent influencer box edit project and they were truly AMAZING! They went absolutely above and beyond to meet our tight deadlines and even hand-delivered samples to our office to help improve timelines. The quality of the box itself was beautiful, and it really exceeded our expectations.",
    quoteAuthor: "Daisy Kelly",
    quoteRole: "CEO & Founder, Glow For It",
    ctaLabel: "Start a Project",
    ctaHref: "/contact-us",
    sections: [
      {
        sectionId: "context",
        tag: "The Context",
        heading: "A high-profile collab.",
        headingAccent: "A tight deadline.",
      },
      {
        sectionId: "challenge",
        tag: "The Challenge",
        heading: "Premium expectations.",
        headingAccent: "No room for delay.",
        items: [
          { value: "01", title: "Bespoke Design", body: "Creating a unique design that aligned with premium branding while effectively accommodating the product components." },
          { value: "02", title: "Time Constraints", body: "Managing an extremely tight production timeline without compromising on quality or brand standards." },
          { value: "03", title: "Pre-Campaign Needs", body: "Providing printed samples for a photoshoot with Kyra-Mae to promote the campaign in advance of launch." },
        ],
      },
      {
        sectionId: "solution",
        tag: "Our Solution",
        heading: "Speed, precision, and",
        headingAccent: "the personal touch.",
        items: [
          { value: "01", title: "Rapid Initial Design", body: "Within 1 day of receiving the content samples, we developed the first version of the box design, including blank sample pictures for immediate feedback." },
          { value: "02", title: "Iterative Design Process", body: "Over the next 2 weeks, we worked closely with the client to refine the design based on feedback and new brief inputs. Simultaneously, we confirmed quotes to keep the project within budget." },
          { value: "03", title: "Digitally Printed Samples", body: "We identified a quick-turnaround digital printing solution for samples. These were used in a photoshoot with Kyra-Mae, building excitement for the launch." },
          { value: "04", title: "The Personal Touch", body: "We personally delivered the printed samples to the client's office to hit crucial marketing deadlines. During the visit, we reviewed final artwork and expedited any last-minute adjustments." },
        ],
      },
      {
        sectionId: "results",
        tag: "The Results",
        items: [
          { value: "Premium", body: "Bespoke packaging that elevated the campaign and influencer impressions" },
          { value: "On Time", body: "Despite the tight timeline, main order completed and delivered within target" },
          { value: "Launched", body: "Quick-turnaround printed samples enabled a successful promotional photoshoot" },
        ],
      },
      {
        sectionId: "takeaway",
        tag: "The Takeaway",
        heading: "Influencer collaborations move fast. The packaging has to keep up — without sacrificing quality, brand alignment, or the details that make it shareable.",
        body: "When deadlines are tight and stakes are high, the difference is a partner who",
        headingAccent: "goes above and beyond.",
      },
      {
        sectionId: "cta",
        heading: "Got a launch deadline that",
        headingAccent: "can't slip?",
        body: "We'll make sure the packaging is ready.",
      },
    ],
  },
  {
    slug: "uncle-matts-hats",
    title: "Uncle Matt's Hats",
    clientName: "Uncle Matt's Hats",
    industry: "For A Just Cause",
    heroHeadline: "More Than Just a Hat.|More Than Just Packaging.",
    heroSubheadline: "How we helped turn a heartfelt mission into the most iconic hat packaging on earth.",
    heroTags: ["Custom Sized Tub", "Inside Print", "CN Production", "Mental Health Awareness"],
    challenge: "Uncle Matt's Hats isn't just a cap brand. It's a tribute to Matt — a brother, an uncle, and someone who, like so many, faced silent struggles with mental health. Every hat sold helps spark much-needed conversations and reminds people that it's okay to speak up, and okay not to have it all figured out.",
    solution: "The brand's heart and honesty hit us straight away — so we made it our mission to deliver packaging that matched that same authenticity.",
    result: "They wanted their hats to ship in ice cream tubs. Because just like a brain freeze, life can hit you with those unexpected moments where everything feels overwhelming. The packaging had to tell that story.",
    metrics: [
      { val: "Iconic", lbl: "Packaging Moment" },
      { val: "3–4", lbl: "Sample Rounds" },
      { val: "Kept", lbl: "Not Thrown Away" },
      { val: "10%", lbl: "Profits to Charity" },
    ],
    quote: "The packaging was so fundamental to our product proposition and before we started talking to other suppliers, I really thought it may not be able to be done! The whole process became instantly easier once we started working with the Supplied team!",
    quoteAuthor: "Steve Willicott",
    quoteRole: "Founder, Uncle Matt's Hats",
    ctaLabel: "Start a Project",
    ctaHref: "/contact-us",
    sections: [
      {
        sectionId: "context",
        tag: "The Context",
        heading: "A tribute to Matt.",
        headingAccent: "A mission that matters.",
      },
      {
        sectionId: "challenge",
        tag: "The Challenge",
        heading: "A concept that didn't exist.",
        headingAccent: "Until we built it.",
        items: [
          { value: "01", title: "Hard to Find the Right Fit", body: "Boxes? Easy. Ice cream tubs? No problem. But nothing existed that actually fit a hat and felt on-brand." },
          { value: "02", title: "Close, But No Cigar", body: "Off-the-shelf options got close but never quite aligned with the premium branding or component requirements." },
          { value: "03", title: "Then Uncle Matt's Found Us", body: "From day one, we knew this wasn't a quick job. But the mission mattered, so we committed. No compromises, no shortcuts." },
        ],
      },
      {
        sectionId: "solution",
        tag: "Our Solution",
        heading: "Iterated until it was",
        headingAccent: "perfect.",
        items: [
          { value: "01", title: "Nailed the Tricky Tub Design", body: "Ice cream tubs aren't made for hats, especially when it comes to printing. We worked through multiple iterations to get the structure and artwork right, giving it that authentic, premium feel." },
          { value: "02", title: "Iterated Until Perfect", body: "We didn't stop at \"good enough\". It took 3–4 rounds of samples, tweaks, and fine-tuning to lock in the fit, finish, and brand presence — and we were with Steve every step of the way." },
          { value: "03", title: "Built to Last (and Be Loved)", body: "This wasn't throwaway packaging. It had to be something people wanted to keep. We chose materials and finishes that made the tub feel as meaningful as what's inside." },
        ],
      },
      {
        sectionId: "results",
        tag: "The Results",
        items: [
          { value: "Iconic", body: "The tub has become a total statement piece — instantly recognisable, totally unique, and just as talked about as the hat itself." },
          { value: "Kept", body: "Customers aren't throwing these away. They're reusing them, displaying them, storing things in them. Packaging with a second life." },
          { value: "Amplified", body: "This packaging didn't just protect the product — it helped tell the story. It's played a key role in raising awareness and driving conversations." },
          { value: "Frozen", body: "Some customers were so convinced it was real ice cream, they put it in the freezer before realising it was actually a hat!" },
        ],
      },
      {
        sectionId: "commitment",
        tag: "Our Commitment",
        heading: "From the very first conversation, we knew this was something special. Uncle Matt's Hats stands for openness, empathy, and connection — and we're proud to be a small part of that bigger message.",
        body: "This wasn't just about delivering packaging. It was about backing a movement we deeply believe in. We encourage everyone to go get a hat and give Steve support for an amazing cause.",
      },
      {
        sectionId: "takeaway",
        tag: "The Takeaway",
        heading: "Some packaging projects are about efficiency, cost, and lead times. This one was about doing justice to a cause that genuinely matters. The brief was unconventional. The solution didn't exist yet. But the mission was worth every iteration.",
        body: "Great packaging doesn't just protect what's inside.",
        headingAccent: "It amplifies what it stands for.",
      },
      {
        sectionId: "cta",
        heading: "Got a packaging challenge that",
        headingAccent: "hasn't been solved yet?",
        body: "We love the ones that haven't been done before.",
      },
    ],
  },
];

async function main() {
  const cwd = process.cwd();
  loadEnvFile(path.join(cwd, ".env.local"));

  const projectId = requiredEnv("NEXT_PUBLIC_SANITY_PROJECT_ID");
  const dataset = requiredEnv("NEXT_PUBLIC_SANITY_DATASET");
  const apiVersion = requiredEnv("NEXT_PUBLIC_SANITY_API_VERSION");
  const writeToken = requiredEnv("SANITY_API_WRITE_TOKEN");

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token: writeToken,
    useCdn: false,
  });

  for (const story of stories) {
    const publishedId = `clientStory-${story.slug}`;
    const draftId = `drafts.${publishedId}`;

    console.log(`\n--- ${story.clientName} (${story.slug}) ---`);

    const fields: Record<string, unknown> = {
      title: story.title,
      clientName: story.clientName,
      industry: story.industry,
      heroHeadline: story.heroHeadline,
      ...(story.heroSubheadline ? { heroSubheadline: story.heroSubheadline } : {}),
      heroTags: story.heroTags,
      challenge: story.challenge,
      solution: story.solution,
      ...(story.result ? { result: story.result } : {}),
      metrics: story.metrics.map((m) => ({
        _type: "statItem",
        val: m.val,
        lbl: m.lbl,
      })),
      quote: story.quote,
      quoteAuthor: story.quoteAuthor,
      ...(story.quoteRole ? { quoteRole: story.quoteRole } : {}),
      ctaLabel: story.ctaLabel,
      ctaHref: story.ctaHref,
      sections: story.sections.map((s) => ({
        _type: "object",
        sectionId: s.sectionId,
        ...(s.tag ? { tag: s.tag } : {}),
        ...(s.heading ? { heading: s.heading } : {}),
        ...(s.headingAccent ? { headingAccent: s.headingAccent } : {}),
        ...(s.body ? { body: s.body } : {}),
        ...(s.items
          ? {
              items: s.items.map((item) => ({
                _type: "object",
                ...(item.title ? { title: item.title } : {}),
                ...(item.body ? { body: item.body } : {}),
                ...(item.value ? { value: item.value } : {}),
              })),
            }
          : {}),
      })),
    };

    // Create slug field
    const slugField = { _type: "slug", current: story.slug };

    // Patch published document
    try {
      await client.createIfNotExists({
        _id: publishedId,
        _type: "clientStory",
        slug: slugField,
      });
      await client
        .patch(publishedId)
        .setIfMissing(fields)
        .setIfMissing({ slug: slugField })
        .commit({ autoGenerateArrayKeys: true });
      console.log(`  ✓ Published: ${publishedId}`);
    } catch (err) {
      console.error(`  ✗ Published failed:`, err);
    }

    // Patch draft document
    try {
      const existingDraft = await client.getDocument(draftId);
      if (!existingDraft) {
        const existingPublished = await client.getDocument(publishedId);
        if (existingPublished) {
          const { _rev, _updatedAt, _createdAt, ...rest } = existingPublished as Record<string, unknown>;
          await client.createIfNotExists({
            ...rest,
            _id: draftId,
          } as Parameters<typeof client.createIfNotExists>[0]);
        } else {
          await client.createIfNotExists({
            _id: draftId,
            _type: "clientStory",
            slug: slugField,
          });
        }
      }
      await client
        .patch(draftId)
        .setIfMissing(fields)
        .setIfMissing({ slug: slugField })
        .commit({ autoGenerateArrayKeys: true });
      console.log(`  ✓ Draft: ${draftId}`);
    } catch (err) {
      console.error(`  ✗ Draft failed:`, err);
    }
  }

  console.log("\n✅ Done seeding client stories.");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
