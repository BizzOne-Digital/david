import {
  aboutCopy,
  consultingCopy,
  contactCopy,
  DEMO_CTA_HREF,
  DEMO_CTA_LABEL,
  futureFuelCopy,
  homepageCopy,
  solutionsPageCopy,
} from "@/lib/content/revisions";
import { featuredProductsPage, productsFaqs } from "@/lib/content/products-page";

export function getSiteSettingsSyncFields() {
  return {
    businessName: "Rethink Automotive Inc.",
    contactEmail: "contact@rethinkautomotive.com",
    contactPhone: "(615) 571-9900",
    defaultSeoTitle: "Rethink Automotive Inc. | Dealership Marketing Solutions",
    defaultSeoDescription:
      "AI-powered targeting, follow-up and service-to-sales for modern dealerships.",
    headerCtaLabel: DEMO_CTA_LABEL,
    headerCtaUrl: DEMO_CTA_HREF,
    contactForPricingLabel: DEMO_CTA_LABEL,
    footerContent: {
      brandStatement:
        "Creative + Campaign + AI + Dashboard + Advisory for dealership growth.",
      copyright: `© ${new Date().getFullYear()} Rethink Automotive Inc. All rights reserved.`,
    },
    navigation: [
      { label: "Home", href: "/", order: 0, isActive: true },
      { label: "Solutions", href: "/products", order: 1, isActive: true },
      { label: "Consulting", href: "/consulting", order: 2, isActive: true },
      { label: "Future Fuel", href: "/future-fuel", order: 3, isActive: true },
      { label: "About Us", href: "/about", order: 4, isActive: true },
      { label: "Contact", href: "/contact", order: 5, isActive: true },
    ],
    homepageSections: [
      { sectionId: "hero", isVisible: true, order: 1 },
      { sectionId: "heroVideo", isVisible: true, order: 2 },
      { sectionId: "rethinkInAction", isVisible: true, order: 3 },
      { sectionId: "ghostShopper", isVisible: true, order: 4 },
      { sectionId: "fourCapabilities", isVisible: true, order: 5 },
      { sectionId: "dealerIntelligence", isVisible: true, order: 6 },
      { sectionId: "finalDemoCta", isVisible: true, order: 7 },
    ],
  };
}

