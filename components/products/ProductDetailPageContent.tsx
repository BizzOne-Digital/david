"use client";

import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import {
  SectionBackground,
  SectionHeading,
  GlassCard,
} from "@/components/sections/SectionBackground";
import { DemoCtaButton } from "@/components/ui/ConversionCta";
import { SolutionCardVisual } from "@/components/products/SolutionCardVisual";
import { ImageSlideshow } from "@/components/sections/ImageSlideshow";
import { ghostShopperSlides } from "@/lib/content/ghost-shopper-slides";
import type { SolutionDetail } from "@/lib/content/products-page";

interface ProductDetailPageContentProps {
  product: SolutionDetail;
}

const CONTENT_ONLY_DETAIL_SLUGS = new Set([
  "service-to-sales",
  "email-campaign-engine",
]);

function ContentOnlySolutionDetail({ product }: { product: SolutionDetail }) {
  const narratives = product.narratives ?? [];

  return (
    <>
      <SectionBackground overlay="dark" className="page-hero-section pb-4 pt-3 md:pb-5 md:pt-4">
        <div className="container mx-auto px-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-silver transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Solutions
          </Link>

          <div className="mx-auto mt-3 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric">
              {product.category}
            </p>
            <h1 className="mt-2 font-heading text-2xl font-bold uppercase leading-snug sm:text-3xl md:text-[2rem]">
              {product.name}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-silver md:text-base">
              {product.description}
            </p>
            {narratives.length > 0 ?
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
            : null}
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              Every dealership is different. We scope the right program after a short demo — built
              around the opportunity already inside your store.
            </p>
            <div className="mt-4">
              <DemoCtaButton className="w-full justify-center sm:w-auto">
                {product.cta}
              </DemoCtaButton>
            </div>
          </div>
        </div>
      </SectionBackground>

      <SectionBackground overlay="dark" className="page-section-after-hero pt-0 pb-4 md:pb-5">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-4 md:space-y-5">
            <div>
              <SectionHeading eyebrow="Capabilities" title="What's Included" />
              <ul className="mt-3 space-y-2">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 rounded-lg border border-white/10 bg-black/25 px-3 py-2.5"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                    <span className="text-sm leading-snug text-silver">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-4 border-t border-white/10 pt-4 md:grid-cols-2 md:gap-5 md:pt-5">
              <div>
                <SectionHeading eyebrow="Benefits" title="Why Dealerships Use It" />
                <ul className="mt-3 space-y-2">
                  {product.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2.5 text-silver">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-electric" />
                      <span className="text-sm leading-snug">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <SectionHeading eyebrow="Outcomes" title="What You Can Expect" />
                <ul className="mt-3 space-y-2">
                  {product.outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm leading-snug text-white"
                    >
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SectionBackground>
    </>
  );
}

export function ProductDetailPageContent({ product }: ProductDetailPageContentProps) {
  if (CONTENT_ONLY_DETAIL_SLUGS.has(product.slug)) {
    return (
      <>
        <ContentOnlySolutionDetail product={product} />
        <SectionBackground overlay="dark" className="page-section-compact pt-0">
          <div className="container mx-auto px-4">
            <GlassCard className="mx-auto max-w-3xl border-brand-orange/30 bg-brand-orange/10 p-5 text-center md:p-6">
              <h2 className="font-heading text-xl font-bold uppercase leading-snug md:text-2xl">
                Ready to see this for your dealership?
              </h2>
              <p className="mt-2 text-sm text-silver">
                Request a demo and we&apos;ll show you where opportunity may already exist in your
                store.
              </p>
              <div className="mt-4 flex justify-center">
                <DemoCtaButton>{product.cta}</DemoCtaButton>
              </div>
            </GlassCard>
          </div>
        </SectionBackground>
      </>
    );
  }

  return (
    <>
      <SectionBackground overlay="dark" className="page-hero-section">
        <div className="container mx-auto px-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-silver transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Solutions
          </Link>

          <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_1fr] lg:items-start lg:gap-8">
            {product.slug === "ai-lead-response-suite" ?
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <ImageSlideshow
                  slides={ghostShopperSlides}
                  embedded
                  compact
                  showSlideCounter={false}
                />
              </div>
            : <SolutionCardVisual
                variant="detail"
                icon={product.visual.icon}
                accent={product.visual.accent}
                chips={product.visual.chips}
                category={product.category}
              />
            }

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric">
                {product.category}
              </p>
              <h1 className="mt-2 font-heading text-2xl font-bold uppercase leading-snug md:text-3xl lg:text-[2.25rem]">
                {product.name}
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-silver md:text-base">
                {product.description}
              </p>

              <GlassCard className="mt-5 border-white/10 p-4 md:p-5">
                <p className="text-sm leading-relaxed text-silver">
                  Every dealership is different. We scope the right program after a short demo
                  — built around the opportunity already inside your store.
                </p>
                <div className="mt-4">
                  <DemoCtaButton className="w-full justify-center sm:w-auto">
                    {product.cta}
                  </DemoCtaButton>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </SectionBackground>

      <SectionBackground overlay="dark" className="page-section-after-hero">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <div>
              <SectionHeading eyebrow="Overview" title="How This Solution Works" />
              <p className="mt-3 text-sm leading-relaxed text-silver md:text-base">
                {product.fullDescription}
              </p>
            </div>

            <div>
              <SectionHeading eyebrow="Capabilities" title="What's Included" />
              <ul className="mt-4 space-y-2">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-black/25 px-3 py-2.5"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                    <span className="text-sm leading-relaxed text-silver">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </SectionBackground>

      <SectionBackground overlay="dark" className="page-section-compact">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Benefits" title="Why Dealerships Use It" />
              <ul className="mt-4 space-y-2">
                {product.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2.5 text-silver">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-electric" />
                    <span className="text-sm leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SectionHeading eyebrow="Outcomes" title="What You Can Expect" />
              <div className="mt-4 space-y-2">
                {product.outcomes.map((outcome) => (
                  <GlassCard key={outcome} className="border-white/10 px-3 py-3">
                    <p className="text-sm leading-relaxed text-white">{outcome}</p>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionBackground>

      <SectionBackground overlay="dark" className="page-section-compact pt-0">
        <div className="container mx-auto px-4">
          <GlassCard className="mx-auto max-w-3xl border-brand-orange/30 bg-brand-orange/10 p-5 text-center md:p-6">
            <h2 className="font-heading text-xl font-bold uppercase leading-snug md:text-2xl">
              Ready to see this for your dealership?
            </h2>
            <p className="mt-2 text-sm text-silver">
              Request a demo and we&apos;ll show you where opportunity may already exist in your
              store.
            </p>
            <div className="mt-4 flex justify-center">
              <DemoCtaButton>{product.cta}</DemoCtaButton>
            </div>
          </GlassCard>
        </div>
      </SectionBackground>
    </>
  );
}
