export interface BlogPostSeo {
  title?: string;
  description?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
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
