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
    id: "email-engine",
    filter: "email" as const,
    slug: "email-campaign-engine",
    category: "Targeted Email Marketing",
    name: "Stop Blasting. Start Targeting.",
    description:
      "Filtered, opportunity-based email marketing built around the customer, inventory and dealership objective. Rethink helps create the audience, message and campaign — then measures what happens next.",
    features: [
      "Database activation and reactivation",
      "Conquest marketing",
      "Inventory-specific targeting",
      "Ownership/lifecycle campaigns",
      "Creative support and rapid deployment",
      "Campaign dashboard and results visibility",
    ],
    visual: {
      icon: "Mail",
      accent: "orange",
      chips: ["Inventory", "Conquest", "Lifecycle"],
    },
    cta: "Request a Targeted Marketing Demo",
  },
  {
    id: "ai-suite",
    filter: "ai" as const,
    slug: "ai-lead-response-suite",
    category: "AI Chaser / Follow-Up",
    name: "The Lead Should Not Die Because Your Team Got Busy.",
    description:
      "AI-supported engagement helps keep conversations alive, responds quickly, nurtures interest and moves qualified customers toward an appointment — while management retains visibility.",
    features: [
      "Fast personalized engagement",
      "Persistent follow-up",
      "Appointment-oriented conversations",
      "Management dashboard controls",
      "Qualified handoff to dealership staff",
    ],
    visual: {
      icon: "MessageCircle",
      accent: "electric",
      chips: ["Fast Reply", "Follow-Up", "Appointments"],
    },
    cta: "See the AI Chaser Demo",
  },
  {
    id: "service-sales",
    filter: "all" as const,
    slug: "service-to-sales",
    category: "Service to Sales",
    name: "Your Next Deal May Already Be in the Service Drive.",
    description:
      "Rethink helps identify service customers whose repair, ownership or vehicle lifecycle signals may justify a sales conversation — then creates the communication and follow-up strategy to act on it.",
    features: [
      "Service lane opportunity identification",
      "Lifecycle and repair signal analysis",
      "Communication and follow-up strategy",
      "Management dashboard visibility",
    ],
    visual: {
      icon: "Wrench",
      accent: "violet",
      chips: ["Service Lane", "Upgrade Signals", "Handoff"],
    },
    cta: "Show Me Service-to-Sales",
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
      "Rethink is built for dealership leadership—not generic marketing agencies. We combine targeted email, AI follow-up, service-to-sales opportunity, dealer-controlled dashboards and consultative advisory. The focus is finding opportunity already inside your store and turning it into measurable action, not selling disconnected tools.",
  },
  {
    question: "How does onboarding work?",
    answer:
      "We start with a short demo and discovery conversation to understand your goals, current marketing, follow-up and fixed ops workflow. From there we align on the right solution, configure campaigns or engagement programs, connect reporting visibility for management, and launch with your team. Applicable programs can launch in as little as 3 days.",
  },
  {
    question: "Do you display fixed pricing?",
    answer:
      "No. Every dealership has different opportunity, inventory, database health and goals. We scope programs after understanding what you want to improve—then recommend the right combination of marketing, AI follow-up or consulting support.",
  },
  {
    question: "Can products work together?",
    answer:
      "Yes. Targeted email, AI chaser follow-up and service-to-sales are designed to work as one connected system. A lead can enter through email, stay engaged through AI, and service customers can move into sales conversations—with management visibility across the process.",
  },
  {
    question: "How do I get started?",
    answer:
      "Request a demo through the site. Share your dealership, role and what you want to improve. We will show you where opportunity may exist and what a practical next step looks like for your store.",
  },
  {
    question: "Is support included?",
    answer:
      "Yes. Rethink is built as a partnership, not a one-time campaign drop. You get launch support, performance visibility, optimization guidance and access to consulting when leadership wants a broader review of marketing, follow-up or future-fuel strategy.",
  },
] as const;
