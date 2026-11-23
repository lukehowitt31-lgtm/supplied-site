import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/sections/BlogArticle";
import { getPostBySlug, getAllPosts, getRelatedPosts } from "@/lib/content/blog";
import { getProducts } from "@/lib/content/products";
import { BreadcrumbJsonLd } from "@/components/ui/BreadcrumbJsonLd";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, ogImageUrl } from "@/lib/seo/metadata";
import { absoluteUrl, canonicalUrl } from "@/lib/seo/site";

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
  const autoTitle = `${truncatedPostTitle}${suffix}`;
  const seoTitle = post.seo?.title;
  const title = seoTitle
    ? (seoTitle.length > 60 ? seoTitle.slice(0, 59).trimEnd() + "…" : seoTitle)
    : autoTitle;
  const description = post.seo?.description ?? post.excerpt;

  return buildPageMetadata({
    title,
    description,
    path: `/blog/${slug}`,
    type: "article",
    image: ogImageUrl({
      title: post.title,
      subtitle: post.category ?? "Blog",
      bg: post.image ?? undefined,
    }),
    imageAlt: post.title,
    publishedTime: post.dateISO,
    authors: post.author ? [post.author.name] : undefined,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const [relatedPosts, allProducts] = await Promise.all([
    getRelatedPosts(post.slug, post.category, 3),
    getProducts(),
  ]);
  const featuredProducts = allProducts.slice(0, 4);

  const pageUrl = canonicalUrl(`/blog/${post.slug}`);
  const authorJsonLd = post.author
    ? {
        "@type": "Person" as const,
        name: post.author.name,
        jobTitle: post.author.role,
        url: post.author.linkedinUrl ?? canonicalUrl("/about-us"),
        ...(post.author.image && {
          image: absoluteUrl(post.author.image),
        }),
      }
    : { "@type": "Person" as const, name: "Supplied Team", url: canonicalUrl("/about-us") };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seo?.description ?? post.excerpt,
    image: absoluteUrl(post.image),
    ...(post.dateISO && { datePublished: post.dateISO }),
    ...(post.dateISO && { dateModified: post.dateISO }),
    url: pageUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    author: authorJsonLd,
    publisher: {
      "@type": "Organization",
      name: "Supplied",
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/brand/supplied-logo.svg"),
      },
    },
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      />
      <JsonLd data={articleJsonLd} />
      <BlogArticle post={post} relatedPosts={relatedPosts} featuredProducts={featuredProducts} />
    </>
  );
}
