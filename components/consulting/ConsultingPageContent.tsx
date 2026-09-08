"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import {
  SectionBackground,
  SectionHeading,
  GlassCard,
} from "@/components/sections/SectionBackground";
import { DemoCtaButton, SecondaryCtaButton } from "@/components/ui/ConversionCta";
import { consultingCopy } from "@/lib/content/revisions";

export function ConsultingPageContent() {
  return (
    <>
      <SectionBackground overlay="dark" className="min-h-[60vh] py-24 md:py-32">
        <div className="container mx-auto px-4 pt-16">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <ScrollReveal className="w-full">
              <SectionHeading
                eyebrow="Consulting Services"
                title={consultingCopy.headline}
                subtitle={consultingCopy.intro}
                align="center"
                className="w-full"
              />
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <DemoCtaButton size="lg" />
                <SecondaryCtaButton href="/contact" size="lg">
                  {consultingCopy.secondaryCta}
                </SecondaryCtaButton>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </SectionBackground>

      <SectionBackground overlay="dark" className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="What We Help With"
            title="Consulting Services"
            align="center"
            className="mx-auto mb-14 w-full text-center"
          />
          <div className="grid gap-6 md:grid-cols-2">
            {consultingCopy.services.map((service, index) => (
              <ScrollReveal key={service.title} delay={index * 0.06}>
                <GlassCard className="h-full border-white/10">
                  <div className="flex gap-3">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-[#ff6b00]" />
                    <div>
                      <h3 className="font-heading text-lg font-semibold">{service.title}</h3>
                      <p className="mt-2 text-sm text-silver">{service.description}</p>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </SectionBackground>

      <SectionBackground overlay="dark" className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <GlassCard className="mx-auto max-w-3xl border-white/10 text-center">
            <p className="text-lg text-silver">{consultingCopy.transition}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <DemoCtaButton size="lg" />
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-electric hover:text-white"
              >
                {consultingCopy.secondaryCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </GlassCard>
        </div>
      </SectionBackground>
    </>
  );
}
