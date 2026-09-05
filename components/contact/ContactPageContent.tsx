"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Calendar,
  Mail,
  Minus,
  Phone,
  Plus,
} from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { getLucideIcon } from "@/lib/utils/icons";
import { DEFAULT_LOGO } from "@/components/layout/Logo";
import {
  SectionBackground,
  GlassCard,
  GradientText,
} from "@/components/sections/SectionBackground";
import { ContactStrategyForm } from "./ContactStrategyForm";
import {
  CONTACT_BACKGROUNDS,
  contactProcessSteps,
  whatHappensNextSteps,
  contactFaqs,
} from "@/lib/content/contact-page";
import type { PageSection } from "@/types";

interface ContactPageContentProps {
  introSection?: PageSection;
  faqs?: { question: string; answer: string; order: number }[];
}

function ContactFaqAccordion({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={faq.question}
            className="overflow-hidden rounded-xl border border-cyan/20 bg-black/40 backdrop-blur-xl"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6"
              aria-expanded={isOpen}
            >
              <span className="font-medium">{faq.question}</span>
              {isOpen ? (
                <Minus className="h-4 w-4 shrink-0 text-cyan" />
              ) : (
                <Plus className="h-4 w-4 shrink-0 text-cyan" />
              )}
            </button>
            {isOpen && (
              <div className="border-t border-white/10 px-5 pb-4 md:px-6">
                <p className="text-sm leading-relaxed text-silver">{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function ContactPageContent({
  introSection,
  faqs,
}: ContactPageContentProps) {
  const { settings } = useSiteSettings();
  const displayFaqs: { question: string; answer: string }[] =
    faqs?.length ?
      faqs
        .sort((a, b) => a.order - b.order)
        .map(({ question, answer }) => ({ question, answer }))
    : [...contactFaqs];

  return (
    <>
      {/* Hero */}
      <SectionBackground
        src={CONTACT_BACKGROUNDS.hero}
        overlay="left"
        position="object-cover object-right"
        className="relative min-h-[70vh]"
      >
        <div className="pointer-events-none absolute right-6 top-1/3 hidden text-[10px] uppercase tracking-[0.35em] text-silver/40 xl:block">
          Drive A Brighter Tomorrow
        </div>
        <div className="pointer-events-none absolute right-6 top-1/2 hidden text-[10px] leading-loose text-silver/40 xl:block">
          <span className="block uppercase tracking-[0.3em]">People</span>
          <span className="block uppercase tracking-[0.3em]">Technology</span>
          <span className="block uppercase tracking-[0.3em]">Growth</span>
        </div>

        <div className="container mx-auto px-4 pb-12 pt-28 md:pt-32">
          <div className="max-w-2xl">
            <ScrollReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-electric">
                Connect With Our Team
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="mt-5 font-heading text-4xl font-bold leading-[1.1] md:text-5xl lg:text-6xl">
                {introSection?.title ? (
                  introSection.title
                ) : (
                  <>
                    Let&apos;s Rethink What&apos;s{" "}
                    <GradientText>Possible.</GradientText>
                  </>
                )}
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-6 text-lg text-silver">
                {introSection?.content ??
                  "Tell us about your dealership, your goals, and where you want to go next."}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </SectionBackground>

      {/* Form + Sidebar */}
      <SectionBackground
        src={CONTACT_BACKGROUNDS.form}
        overlay="dark"
        position="object-cover object-center"
        className="py-16 md:py-24"
      >
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ScrollReveal>
              <ContactStrategyForm />
            </ScrollReveal>
          </div>

          <div className="space-y-6">
            <ScrollReveal delay={0.1}>
              <GlassCard className="border-violet/30 glow-violet">
                <h3 className="font-heading text-lg font-semibold">Get In Touch</h3>
                <div className="mt-6 space-y-4">
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    className="group flex items-center justify-between rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm transition-colors hover:border-cyan/40"
                  >
                    <span className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-cyan" />
                      {settings.contactEmail}
                    </span>
                    <ArrowRight className="h-4 w-4 text-silver group-hover:text-cyan" />
                  </a>
                  <a
                    href={`tel:${settings.contactPhone.replace(/\D/g, "")}`}
                    className="group flex items-center justify-between rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm transition-colors hover:border-cyan/40"
                  >
                    <span className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-cyan" />
                      {settings.contactPhone}
                    </span>
                    <ArrowRight className="h-4 w-4 text-silver group-hover:text-cyan" />
                  </a>
                </div>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <GlassCard className="border-cyan/30">
                <h3 className="font-heading text-lg font-semibold">
                  A Simple Process.{" "}
                  <span className="text-gradient">Big Possibilities.</span>
                </h3>
                <div className="relative mt-8 space-y-8 pl-4">
                  <div
                    className="absolute bottom-2 left-[1.35rem] top-2 w-px bg-gradient-to-b from-cyan via-violet to-magenta"
                    aria-hidden
                  />
                  {contactProcessSteps.map((item) => {
                    const Icon = getLucideIcon(item.icon);
                    return (
                      <div key={item.step} className="relative flex gap-4">
                        <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-brand">
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan">
                            {item.title}
                          </p>
                          <p className="mt-1 text-sm text-silver">{item.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-8 text-[10px] uppercase tracking-[0.25em] text-silver/60">
                  Dealerships · People · Possibilities
                </p>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </SectionBackground>

      {/* What Happens Next */}
      <SectionBackground
        src={CONTACT_BACKGROUNDS.whatNext}
        overlay="left"
        position="object-cover object-right"
        className="py-24 md:py-32"
      >
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-2 lg:items-center">
          <div className="max-w-xl">
            <ScrollReveal>
              <h2 className="font-heading text-3xl font-bold md:text-4xl">
                What Happens Next?
              </h2>
              <p className="mt-3 text-lg text-silver">
                A focused conversation. Real opportunities.
              </p>
            </ScrollReveal>
            <div className="mt-10 space-y-8">
              {whatHappensNextSteps.map((step, index) => (
                <ScrollReveal key={step.step} delay={index * 0.08}>
                  <div className="flex gap-5">
                    <span className="font-mono text-2xl font-bold text-gradient">
                      {step.step}
                    </span>
                    <div>
                      <h3 className="font-heading text-base font-semibold uppercase tracking-wider">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-silver">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
          <div className="relative hidden lg:block" aria-hidden>
            <p className="absolute right-0 top-8 text-[10px] uppercase tracking-[0.3em] text-silver/40">
              Ideas · Technology · People · Growth
            </p>
            <p className="absolute bottom-8 right-0 text-[10px] uppercase tracking-[0.25em] text-silver/40">
              Same Roads. Brighter Destinations.
            </p>
          </div>
        </div>
      </SectionBackground>

      {/* FAQ */}
      <SectionBackground
        src={CONTACT_BACKGROUNDS.faq}
        overlay="dark"
        position="object-cover object-center"
        className="py-24 md:py-32"
      >
        <div className="container mx-auto px-4">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="max-w-sm text-sm text-silver">
              <span className="font-semibold uppercase tracking-wider text-white">
                Still have questions?
              </span>{" "}
              Reach out anytime — we&apos;re here to help.
            </p>
          </div>
          <ContactFaqAccordion faqs={displayFaqs} />
        </div>
      </SectionBackground>

      {/* Bottom CTA */}
      <SectionBackground
        src={CONTACT_BACKGROUNDS.cta}
        overlay="left"
        position="object-cover object-center"
        className="py-24 md:py-32"
      >
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[auto_1fr] lg:items-center">
          <ScrollReveal>
            <Image
              src={settings.logo || DEFAULT_LOGO}
              alt={settings.businessName}
              width={200}
              height={120}
              className="h-auto w-40 object-contain md:w-48"
            />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="max-w-2xl">
              <h2 className="font-heading text-3xl font-bold md:text-4xl lg:text-5xl">
                A Stronger Tomorrow{" "}
                <GradientText>Starts Here.</GradientText>
              </h2>
              <p className="mt-4 text-lg text-silver">
                Let&apos;s build what&apos;s next — together.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <MagneticButton href={settings.headerCtaUrl}>
                  <Calendar className="mr-1 h-4 w-4" />
                  {settings.headerCtaLabel}
                </MagneticButton>
                <Button asChild variant="outline" className="border-white/30 uppercase tracking-wider">
                  <Link href={`mailto:${settings.contactEmail}`}>
                    Email Us
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </SectionBackground>
    </>
  );
}
