"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";

interface Service {
  _id: string;
  title: string;
  slug: string;
  icon: string;
  isActive: boolean;
  isFeatured: boolean;
  displayOrder: number;
}

export function ServicesTable({ services }: { services: Service[] }) {
  const router = useRouter();

  const columns = [
    {
      key: "title",
      header: "Title",
      cell: (row: Service) => (
        <div>
          <p className="font-medium">{row.title}</p>
          <p className="text-xs text-silver">{row.slug}</p>
        </div>
      ),
      sortable: true,
    },
    { key: "icon", header: "Icon", cell: (row: Service) => row.icon },
    {
      key: "isActive",
      header: "Status",
      cell: (row: Service) => (
        <StatusBadge status={row.isActive ? "active" : "inactive"} />
      ),
    },
    {
      key: "isFeatured",
      header: "Featured",
      cell: (row: Service) => (row.isFeatured ? "Yes" : "—"),
    },
    {
      key: "displayOrder",
      header: "Order",
      cell: (row: Service) => row.displayOrder,
      sortable: true,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Services</h2>
          <p className="text-sm text-silver">{services.length} services</p>
        </div>
        <Link href="/admin/services/new">
          <Button>
            <Plus className="h-4 w-4" />
            Add Service
          </Button>
        </Link>
      </div>
      <DataTable
        data={services}
        columns={columns}
        searchKeys={["title", "slug"]}
        onRowClick={(row) => router.push(`/admin/services/${row._id}`)}
      />
    </div>
  );
}
