import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: z.email("Invalid email address"),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Reset token is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const productImageSchema = z.object({
  url: z.string().url(),
  publicId: z.string(),
  alt: z.string().optional(),
  order: z.number().default(0),
});

export const productSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  slug: z.string().min(1).max(200).optional(),
  shortDescription: z.string().min(1).max(500),
  fullDescription: z.string().min(1),
  coverImage: productImageSchema.optional(),
  gallery: z.array(productImageSchema).default([]),
  features: z.array(z.string()).default([]),
  benefits: z.array(z.string()).default([]),
  priceCents: z.number().min(0).optional(),
  compareAtPriceCents: z.number().min(0).optional(),
  showPricing: z.boolean().default(false),
  contactForPricing: z.boolean().default(true),
  purchaseMode: z.enum([
    "online_purchase",
    "request_quote",
    "contact_for_pricing",
    "book_consultation",
    "external_checkout",
  ]).default("contact_for_pricing"),
  externalCheckoutUrl: z.string().url().optional().or(z.literal("")),
  category: z.string().optional(),
  sku: z.string().optional(),
  inventory: z.number().min(0).optional(),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  displayOrder: z.number().default(0),
  onSale: z.boolean().default(false),
  saleDiscountType: z.enum(["percentage", "fixed", "custom_price"]).optional(),
  saleDiscountValue: z.number().min(0).optional(),
  saleStartDate: z.coerce.date().optional(),
  saleEndDate: z.coerce.date().optional(),
  saleBadge: z.string().optional(),
  saleMessage: z.string().optional(),
  ctaLabel: z.string().default("Learn More"),
  ctaUrl: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export const orderItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1),
});

export const createOrderSchema = z.object({
  customerName: z.string().min(1, "Name is required").max(200),
  dealership: z.string().min(1, "Dealership is required").max(200),
  email: z.email("Invalid email"),
  phone: z.string().min(7, "Phone is required").max(30),
  billingAddress: z.string().max(500).optional(),
  items: z.array(orderItemSchema).min(1, "At least one item is required"),
  couponCode: z.string().optional(),
  orderNotes: z.string().max(2000).optional(),
  consentGiven: z.literal(true, { message: "You must agree to continue" }),
});

export const updateOrderSchema = z.object({
  status: z.enum([
    "new", "pending", "awaiting_payment", "paid",
    "processing", "completed", "cancelled", "refunded",
  ]).optional(),
  paymentStatus: z.enum([
    "not_required", "unpaid", "pending", "paid", "failed", "refunded",
  ]).optional(),
  internalNotes: z.string().max(5000).optional(),
});

export const appointmentSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  dealershipName: z.string().min(1, "Dealership name is required").max(200),
  workEmail: z.email("Invalid email"),
  phone: z.string().min(7, "Phone is required").max(30),
  website: z.string().url().optional().or(z.literal("")),
  numberOfLocations: z.coerce.number().int().min(1).optional(),
  interestedIn: z.string().max(200).optional(),
  preferredDate: z.coerce.date({ message: "Preferred date is required" }),
  preferredTime: z.string().min(1, "Preferred time is required"),
  timezone: z.string().min(1, "Timezone is required"),
  message: z.string().max(5000).optional(),
  consentGiven: z.literal(true, { message: "You must agree to continue" }),
});

export const updateAppointmentSchema = z.object({
  status: z.enum(["pending", "confirmed", "rescheduled", "completed", "cancelled"]).optional(),
  internalNotes: z.string().max(5000).optional(),
});

export const inquirySchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.email("Invalid email"),
  phone: z.string().max(30).optional(),
  dealership: z.string().max(200).optional(),
  inquiryType: z.string().min(1, "Inquiry type is required"),
  productInterest: z.string().max(200).optional(),
  message: z.string().min(1, "Message is required").max(5000),
  consentGiven: z.literal(true, { message: "You must agree to continue" }),
});

export const updateInquirySchema = z.object({
  status: z.enum(["new", "contacted", "qualified", "converted", "closed"]).optional(),
  internalNotes: z.string().max(5000).optional(),
});

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.email("Invalid email"),
  phone: z.string().max(30).optional(),
  subject: z.string().max(200).optional(),
  message: z.string().min(1, "Message is required").max(5000),
  consentGiven: z.literal(true, { message: "You must agree to continue" }),
});

