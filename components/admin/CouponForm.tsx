"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createCouponAction, updateCouponAction } from "@/actions/coupons";
import type { CouponDisplayLocation } from "@/types";

const displayLocationOptions: { value: CouponDisplayLocation; label: string }[] = [
  { value: "announcement_bar", label: "Announcement Bar" },
  { value: "homepage_banner", label: "Homepage Banner" },
  { value: "product_cards", label: "Product Cards" },
  { value: "product_details", label: "Product Details" },
  { value: "cart", label: "Cart" },
  { value: "checkout", label: "Checkout" },
];

interface CouponData {
  _id?: string;
  code?: string;
  title?: string;
  description?: string;
  discountType?: string;
  discountValue?: number;
  minimumOrderCents?: number;
  totalUsageLimit?: number;
  usageLimitPerCustomer?: number;
  startDate?: string;
  expiryDate?: string;
  isActive?: boolean;
  isPublic?: boolean;
  displayLocations?: CouponDisplayLocation[];
}

export function CouponForm({ coupon }: { coupon?: CouponData }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isEditing = !!coupon?._id;

  const handleSubmit = (formData: FormData) => {
    const displayLocations = formData
      .getAll("displayLocations")
      .map(String);

    const data = {
      code: String(formData.get("code") ?? "").trim().toUpperCase(),
      title: String(formData.get("title") ?? "") || undefined,
      description: String(formData.get("description") ?? "") || undefined,
      discountType: String(formData.get("discountType") ?? "percentage"),
      discountValue: parseFloat(String(formData.get("discountValue") ?? "0")) || 0,
      minimumOrderCents: parseOptionalInt(formData.get("minimumOrderCents")),
      totalUsageLimit: parseOptionalInt(formData.get("totalUsageLimit")),
      usageLimitPerCustomer: parseOptionalInt(formData.get("usageLimitPerCustomer")),
      startDate: parseOptionalDate(formData.get("startDate")),
      expiryDate: parseOptionalDate(formData.get("expiryDate")),
      isActive: formData.get("isActive") === "on",
      isPublic: formData.get("isPublic") === "on",
      displayLocations,
    };

    startTransition(async () => {
      const result = isEditing
        ? await updateCouponAction(coupon!._id!, data)
        : await createCouponAction(data);

      if (result.success) {
        toast.success(isEditing ? "Coupon updated" : "Coupon created");
        const id = isEditing ? coupon!._id! : result.data?.id;
        router.push(`/admin/coupons/${id}`);
        router.refresh();
      } else {
        toast.error(result.error ?? "Something went wrong");
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/coupons">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-semibold text-white">
            {isEditing ? "Edit Coupon" : "New Coupon"}
          </h2>
        </div>
      </div>

      <form action={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Coupon Details</CardTitle></CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="code">Code {isEditing ? "*" : "(auto-generated if empty)"}</Label>
              <Input
                id="code"
                name="code"
                defaultValue={coupon?.code}
                placeholder="SAVE20"
                required={isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={coupon?.title} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" defaultValue={coupon?.description} rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="discountType">Discount Type</Label>
              <Select id="discountType" name="discountType" defaultValue={coupon?.discountType ?? "percentage"}>
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount (cents)</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="discountValue">Discount Value</Label>
              <Input
                id="discountValue"
                name="discountValue"
                type="number"
                min={0}
                defaultValue={coupon?.discountValue ?? 0}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minimumOrderCents">Minimum Order (cents)</Label>
              <Input
                id="minimumOrderCents"
                name="minimumOrderCents"
                type="number"
                min={0}
                defaultValue={coupon?.minimumOrderCents ?? ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalUsageLimit">Total Usage Limit</Label>
              <Input
                id="totalUsageLimit"
                name="totalUsageLimit"
                type="number"
                min={1}
                defaultValue={coupon?.totalUsageLimit ?? ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="usageLimitPerCustomer">Per Customer Limit</Label>
              <Input
                id="usageLimitPerCustomer"
                name="usageLimitPerCustomer"
                type="number"
                min={1}
                defaultValue={coupon?.usageLimitPerCustomer ?? ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="datetime-local"
                defaultValue={formatDateInput(coupon?.startDate)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                type="datetime-local"
                defaultValue={formatDateInput(coupon?.expiryDate)}
              />
            </div>
            <ToggleField name="isActive" label="Active" defaultChecked={coupon?.isActive ?? true} />
            <ToggleField name="isPublic" label="Public" defaultChecked={coupon?.isPublic ?? false} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Display Locations</CardTitle></CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {displayLocationOptions.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="displayLocations"
                  value={opt.value}
                  defaultChecked={coupon?.displayLocations?.includes(opt.value)}
                  className="rounded border-white/20 bg-gunmetal"
                />
                {opt.label}
              </label>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Link href="/admin/coupons">
            <Button type="button" variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : isEditing ? "Update Coupon" : "Create Coupon"}
          </Button>
        </div>
      </form>
    </div>
  );
}

function ToggleField({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <input type="hidden" name={name} value="off" />
      <Switch
        id={name}
        defaultChecked={defaultChecked}
        onCheckedChange={(checked) => {
          const input = document.querySelector<HTMLInputElement>(`input[name="${name}"]`);
          if (input) input.value = checked ? "on" : "off";
        }}
      />
      <Label htmlFor={name}>{label}</Label>
    </div>
  );
}

function formatDateInput(date?: string): string {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 16);
}

function parseOptionalInt(value: FormDataEntryValue | null): number | undefined {
  const n = parseInt(String(value ?? ""), 10);
  return isNaN(n) ? undefined : n;
}

function parseOptionalDate(value: FormDataEntryValue | null): Date | undefined {
  const str = String(value ?? "");
  return str ? new Date(str) : undefined;
}
