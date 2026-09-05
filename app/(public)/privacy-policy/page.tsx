import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Rethink Automotive privacy policy.",
};

const sections = [
  {
    title: "Information We Collect",
    body: "Describe what personal information you collect from website visitors, customers, and appointment requests.",
  },
  {
    title: "How We Use Information",
    body: "Explain how collected data is used for marketing, support, and service delivery.",
  },
  {
    title: "Data Sharing",
    body: "List third-party services and circumstances under which data may be shared.",
  },
  {
    title: "Your Rights",
    body: "Outline user rights regarding access, correction, and deletion of personal data.",
  },
  {
    title: "Contact",
    body: "Provide contact details for privacy-related inquiries.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <article className="container mx-auto max-w-3xl px-4 py-16 md:py-24">
      <h1 className="font-heading text-4xl font-bold">Privacy Policy</h1>
      <p className="mt-4 text-sm text-silver">Last updated: Add date</p>
      <div className="prose prose-invert mt-12 space-y-10">
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
