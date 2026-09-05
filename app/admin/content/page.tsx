import { getAllPageContentsAdminAction } from "@/actions/content";
import { ContentPageClient } from "@/components/admin/ContentPageClient";

export default async function ContentPage() {
  const result = await getAllPageContentsAdminAction();
  const pages = result.success ? (result.data ?? []) : [];
  return (
    <ContentPageClient pages={pages as Parameters<typeof ContentPageClient>[0]["pages"]} />
  );
}
