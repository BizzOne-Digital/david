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
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createServiceAction, updateServiceAction } from "@/actions/services";

interface ServiceData {
  _id?: string;
  title?: string;
  slug?: string;
  icon?: string;
  shortDescription?: string;
  fullDescription?: string;
  features?: string[];
  displayOrder?: number;
  isFeatured?: boolean;
  isActive?: boolean;
  ctaLabel?: string;
  ctaUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  isPlaceholder?: boolean;
}

export function ServiceForm({ service }: { service?: ServiceData }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isEditing = !!service?._id;

  const handleSubmit = (formData: FormData) => {
    const data = {
      title: String(formData.get("title") ?? "").trim(),
      slug: String(formData.get("slug") ?? "").trim() || undefined,
      icon: String(formData.get("icon") ?? "Zap").trim(),
      shortDescription: String(formData.get("shortDescription") ?? "").trim(),
      fullDescription: String(formData.get("fullDescription") ?? "").trim(),
      features: String(formData.get("features") ?? "")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      displayOrder: parseInt(String(formData.get("displayOrder") ?? "0"), 10) || 0,
      isFeatured: formData.get("isFeatured") === "on",
      isActive: formData.get("isActive") === "on",
      ctaLabel: String(formData.get("ctaLabel") ?? "Learn More").trim(),
      ctaUrl: String(formData.get("ctaUrl") ?? "") || undefined,
      seoTitle: String(formData.get("seoTitle") ?? "") || undefined,
      seoDescription: String(formData.get("seoDescription") ?? "") || undefined,
    };

    startTransition(async () => {
      const result = isEditing
        ? await updateServiceAction(service!._id!, data)
        : await createServiceAction(data);

      if (result.success) {
        toast.success(isEditing ? "Service updated" : "Service created");
        const id = isEditing ? service!._id! : result.data?.id;
        router.push(`/admin/services/${id}`);
        router.refresh();
      } else {
        toast.error(result.error ?? "Something went wrong");
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/services">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-semibold text-white">
            {isEditing ? "Edit Service" : "New Service"}
          </h2>
        </div>
      </div>

      <form action={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Service Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Title *</Label>
              <Input id="title" name="title" defaultValue={service?.title} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" defaultValue={service?.slug} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon">Icon (Lucide name)</Label>
              <Input id="icon" name="icon" defaultValue={service?.icon ?? "Zap"} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="shortDescription">Short Description *</Label>
              <Textarea
                id="shortDescription"
                name="shortDescription"
                defaultValue={service?.shortDescription}
                required
                rows={2}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="fullDescription">Full Description *</Label>
              <Textarea
                id="fullDescription"
                name="fullDescription"
                defaultValue={service?.fullDescription}
                required
                rows={6}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="features">Features (one per line)</Label>
              <Textarea
                id="features"
                name="features"
                defaultValue={service?.features?.join("\n")}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="displayOrder">Display Order</Label>
              <Input
                id="displayOrder"
                name="displayOrder"
                type="number"
                defaultValue={service?.displayOrder ?? 0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ctaLabel">CTA Label</Label>
              <Input
                id="ctaLabel"
                name="ctaLabel"
                defaultValue={service?.ctaLabel ?? "Learn More"}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="ctaUrl">CTA URL</Label>
              <Input id="ctaUrl" name="ctaUrl" defaultValue={service?.ctaUrl} />
            </div>
            <ToggleField name="isFeatured" label="Featured" defaultChecked={service?.isFeatured ?? false} />
            <ToggleField name="isActive" label="Active" defaultChecked={service?.isActive ?? true} />
            <ToggleField name="isPlaceholder" label="Placeholder" defaultChecked={service?.isPlaceholder ?? false} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="seoTitle">SEO Title</Label>
              <Input id="seoTitle" name="seoTitle" defaultValue={service?.seoTitle} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seoDescription">SEO Description</Label>
              <Textarea
                id="seoDescription"
                name="seoDescription"
                defaultValue={service?.seoDescription}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Link href="/admin/services">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : isEditing ? "Update Service" : "Create Service"}
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
