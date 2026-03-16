import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getClientStoryBySlug, getClientStorySlugs } from "@/lib/content/clientStories";
import { ClientStoryPage } from "@/components/client-stories/ClientStoryPage";

interface ClientStoryRouteProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getClientStorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ClientStoryRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await getClientStoryBySlug(slug);

  if (!story) {
    return {
      title: "Client Story Not Found | Supplied",
    };
  }

  return {
    title: `${story.clientName} — Client Story | Supplied`,
    description: story.result || story.solution || story.challenge,
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

