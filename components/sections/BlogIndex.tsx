"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { BlogPostCard } from "@/components/ui/BlogPostCard";
import { BlogPost } from "@/types";

interface BlogIndexProps {
  posts: BlogPost[];
  categories: string[];
}

export function BlogIndex({ posts, categories }: BlogIndexProps) {
  const [filter, setFilter] = useState("All");

  const featured = posts.find((p) => p.featured);
  const visiblePosts =
    filter === "All"
      ? posts.filter((p) => !p.featured)
      : posts.filter((p) => p.category === filter);

  return (
    <div className="bg-supplied-bg">
      {/* Hero */}
      <section className="bg-supplied-ink text-white pt-[140px] pb-[60px] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 80px, rgba(200,119,62,.1) 80px, rgba(200,119,62,.1) 81px)" }} />
        <Container className="relative z-10">
          <div className="opacity-0 animate-slide-up [animation-delay:0.1s]">
            <Tag color="amber">Blog</Tag>
          </div>
          <h1 className="opacity-0 animate-slide-up [animation-delay:0.2s] text-[clamp(40px,5vw,64px)] font-extrabold leading-[1.1] mb-4 mt-5 max-w-[700px] tracking-[-0.03em]">
            Insights, advice & <em className="font-fraunces font-normal italic text-supplied-amber-bright">industry thinking.</em>
          </h1>
          <p className="opacity-0 animate-slide-up [animation-delay:0.35s] text-[16px] text-white/45 max-w-[520px] leading-[1.75]">
            Practical packaging strategy for brands that are scaling. No fluff.
          </p>
        </Container>
      </section>

      {/* Category Filter */}
      <section>
        <Container className="pt-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-[18px] py-2 rounded-full text-[13px] font-semibold cursor-pointer border transition-all duration-200 ${
                  filter === cat
                    ? "bg-supplied-amber text-white border-supplied-amber"
                    : "bg-transparent text-supplied-ink/60 border-supplied-ink/8 hover:border-supplied-ink/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Post */}
      {filter === "All" && featured && (
        <section>
          <Container className="pt-10 pb-6">
            <Reveal>
              <BlogPostCard post={featured} large />
            </Reveal>
          </Container>
        </section>
      )}

      {/* Post Grid */}
      <section>
        <Container className="pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
            {visiblePosts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 60}>
                <BlogPostCard post={post} />
              </Reveal>
            ))}
          </div>

          {visiblePosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-supplied-ink/40 text-[15px]">
                No posts found in this category yet.
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-supplied-ink py-[80px]">
        <Reveal>
          <Container narrow className="text-center">
            <h2 className="text-[clamp(26px,3.2vw,32px)] font-extrabold text-white leading-[1.15] mb-3 tracking-[-0.02em]">
              Want packaging advice{" "}
              <em className="font-fraunces font-normal italic text-supplied-amber-bright">
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
