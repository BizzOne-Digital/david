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
import { getSolutionCardSlides } from "@/lib/content/solution-card-slides";

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
  return (
    <>
      <SectionBackground overlay="dark" className="page-hero-section pb-6 pt-6 md:pb-8 md:pt-8">
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

      <SectionBackground overlay="dark" className="page-section-after-hero pb-8 pt-2 md:pb-10 md:pt-3">
        <div className="container mx-auto px-4">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
            {featuredProductsPage.map((product, index) => {
              const slides = getSolutionCardSlides(product.slug);
              return (
              <ScrollReveal key={product.id} delay={index * 0.08}>
                <GlassCard className="flex flex-col overflow-hidden border-white/10 p-0">
                  {slides.length > 0 ?
                    <div className="w-full border-b border-white/10 bg-[#0a0a12]">
                      <ImageSlideshow
                        slides={slides}
                        embedded
                        showSlideCounter={false}
                        className="w-full"
                      />
                    </div>
                  : null}

                  <div className="flex flex-col p-6 md:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric">
                      {product.category}
                    </p>
                    <h3 className="mt-2 font-heading text-xl font-bold uppercase tracking-wide md:text-2xl">
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
            );
            })}
          </div>
        </div>
      </SectionBackground>

      <SectionBackground overlay="dark" className="pb-8 pt-6 md:pb-10 md:pt-8">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="FAQ"
            title="Your Questions, Answered."
            align="center"
            className="mx-auto mb-6 w-full text-center"
          />
          <FaqAccordion />
        </div>
      </SectionBackground>

      <SectionBackground overlay="dark" className="pb-8 pt-4 md:pb-10 md:pt-6">
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
