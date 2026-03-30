"use client";

import React from "react";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { BlogPostCard } from "@/components/ui/BlogPostCard";
import { BlogPost } from "@/types";

interface BlogArticleProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

function extractYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.slice(1);
    }
    return parsed.searchParams.get("v");
  } catch {
    return null;
  }
}

interface TableRow {
  cells?: string[];
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-[clamp(24px,3vw,32px)] font-extrabold leading-[1.2] mt-12 mb-4 tracking-[-0.02em] text-supplied-ink">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-[clamp(18px,2.2vw,22px)] font-bold leading-[1.3] mt-10 mb-3 tracking-[-0.01em] text-supplied-ink">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-[17px] font-bold leading-[1.4] mt-8 mb-2 text-supplied-ink">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-[16px] leading-[1.8] text-supplied-ink/75 mb-5">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-3 border-supplied-amber pl-6 my-8 text-[17px] italic leading-[1.7] text-supplied-ink/65">
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
        href.startsWith("http") && !href.includes("supplied.agency");
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
      <ul className="list-disc pl-6 mb-5 space-y-2 text-[16px] leading-[1.8] text-supplied-ink/75">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-5 space-y-2 text-[16px] leading-[1.8] text-supplied-ink/75">
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
                    ri % 2 === 0
                      ? "bg-white"
                      : "bg-supplied-ink/[0.02]"
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
      <figure className="my-10 py-8 border-y border-supplied-ink/8">
        <blockquote className="text-[clamp(18px,2.2vw,24px)] font-fraunces leading-[1.5] text-supplied-ink/80 text-center max-w-[800px] mx-auto">
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
          <div className="relative w-full rounded-xl overflow-hidden" style={{ paddingBottom: "56.25%" }}>
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

    blogDivider: ({
      value,
    }: {
      value: { style?: string };
    }) => (
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
  return (
    <div className="bg-supplied-bg">
      {/* Hero */}
      <section className="bg-supplied-ink text-white pt-[140px] pb-[60px] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, transparent, transparent 80px, rgba(200,119,62,.1) 80px, rgba(200,119,62,.1) 81px)",
          }}
        />
        <Container className="relative z-10">
          <div className="opacity-0 animate-slide-up [animation-delay:0.1s]">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[13px] text-white/40 hover:text-white/70 transition-colors mb-6"
            >
              <span>←</span>
              <span>Back to Blog</span>
            </Link>
          </div>

          <div className="opacity-0 animate-slide-up [animation-delay:0.15s] flex items-center gap-3 mb-4">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.06em] bg-supplied-amber/15 text-supplied-amber border border-supplied-amber/20">
              {post.category}
            </span>
            <span className="text-xs text-white/35">{post.date}</span>
          </div>

          <h1 className="opacity-0 animate-slide-up [animation-delay:0.25s] text-[clamp(32px,4.5vw,48px)] font-extrabold leading-[1.12] mb-5 tracking-[-0.03em]">
            {post.title}
          </h1>

          <p className="opacity-0 animate-slide-up [animation-delay:0.4s] text-[16px] text-white/45 max-w-[600px] leading-[1.75]">
            {post.excerpt}
          </p>
        </Container>
      </section>

      {/* Body */}
      <section className="py-16 md:py-20">
        <Container>
          <Reveal>
            <article className="prose-supplied">
              {post.body && post.body.length > 0 ? (
                <PortableText
                  value={post.body as never[]}
                  components={portableTextComponents}
                />
              ) : (
                <p className="text-[16px] leading-[1.8] text-supplied-ink/75">
                  {post.excerpt}
                </p>
              )}
            </article>
          </Reveal>
        </Container>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="pb-20">
          <Container>
            <Reveal>
              <div className="border-t border-supplied-ink/6 pt-14">
                <Tag color="amber">Related Posts</Tag>
                <h2 className="text-[clamp(26px,3vw,32px)] font-extrabold text-supplied-ink leading-[1.15] mt-4 mb-8 tracking-[-0.02em]">
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
            <h2 className="text-[clamp(26px,3.2vw,32px)] font-extrabold text-white leading-[1.15] mb-3 tracking-[-0.02em]">
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
