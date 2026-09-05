import { getAppointmentsAdminAction } from "@/actions/appointments";
import { AppointmentsTable } from "@/components/admin/AppointmentsTable";

export default async function AppointmentsPage() {
  const result = await getAppointmentsAdminAction();
  const appointments = result.success ? (result.data ?? []) : [];
  return (
    <AppointmentsTable
      appointments={appointments as Parameters<typeof AppointmentsTable>[0]["appointments"]}
    />
  );
}
