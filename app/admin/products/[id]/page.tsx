import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/admin/ProductForm";
import { getProductByIdAction } from "@/actions/products";
import { getCategoriesAdminAction } from "@/actions/categories";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [productResult, categoriesResult] = await Promise.all([
    getProductByIdAction(id),
    getCategoriesAdminAction(),
  ]);

  if (!productResult.success || !productResult.data) notFound();

  const categories = categoriesResult.success ? (categoriesResult.data ?? []) : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-semibold text-white">Edit Product</h2>
          <p className="text-sm text-silver">
            {(productResult.data as { name: string }).name}
          </p>
        </div>
      </div>
      <ProductForm
        product={productResult.data as Parameters<typeof ProductForm>[0]["product"]}
        categories={categories as Parameters<typeof ProductForm>[0]["categories"]}
      />
    </div>
  );
}
