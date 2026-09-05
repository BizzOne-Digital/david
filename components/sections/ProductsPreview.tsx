"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/components/ui/button";
import { placeholderProducts } from "@/lib/content/placeholders";
import { ProductCard } from "@/components/products/ProductCard";

const MarketingFunnel = dynamic(
  () => import("@/components/animations/MarketingFunnel").then((m) => m.MarketingFunnel),
  { ssr: false, loading: () => <div className="h-64 animate-pulse rounded-2xl bg-white/5" /> }
);

export function ProductsPreview() {
  const products = placeholderProducts.slice(0, 3);

  return (
    <>
      <MarketingFunnel className="py-24" />
      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <TextReveal
                as="h2"
                text="Product Catalog"
                className="text-3xl font-bold md:text-4xl"
              />
              <ScrollReveal delay={0.1}>
                <p className="mt-3 max-w-xl text-silver">
                  Explore solutions you can configure for your dealership group.
                </p>
              </ScrollReveal>
            </div>
            <Button asChild>
              <Link href="/products">Shop Products</Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
