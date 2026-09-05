"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatMoney } from "@/lib/utils/money";

interface Product {
  _id: string;
  name: string;
  slug: string;
  priceCents?: number;
  isActive: boolean;
  onSale: boolean;
  category?: { name: string };
  displayOrder: number;
}

export function ProductsTable({ products }: { products: Product[] }) {
  const router = useRouter();

  const columns = [
    {
      key: "name",
      header: "Name",
      cell: (row: Product) => (
        <div>
          <p className="font-medium">{row.name}</p>
          <p className="text-xs text-silver">{row.slug}</p>
        </div>
      ),
      sortable: true,
    },
    {
      key: "category",
      header: "Category",
      cell: (row: Product) => row.category?.name ?? "—",
    },
    {
      key: "priceCents",
      header: "Price",
      cell: (row: Product) =>
        row.priceCents != null ? formatMoney(row.priceCents) : "—",
    },
    {
      key: "isActive",
      header: "Status",
      cell: (row: Product) => (
        <StatusBadge status={row.isActive ? "active" : "inactive"} />
      ),
    },
    {
      key: "onSale",
      header: "Sale",
      cell: (row: Product) =>
        row.onSale ? (
          <StatusBadge status="active" className="bg-amber-500/20 text-amber-400" />
        ) : (
          "—"
        ),
    },
    {
      key: "displayOrder",
      header: "Order",
      cell: (row: Product) => row.displayOrder,
      sortable: true,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Products</h2>
          <p className="text-sm text-silver">{products.length} total products</p>
        </div>
        <Link href="/admin/products/new">
          <Button>
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      <DataTable
        data={products}
        columns={columns}
        searchKeys={["name", "slug"]}
        onRowClick={(row) => router.push(`/admin/products/${row._id}`)}
      />
    </div>
  );
}
