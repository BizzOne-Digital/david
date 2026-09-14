"use client";

import { Check } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionBackground, GlassCard } from "@/components/sections/SectionBackground";
import { SecondaryCtaButton } from "@/components/ui/ConversionCta";
import { consultingCopy } from "@/lib/content/revisions";

export function ConsultingPageContent() {
  return (
    <>
      <SectionBackground overlay="dark" className="page-hero-section pb-8 md:pb-10">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-electric">
                Consulting Services
              </p>
              <h1 className="mt-3 font-heading text-2xl font-bold leading-snug sm:text-3xl md:text-[2rem]">
                {consultingCopy.headline}
              </h1>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-silver md:text-base">
                {consultingCopy.intro}
              </p>
              <div className="mt-4 flex justify-center">
                <SecondaryCtaButton href="/contact" size="lg">
                  {consultingCopy.secondaryCta}
                </SecondaryCtaButton>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08} className="mt-6 md:mt-7">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-electric">
                What We Help With
              </p>
              <GlassCard className="border-white/10 p-4 text-left md:p-5">
                <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {consultingCopy.services.map((service) => (
                    <li key={service.title} className="flex gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                      <div className="min-w-0">
                        <p className="font-heading text-sm font-semibold leading-snug">
                          {service.title}
                        </p>
                        <p className="mt-0.5 text-xs leading-relaxed text-silver">
                          {service.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </SectionBackground>
    </>
  );
}
