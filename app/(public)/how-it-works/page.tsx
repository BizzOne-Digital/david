import type { Metadata } from "next";
import { HowItWorksPageContent } from "@/components/how-it-works/HowItWorksPageContent";

export const metadata: Metadata = {
  title: "How It Works | Rethink Automotive Inc.",
  description:
    "Watch how Rethink moves a missed lead from first contact to qualified opportunity—with AI engagement, appointments and management visibility.",
};

export default function HowItWorksPage() {
  return <HowItWorksPageContent />;
}
