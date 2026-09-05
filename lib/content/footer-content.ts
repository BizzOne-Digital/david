export const FOOTER_BACKGROUND = "/images/sections/footer-bg.jpg";

type FooterLink = {
  id: string;
  label: string;
  href: string;
};

export const footerExploreLinks: readonly FooterLink[] = [
  { id: "explore-home", label: "Home", href: "/" },
  { id: "explore-about", label: "About", href: "/about" },
  { id: "explore-products", label: "Products", href: "/products" },
  { id: "explore-services", label: "Services", href: "/services" },
  { id: "explore-contact", label: "Contact", href: "/contact" },
];

export const footerSolutionLinks: readonly FooterLink[] = [
  { id: "solution-ai-marketing", label: "AI Marketing", href: "/services/marketing-strategy" },
  {
    id: "solution-email-marketing",
    label: "Email Marketing",
    href: "/services/email-marketing-operations",
  },
  {
    id: "solution-lead-engagement",
    label: "Lead Engagement",
    href: "/services/ai-lead-engagement",
  },
  {
    id: "solution-campaign-strategy",
    label: "Campaign Strategy",
    href: "/services/campaign-management",
  },
];

export const footerLegalLinks: readonly FooterLink[] = [
  { id: "legal-privacy", label: "Privacy Policy", href: "/privacy-policy" },
  { id: "legal-terms", label: "Terms & Conditions", href: "/terms" },
];
