"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { BlogPostCard } from "@/components/ui/BlogPostCard";
import { trackEvent } from "@/lib/analytics";
import { BlogPost } from "@/types";

interface BlogArticleProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

function extractYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) return parsed.pathname.slice(1);
    return parsed.searchParams.get("v");
  } catch {
    return null;
  }
}

function estimateReadingTime(body: unknown[] | undefined): number {
  if (!body || body.length === 0) return 3;
  let words = 0;
  for (const block of body) {
    if (block && typeof block === "object" && "children" in block) {
      const children = (block as { children?: { text?: string }[] }).children;
      if (Array.isArray(children)) {
        for (const child of children) {
          if (child.text) words += child.text.split(/\s+/).length;
        }
      }
    }
  }
  return Math.max(1, Math.round(words / 230));
}

interface TocItem {
  id: string;
  text: string;
}

function extractToc(body: unknown[] | undefined): TocItem[] {
  if (!body) return [];
  const items: TocItem[] = [];
  for (const block of body) {
    if (
      block &&
      typeof block === "object" &&
      "style" in block &&
      (block as { style?: string }).style === "h2" &&
      "children" in block
    ) {
      const children = (block as { children?: { text?: string }[] }).children;
      if (Array.isArray(children)) {
        const text = children.map((c) => c.text || "").join("");
        if (text.trim()) {
          const id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
          items.push({ id, text: text.trim() });
        }
      }
    }
  }
  return items;
}

function slugifyHeading(children: React.ReactNode): string {
  const text = React.Children.toArray(children)
    .map((child) => {
      if (typeof child === "string") return child;
      if (
        typeof child === "object" &&
        child !== null &&
        "props" in child &&
        (child as { props?: { children?: React.ReactNode } }).props?.children
      ) {
        return String(
          (child as { props: { children: React.ReactNode } }).props.children
        );
      }
      return "";
    })
    .join("");
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const article = document.getElementById("blog-article-body");
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const articleTop = rect.top + window.scrollY;
      const articleHeight = rect.height;
      const scrolled = window.scrollY - articleTop;
      const pct = Math.min(100, Math.max(0, (scrolled / articleHeight) * 100));
      setProgress(pct);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (progress <= 0) return null;
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-supplied-amber transition-[width] duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function TableOfContents({
  items,
  activeId,
}: {
  items: TocItem[];
  activeId: string;
}) {
  if (items.length === 0) return null;
  return (
    <nav className="space-y-1">
      <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-supplied-amber mb-3">
        Contents
      </p>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`block text-[13px] leading-[1.5] py-1.5 pl-3 border-l-2 transition-colors ${
            activeId === item.id
              ? "border-supplied-amber text-supplied-ink font-medium"
              : "border-transparent text-supplied-ink/35 hover:text-supplied-ink/60 hover:border-supplied-ink/10"
          }`}
        >
          {item.text}
        </a>
      ))}
    </nav>
  );
}

