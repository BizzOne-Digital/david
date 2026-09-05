"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/button";
import {
  SectionBackground,
  SectionHeading,
  GlassCard,
  GradientText,
} from "./SectionBackground";
import {
  SECTION_BACKGROUNDS,
  homepageProducts,
} from "@/lib/content/homepage-sections";

export function FlagshipProducts() {
  return (
    <SectionBackground
      src={SECTION_BACKGROUNDS.products}
      overlay="center"
      position="object-cover object-center"
      className="py-24 md:py-32"
    >
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Our Products"
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
          {homepageProducts.map((product, index) => (
            <ScrollReveal key={product.id} delay={index * 0.1}>
              <GlassCard className="flex h-full flex-col">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan">
                  Flagship Product
                </p>
                <h3 className="mt-3 font-heading text-2xl font-bold md:text-3xl">
                  {product.name}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-silver md:text-base">
                  {product.tagline}
                </p>
                <p className="mt-3 flex-1 text-sm text-silver/80">
                  {product.description}
                </p>
                <div className="mt-8 h-40 rounded-xl border border-white/10 bg-gradient-brand-soft" />
                <Button asChild className="mt-6 w-fit uppercase tracking-wider">
                  <Link href={`/products/${product.slug}`}>
                    {product.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </SectionBackground>
  );
}
