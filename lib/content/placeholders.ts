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
    id: "placeholder-email",
    name: "Stop Blasting. Start Targeting.",
    slug: "email-campaign-engine",
    shortDescription:
      "Filtered, opportunity-based email marketing built around the customer, inventory and dealership objective.",
    fullDescription:
      "Stop blasting. Start targeting. Rethink helps create the audience, message and campaign — then measures what happens next.",
    features: [
      "Database activation and reactivation",
      "Conquest marketing",
      "Inventory-specific targeting",
      "Ownership/lifecycle campaigns",
      "Creative support and rapid deployment",
      "Campaign dashboard and results visibility",
    ],
    benefits: [
      "Reach the right customers with the right message",
      "Measure what happens next",
    ],
    showPricing: false,
    contactForPricing: true,
    purchaseMode: "book_consultation",
    isFeatured: true,
    ctaLabel: "Learn More",
    category: "Email Marketing",
    isPlaceholder: true,
  },
  {
    id: "placeholder-ai",
    name: "The Lead Should Not Die Because Your Team Got Busy.",
    slug: "ai-lead-response-suite",
    shortDescription:
      "AI-supported engagement that keeps conversations alive and moves qualified customers toward an appointment.",
    fullDescription:
      "The lead should not die because your team got busy. Rethink helps keep conversations alive while management retains visibility.",
    features: [
      "Fast personalized engagement",
      "Persistent follow-up",
      "Appointment-oriented conversations",
      "Management dashboard controls",
      "Qualified handoff to dealership staff",
    ],
    benefits: [
      "Keep qualified opportunities from disappearing",
      "Management visibility and control",
    ],
    showPricing: false,
    contactForPricing: true,
    purchaseMode: "contact_for_pricing",
    isFeatured: true,
    ctaLabel: "Learn More",
    category: "AI Solutions",
    isPlaceholder: true,
  },
  {
    id: "placeholder-service-sales",
    name: "Your Next Deal May Already Be in the Service Drive.",
    slug: "service-to-sales",
    shortDescription:
      "Identify service customers ready for a replacement, upgrade or trade conversation.",
    fullDescription:
      "Your next deal may already be in the service drive. Rethink helps identify service customers whose signals may justify a sales conversation — then creates the communication and follow-up strategy to act on it.",
    features: [
      "Service lane opportunity identification",
      "Lifecycle and repair signal analysis",
      "Communication and follow-up strategy",
      "Management dashboard visibility",
    ],
    benefits: [
      "Connect fixed ops signals to sales conversations",
      "Activate opportunities already in your dealership",
    ],
    showPricing: false,
    contactForPricing: true,
    purchaseMode: "book_consultation",
    isFeatured: true,
    ctaLabel: "Learn More",
    category: "Service to Sales",
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
