export type UserRole = "super_admin" | "admin" | "content_manager";

export type PurchaseMode =
  | "online_purchase"
  | "request_quote"
  | "contact_for_pricing"
  | "book_consultation"
  | "external_checkout";

export type OrderStatus =
  | "new"
  | "pending"
  | "awaiting_payment"
  | "paid"
  | "processing"
  | "completed"
  | "cancelled"
  | "refunded";

export type PaymentStatus =
  | "not_required"
  | "unpaid"
  | "pending"
  | "paid"
  | "failed"
  | "refunded";

export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "rescheduled"
  | "completed"
  | "cancelled";

export type InquiryStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "converted"
  | "closed";

export type CouponDisplayLocation =
  | "announcement_bar"
  | "homepage_banner"
  | "product_cards"
  | "product_details"
  | "cart"
  | "checkout";

export interface NavItem {
  label: string;
  href: string;
  order: number;
  isActive: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  isActive: boolean;
}

export interface FeatureBlock {
  title: string;
  description: string;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  image?: string;
  quantity: number;
  unitPriceCents: number;
  purchaseMode: PurchaseMode;
}

export interface SiteSettingsData {
  businessName: string;
  logo?: string;
  favicon?: string;
  contactEmail: string;
  contactPhone: string;
  address?: string;
  businessHours?: string;
  socialLinks: SocialLink[];
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  ogImage?: string;
  headerCtaLabel: string;
  headerCtaUrl: string;
  announcementBar?: {
    enabled: boolean;
    text: string;
    link?: string;
  };
  footerContent: {
    brandStatement: string;
    copyright: string;
  };
  brandColors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  contactForPricingLabel: string;
  currency: string;
  taxRate: number;
  purchasingEnabled: boolean;
  maintenanceMode: boolean;
  cookieBannerEnabled: boolean;
  analyticsIds?: {
    googleAnalytics?: string;
    googleTagManager?: string;
  };
}

export interface PageSection {
  id: string;
  type: string;
  title?: string;
  subtitle?: string;
  content?: string;
  eyebrow?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  items?: Record<string, unknown>[];
  isVisible: boolean;
  order: number;
}

export interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  productsOnSale: number;
  totalOrders: number;
  newOrders: number;
  revenueCents: number;
  totalAppointments: number;
  pendingAppointments: number;
  totalInquiries: number;
  activeCoupons: number;
}
