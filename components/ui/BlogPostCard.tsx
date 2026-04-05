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
      className={`group block no-underline rounded-2xl overflow-hidden bg-white border border-supplied-ink/[0.06] transition-all duration-350 ease-supplied hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(26,26,26,0.10)] h-full ${
        large ? "flex flex-col lg:flex-row" : "flex flex-col"
      }`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden flex-shrink-0 ${
          large
            ? "lg:w-[55%] min-h-[240px] lg:min-h-[380px]"
            : "w-full aspect-[16/10]"
        }`}
      >
        {hasImage ? (
          <img
            src={post.image}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-supplied group-hover:scale-[1.05]"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-supplied-ink flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-supplied-amber/10 via-transparent to-supplied-amber/5" />
            <span className="relative text-[11px] font-bold uppercase tracking-[0.14em] text-white/20">
              {post.category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`flex flex-col flex-1 ${large ? "p-7 lg:p-10" : "p-5 pt-4"}`}>
        <div className="flex items-center gap-2.5 mb-3">
          <span className="px-2.5 py-[3px] rounded-full text-[10px] font-bold uppercase tracking-[0.06em] bg-supplied-amber/8 text-supplied-amber border border-supplied-amber/15">
            {post.category}
          </span>
          <span className="text-[11px] text-supplied-ink/30 font-medium">{post.date}</span>
        </div>

        <h3
          className={`font-extrabold leading-[1.2] tracking-[-0.02em] mb-2.5 text-supplied-ink group-hover:text-supplied-amber transition-colors duration-300 ${
            large ? "text-[20px] lg:text-[26px]" : "text-[17px]"
          }`}
        >
          {post.title}
        </h3>

        <p
          className={`leading-[1.7] text-supplied-ink/50 mb-5 flex-1 ${
            large ? "text-[14px]" : "text-[13px] line-clamp-3"
          }`}
        >
          {post.excerpt}
        </p>

        <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-supplied-amber mt-auto">
          Read Article
          <span className="transition-transform duration-300 ease-supplied group-hover:translate-x-1 inline-block">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
