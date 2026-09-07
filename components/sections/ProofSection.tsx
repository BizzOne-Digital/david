"use client";

import { Check } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionBackground, SectionHeading } from "./SectionBackground";
import { homepageCopy } from "@/lib/content/revisions";

export function ProofSection() {
  const copy = homepageCopy.proof;

  return (
    <SectionBackground overlay="dark" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <SectionHeading eyebrow={copy.eyebrow} title={copy.headline} subtitle={copy.copy} />
          <div className="space-y-4">
            {copy.points.map((point, index) => (
              <ScrollReveal key={point} delay={index * 0.06}>
                <div className="flex gap-3 rounded-xl border border-white/10 bg-black/30 p-4">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#ff6b00]" />
                  <p className="text-sm text-silver md:text-base">{point}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
        <ScrollReveal delay={0.2} className="mt-10 rounded-xl border border-cyan/20 bg-black/30 p-6 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-electric">
            Creative + Campaign + AI + Dashboard + Advisory
          </p>
          <p className="mt-2 text-silver">
            Launch capability in as little as 3 days for applicable programs.
          </p>
        </ScrollReveal>
      </div>
    </SectionBackground>
  );
}
