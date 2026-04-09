import "server-only";

import { sanityFetch } from "@/lib/sanity/fetch";
import { knowledgeHubPageQuery } from "@/lib/sanity/queries";

export interface KnowledgeHubFaq {
  q: string;
  a: string;
}

export interface KnowledgeHubCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
  bg: string;
  faqs: KnowledgeHubFaq[];
}

export interface KnowledgeHubPageContent {
  heroHeadline: string;
  heroSubheadline: string;
  contactCtaHeading: string;
  contactCtaBody: string;
  contactEmail: string;
  faqCategories: KnowledgeHubCategory[];
}

export const fallbackKnowledgeHubContent: KnowledgeHubPageContent = {
  heroHeadline: "Packaging |Knowledge Hub",
  heroSubheadline:
    "Instant answers to your packaging questions — from materials and MOQs to EU compliance and sustainability. Powered by our team's expertise across 200+ projects.",
  contactCtaHeading: "Can't find what you're looking for?",
  contactCtaBody: "Our team typically responds within 2 hours during business hours.",
  contactEmail: "hello@suppliedpackaging.com",
  faqCategories: [
    {
      id: "products",
      label: "Products & Packaging Types",
      icon: "📦",
      color: "#C8773E",
      bg: "#F5EDE4",
      faqs: [
        { q: "What types of packaging do you offer?", a: "We offer a full catalogue including ecommerce mailer boxes, rigid gift boxes, shipping boxes (0201 style), paper mailers, printed cans, cartonboard boxes, tissue paper, paper tape, labels & stickers, cards & leaflets, bags & pouches, inserts & fitments, and advent calendars. Everything is available through one partnership — one invoice, one point of contact." },
        { q: "What is the minimum order quantity (MOQ)?", a: "MOQs vary by product. Digitally printed mailer boxes start from 100–250 units. Rigid boxes from 500 units. Paper mailers from 500 (digital) or 2,000 (flexo). Shipping boxes from 250 (digital) or 2,000 (flexo). Printed cans have low MOQs with no plate charges. Tissue paper from 5,000 sheets. Paper tape from 72 rolls. We always try to find a solution that works for your current volumes." },
        { q: "What's the difference between digital and flexo printing?", a: "Digital printing uses CMYK inkjet technology — ideal for full-colour, photographic designs with low MOQs (100–500 units) and no plate charges. Flexo printing uses rubber plates to transfer ink — better for simple designs with 1–4 spot colours at higher volumes (2,000+ units) with lower per-unit costs. We'll recommend the right method based on your design, volumes, and budget." },
        { q: "What mailer box styles are available?", a: "We offer tuck-front mailers (the most popular ecommerce style), crash-lock base mailers (faster assembly for high-volume fulfilment), magnetic closure mailers (premium unboxing feel), and roll-end tuck-top (RETT) boxes. All are available with full inside and outside print in E or B flute corrugated board." },
        { q: "What rigid box styles can you produce?", a: "Four main styles: magnetic closure (book-style with concealed magnets), lift-off lid (classic two-piece), drawer boxes (sliding tray with outer sleeve), and hinged boxes (one-piece with integrated hinge). All fully customisable in size, material, print, and finishing. Typical lead time is 4–6 weeks from artwork approval." },
        { q: "Can you produce printed aluminium cans?", a: "Yes — digitally printed aluminium cans for beers, beverages, wellness drinks, and more. No plate charges, low MOQs, and full CMYK capability meaning photographic-quality designs are possible. Ideal for craft beverage brands, limited editions, and new product launches where you don't want to commit to massive volumes upfront." },
        { q: "What paper mailer options do you offer?", a: "We produce both flexo and digitally printed paper mailers — a sustainable alternative to poly mailers. Available in various sizes, with options for peel-and-seal closures, tear strips for easy returns, and expandable gussets. All paper mailers are fully recyclable in kerbside collections." },
        { q: "Do you make custom advent calendars?", a: "Absolutely. We design and manufacture fully bespoke advent calendars — from structural engineering and compartment sizing through to print and finishing. Popular with beauty, wellness, food & drink, and lifestyle brands for seasonal campaigns. We recommend starting the process 4–5 months before your launch date." },
        { q: "What finishing options are available?", a: "Available finishes include soft-touch lamination, gloss lamination, hot foil stamping (gold, silver, or custom Pantone colours), embossing, debossing, spot UV varnish, metallic inks, and paper-based lamination (plastic-free alternative). You can combine multiple finishes on a single product." },
        { q: "Can you produce custom inserts and fitments?", a: "Yes — we design custom corrugated inserts, foam inserts, pulp mould fitments, and vacuum-formed trays. Every insert is engineered to your exact product dimensions for a snug, damage-free fit. Corrugated inserts are the most sustainable and cost-effective option for most ecommerce applications." },
      ],
    },
    {
      id: "sustainability",
      label: "Sustainability & Materials",
      icon: "🌱",
      color: "#3A6B4A",
      bg: "#E8F0EA",
      faqs: [
        { q: "Are your packaging materials sustainable?", a: "Yes. We offer 100% recyclable packaging across our entire range. Materials include FSC-certified board and paper, recycled greyboard cores, water-based inks, and paper-based lamination alternatives. All our corrugated and cartonboard products are recyclable in standard kerbside collections." },
        { q: "What does FSC certification mean?", a: "FSC (Forest Stewardship Council) certification means the paper and board materials come from responsibly managed forests. Our supply chain includes FSC chain-of-custody certification, meaning materials are tracked from forest to finished product. This is increasingly important for brands making sustainability claims — and it's becoming a customer expectation." },
        { q: "What is mono-material packaging?", a: "Mono-material packaging uses a single material type (e.g., all paper, all PE) rather than combining different materials. This makes recycling far easier and more effective. We're seeing strong demand for mono-material mailers, pouches, and wraps — particularly from beauty and wellness brands moving away from multi-layer laminates." },
        { q: "Can rigid boxes be made sustainably?", a: "Yes. All our rigid boxes use FSC-certified board, recycled greyboard cores, and water-based inks. We also offer plastic-free finishing including paper-based lamination. Our rigid boxes are 100% recyclable and PPWR compliant for brands selling into European markets — without compromising on the premium look and feel." },
        { q: "What's the difference between recyclable and compostable packaging?", a: "Recyclable packaging can be processed and remade into new materials through standard waste streams. Compostable packaging breaks down in industrial composting facilities within a set timeframe. For most ecommerce brands, recyclable is the better choice — kerbside recycling infrastructure is well-established, while industrial composting access is limited. We always recommend recyclable first unless there's a specific use case for compostable." },
        { q: "Do you offer plastic-free packaging?", a: "Yes. Our paper mailers, tissue paper, paper tape, corrugated mailer boxes, and shipping boxes are all plastic-free. For rigid boxes, we offer paper-based lamination as an alternative to traditional plastic lamination. We can audit your current packaging and identify where plastic-free swaps are possible without compromising product protection or aesthetics." },
      ],
    },
    {
      id: "compliance",
      label: "EU PPWR & Compliance",
      icon: "⚖️",
      color: "#5B7FA5",
      bg: "#E4ECF5",
      faqs: [
        { q: "What is the EU PPWR?", a: "The EU Packaging and Packaging Waste Regulation (PPWR) is new legislation replacing the existing Packaging and Packaging Waste Directive. It introduces mandatory requirements for recyclability, recycled content minimums, standardised labelling, restrictions on excessive packaging, and stricter reporting obligations. If you sell products into the EU, this directly affects your packaging." },
        { q: "When do PPWR requirements come into effect?", a: "PPWR requirements are being phased in from 2025 onwards, with key milestones through 2030. Recyclability requirements, labelling obligations, and recycled content targets are all on staggered timelines. We recommend brands start auditing their packaging now — lead times for material transitions are longer than most people expect." },
        { q: "How does PPWR affect my packaging?", a: "Key impacts include: minimum recyclability thresholds your packaging must meet, mandatory recycled content percentages in plastic packaging, standardised disposal labelling across all EU markets, restrictions on excessive void space (the gap between product and packaging), and stricter reporting on packaging volumes and materials. We build PPWR compliance into every project from the design stage." },
        { q: "Is your packaging PPWR compliant?", a: "Yes. All packaging we design and source is built to meet current and upcoming PPWR requirements. This includes recyclability thresholds, recycled content targets, correct disposal labelling, substance restrictions (including PFAS-free), and FSC certification options. We stay ahead of regulatory changes so our clients don't have to." },
        { q: "What labelling is required under PPWR?", a: "PPWR requires standardised labelling for material identification and disposal instructions across EU markets. This replaces the patchwork of country-specific systems. We handle all compliance labelling as part of our artwork and pre-press service — ensuring your packaging meets requirements before it goes to print." },
        { q: "Do I need to worry about PPWR if I only sell in the UK?", a: "The UK has its own Extended Producer Responsibility (EPR) scheme which has similar aims around recyclability and reporting. If you sell into both UK and EU markets, you'll need to comply with both sets of regulations. We advise all our clients to design for the strictest standard — that way you're covered everywhere." },
      ],
    },
    {
      id: "pricing",
      label: "Pricing & Costs",
      icon: "💷",
      color: "#7B6B99",
      bg: "#EDE8F4",
      faqs: [
        { q: "How much do custom mailer boxes cost?", a: "Pricing depends on size, board type (E or B flute), print method (digital or litho-laminated), finishing, and quantity. As a rough guide, a standard full-colour digitally printed mailer box starts from around £1.50–3.00 per unit at 250 quantity, dropping significantly at higher volumes. We always provide a transparent cost breakdown so you can see exactly where your budget goes." },
        { q: "How much do rigid boxes cost?", a: "A standard magnetic closure rigid box with full-colour print and soft-touch lamination starts from around £3–5 per unit at 500 quantity, reducing significantly at higher volumes. Pricing varies based on size, board thickness, print, finishes (foiling, embossing, spot UV), and insert complexity. We'll provide multiple options so you can choose the right balance of premium and budget." },
        { q: "Do you charge for samples?", a: "We provide free unprinted samples so you can verify the structure, material, and feel before committing to print. For printed pre-production samples, there's typically a small charge that's credited against your first production order. We always recommend sampling before full production — it's the best way to avoid costly surprises." },
        { q: "Are there setup or tooling costs?", a: "For digitally printed products, there are no plate or tooling charges — that's one of the big advantages for lower volumes. For flexo printing, there are one-off plate charges (typically £150–400 depending on the number of colours). For rigid boxes, there may be a one-off tooling charge for custom structures. All costs are transparently broken down in our quotes." },
        { q: "How does your pricing compare to going direct to a factory?", a: "Our pricing is competitive with going direct because we aggregate volume across our client base, giving us buying power that individual brands can't access alone. On top of that, we handle design, artwork, QA, logistics, and compliance — services that would otherwise cost you time and money to manage internally. Most clients see a 15–25% total cost reduction when consolidating through Supplied." },
        { q: "Can you help reduce my current packaging costs?", a: "Yes — we offer free packaging audits where we review your existing packaging, suppliers, and costs to identify savings. Common areas include material optimisation (right-sizing, board weight reduction), supplier consolidation (reducing the number of vendors you manage), print method switching (digital vs flexo), and freight optimisation. We've achieved an average 23% cost saving for clients who've gone through the audit process." },
      ],
    },
    {
      id: "process",
      label: "How We Work",
      icon: "🔄",
      color: "#6B8A8A",
      bg: "#E6EFEF",
      faqs: [
        { q: "How does the process work from start to finish?", a: "Step 1: We audit your current packaging setup and understand your brief. Step 2: We provide structural design, 3D mockups, and material recommendations. Step 3: Free samples so you can verify the concept. Step 4: Transparent pricing with a full cost breakdown. Step 5: Production with QA at every stage. Step 6: Delivery to your door or fulfilment centre. The whole process typically takes 6–10 weeks from brief to delivery, depending on the product." },
        { q: "What is the typical lead time?", a: "Lead times vary by product: Digitally printed mailer boxes: 3–4 weeks. Litho-laminated mailer boxes: 4–6 weeks. Rigid boxes: 4–6 weeks. Paper mailers: 3–5 weeks. Shipping boxes: 3–4 weeks. Printed cans: 3–4 weeks. Tissue paper: 4–6 weeks. These are from artwork approval — add 1–2 weeks for sampling beforehand. We create a detailed timeline at the start of every project." },
        { q: "How many suppliers do you work with?", a: "We work with 30+ vetted manufacturing partners across 12 countries. Each supplier is selected for specific capabilities — corrugated, rigid, flexible, speciality, cans, labels. We match every product to the ideal manufacturing partner based on your requirements for quality, cost, lead time, and sustainability credentials." },
        { q: "Do I get a dedicated point of contact?", a: "Yes. Every client gets a dedicated account manager who owns your entire packaging portfolio. One person who knows your brand, your products, and your supply chain. No bouncing between departments or being passed around. They coordinate everything from design through to delivery." },
        { q: "Can you manage my entire packaging portfolio?", a: "That's exactly what we do. Mailers, rigid boxes, shipping boxes, tissue, tape, labels, inserts, cards, bags — all through one partnership. This means one invoice, one point of contact, coordinated deliveries, and the buying power that comes from consolidating your spend. Most of our clients were managing 3–5 separate suppliers before coming to us." },
        { q: "What quality checks do you perform?", a: "We run QA at every stage: material verification before production, on-press colour checks against approved proofs, structural integrity testing, print quality inspection, and final pre-shipment checks. For new suppliers or first orders, we conduct factory audits. Every order includes sample approval before full production runs. We don't ship until it's right." },
        { q: "Can you help with artwork and design?", a: "Yes. Our services include structural design (dieline engineering, 3D mockups, prototyping), artwork preparation (print-ready files, colour management), and pre-press quality checks. If you have your own design team, we provide dieline templates. If you need design support, we can handle the entire creative process. Either way, we ensure everything is production-ready before it hits the factory floor." },
      ],
    },
    {
      id: "industries",
      label: "Industry-Specific",
      icon: "🏷️",
      color: "#B85454",
      bg: "#F5E8E8",
      faqs: [
        { q: "What packaging do beauty & cosmetics brands typically need?", a: "Beauty brands typically use rigid boxes for premium products (serums, fragrances, gift sets), mailer boxes for ecommerce orders, tissue paper and inserts for unboxing experience, labels for product branding, and advent calendars for seasonal campaigns. We work with brands like Glow For It to create packaging that drives social sharing and repeat purchases." },
        { q: "What packaging do health & wellness brands need?", a: "Wellness brands typically need mailer boxes for supplement subscriptions, shipping boxes for transit protection, paper mailers for lightweight items, cartonboard boxes for retail products, and labels for regulatory compliance. We work with brands like Healf and TRIP to balance product protection, sustainability, and brand experience." },
        { q: "What packaging do food & drink brands need?", a: "Food and drink brands need food-safe packaging across the board — printed cans for beverages, mailer boxes for gift sets and subscriptions, shipping boxes for transit, advent calendars for seasonal launches, and inserts for bottle protection. All materials must meet food-contact regulations. We handle compliance so you can focus on your product." },
        { q: "What packaging do fashion brands need?", a: "Fashion brands typically use paper mailers (the sustainable alternative to poly mailers), tissue paper for wrapping, mailer boxes for premium items, paper tape for branded sealing, and bags & pouches for accessories. Returns-friendly design is crucial — tear strips, double-seal closures, and durable construction that survives the return journey." },
        { q: "Can you help with influencer and PR mailer boxes?", a: "Yes — influencer and PR mailers are one of our specialities. We design high-impact unboxing experiences specifically for social content creation. This includes custom structures, premium finishes, branded inserts, and tissue paper. The packaging is designed to photograph and film beautifully. Our work with Glow For It generated 500K+ social impressions from influencer mailers alone." },
        { q: "Do you work with subscription box brands?", a: "Yes. Subscription brands need packaging that's consistent, cost-effective at recurring volumes, and robust enough for repeated shipping. We design mailer boxes and inserts that protect products in transit while creating a branded unboxing moment. We also help subscription brands optimise packaging costs as they scale — unit costs should decrease as volumes grow." },
      ],
    },
  ],
};

