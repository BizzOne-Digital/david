import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/admin/ProductForm";
import { getCategoriesAdminAction } from "@/actions/categories";

export default async function NewProductPage() {
  const categoriesResult = await getCategoriesAdminAction();
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
          <h2 className="text-xl font-semibold text-white">New Product</h2>
          <p className="text-sm text-silver">Create a new product listing</p>
        </div>
      </div>
      <ProductForm categories={categories as Parameters<typeof ProductForm>[0]["categories"]} />
    </div>
  );
}
