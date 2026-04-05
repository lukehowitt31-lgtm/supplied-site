export interface BlogPostSeo {
  title?: string;
  description?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  /** ISO 8601 date for structured data (e.g. "2025-05-14") */
  dateISO?: string;
  category: string;
  excerpt: string;
  image: string;
  bannerImage?: string;
  featured?: boolean;
  // Portable Text body content — typed loosely so both Sanity docs and
  // hand-crafted legacy blocks pass through without importing Sanity types.
  body?: unknown[];
  seo?: BlogPostSeo;
}
