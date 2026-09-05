import { getInquiriesAdminAction } from "@/actions/inquiries";
import { InquiriesTable } from "@/components/admin/InquiriesTable";

export default async function InquiriesPage() {
  const result = await getInquiriesAdminAction();
  const inquiries = result.success ? (result.data ?? []) : [];
  return (
    <InquiriesTable inquiries={inquiries as Parameters<typeof InquiriesTable>[0]["inquiries"]} />
  );
}
