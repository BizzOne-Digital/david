import type { PurchaseMode } from "@/types";

export interface PlaceholderProduct {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  benefits: string[];
  priceCents?: number;
  showPricing: boolean;
  contactForPricing: boolean;
  purchaseMode: PurchaseMode;
  isFeatured: boolean;
  ctaLabel: string;
  category: string;
  isPlaceholder: true;
}

export interface PlaceholderService {
  id: string;
  title: string;
  slug: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  isFeatured: boolean;
  ctaLabel: string;
  isPlaceholder: true;
}

export const placeholderProducts: PlaceholderProduct[] = [
  {
    id: "placeholder-1",
    name: "AI Lead Response Suite",
    slug: "ai-lead-response-suite",
    shortDescription:
      "Automated lead engagement workflows tailored for dealership sales teams.",
    fullDescription:
      "Describe your flagship AI lead response product here. Include capabilities, integrations, and outcomes your dealership clients can expect.",
    features: [
      "Instant lead acknowledgment",
      "CRM integration ready",
      "Appointment scheduling hooks",
    ],
    benefits: [
      "Faster first response times",
      "Consistent follow-up cadence",
    ],
    showPricing: false,
    contactForPricing: true,
    purchaseMode: "contact_for_pricing",
    isFeatured: true,
    ctaLabel: "Request Details",
    category: "AI Solutions",
    isPlaceholder: true,
  },
  {
    id: "placeholder-2",
    name: "Email Campaign Engine",
    slug: "email-campaign-engine",
    shortDescription:
      "Dealership-focused email marketing automation with segmentation and reporting.",
    fullDescription:
      "Full product description for your email campaign platform.",
    features: [
      "Template library",
      "Audience segmentation",
      "Performance dashboards",
    ],
    benefits: ["Nurture leads at scale", "Track ROI clearly"],
    showPricing: false,
    contactForPricing: true,
    purchaseMode: "book_consultation",
    isFeatured: true,
    ctaLabel: "Book Consultation",
    category: "Email Marketing",
    isPlaceholder: true,
  },
  {
    id: "placeholder-3",
    name: "Reputation & Review Toolkit",
    slug: "reputation-review-toolkit",
    shortDescription:
      "Tools to collect, monitor, and respond to customer reviews.",
    fullDescription: "Product overview for reputation management offering.",
    features: [
      "Review request automation",
      "Multi-platform monitoring",
    ],
    benefits: ["Strengthen online presence"],
    showPricing: false,
    contactForPricing: true,
    purchaseMode: "request_quote",
    isFeatured: false,
    ctaLabel: "Request Quote",
    category: "Reputation",
    isPlaceholder: true,
  },
];

import { serviceDetails } from "@/lib/content/service-details";

export const placeholderServices: PlaceholderService[] = serviceDetails.map(
  ({ id, title, slug, icon, shortDescription, fullDescription, features, isFeatured, ctaLabel, isPlaceholder }) => ({
    id,
    title,
    slug,
    icon,
    shortDescription,
    fullDescription,
    features,
    isFeatured,
    ctaLabel,
    isPlaceholder,
  })
);

export const productCategories = ["All", "AI Solutions", "Email Marketing", "Reputation"];
