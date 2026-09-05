export interface ServiceDetail {
  id: string;
  title: string;
  slug: string;
  icon: string;
  eyebrow: string;
  heroGradientText: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  deliverables: string[];
  processSteps: { title: string; description: string }[];
  outcomes: string[];
  faqs: { question: string; answer: string }[];
  heroBackground: string;
  overviewBackground: string;
  isFeatured: boolean;
  ctaLabel: string;
  isPlaceholder: true;
}

export const SERVICE_DETAIL_BACKGROUNDS = {
  hero: "/images/sections/contact/hero-bg.jpg",
  overview: "/images/sections/contact/form-bg.jpg",
  process: "/images/sections/process-bg.jpg",
  outcomes: "/images/sections/services/funnel-bg.jpg",
  faq: "/images/sections/contact/faq-bg.jpg",
  cta: "/images/sections/contact/cta-bg.jpg",
} as const;

export const serviceDetails: ServiceDetail[] = [
  {
    id: "svc-email",
    title: "Email Marketing Operations",
    slug: "email-marketing-operations",
    icon: "Send",
    eyebrow: "Email Marketing",
    heroGradientText: "Operations.",
    shortDescription:
      "End-to-end email campaign management built for automotive retail audiences.",
    fullDescription:
      "Replace with client-approved overview. Describe how your team plans, builds, deploys, and optimizes dealership email programs — from list strategy to reporting.",
    features: [
      "Campaign planning and calendar management",
      "Creative production and template development",
      "Segmentation and audience targeting",
      "Deliverability and list hygiene support",
      "Performance reporting for leadership",
      "Ongoing optimization and testing",
    ],
    deliverables: [
      "Monthly campaign schedule",
      "Branded email templates",
      "Audience segmentation framework",
      "Performance dashboards",
    ],
    processSteps: [
      {
        title: "Audit & Plan",
        description: "Review current email performance, audiences, and goals.",
      },
      {
        title: "Build & Configure",
        description: "Set up templates, journeys, and tracking aligned to your CRM.",
      },
      {
        title: "Launch & Monitor",
        description: "Deploy campaigns with quality checks and live monitoring.",
      },
      {
        title: "Optimize",
        description: "Refine based on opens, clicks, appointments, and sales feedback.",
      },
    ],
    outcomes: [
      "Consistent email presence without overloading internal teams",
      "Clear reporting tied to dealership goals",
      "Stronger nurture paths for leads and customers",
    ],
    faqs: [
      {
        question: "Do you write the email copy?",
        answer:
          "Replace with client-approved scope. Outline whether copy, design, or both are included.",
      },
      {
        question: "Can you work with our existing email platform?",
        answer:
          "Replace with supported platforms and integration approach.",
      },
    ],
    heroBackground: SERVICE_DETAIL_BACKGROUNDS.hero,
    overviewBackground: SERVICE_DETAIL_BACKGROUNDS.overview,
    isFeatured: true,
    ctaLabel: "Discuss Email Goals",
    isPlaceholder: true,
  },
  {
    id: "svc-ai-lead",
    title: "AI Lead Engagement",
    slug: "ai-lead-engagement",
    icon: "Cpu",
    eyebrow: "AI Engagement",
    heroGradientText: "Lead Engagement.",
    shortDescription:
      "Intelligent workflows that help your team respond faster and stay connected.",
    fullDescription:
      "Replace with client-approved overview. Explain how AI-assisted engagement supports faster follow-up, consistent messaging, and better handoffs to your sales team.",
    features: [
      "Faster first-response workflows",
      "Lead qualification support",
      "Appointment scheduling hooks",
      "CRM-aware conversation routing",
      "Human handoff when needed",
      "Activity logging for accountability",
    ],
    deliverables: [
      "Engagement workflow design",
      "Response templates and guardrails",
      "Integration configuration",
      "Team training and launch support",
    ],
    processSteps: [
      {
        title: "Map the Journey",
        description: "Identify lead sources, response expectations, and handoff rules.",
      },
      {
        title: "Design Workflows",
        description: "Build AI-assisted paths that match your dealership voice.",
      },
      {
        title: "Integrate & Test",
        description: "Connect CRM, website, and communication channels safely.",
      },
      {
        title: "Launch & Refine",
        description: "Monitor conversations and tune for quality and conversion.",
      },
    ],
    outcomes: [
      "Faster engagement when shoppers raise their hand",
      "More consistent follow-up across channels",
      "Better visibility into lead activity",
    ],
    faqs: [
      {
        question: "Does AI replace our sales team?",
        answer:
          "Replace with client-approved positioning. AI supports speed and consistency; your team stays in control of relationships.",
      },
      {
        question: "What channels are supported?",
        answer:
          "Replace with supported channels such as email, SMS, or web chat.",
      },
    ],
    heroBackground: "/images/sections/services/integration-bg.jpg",
    overviewBackground: "/images/sections/contact/what-next-bg.jpg",
    isFeatured: true,
    ctaLabel: "Explore AI Engagement",
    isPlaceholder: true,
  },
  {
    id: "svc-strategy",
    title: "Marketing Strategy",
    slug: "marketing-strategy",
    icon: "TrendingUp",
    eyebrow: "Strategy",
    heroGradientText: "Marketing Strategy.",
    shortDescription:
      "Dealership-focused planning aligned to your inventory, market, and sales goals.",
    fullDescription:
      "Replace with client-approved overview. Cover discovery, roadmap development, channel planning, and KPI alignment for dealership marketing leaders.",
    features: [
      "Market and competitive review",
      "Audience and messaging framework",
      "Channel and budget planning",
      "KPI and reporting structure",
      "Quarterly roadmap development",
      "Executive-ready recommendations",
    ],
    deliverables: [
      "Strategy roadmap document",
      "Channel priority matrix",
      "Messaging guidelines",
      "Measurement plan",
    ],
    processSteps: [
      {
        title: "Discover",
        description: "Interview stakeholders and review current marketing performance.",
      },
      {
        title: "Analyze",
        description: "Assess market, inventory, and funnel gaps.",
      },
      {
        title: "Plan",
        description: "Build a prioritized roadmap with clear milestones.",
      },
      {
        title: "Align",
        description: "Present recommendations and align teams on next steps.",
      },
    ],
    outcomes: [
      "Clear priorities instead of scattered campaigns",
      "Leadership visibility into marketing direction",
      "A practical plan your team can execute",
    ],
    faqs: [
      {
        question: "How long does a strategy engagement take?",
        answer:
          "Replace with typical timelines based on dealership size and scope.",
      },
      {
        question: "Do you also execute the plan?",
        answer:
          "Replace with how strategy connects to implementation services.",
      },
    ],
    heroBackground: "/images/sections/services/funnel-bg.jpg",
    overviewBackground: SERVICE_DETAIL_BACKGROUNDS.overview,
    isFeatured: true,
    ctaLabel: "Plan Your Strategy",
    isPlaceholder: true,
  },
  {
    id: "svc-campaign",
    title: "Campaign Management",
    slug: "campaign-management",
    icon: "Megaphone",
    eyebrow: "Campaigns",
    heroGradientText: "Campaign Management.",
    shortDescription:
      "Production, deployment, and optimization of multi-channel marketing programs.",
    fullDescription:
      "Replace with client-approved overview. Describe end-to-end campaign execution across email, digital, and supporting channels for dealership promotions and always-on programs.",
    features: [
      "Campaign briefs and creative direction",
      "Multi-channel deployment",
      "Launch QA and tracking setup",
      "Budget and timeline coordination",
      "In-flight optimization",
      "Post-campaign reporting",
    ],
    deliverables: [
      "Campaign production assets",
      "Launch checklist and tracking",
      "Weekly or monthly status updates",
      "Results summary reports",
    ],
    processSteps: [
      {
        title: "Brief",
        description: "Define goals, offer, audience, and timeline.",
      },
      {
        title: "Produce",
        description: "Build creative, copy, and channel assets.",
      },
      {
        title: "Deploy",
        description: "Launch with tracking, QA, and team coordination.",
      },
      {
        title: "Report",
        description: "Measure results and capture learnings for the next cycle.",
      },
    ],
    outcomes: [
      "Campaigns launched on time with fewer internal bottlenecks",
      "Better coordination across marketing and sales",
      "Repeatable process for future promotions",
    ],
    faqs: [
      {
        question: "What types of campaigns do you manage?",
        answer:
          "Replace with campaign types such as sales events, service promotions, and nurture programs.",
      },
      {
        question: "Can you support seasonal promotions?",
        answer:
          "Replace with how seasonal planning and production works.",
      },
    ],
    heroBackground: SERVICE_DETAIL_BACKGROUNDS.hero,
    overviewBackground: "/images/sections/contact/faq-bg.jpg",
    isFeatured: false,
    ctaLabel: "Discuss Campaigns",
    isPlaceholder: true,
  },
  {
    id: "svc-crm",
    title: "CRM & Integration Support",
    slug: "crm-integration-support",
    icon: "Link2",
    eyebrow: "Integrations",
    heroGradientText: "Integration Support.",
    shortDescription:
      "Connect your marketing systems with the tools your dealership already uses.",
    fullDescription:
      "Replace with client-approved overview. Explain how you connect CRM, DMS, website, email, SMS, and analytics so data flows cleanly between systems.",
    features: [
      "CRM and DMS connection planning",
      "Lead routing and field mapping",
      "Website and form integrations",
      "Email and SMS platform setup",
      "Analytics and tracking alignment",
      "Documentation and team handoff",
    ],
    deliverables: [
      "Integration architecture overview",
      "Field mapping documentation",
      "Testing and validation checklist",
      "Support during launch window",
    ],
    processSteps: [
      {
        title: "Assess",
        description: "Inventory current tools, data flows, and gaps.",
      },
      {
        title: "Design",
        description: "Define integrations, mappings, and ownership.",
      },
      {
        title: "Implement",
        description: "Configure connections and validate data quality.",
      },
      {
        title: "Support",
        description: "Monitor launch and resolve issues quickly.",
      },
    ],
    outcomes: [
      "Fewer manual handoffs between marketing and sales",
      "Cleaner lead data in your CRM",
      "Better visibility across the customer journey",
    ],
    faqs: [
      {
        question: "Which CRMs do you support?",
        answer:
          "Replace with supported CRM platforms and integration approach.",
      },
      {
        question: "Do you handle ongoing maintenance?",
        answer:
          "Replace with support model for updates and troubleshooting.",
      },
    ],
    heroBackground: "/images/sections/services/integration-bg.jpg",
    overviewBackground: SERVICE_DETAIL_BACKGROUNDS.overview,
    isFeatured: false,
    ctaLabel: "Review Integrations",
    isPlaceholder: true,
  },
  {
    id: "svc-analytics",
    title: "Analytics & Reporting",
    slug: "analytics-reporting",
    icon: "LineChart",
    eyebrow: "Analytics",
    heroGradientText: "Reporting.",
    shortDescription:
      "Clear visibility into performance with reporting designed for decision-makers.",
    fullDescription:
      "Replace with client-approved overview. Describe dashboards, KPI tracking, and reporting cadences that help dealership leaders understand what's working.",
    features: [
      "KPI framework design",
      "Marketing performance dashboards",
      "Lead and appointment tracking views",
      "Campaign-level reporting",
      "Executive summary reports",
      "Recommendations based on trends",
    ],
    deliverables: [
      "Reporting dashboard setup",
      "KPI definitions document",
      "Monthly or weekly report templates",
      "Insight summaries for leadership",
    ],
    processSteps: [
      {
        title: "Define KPIs",
        description: "Align on the metrics that matter to your dealership.",
      },
      {
        title: "Connect Data",
        description: "Pull from email, ads, CRM, and website sources.",
      },
      {
        title: "Visualize",
        description: "Build dashboards leaders can actually use.",
      },
      {
        title: "Review",
        description: "Share insights and recommend next actions.",
      },
    ],
    outcomes: [
      "Less guesswork about marketing performance",
      "Faster decisions with shared visibility",
      "Continuous improvement based on data",
    ],
    faqs: [
      {
        question: "What data sources can you report on?",
        answer:
          "Replace with supported platforms and data connections.",
      },
      {
        question: "How often are reports delivered?",
        answer:
          "Replace with reporting cadence options.",
      },
    ],
    heroBackground: "/images/sections/services/funnel-bg.jpg",
    overviewBackground: "/images/sections/contact/what-next-bg.jpg",
    isFeatured: false,
    ctaLabel: "Improve Visibility",
    isPlaceholder: true,
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return serviceDetails.find((service) => service.slug === slug);
}

export function getRelatedServices(slug: string, limit = 3): ServiceDetail[] {
  return serviceDetails.filter((service) => service.slug !== slug).slice(0, limit);
}
