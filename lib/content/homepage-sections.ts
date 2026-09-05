export const SECTION_BACKGROUNDS = {
  hero: "/images/sections/hero-bg.jpg",
  brand: "/images/sections/brand-bg.jpg",
  products: "/images/sections/products-bg.jpg",
  journey: "/images/sections/journey-bg.jpg",
  services: "/images/sections/services-bg.jpg",
  why: "/images/sections/why-bg.jpg",
  process: "/images/sections/process-bg.jpg",
  cta: "/images/sections/cta-bg.jpg",
} as const;

export const homepageProducts = [
  {
    id: "engage",
    name: "Rethink Engage",
    slug: "ai-lead-response-suite",
    tagline: "AI-powered email marketing that captures attention and drives first contact.",
    description:
      "Replace with client-approved product copy. Designed to help dealerships initiate meaningful conversations with in-market shoppers.",
    cta: "Learn More",
  },
  {
    id: "nurture",
    name: "Rethink Nurture",
    slug: "email-campaign-engine",
    tagline: "Automated customer journeys that keep leads warm until they're ready to buy.",
    description:
      "Replace with client-approved product copy. Built for long-cycle automotive sales and consistent follow-up.",
    cta: "Learn More",
  },
] as const;

export const journeySteps = [
  {
    label: "Engage",
    description: "Reach the right audience with targeted campaigns.",
    icon: "Mail",
  },
  {
    label: "Nurture",
    description: "Stay top-of-mind with intelligent follow-up.",
    icon: "Users",
  },
  {
    label: "Convert",
    description: "Turn interest into qualified appointments.",
    icon: "BarChart3",
  },
] as const;

export const homepageServices = [
  {
    title: "Strategy & Consulting",
    description: "Marketing roadmaps tailored to your dealership goals.",
    icon: "Target",
    slug: "marketing-strategy",
  },
  {
    title: "Implementation & Integration",
    description: "Seamless setup with your existing tools and CRM.",
    icon: "Settings",
    slug: "crm-integration-support",
  },
  {
    title: "Campaign Management",
    description: "End-to-end execution of email and digital programs.",
    icon: "TrendingUp",
    slug: "campaign-management",
  },
  {
    title: "Support & Success",
    description: "Ongoing optimization and dedicated partnership.",
    icon: "Headphones",
    slug: "analytics-reporting",
  },
] as const;

export const whyRethinkItems = [
  {
    title: "Automotive Focused",
    description: "Built exclusively for dealership sales cycles and operations.",
    icon: "Car",
  },
  {
    title: "AI-Powered",
    description: "Intelligent systems that adapt to your lead flow.",
    icon: "Brain",
  },
  {
    title: "Dealership First",
    description: "Your goals drive every campaign and workflow we build.",
    icon: "Building2",
  },
  {
    title: "A Brighter Tomorrow",
    description: "Measurable growth through smarter marketing systems.",
    icon: "Sun",
  },
] as const;

export const processSteps = [
  {
    step: "01",
    title: "Discover",
    description: "Understand your dealership, audience, and current marketing.",
    icon: "Search",
  },
  {
    step: "02",
    title: "Build",
    description: "Design and configure your marketing systems.",
    icon: "Settings",
  },
  {
    step: "03",
    title: "Launch",
    description: "Deploy with tracking and team alignment.",
    icon: "Rocket",
  },
  {
    step: "04",
    title: "Optimize",
    description: "Refine based on performance and feedback.",
    icon: "LineChart",
  },
] as const;
