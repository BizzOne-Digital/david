"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import {
  SectionBackground,
  SectionHeading,
  GlassCard,
} from "@/components/sections/SectionBackground";
import { DemoCtaButton } from "@/components/ui/ConversionCta";
import { SolutionCardVisual } from "@/components/products/SolutionCardVisual";
import type { SolutionDetail } from "@/lib/content/products-page";

interface ProductDetailPageContentProps {
  product: SolutionDetail;
  related: SolutionDetail[];
}

export function ProductDetailPageContent({
  product,
  related,
}: ProductDetailPageContentProps) {
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

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_1fr] lg:items-start lg:gap-10">
            <SolutionCardVisual
              variant="detail"
              icon={product.visual.icon}
              accent={product.visual.accent}
              chips={product.visual.chips}
              category={product.category}
            />

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric">
                {product.category}
              </p>
              <h1 className="mt-3 font-heading text-3xl font-bold uppercase leading-[1.05] md:text-4xl lg:text-[2.75rem]">
                {product.name}
              </h1>
              <p className="mt-5 text-base leading-relaxed text-silver md:text-lg">
                {product.description}
              </p>

              <GlassCard className="mt-8 border-white/10">
                <p className="text-sm leading-relaxed text-silver">
                  Every dealership is different. We scope the right program after a short demo
                  — built around the opportunity already inside your store.
                </p>
                <div className="mt-5">
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
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <SectionHeading eyebrow="Overview" title="How This Solution Works" />
              <p className="mt-5 text-base leading-relaxed text-silver md:text-lg">
                {product.fullDescription}
              </p>
            </div>

            <div>
              <SectionHeading eyebrow="Capabilities" title="What's Included" />
              <ul className="mt-6 space-y-3">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/25 px-4 py-3"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                    <span className="text-sm leading-relaxed text-silver md:text-base">
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
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Benefits" title="Why Dealerships Use It" />
              <ul className="mt-6 space-y-3">
                {product.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-silver">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-electric" />
                    <span className="text-sm leading-relaxed md:text-base">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SectionHeading eyebrow="Outcomes" title="What You Can Expect" />
              <div className="mt-6 space-y-3">
                {product.outcomes.map((outcome) => (
                  <GlassCard key={outcome} className="border-white/10 py-4">
                    <p className="text-sm leading-relaxed text-white md:text-base">{outcome}</p>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionBackground>

      {related.length > 0 ?
        <SectionBackground overlay="dark" className="page-section-compact">
          <div className="container mx-auto px-4">
            <SectionHeading
              eyebrow="More Solutions"
              title="Explore Other Rethink Programs"
              className="mb-8"
            />
            <div className="grid gap-6 md:grid-cols-2">
              {related.map((item) => (
                <GlassCard
                  key={item.slug}
                  className="grid overflow-hidden border-white/10 p-0 md:grid-cols-[minmax(0,38%)_1fr]"
                >
                  <SolutionCardVisual
                    icon={item.visual.icon}
                    accent={item.visual.accent}
                    chips={item.visual.chips}
                    category={item.category}
                  />
                  <div className="flex flex-col justify-center p-6">
                    <h3 className="font-heading text-lg font-bold uppercase tracking-wide">
                      {item.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-silver line-clamp-3">
                      {item.description}
                    </p>
                    <Link
                      href={`/products/${item.slug}`}
                      className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-electric hover:text-white"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </SectionBackground>
      : null}

      <SectionBackground overlay="dark" className="page-section-compact">
        <div className="container mx-auto px-4">
          <GlassCard className="mx-auto max-w-3xl border-brand-orange/30 bg-brand-orange/10 text-center">
            <h2 className="font-heading text-2xl font-bold uppercase leading-tight md:text-3xl">
              Ready to see this for your dealership?
            </h2>
            <p className="mt-4 text-silver">
              Request a demo and we&apos;ll show you where opportunity may already exist in your
              store.
            </p>
            <div className="mt-6 flex justify-center">
              <DemoCtaButton>{product.cta}</DemoCtaButton>
            </div>
          </GlassCard>
        </div>
      </SectionBackground>
    </>
  );
}
