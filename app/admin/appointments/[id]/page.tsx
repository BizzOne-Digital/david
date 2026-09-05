import { notFound } from "next/navigation";
import { getAppointmentByIdAction } from "@/actions/appointments";
import { AppointmentDetail } from "@/components/admin/AppointmentDetail";

export default async function AppointmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getAppointmentByIdAction(id);
  if (!result.success || !result.data) notFound();
  return (
    <AppointmentDetail
      appointment={result.data as Parameters<typeof AppointmentDetail>[0]["appointment"]}
    />
  );
}
