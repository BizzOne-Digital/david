/** September 2026 website revision copy — demo-first conversion strategy */

export const DEMO_CTA_LABEL = "Request Demo";
export const DEMO_CTA_HREF = "/contact";
export const SECONDARY_CTA_LABEL = "See How It Works";
export const SECONDARY_CTA_HREF = "/how-it-works";

export const demoConfirmationMessage =
  "You've taken the first step. Let's find what your dealership should rethink.";

export const homepageCopy = {
  hero: {
    headline: "You're Sitting on Deals You're Not Closing.",
    signature: "I'm not lion…",
    supporting:
      "The opportunities are already in your database, website traffic, service lane and follow-up. Rethink Automotive helps you find them, engage them and turn more of them into real sales conversations.",
  },
  heroVideo: {
    src: "/images/Jun_22__0247_33s_202506220550_0r2rl.mp4",
    poster: "/images/hero-bg.jpg",
  },
  dealerIntelligence: {
    eyebrow: "Dealer Intelligence",
    headline: "Dealer Intelligence That Sells.",
    copy: "AI-powered targeting, follow-up and service-to-sales conversion built to capture the opportunities already inside your dealership — with dealer-controlled dashboards and campaigns designed around measurable action.",
  },
  rethinkInAction: {
    headline: "Watch One Missed Lead Become a Real Opportunity.",
    tagline:
      "Rethink keeps the opportunity moving while management keeps visibility and control.",
    steps: [
      { label: "New Lead", description: "A qualified opportunity enters your pipeline.", icon: "UserPlus" },
      { label: "AI Engages", description: "Intelligent follow-up keeps the conversation alive.", icon: "Bot" },
      { label: "Appointment", description: "Interest moves toward a scheduled conversation.", icon: "Calendar" },
      { label: "Opportunity", description: "Management sees progress and qualified handoff.", icon: "TrendingUp" },
    ],
  },
  capabilities: {
    headline: "Four Core Capabilities",
    items: [
      {
        title: "Smart Email Targeting",
        description:
          "Reach the right customers with the right message, inventory and reason to act.",
        icon: "Mail",
      },
      {
        title: "AI Follow-Up",
        description:
          "Persistent, intelligent engagement designed to keep qualified opportunities from disappearing.",
        icon: "Bot",
      },
      {
        title: "Dealer Control",
        description:
          "See campaigns, engagement and opportunities through management dashboard controls.",
        icon: "LayoutDashboard",
      },
      {
        title: "Service to Sales",
        description:
          "Identify service customers who may be ready for a replacement, upgrade or trade conversation.",
        icon: "Wrench",
      },
    ],
    ctaBlock:
      "Want to see what this looks like using dealership opportunities?",
    ctaLabel: "Request a Demo",
  },
  proof: {
    eyebrow: "Proof & Control",
    headline: "Where Is the Opportunity? Can We See It Working?",
    copy: "Owners and managers buy business outcomes, control and confidence. Rethink combines creative, campaign, AI, dashboard and advisory — with launch capability in as little as 3 days for applicable programs.",
    points: [
      "Where is the money/opportunity?",
      "How quickly can we launch?",
      "What does my team have to do?",
      "Can management see and control what is happening?",
      "How will we measure whether it works?",
      "What happens after the initial campaign?",
    ],
  },
  consultingTeaser: {
    eyebrow: "Consulting",
    headline: "The Campaign Is the Beginning, Not the End.",
    copy: "Rethink works with dealership leadership to identify missed opportunity, evaluate marketing performance, connect service and sales, and determine where the next profitable action should come from.",
    philosophy: "Analyze → Recommend → Execute → Measure → Rethink.",
  },
  futureFuelTeaser: {
    eyebrow: "Future Fuel",
    headline: "Don't Build an EV Strategy. Build a Future-Fuel Strategy.",
    copy: "EV. Hybrid. Plug-in hybrid. Alternative fuels. Emerging powertrains. Consumer demand and OEM direction are moving too quickly for one-size-fits-all thinking. Rethink helps dealerships understand which opportunities matter in their market and how to communicate them to the right customers.",
  },
  aboutTeaser: {
    headline: "We Built Rethink for Dealers Who Know Yesterday's Playbook Isn't Enough.",
    copy: "If yesterday's approach is no longer producing tomorrow's result — Rethink It.",
  },
  finalCta: {
    headline: "You're Already Sitting on the Opportunity. Let's Find It.",
  },
} as const;

