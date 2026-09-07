import type { Metadata } from "next";
import { ProductsPageContent } from "@/components/products/ProductsPageContent";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Targeted email marketing, AI chaser follow-up, and service-to-sales solutions for modern dealerships.",
};

export default function ProductsPage() {
  return <ProductsPageContent />;
}
