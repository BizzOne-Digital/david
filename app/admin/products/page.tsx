import { getProductsAdminAction } from "@/actions/products";
import { ProductsTable } from "@/components/admin/ProductsTable";

export default async function ProductsPage() {
  const result = await getProductsAdminAction();
  const products = result.success ? (result.data ?? []) : [];
  return <ProductsTable products={products as Parameters<typeof ProductsTable>[0]["products"]} />;
}
