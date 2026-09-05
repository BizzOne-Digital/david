import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Rethink Automotive cookie policy.",
};

const sections = [
  {
    title: "What Are Cookies",
    body: "Explain cookies and similar tracking technologies used on this site.",
  },
  {
    title: "Cookies We Use",
    body: "List essential, analytics, and marketing cookies with purpose and duration.",
  },
  {
    title: "Managing Cookies",
    body: "Describe how users can control cookie preferences via browser settings or your consent banner.",
  },
  {
    title: "Updates",
    body: "Note that this policy may be updated periodically.",
  },
];

export default function CookiePolicyPage() {
  return (
    <article className="container mx-auto max-w-3xl px-4 py-16 md:py-24">
      <h1 className="font-heading text-4xl font-bold">Cookie Policy</h1>
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