interface SanityFaq {
  q?: string | null;
  a?: string | null;
}

interface SanityFaqCategory {
  id?: string | null;
  label?: string | null;
  icon?: string | null;
  color?: string | null;
  bg?: string | null;
  faqs?: unknown;
}

interface SanityKnowledgeHubDoc {
  heroHeadline?: string | null;
  heroSubheadline?: string | null;
  contactCtaHeading?: string | null;
  contactCtaBody?: string | null;
  contactEmail?: string | null;
  faqCategories?: unknown;
}

function readString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function mapFaqs(value: unknown): KnowledgeHubFaq[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return undefined;
      const record = item as SanityFaq;
      const q = readString(record.q);
      const a = readString(record.a);
      if (!q || !a) return undefined;
      return { q, a };
    })
    .filter((item): item is KnowledgeHubFaq => Boolean(item));
}

function mapCategories(value: unknown): KnowledgeHubCategory[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return undefined;
      const record = item as SanityFaqCategory;
      const id = readString(record.id);
      const label = readString(record.label);
      const icon = readString(record.icon);
      const color = readString(record.color);
      const bg = readString(record.bg);
      const faqs = mapFaqs(record.faqs);
      if (!id || !label) return undefined;
      return {
        id,
        label,
        icon: icon ?? "❓",
        color: color ?? "#C8773E",
        bg: bg ?? "#F5EDE4",
        faqs,
      };
    })
    .filter((item): item is KnowledgeHubCategory => Boolean(item));
}

