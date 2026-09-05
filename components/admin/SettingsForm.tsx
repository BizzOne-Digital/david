"use client";

import { useTransition } from "react";
import { toast } from "sonner";
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
import { updateSiteSettingsAction } from "@/actions/settings";

interface SettingsData {
  businessName?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  businessHours?: string;
  defaultSeoTitle?: string;
  defaultSeoDescription?: string;
  headerCtaLabel?: string;
  headerCtaUrl?: string;
  contactForPricingLabel?: string;
  currency?: string;
  taxRate?: number;
  purchasingEnabled?: boolean;
  maintenanceMode?: boolean;
  cookieBannerEnabled?: boolean;
  announcementBar?: { enabled?: boolean; text?: string; link?: string };
  footerContent?: { brandStatement?: string; copyright?: string };
  brandColors?: { primary?: string; secondary?: string; accent?: string };
  analyticsIds?: { googleAnalytics?: string; googleTagManager?: string };
  socialLinks?: { platform: string; url: string; isActive: boolean }[];
  navigation?: { label: string; href: string; order: number; isActive: boolean }[];
}

interface SettingsFormProps {
  settings: SettingsData | null;
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    const data = {
      businessName: String(formData.get("businessName") ?? "").trim(),
      contactEmail: String(formData.get("contactEmail") ?? "").trim(),
      contactPhone: String(formData.get("contactPhone") ?? "").trim(),
      address: String(formData.get("address") ?? "") || undefined,
      businessHours: String(formData.get("businessHours") ?? "") || undefined,
      defaultSeoTitle: String(formData.get("defaultSeoTitle") ?? "").trim(),
      defaultSeoDescription: String(formData.get("defaultSeoDescription") ?? "").trim(),
      headerCtaLabel: String(formData.get("headerCtaLabel") ?? "").trim(),
      headerCtaUrl: String(formData.get("headerCtaUrl") ?? "").trim(),
      contactForPricingLabel: String(formData.get("contactForPricingLabel") ?? "").trim(),
      currency: String(formData.get("currency") ?? "USD").trim(),
      taxRate: parseFloat(String(formData.get("taxRate") ?? "0")) || 0,
      purchasingEnabled: formData.get("purchasingEnabled") === "on",
      maintenanceMode: formData.get("maintenanceMode") === "on",
      cookieBannerEnabled: formData.get("cookieBannerEnabled") === "on",
      socialLinks: settings?.socialLinks ?? [],
      announcementBar: {
        enabled: formData.get("announcementBarEnabled") === "on",
        text: String(formData.get("announcementBarText") ?? ""),
        link: String(formData.get("announcementBarLink") ?? "") || undefined,
      },
      footerContent: {
        brandStatement: String(formData.get("footerBrandStatement") ?? ""),
        copyright: String(formData.get("footerCopyright") ?? ""),
      },
      brandColors: {
        primary: String(formData.get("brandPrimary") ?? "#2563eb"),
        secondary: String(formData.get("brandSecondary") ?? "#7c3aed"),
        accent: String(formData.get("brandAccent") ?? "#06b6d4"),
      },
      analyticsIds: {
        googleAnalytics: String(formData.get("googleAnalytics") ?? "") || undefined,
        googleTagManager: String(formData.get("googleTagManager") ?? "") || undefined,
      },
    };

