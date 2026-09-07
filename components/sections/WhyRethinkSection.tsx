"use client";

import Image from "next/image";
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
  whyRethinkItems,
} from "@/lib/content/homepage-sections";
import { DEFAULT_LOGO } from "@/components/layout/BrandLockup";
import type { PageSection } from "@/types";

export function WhyRethinkSection({ section }: { section?: PageSection }) {
  const cmsItems = section?.items?.map((item, index) => ({
    title: String(item.title ?? ""),
    description: String(item.description ?? ""),
    icon: whyRethinkItems[index]?.icon ?? "Sparkles",
  }));
  const items = cmsItems?.length ? cmsItems : whyRethinkItems;

  return (
    <SectionBackground
      src={SECTION_BACKGROUNDS.why}
      overlay="left"
      position="object-cover object-right"
      className="py-24 md:py-32"
    >
      <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow={section?.eyebrow ?? "Why Rethink"}
            title={
              section?.title ? (
                section.title
              ) : (
                <>
                  More Than Marketing, A{" "}
                  <GradientText>Competitive Advantage.</GradientText>
                </>
              )
            }
            subtitle={
              section?.subtitle ?? "Replace with client-approved differentiation copy."
            }
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {items.map((item, index) => {
              const Icon = getLucideIcon(item.icon);
              return (
                <ScrollReveal key={item.title} delay={index * 0.08}>
                  <GlassCard className="h-full">
                    <Icon className="mb-3 h-6 w-6 text-cyan" />
                    <h3 className="font-heading text-base font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-silver">{item.description}</p>
                  </GlassCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        <ScrollReveal delay={0.15} className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-electric/20 via-violet/15 to-magenta/10 blur-3xl" />
            <Image
              src={DEFAULT_LOGO}
              alt="Rethink Automotive"
              width={480}
              height={480}
              className="relative mx-auto h-auto w-full max-w-[320px] object-contain drop-shadow-[0_0_80px_rgba(0,210,255,0.2)] lg:max-w-[380px]"
            />
          </div>
        </ScrollReveal>
      </div>
    </SectionBackground>
  );
}
