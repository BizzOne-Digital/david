export const SERVICES_PAGE_BACKGROUNDS = {
  hero: "/images/sections/contact/hero-bg.jpg",
  grid: "/images/sections/contact/form-bg.jpg",
  funnel: "/images/sections/services/funnel-bg.jpg",
  process: "/images/sections/process-bg.jpg",
  integration: "/images/sections/services/integration-bg.jpg",
  faq: "/images/sections/contact/faq-bg.jpg",
  cta: "/images/sections/contact/cta-bg.jpg",
} as const;

export const servicesPageCards = [
  {
    title: "Email Marketing Operations",
    description:
      "End-to-end email campaign management built for automotive retail audiences.",
    icon: "Send",
    slug: "email-marketing-operations",
  },
  {
    title: "AI Lead Engagement",
    description:
      "Intelligent workflows that help your team respond faster and stay connected.",
    icon: "Cpu",
    slug: "ai-lead-engagement",
  },
  {
    title: "Marketing Strategy",
    description:
      "Dealership-focused planning aligned to your inventory, market, and sales goals.",
    icon: "TrendingUp",
    slug: "marketing-strategy",
  },
  {
    title: "Campaign Management",
    description:
      "Production, deployment, and optimization of multi-channel marketing programs.",
    icon: "Megaphone",
    slug: "campaign-management",
  },
  {
    title: "CRM & Integration Support",
    description:
      "Connect your marketing systems with the tools your dealership already uses.",
    icon: "Link2",
    slug: "crm-integration-support",
  },
  {
    title: "Analytics & Reporting",
    description:
      "Clear visibility into performance with reporting designed for decision-makers.",
    icon: "LineChart",
    slug: "analytics-reporting",
  },
] as const;

export const dealerFunnelStages = [
  {
    stage: "Attract",
    benefit: "Reach in-market shoppers across digital channels.",
  },
  {
    stage: "Engage",
    benefit: "Start meaningful conversations with timely outreach.",
  },
  {
    stage: "Nurture",
    benefit: "Stay top-of-mind with automated follow-up journeys.",
  },
  {
    stage: "Convert",
    benefit: "Turn interest into qualified appointments and opportunities.",
  },
] as const;

export const servicesProcessSteps = [
  { step: "01", title: "Discover", description: "Understand your goals and current marketing landscape.", icon: "Search" },
  { step: "02", title: "Build", description: "Design systems and campaigns tailored to your dealership.", icon: "Wrench" },
  { step: "03", title: "Launch", description: "Deploy with tracking, training, and team alignment.", icon: "Play" },
  { step: "04", title: "Optimize", description: "Refine based on performance data and feedback.", icon: "LineChart" },
] as const;

export const integrationNodes = [
  "CRM",
  "DMS",
  "Website",
  "Email",
  "SMS",
  "Analytics",
] as const;

export const servicesFaqs = [
  {
    question: "What services does Rethink Automotive offer?",
    answer:
      "We provide email marketing, AI-assisted lead engagement, strategy, campaign management, integration support, and analytics for dealerships.",
  },
  {
    question: "Do you work with our existing CRM?",
    answer:
      "Replace with client-approved integration details. Our systems are designed to connect with common dealership tools.",
  },
  {
    question: "How long does onboarding take?",
    answer:
      "Timelines vary by dealership size and scope. We'll outline a realistic plan during your strategy call.",
  },
  {
    question: "Can we start with one service?",
    answer:
      "Yes. Many dealerships begin with a focused program and expand as goals evolve.",
  },
  {
    question: "How do we get started?",
    answer:
      "Book a strategy call to discuss your dealership goals and explore the right service mix.",
  },
] as const;
