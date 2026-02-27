import { BlogPost } from "@/types";

const posts: BlogPost[] = [
  {
    slug: "25-real-ways-to-cut-packaging-costs-part-5-final",
    title: "25 Real Ways to Cut Packaging Costs – Part 5 (Final)",
    date: "May 14, 2025",
    category: "Packaging Advice",
    excerpt:
      "How smart packaging supports growth, sustainability, brand trust, and better decision-making across your team.",
    image: "/images/blog/cost-savings-hero.jpg",
    featured: true,
  },
  {
    slug: "25-real-ways-to-cut-packaging-costs-part-4",
    title: "25 Real Ways to Cut Packaging Costs – Part 4",
    date: "May 7, 2025",
    category: "Packaging Advice",
    excerpt:
      "From supplier selection to order strategy — where the biggest savings can be unlocked.",
    image: "/images/blog/cost-savings-hero.jpg",
  },
  {
    slug: "25-real-ways-to-cut-packaging-costs-part-3",
    title: "25 Real Ways to Cut Packaging Costs – Part 3",
    date: "April 30, 2025",
    category: "Packaging Advice",
    excerpt:
      "Customer experience strategies that reduce returns, improve perception, and save money.",
    image: "/images/blog/cost-savings-hero.jpg",
  },
  {
    slug: "25-real-ways-to-cut-packaging-costs-part-2",
    title: "25 Real Ways to Cut Packaging Costs – Part 2",
    date: "April 23, 2025",
    category: "Packaging Advice",
    excerpt:
      "Reduce spend through smarter supply chain thinking — shipping, storage, and fulfilment.",
    image: "/images/blog/cost-savings-hero.jpg",
  },
  {
    slug: "25-real-ways-to-cut-packaging-costs-part-1",
    title: "25 Real Ways to Cut Packaging Costs – Part 1",
    date: "April 16, 2025",
    category: "Packaging Advice",
    excerpt:
      "10 practical ways to save money through smarter packaging design without cutting corners.",
    image: "/images/blog/cost-savings-hero.jpg",
  },
  {
    slug: "spring-clean-your-packaging",
    title: "Spring Clean Your Packaging Supply Chain",
    date: "April 2, 2025",
    category: "Urgent Information",
    excerpt:
      "With summer launches ahead, address lead times and hidden issues now.",
    image: "/images/blog/spring-clean.jpg",
  },
  {
    slug: "black-friday-deadlines",
    title: "It's Beginning to Look a Lot Like Christmas…",
    date: "August 23, 2024",
    category: "Urgent Information",
    excerpt:
      "Black Friday packaging deadlines are looming. Here's what you need to know.",
    image: "/images/blog/black-friday.jpg",
  },
];

export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getFeaturedPost(): BlogPost | undefined {
  return posts.find((p) => p.featured);
}

export function getPostsByCategory(category: string): BlogPost[] {
  if (category === "All") return posts;
  return posts.filter((p) => p.category === category);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllCategories(): string[] {
  return ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
}
