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
  description: string;
  facts?: string[];
  features?: string[];
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
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  trustedBrands: { heading: string };
  problemBottleneck: { heading: string; intro: string; items: string[] };
  solution: { heading: string; body: string; steps: string[] };
  servicesTeaser: { heading: string; body: string };
  clientStoriesTeaser: {
    heading: string;
    body: string;
    cta: { label: string; href: string };
  };
  productsTeaser: {
    heading: string;
    body: string;
    cta: { label: string; href: string };
  };
  sustainability: { heading: string; body: string; checklist: string[] };
  process: { heading: string; steps: string[] };
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
  subheading: string;
  cta: {
    label: string;
    href: string;
  };
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

  const { products, categories } = productsModule;
  const { fallbackHomePageContent } = homeModule;
  const { fallbackAboutPageContent } = aboutModule;
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
        primaryCta: fallbackHomePageContent.hero.primaryCta,
        secondaryCta: fallbackHomePageContent.hero.secondaryCta,
      },
      trustedBrands: {
        heading: fallbackHomePageContent.trustedBrands.heading,
        brands: [],
      },
      problemBottleneck: {
        heading: fallbackHomePageContent.problemBottleneck.heading,
        intro: fallbackHomePageContent.problemBottleneck.intro,
        items: fallbackHomePageContent.problemBottleneck.items,
      },
      solution: {
        heading: fallbackHomePageContent.solution.heading,
        body: fallbackHomePageContent.solution.body,
        steps: fallbackHomePageContent.solution.steps,
      },
      servicesTeaser: fallbackHomePageContent.servicesTeaser,
      clientStoriesTeaser: fallbackHomePageContent.clientStoriesTeaser,
      productsTeaser: fallbackHomePageContent.productsTeaser,
      sustainability: fallbackHomePageContent.sustainability,
      process: fallbackHomePageContent.process,
      finalCta: fallbackHomePageContent.finalCta,
    },
  });

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

    await writeDoc(client, {
      id: `product.${product.slug}`,
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
        description: product.description,
        facts: product.facts ?? [],
        features: product.features ?? [],
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
