import "server-only";

import { sanityFetch } from "@/lib/sanity/fetch";
import { merchPageQuery } from "@/lib/sanity/queries";
import type {
  MerchPageContent,
  MerchCategory,
  ComparisonRow,
  FAQItem,
} from "@/types/merch";

// ── Sanity document shapes ───────────────────────────────────

interface SanityImageField {
  src?: string | null;
  alt?: string | null;
}

interface SanityCategoryDoc {
  name?: string | null;
  anchorId?: string | null;
  shortDescription?: string | null;
  longDescription?: string | null;
  image?: SanityImageField | null;
  applications?: unknown;
  customisationOptions?: unknown;
  moq?: string | null;
  leadTime?: string | null;
}

interface SanityComparisonDoc {
  topic?: string | null;
  suppliedAnswer?: string | null;
  alibabaAnswer?: string | null;
}

interface SanityFaqDoc {
  question?: string | null;
  answer?: string | null;
}

interface SanityMerchPageDoc {
  seo?: {
    title?: string | null;
    description?: string | null;
    ogImage?: string | null;
    canonical?: string | null;
  } | null;
  hero?: {
    heading?: string | null;
    subheading?: string | null;
    ctaLabel?: string | null;
    ctaHref?: string | null;
    image?: SanityImageField | null;
  } | null;
  problemSolution?: {
    problemHeading?: string | null;
    problemBody?: string | null;
    solutionHeading?: string | null;
    solutionBody?: string | null;
  } | null;
  categories?: unknown;
  comparison?: unknown;
  faq?: unknown;
  finalCta?: {
    heading?: string | null;
    body?: string | null;
    ctaLabel?: string | null;
    ctaHref?: string | null;
  } | null;
}

// ── Helpers ──────────────────────────────────────────────────

function readString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function readStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => readString(item))
    .filter((item): item is string => Boolean(item));
}

function mapImage(
  value: SanityImageField | null | undefined,
  fallback: { src: string; alt: string }
): { src: string; alt: string } {
  const src = readString(value?.src);
  const alt = readString(value?.alt);
  return {
    src: src ?? fallback.src,
    alt: alt ?? fallback.alt,
  };
}

// ── Mappers ─────────────────────────────────────────────────

function mapCategories(value: unknown): MerchCategory[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return undefined;
      const cat = item as SanityCategoryDoc;
      const name = readString(cat.name);
      const anchorId = readString(cat.anchorId);
      if (!name || !anchorId) return undefined;

      const fbCat = fallbackMerchPageContent.categories.find(
        (c) => c.anchorId === anchorId
      );
      const applications = readStringArray(cat.applications);
      const customisationOptions = readStringArray(cat.customisationOptions);

      return {
        name,
        anchorId,
        shortDescription:
          readString(cat.shortDescription) ??
          fbCat?.shortDescription ??
          "",
        longDescription:
          readString(cat.longDescription) ??
          fbCat?.longDescription ??
          "",
        image: mapImage(cat.image, fbCat?.image ?? { src: "/images/merch/merch-hero.png", alt: name }),
        applications:
          applications.length > 0
            ? applications
            : fbCat?.applications ?? [],
        customisationOptions:
          customisationOptions.length > 0
            ? customisationOptions
            : fbCat?.customisationOptions ?? [],
        moq: readString(cat.moq) ?? fbCat?.moq ?? "500 units",
        leadTime:
          readString(cat.leadTime) ?? fbCat?.leadTime ?? "6-8 weeks",
      } satisfies MerchCategory;
    })
    .filter((item): item is MerchCategory => Boolean(item));
}

function mapComparison(value: unknown): ComparisonRow[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return undefined;
      const row = item as SanityComparisonDoc;
      const topic = readString(row.topic);
      if (!topic) return undefined;
      return {
        topic,
        suppliedAnswer: readString(row.suppliedAnswer) ?? "",
        alibabaAnswer: readString(row.alibabaAnswer) ?? "",
      } satisfies ComparisonRow;
    })
    .filter((item): item is ComparisonRow => Boolean(item));
}

