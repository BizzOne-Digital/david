"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import {
  SectionBackground,
  SectionHeading,
} from "./SectionBackground";
import { DemoCtaButton, SecondaryCtaButton } from "@/components/ui/ConversionCta";
import { homepageCopy } from "@/lib/content/revisions";

export function DealerIntelligenceSection() {
  const copy = homepageCopy.dealerIntelligence;

  return (
    <SectionBackground overlay="dark" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <SectionHeading
            eyebrow={copy.eyebrow}
            title={copy.headline}
            subtitle={copy.copy}
            align="center"
            className="w-full"
          />
          <ScrollReveal
            delay={0.2}
            className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <DemoCtaButton size="lg" />
            <SecondaryCtaButton size="lg" />
          </ScrollReveal>
        </div>
      </div>
    </SectionBackground>
  );
}
