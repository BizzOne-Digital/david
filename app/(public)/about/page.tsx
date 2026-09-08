import type { Metadata } from "next";
import { AboutPageContent } from "@/components/about/AboutPageContent";
import { aboutCopy } from "@/lib/content/revisions";

export const metadata: Metadata = {
  title: "About Us | Rethink Automotive Inc.",
  description: aboutCopy.paragraphs[0],
};

export default function AboutPage() {
  return <AboutPageContent />;
}
