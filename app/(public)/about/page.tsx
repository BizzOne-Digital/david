import type { Metadata } from "next";
import { AboutPageContent } from "@/components/about/AboutPageContent";
import { getPageContent } from "@/lib/data/page-content";
import { getSection } from "@/lib/utils/page-content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent("about");
  return {
    title: content?.seoTitle ?? "About Us",
    description:
      content?.seoDescription ??
      "Learn about Rethink Automotive — smarter digital, email, and AI-driven marketing for modern dealerships.",
  };
}

export default async function AboutPage() {
  const content = await getPageContent("about");

  return (
    <AboutPageContent
      storySection={getSection(content, "story")}
      missionSection={getSection(content, "mission")}
      visionSection={getSection(content, "vision")}
      valuesSection={getSection(content, "values")}
    />
  );
}
