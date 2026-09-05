import type { Metadata } from "next";
import { TextReveal } from "@/components/animations/TextReveal";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CheckoutForm } from "@/components/forms/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Rethink Automotive order.",
};

export default function CheckoutPage() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <TextReveal as="h1" text="Checkout" className="text-4xl font-bold md:text-5xl" />
      <ScrollReveal delay={0.1}>
        <p className="mt-4 text-silver">
          Review your order and submit billing details. Our team will follow up to finalize payment if required.
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <div className="mt-10">
          <CheckoutForm />
        </div>
      </ScrollReveal>
    </section>
  );
}
