"use client";

import { useRouter } from "next/navigation";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatDateTime } from "@/lib/utils";

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  inquiryType: string;
  dealership?: string;
  status: string;
  createdAt: string;
}

export function InquiriesTable({ inquiries }: { inquiries: Inquiry[] }) {
  const router = useRouter();

  const columns = [
    {
      key: "name",
      header: "Contact",
      cell: (row: Inquiry) => (
        <div>
          <p className="font-medium">{row.name}</p>
          <p className="text-xs text-silver">{row.email}</p>
        </div>
      ),
      sortable: true,
    },
    {
      key: "inquiryType",
      header: "Type",
      cell: (row: Inquiry) => row.inquiryType,
      sortable: true,
    },
    {
      key: "dealership",
      header: "Dealership",
      cell: (row: Inquiry) => row.dealership ?? "—",
    },
    {
      key: "status",
      header: "Status",
      cell: (row: Inquiry) => <StatusBadge status={row.status as "new"} />,
    },
    {
      key: "createdAt",
      header: "Date",
      cell: (row: Inquiry) => formatDateTime(row.createdAt),
      sortable: true,
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-white">Inquiries</h2>
        <p className="text-sm text-silver">{inquiries.length} inquiries</p>
      </div>
      <DataTable
        data={inquiries}
        columns={columns}
        searchKeys={["name", "email", "inquiryType"]}
        onRowClick={(row) => router.push(`/admin/inquiries/${row._id}`)}
      />
    </div>
  );
}
