"use client";

import React from "react";
import Link from "next/link";
import { BlogPost } from "@/types";

interface BlogPostCardProps {
  post: BlogPost;
  large?: boolean;
}

export function BlogPostCard({ post, large = false }: BlogPostCardProps) {
  const hasImage =
    post.image &&
    !post.image.includes("cost-savings-hero") &&
    !post.image.includes("spring-clean") &&
    !post.image.includes("black-friday");

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group block no-underline rounded-2xl overflow-hidden bg-white border border-supplied-ink/4 transition-all duration-350 ease-supplied hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(26,26,26,0.12)] h-full ${
        large ? "flex flex-col lg:flex-row" : "flex flex-col"
      }`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden flex-shrink-0 ${
          large ? "lg:w-[55%] min-h-[220px] lg:min-h-[360px]" : "w-full min-h-[200px]"
        }`}
      >
        {hasImage ? (
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-600 ease-supplied group-hover:scale-[1.04]"
            style={{ backgroundImage: `url('${post.image}')` }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-supplied-ink via-supplied-ink/95 to-supplied-ink/80 flex items-end p-6">
            <span
              className="text-supplied-amber/15 text-[64px] leading-none font-fraunces select-none"
              aria-hidden="true"
            >
              &ldquo;
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`flex flex-col flex-1 ${large ? "p-6 lg:p-10" : "p-6"}`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.06em] bg-supplied-amber/8 text-supplied-amber border border-supplied-amber/15">
            {post.category}
          </span>
          <span className="text-xs text-supplied-ink/40">{post.date}</span>
        </div>

        <h3
          className={`font-fraunces font-normal leading-[1.3] mb-3 text-supplied-ink ${
            large ? "text-[22px] lg:text-[28px]" : "text-[19px]"
          }`}
        >
          {post.title}
        </h3>

        <p className="text-sm leading-[1.65] text-supplied-ink/60 mb-4 flex-1">
          {post.excerpt}
        </p>

        <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-supplied-amber group">
          Read Article
          <span className="transition-transform duration-300 ease-supplied group-hover:translate-x-1 inline-block">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