function mapFaq(value: unknown): FAQItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return undefined;
      const faq = item as SanityFaqDoc;
      const question = readString(faq.question);
      const answer = readString(faq.answer);
      if (!question || !answer) return undefined;
      return { question, answer } satisfies FAQItem;
    })
    .filter((item): item is FAQItem => Boolean(item));
}

function mapMerchPage(
  doc: SanityMerchPageDoc | null
): MerchPageContent {
  if (!doc) return fallbackMerchPageContent;

  const fb = fallbackMerchPageContent;
  const categories = mapCategories(doc.categories);
  const comparison = mapComparison(doc.comparison);
  const faq = mapFaq(doc.faq);

  return {
    seo: {
      title: readString(doc.seo?.title) ?? fb.seo.title,
      description: readString(doc.seo?.description) ?? fb.seo.description,
      ogImage: readString(doc.seo?.ogImage) ?? fb.seo.ogImage,
      canonical: readString(doc.seo?.canonical) ?? fb.seo.canonical,
    },
    hero: {
      heading: readString(doc.hero?.heading) ?? fb.hero.heading,
      subheading: readString(doc.hero?.subheading) ?? fb.hero.subheading,
      ctaLabel: readString(doc.hero?.ctaLabel) ?? fb.hero.ctaLabel,
      ctaHref: readString(doc.hero?.ctaHref) ?? fb.hero.ctaHref,
      image: mapImage(doc.hero?.image, fb.hero.image),
    },
    problemSolution: {
      problemHeading:
        readString(doc.problemSolution?.problemHeading) ??
        fb.problemSolution.problemHeading,
      problemBody:
        readString(doc.problemSolution?.problemBody) ??
        fb.problemSolution.problemBody,
      solutionHeading:
        readString(doc.problemSolution?.solutionHeading) ??
        fb.problemSolution.solutionHeading,
      solutionBody:
        readString(doc.problemSolution?.solutionBody) ??
        fb.problemSolution.solutionBody,
    },
    categories: categories.length > 0 ? categories : fb.categories,
    comparison: comparison.length > 0 ? comparison : fb.comparison,
    faq: faq.length > 0 ? faq : fb.faq,
    finalCta: {
      heading:
        readString(doc.finalCta?.heading) ?? fb.finalCta.heading,
      body: readString(doc.finalCta?.body) ?? fb.finalCta.body,
      ctaLabel:
        readString(doc.finalCta?.ctaLabel) ?? fb.finalCta.ctaLabel,
      ctaHref:
        readString(doc.finalCta?.ctaHref) ?? fb.finalCta.ctaHref,
    },
  };
}

// ── Fallback data ────────────────────────────────────────────

