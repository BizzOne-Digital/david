"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  Minus,
  Plus,
} from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { DynamicLucideIcon } from "@/components/ui/DynamicLucideIcon";
import {
  SectionBackground,
  SectionHeading,
  GlassCard,
  GradientText,
} from "@/components/sections/SectionBackground";
import { RelatedServices } from "@/components/services/RelatedServices";
import {
  SERVICE_DETAIL_BACKGROUNDS,
  getRelatedServices,
  type ServiceDetail,
} from "@/lib/content/service-details";

interface ServiceDetailPageContentProps {
  service: ServiceDetail;
}

function ServiceDetailFaq({
  faqs,
}: {
  faqs: ServiceDetail["faqs"];
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

export function ServiceDetailPageContent({ service }: ServiceDetailPageContentProps) {
  const { settings } = useSiteSettings();
  const relatedServices = getRelatedServices(service.slug);
  const heroTitle = service.title;

  return (
    <>
      <SectionBackground
        src={service.heroBackground}
        overlay="left"
        position="object-cover object-right"
        className="relative min-h-[70vh]"
      >
        <div className="container mx-auto px-4 pb-16 pt-28 md:pt-32">
          <ScrollReveal>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm text-silver transition-colors hover:text-cyan"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Services
            </Link>
          </ScrollReveal>

          <div className="mt-8 max-w-3xl">
            <ScrollReveal delay={0.05}>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-brand glow-cyan">
                <DynamicLucideIcon name={service.icon} className="h-7 w-7 text-white" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-electric">
                {service.eyebrow}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <h1 className="mt-4 font-heading text-4xl font-bold leading-[1.1] md:text-5xl lg:text-6xl">
                {heroTitle.replace(service.heroGradientText, "").trim()}{" "}
                <GradientText>{service.heroGradientText}</GradientText>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-6 text-lg text-silver">{service.shortDescription}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.25}>
              <div className="mt-8 flex flex-wrap gap-4">
                <MagneticButton href={settings.headerCtaUrl}>
                  <Calendar className="mr-1 h-4 w-4" />
                  {service.ctaLabel}
                </MagneticButton>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 bg-black/30 uppercase tracking-wider backdrop-blur-sm"
                >
                  <Link href="/contact">
                    Contact Us
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </SectionBackground>

      <SectionBackground
        src={service.overviewBackground}
        overlay="dark"
        position="object-cover object-center"
        className="py-24 md:py-32"
      >
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-3">
            <ScrollReveal className="lg:col-span-2">
              <SectionHeading
                eyebrow="Overview"
                title={
                  <>
                    Built for Dealerships.{" "}
                    <GradientText>Ready to Scale.</GradientText>
                  </>
                }
                subtitle={service.fullDescription}
              />
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <GlassCard className="h-fit">
                <h2 className="font-heading text-lg font-semibold">What&apos;s Included</h2>
                <ul className="mt-5 space-y-3">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-silver">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-6 w-full">
                  <Link href={settings.headerCtaUrl}>{settings.headerCtaLabel}</Link>
                </Button>
              </GlassCard>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {service.features.map((feature, index) => (
              <ScrollReveal key={feature} delay={index * 0.05}>
                <GlassCard className="h-full">
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand-soft text-xs font-bold text-cyan">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <p className="text-sm leading-relaxed text-silver">{feature}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </SectionBackground>

      <SectionBackground
        src={SERVICE_DETAIL_BACKGROUNDS.process}
        overlay="dark"
        position="object-cover object-center"
        className="py-24 md:py-32"
      >
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Our Approach"
            title={
              <>
                How This <GradientText>Service Works.</GradientText>
              </>
            }
            align="center"
            className="mx-auto mb-14 text-center"
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {service.processSteps.map((step, index) => (
              <ScrollReveal key={step.title} delay={index * 0.08}>
                <GlassCard className="h-full text-center">
                  <p className="font-mono text-2xl font-bold text-gradient">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 text-sm font-semibold uppercase tracking-[0.2em]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm text-silver">{step.description}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </SectionBackground>

      <SectionBackground
        src={SERVICE_DETAIL_BACKGROUNDS.outcomes}
        overlay="center"
        position="object-cover object-center"
        className="py-24 md:py-32"
      >
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <SectionHeading
              eyebrow="Outcomes"
              title={
                <>
                  What You Can <GradientText>Expect.</GradientText>
                </>
              }
              subtitle="Replace with client-approved outcome language tied to this service."
            />
            <div className="space-y-4">
              {service.outcomes.map((outcome, index) => (
                <ScrollReveal key={outcome} delay={index * 0.08}>
                  <GlassCard className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-brand">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-sm leading-relaxed text-silver md:text-base">
                      {outcome}
                    </p>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </SectionBackground>

      <SectionBackground
        src={SERVICE_DETAIL_BACKGROUNDS.faq}
        overlay="dark"
        position="object-cover object-center"
        className="py-24 md:py-32"
      >
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="FAQ"
            title={
              <>
                Common Questions About{" "}
                <GradientText>This Service.</GradientText>
              </>
            }
            align="center"
            className="mx-auto mb-12 max-w-3xl text-center"
          />
          <div className="mx-auto max-w-3xl">
            <ServiceDetailFaq faqs={service.faqs} />
          </div>
        </div>
      </SectionBackground>

      <SectionBackground
        src={SERVICE_DETAIL_BACKGROUNDS.cta}
        overlay="left"
        position="object-cover object-center"
        className="py-24 md:py-32"
      >
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <GlassCard className="mx-auto max-w-3xl border-gradient text-center md:p-14">
              <h2 className="font-heading text-3xl font-bold md:text-4xl">
                Ready to Get Started with{" "}
                <GradientText>{heroTitle}?</GradientText>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-silver">
                Book a strategy call to discuss how this service supports your
                dealership goals.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <MagneticButton href={settings.headerCtaUrl}>
                  <Calendar className="mr-1 h-4 w-4" />
                  {settings.headerCtaLabel}
                </MagneticButton>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 uppercase tracking-wider backdrop-blur-sm"
                >
                  <Link href="/services">
                    View All Services
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="mt-16">
            <RelatedServices services={relatedServices} />
          </ScrollReveal>
        </div>
      </SectionBackground>
    </>
  );
}
