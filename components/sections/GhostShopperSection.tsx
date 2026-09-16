"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionBackground, GlassCard } from "./SectionBackground";
import { ImageSlideshow } from "./ImageSlideshow";
import {
  ghostShopperShowcaseCopy,
  ghostShopperSlides,
} from "@/lib/content/ghost-shopper-slides";

export function GhostShopperSection() {
  const copy = ghostShopperShowcaseCopy;

  return (
    <SectionBackground overlay="dark" className="page-section-compact">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <GlassCard className="mx-auto flex max-w-6xl flex-col overflow-hidden border-white/10 p-0">
            <div className="border-b border-white/10 px-5 pb-3 pt-5 text-center md:px-6 md:pb-4 md:pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric">
                {copy.eyebrow}
              </p>
              <h2 className="mx-auto mt-2 max-w-3xl font-heading text-lg font-bold uppercase leading-snug tracking-wide md:text-xl">
                {copy.headline}
              </h2>
            </div>

            <div className="w-full border-b border-white/10 bg-[#0a0a12]">
              <ImageSlideshow
                slides={ghostShopperSlides}
                embedded
                compact
                showSlideCounter={false}
                className="w-full"
              />
            </div>

            <div className="flex flex-col p-5 md:p-6">
              <p className="text-sm leading-relaxed text-silver md:text-base">
                {copy.description}
              </p>
              <Link
                href="/products/ai-lead-response-suite"
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-electric hover:text-white"
              >
                Learn More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </GlassCard>
        </ScrollReveal>
      </div>
    </SectionBackground>
  );
}
