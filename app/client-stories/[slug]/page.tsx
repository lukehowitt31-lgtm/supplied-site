import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getClientStoryBySlug, getClientStorySlugs } from "@/lib/content/clientStories";
import { ClientStoryPage } from "@/components/client-stories/ClientStoryPage";
import { BreadcrumbJsonLd } from "@/components/ui/BreadcrumbJsonLd";
import { buildPageMetadata, ogImageUrl } from "@/lib/seo/metadata";

interface ClientStoryRouteProps {
  params: Promise<{ slug: string }>;
}

const HARDCODED_STORY_ROUTES = new Set([
  "healf",
  "spacegoods",
  "glaize-x-aston-martin",
  "trip",
  "glow-for-it",
  "uncle-matts-hats",
]);

export async function generateStaticParams() {
  const slugs = await getClientStorySlugs();
  return slugs
    .filter((slug) => !HARDCODED_STORY_ROUTES.has(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ClientStoryRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await getClientStoryBySlug(slug);

  if (!story) {
    return { title: "Client Story Not Found | Supplied" };
  }

  const title = `${story.clientName} — Client Story | Supplied`;
  const description = story.result || story.solution || story.challenge;

  return buildPageMetadata({
    title,
    description,
    path: `/client-stories/${slug}`,
    type: "article",
    image: story.heroImage
      ? { url: story.heroImage, alt: `${story.clientName} case study` }
      : ogImageUrl({ title: story.clientName, subtitle: "Client Story" }),
    imageAlt: `${story.clientName} case study — Supplied`,
  });
}

export default async function Page({ params }: ClientStoryRouteProps) {
  const { slug } = await params;
  const story = await getClientStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Client Stories", href: "/client-stories" },
          { name: story.clientName },
        ]}
      />
      <ClientStoryPage story={story} />
    </>
  );
}

