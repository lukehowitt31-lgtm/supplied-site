import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/sections/BlogArticle";
import { getPostBySlug, getAllPosts, getRelatedPosts } from "@/lib/content/blog";
import { getProducts } from "@/lib/content/products";
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
  const autoTitle = `${truncatedPostTitle}${suffix}`;
  const seoTitle = post.seo?.title;
  const title = seoTitle
    ? (seoTitle.length > 60 ? seoTitle.slice(0, 59).trimEnd() + "…" : seoTitle)
    : autoTitle;
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
      images: [
        {
          url: `/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.category ?? "Blog")}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      ...(post.dateISO && { publishedTime: post.dateISO }),
      ...(post.author && { authors: [post.author.name] }),
    },
  };
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

  const authorJsonLd = post.author
    ? {
        "@type": "Person" as const,
        name: post.author.name,
        jobTitle: post.author.role,
        url: post.author.linkedinUrl ?? `${siteUrl}/about-us`,
        ...(post.author.image && {
          image: post.author.image.startsWith("http")
            ? post.author.image
            : `${siteUrl}${post.author.image}`,
        }),
      }
    : { "@type": "Person" as const, name: "Supplied Team", url: `${siteUrl}/about-us` };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seo?.description ?? post.excerpt,
    image: post.image.startsWith("http") ? post.image : `${siteUrl}${post.image}`,
    ...(post.dateISO && { datePublished: post.dateISO }),
    ...(post.dateISO && { dateModified: post.dateISO }),
    url: `${siteUrl}/blog/${post.slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/blog/${post.slug}` },
    author: authorJsonLd,
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
      <BlogArticle post={post} relatedPosts={relatedPosts} featuredProducts={featuredProducts} />
    </>
  );
}
