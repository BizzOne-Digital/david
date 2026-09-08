"use client";

import { useState } from "react";
import { ArrowRight, Mail, Minus, Phone, Plus } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { DemoCtaButton } from "@/components/ui/ConversionCta";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { SectionBackground, GlassCard } from "@/components/sections/SectionBackground";
import { ContactStrategyForm } from "./ContactStrategyForm";
import { contactCopy, homepageCopy } from "@/lib/content/revisions";
import { contactFaqs } from "@/lib/content/contact-page";

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

export function ContactPageContent() {
  const { settings } = useSiteSettings();
  const displayFaqs = [...contactFaqs];

  return (
    <>
      <SectionBackground overlay="dark" className="relative min-h-[50vh]">
        <div className="container mx-auto px-4 pb-12 pt-28 md:pt-32">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <ScrollReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-electric">
                Request a Demo
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="mt-5 font-heading text-4xl font-bold uppercase leading-[1.1] md:text-5xl">
                {contactCopy.headline}
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-6 text-lg text-silver">{contactCopy.subhead}</p>
            </ScrollReveal>
          </div>
        </div>
      </SectionBackground>

      <SectionBackground overlay="dark" className="py-16 md:py-24">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ScrollReveal>
              <ContactStrategyForm />
            </ScrollReveal>
          </div>

          <div className="space-y-6">
            <ScrollReveal delay={0.1}>
              <GlassCard className="border-white/10">
                <h3 className="font-heading text-lg font-semibold">Contact</h3>
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
          </div>
        </div>
      </SectionBackground>

      <SectionBackground overlay="dark" className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-10">
            <ContactFaqAccordion faqs={displayFaqs} />
          </div>
        </div>
      </SectionBackground>

      <SectionBackground overlay="dark" className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <h2 className="font-heading text-3xl font-bold uppercase md:text-4xl">
              {homepageCopy.finalCta.headline}
            </h2>
            <div className="mt-8">
              <DemoCtaButton size="lg" />
            </div>
          </div>
        </div>
      </SectionBackground>
    </>
  );
}