export const consultingCopy = {
  headline:
    "More Than Marketing. More Than AI. A Better Way to Think About Dealer Growth.",
  intro:
    "Rethink Automotive works with dealership leadership to identify missed opportunity, evaluate marketing and follow-up performance, connect service and sales, understand changing consumer demand, and determine where the next profitable action should come from.",
  services: [
    {
      title: "Dealer Profitability Review",
      description: "Identify missed opportunities and areas requiring action.",
    },
    {
      title: "Marketing Performance Review",
      description:
        "Evaluate campaigns, vendor overlap, customer targeting and measurable return.",
    },
    {
      title: "Lead & Follow-Up Review",
      description:
        "Examine response, nurture, lost-lead and reactivation processes.",
    },
    {
      title: "Service-to-Sales Strategy",
      description:
        "Connect fixed operations customer signals to appropriate replacement opportunities.",
    },
    {
      title: "Future Fuel Strategy",
      description:
        "EV, hybrid, PHEV and emerging powertrain demand, inventory, education and local-market messaging.",
    },
    {
      title: "Dealer Technology / Vendor Review",
      description:
        "Help leadership determine what is producing value, what overlaps, and what may need to be rethought.",
    },
    {
      title: "Ongoing Growth Advisory",
      description:
        "Periodic management review of results, market changes and next actions.",
    },
  ],
  transition:
    "The first sale can be a marketing or AI product. The long-term relationship should become: Analyze → Recommend → Execute → Measure → Rethink.",
  secondaryCta: "Talk With a Rethink Advisor",
} as const;

export const futureFuelCopy = {
  headline: "Don't Build an EV Strategy. Build a Future-Fuel Strategy.",
  copy: "EV. Hybrid. Plug-in hybrid. Alternative fuels. Emerging powertrains. Consumer demand and OEM direction are moving too quickly for one-size-fits-all thinking. Rethink helps dealerships understand which opportunities matter in their market and how to communicate them to the right customers.",
  bullets: [
    "Local demand and powertrain opportunity",
    "New and used EV marketing strategy",
    "Hybrid/PHEV conquest and education",
    "Charging/fueling ownership education",
    "OEM/incentive and market intelligence",
    "Future-fuel service retention and service-to-sales",
  ],
  cta: "Request a Future Fuel Demo",
} as const;

export const aboutCopy = {
  headline:
    "We Built Rethink for Dealers Who Know Yesterday's Playbook Isn't Enough.",
  paragraphs: [
    "Rethink Automotive was created around a simple belief: dealerships do not need another vendor telling them to buy more technology. They need partners who understand automotive retail, recognize where opportunity is being missed, and can help turn insight into action.",
    "Our approach combines automotive experience, targeted marketing, AI-enabled follow-up, dealer-controlled technology and consultative analysis. We begin with practical solutions that can create opportunity now, then use the results to help dealership leadership determine what should be improved next.",
    "We are deliberately future-focused. Consumer behavior, artificial intelligence, vehicle powertrains, marketing channels and OEM strategies are changing quickly. Rethink continuously studies those changes so our dealer partners can make informed decisions instead of reacting after the market has moved.",
    "We do not believe every dealership needs the same solution. We believe in asking better questions, identifying the real problem and recommending the right action.",
  ],
  philosophy:
    "If yesterday's approach is no longer producing tomorrow's result — Rethink It.",
  closingHeadline: "Let's Find What Your Dealership Should Rethink.",
} as const;

export const contactCopy = {
  headline: "See What Your Dealership May Be Missing.",
  subhead:
    "Share your goals — we'll show you where opportunity may already exist in your store.",
  formTitle: "Request My Demo",
  submitLabel: "Request My Demo",
} as const;

export const solutionsPageCopy = {
  eyebrow: "Solutions",
  headline: "Solutions Built for Dealership Outcomes.",
  subhead:
    "Targeted email, AI follow-up and service-to-sales — focused on the opportunities already inside your dealership, with management visibility and measurable action.",
  featuredTitle: "Three Core Solutions",
} as const;

export const howItWorksPageCopy = {
  eyebrow: "How It Works",
  headline: "Watch One Missed Lead Become a Real Opportunity.",
  subhead:
    "See how Rethink moves a qualified lead from first contact to appointment and handoff—with management visibility at every step.",
} as const;

export const solutionsCopy = {
  targetedEmail: {
    slug: "email-campaign-engine",
    headline: "Stop Blasting. Start Targeting.",
    copy: "Filtered, opportunity-based email marketing built around the customer, inventory and dealership objective. Rethink helps create the audience, message and campaign — then measures what happens next.",
    bullets: [
      "Database activation and reactivation",
      "Conquest marketing",
      "Inventory-specific targeting",
      "Ownership/lifecycle campaigns",
      "Creative support and rapid deployment",
      "Campaign dashboard and results visibility",
    ],
    cta: "Request a Targeted Marketing Demo",
  },
  aiChaser: {
    slug: "ai-lead-response-suite",
    headline: "The Lead Should Not Die Because Your Team Got Busy.",
    copy: "AI-supported engagement helps keep conversations alive, responds quickly, nurtures interest and moves qualified customers toward an appointment — while management retains visibility.",
    bullets: [
      "Fast personalized engagement",
      "Persistent follow-up",
      "Appointment-oriented conversations",
      "Management dashboard controls",
      "Qualified handoff to dealership staff",
    ],
    cta: "See the AI Chaser Demo",
  },
  serviceToSales: {
    slug: "service-to-sales",
    headline: "Your Next Deal May Already Be in the Service Drive.",
    copy: "Rethink helps identify service customers whose repair, ownership or vehicle lifecycle signals may justify a sales conversation — then creates the communication and follow-up strategy to act on it.",
    cta: "Show Me Service-to-Sales",
  },
} as const;
