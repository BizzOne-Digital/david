import type { PublicPageContent } from "@/lib/data/page-content";
import type { PageSection } from "@/types";

export function getSection(
  content: PublicPageContent | null | undefined,
  id: string
): PageSection | undefined {
  if (!content) return undefined;
  const section = content.sections.find((s) => s.id === id);
  if (!section?.isVisible) return undefined;
  return section;
}

export const PAGE_PATHS: Record<string, string> = {
  home: "/",
  about: "/about",
  services: "/services",
  consulting: "/consulting",
  "future-fuel": "/future-fuel",
  insights: "/insights",
  products: "/products",
  contact: "/contact",
  "book-appointment": "/book-appointment",
};
