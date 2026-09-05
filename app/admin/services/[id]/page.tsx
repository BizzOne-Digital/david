import { notFound } from "next/navigation";
import { getServiceByIdAction } from "@/actions/services";
import { ServiceForm } from "@/components/admin/ServiceForm";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getServiceByIdAction(id);
  if (!result.success || !result.data) notFound();
  return (
    <ServiceForm service={result.data as Parameters<typeof ServiceForm>[0]["service"]} />
  );
}
