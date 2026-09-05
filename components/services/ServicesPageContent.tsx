"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Minus,
  Plus,
} from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { getLucideIcon } from "@/lib/utils/icons";
import {
  SectionBackground,
  SectionHeading,
  GlassCard,
  GradientText,
} from "@/components/sections/SectionBackground";
import { DEFAULT_LOGO } from "@/components/layout/Logo";
import Image from "next/image";
import {
  SERVICES_PAGE_BACKGROUNDS,
  servicesPageCards,
  dealerFunnelStages,
  servicesProcessSteps,
  integrationNodes,
  servicesFaqs,
} from "@/lib/content/services-page";

function ServicesFaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {servicesFaqs.map((faq, index) => {
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

export function ServicesPageContent() {
  const { settings } = useSiteSettings();

  return (
    <>
      {/* Hero */}
      <SectionBackground
        src={SERVICES_PAGE_BACKGROUNDS.hero}
        overlay="left"
        position="object-cover object-right"
        className="relative min-h-[80vh]"
      >
        <div className="container mx-auto px-4 pb-16 pt-28 md:pt-32">
          <div className="max-w-2xl">
            <ScrollReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-electric">
                Our Services
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="mt-5 font-heading text-4xl font-bold leading-[1.1] md:text-5xl lg:text-6xl">
                Smarter Marketing Systems for{" "}
                <GradientText>Modern Dealers.</GradientText>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-6 text-lg text-silver">
                AI-assisted lead engagement, email marketing operations, and
                connected systems built exclusively for automotive retail.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-4">
                <MagneticButton href={settings.headerCtaUrl}>
                  <Calendar className="mr-1 h-4 w-4" />
                  Discuss Your Goals
                </MagneticButton>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 bg-black/30 uppercase tracking-wider backdrop-blur-sm"
                >
                  <Link href="#services-grid">
                    Explore Our Services
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </SectionBackground>

      {/* Services Grid */}
      <SectionBackground
        id="services-grid"
        src={SERVICES_PAGE_BACKGROUNDS.grid}
        overlay="dark"
        position="object-cover object-center"
        className="py-24 md:py-32"
      >
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="What We Offer"
            title={
              <>
                Complete Marketing Solutions for{" "}
                <GradientText>Today&apos;s Dealerships.</GradientText>
              </>
            }
            align="center"
            className="mx-auto mb-14 text-center"
          />

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {servicesPageCards.map((service, index) => {
              const Icon = getLucideIcon(service.icon);
              return (
                <ScrollReveal key={service.title} delay={index * 0.06}>
                  <GlassCard className="flex h-full flex-col transition-colors hover:border-cyan/40">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand glow-cyan">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold">{service.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-silver">
                      {service.description}
                    </p>
                    <Link
                      href={`/services/${service.slug}`}
                      className="mt-6 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-cyan hover:text-white"
                    >
                      Learn More
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </GlassCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </SectionBackground>

      {/* Dealer Funnel */}
      <SectionBackground
        src={SERVICES_PAGE_BACKGROUNDS.funnel}
        overlay="center"
        position="object-cover object-center"
        className="py-24 md:py-32"
      >
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="The Funnel"
            title={
              <>
                A Smarter <GradientText>Dealer Funnel.</GradientText>
              </>
            }
            align="center"
            className="mx-auto mb-14 text-center"
          />

          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <ScrollReveal>
              <div className="mx-auto flex max-w-sm flex-col items-center gap-2">
                {dealerFunnelStages.map((item, index) => (
                  <div
                    key={item.stage}
                    className="flex w-full items-center justify-center rounded-xl border border-cyan/30 bg-gradient-brand-soft py-4 text-center backdrop-blur-sm"
                    style={{ width: `${100 - index * 12}%` }}
                  >
                    <span className="text-sm font-bold uppercase tracking-[0.2em] text-white">
                      {item.stage}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <div className="space-y-6">
              {dealerFunnelStages.map((item, index) => (
                <ScrollReveal key={item.stage} delay={index * 0.08}>
                  <div className="flex gap-4 border-l-2 border-cyan/40 pl-5">
                    <div>
                      <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-cyan">
                        {item.stage}
                      </h3>
                      <p className="mt-1 text-sm text-silver">{item.benefit}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </SectionBackground>

      {/* How We Work */}
      <SectionBackground
        src={SERVICES_PAGE_BACKGROUNDS.process}
        overlay="dark"
        position="object-cover object-center"
        className="py-24 md:py-32"
      >
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Our Process"
            title={
              <>
                How <GradientText>We Work.</GradientText>
              </>
            }
            align="center"
            className="mx-auto mb-14 text-center"
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {servicesProcessSteps.map((step, index) => {
              const Icon = getLucideIcon(step.icon);
              return (
                <ScrollReveal key={step.step} delay={index * 0.08} className="relative">
                  <GlassCard className="h-full text-center">
                    <p className="font-mono text-2xl font-bold text-gradient">{step.step}</p>
                    <div className="mx-auto my-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm text-silver">{step.description}</p>
                  </GlassCard>
                  {index < servicesProcessSteps.length - 1 && (
                    <ChevronRight
                      className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-cyan/60 xl:block"
                      aria-hidden
                    />
                  )}
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </SectionBackground>

      {/* Integration */}
      <SectionBackground
        src={SERVICES_PAGE_BACKGROUNDS.integration}
        overlay="center"
        position="object-cover object-center"
        className="py-24 md:py-32"
      >
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Integrations"
            title={
              <>
                Built to Integrate.{" "}
                <GradientText>Designed to Perform.</GradientText>
              </>
            }
            align="center"
            className="mx-auto mb-14 text-center"
          />

          <ScrollReveal>
            <div className="relative mx-auto max-w-3xl">
              <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-brand blur-2xl opacity-40" />
              <div className="relative flex flex-col items-center">
                <Image
                  src={settings.logo || DEFAULT_LOGO}
                  alt=""
                  width={120}
                  height={120}
                  className="relative z-10 h-20 w-auto object-contain md:h-24"
                />
                <div className="mt-10 grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
                  {integrationNodes.map((node, index) => (
                    <GlassCard
                      key={node}
                      className="py-4 text-center text-sm font-semibold uppercase tracking-wider"
                    >
                      <span className="text-gradient">{node}</span>
                    </GlassCard>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </SectionBackground>

      {/* FAQ */}
      <SectionBackground
        src={SERVICES_PAGE_BACKGROUNDS.faq}
        overlay="dark"
        position="object-cover object-center"
        className="py-24 md:py-32"
      >
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="FAQ"
            title={
              <>
                Answers to <GradientText>Common Questions.</GradientText>
              </>
            }
            align="center"
            className="mx-auto mb-12 text-center"
          />
          <ServicesFaqAccordion />
        </div>
      </SectionBackground>

      {/* Bottom CTA */}
      <SectionBackground
        src={SERVICES_PAGE_BACKGROUNDS.cta}
        overlay="left"
        position="object-cover object-center"
        className="py-24 md:py-32"
      >
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <GlassCard className="mx-auto max-w-3xl border-gradient text-center md:p-14">
              <h2 className="font-heading text-3xl font-bold md:text-4xl lg:text-5xl">
                Create a Smarter <GradientText>Dealer Journey.</GradientText>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-silver">
                Let&apos;s explore how our services can support your dealership&apos;s
                marketing goals.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <MagneticButton href={settings.headerCtaUrl}>
                  <Calendar className="mr-1 h-4 w-4" />
                  Discuss Your Goals
                </MagneticButton>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 uppercase tracking-wider backdrop-blur-sm"
                >
                  <Link href="/contact">
                    Contact Us
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </SectionBackground>
    </>
  );
}
