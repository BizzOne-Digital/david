import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Rethink Automotive terms of service.",
};

const sections = [
  {
    title: "Acceptance of Terms",
    body: "By using this website and our services, you agree to these terms.",
  },
  {
    title: "Services",
    body: "Describe the scope of marketing services, products, and digital offerings provided.",
  },
  {
    title: "Payment & Billing",
    body: "Outline payment terms, invoicing, refunds, and cancellation policies.",
  },
  {
    title: "Intellectual Property",
    body: "Clarify ownership of content, trademarks, and deliverables.",
  },
  {
    title: "Limitation of Liability",
    body: "Standard liability limitations — have legal counsel review before launch.",
  },
];

export default function TermsPage() {
  return (
    <article className="container mx-auto max-w-3xl px-4 py-16 md:py-24">
      <h1 className="font-heading text-4xl font-bold">Terms of Service</h1>
      <p className="mt-4 text-sm text-silver">Last updated: Add date</p>
      <div className="mt-12 space-y-10">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-heading text-xl font-semibold">{section.title}</h2>
            <p className="mt-3 text-silver">{section.body}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
