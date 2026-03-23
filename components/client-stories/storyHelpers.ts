import type {
  ClientStoryDetail,
  ClientStorySection,
  ClientStorySectionItem,
} from "@/types/clientStory";

export function getSection(
  story: ClientStoryDetail | undefined,
  sectionId: string
): ClientStorySection | undefined {
  return story?.sections?.find((s) => s.sectionId === sectionId);
}

export function getSectionItems(
  story: ClientStoryDetail | undefined,
  sectionId: string
): ClientStorySectionItem[] | undefined {
  const section = getSection(story, sectionId);
  return section?.items && section.items.length > 0 ? section.items : undefined;
}

export function splitParagraphs(body: string | undefined): string[] {
  if (!body) return [];
  return body.split(/\n+/).map((p) => p.trim()).filter(Boolean);
}
