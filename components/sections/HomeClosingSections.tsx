"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionBackground, SectionHeading, GlassCard } from "./SectionBackground";
import { DemoCtaButton } from "@/components/ui/ConversionCta";
import { homepageCopy } from "@/lib/content/revisions";

export function ConsultingTeaserSection() {
  const copy = homepageCopy.consultingTeaser;

  return (
    <SectionBackground overlay="left" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <GlassCard className="mx-auto max-w-4xl">
          <SectionHeading eyebrow={copy.eyebrow} title={copy.headline} subtitle={copy.copy} />
          <ScrollReveal delay={0.15} className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-sm text-[#ff6b00]">{copy.philosophy}</p>
            <Link
              href="/consulting"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-cyan hover:text-white"
            >
              Explore Consulting
              <ArrowRight className="h-4 w-4" />
            </Link>
          </ScrollReveal>
        </GlassCard>
      </div>
    </SectionBackground>
  );
}

export function FutureFuelTeaserSection() {
  const copy = homepageCopy.futureFuelTeaser;

  return (
    <SectionBackground overlay="center" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            eyebrow={copy.eyebrow}
            title={copy.headline}
            subtitle={copy.copy}
            align="center"
            className="mx-auto"
          />
          <ScrollReveal delay={0.2} className="mt-8">
            <DemoCtaButton href="/future-fuel" size="lg">
              Request a Future Fuel Demo
            </DemoCtaButton>
          </ScrollReveal>
        </div>
      </div>
    </SectionBackground>
  );
}

export function AboutTeaserSection() {
  const copy = homepageCopy.aboutTeaser;

  return (
    <SectionBackground overlay="dark" className="py-24 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <SectionHeading
          eyebrow="About Rethink"
          title={copy.headline}
          subtitle={copy.copy}
          align="center"
          className="mx-auto"
        />
        <ScrollReveal delay={0.2} className="mt-8">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-cyan hover:text-white"
          >
            Read Our Story
            <ArrowRight className="h-4 w-4" />
          </Link>
        </ScrollReveal>
      </div>
    </SectionBackground>
  );
}

export function FinalDemoCtaSection() {
  const copy = homepageCopy.finalCta;

  return (
    <SectionBackground overlay="center" className="py-24 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <ScrollReveal>
          <h2 className="mx-auto max-w-4xl font-heading text-3xl font-bold uppercase leading-tight md:text-4xl lg:text-5xl">
            {copy.headline}
          </h2>
          <div className="mt-8">
            <DemoCtaButton size="lg" />
          </div>
        </ScrollReveal>
      </div>
    </SectionBackground>
  );
}