export const fallbackMerchPageContent: MerchPageContent = {
  seo: {
    title: "Custom Branded Merch for DTC Brands | Supplied",
    description:
      "Custom cosmetic bags, water bottles, tote bags, apparel and more - sourced directly through our vetted Far East supply chain. Better margins than Alibaba, with on-the-ground quality control.",
    canonical: "/merch",
  },
  hero: {
    heading: "Custom Branded [[Merch]], Sourced Properly",
    subheading:
      "Cosmetic bags, water bottles, tote bags, apparel and more. We source custom branded merchandise through the same vetted supply chain we use for packaging - direct factories, on-the-ground QC, and better margins than going it alone.",
    ctaLabel: "Discuss a Merch Project",
    ctaHref: "/contact-us",
    image: {
      src: "/images/merch/merch-hero.png",
      alt: "Custom branded merchandise sourced by Supplied",
    },
  },
  problemSolution: {
    problemHeading: "The Alibaba [[Problem]]",
    problemBody:
      "Most DTC brands default to Alibaba when they need merch. It makes sense on the surface - low prices, huge range, direct-to-factory. But the reality is different. Middleman margins stack up through trading companies posing as factories. Language and cultural barriers cause spec drift that only surfaces when the goods arrive. Suppliers promise quality they cannot deliver, and QC is reactive - it kicks in after shipment, when it is too late to fix. You end up managing procurement, compliance, and logistics across time zones, on top of everything else.",
    solutionHeading: "A [[Better]] Way to Source",
    solutionBody:
      "Supplied works directly with a vetted Far East supply chain through man-on-the-ground partners who bridge cultural and communication gaps, validate supplier claims before production starts, and make sure what is promised is what ships. We strip out the middleman layers that inflate Alibaba pricing, handle project management from your side of the table, and run QC before anything leaves the factory. One point of contact, one invoice, and merch that actually matches the brief.",
  },
  categories: [
    {
      name: "Custom Cosmetic & Makeup Bags",
      anchorId: "cosmetic-bags",
      shortDescription:
        "Branded pouches, wash bags, and cosmetic cases for beauty and wellness brands.",
      longDescription:
        "From zippered pouches to structured vanity cases, we produce custom cosmetic bags in any material, size, and finish your brand needs. Whether it is a GWP for a product launch, a subscription box insert, or standalone retail merch, every bag is made to your exact spec with full Pantone colour matching and custom branding throughout.",
      image: {
        src: "/images/merch/merch-hero.png",
        alt: "Custom branded cosmetic bags",
      },
      applications: [
        "Gift-with-purchase for beauty launches",
        "Subscription box inserts",
        "Retail-ready branded wash bags",
        "Event and PR gifting kits",
        "Travel sets and holiday editions",
      ],
      customisationOptions: [
        "Full Pantone colour matching",
        "Screen printing and heat transfer",
        "Embossed or debossed logos",
        "Custom zips, pulls, and lining",
        "Branded swing tags and labels",
      ],
      moq: "500 units",
      leadTime: "6-8 weeks",
    },
    {
      name: "Disposable Cameras",
      anchorId: "disposable-cameras",
      shortDescription:
        "Custom-wrapped disposable cameras for events, launches, and brand activations.",
      longDescription:
        "Branded disposable cameras are having a moment. Perfect for weddings, brand activations, product launches, and festival partnerships. We produce fully custom-wrapped cameras with your artwork, delivered ready to distribute. Pair them with branded packaging from our core range for a complete activation kit.",
      image: {
        src: "/images/merch/merch-hero.png",
        alt: "Custom branded disposable cameras",
      },
      applications: [
        "Brand activations and pop-ups",
        "Wedding and event favours",
        "Festival and music partnerships",
        "Product launch PR kits",
        "Influencer seeding packages",
      ],
      customisationOptions: [
        "Full-wrap custom artwork",
        "Pantone colour matching",
        "Custom flash and lens options",
        "Branded packaging pairing",
        "Bulk or individually boxed",
      ],
      moq: "500 units",
      leadTime: "6-8 weeks",
    },
    {
      name: "Protein Shakers",
      anchorId: "protein-shakers",
      shortDescription:
        "Custom branded shaker bottles for sports nutrition, wellness, and fitness brands.",
      longDescription:
        "Custom protein shakers and blender bottles with your branding built in, not stuck on. We source from factories producing for major sports nutrition brands, so you get the same build quality with your own colourways, logo placement, and finishing. Available in standard and premium materials with leak-proof lids and mixing mechanisms.",
      image: {
        src: "/images/merch/merch-hero.png",
        alt: "Custom branded protein shaker bottles",
      },
      applications: [
        "Subscription box add-ons",
        "Gym and fitness brand merchandise",
        "Sports nutrition product bundles",
        "Corporate wellness gifting",
        "Event and expo giveaways",
      ],
      customisationOptions: [
        "Full Pantone colour matching",
        "Pad printing and screen printing",
        "Custom lid and cap colours",
        "Branded mixing ball or mechanism",
        "Custom capacity sizes",
      ],
      moq: "500 units",
      leadTime: "6-8 weeks",
    },
    {
      name: "Premium Water Bottles",
      anchorId: "water-bottles",
      shortDescription:
        "Branded stainless steel and BPA-free water bottles for lifestyle and wellness brands.",
      longDescription:
        "Custom water bottles that people actually want to carry. We produce double-walled stainless steel, single-wall aluminium, and BPA-free plastic bottles with your branding applied through laser engraving, powder coating, screen printing, or UV printing. Built to the same spec as the big-name bottle brands, with your identity front and centre.",
      image: {
        src: "/images/merch/merch-hero.png",
        alt: "Custom branded premium water bottles",
      },
      applications: [
        "Lifestyle and wellness brand merchandise",
        "Corporate gifting and employee welcome kits",
        "Gym and fitness partnerships",
        "Festival and event hydration sponsors",
        "Retail-ready DTC products",
      ],
      customisationOptions: [
        "Laser engraving or UV printing",
        "Powder-coated custom colours",
        "Custom lid and cap designs",
        "Vacuum insulation options",
        "Gift box packaging pairing",
      ],
      moq: "250 units",
      leadTime: "6-8 weeks",
    },
    {
      name: "Tote Bags",
      anchorId: "tote-bags",
      shortDescription:
        "Custom canvas, cotton, and non-woven tote bags for retail, events, and gifting.",
      longDescription:
        "From heavyweight organic cotton shoppers to lightweight non-woven event bags, we produce custom tote bags at scale. Full colour printing, woven labels, and custom strap lengths are standard. Pair with branded tissue paper or stickers from our core range to create a complete unboxing moment for retail or gifting.",
      image: {
        src: "/images/merch/merch-hero.png",
        alt: "Custom branded tote bags",
      },
      applications: [
        "Retail carrier bags",
        "Event and conference giveaways",
        "Subscription box and gift set packaging",
        "Brand activation handouts",
        "Employee and corporate gifting",
      ],
      customisationOptions: [
        "Full colour screen and digital printing",
        "Organic cotton and recycled materials",
        "Custom strap length and style",
        "Woven labels and hang tags",
        "Gusseted and flat options",
      ],
      moq: "500 units",
      leadTime: "4-6 weeks",
    },
    {
      name: "Gift Bags",
      anchorId: "gift-bags",
      shortDescription:
        "Custom printed gift bags in paper, kraft, and luxury finishes for retail and events.",
      longDescription:
        "Branded gift bags that elevate the handover moment. We produce custom paper gift bags in kraft, white, and coloured stocks with rope, ribbon, or twisted paper handles. Add foiling, embossing, or spot UV for a premium finish. Ideal for retail, PR gifting, and event activations where the bag is part of the brand experience.",
      image: {
        src: "/images/merch/merch-hero.png",
        alt: "Custom branded gift bags",
      },
      applications: [
        "Retail point-of-sale packaging",
        "PR and influencer gifting",
        "Event and launch party bags",
        "Hotel and hospitality welcome gifts",
        "Seasonal and holiday editions",
      ],
      customisationOptions: [
        "Hot foil stamping",
        "Embossing and debossing",
        "Spot UV and matte lamination",
        "Custom handle styles",
        "Pantone colour matching on stock",
      ],
      moq: "500 units",
      leadTime: "6-8 weeks",
    },
    {
      name: "Custom Stickers",
      anchorId: "stickers",
      shortDescription:
        "Die-cut, sheet, and roll stickers for branding, sealing, and packaging embellishment.",
      longDescription:
        "Custom stickers are the most versatile branding tool in your packaging toolkit. We produce die-cut, kiss-cut, sheet, and roll stickers in any shape, size, and finish. Use them to seal tissue paper, brand plain mailers, or add a finishing touch to any unboxing experience. Pair with our custom tissue paper and mailer boxes for a fully branded fulfilment flow.",
      image: {
        src: "/images/merch/merch-hero.png",
        alt: "Custom branded stickers",
      },
      applications: [
        "Package sealing and branding",
        "Product labelling",
        "Promotional inserts and giveaways",
        "Event and sampling handouts",
        "Retail window and POS displays",
      ],
      customisationOptions: [
        "Die-cut to any shape",
        "Matte, gloss, and clear vinyl",
        "Foil and holographic finishes",
        "Roll or sheet format",
        "Removable and permanent adhesives",
      ],
      moq: "1,000 units",
      leadTime: "4-6 weeks",
    },
    {
      name: "Custom Apparel",
      anchorId: "apparel",
      shortDescription:
        "Branded t-shirts, hoodies, caps, and workwear for merch lines and team kit.",
      longDescription:
        "Custom apparel for merch drops, team uniforms, or event kit. We source from the same garment factories supplying established streetwear and workwear brands, with your branding applied through screen printing, embroidery, woven labels, or DTG printing. From blanks to fully custom-cut garments, we handle the full production run.",
      image: {
        src: "/images/merch/merch-hero.png",
        alt: "Custom branded apparel",
      },
      applications: [
        "Brand merch lines and drops",
        "Team uniforms and workwear",
        "Event and festival staff kit",
        "Influencer and PR gifting",
        "Corporate gifting and onboarding packs",
      ],
      customisationOptions: [
        "Screen printing and DTG",
        "Embroidery and woven patches",
        "Custom woven neck labels",
        "Pantone-matched custom fabrics",
        "Custom hang tags and packaging",
      ],
      moq: "100 units",
      leadTime: "6-8 weeks",
    },
  ],
  comparison: [
    {
      topic: "Supply Chain",
      suppliedAnswer:
        "Direct factory relationships through on-the-ground partners. No middlemen inflating your cost.",
      alibabaAnswer:
        "Trading companies posing as factories. Multiple margin layers before the price reaches you.",
    },
    {
      topic: "Quality Control",
      suppliedAnswer:
        "Pre-production sampling, in-line inspections, and final QC before shipment. Issues caught early.",
      alibabaAnswer:
        "Remote trust-based QC. Problems surface when the container lands, too late to fix cheaply.",
    },
    {
      topic: "Project Management",
      suppliedAnswer:
        "UK-based account management. One point of contact who understands your brand and your deadlines.",
      alibabaAnswer:
        "Self-managed across time zones. Language barriers and cultural differences cause spec drift.",
    },
    {
      topic: "Approach",
      suppliedAnswer:
        "Tailored consultation. We advise on materials, finishes, and supplier fit before quoting.",
      alibabaAnswer:
        "Self-serve catalogue. You pick from what is listed and hope the sample matches production.",
    },
  ],
  faq: [
    {
      question: "Do you have minimum order quantities?",
      answer:
        "Yes, MOQs vary by product type. Most soft goods like cosmetic bags and tote bags start at 500 units. Premium items like stainless steel water bottles start from 250 units. Stickers and apparel can start from as low as 100-1,000 units depending on the spec. We will always confirm the MOQ before you commit.",
    },
    {
      question: "Can you beat Alibaba pricing?",
      answer:
        "In most cases, yes. Because we work directly with factories through established relationships, we cut out the trading company margins that inflate Alibaba pricing. You also save the hidden costs of managing procurement, QC, and logistics yourself. We are transparent on pricing and will always show you the cost breakdown.",
    },
    {
      question: "How do you ensure quality?",
      answer:
        "Every project goes through pre-production sampling, in-line factory inspections, and a final QC check before shipment. Our on-the-ground partners in the Far East visit factories, verify supplier claims, and catch issues before they become your problem. We do not ship anything we have not approved first.",
    },
    {
      question: "What is the typical lead time?",
      answer:
        "Standard lead times are 4-8 weeks depending on the product type and complexity. This covers sampling, production, QC, and shipping. We can often accommodate tighter timelines for urgent projects, but we will always be upfront about what is realistic rather than promising something we cannot deliver.",
    },
    {
      question: "Can I pair merch with custom packaging?",
      answer:
        "Absolutely. That is one of the biggest advantages of working with us. We can produce your merch and its packaging as a single project, from branded mailer boxes and tissue paper to rigid gift boxes and printed tape. One supplier, one timeline, everything arrives together.",
    },
    {
      question: "Do you handle shipping and logistics?",
      answer:
        "Yes. We manage the full supply chain from factory to your warehouse or fulfilment centre. That includes freight, customs clearance, and delivery coordination. You do not need to arrange separate shipping or deal with freight forwarders.",
    },
  ],
  finalCta: {
    heading: "Got a merch project in mind?",
    body: "Tell us what you need and we will scope it properly. No catalogues, no guesswork - just a straight conversation about what will work for your brand, your budget, and your timeline.",
    ctaLabel: "Start a Conversation",
    ctaHref: "/contact-us",
  },
};

// ── Public API ───────────────────────────────────────────────

export async function getMerchPageContent(): Promise<MerchPageContent> {
  try {
    const doc = await sanityFetch<SanityMerchPageDoc | null>({
      query: merchPageQuery,
      tags: ["merch"],
    });

    return mapMerchPage(doc);
  } catch {
    return fallbackMerchPageContent;
  }
}
