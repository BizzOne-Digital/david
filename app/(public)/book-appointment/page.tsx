import type { Metadata } from "next";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { AppointmentForm } from "@/components/forms/AppointmentForm";

export const metadata: Metadata = {
  title: "Book Appointment",
  description: "Schedule a strategy call with Rethink Automotive.",
};

export default function BookAppointmentPage() {
  return (
    <section className="container mx-auto max-w-3xl px-4 py-16 md:py-24">
      <TextReveal
        as="h1"
        text="Book a Strategy Call"
        className="text-4xl font-bold md:text-5xl"
      />
      <ScrollReveal delay={0.1}>
        <p className="mt-4 text-silver">
          Share your availability and we&apos;ll confirm a time that works for your team.
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <div className="mt-10 glass rounded-2xl p-8">
          <AppointmentForm />
        </div>
      </ScrollReveal>
    </section>
  );
}
