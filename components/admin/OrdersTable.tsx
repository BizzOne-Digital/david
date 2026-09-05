"use client";

import { useRouter } from "next/navigation";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatMoney } from "@/lib/utils/money";
import { formatDateTime } from "@/lib/utils";

interface Order {
  _id: string;
  orderNumber: string;
  customerName: string;
  dealership: string;
  email: string;
  totalCents: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

export function OrdersTable({ orders }: { orders: Order[] }) {
  const router = useRouter();

  const columns = [
    {
      key: "orderNumber",
      header: "Order #",
      cell: (row: Order) => (
        <span className="font-mono text-sm">{row.orderNumber}</span>
      ),
      sortable: true,
    },
    {
      key: "customerName",
      header: "Customer",
      cell: (row: Order) => (
        <div>
          <p className="font-medium">{row.customerName}</p>
          <p className="text-xs text-silver">{row.dealership}</p>
        </div>
      ),
      sortable: true,
    },
    {
      key: "totalCents",
      header: "Total",
      cell: (row: Order) => formatMoney(row.totalCents),
    },
    {
      key: "status",
      header: "Status",
      cell: (row: Order) => <StatusBadge status={row.status as "new"} />,
    },
    {
      key: "paymentStatus",
      header: "Payment",
      cell: (row: Order) => (
        <StatusBadge status={row.paymentStatus as "paid"} />
      ),
    },
    {
      key: "createdAt",
      header: "Date",
      cell: (row: Order) => formatDateTime(row.createdAt),
      sortable: true,
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-white">Orders</h2>
        <p className="text-sm text-silver">{orders.length} total orders</p>
      </div>
      <DataTable
        data={orders}
        columns={columns}
        searchKeys={["orderNumber", "customerName", "email"]}
        onRowClick={(row) => router.push(`/admin/orders/${row._id}`)}
      />
    </div>
  );
}