export const siteSettingsSchema = z.object({
  businessName: z.string().min(1),
  logo: z.string().optional(),
  favicon: z.string().optional(),
  contactEmail: z.email(),
  contactPhone: z.string().min(1),
  address: z.string().optional(),
  businessHours: z.string().optional(),
  socialLinks: z.array(z.object({
    platform: z.string(),
    url: z.string(),
    isActive: z.boolean(),
  })).default([]),
  defaultSeoTitle: z.string(),
  defaultSeoDescription: z.string(),
  ogImage: z.string().optional(),
  headerCtaLabel: z.string(),
  headerCtaUrl: z.string(),
  announcementBar: z.object({
    enabled: z.boolean(),
    text: z.string(),
    link: z.string().optional(),
  }).optional(),
  footerContent: z.object({
    brandStatement: z.string(),
    copyright: z.string(),
  }),
  brandColors: z.object({
    primary: z.string(),
    secondary: z.string(),
    accent: z.string(),
  }),
  contactForPricingLabel: z.string(),
  currency: z.string().default("USD"),
  taxRate: z.number().min(0).max(1),
  purchasingEnabled: z.boolean(),
  maintenanceMode: z.boolean(),
  cookieBannerEnabled: z.boolean(),
  analyticsIds: z.object({
    googleAnalytics: z.string().optional(),
    googleTagManager: z.string().optional(),
  }).optional(),
});

export const pageContentSchema = z.object({
  pageSlug: z.string().min(1),
  pageTitle: z.string().min(1),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  sections: z.array(z.object({
    id: z.string(),
    type: z.string(),
    title: z.string().optional(),
    subtitle: z.string().optional(),
    content: z.string().optional(),
    eyebrow: z.string().optional(),
    ctaLabel: z.string().optional(),
    ctaUrl: z.string().optional(),
    items: z.array(z.record(z.string(), z.unknown())).optional(),
    isVisible: z.boolean(),
    order: z.number(),
  })),
  faqs: z.array(z.object({
    question: z.string(),
    answer: z.string(),
    order: z.number(),
  })).optional(),
});

export const couponSchema = z.object({
  code: z.string().min(3).max(30),
  title: z.string().optional(),
  description: z.string().optional(),
  discountType: z.enum(["percentage", "fixed"]),
  discountValue: z.number().min(0),
  minimumOrderCents: z.number().min(0).optional(),
  applicableProducts: z.array(z.string()).default([]),
  applicableCategories: z.array(z.string()).default([]),
  totalUsageLimit: z.number().int().min(1).optional(),
  usageLimitPerCustomer: z.number().int().min(1).optional(),
  startDate: z.coerce.date().optional(),
  expiryDate: z.coerce.date().optional(),
  isActive: z.boolean().default(true),
  isPublic: z.boolean().default(false),
  displayLocations: z.array(z.enum([
    "announcement_bar", "homepage_banner", "product_cards",
    "product_details", "cart", "checkout",
  ])).default([]),
});

export const validateCouponSchema = z.object({
  code: z.string().min(1),
  subtotalCents: z.number().min(0),
  customerEmail: z.email().optional(),
  productIds: z.array(z.string()).optional(),
  categoryIds: z.array(z.string()).optional(),
});

export const categorySchema = z.object({
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).optional(),
  description: z.string().optional(),
  image: z.object({
    url: z.string(),
    publicId: z.string(),
    alt: z.string().optional(),
  }).optional(),
  displayOrder: z.number().default(0),
  isActive: z.boolean().default(true),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export const serviceSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).optional(),
  icon: z.string().default("Zap"),
  shortDescription: z.string().min(1).max(500),
  fullDescription: z.string().min(1),
  image: z.object({
    url: z.string(),
    publicId: z.string(),
    alt: z.string().optional(),
  }).optional(),
  features: z.array(z.string()).default([]),
  displayOrder: z.number().default(0),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  ctaLabel: z.string().default("Learn More"),
  ctaUrl: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export const newsletterSchema = z.object({
  email: z.email("Invalid email address"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type AppointmentInput = z.infer<typeof appointmentSchema>;
export type InquiryInput = z.infer<typeof inquirySchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type CouponInput = z.infer<typeof couponSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type ServiceInput = z.infer<typeof serviceSchema>;
