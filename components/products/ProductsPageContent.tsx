"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SecondaryCtaButton } from "@/components/ui/ConversionCta";
import {
  SectionBackground,
  SectionHeading,
  GlassCard,
} from "@/components/sections/SectionBackground";
import {
  productFilters,
  featuredProductsPage,
  productsFaqs,
  type ProductFilter,
} from "@/lib/content/products-page";
import { homepageCopy, solutionsPageCopy } from "@/lib/content/revisions";
import { SolutionCardVisual } from "./SolutionCardVisual";
import { EmailMarketingSlideshow } from "./EmailMarketingSlideshow";

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {productsFaqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <GlassCard key={faq.question} className="overflow-hidden p-0">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left md:p-6"
              aria-expanded={isOpen}
            >
              <span className="font-medium text-white">{faq.question}</span>
              {isOpen ?
                <Minus className="h-4 w-4 shrink-0 text-electric" />
              : <Plus className="h-4 w-4 shrink-0 text-electric" />}
            </button>
            {isOpen ?
              <div className="border-t border-white/10 px-5 pb-5 md:px-6 md:pb-6">
                <p className="text-sm leading-relaxed text-silver">{faq.answer}</p>
              </div>
            : null}
          </GlassCard>
        );
      })}
    </div>
  );
}

export function ProductsPageContent() {
  const [filter, setFilter] = useState<ProductFilter>("all");

  const visibleProducts = featuredProductsPage.filter(
    (p) => filter === "all" || p.filter === filter
  );

  return (
    <>
      <SectionBackground overlay="dark" className="page-hero-section">
        <div className="container mx-auto px-4">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <SectionHeading
              eyebrow={solutionsPageCopy.eyebrow}
              title={solutionsPageCopy.headline}
              subtitle={solutionsPageCopy.subhead}
              align="center"
              className="w-full"
            />
            <ScrollReveal
              delay={0.15}
              className="mt-6 flex w-full flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <SecondaryCtaButton size="lg" />
            </ScrollReveal>
          </div>
        </div>
      </SectionBackground>

      <SectionBackground overlay="dark" className="page-section-after-hero">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Solutions"
            title={solutionsPageCopy.featuredTitle}
            subtitle="Dealer outcomes first — not technical feature lists."
            align="center"
            className="mx-auto mb-8 w-full text-center"
          />

          <ScrollReveal className="mb-8 flex flex-wrap justify-center gap-3">
            {productFilters.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={cn(
                  "rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
                  filter === item.id ?
                    "bg-brand-orange text-white"
                  : "border border-white/20 bg-graphite text-silver hover:border-white/40 hover:text-white"
                )}
              >
                {item.label}
              </button>
            ))}
          </ScrollReveal>

          <div className="mx-auto flex max-w-4xl flex-col gap-6">
            {visibleProducts.map((product, index) => (
              <ScrollReveal key={product.id} delay={index * 0.08}>
                <GlassCard className="grid h-full overflow-hidden border-white/10 p-0 md:grid-cols-[minmax(0,34%)_1fr]">
                  <SolutionCardVisual
                    icon={product.visual.icon}
                    accent={product.visual.accent}
                    chips={product.visual.chips}
                    category={product.category}
                  />

                  <div className="flex flex-col p-6 md:p-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric md:hidden">
                      {product.category}
                    </p>
                    <h3 className="mt-2 font-heading text-xl font-bold uppercase tracking-wide md:mt-0 md:text-2xl">
                      {product.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-silver">
                      {product.description}
                    </p>

                    <ul className="mt-5 space-y-2">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-silver">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      <Link
                        href={`/products/${product.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-electric hover:text-white"
                      >
                        Learn More
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

      <SectionBackground overlay="dark" className="page-section-compact">
        <div className="container mx-auto px-4">
          <EmailMarketingSlideshow />
        </div>
      </SectionBackground>

      <SectionBackground overlay="dark" className="page-section-compact">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="FAQ"
            title="Your Questions, Answered."
            align="center"
            className="mx-auto mb-8 w-full text-center"
          />
          <FaqAccordion />
        </div>
      </SectionBackground>

      <SectionBackground overlay="dark" className="page-section-compact">
        <div className="container mx-auto px-4">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <h2 className="font-heading text-3xl font-bold uppercase leading-tight md:text-4xl lg:text-5xl">
              {homepageCopy.finalCta.headline}
            </h2>
          </div>
        </div>
      </SectionBackground>
    </>
  );
}
