"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { updatePageContentAction } from "@/actions/content";
import type { PageSection } from "@/types";

interface PageData {
  pageSlug: string;
  pageTitle: string;
  seoTitle?: string;
  seoDescription?: string;
  sections?: PageSection[];
  faqs?: { question: string; answer: string; order: number }[];
}

interface PageContentEditorProps {
  page: PageData;
}

export function PageContentEditor({ page }: PageContentEditorProps) {
  const [sections, setSections] = useState<PageSection[]>(page.sections ?? []);
  const [isPending, startTransition] = useTransition();

  const addSection = () => {
    setSections([
      ...sections,
      {
        id: `section-${Date.now()}`,
        type: "text",
        title: "",
        content: "",
        isVisible: true,
        order: sections.length,
      },
    ]);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const updateSection = (index: number, field: keyof PageSection, value: unknown) => {
    setSections(
      sections.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    );
  };

  const handleSubmit = (formData: FormData) => {
    const data = {
      pageSlug: page.pageSlug,
      pageTitle: String(formData.get("pageTitle") ?? "").trim(),
      seoTitle: String(formData.get("seoTitle") ?? "") || undefined,
      seoDescription: String(formData.get("seoDescription") ?? "") || undefined,
      sections,
      faqs: page.faqs ?? [],
    };

    startTransition(async () => {
      const result = await updatePageContentAction(data);
      if (result.success) {
        toast.success("Page content saved");
      } else {
        toast.error(result.error ?? "Failed to save content");
      }
    });
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{page.pageTitle}</CardTitle>
          <CardDescription>Editing content for /{page.pageSlug}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="pageTitle">Page Title</Label>
            <Input
              id="pageTitle"
              name="pageTitle"
              defaultValue={page.pageTitle}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="seoTitle">SEO Title</Label>
            <Input id="seoTitle" name="seoTitle" defaultValue={page.seoTitle} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="seoDescription">SEO Description</Label>
            <Textarea
              id="seoDescription"
              name="seoDescription"
              defaultValue={page.seoDescription}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Sections</h3>
        <Button type="button" variant="outline" size="sm" onClick={addSection}>
          <Plus className="h-4 w-4" />
          Add Section
        </Button>
      </div>

      {sections.map((section, index) => (
        <Card key={section.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-base">
              Section {index + 1}: {section.type}
            </CardTitle>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeSection(index)}
            >
              <Trash2 className="h-4 w-4 text-red-400" />
            </Button>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Type</Label>
              <Input
                value={section.type}
                onChange={(e) => updateSection(index, "type", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Order</Label>
              <Input
                type="number"
                value={section.order}
                onChange={(e) =>
                  updateSection(index, "order", parseInt(e.target.value, 10) || 0)
                }
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Title</Label>
              <Input
                value={section.title ?? ""}
                onChange={(e) => updateSection(index, "title", e.target.value)}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Subtitle</Label>
              <Input
                value={section.subtitle ?? ""}
                onChange={(e) => updateSection(index, "subtitle", e.target.value)}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Eyebrow</Label>
              <Input
                value={section.eyebrow ?? ""}
                onChange={(e) => updateSection(index, "eyebrow", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>CTA Label</Label>
              <Input
                value={section.ctaLabel ?? ""}
                onChange={(e) => updateSection(index, "ctaLabel", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>CTA URL</Label>
              <Input
                value={section.ctaUrl ?? ""}
                onChange={(e) => updateSection(index, "ctaUrl", e.target.value)}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Content</Label>
              <Textarea
                value={section.content ?? ""}
                onChange={(e) => updateSection(index, "content", e.target.value)}
                rows={4}
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={section.isVisible}
                onCheckedChange={(checked) =>
                  updateSection(index, "isVisible", checked)
                }
              />
              <Label>Visible</Label>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Page Content"}
        </Button>
      </div>
    </form>
  );
}
