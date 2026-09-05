import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact/ContactPageContent";
import { getPageContent } from "@/lib/data/page-content";
import { getSection } from "@/lib/utils/page-content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent("contact");
  return {
    title: content?.seoTitle ?? "Contact",
    description:
      content?.seoDescription ??
      "Connect with Rethink Automotive. Book a strategy call and tell us about your dealership goals.",
  };
}

export default async function ContactPage() {
  const content = await getPageContent("contact");

  return (
    <ContactPageContent
      introSection={getSection(content, "intro")}
      faqs={content?.faqs}
    />
  );
}