    startTransition(async () => {
      const result = await updateSiteSettingsAction(data);
      if (result.success) {
        toast.success("Settings saved successfully");
      } else {
        toast.error(result.error ?? "Failed to save settings");
      }
    });
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>Core business contact details</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              name="businessName"
              defaultValue={settings?.businessName}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactEmail">Contact Email</Label>
            <Input
              id="contactEmail"
              name="contactEmail"
              type="email"
              defaultValue={settings?.contactEmail}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactPhone">Contact Phone</Label>
            <Input
              id="contactPhone"
              name="contactPhone"
              defaultValue={settings?.contactPhone}
              required
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" name="address" defaultValue={settings?.address} rows={2} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="businessHours">Business Hours</Label>
            <Input
              id="businessHours"
              name="businessHours"
              defaultValue={settings?.businessHours}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SEO & Header</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="defaultSeoTitle">Default SEO Title</Label>
            <Input
              id="defaultSeoTitle"
              name="defaultSeoTitle"
              defaultValue={settings?.defaultSeoTitle}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="defaultSeoDescription">Default SEO Description</Label>
            <Textarea
              id="defaultSeoDescription"
              name="defaultSeoDescription"
              defaultValue={settings?.defaultSeoDescription}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="headerCtaLabel">Header CTA Label</Label>
            <Input
              id="headerCtaLabel"
              name="headerCtaLabel"
              defaultValue={settings?.headerCtaLabel}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="headerCtaUrl">Header CTA URL</Label>
            <Input
              id="headerCtaUrl"
              name="headerCtaUrl"
              defaultValue={settings?.headerCtaUrl}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Commerce</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Input id="currency" name="currency" defaultValue={settings?.currency ?? "USD"} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="taxRate">Tax Rate (decimal)</Label>
            <Input
              id="taxRate"
              name="taxRate"
              type="number"
              step="0.01"
              min={0}
              defaultValue={settings?.taxRate ?? 0}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="contactForPricingLabel">Contact for Pricing Label</Label>
            <Input
              id="contactForPricingLabel"
              name="contactForPricingLabel"
              defaultValue={settings?.contactForPricingLabel}
            />
          </div>
          <ToggleField
            name="purchasingEnabled"
            label="Purchasing Enabled"
            defaultChecked={settings?.purchasingEnabled ?? false}
          />
          <ToggleField
            name="maintenanceMode"
            label="Maintenance Mode"
            defaultChecked={settings?.maintenanceMode ?? false}
          />
          <ToggleField
            name="cookieBannerEnabled"
            label="Cookie Banner Enabled"
            defaultChecked={settings?.cookieBannerEnabled ?? true}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Announcement Bar</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <ToggleField
            name="announcementBarEnabled"
            label="Enable Announcement Bar"
            defaultChecked={settings?.announcementBar?.enabled ?? false}
          />
          <div className="space-y-2">
            <Label htmlFor="announcementBarText">Announcement Text</Label>
            <Input
              id="announcementBarText"
              name="announcementBarText"
              defaultValue={settings?.announcementBar?.text}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="announcementBarLink">Announcement Link</Label>
            <Input
              id="announcementBarLink"
              name="announcementBarLink"
              defaultValue={settings?.announcementBar?.link}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Footer</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="footerBrandStatement">Brand Statement</Label>
            <Textarea
              id="footerBrandStatement"
              name="footerBrandStatement"
              defaultValue={settings?.footerContent?.brandStatement}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="footerCopyright">Copyright</Label>
            <Input
              id="footerCopyright"
              name="footerCopyright"
              defaultValue={settings?.footerContent?.copyright}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Brand Colors</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="brandPrimary">Primary</Label>
            <Input
              id="brandPrimary"
              name="brandPrimary"
              type="color"
              defaultValue={settings?.brandColors?.primary ?? "#00d2ff"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="brandSecondary">Secondary</Label>
            <Input
              id="brandSecondary"
              name="brandSecondary"
              type="color"
              defaultValue={settings?.brandColors?.secondary ?? "#6b00ff"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="brandAccent">Accent</Label>
            <Input
              id="brandAccent"
              name="brandAccent"
              type="color"
              defaultValue={settings?.brandColors?.accent ?? "#ff00ff"}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="googleAnalytics">Google Analytics ID</Label>
            <Input
              id="googleAnalytics"
              name="googleAnalytics"
              defaultValue={settings?.analyticsIds?.googleAnalytics}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="googleTagManager">Google Tag Manager ID</Label>
            <Input
              id="googleTagManager"
              name="googleTagManager"
              defaultValue={settings?.analyticsIds?.googleTagManager}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </form>
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
