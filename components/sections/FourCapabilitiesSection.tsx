"use client";

import { getLucideIcon } from "@/lib/utils/icons";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import {
  SectionBackground,
  SectionHeading,
  GlassCard,
} from "./SectionBackground";
import { DemoCtaBlock } from "@/components/ui/ConversionCta";
import { homepageCopy } from "@/lib/content/revisions";

export function FourCapabilitiesSection() {
  const copy = homepageCopy.capabilities;

  return (
    <SectionBackground overlay="dark" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="Four Core Capabilities"
            title={copy.headline}
            align="center"
            className="mx-auto mb-14 w-full text-center"
          />

          <div className="grid gap-6 sm:grid-cols-2">
            {copy.items.map((item, index) => {
              const Icon = getLucideIcon(item.icon);
              return (
                <ScrollReveal key={item.title} delay={index * 0.08}>
                  <GlassCard className="h-full border-white/10">
                    <Icon className="mb-3 h-6 w-6 text-electric" />
                    <h3 className="font-heading text-lg font-semibold uppercase tracking-wide">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-silver">
                      {item.description}
                    </p>
                  </GlassCard>
                </ScrollReveal>
              );
            })}
          </div>

        <ScrollReveal delay={0.25} className="mx-auto mt-12 max-w-3xl">
          <DemoCtaBlock text={copy.ctaBlock} ctaLabel={copy.ctaLabel} />
        </ScrollReveal>
        </div>
      </div>
    </SectionBackground>
  );
}
