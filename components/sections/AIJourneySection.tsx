"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getLucideIcon } from "@/lib/utils/icons";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/button";
import {
  SectionBackground,
  SectionHeading,
  GlassCard,
  GradientText,
} from "./SectionBackground";
import {
  SECTION_BACKGROUNDS,
  journeySteps,
} from "@/lib/content/homepage-sections";

export function AIJourneySection() {
  return (
    <SectionBackground
      src={SECTION_BACKGROUNDS.journey}
      overlay="center"
      position="object-cover object-center"
      className="py-24 md:py-32"
    >
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="The Journey"
              title={
                <>
                  From Interest To{" "}
                  <GradientText>Opportunity.</GradientText>
                </>
              }
              subtitle="A conceptual view of how dealership marketing can connect audience, engagement, and appointment opportunities."
            />
            <ScrollReveal delay={0.2} className="mt-8">
              <Button asChild variant="outline" className="border-electric/40 bg-black/30 uppercase tracking-wider">
                <Link href="/services">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </ScrollReveal>
          </div>

          <div className="relative">
            <div
              className="absolute left-[16%] right-[16%] top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-electric via-violet to-magenta md:block"
              aria-hidden
            />
            <div className="grid gap-6 md:grid-cols-3">
              {journeySteps.map((step, index) => {
                const Icon = getLucideIcon(step.icon);
                return (
                  <ScrollReveal key={step.label} delay={index * 0.12}>
                    <GlassCard className="relative text-center">
                      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-cyan/30 bg-gradient-brand glow-cyan">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-heading text-lg font-semibold uppercase tracking-wider">
                        {step.label}
                      </h3>
                      <p className="mt-2 text-sm text-silver">{step.description}</p>
                    </GlassCard>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </SectionBackground>
  );
}
