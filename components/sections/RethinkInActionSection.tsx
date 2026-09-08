"use client";

import { getLucideIcon } from "@/lib/utils/icons";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import {
  SectionBackground,
  SectionHeading,
  GlassCard,
} from "./SectionBackground";
import { homepageCopy } from "@/lib/content/revisions";

export function RethinkInActionSection() {
  const copy = homepageCopy.rethinkInAction;

  return (
    <SectionBackground id="rethink-in-action" overlay="dark" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Rethink in Action"
          title={copy.headline}
          align="center"
          className="mx-auto mb-14 w-full max-w-4xl text-center"
        />

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {copy.steps.map((step, index) => {
            const Icon = getLucideIcon(step.icon);
            return (
              <ScrollReveal key={step.label} delay={index * 0.1}>
                <GlassCard className="relative h-full border-white/10 bg-graphite text-center shadow-none">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-heading text-base font-semibold uppercase tracking-wider">
                    {step.label}
                  </h3>
                  <p className="mt-2 text-sm text-silver">{step.description}</p>
                </GlassCard>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.3} className="mx-auto mt-12 max-w-3xl text-center">
          <p className="text-lg text-silver">{copy.tagline}</p>
        </ScrollReveal>
      </div>
    </SectionBackground>
  );
}
