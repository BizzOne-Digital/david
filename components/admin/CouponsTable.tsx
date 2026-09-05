"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";

interface Coupon {
  _id: string;
  code: string;
  title?: string;
  discountType: string;
  discountValue: number;
  usageCount: number;
  isActive: boolean;
  isPublic: boolean;
  expiryDate?: string;
}

export function CouponsTable({ coupons }: { coupons: Coupon[] }) {
  const router = useRouter();

  const columns = [
    {
      key: "code",
      header: "Code",
      cell: (row: Coupon) => (
        <span className="font-mono font-medium">{row.code}</span>
      ),
      sortable: true,
    },
    {
      key: "title",
      header: "Title",
      cell: (row: Coupon) => row.title ?? "—",
    },
    {
      key: "discountValue",
      header: "Discount",
      cell: (row: Coupon) =>
        row.discountType === "percentage"
          ? `${row.discountValue}%`
          : `$${(row.discountValue / 100).toFixed(2)}`,
    },
    {
      key: "usageCount",
      header: "Uses",
      cell: (row: Coupon) => row.usageCount,
    },
    {
      key: "isActive",
      header: "Status",
      cell: (row: Coupon) => (
        <StatusBadge status={row.isActive ? "active" : "inactive"} />
      ),
    },
    {
      key: "isPublic",
      header: "Visibility",
      cell: (row: Coupon) => (
        <StatusBadge status={row.isPublic ? "public" : "private"} />
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Coupons</h2>
          <p className="text-sm text-silver">{coupons.length} coupons</p>
        </div>
        <Link href="/admin/coupons/new">
          <Button>
            <Plus className="h-4 w-4" />
            Add Coupon
          </Button>
        </Link>
      </div>
      <DataTable
        data={coupons}
        columns={columns}
        searchKeys={["code", "title"]}
        onRowClick={(row) => router.push(`/admin/coupons/${row._id}`)}
      />
    </div>
  );
}