function mapKnowledgeHubPage(
  doc: SanityKnowledgeHubDoc | null
): KnowledgeHubPageContent {
  if (!doc) return fallbackKnowledgeHubContent;

  const categories = mapCategories(doc.faqCategories);

  return {
    heroHeadline:
      readString(doc.heroHeadline) ?? fallbackKnowledgeHubContent.heroHeadline,
    heroSubheadline:
      readString(doc.heroSubheadline) ??
      fallbackKnowledgeHubContent.heroSubheadline,
    contactCtaHeading:
      readString(doc.contactCtaHeading) ?? fallbackKnowledgeHubContent.contactCtaHeading,
    contactCtaBody:
      readString(doc.contactCtaBody) ?? fallbackKnowledgeHubContent.contactCtaBody,
    contactEmail:
      readString(doc.contactEmail) ?? fallbackKnowledgeHubContent.contactEmail,
    faqCategories:
      categories.length > 0
        ? categories
        : fallbackKnowledgeHubContent.faqCategories,
  };
}

export async function getKnowledgeHubContent(): Promise<KnowledgeHubPageContent> {
  try {
    const doc = await sanityFetch<SanityKnowledgeHubDoc | null>({
      query: knowledgeHubPageQuery,
      tags: ["knowledgeHub"],
    });
    return mapKnowledgeHubPage(doc);
  } catch {
    return fallbackKnowledgeHubContent;
  }
}
