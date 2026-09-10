"use client";

import { Check } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import {
  SectionBackground,
  SectionHeading,
  GlassCard,
} from "@/components/sections/SectionBackground";
import { futureFuelCopy } from "@/lib/content/revisions";

export function FutureFuelPageContent() {
  return (
    <>
      <SectionBackground overlay="dark" className="page-hero-section">
        <div className="container mx-auto px-4">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <ScrollReveal className="w-full">
              <SectionHeading
                eyebrow="Future Fuel Intelligence"
                title={futureFuelCopy.headline}
                subtitle={futureFuelCopy.copy}
                align="center"
                className="w-full"
              />
            </ScrollReveal>
          </div>
        </div>
      </SectionBackground>

      <SectionBackground overlay="dark" className="page-section-after-hero">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="What We Cover"
            title="Future-Fuel Strategy Areas"
            align="center"
            className="mx-auto mb-14 w-full text-center"
          />
          <div className="mx-auto grid max-w-3xl gap-4">
            {futureFuelCopy.bullets.map((bullet, index) => (
              <ScrollReveal key={bullet} delay={index * 0.06}>
                <GlassCard className="flex gap-3 border-white/10 py-5">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                  <p className="text-silver">{bullet}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </SectionBackground>
    </>
  );
}
