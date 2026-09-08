import type { NavItem, SiteSettingsData } from "@/types";
import { DEMO_CTA_HREF, DEMO_CTA_LABEL } from "@/lib/content/revisions";

export const defaultSiteSettings: SiteSettingsData = {
  businessName: "Rethink Automotive Inc.",
  logo: "/images/rethink-logo.png",
  contactEmail: "contact@rethinkautomotive.com",
  contactPhone: "(615) 571-9900",
  address: "Your dealership address",
  businessHours: "Mon–Fri 9am–6pm",
  socialLinks: [
    { platform: "LinkedIn", url: "#", isActive: true },
    { platform: "X", url: "#", isActive: true },
    { platform: "YouTube", url: "#", isActive: true },
  ],
  defaultSeoTitle: "Rethink Automotive Inc. | Dealership Marketing Solutions",
  defaultSeoDescription:
    "Find the deals you're not closing. AI-powered targeting, follow-up and service-to-sales for modern dealerships.",
  headerCtaLabel: DEMO_CTA_LABEL,
  headerCtaUrl: DEMO_CTA_HREF,
  announcementBar: {
    enabled: true,
    text: "See what your dealership may be missing — request a demo today.",
    link: DEMO_CTA_HREF,
  },
  footerContent: {
    brandStatement:
      "Creative + Campaign + AI + Dashboard + Advisory for dealership growth.",
    copyright: "© 2026 Rethink Automotive Inc. All rights reserved.",
  },
  brandColors: {
    primary: "#00d2ff",
    secondary: "#6b00ff",
    accent: "#ff6b00",
  },
  contactForPricingLabel: "Request Demo",
  currency: "USD",
  taxRate: 0,
  purchasingEnabled: false,
  maintenanceMode: false,
  cookieBannerEnabled: true,
};

export const defaultNavigation: NavItem[] = [
  { label: "Home", href: "/", order: 0, isActive: true },
  { label: "Solutions", href: "/products", order: 1, isActive: true },
  { label: "Consulting", href: "/consulting", order: 2, isActive: true },
  { label: "Future Fuel", href: "/future-fuel", order: 3, isActive: true },
  { label: "About Us", href: "/about", order: 4, isActive: true },
  { label: "Contact", href: "/contact", order: 5, isActive: true },
];
