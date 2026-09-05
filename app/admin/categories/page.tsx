import { getCategoriesAdminAction } from "@/actions/categories";
import { CategoriesManager } from "@/components/admin/CategoriesManager";

export default async function CategoriesPage() {
  const result = await getCategoriesAdminAction();
  const categories = result.success ? (result.data ?? []) : [];
  return <CategoriesManager categories={categories as Parameters<typeof CategoriesManager>[0]["categories"]} />;
}
