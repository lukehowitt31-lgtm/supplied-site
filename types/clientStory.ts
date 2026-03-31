export interface ClientStoryMetric {
  value: string;
  label: string;
}

export interface ClientStorySectionItem {
  title?: string;
  body?: string;
  value?: string;
}

export interface ClientStorySection {
  sectionId: string;
  tag?: string;
  heading?: string;
  headingAccent?: string;
  body?: string;
  items?: ClientStorySectionItem[];
}

export interface ClientStorySummary {
  slug: string;
  brand: string;
  headline: string;
  headlineAccent: string;
  tag: string;
  metric: string;
  metricLabel: string;
  image: string;
  position: string;
  desc: string;
  logo: string;
}

export interface ClientStoryDetail {
  slug: string;
  title: string;
  clientName: string;
  industry: string;
  heroImage: string;
  bodyImage1?: string;
  bodyImage2?: string;
  bodyImage3?: string;
  heroHeadline?: string;
  heroSubheadline?: string;
  heroTags?: string[];
  challenge: string;
  solution: string;
  result: string;
  metrics: ClientStoryMetric[];
  sections?: ClientStorySection[];
  quote: string;
  quoteAuthor: string;
  quoteRole: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface ClientStoriesHubStat {
  value: string;
  label: string;
}

export interface ClientStoriesHubContent {
  heading: string;
  subheading: string;
  heroStats: ClientStoriesHubStat[];
  ctaHeading: string;
  ctaBody: string;
  cta: {
    label: string;
    href: string;
  };
  stories: ClientStorySummary[];
}

