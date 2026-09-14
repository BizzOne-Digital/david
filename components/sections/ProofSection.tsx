"use client";

import { Check } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionBackground } from "./SectionBackground";
import { homepageCopy } from "@/lib/content/revisions";

export function ProofSection() {
  const copy = homepageCopy.proof;

  return (
    <SectionBackground overlay="dark" className="page-section-compact">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-8">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric">
              {copy.eyebrow}
            </p>
            <h2 className="mt-2 font-heading text-xl font-bold leading-snug sm:text-2xl md:text-[1.75rem]">
              {copy.headline}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-silver md:text-base">{copy.copy}</p>
          </div>
          <div className="space-y-2.5">
            {copy.points.map((point, index) => (
              <ScrollReveal key={point} delay={index * 0.06}>
                <div className="flex gap-2.5 rounded-lg border border-white/10 bg-black/30 p-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                  <p className="text-sm text-silver">{point}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
        <ScrollReveal delay={0.2} className="mt-6 rounded-lg border border-cyan/20 bg-black/30 p-4 text-center md:mt-8">
          <p className="text-xs uppercase tracking-[0.2em] text-electric">
            Creative + Campaign + AI + Dashboard + Advisory
          </p>
          <p className="mt-1.5 text-sm text-silver">
            Launch capability in as little as 3 days for applicable programs.
          </p>
        </ScrollReveal>
      </div>
    </SectionBackground>
  );
}
