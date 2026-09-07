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
import type { PageSection } from "@/types";

export function FourCapabilitiesSection({ section }: { section?: PageSection }) {
  const copy = homepageCopy.capabilities;
  const cmsItems = section?.items?.map((item, index) => ({
    title: String(item.title ?? ""),
    description: String(item.description ?? ""),
    icon: copy.items[index]?.icon ?? "Sparkles",
  }));
  const items = cmsItems?.length ? cmsItems : copy.items;

  return (
    <SectionBackground overlay="left" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Core Capabilities"
          title={section?.title ?? copy.headline}
          align="center"
          className="mx-auto mb-14 text-center"
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {items.map((item, index) => {
            const Icon = getLucideIcon(item.icon);
            return (
              <ScrollReveal key={item.title} delay={index * 0.08}>
                <GlassCard className="h-full">
                  <Icon className="mb-3 h-6 w-6 text-cyan" />
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

        <ScrollReveal delay={0.25} className="mt-12">
          <DemoCtaBlock text={copy.ctaBlock} ctaLabel={copy.ctaLabel} />
        </ScrollReveal>
      </div>
    </SectionBackground>
  );
}
