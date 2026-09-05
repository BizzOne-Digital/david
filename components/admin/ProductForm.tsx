"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createProductAction, updateProductAction } from "@/actions/products";
import type { PurchaseMode } from "@/types";

interface Category {
  _id: string;
  name: string;
}

interface ProductData {
  _id?: string;
  name?: string;
  slug?: string;
  shortDescription?: string;
  fullDescription?: string;
  priceCents?: number;
  compareAtPriceCents?: number;
  showPricing?: boolean;
  contactForPricing?: boolean;
  purchaseMode?: PurchaseMode;
  externalCheckoutUrl?: string;
  category?: { _id: string } | string;
  sku?: string;
  inventory?: number;
  isFeatured?: boolean;
  isActive?: boolean;
  displayOrder?: number;
  onSale?: boolean;
  saleDiscountType?: string;
  saleDiscountValue?: number;
  saleStartDate?: string;
  saleEndDate?: string;
  saleBadge?: string;
  saleMessage?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  isPlaceholder?: boolean;
  features?: string[];
  benefits?: string[];
}

interface ProductFormProps {
  product?: ProductData;
  categories?: Category[];
}

export function ProductForm({ product, categories = [] }: ProductFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isEditing = !!product?._id;

  const categoryId =
    typeof product?.category === "object"
      ? product.category?._id
      : product?.category ?? "";

  const handleSubmit = (formData: FormData) => {
    const data = parseProductFormData(formData);
    startTransition(async () => {
      const result = isEditing
        ? await updateProductAction(product!._id!, data)
        : await createProductAction(data);

      if (result.success) {
        toast.success(isEditing ? "Product updated" : "Product created");
        const id = isEditing ? product!._id! : result.data?.id;
        router.push(`/admin/products/${id}`);
        router.refresh();
      } else {
        toast.error(result.error ?? "Something went wrong");
      }
    });
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Core product details and descriptions</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input id="name" name="name" defaultValue={product?.name} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" name="slug" defaultValue={product?.slug} placeholder="auto-generated" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select id="category" name="category" defaultValue={categoryId}>
              <option value="">No category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="shortDescription">Short Description *</Label>
            <Textarea
              id="shortDescription"
              name="shortDescription"
              defaultValue={product?.shortDescription}
              required
              rows={2}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="fullDescription">Full Description *</Label>
            <Textarea
              id="fullDescription"
              name="fullDescription"
              defaultValue={product?.fullDescription}
              required
              rows={6}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="features">Features (one per line)</Label>
            <Textarea
              id="features"
              name="features"
              defaultValue={product?.features?.join("\n")}
              rows={4}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="benefits">Benefits (one per line)</Label>
            <Textarea
              id="benefits"
              name="benefits"
              defaultValue={product?.benefits?.join("\n")}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pricing & Purchase</CardTitle>
          <CardDescription>Configure pricing display and purchase options</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="priceCents">Price (cents)</Label>
            <Input
              id="priceCents"
              name="priceCents"
              type="number"
              min={0}
              defaultValue={product?.priceCents ?? ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="compareAtPriceCents">Compare At Price (cents)</Label>
            <Input
              id="compareAtPriceCents"
              name="compareAtPriceCents"
              type="number"
              min={0}
              defaultValue={product?.compareAtPriceCents ?? ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sku">SKU</Label>
            <Input id="sku" name="sku" defaultValue={product?.sku} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="inventory">Inventory</Label>
            <Input
              id="inventory"
              name="inventory"
              type="number"
              min={0}
              defaultValue={product?.inventory ?? ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="purchaseMode">Purchase Mode</Label>
            <Select
              id="purchaseMode"
              name="purchaseMode"
              defaultValue={product?.purchaseMode ?? "contact_for_pricing"}
            >
              <option value="online_purchase">Online Purchase</option>
              <option value="request_quote">Request Quote</option>
              <option value="contact_for_pricing">Contact for Pricing</option>
              <option value="book_consultation">Book Consultation</option>
              <option value="external_checkout">External Checkout</option>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="externalCheckoutUrl">External Checkout URL</Label>
            <Input
              id="externalCheckoutUrl"
              name="externalCheckoutUrl"
              type="url"
              defaultValue={product?.externalCheckoutUrl}
            />
          </div>
          <div className="flex items-center gap-3">
            <input type="hidden" name="showPricing" value="off" />
            <Switch
              id="showPricing"
              checked={product?.showPricing ?? false}
              onCheckedChange={(checked) => {
                const input = document.querySelector<HTMLInputElement>('input[name="showPricing"]');
                if (input) input.value = checked ? "on" : "off";
              }}
            />
            <Label htmlFor="showPricing">Show Pricing</Label>
          </div>
          <div className="flex items-center gap-3">
            <input type="hidden" name="contactForPricing" value="off" />
            <Switch
              id="contactForPricing"
              checked={product?.contactForPricing ?? true}
              onCheckedChange={(checked) => {
                const input = document.querySelector<HTMLInputElement>('input[name="contactForPricing"]');
                if (input) input.value = checked ? "on" : "off";
              }}
            />
            <Label htmlFor="contactForPricing">Contact for Pricing</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sale Settings</CardTitle>
          <CardDescription>Configure promotional pricing</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center gap-3 md:col-span-2">
            <input type="hidden" name="onSale" value="off" />
            <Switch
              id="onSale"
              checked={product?.onSale ?? false}
              onCheckedChange={(checked) => {
                const input = document.querySelector<HTMLInputElement>('input[name="onSale"]');
                if (input) input.value = checked ? "on" : "off";
              }}
            />
            <Label htmlFor="onSale">On Sale</Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="saleDiscountType">Discount Type</Label>
            <Select
              id="saleDiscountType"
              name="saleDiscountType"
              defaultValue={product?.saleDiscountType ?? "percentage"}
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
              <option value="custom_price">Custom Price</option>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="saleDiscountValue">Discount Value</Label>
            <Input
              id="saleDiscountValue"
              name="saleDiscountValue"
              type="number"
              min={0}
              defaultValue={product?.saleDiscountValue ?? ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="saleStartDate">Sale Start Date</Label>
            <Input
              id="saleStartDate"
              name="saleStartDate"
              type="datetime-local"
              defaultValue={formatDateInput(product?.saleStartDate)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="saleEndDate">Sale End Date</Label>
            <Input
              id="saleEndDate"
              name="saleEndDate"
              type="datetime-local"
              defaultValue={formatDateInput(product?.saleEndDate)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="saleBadge">Sale Badge</Label>
            <Input id="saleBadge" name="saleBadge" defaultValue={product?.saleBadge} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="saleMessage">Sale Message</Label>
            <Input id="saleMessage" name="saleMessage" defaultValue={product?.saleMessage} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Display & CTA</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="displayOrder">Display Order</Label>
            <Input
              id="displayOrder"
              name="displayOrder"
              type="number"
              defaultValue={product?.displayOrder ?? 0}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ctaLabel">CTA Label</Label>
            <Input
              id="ctaLabel"
              name="ctaLabel"
              defaultValue={product?.ctaLabel ?? "Learn More"}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="ctaUrl">CTA URL</Label>
            <Input id="ctaUrl" name="ctaUrl" defaultValue={product?.ctaUrl} />
          </div>
          <div className="flex items-center gap-3">
            <input type="hidden" name="isFeatured" value="off" />
            <Switch
              id="isFeatured"
              checked={product?.isFeatured ?? false}
              onCheckedChange={(checked) => {
                const input = document.querySelector<HTMLInputElement>('input[name="isFeatured"]');
                if (input) input.value = checked ? "on" : "off";
              }}
            />
            <Label htmlFor="isFeatured">Featured</Label>
          </div>
          <div className="flex items-center gap-3">
            <input type="hidden" name="isActive" value="off" />
            <Switch
              id="isActive"
              checked={product?.isActive ?? true}
              onCheckedChange={(checked) => {
                const input = document.querySelector<HTMLInputElement>('input[name="isActive"]');
                if (input) input.value = checked ? "on" : "off";
              }}
            />
            <Label htmlFor="isActive">Active</Label>
          </div>
          <div className="flex items-center gap-3">
            <input type="hidden" name="isPlaceholder" value="off" />
            <Switch
              id="isPlaceholder"
              checked={product?.isPlaceholder ?? false}
              onCheckedChange={(checked) => {
                const input = document.querySelector<HTMLInputElement>('input[name="isPlaceholder"]');
                if (input) input.value = checked ? "on" : "off";
              }}
            />
            <Label htmlFor="isPlaceholder">Placeholder</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SEO</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="seoTitle">SEO Title</Label>
            <Input id="seoTitle" name="seoTitle" defaultValue={product?.seoTitle} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="seoDescription">SEO Description</Label>
            <Textarea
              id="seoDescription"
              name="seoDescription"
              defaultValue={product?.seoDescription}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : isEditing ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </form>
  );
}

function formatDateInput(date?: string): string {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 16);
}

function parseProductFormData(formData: FormData) {
  const optionalInt = (key: string) => {
    const n = parseInt(String(formData.get(key) ?? ""), 10);
    return isNaN(n) ? undefined : n;
  };
  const optionalDate = (key: string) => {
    const str = String(formData.get(key) ?? "");
    return str ? new Date(str) : undefined;
  };

  return {
    name: String(formData.get("name") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim() || undefined,
    shortDescription: String(formData.get("shortDescription") ?? "").trim(),
    fullDescription: String(formData.get("fullDescription") ?? "").trim(),
    priceCents: optionalInt("priceCents"),
    compareAtPriceCents: optionalInt("compareAtPriceCents"),
    showPricing: formData.get("showPricing") === "on",
    contactForPricing: formData.get("contactForPricing") === "on",
    purchaseMode: String(formData.get("purchaseMode") ?? "contact_for_pricing"),
    externalCheckoutUrl: String(formData.get("externalCheckoutUrl") ?? "") || undefined,
    category: String(formData.get("category") ?? "") || undefined,
    sku: String(formData.get("sku") ?? "") || undefined,
    inventory: optionalInt("inventory"),
    isFeatured: formData.get("isFeatured") === "on",
    isActive: formData.get("isActive") === "on",
    displayOrder: parseInt(String(formData.get("displayOrder") ?? "0"), 10) || 0,
    onSale: formData.get("onSale") === "on",
    saleDiscountType: String(formData.get("saleDiscountType") ?? "") || undefined,
    saleDiscountValue: optionalInt("saleDiscountValue"),
    saleStartDate: optionalDate("saleStartDate"),
    saleEndDate: optionalDate("saleEndDate"),
    saleBadge: String(formData.get("saleBadge") ?? "") || undefined,
    saleMessage: String(formData.get("saleMessage") ?? "") || undefined,
    ctaLabel: String(formData.get("ctaLabel") ?? "Learn More").trim(),
    ctaUrl: String(formData.get("ctaUrl") ?? "") || undefined,
    seoTitle: String(formData.get("seoTitle") ?? "") || undefined,
    seoDescription: String(formData.get("seoDescription") ?? "") || undefined,
    features: String(formData.get("features") ?? "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
    benefits: String(formData.get("benefits") ?? "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
  };
}