export function getAdminSeedPages() {
  return [
    {
      pageSlug: "home",
      pageTitle: "Homepage",
      seoTitle: "Rethink Automotive Inc. | Dealership Marketing Solutions",
      seoDescription: homepageCopy.hero.supporting,
      sections: [
        {
          id: "hero",
          type: "hero",
          eyebrow: homepageCopy.hero.signature,
          title: homepageCopy.hero.headline,
          subtitle: homepageCopy.hero.supporting,
          ctaLabel: DEMO_CTA_LABEL,
          ctaUrl: DEMO_CTA_HREF,
          isVisible: true,
          order: 1,
        },
        {
          id: "dealerIntelligence",
          type: "text",
          eyebrow: homepageCopy.dealerIntelligence.eyebrow,
          title: homepageCopy.dealerIntelligence.headline,
          content: homepageCopy.dealerIntelligence.copy,
          isVisible: true,
          order: 2,
        },
        {
          id: "rethinkInAction",
          type: "process",
          title: homepageCopy.rethinkInAction.headline,
          subtitle: homepageCopy.rethinkInAction.tagline,
          items: homepageCopy.rethinkInAction.steps.map((step) => ({
            step: step.label,
            description: step.description,
          })),
          isVisible: true,
          order: 3,
        },
        {
          id: "capabilities",
          type: "list",
          title: homepageCopy.capabilities.headline,
          items: homepageCopy.capabilities.items.map((item) => ({
            title: item.title,
            description: item.description,
          })),
          isVisible: true,
          order: 4,
        },
        {
          id: "finalCta",
          type: "conversion",
          title: homepageCopy.finalCta.headline,
          ctaLabel: DEMO_CTA_LABEL,
          ctaUrl: DEMO_CTA_HREF,
          isVisible: true,
          order: 5,
        },
      ],
    },
    {
      pageSlug: "products",
      pageTitle: "Solutions",
      seoTitle: "Solutions | Rethink Automotive Inc.",
      seoDescription: solutionsPageCopy.subhead,
      sections: [
        {
          id: "intro",
          type: "text",
          eyebrow: solutionsPageCopy.eyebrow,
          title: solutionsPageCopy.headline,
          subtitle: solutionsPageCopy.subhead,
          isVisible: true,
          order: 1,
        },
      ],
      faqs: productsFaqs.map((faq, index) => ({
        question: faq.question,
        answer: faq.answer,
        order: index,
      })),
    },
    {
      pageSlug: "consulting",
      pageTitle: "Consulting",
      seoTitle: "Consulting | Rethink Automotive Inc.",
      seoDescription: consultingCopy.intro,
      sections: [
        {
          id: "intro",
          type: "text",
          eyebrow: "Consulting Services",
          title: consultingCopy.headline,
          content: consultingCopy.intro,
          ctaLabel: consultingCopy.secondaryCta,
          ctaUrl: "/contact",
          isVisible: true,
          order: 1,
        },
        {
          id: "services",
          type: "list",
          title: "What We Help With",
          items: consultingCopy.services.map((service) => ({
            title: service.title,
            description: service.description,
          })),
          isVisible: true,
          order: 2,
        },
      ],
    },
    {
      pageSlug: "future-fuel",
      pageTitle: "Future Fuel",
      seoTitle: "Future Fuel | Rethink Automotive Inc.",
      seoDescription: futureFuelCopy.copy,
      sections: [
        {
          id: "intro",
          type: "text",
          eyebrow: "Future Fuel Intelligence",
          title: futureFuelCopy.headline,
          content: futureFuelCopy.copy,
          isVisible: true,
          order: 1,
        },
        {
          id: "bullets",
          type: "list",
          title: "Focus Areas",
          items: futureFuelCopy.bullets.map((bullet) => ({
            title: bullet,
            description: "",
          })),
          isVisible: true,
          order: 2,
        },
      ],
    },
    {
      pageSlug: "about",
      pageTitle: "About Us",
      seoTitle: "About Us | Rethink Automotive Inc.",
      seoDescription: aboutCopy.paragraphs[0],
      sections: [
        {
          id: "intro",
          type: "text",
          eyebrow: "About Rethink Automotive",
          title: aboutCopy.headline,
          isVisible: true,
          order: 1,
        },
        {
          id: "story",
          type: "text",
          title: "Our Story",
          content: aboutCopy.paragraphs.join("\n\n"),
          isVisible: true,
          order: 2,
        },
        {
          id: "philosophy",
          type: "text",
          title: "Philosophy",
          content: aboutCopy.philosophy,
          isVisible: true,
          order: 3,
        },
      ],
    },
    {
      pageSlug: "contact",
      pageTitle: "Contact",
      seoTitle: "Contact | Rethink Automotive Inc.",
      sections: [
        {
          id: "intro",
          type: "text",
          eyebrow: "Request a Demo",
          title: contactCopy.headline,
          content: contactCopy.subhead,
          isVisible: true,
          order: 1,
        },
      ],
    },
    {
      pageSlug: "services",
      pageTitle: "Services",
      seoTitle: "Services | Rethink Automotive Inc.",
      sections: [],
    },
  ] as const;
}

export function getSeedProductsFromFeatured() {
  return featuredProductsPage.map((product, index) => ({
    name: product.name,
    slug: product.slug,
    shortDescription: product.description,
    fullDescription: product.description,
    features: [...product.features],
    benefits: [] as string[],
    showPricing: false,
    contactForPricing: true,
    purchaseMode: "contact_for_pricing" as const,
    isFeatured: index < 3,
    isActive: true,
    displayOrder: index,
    ctaLabel: product.cta,
    ctaUrl: `/products/${product.slug}`,
    isPlaceholder: true,
    seoTitle: `${product.name} | Rethink Automotive`,
    seoDescription: product.description,
    categoryName:
      product.slug === "email-campaign-engine" ?
        "Email Marketing"
      : product.slug === "ai-lead-response-suite" ?
        "AI Solutions"
      : undefined,
  }));
}
