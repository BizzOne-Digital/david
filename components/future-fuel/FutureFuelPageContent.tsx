"use client";

import { Check } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionBackground, GlassCard } from "@/components/sections/SectionBackground";
import { futureFuelCopy } from "@/lib/content/revisions";

export function FutureFuelPageContent() {
  return (
    <>
      <SectionBackground overlay="dark" className="page-hero-section pb-10 md:pb-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-electric">
                Future Fuel Intelligence
              </p>
              <h1 className="mt-3 font-heading text-2xl font-bold leading-snug sm:text-3xl md:text-[2rem]">
                {futureFuelCopy.headline}
              </h1>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-silver md:text-base">
                {futureFuelCopy.copy}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.08} className="mt-5 md:mt-6">
              <GlassCard className="border-white/10 p-4 text-left md:p-5">
                <ul className="space-y-1">
                  {futureFuelCopy.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-orange" />
                      <p className="text-sm leading-tight text-silver">{bullet}</p>
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
