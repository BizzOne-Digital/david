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
    <SectionBackground overlay="dark" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <GlassCard className="mx-auto max-w-4xl border-white/10">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <SectionHeading
              eyebrow={copy.eyebrow}
              title={copy.headline}
              subtitle={copy.copy}
              align="center"
              className="w-full"
            />
            <ScrollReveal delay={0.15} className="mt-8 flex w-full flex-col items-center gap-4 text-center">
              <p className="font-mono text-sm text-[#ff6b00]">{copy.philosophy}</p>
              <Link
                href="/consulting"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-electric hover:text-white"
              >
                Explore Consulting
                <ArrowRight className="h-4 w-4" />
              </Link>
            </ScrollReveal>
          </div>
        </GlassCard>
      </div>
    </SectionBackground>
  );
}

export function FutureFuelTeaserSection() {
  const copy = homepageCopy.futureFuelTeaser;

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
          <ScrollReveal delay={0.2} className="mt-8 flex w-full justify-center">
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
      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <SectionHeading
            eyebrow="About Rethink"
            title={copy.headline}
            subtitle={copy.copy}
            align="center"
            className="w-full"
          />
          <ScrollReveal delay={0.2} className="mt-8 flex w-full justify-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-cyan hover:text-white"
            >
              Read Our Story
              <ArrowRight className="h-4 w-4" />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </SectionBackground>
  );
}

export function FinalDemoCtaSection() {
  const copy = homepageCopy.finalCta;

  return (
    <SectionBackground overlay="dark" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <ScrollReveal className="w-full">
            <h2 className="font-heading text-3xl font-bold uppercase leading-tight md:text-4xl lg:text-5xl">
              {copy.headline}
            </h2>
            <div className="mt-8 flex w-full justify-center">
              <DemoCtaButton size="lg" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </SectionBackground>
  );
}
