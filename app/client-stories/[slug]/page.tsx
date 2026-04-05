import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getClientStoryBySlug, getClientStorySlugs } from "@/lib/content/clientStories";
import { ClientStoryPage } from "@/components/client-stories/ClientStoryPage";

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

  return {
    title,
    description,
    alternates: { canonical: `/client-stories/${slug}` },
    openGraph: {
      title,
      description,
      url: `/client-stories/${slug}`,
      ...(story.heroImage && {
        images: [{ url: story.heroImage, alt: `${story.clientName} case study` }],
      }),
    },
  };
}

export default async function Page({ params }: ClientStoryRouteProps) {
  const { slug } = await params;
  const story = await getClientStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  return <ClientStoryPage story={story} />;
}