function useActiveHeading(ids: string[]): string {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (ids.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

function ShareButton({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-supplied-ink/10 text-supplied-ink/40 hover:text-supplied-amber hover:border-supplied-amber/30 transition-colors"
      onClick={() => trackEvent("blog_shared", { platform: label })}
    >
      {children}
    </a>
  );
}

interface TableRow {
  cells?: string[];
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2
        id={slugifyHeading(children)}
        className="text-[clamp(22px,2.8vw,28px)] font-extrabold leading-[1.25] mt-14 mb-4 tracking-[-0.02em] text-supplied-ink scroll-mt-24"
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-[clamp(17px,2vw,21px)] font-bold leading-[1.35] mt-10 mb-3 tracking-[-0.01em] text-supplied-ink">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-[16px] font-bold leading-[1.4] mt-8 mb-2 text-supplied-ink">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-[16px] leading-[1.85] text-supplied-ink/70 mb-6">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-3 border-supplied-amber pl-6 my-8 text-[17px] italic leading-[1.7] text-supplied-ink/60">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-supplied-ink">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href ?? "#";
      const isExternal =
        href.startsWith("http") && !href.includes("suppliedpackaging.com");
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-supplied-amber underline decoration-supplied-amber/30 underline-offset-2 hover:decoration-supplied-amber transition-colors"
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={href}
          className="text-supplied-amber underline decoration-supplied-amber/30 underline-offset-2 hover:decoration-supplied-amber transition-colors"
        >
          {children}
        </Link>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 space-y-2.5 text-[16px] leading-[1.85] text-supplied-ink/70">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2.5 text-[16px] leading-[1.85] text-supplied-ink/70">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  types: {
    table: ({ value }: { value: { rows?: TableRow[] } }) => {
      const rows = value?.rows;
      if (!Array.isArray(rows) || rows.length === 0) return null;
      const [header, ...body] = rows;
      return (
        <div className="my-8 overflow-x-auto rounded-xl border border-supplied-ink/8">
          <table className="w-full text-[14px] leading-[1.6]">
            {header?.cells && (
              <thead>
                <tr className="bg-supplied-ink text-white">
                  {header.cells.map((cell: string, i: number) => (
                    <th
                      key={i}
                      className="px-4 py-3 text-left font-semibold text-[13px] uppercase tracking-wide"
                    >
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {body.map((row, ri) => (
                <tr
                  key={ri}
                  className={
                    ri % 2 === 0 ? "bg-white" : "bg-supplied-ink/[0.02]"
                  }
                >
                  {row.cells?.map((cell: string, ci: number) => (
                    <td
                      key={ci}
                      className="px-4 py-3 text-supplied-ink/75 border-t border-supplied-ink/6"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },

    blogTable: ({
      value,
    }: {
      value: {
        table?: { rows?: TableRow[] };
        withHeader?: boolean;
        caption?: string;
      };
    }) => {
      const rows = value?.table?.rows;
      if (!Array.isArray(rows) || rows.length === 0) return null;
      const hasHeader = value.withHeader !== false;
      const headerRow = hasHeader ? rows[0] : null;
      const bodyRows = hasHeader ? rows.slice(1) : rows;
      return (
        <figure className="my-8">
          <div className="overflow-x-auto rounded-xl border border-supplied-ink/8">
            <table className="w-full text-[14px] leading-[1.6]">
              {headerRow?.cells && (
                <thead>
                  <tr className="bg-supplied-ink text-white">
                    {headerRow.cells.map((cell: string, i: number) => (
                      <th
                        key={i}
                        className="px-4 py-3 text-left font-semibold text-[13px] uppercase tracking-wide"
                      >
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {bodyRows.map((row, ri) => (
                  <tr
                    key={ri}
                    className={
                      ri % 2 === 0 ? "bg-white" : "bg-supplied-ink/[0.02]"
                    }
                  >
                    {row.cells?.map((cell: string, ci: number) => (
                      <td
                        key={ci}
                        className="px-4 py-3 text-supplied-ink/75 border-t border-supplied-ink/6"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center text-[13px] text-supplied-ink/40">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },

    blogMediaText: ({
      value,
    }: {
      value: {
        image?: { asset?: { _ref?: string }; alt?: string };
        imagePosition?: string;
        heading?: string;
        body?: string;
      };
    }) => {
      const ref = value.image?.asset?._ref;
      if (!ref) return null;
      const [, id, dims, format] = ref.split("-");
      if (!id || !dims || !format) return null;
      const src = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}-${dims}.${format}`;
      const [w, h] = dims.split("x").map(Number);
      const rawPos = (value.imagePosition ?? "right").replace(/[^\w]/g, "");
      const imageOnLeft = rawPos === "left";

      const textBlock = (
        <div className="flex-1 min-w-0" key="text">
          {value.heading && (
            <h4 className="text-[17px] font-bold text-supplied-ink mb-2 leading-[1.3]">
              {value.heading}
            </h4>
          )}
          <p className="text-[15px] text-supplied-ink/70 leading-[1.8] whitespace-pre-line">
            {value.body}
          </p>
        </div>
      );

      const imageBlock = (
        <div className="w-full md:w-[45%] shrink-0" key="image">
          <Image
            src={src}
            alt={value.image?.alt || ""}
            width={w || 500}
            height={h || 400}
            className="w-full rounded-xl object-cover"
          />
        </div>
      );

      return (
        <div className="my-8 flex flex-col md:flex-row gap-6 items-start">
          {imageOnLeft ? (
            <>{imageBlock}{textBlock}</>
          ) : (
            <>{textBlock}{imageBlock}</>
          )}
        </div>
      );
    },

    blogCallout: ({
      value,
    }: {
      value: { style?: string; heading?: string; body?: string };
    }) => {
      const style = (value.style || "important").replace(/[^\w]/g, "");
      const config = {
        important: {
          bg: "bg-supplied-amber/[0.06]",
          border: "border-supplied-amber/25",
          label: "IMPORTANT",
          labelColor: "text-supplied-amber",
          accentBar: "bg-supplied-amber",
        },
        hint: {
          bg: "bg-blue-50",
          border: "border-blue-200",
          label: "HINT / ADVICE",
          labelColor: "text-blue-600",
          accentBar: "bg-blue-400",
        },
        warning: {
          bg: "bg-red-50",
          border: "border-red-200",
          label: "WARNING",
          labelColor: "text-red-600",
          accentBar: "bg-red-400",
        },
      }[style] ?? {
        bg: "bg-supplied-amber/[0.06]",
        border: "border-supplied-amber/25",
        label: "NOTE",
        labelColor: "text-supplied-amber",
        accentBar: "bg-supplied-amber",
      };

      return (
        <aside
          className={`my-8 rounded-xl border ${config.border} ${config.bg} p-5 md:p-6 relative overflow-hidden`}
        >
          <div className={`absolute left-0 top-0 bottom-0 w-1 ${config.accentBar}`} />
          <p className={`text-[10px] font-bold tracking-[0.12em] uppercase ${config.labelColor} mb-2 pl-2`}>
            {config.label}
          </p>
          {value.heading && (
            <p className="text-[15px] font-semibold text-supplied-ink mb-1 pl-2">
              {value.heading}
            </p>
          )}
          <p className="text-[14px] text-supplied-ink/70 leading-[1.7] pl-2">
            {value.body}
          </p>
        </aside>
      );
    },

    blogCta: ({
      value,
    }: {
      value: {
        heading?: string;
        body?: string;
        buttonLabel?: string;
        buttonHref?: string;
      };
    }) => (
      <div className="my-10 rounded-2xl bg-supplied-ink p-8 md:p-10 text-center">
        {value.heading && (
          <h3 className="text-[clamp(20px,2.5vw,26px)] font-extrabold text-white mb-2 tracking-[-0.02em]">
            {value.heading}
          </h3>
        )}
        {value.body && (
          <p className="text-[15px] text-white/45 leading-[1.7] mb-6 max-w-[500px] mx-auto">
            {value.body}
          </p>
        )}
        <Button
          variant="fill-amber"
          size="md"
          href={value.buttonHref || "/contact-us"}
          icon
        >
          {value.buttonLabel || "Get in Touch"}
        </Button>
      </div>
    ),

    blogPullQuote: ({
      value,
    }: {
      value: { quote?: string; attribution?: string };
    }) => (
      <figure className="my-12 py-8 border-y border-supplied-ink/8">
        <blockquote className="text-[clamp(18px,2.2vw,24px)] font-fraunces leading-[1.5] text-supplied-ink/80 text-center max-w-[600px] mx-auto">
          <span
            className="text-supplied-amber/30 text-[48px] leading-none font-fraunces mr-1"
            aria-hidden="true"
          >
            &ldquo;
          </span>
          {value.quote}
          <span
            className="text-supplied-amber/30 text-[48px] leading-none font-fraunces ml-1"
            aria-hidden="true"
          >
            &rdquo;
          </span>
        </blockquote>
        {value.attribution && (
          <figcaption className="mt-4 text-center text-[13px] font-semibold text-supplied-ink/40 uppercase tracking-wide">
            — {value.attribution}
          </figcaption>
        )}
      </figure>
    ),

    blogVideoEmbed: ({
      value,
    }: {
      value: { url?: string; caption?: string };
    }) => {
      const videoId = value.url ? extractYouTubeId(value.url) : null;
      if (!videoId) return null;
      return (
        <figure className="my-8">
          <div
            className="relative w-full rounded-xl overflow-hidden"
            style={{ paddingBottom: "56.25%" }}
          >
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={value.caption || "Video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center text-[13px] text-supplied-ink/40">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },

    imageWithAlt: ({
      value,
    }: {
      value: { asset?: { _ref?: string }; alt?: string };
    }) => {
      const ref = value?.asset?._ref;
      if (!ref) return null;
      const [, id, dims, format] = ref.split("-");
      if (!id || !dims || !format) return null;
      const src = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}-${dims}.${format}`;
      const [w, h] = dims.split("x").map(Number);
      return (
        <figure className="my-8">
          <Image
            src={src}
            alt={value.alt || ""}
            width={w || 720}
            height={h || 400}
            className="w-full rounded-xl"
          />
          {value.alt && (
            <figcaption className="mt-3 text-center text-[13px] text-supplied-ink/40">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },

    blogImageGallery: ({
      value,
    }: {
      value: {
        images?: { asset?: { _ref?: string }; alt?: string }[];
        caption?: string;
      };
    }) => {
      const imgs = (value.images ?? []).filter((img) => img.asset?._ref);
      if (imgs.length === 0) return null;
      const colClass =
        imgs.length === 2
          ? "grid-cols-2"
          : imgs.length === 3
            ? "grid-cols-2 sm:grid-cols-3"
            : "grid-cols-2 sm:grid-cols-4";
      return (
        <figure className="my-8">
          <div className={`grid ${colClass} gap-3`}>
            {imgs.map((img, i) => {
              const ref = img.asset!._ref!;
              const [, id, dims, format] = ref.split("-");
              if (!id || !dims || !format) return null;
              const src = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}-${dims}.${format}`;
              const [w, h] = dims.split("x").map(Number);
              return (
                <Image
                  key={i}
                  src={src}
                  alt={img.alt || ""}
                  width={w || 400}
                  height={h || 300}
                  className="w-full h-full object-cover rounded-lg"
                />
              );
            })}
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center text-[13px] text-supplied-ink/40">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },

    blogDivider: ({ value }: { value: { style?: string } }) => (
      <hr
        className={`my-10 border-0 h-px ${
          value?.style === "accent"
            ? "bg-supplied-amber/25"
            : "bg-supplied-ink/8"
        }`}
      />
    ),
  },
};

export function BlogArticle({ post, relatedPosts }: BlogArticleProps) {
  const readTime = estimateReadingTime(post.body);
  const heroImage = post.bannerImage || post.image || null;
  const tocItems = useMemo(() => extractToc(post.body), [post.body]);
  const tocIds = useMemo(() => tocItems.map((item) => item.id), [tocItems]);
  const activeId = useActiveHeading(tocIds);

  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://www.suppliedpackaging.com/blog/${post.slug}`;
  const shareTitle = encodeURIComponent(post.title);
  const shareUrlEncoded = encodeURIComponent(shareUrl);

  return (
    <div className="bg-supplied-bg">
      <ReadingProgress />

      {/* Hero with banner image */}
      <section className="bg-supplied-ink text-white relative overflow-hidden">
        {/* Banner image background */}
        {heroImage && (
          <>
            <Image
              src={heroImage}
              alt={post.title}
              width={1920}
              height={800}
              className="absolute inset-0 w-full h-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-supplied-ink via-supplied-ink/90 to-supplied-ink/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-supplied-ink via-supplied-ink/40 to-supplied-ink/70" />
          </>
        )}
        {!heroImage && (
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, rgba(200,119,62,.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(200,119,62,.08) 0%, transparent 40%)",
            }}
          />
        )}
        <Container className="relative z-10 pt-[140px] pb-[80px]">
          <div className="max-w-[800px]">
            <div className="opacity-0 animate-slide-up [animation-delay:0.1s]">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[13px] text-white/35 hover:text-white/70 transition-colors mb-8 group"
              >
                <span className="group-hover:-translate-x-0.5 transition-transform">
                  &larr;
                </span>
                <span>Back to Blog</span>
              </Link>
            </div>

            <div className="opacity-0 animate-slide-up [animation-delay:0.15s] mb-5">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.06em] bg-supplied-amber/15 text-supplied-amber border border-supplied-amber/20">
                {post.category}
              </span>
            </div>

            <h1 className="opacity-0 animate-slide-up [animation-delay:0.25s] text-[clamp(30px,4.5vw,46px)] font-extrabold leading-[1.1] mb-6 tracking-[-0.03em]">
              {post.title}
            </h1>

            <p className="opacity-0 animate-slide-up [animation-delay:0.35s] text-[16px] text-white/50 max-w-[600px] leading-[1.8] mb-8">
              {post.excerpt}
            </p>

            {/* Author / meta row */}
            <div className="opacity-0 animate-slide-up [animation-delay:0.45s] flex items-center gap-4 text-[13px] text-white/40">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-supplied-amber/20 border border-supplied-amber/30 flex items-center justify-center text-[11px] font-bold text-supplied-amber">
                  S
                </div>
                <span className="text-white/60 font-medium">
                  Supplied Team
                </span>
              </div>
              <span className="w-px h-4 bg-white/15" />
              <span>{post.date}</span>
              <span className="w-px h-4 bg-white/15" />
              <span>{readTime} min read</span>
            </div>
          </div>
        </Container>
      </section>

      {/* 3-column body: TOC | Article | Sidebar CTA */}
      <section id="blog-article-body" className="pt-12 pb-8 md:pt-16 md:pb-12">
        <Container>
          <div className={`flex gap-10 xl:gap-14 relative ${tocItems.length === 0 ? "justify-center" : ""}`}>
            {/* Left: Table of Contents */}
            {tocItems.length > 0 && (
              <aside className="hidden lg:block w-[200px] shrink-0">
                <div className="sticky top-28">
                  <TableOfContents items={tocItems} activeId={activeId} />
                </div>
              </aside>
            )}

            {/* Center: Article */}
            <div className="flex-1 min-w-0 max-w-[720px]">
              <article>
                {post.body && post.body.length > 0 ? (
                  <PortableText
                    value={post.body as never[]}
                    components={portableTextComponents}
                  />
                ) : (
                  <p className="text-[16px] leading-[1.85] text-supplied-ink/70">
                    {post.excerpt}
                  </p>
                )}
              </article>

              {/* Share row */}
              <div className="mt-14 pt-8 border-t border-supplied-ink/8">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold text-supplied-ink/40 uppercase tracking-wide mr-2">
                      Share
                    </span>
                    <ShareButton
                      label="Share on X"
                      href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrlEncoded}`}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </ShareButton>
                    <ShareButton
                      label="Share on LinkedIn"
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrlEncoded}`}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </ShareButton>
                    <ShareButton label="Copy link" href={shareUrl}>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                    </ShareButton>
                  </div>

                  <Link
                    href="/blog"
                    className="text-[13px] font-semibold text-supplied-ink/40 hover:text-supplied-amber transition-colors flex items-center gap-1.5"
                  >
                    More articles <span>&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: Sticky sidebar */}
            <aside className="hidden xl:block w-[260px] shrink-0">
              <div className="sticky top-28 space-y-6">
                {/* CTA Card */}
                <div className="rounded-2xl bg-supplied-ink p-6 text-center">
                  <div className="w-10 h-10 rounded-xl bg-supplied-amber/15 flex items-center justify-center mx-auto mb-4">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#C8773E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <p className="text-[14px] font-bold text-white mb-1.5">
                    Need packaging advice?
                  </p>
                  <p className="text-[12px] text-white/35 leading-[1.6] mb-5">
                    Our team has delivered 200+ projects. Let&apos;s talk about
                    yours.
                  </p>
                  <Button
                    variant="fill-amber"
                    size="sm"
                    href="/contact-us"
                    icon
                    className="w-full justify-center text-[13px]"
                  >
                    Get in Touch
                  </Button>
                </div>

                {/* Related tag */}
                {relatedPosts.length > 0 && (
                  <div className="rounded-2xl border border-supplied-ink/6 bg-white p-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-supplied-amber mb-3">
                      Related
                    </p>
                    <div className="space-y-3">
                      {relatedPosts.slice(0, 3).map((rp) => (
                        <Link
                          key={rp.slug}
                          href={`/blog/${rp.slug}`}
                          className="block group"
                        >
                          <p className="text-[13px] font-semibold text-supplied-ink leading-[1.4] group-hover:text-supplied-amber transition-colors">
                            {rp.title}
                          </p>
                          <p className="text-[11px] text-supplied-ink/35 mt-0.5">
                            {rp.category}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Related Posts (full-width section below) */}
      {relatedPosts.length > 0 && (
        <section className="pb-20">
          <Container>
            <Reveal>
              <div className="border-t border-supplied-ink/6 pt-14">
                <Tag color="amber">Related Posts</Tag>
                <h2 className="text-[clamp(24px,3vw,30px)] font-extrabold text-supplied-ink leading-[1.15] mt-4 mb-8 tracking-[-0.02em]">
                  Keep reading
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {relatedPosts.map((relatedPost, i) => (
                    <Reveal key={relatedPost.slug} delay={i * 60}>
                      <BlogPostCard post={relatedPost} />
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="bg-supplied-ink py-[80px]">
        <Reveal>
          <Container narrow className="text-center">
            <h2 className="text-[clamp(24px,3vw,30px)] font-extrabold text-white leading-[1.15] mb-3 tracking-[-0.02em]">
              Want packaging advice{" "}
              <em className="font-fraunces font-medium italic text-supplied-amber-bright">
                tailored to your brand?
              </em>
            </h2>
            <p className="text-[15px] text-white/40 leading-[1.7] mb-8">
              Our blog covers the general principles — but every brand is
              different. Let&apos;s talk about yours.
            </p>
            <Button variant="fill-amber" size="lg" href="/contact-us" icon>
              Start a Conversation
            </Button>
          </Container>
        </Reveal>
      </section>
    </div>
  );
}
