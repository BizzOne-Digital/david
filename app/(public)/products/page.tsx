import type { Metadata } from "next";
import { ProductsPageContent } from "@/components/products/ProductsPageContent";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore Rethink Automotive marketing solutions — AI-powered and email-driven systems for modern dealerships.",
};

export default function ProductsPage() {
  return <ProductsPageContent />;
}
