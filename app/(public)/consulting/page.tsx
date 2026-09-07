import type { Metadata } from "next";
import { ConsultingPageContent } from "@/components/consulting/ConsultingPageContent";

export const metadata: Metadata = {
  title: "Consulting | Rethink Automotive Inc.",
  description:
    "More than marketing. More than AI. Consultative dealer growth advisory from Rethink Automotive.",
};

export default function ConsultingPage() {
  return <ConsultingPageContent />;
}
