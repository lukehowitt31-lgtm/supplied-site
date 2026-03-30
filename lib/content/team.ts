import "server-only";

import { sanityFetch } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import { teamMembersQuery } from "@/lib/sanity/queries";
import type { TeamMember } from "@/types/team";

export const legacyTeamMembers: TeamMember[] = [
  {
    slug: "gareth-walker",
    name: "Gareth Walker",
    title: "Co-Founder",
    description: "The strategist. Turns packaging complexity into commercial clarity.",
    imageSrc: "/images/team/GarethProfileCard.png",
    linkedinUrl: "https://linkedin.com",
  },
  {
    slug: "luke-howitt",
    name: "Luke Howitt",
    title: "Co-Founder",
    description: "The relationship. Wins new brands with warmth, keeps them with results.",
    imageSrc: "/images/team/LukeProfileCard.png",
    linkedinUrl: "https://linkedin.com",
  },
  {
    slug: "alex-whomsley",
    name: "Alex Whomsley",
    title: "Co-Founder",
    description: "The sourcerer. A solution for every scenario.",
    imageSrc: "/images/team/alex-whomsley.png",
    linkedinUrl: "https://linkedin.com",
  },
  {
    slug: "marcos-benito-moreno",
    name: "Marcos Benito Moreno",
    title: "Co-Founder",
    description: "The executor. Owns the client journey from brief to delivery.",
    imageSrc: "/images/team/MarcosProfileCard.png",
    linkedinUrl: "https://linkedin.com",
  },
  {
    slug: "lucy-small",
    name: "Lucy Small",
    title: "Junior Account Manager",
    description: "The momentum. Keeps every project moving, every detail tracked.",
    imageSrc: "/images/team/lucy-small.png",
    linkedinUrl: "https://linkedin.com",
  },
];

interface SanitySlugField {
  current?: string | null;
}

interface SanityImageAssetField {
  _ref?: string | null;
}

interface SanityImageField {
  asset?: SanityImageAssetField | null;
}

interface SanityTeamMemberDoc {
  slug?: SanitySlugField | null;
  name?: string | null;
  title?: string | null;
  description?: string | null;
  image?: SanityImageField | null;
  linkedinUrl?: string | null;
}

function readString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmedValue = value.trim();
  return trimmedValue.length > 0 ? trimmedValue : undefined;
}

function imageUrlFromField(image: SanityImageField | null | undefined): string | undefined {
  const assetRef = readString(image?.asset?._ref);
  if (!assetRef) {
    return undefined;
  }

  try {
    return urlFor({
      _type: "image",
      asset: {
        _type: "reference",
        _ref: assetRef,
      },
    })
      .auto("format")
      .url();
  } catch {
    return undefined;
  }
}

function mapSanityTeamMember(doc: SanityTeamMemberDoc): TeamMember | null {
  const slug = readString(doc.slug?.current);
  if (!slug) {
    return null;
  }

  const fallbackMember = legacyTeamMembers.find((member) => member.slug === slug);

  const name = readString(doc.name) ?? fallbackMember?.name;
  const title = readString(doc.title) ?? fallbackMember?.title;
  const description = readString(doc.description) ?? fallbackMember?.description;
  const imageSrc = imageUrlFromField(doc.image) ?? fallbackMember?.imageSrc;
  const linkedinUrl = readString(doc.linkedinUrl) ?? fallbackMember?.linkedinUrl;

  if (!name || !title || !description || !imageSrc || !linkedinUrl) {
    return null;
  }

  return {
    slug,
    name,
    title,
    description,
    imageSrc,
    linkedinUrl,
  };
}

async function fetchTeamMembersFromSanity(): Promise<TeamMember[]> {
  const docs = await sanityFetch<SanityTeamMemberDoc[]>({
    query: teamMembersQuery,
    tags: ["team"],
  });

  return docs
    .map((doc) => mapSanityTeamMember(doc))
    .filter((member): member is TeamMember => Boolean(member));
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const members = await fetchTeamMembersFromSanity();
    if (members.length > 0) {
      return members;
    }
  } catch {
    // Fall back to static team content when Sanity is empty or unavailable.
  }

  return legacyTeamMembers;
}

export async function getTeamMemberBySlug(
  slug: string
): Promise<TeamMember | undefined> {
  const normalizedSlug = slug.trim();
  if (!normalizedSlug) {
    return undefined;
  }

  const members = await getTeamMembers();
  return members.find((member) => member.slug === normalizedSlug);
}
