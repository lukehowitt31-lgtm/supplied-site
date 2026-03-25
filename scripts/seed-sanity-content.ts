import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { createClient } from "next-sanity";

type LooseRecord = Record<string, unknown>;

interface ProductCategorySource {
  id: string;
  label: string;
}

interface ProductSource {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  shortDescription: string;
  showcaseHeading?: string;
  featuresHeading?: string;
  description: string;
  facts?: string[];
  features?: Array<string | { title: string; body?: string }>;
  specs?: {
    materials?: string;
    printOptions?: string;
    moq?: string;
    leadTime?: string;
  };
  detailedSpecs?: Array<{ label: string; value: string }>;
  seo?: { title?: string; description?: string };
  heroStats?: Array<{ val: string; lbl: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  modelUrl?: string;
  isNew?: boolean;
}

interface BlogPostSource {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  featured?: boolean;
}

interface TeamMemberSource {
  slug: string;
  name: string;
  title: string;
  description: string;
  linkedinUrl?: string;
}

interface HomeContentSource {
  hero: {
    headline: string;
    subheadline: string;
    tagline: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    stats: Array<{ value: string; label: string }>;
    prooflineTitle: string;
    prooflineSubtitle: string;
    hotspots: Array<{
      id: string;
      x: number;
      y: number;
      title: string;
      detail: string;
      href: string;
    }>;
  };
  trustedBrands: { heading: string };
  problemBottleneck: {
    heading: string;
    intro: string;
    items: string[];
    cards: Array<{ title: string; desc: string }>;
  };
  solution: {
    heading: string;
    body: string;
    steps: string[];
    stepDescriptions: string[];
  };
  servicesTeaser: {
    heading: string;
    body: string;
    heroTitle: string;
    heroBody: string;
    heroChips: string[];
    cards: Array<{
      title: string;
      desc: string;
      chips: string[];
    }>;
    stats: Array<{ value: string; label: string }>;
  };
  clientStoriesTeaser: {
    heading: string;
    body: string;
    cta: { label: string; href: string };
    cards: Array<{
      name: string;
      slug: string;
      industry: string;
      products: string[];
      quote: string;
      person: string;
      stat1Value: string;
      stat1Label: string;
      stat2Value: string;
      stat2Label: string;
      challenge: string;
      result: string;
      image: string;
      logo: string;
    }>;
  };
  productsTeaser: {
    heading: string;
    body: string;
    cta: { label: string; href: string };
  };
  sustainability: { heading: string; body: string; checklist: string[] };
  process: { heading: string; steps: string[]; stepDescriptions: string[] };
  finalCta: {
    heading: string;
    body: string;
    primaryCta: { label: string; href: string };
  };
}

interface AboutContentSource {
  heroHeadline: string;
  heroSubheadline: string;
  stats: Array<{ value: string; label: string }>;
  values: Array<{ num: string; title: string; body: string }>;
  capabilities: string[];
  offices: Array<{ label: string; name: string; address: string; desc: string }>;
  finalCta: {
    heading: string;
    body: string;
    primaryCta: { label: string; href: string };
  };
}

interface ClientStorySummarySource {
  slug: string;
  brand: string;
  tag: string;
  metric: string;
  metricLabel: string;
  image: string;
  desc: string;
}

interface ClientStoryDetailSource {
  slug: string;
  title: string;
  clientName: string;
  industry: string;
  challenge: string;
  solution: string;
  result: string;
  metrics: Array<{ value: string; label: string }>;
  quote: string;
  quoteAuthor: string;
  quoteRole: string;
  ctaLabel: string;
  ctaHref: string;
}

interface ClientStoriesHubSource {
  heading: string;
  headingAccent: string;
  subheading: string;
  cta: {
    label: string;
    href: string;
  };
}

interface PartnershipsContentSource {
  hero: {
    headline: string;
    subheadline: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    stats: Array<{ value: string; label: string }>;
  };
  howItWorks: {
    heading: string;
    steps: Array<{ step: string; title: string; desc: string }>;
  };
  benefits: {
    heading: string;
    cards: Array<{ title: string; text: string }>;
  };
  partnersSection: {
    heading: string;
    subheading: string;
    partners: Array<{
      id: string;
      name: string;
      logo: string;
      category: string;
      website: string;
      image: string;
      description: string;
      highlights: string[];
    }>;
  };
  ctaSection: {
    heading: string;
    body: string;
    checklist: string[];
    formHeading: string;
  };
  faqs: Array<{ question: string; answer: string }>;
}

function loadEnvFile(filePath: string): void {
  if (!existsSync(filePath)) {
    return;
  }

  const contents = readFileSync(filePath, "utf8");
  for (const rawLine of contents.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    const equalsIndex = line.indexOf("=");
    if (equalsIndex <= 0) {
      continue;
    }

    const key = line.slice(0, equalsIndex).trim();
    if (!key || process.env[key]) {
      continue;
    }

    let value = line.slice(equalsIndex + 1).trim();
    if (
      (value.startsWith("\"") && value.endsWith("\"")) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function readOptionalString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

const defaultFeatureCardBody = "Engineered for performance and aesthetics.";

function normalizeSourceFeatureCards(
  features: ProductSource["features"]
): Array<{ title: string; body: string }> {
  if (!Array.isArray(features)) {
    return [];
  }

  return features
    .map((feature) => {
      if (typeof feature === "string") {
        const title = readOptionalString(feature);
        if (!title) {
          return undefined;
        }
        return {
          title,
          body: defaultFeatureCardBody,
        };
      }

      const title = readOptionalString(feature.title);
      const body = readOptionalString(feature.body) ?? defaultFeatureCardBody;
      if (!title) {
        return undefined;
      }

      return {
        title,
        body,
      };
    })
    .filter((item): item is { title: string; body: string } => Boolean(item));
}

function normalizeFeatureCardsFromUnknown(
  value: unknown
): Array<{ title: string; body: string }> {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (typeof item === "string") {
        const title = readOptionalString(item);
        if (!title) {
          return undefined;
        }

        return {
          title,
          body: defaultFeatureCardBody,
        };
      }

      if (!item || typeof item !== "object") {
        return undefined;
      }

      const record = item as { title?: unknown; body?: unknown };
      const title = readOptionalString(record.title);
      const body = readOptionalString(record.body) ?? defaultFeatureCardBody;
      if (!title) {
        return undefined;
      }

      return {
        title,
        body,
      };
    })
    .filter((item): item is { title: string; body: string } => Boolean(item));
}

function hasLegacyStringFeatureItems(value: unknown): boolean {
  if (!Array.isArray(value)) {
    return false;
  }

  return value.some((item) => typeof item === "string");
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toSanityDate(input: string): string {
  const parsed = new Date(input);
  if (Number.isNaN(parsed.getTime())) {
    return "2025-01-01";
  }
  return parsed.toISOString().slice(0, 10);
}

function moduleExports<T extends object>(moduleValue: unknown): T {
  if (moduleValue && typeof moduleValue === "object" && "default" in moduleValue) {
    const cjsDefault = (moduleValue as { default?: unknown }).default;
    if (cjsDefault && typeof cjsDefault === "object") {
      return cjsDefault as T;
    }
  }

  return moduleValue as T;
}

function ref(_ref: string): LooseRecord {
  return { _type: "reference", _ref };
}

async function writeDoc(
  client: ReturnType<typeof createClient>,
  options: {
    id: string;
    type: string;
    fields: LooseRecord;
    overwrite: boolean;
    dryRun: boolean;
  }
): Promise<void> {
  const { id, type, fields, overwrite, dryRun } = options;
  if (dryRun) {
    return;
  }

  await client.createIfNotExists({ _id: id, _type: type });

  const patch = client.patch(id);
  if (overwrite) {
    patch.set(fields);
  } else {
    patch.setIfMissing(fields);
  }

  await patch.commit({ autoGenerateArrayKeys: true });
}

async function main(): Promise<void> {
  const cwd = process.cwd();
  loadEnvFile(path.join(cwd, ".env.local"));

  const projectId = requiredEnv("NEXT_PUBLIC_SANITY_PROJECT_ID");
  const dataset = requiredEnv("NEXT_PUBLIC_SANITY_DATASET");
  const apiVersion = requiredEnv("NEXT_PUBLIC_SANITY_API_VERSION");
  const writeToken = requiredEnv("SANITY_API_WRITE_TOKEN");
  const overwrite = process.argv.includes("--overwrite");
  const dryRun = process.argv.includes("--dry-run");

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: writeToken,
  });

  const productsModule = moduleExports<{
    products: ProductSource[];
    categories: ProductCategorySource[];
  }>(await import("../lib/products"));

  const homeModule = moduleExports<{ fallbackHomePageContent: HomeContentSource }>(
    await import("../lib/content/home")
  );

  const aboutModule = moduleExports<{ fallbackAboutPageContent: AboutContentSource }>(
    await import("../lib/content/about")
  );

  const teamModule = moduleExports<{ legacyTeamMembers: TeamMemberSource[] }>(
    await import("../lib/content/team")
  );

  const blogModule = moduleExports<{ legacyPosts: BlogPostSource[] }>(
    await import("../lib/content/blog")
  );

  const clientStoriesModule = moduleExports<{
    fallbackHubContent: ClientStoriesHubSource;
    legacyClientStories: ClientStorySummarySource[];
    getLegacyClientStoryDetailBySlug: (slug: string) => ClientStoryDetailSource | undefined;
  }>(await import("../lib/content/clientStories"));

  const partnershipsModule = moduleExports<{
    fallbackPartnershipsPageContent: PartnershipsContentSource;
  }>(await import("../lib/content/partnerships"));

  const { products, categories } = productsModule;
  const { fallbackHomePageContent } = homeModule;
  const { fallbackAboutPageContent } = aboutModule;
  const { fallbackPartnershipsPageContent } = partnershipsModule;
  const { legacyTeamMembers } = teamModule;
  const { legacyPosts } = blogModule;
  const { fallbackHubContent, legacyClientStories, getLegacyClientStoryDetailBySlug } =
    clientStoriesModule;

  console.log(
    [
      `Seeding Sanity content (${overwrite ? "overwrite mode" : "set-if-missing mode"})`,
      `Project: ${projectId}`,
      `Dataset: ${dataset}`,
      dryRun ? "Dry run: enabled (no documents will be written)" : "Dry run: disabled",
    ].join("\n")
  );

  // 1) Homepage singleton
  await writeDoc(client, {
    id: "homePage",
    type: "homePage",
    overwrite,
    dryRun,
    fields: {
      internalTitle: "Home Page",
      hero: {
        headline: fallbackHomePageContent.hero.headline,
        subheadline: fallbackHomePageContent.hero.subheadline,
        tagline: fallbackHomePageContent.hero.tagline,
        primaryCta: fallbackHomePageContent.hero.primaryCta,
        secondaryCta: fallbackHomePageContent.hero.secondaryCta,
        stats: fallbackHomePageContent.hero.stats.map((item) => ({
          val: item.value,
          lbl: item.label,
        })),
        prooflineTitle: fallbackHomePageContent.hero.prooflineTitle,
        prooflineSubtitle: fallbackHomePageContent.hero.prooflineSubtitle,
        hotspots: fallbackHomePageContent.hero.hotspots,
      },
      trustedBrands: {
        heading: fallbackHomePageContent.trustedBrands.heading,
        brands: [],
      },
      problemBottleneck: {
        heading: fallbackHomePageContent.problemBottleneck.heading,
        intro: fallbackHomePageContent.problemBottleneck.intro,
        items: fallbackHomePageContent.problemBottleneck.items,
        cards: fallbackHomePageContent.problemBottleneck.cards,
      },
      solution: {
        heading: fallbackHomePageContent.solution.heading,
        body: fallbackHomePageContent.solution.body,
        steps: fallbackHomePageContent.solution.steps,
        stepDescriptions: fallbackHomePageContent.solution.stepDescriptions,
      },
      servicesTeaser: fallbackHomePageContent.servicesTeaser,
      clientStoriesTeaser: fallbackHomePageContent.clientStoriesTeaser,
      productsTeaser: fallbackHomePageContent.productsTeaser,
      sustainability: fallbackHomePageContent.sustainability,
      process: {
        heading: fallbackHomePageContent.process.heading,
        steps: fallbackHomePageContent.process.steps,
        stepDescriptions: fallbackHomePageContent.process.stepDescriptions,
      },
      finalCta: fallbackHomePageContent.finalCta,
    },
  });

  if (!dryRun && !overwrite) {
    await client
      .patch("homePage")
      .setIfMissing({
        "hero.tagline": fallbackHomePageContent.hero.tagline,
        "hero.stats": fallbackHomePageContent.hero.stats.map((item) => ({
          val: item.value,
          lbl: item.label,
        })),
        "hero.prooflineTitle": fallbackHomePageContent.hero.prooflineTitle,
        "hero.prooflineSubtitle": fallbackHomePageContent.hero.prooflineSubtitle,
        "hero.hotspots": fallbackHomePageContent.hero.hotspots,
        "problemBottleneck.cards": fallbackHomePageContent.problemBottleneck.cards,
        "solution.stepDescriptions": fallbackHomePageContent.solution.stepDescriptions,
        "servicesTeaser.heroTitle": fallbackHomePageContent.servicesTeaser.heroTitle,
        "servicesTeaser.heroBody": fallbackHomePageContent.servicesTeaser.heroBody,
        "servicesTeaser.heroChips": fallbackHomePageContent.servicesTeaser.heroChips,
        "servicesTeaser.cards": fallbackHomePageContent.servicesTeaser.cards,
        "servicesTeaser.stats": fallbackHomePageContent.servicesTeaser.stats.map((item) => ({
          val: item.value,
          lbl: item.label,
        })),
        "clientStoriesTeaser.cards": fallbackHomePageContent.clientStoriesTeaser.cards,
        "process.stepDescriptions": fallbackHomePageContent.process.stepDescriptions,
      })
      .commit({ autoGenerateArrayKeys: true });
  }

  // 2) About singleton
  await writeDoc(client, {
    id: "aboutPage",
    type: "aboutPage",
    overwrite,
    dryRun,
    fields: {
      internalTitle: "About Page",
      heroHeadline: fallbackAboutPageContent.heroHeadline,
      heroSubheadline: fallbackAboutPageContent.heroSubheadline,
      stats: fallbackAboutPageContent.stats.map((item) => ({
        value: item.value,
        label: item.label,
      })),
      values: fallbackAboutPageContent.values.map((item) => ({
        num: item.num,
        title: item.title,
        body: item.body,
      })),
      capabilities: fallbackAboutPageContent.capabilities,
      offices: fallbackAboutPageContent.offices.map((office) => ({
        label: office.label,
        name: office.name,
        address: office.address,
        desc: office.desc,
      })),
      finalCta: fallbackAboutPageContent.finalCta,
    },
  });

  // 2b) Partnerships singleton
  const pContent = fallbackPartnershipsPageContent;
  await writeDoc(client, {
    id: "partnershipsPage",
    type: "partnershipsPage",
    overwrite,
    dryRun,
    fields: {
      internalTitle: "Partnerships Page",
      hero: {
        headline: pContent.hero.headline,
        subheadline: pContent.hero.subheadline,
        primaryCta: pContent.hero.primaryCta,
        secondaryCta: pContent.hero.secondaryCta,
        stats: pContent.hero.stats.map((item) => ({
          val: item.value,
          lbl: item.label,
        })),
      },
      howItWorks: {
        heading: pContent.howItWorks.heading,
        steps: pContent.howItWorks.steps,
      },
      benefits: {
        heading: pContent.benefits.heading,
        cards: pContent.benefits.cards,
      },
      partnersSection: {
        heading: pContent.partnersSection.heading,
        subheading: pContent.partnersSection.subheading,
        partners: pContent.partnersSection.partners,
      },
      ctaSection: {
        heading: pContent.ctaSection.heading,
        body: pContent.ctaSection.body,
        checklist: pContent.ctaSection.checklist,
        formHeading: pContent.ctaSection.formHeading,
      },
      faqs: pContent.faqs,
    },
  });

  // 3) Product categories
  const productCategories = categories.filter((category) => category.id !== "all");
  for (const [index, category] of productCategories.entries()) {
    const id = `productCategory.${category.id}`;
    await writeDoc(client, {
      id,
      type: "productCategory",
      overwrite,
      dryRun,
      fields: {
        title: category.label,
        slug: { _type: "slug", current: slugify(category.label) || category.id },
        id: category.id,
        sortOrder: index + 1,
      },
    });
  }

  // 4) Products
  for (const [index, product] of products.entries()) {
    const categoryRef = `productCategory.${product.categoryId}`;
    const productId = `product.${product.slug}`;
    const sourceFeatureCards = normalizeSourceFeatureCards(product.features);

    await writeDoc(client, {
      id: productId,
      type: "product",
      overwrite,
      dryRun,
      fields: {
        name: product.name,
        slug: { _type: "slug", current: product.slug },
        id: product.id,
        categoryId: product.categoryId,
        category: ref(categoryRef),
        shortDescription: product.shortDescription,
        showcaseHeading:
          readOptionalString(product.showcaseHeading) ??
          "Premium packaging that [[commands]] attention",
        featuresHeading:
          readOptionalString(product.featuresHeading) ??
          "Everything you need, [[nothing]] you don't",
        description: product.description,
        facts: product.facts ?? [],
        features: sourceFeatureCards,
        specs: {
          materials: product.specs?.materials ?? "",
          printOptions: product.specs?.printOptions ?? "",
          moq: product.specs?.moq ?? "",
          leadTime: product.specs?.leadTime ?? "",
        },
        detailedSpecs:
          product.detailedSpecs?.map((spec) => ({
            label: spec.label,
            value: spec.value,
          })) ?? [],
        seo: {
          title: product.seo?.title ?? "",
          description: product.seo?.description ?? "",
        },
        heroStats:
          product.heroStats?.map((stat) => ({
            val: stat.val,
            lbl: stat.lbl,
          })) ?? [],
        faqs:
          product.faqs?.map((faq) => ({
            question: faq.question,
            answer: faq.answer,
          })) ?? [],
        modelUrl: readOptionalString(product.modelUrl) ?? "",
        isNew: Boolean(product.isNew),
        sortOrder: index + 1,
      },
    });

    if (!dryRun && !overwrite) {
      const existing = await client.fetch<{ features?: unknown; featureCards?: unknown }>(
        `*[_id == $id][0]{features, featureCards}`,
        { id: productId }
      );

      const featuresFromCurrentField = normalizeFeatureCardsFromUnknown(existing?.features);
      const featuresFromLegacyField = normalizeFeatureCardsFromUnknown(existing?.featureCards);
      const needsFeaturesMigration =
        hasLegacyStringFeatureItems(existing?.features) ||
        featuresFromCurrentField.length === 0;
      const shouldUnsetLegacyField =
        Array.isArray(existing?.featureCards) && existing.featureCards.length > 0;

      const patch = client.patch(productId).setIfMissing({
        showcaseHeading:
          readOptionalString(product.showcaseHeading) ??
          "Premium packaging that [[commands]] attention",
        featuresHeading:
          readOptionalString(product.featuresHeading) ??
          "Everything you need, [[nothing]] you don't",
      });

      if (needsFeaturesMigration) {
        const nextFeatures =
          featuresFromCurrentField.length > 0
            ? featuresFromCurrentField
            : featuresFromLegacyField.length > 0
              ? featuresFromLegacyField
              : sourceFeatureCards;

        if (nextFeatures.length > 0) {
          patch.set({ features: nextFeatures });
        }
      }

      if (shouldUnsetLegacyField) {
        patch.unset(["featureCards"]);
      }

      await patch.commit({ autoGenerateArrayKeys: true });
    }
  }

  // 5) Blog categories + posts
  const orderedBlogCategories: string[] = [];
  for (const post of legacyPosts) {
    if (!orderedBlogCategories.includes(post.category)) {
      orderedBlogCategories.push(post.category);
    }
  }

  for (const [index, categoryName] of orderedBlogCategories.entries()) {
    const categorySlug = slugify(categoryName);
    await writeDoc(client, {
      id: `blogCategory.${categorySlug}`,
      type: "blogCategory",
      overwrite,
      dryRun,
      fields: {
        title: categoryName,
        slug: { _type: "slug", current: categorySlug },
        sortOrder: index + 1,
      },
    });
  }

  for (const post of legacyPosts) {
    const categorySlug = slugify(post.category);
    await writeDoc(client, {
      id: `blogPost.${post.slug}`,
      type: "blogPost",
      overwrite,
      dryRun,
      fields: {
        title: post.title,
        slug: { _type: "slug", current: post.slug },
        excerpt: post.excerpt,
        category: ref(`blogCategory.${categorySlug}`),
        publishedDate: toSanityDate(post.date),
        featured: Boolean(post.featured),
        body: [],
        seo: {
          title: post.title,
          description: post.excerpt,
        },
      },
    });
  }

  // 6) Team members
  for (const [index, member] of legacyTeamMembers.entries()) {
    await writeDoc(client, {
      id: `teamMember.${member.slug}`,
      type: "teamMember",
      overwrite,
      dryRun,
      fields: {
        name: member.name,
        slug: { _type: "slug", current: member.slug },
        title: member.title,
        description: member.description,
        linkedinUrl: readOptionalString(member.linkedinUrl) ?? "https://linkedin.com",
        sortOrder: index + 1,
      },
    });
  }

  // 7) Client stories + hub
  const storyRefs: LooseRecord[] = [];
  for (const [index, summary] of legacyClientStories.entries()) {
    const detail = getLegacyClientStoryDetailBySlug(summary.slug);
    if (!detail) {
      continue;
    }

    const storyId = `clientStory.${summary.slug}`;
    storyRefs.push(ref(storyId));

    await writeDoc(client, {
      id: storyId,
      type: "clientStory",
      overwrite,
      dryRun,
      fields: {
        title: detail.title || summary.brand,
        slug: { _type: "slug", current: detail.slug || summary.slug },
        clientName: detail.clientName || summary.brand,
        industry: detail.industry || summary.tag,
        challenge: detail.challenge || summary.desc,
        solution: detail.solution || summary.desc,
        result: detail.result || summary.desc,
        metrics:
          detail.metrics?.map((metric) => ({
            val: metric.value,
            lbl: metric.label,
          })) ?? [
            {
              val: summary.metric,
              lbl: summary.metricLabel,
            },
          ],
        quote: detail.quote || "",
        quoteAuthor: detail.quoteAuthor || "",
        quoteRole: detail.quoteRole || "",
        ctaLabel: detail.ctaLabel || "Start a Project",
        ctaHref: detail.ctaHref || "/contact-us",
        sortOrder: index + 1,
      },
    });
  }

  await writeDoc(client, {
    id: "clientStoriesHub",
    type: "clientStoriesHub",
    overwrite,
    dryRun,
    fields: {
      heading: fallbackHubContent.heading,
      headingAccent: fallbackHubContent.headingAccent,
      subheading: fallbackHubContent.subheading,
      cta: fallbackHubContent.cta,
      featuredStories: storyRefs,
    },
  });

  console.log(dryRun ? "Sanity seed dry run complete." : "Sanity seed complete.");
  console.log("Open /studio and review the populated documents.");
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Seed failed: ${message}`);
  process.exitCode = 1;
});
