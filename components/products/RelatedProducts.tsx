import { ProductCard, type ProductCardData } from "./ProductCard";

interface RelatedProductsProps {
  products: ProductCardData[];
  currentSlug: string;
  title?: string;
}

export function RelatedProducts({
  products,
  currentSlug,
  title = "Related Products",
}: RelatedProductsProps) {
  const related = products.filter((p) => p.slug !== currentSlug).slice(0, 3);
  if (related.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="mb-8 font-heading text-2xl font-bold">{title}</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
