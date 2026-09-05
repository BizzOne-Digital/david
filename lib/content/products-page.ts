export const PRODUCTS_BACKGROUNDS = {
  hero: "/images/sections/products/hero-bg.jpg",
  featured: "/images/sections/products/featured-bg.jpg",
  comparison: "/images/sections/products/comparison-bg.jpg",
  offer: "/images/sections/products/offer-bg.jpg",
  how: "/images/sections/products/how-bg.jpg",
  cta: "/images/sections/products/cta-bg.jpg",
} as const;

export const PRODUCT_VISUALS = {
  aiSuite: "/images/sections/products/ai-suite-visual.jpg",
  emailEngine: "/images/sections/products/email-engine-visual.jpg",
} as const;

export type ProductFilter = "all" | "ai" | "email";

export const productFilters: { id: ProductFilter; label: string }[] = [
  { id: "all", label: "All Solutions" },
  { id: "ai", label: "AI Marketing" },
  { id: "email", label: "Email Marketing" },
];

export const featuredProductsPage = [
  {
    id: "ai-suite",
    filter: "ai" as const,
    slug: "ai-lead-response-suite",
    category: "AI Marketing",
    name: "AI Marketing Suite",
    tagline: "Attract. Engage. Convert. Smarter.",
    description:
      "Replace with client-approved product copy. An AI-powered marketing solution designed to help dealerships identify, engage, and convert more opportunities.",
    visual: PRODUCT_VISUALS.aiSuite,
    features: [
      "AI-powered audience targeting",
      "Real-time performance insights",
      "Automated lead engagement workflows",
      "CRM-ready integrations",
    ],
  },
  {
    id: "email-engine",
    filter: "email" as const,
    slug: "email-campaign-engine",
    category: "Email Marketing",
    name: "Dealer Email Engine",
    tagline: "More Conversations. More Opportunities.",
    description:
      "Replace with client-approved product copy. A dealership-focused email marketing platform built for segmentation, automation, and measurable results.",
    visual: PRODUCT_VISUALS.emailEngine,
    features: [
      "Automated lifecycle campaigns",
      "Audience segmentation tools",
      "Seamless integration support",
      "Performance reporting dashboards",
    ],
  },
] as const;

export const productComparisonRows = [
  { feature: "AI-Powered Audience Targeting", ai: true, email: false },
  { feature: "Automated Campaigns", ai: true, email: true },
  { feature: "Email Marketing", ai: false, email: true },
  { feature: "Lead Engagement Workflows", ai: true, email: true },
  { feature: "Performance Dashboards", ai: true, email: true },
  { feature: "CRM Integration Ready", ai: true, email: true },
  { feature: "Appointment Scheduling Hooks", ai: true, email: false },
] as const;

export const howItWorksSteps = [
  {
    step: "01",
    title: "Capture",
    description: "Attract the right buyers across every channel.",
    icon: "Users",
  },
  {
    step: "02",
    title: "Connect",
    description: "Deliver personalized experiences at scale.",
    icon: "MessageCircle",
  },
  {
    step: "03",
    title: "Convert",
    description: "Turn interest into appointments and sales.",
    icon: "BarChart3",
  },
] as const;

export const productsFaqs = [
  {
    question: "What makes Rethink Automotive different?",
    answer:
      "Replace with client-approved FAQ answer. We focus exclusively on automotive dealership marketing with connected email and AI-driven systems.",
  },
  {
    question: "How does onboarding work?",
    answer:
      "Our team works with your dealership to understand your goals, integrate with existing tools, and configure campaigns aligned to your sales process.",
  },
  {
    question: "Do you display fixed pricing?",
    answer:
      "Pricing is provided on a consultation basis. Contact us for details tailored to your dealership's needs.",
  },
  {
    question: "Can products work together?",
    answer:
      "Yes. Our solutions are designed as connected systems that support engagement, nurturing, and conversion across the buyer journey.",
  },
  {
    question: "How do I get started?",
    answer:
      "Book a strategy call to discuss your dealership goals and explore which solutions are the right fit.",
  },
  {
    question: "Is support included?",
    answer:
      "Replace with client-approved support details. Ongoing partnership and optimization are core to how we work with dealerships.",
  },
] as const;
