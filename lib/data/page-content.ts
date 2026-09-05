import { unstable_cache } from "next/cache";
import connectDB from "@/lib/db/connect";
import PageContent from "@/models/PageContent";
import type { PageSection } from "@/types";

export type PublicPageContent = {
  pageSlug: string;
  pageTitle: string;
  seoTitle?: string;
  seoDescription?: string;
  sections: PageSection[];
  faqs?: { question: string; answer: string; order: number }[];
};

async function fetchPageContent(
  pageSlug: string
): Promise<PublicPageContent | null> {
  await connectDB();
  const doc = await PageContent.findOne({ pageSlug }).lean();
  if (!doc) return null;
  return JSON.parse(JSON.stringify(doc)) as PublicPageContent;
}

export function getPageContent(pageSlug: string) {
  return unstable_cache(
    () => fetchPageContent(pageSlug),
    [`page-content-${pageSlug}`],
    { revalidate: 60, tags: [`page-content-${pageSlug}`] }
  )();
}
