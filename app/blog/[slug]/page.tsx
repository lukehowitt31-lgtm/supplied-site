import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/sections/BlogArticle";
import { getPostBySlug, getAllPosts, getRelatedPosts } from "@/lib/content/blog";
import { BreadcrumbJsonLd } from "@/components/ui/BreadcrumbJsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.suppliedpackaging.com";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found | Supplied" };
  }

  const suffix = " | Supplied Blog";
  const maxTitleLen = 60 - suffix.length;
  const truncatedPostTitle =
    post.title.length > maxTitleLen
      ? post.title.slice(0, maxTitleLen - 1).trimEnd() + "…"
      : post.title;
  const title = post.seo?.title ?? `${truncatedPostTitle}${suffix}`;
  const description = post.seo?.description ?? post.excerpt;

  return {
    title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title,
      description,
      url: `/blog/${slug}`,
      type: "article",
      ...(post.image && {
        images: [{ url: post.image, alt: post.title }],
      }),
      ...(post.dateISO && { publishedTime: post.dateISO }),
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.slug, post.category, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seo?.description ?? post.excerpt,
    image: post.image,
    ...(post.dateISO && { datePublished: post.dateISO }),
    url: `${siteUrl}/blog/${post.slug}`,
    publisher: {
      "@type": "Organization",
      name: "Supplied",
      logo: { "@type": "ImageObject", url: `${siteUrl}/images/brand/supplied-logo.svg` },
    },
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.title },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BlogArticle post={post} relatedPosts={relatedPosts} />
    </>
  );
}
