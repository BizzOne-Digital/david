import type { NavItem, SiteSettingsData } from "@/types";

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
    "AI-powered and email-driven marketing systems for automotive dealerships.",
  headerCtaLabel: "Book a Strategy Call",
  headerCtaUrl: "/book-appointment",
  announcementBar: {
    enabled: true,
    text: "Schedule your complimentary marketing strategy session.",
    link: "/book-appointment",
  },
  footerContent: {
    brandStatement:
      "Smarter marketing systems for modern dealerships.",
    copyright: "© 2026 Rethink Automotive Inc. All rights reserved.",
  },
  brandColors: {
    primary: "#00d2ff",
    secondary: "#6b00ff",
    accent: "#ff00ff",
  },
  contactForPricingLabel: "Contact for Pricing",
  currency: "USD",
  taxRate: 0,
  purchasingEnabled: false,
  maintenanceMode: false,
  cookieBannerEnabled: true,
};

export const defaultNavigation: NavItem[] = [
  { label: "Home", href: "/", order: 0, isActive: true },
  { label: "About", href: "/about", order: 1, isActive: true },
  { label: "Products", href: "/products", order: 2, isActive: true },
  { label: "Services", href: "/services", order: 3, isActive: true },
  { label: "Contact", href: "/contact", order: 4, isActive: true },
];
