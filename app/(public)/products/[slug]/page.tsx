import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailPageContent } from "@/components/products/ProductDetailPageContent";
import { featuredProductsPage, getAllSolutionSlugs, getSolutionBySlug } from "@/lib/content/products-page";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSolutionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getSolutionBySlug(slug);
  if (!product) return { title: "Solution Not Found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getSolutionBySlug(slug);
  if (!product) notFound();

  const related = featuredProductsPage
    .filter((item) => item.slug !== slug)
    .map((item) => getSolutionBySlug(item.slug))
    .filter((item): item is NonNullable<typeof item> => item != null)
    .slice(0, 2);

  return <ProductDetailPageContent product={product} related={related} />;
}
