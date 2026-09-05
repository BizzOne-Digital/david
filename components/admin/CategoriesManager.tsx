"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createCategoryAction, deleteCategoryAction } from "@/actions/categories";
import { Plus } from "lucide-react";

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  displayOrder: number;
  isActive: boolean;
}

export function CategoriesManager({ categories }: { categories: Category[] }) {
  const [isPending, startTransition] = useTransition();

  const columns = [
    {
      key: "name",
      header: "Name",
      cell: (row: Category) => (
        <div>
          <p className="font-medium">{row.name}</p>
          <p className="text-xs text-silver">{row.slug}</p>
        </div>
      ),
      sortable: true,
    },
    {
      key: "displayOrder",
      header: "Order",
      cell: (row: Category) => row.displayOrder,
      sortable: true,
    },
    {
      key: "isActive",
      header: "Status",
      cell: (row: Category) => (
        <StatusBadge status={row.isActive ? "active" : "inactive"} />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      cell: (row: Category) => (
        <Button
          variant="ghost"
          size="sm"
          className="text-red-400"
          onClick={(e) => {
            e.stopPropagation();
            startTransition(async () => {
              const result = await deleteCategoryAction(row._id);
              if (result.success) toast.success("Category deleted");
              else toast.error(result.error);
            });
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  const handleCreate = (formData: FormData) => {
    const data = {
      name: String(formData.get("name") ?? "").trim(),
      slug: String(formData.get("slug") ?? "").trim() || undefined,
      description: String(formData.get("description") ?? "") || undefined,
      displayOrder: parseInt(String(formData.get("displayOrder") ?? "0"), 10) || 0,
      isActive: true,
    };
    startTransition(async () => {
      const result = await createCategoryAction(data);
      if (result.success) toast.success("Category created");
      else toast.error(result.error);
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Categories</h2>
          <p className="text-sm text-silver">{categories.length} categories</p>
        </div>
        <Dialog>
          <DialogTrigger>
            <Button>
              <Plus className="h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Category</DialogTitle>
            </DialogHeader>
            <form action={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" name="slug" placeholder="auto-generated" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" rows={3} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="displayOrder">Display Order</Label>
                <Input id="displayOrder" name="displayOrder" type="number" defaultValue={0} />
              </div>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating..." : "Create Category"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        data={categories}
        columns={columns}
        searchKeys={["name", "slug"]}
      />
    </div>
  );
}
