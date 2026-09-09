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
              {isOpen ? (
                <Minus className="h-4 w-4 shrink-0 text-electric" />
              ) : (
                <Plus className="h-4 w-4 shrink-0 text-electric" />
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
  const [filter, setFilter] = useState<ProductFilter>("all");

  const visibleProducts = featuredProductsPage.filter(
    (p) => filter === "all" || p.filter === filter
  );

  return (
    <>
      <SectionBackground overlay="dark" className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <SectionHeading
              eyebrow={solutionsPageCopy.eyebrow}
              title={solutionsPageCopy.headline}
              subtitle={solutionsPageCopy.subhead}
              align="center"
              className="w-full"
            />
            <ScrollReveal delay={0.15} className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
              <SecondaryCtaButton size="lg" />
            </ScrollReveal>
          </div>
        </div>
      </SectionBackground>

      <SectionBackground overlay="dark" className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Solutions"
            title={solutionsPageCopy.featuredTitle}
            subtitle="Dealer outcomes first — not technical feature lists."
            align="center"
            className="mx-auto mb-10 w-full text-center"
          />

          <ScrollReveal className="mb-10 flex flex-wrap justify-center gap-3">
            {productFilters.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={cn(
                  "rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
                  filter === item.id
                    ? "bg-[#ff6b00] text-white"
                    : "border border-white/20 bg-graphite text-silver hover:border-white/40 hover:text-white"
                )}
              >
                {item.label}
              </button>
            ))}
          </ScrollReveal>

          <div className="mx-auto flex max-w-3xl flex-col gap-8">
            {visibleProducts.map((product, index) => (
              <ScrollReveal key={product.id} delay={index * 0.08}>
                <GlassCard className="flex h-full flex-col border-white/10">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric">
                    {product.category}
                  </p>
                  <h3 className="mt-3 font-heading text-xl font-bold uppercase tracking-wide md:text-2xl">
                    {product.name}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-silver">
                    {product.description}
                  </p>

                  <ul className="mt-6 space-y-2">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-silver">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#ff6b00]" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-electric hover:text-white"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </SectionBackground>

      <SectionBackground overlay="dark" className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="FAQ"
            title="Your Questions, Answered."
            align="center"
            className="mx-auto mb-12 w-full text-center"
          />
          <FaqAccordion />
        </div>
      </SectionBackground>

      <SectionBackground overlay="dark" className="py-24 md:py-32">
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
