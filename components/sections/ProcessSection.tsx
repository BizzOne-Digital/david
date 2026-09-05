"use client";

import { ChevronRight } from "lucide-react";
import { getLucideIcon } from "@/lib/utils/icons";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import {
  SectionBackground,
  SectionHeading,
  GlassCard,
  GradientText,
} from "./SectionBackground";
import {
  SECTION_BACKGROUNDS,
  processSteps,
} from "@/lib/content/homepage-sections";
import type { PageSection } from "@/types";

export function ProcessSection({ section }: { section?: PageSection }) {
  const cmsSteps = section?.items?.map((item, index) => ({
    step: String(index + 1).padStart(2, "0"),
    title: String(item.step ?? item.title ?? ""),
    description: String(item.description ?? ""),
    icon: processSteps[index]?.icon ?? "Circle",
  }));
  const steps = cmsSteps?.length ? cmsSteps : processSteps;

  return (
    <SectionBackground
      src={SECTION_BACKGROUNDS.process}
      overlay="center"
      position="object-cover object-center"
      className="py-24 md:py-32"
    >
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow={section?.eyebrow ?? "Our Process"}
          title={
            section?.title ? (
              section.title
            ) : (
              <>
                Simple Steps.{" "}
                <GradientText>Measurable Growth.</GradientText>
              </>
            )
          }
          align="center"
          className="mx-auto mb-14 text-center"
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = getLucideIcon(step.icon);
            return (
              <ScrollReveal key={step.step} delay={index * 0.1} className="relative">
                <GlassCard className="h-full text-center">
                  <p className="font-mono text-3xl font-bold text-gradient">{step.step}</p>
                  <div className="mx-auto my-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold uppercase tracking-wider">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm text-silver">{step.description}</p>
                </GlassCard>
                {index < steps.length - 1 && (
                  <ChevronRight
                    className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-cyan/60 xl:block"
                    aria-hidden
                  />
                )}
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </SectionBackground>
  );
}
