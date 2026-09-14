"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionBackground } from "./SectionBackground";
import { DemoCtaButton } from "@/components/ui/ConversionCta";
import { homepageCopy } from "@/lib/content/revisions";

export function FinalDemoCtaSection() {
  const copy = homepageCopy.finalCta;

  return (
    <SectionBackground overlay="dark" className="page-section-compact">
      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <ScrollReveal className="w-full">
            <h2 className="font-heading text-xl font-bold leading-snug sm:text-2xl md:text-[1.75rem]">
              {copy.headline}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="mt-5 flex w-full justify-center md:mt-6">
            <DemoCtaButton size="lg" />
          </ScrollReveal>
        </div>
      </div>
    </SectionBackground>
  );
}
