import type { TeamMember } from "@/types/team";

const teamMembers: TeamMember[] = [
  {
    slug: "gareth-walker",
    name: "Gareth Walker",
    title: "Co-Founder",
    description:
      "The strategist. Turns packaging complexity into commercial clarity.",
    imageSrc: "/images/team/GazProfileCard.png",
    linkedinUrl: "https://linkedin.com",
  },
  {
    slug: "luke-howitt",
    name: "Luke Howitt",
    title: "Co-Founder",
    description:
      "The relationship. Wins new brands with warmth, keeps them with results.",
    imageSrc: "/images/team/LukeProfileCard.png",
    linkedinUrl: "https://linkedin.com",
  },
  {
    slug: "alex-whomsley",
    name: "Alex Whomsley",
    title: "Co-Founder",
    description:
      "The sourcerer. A solution for every scenario.",
    imageSrc: "/images/team/alex-whomsley.png",
    linkedinUrl: "https://linkedin.com",
  },
  {
    slug: "marcos-benito-moreno",
    name: "Marcos Benito Moreno",
    title: "Co-Founder",
    description:
      "The executor. Owns the client journey from brief to delivery.",
    imageSrc: "/images/team/MarcosProfileCard.png",
    linkedinUrl: "https://linkedin.com",
  },
  {
    slug: "lucy-small",
    name: "Lucy Small",
    title: "Junior Account Manager",
    description:
      "The momentum. Keeps every project moving, every detail tracked.",
    imageSrc: "/images/team/lucy-small.png",
    linkedinUrl: "https://linkedin.com",
  },
];

/** Replace with Sanity fetch when CMS is connected */
export function getTeamMembers(): TeamMember[] {
  return teamMembers;
}

export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return teamMembers.find((m) => m.slug === slug);
}
