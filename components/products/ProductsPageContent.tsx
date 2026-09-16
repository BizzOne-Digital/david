"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Minus, Plus } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import {
  SectionBackground,
  SectionHeading,
  GlassCard,
} from "@/components/sections/SectionBackground";
import {
  featuredProductsPage,
  productsFaqs,
} from "@/lib/content/products-page";
import { homepageCopy, solutionsPageCopy } from "@/lib/content/revisions";
import { EmailMarketingSlideshow } from "./EmailMarketingSlideshow";
import { ProofSection } from "@/components/sections/ProofSection";
import { ImageSlideshow } from "@/components/sections/ImageSlideshow";
import { getSolutionCardSlides, solutionUsesSlideshow } from "@/lib/content/solution-card-slides";
import { cn } from "@/lib/utils";

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {productsFaqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <GlassCard key={faq.question} className="overflow-hidden p-0">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 p-4 text-left md:p-5"
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
  return (
    <>
      <SectionBackground overlay="dark" className="page-hero-section">
        <div className="container mx-auto px-4">
          <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
            <SectionHeading
              eyebrow={solutionsPageCopy.eyebrow}
              title={solutionsPageCopy.headline}
              subtitle={solutionsPageCopy.subhead}
              align="center"
              className="w-full [&_h2]:mt-2 [&_p]:mt-2"
            />
            <ScrollReveal delay={0.1} className="mt-2 w-full md:mt-3">
              <EmailMarketingSlideshow showHeading={false} compact />
            </ScrollReveal>
          </div>
        </div>
      </SectionBackground>

      <SectionBackground overlay="dark" className="page-section-after-hero">
        <div className="container mx-auto px-4">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 md:gap-5">
            {featuredProductsPage.map((product, index) => {
              const slides = getSolutionCardSlides(product.slug);
              const hasSlideshow = solutionUsesSlideshow(product.slug);
              const narratives =
                "narratives" in product && product.narratives ? product.narratives : null;
              return (
              <ScrollReveal key={product.id} delay={index * 0.08}>
                <GlassCard className="flex flex-col overflow-hidden border-white/10 p-0">
                  {hasSlideshow && slides.length > 0 ?
                    <>
                      <div className="border-b border-white/10 px-5 pb-3 pt-5 md:px-6 md:pb-4 md:pt-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric">
                          {product.category}
                        </p>
                        <h3 className="mt-2 font-heading text-lg font-bold uppercase leading-snug tracking-wide md:text-xl">
                          {product.name}
                        </h3>
                      </div>
                      <div className="w-full border-b border-white/10 bg-[#0a0a12]">
                        <ImageSlideshow
                          slides={slides}
                          embedded
                          compact
                          showSlideCounter={false}
                          className="w-full"
                        />
                      </div>
                    </>
                  : null}

                  <div className="flex flex-col p-5 md:p-6">
                    {!hasSlideshow ?
                      <>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric">
                          {product.category}
                        </p>
                        <h3 className="mt-1.5 font-heading text-xl font-bold uppercase tracking-wide md:text-2xl">
                          {product.name}
                        </h3>
                      </>
                    : null}
                    <p
                      className={cn(
                        "text-sm leading-relaxed text-silver md:text-base",
                        !hasSlideshow && "mt-2"
                      )}
                    >
                      {product.description}
                    </p>

                    {narratives ?
                      <>
                        <div className="mt-3 space-y-2 border-t border-white/10 pt-3">
                          {narratives.map((paragraph) => (
                            <p
                              key={paragraph.slice(0, 48)}
                              className="text-sm leading-relaxed text-silver md:text-base"
                            >
                              {paragraph}
                            </p>
                          ))}
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                          <Link
                            href={`/products/${product.slug}`}
                            className="inline-flex items-center gap-1 text-sm font-medium text-electric hover:text-white"
                          >
                            Learn More
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                          <Link
                            href="/consulting"
                            className="inline-flex items-center gap-1 text-sm font-medium text-silver hover:text-white"
                          >
                            Explore Consulting
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </>
                    : (
                      <>
                        <ul className="mt-3 space-y-1">
                          {product.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start gap-2 text-sm text-silver"
                            >
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <div className="mt-3 flex flex-wrap items-center gap-4">
                          <Link
                            href={`/products/${product.slug}`}
                            className="inline-flex items-center gap-1 text-sm font-medium text-electric hover:text-white"
                          >
                            Learn More
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </GlassCard>
              </ScrollReveal>
            );
            })}
          </div>
        </div>
      </SectionBackground>

      <SectionBackground overlay="dark" className="page-section-compact">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="FAQ"
            title="Your Questions, Answered."
            align="center"
            className="mx-auto mb-3 w-full text-center [&_h2]:mt-2"
          />
          <FaqAccordion />
        </div>
      </SectionBackground>

      <SectionBackground overlay="dark" className="pb-3 pt-1 md:pb-4 md:pt-2">
        <div className="container mx-auto px-4">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 className="font-heading text-xl font-bold leading-snug sm:text-2xl md:text-[1.75rem]">
              {homepageCopy.finalCta.headline}
            </h2>
          </div>
        </div>
      </SectionBackground>

      <ProofSection />
    </>
  );
}
