import { getServicesAdminAction } from "@/actions/services";
import { ServicesTable } from "@/components/admin/ServicesTable";

export default async function ServicesPage() {
  const result = await getServicesAdminAction();
  const services = result.success ? (result.data ?? []) : [];
  return <ServicesTable services={services as Parameters<typeof ServicesTable>[0]["services"]} />;
}
