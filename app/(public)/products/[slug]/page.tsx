import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductPricing } from "@/components/products/ProductPricing";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { placeholderProducts } from "@/lib/content/placeholders";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return placeholderProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = placeholderProducts.find((p) => p.slug === slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = placeholderProducts.find((p) => p.slug === slug);
  if (!product) notFound();

  return (
    <section className="container mx-auto px-4 page-hero-section">
      <div className="grid gap-12 lg:grid-cols-2">
        <ProductGallery productName={product.name} />
        <div>
          <span className="text-sm uppercase tracking-wider text-cyan">{product.category}</span>
          <h1 className="mt-2 font-heading text-4xl font-bold">{product.name}</h1>
          <p className="mt-4 text-silver">{product.shortDescription}</p>
          <ScrollReveal delay={0.1}>
            <ProductPricing
              name={product.name}
              slug={product.slug}
              productId={product.id}
              priceCents={product.priceCents}
              showPricing={product.showPricing}
              contactForPricing={product.contactForPricing}
              purchaseMode={product.purchaseMode}
              ctaLabel={product.ctaLabel}
            />
          </ScrollReveal>
        </div>
      </div>

      <ScrollReveal delay={0.15}>
        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-semibold">Overview</h2>
            <p className="mt-4 text-silver">{product.fullDescription}</p>
          </div>
          <div>
            <h2 className="font-heading text-2xl font-semibold">Features</h2>
            <ul className="mt-4 space-y-2">
              {product.features.map((feature) => (
                <li key={feature} className="flex gap-2 text-silver">
                  <span className="text-cyan">•</span>
                  {feature}
                </li>
              ))}
            </ul>
            <h2 className="mt-8 font-heading text-2xl font-semibold">Benefits</h2>
            <ul className="mt-4 space-y-2">
              {product.benefits.map((benefit) => (
                <li key={benefit} className="flex gap-2 text-silver">
                  <span className="text-violet">•</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ScrollReveal>

      <RelatedProducts products={placeholderProducts} currentSlug={product.slug} />
    </section>
  );
}
