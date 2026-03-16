export interface ClientStoryMetric {
  value: string;
  label: string;
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
  challenge: string;
  solution: string;
  result: string;
  metrics: ClientStoryMetric[];
  quote: string;
  quoteAuthor: string;
  quoteRole: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface ClientStoriesHubContent {
  heading: string;
  subheading: string;
  cta: {
    label: string;
    href: string;
  };
  stories: ClientStorySummary[];
}

