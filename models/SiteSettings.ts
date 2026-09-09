import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISiteSettings extends Document {
  businessName: string;
  logo?: string;
  favicon?: string;
  contactEmail: string;
  contactPhone: string;
  address?: string;
  businessHours?: string;
  socialLinks: { platform: string; url: string; isActive: boolean }[];
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  ogImage?: string;
  headerCtaLabel: string;
  headerCtaUrl: string;
  announcementBar: { enabled: boolean; text: string; link?: string };
  footerContent: { brandStatement: string; copyright: string };
  brandColors: { primary: string; secondary: string; accent: string };
  gradientColors: { from: string; via: string; to: string };
  homepageSections: { sectionId: string; isVisible: boolean; order: number }[];
  contactForPricingLabel: string;
  currency: string;
  taxRate: number;
  purchasingEnabled: boolean;
  maintenanceMode: boolean;
  cookieBannerEnabled: boolean;
  analyticsIds: { googleAnalytics?: string; googleTagManager?: string };
  navigation: { label: string; href: string; order: number; isActive: boolean }[];
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    businessName: { type: String, default: "Rethink Automotive Inc." },
    logo: { type: String, default: "/images/rethink-logo.jpg" },
    favicon: { type: String },
    contactEmail: { type: String, default: "contact@rethinkautomotive.com" },
    contactPhone: { type: String, default: "(615) 571-9900" },
    address: { type: String },
    businessHours: { type: String },
    socialLinks: [{
      platform: String,
      url: String,
      isActive: { type: Boolean, default: true },
    }],
    defaultSeoTitle: { type: String, default: "Rethink Automotive Inc. | Dealership Marketing Solutions" },
    defaultSeoDescription: { type: String, default: "AI-powered and email-driven marketing systems for automotive dealerships." },
    ogImage: { type: String },
    headerCtaLabel: { type: String, default: "Book a Strategy Call" },
    headerCtaUrl: { type: String, default: "/book-appointment" },
    announcementBar: {
      enabled: { type: Boolean, default: false },
      text: { type: String, default: "" },
      link: { type: String },
    },
    footerContent: {
      brandStatement: { type: String, default: "Digital email marketing and AI-powered marketing solutions for automotive dealerships." },
      copyright: { type: String, default: "© Rethink Automotive Inc. All rights reserved." },
    },
    brandColors: {
      primary: { type: String, default: "#00d2ff" },
      secondary: { type: String, default: "#6b00ff" },
      accent: { type: String, default: "#ff00ff" },
    },
    gradientColors: {
      from: { type: String, default: "#00d2ff" },
      via: { type: String, default: "#0033ff" },
      to: { type: String, default: "#ff00ff" },
    },
    homepageSections: [{
      sectionId: String,
      isVisible: { type: Boolean, default: true },
      order: { type: Number, default: 0 },
    }],
    contactForPricingLabel: { type: String, default: "Contact for Pricing" },
    currency: { type: String, default: "USD" },
    taxRate: { type: Number, default: 0 },
    purchasingEnabled: { type: Boolean, default: false },
    maintenanceMode: { type: Boolean, default: false },
    cookieBannerEnabled: { type: Boolean, default: true },
    analyticsIds: {
      googleAnalytics: String,
      googleTagManager: String,
    },
    navigation: [{
      label: String,
      href: String,
      order: Number,
      isActive: { type: Boolean, default: true },
    }],
  },
  { timestamps: { createdAt: false, updatedAt: true } }
);

const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);

export default SiteSettings;
