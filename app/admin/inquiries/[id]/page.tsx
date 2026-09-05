import { notFound } from "next/navigation";
import { getInquiryByIdAction } from "@/actions/inquiries";
import { InquiryDetail } from "@/components/admin/InquiryDetail";

export default async function InquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getInquiryByIdAction(id);
  if (!result.success || !result.data) notFound();
  return (
    <InquiryDetail inquiry={result.data as Parameters<typeof InquiryDetail>[0]["inquiry"]} />
  );
}
