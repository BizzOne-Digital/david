import type { Metadata } from "next";
import { ServicesPageContent } from "@/components/services/ServicesPageContent";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Smarter marketing systems for modern dealers — email, AI engagement, strategy, and integration support.",
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
