"use client";

import { useRouter } from "next/navigation";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatDateTime } from "@/lib/utils";

interface Appointment {
  _id: string;
  name: string;
  dealershipName: string;
  workEmail: string;
  preferredDate: string;
  preferredTime: string;
  status: string;
  createdAt: string;
}

export function AppointmentsTable({ appointments }: { appointments: Appointment[] }) {
  const router = useRouter();

  const columns = [
    {
      key: "name",
      header: "Contact",
      cell: (row: Appointment) => (
        <div>
          <p className="font-medium">{row.name}</p>
          <p className="text-xs text-silver">{row.workEmail}</p>
        </div>
      ),
      sortable: true,
    },
    {
      key: "dealershipName",
      header: "Dealership",
      cell: (row: Appointment) => row.dealershipName,
      sortable: true,
    },
    {
      key: "preferredDate",
      header: "Preferred Date",
      cell: (row: Appointment) =>
        `${formatDateTime(row.preferredDate)} ${row.preferredTime}`,
    },
    {
      key: "status",
      header: "Status",
      cell: (row: Appointment) => (
        <StatusBadge status={row.status as "pending"} />
      ),
    },
    {
      key: "createdAt",
      header: "Submitted",
      cell: (row: Appointment) => formatDateTime(row.createdAt),
      sortable: true,
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-white">Appointments</h2>
        <p className="text-sm text-silver">{appointments.length} appointments</p>
      </div>
      <DataTable
        data={appointments}
        columns={columns}
        searchKeys={["name", "dealershipName", "workEmail"]}
        onRowClick={(row) => router.push(`/admin/appointments/${row._id}`)}
      />
    </div>
  );
}
