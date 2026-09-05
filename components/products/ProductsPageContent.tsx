"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Brain,
  Calendar,
  Check,
  Mail,
  Minus,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
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
import {
  PRODUCTS_BACKGROUNDS,
  productFilters,
  featuredProductsPage,
  productComparisonRows,
  howItWorksSteps,
  productsFaqs,
  type ProductFilter,
} from "@/lib/content/products-page";

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {productsFaqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <GlassCard key={faq.question} className="p-0 overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left md:p-6"
              aria-expanded={isOpen}
            >
              <span className="font-medium text-white">{faq.question}</span>
              {isOpen ? (
                <Minus className="h-4 w-4 shrink-0 text-cyan" />
              ) : (
                <Plus className="h-4 w-4 shrink-0 text-cyan" />
              )}
            </button>
            {isOpen && (
              <div className="border-t border-white/10 px-5 pb-5 md:px-6 md:pb-6">
                <p className="text-sm leading-relaxed text-silver">{faq.answer}</p>
              </div>
            )}
          </GlassCard>
        );
      })}
    </div>
  );
}

export function ProductsPageContent() {
  const { settings } = useSiteSettings();
  const [filter, setFilter] = useState<ProductFilter>("all");

  const visibleProducts = featuredProductsPage.filter(
    (p) => filter === "all" || p.filter === filter
  );

  return (
    <>
      {/* Hero */}
      <SectionBackground
        src={PRODUCTS_BACKGROUNDS.hero}
        overlay="left"
        position="object-cover object-right"
        className="relative min-h-[85vh]"
      >
        <div className="pointer-events-none absolute right-4 top-1/3 hidden rotate-90 text-[10px] uppercase tracking-[0.4em] text-silver/40 xl:block">
          Drive A Brighter Tomorrow
        </div>
        <div className="pointer-events-none absolute right-4 top-2/3 hidden rotate-90 text-[10px] uppercase tracking-[0.4em] text-silver/40 xl:block">
          Profit · Technology · Growth
        </div>

        <div className="container mx-auto px-4 pb-16 pt-28 md:pt-32">
          <div className="max-w-2xl">
            <ScrollReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-electric">
                Our Products
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="mt-5 font-heading text-4xl font-bold leading-[1.1] md:text-5xl lg:text-6xl">
                Technology That Turns{" "}
                <GradientText>Attention</GradientText> Into{" "}
                <GradientText>Action.</GradientText>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-6 text-lg text-silver">
                Explore connected marketing solutions created for modern automotive
                dealers.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-3">
                {productFilters.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFilter(item.id)}
                    className={cn(
                      "rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all",
                      filter === item.id
                        ? "bg-gradient-brand text-white glow-cyan"
                        : "border border-white/20 bg-black/30 text-silver hover:border-cyan/40 hover:text-white"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </SectionBackground>

      {/* Featured Solutions */}
      <SectionBackground
        src={PRODUCTS_BACKGROUNDS.featured}
        overlay="center"
        position="object-cover object-center"
        className="py-24 md:py-32"
      >
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Featured Solutions"
            title={
              <>
                Powerful Solutions For A{" "}
                <GradientText>Stronger Tomorrow.</GradientText>
              </>
            }
            align="center"
            className="mx-auto mb-14 text-center"
          />

          <div className="grid gap-8 lg:grid-cols-2">
            {visibleProducts.map((product, index) => (
              <ScrollReveal key={product.id} delay={index * 0.1}>
                <GlassCard className="flex h-full flex-col overflow-hidden p-0">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={product.visual}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="rounded-full bg-black/50 px-3 py-1 text-xs uppercase tracking-wider text-cyan backdrop-blur-sm">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6 md:p-8">
                    <h3 className="font-heading text-xl font-bold uppercase tracking-wide md:text-2xl">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-cyan">{product.tagline}</p>
                    <p className="mt-4 text-sm leading-relaxed text-silver">
                      {product.description}
                    </p>

                    <ul className="mt-6 space-y-2">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-silver">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <Button asChild className="uppercase tracking-wider">
                        <Link href="/contact">{settings.contactForPricingLabel}</Link>
                      </Button>
                      <Link
                        href={`/products/${product.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-cyan hover:text-white"
                      >
                        Explore Product
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </SectionBackground>

      {/* Comparison Table */}
      <SectionBackground
        src={PRODUCTS_BACKGROUNDS.comparison}
        overlay="dark"
        position="object-cover object-center"
        className="py-24 md:py-32"
      >
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Compare Solutions"
            title="Find the Right Fit for Your Dealership."
            align="center"
            className="mx-auto mb-12 text-center"
          />

          <ScrollReveal>
            <div className="max-w-full overflow-x-auto rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="p-4 font-semibold uppercase tracking-wider text-silver md:p-6">
                      Features
                    </th>
                    <th className="p-4 text-center md:p-6">
                      <div className="flex flex-col items-center gap-2">
                        <Brain className="h-5 w-5 text-cyan" />
                        <span className="text-xs font-semibold uppercase tracking-wider">
                          AI Marketing Suite
                        </span>
                      </div>
                    </th>
                    <th className="p-4 text-center md:p-6">
                      <div className="flex flex-col items-center gap-2">
                        <Mail className="h-5 w-5 text-cyan" />
                        <span className="text-xs font-semibold uppercase tracking-wider">
                          Dealer Email Engine
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productComparisonRows.map((row) => (
                    <tr key={row.feature} className="border-b border-white/5 last:border-0">
                      <td className="p-4 text-silver md:p-6">{row.feature}</td>
                      <td className="p-4 text-center md:p-6">
                        {row.ai ? (
                          <Check className="mx-auto h-5 w-5 text-cyan" />
                        ) : (
                          <Minus className="mx-auto h-4 w-4 text-silver/40" />
                        )}
                      </td>
                      <td className="p-4 text-center md:p-6">
                        {row.email ? (
                          <Check className="mx-auto h-5 w-5 text-cyan" />
                        ) : (
                          <Minus className="mx-auto h-4 w-4 text-silver/40" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </SectionBackground>

      {/* Offer Banner */}
      <SectionBackground
        src={PRODUCTS_BACKGROUNDS.offer}
        overlay="left"
        position="object-cover object-center"
        className="py-16 md:py-20"
      >
        <div className="container mx-auto flex flex-col items-start justify-between gap-6 px-4 md:flex-row md:items-center">
          <ScrollReveal>
            <div>
              <h2 className="font-heading text-2xl font-bold md:text-3xl">
                Invest in What&apos;s Next.
              </h2>
              <p className="mt-2 text-silver">
                Special offers available for a limited time.
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.3em] text-cyan">
                Grow · Engage · Convert
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Button asChild size="lg" className="uppercase tracking-wider">
              <Link href="/contact">{settings.contactForPricingLabel}</Link>
            </Button>
          </ScrollReveal>
        </div>
      </SectionBackground>

      {/* How It Works */}
      <SectionBackground
        src={PRODUCTS_BACKGROUNDS.how}
        overlay="center"
        position="object-cover object-center"
        className="py-24 md:py-32"
      >
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="How It Works"
            title={
              <>
                From Attention to{" "}
                <GradientText>Lifelong Customers.</GradientText>
              </>
            }
            align="center"
            className="mx-auto mb-14 text-center"
          />

          <div className="relative grid gap-8 md:grid-cols-3">
            <div
              className="absolute left-[16%] right-[16%] top-16 hidden h-px bg-gradient-to-r from-electric via-violet to-magenta md:block"
              aria-hidden
            />
            {howItWorksSteps.map((step, index) => {
              const Icon = getLucideIcon(step.icon);
              return (
                <ScrollReveal key={step.title} delay={index * 0.1}>
                  <GlassCard className="relative text-center">
                    <p className="font-mono text-2xl font-bold text-gradient">{step.step}</p>
                    <div className="mx-auto my-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm text-silver">{step.description}</p>
                  </GlassCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </SectionBackground>

      {/* FAQ */}
      <section className="bg-black py-24 md:py-32">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="FAQ"
            title="Your Questions, Answered."
            align="center"
            className="mx-auto mb-12 text-center"
          />
          <FaqAccordion />
        </div>
      </section>

      {/* Final CTA */}
      <SectionBackground
        src={PRODUCTS_BACKGROUNDS.cta}
        overlay="center"
        position="object-cover object-center"
        className="py-24 md:py-32"
      >
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <GlassCard className="mx-auto max-w-3xl border-gradient text-center md:p-14">
              <h2 className="font-heading text-3xl font-bold md:text-4xl lg:text-5xl">
                Let&apos;s Build What <GradientText>Comes Next.</GradientText>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-silver">
                Schedule a strategy call to explore the right solutions for your
                dealership.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <MagneticButton href={settings.headerCtaUrl}>
                  <Calendar className="mr-1 h-4 w-4" />
                  {settings.headerCtaLabel}
                </MagneticButton>
                <Button asChild variant="outline" size="lg" className="border-white/30 uppercase tracking-wider">
                  <Link href="/contact">
                    Get in Touch
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
