"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { DemoCtaButton, SecondaryCtaButton } from "@/components/ui/ConversionCta";
import { aboutCopy } from "@/lib/content/revisions";
import {
  SectionBackground,
  SectionHeading,
  GlassCard,
} from "@/components/sections/SectionBackground";
import type { PageSection } from "@/types";

interface AboutPageContentProps {
  storySection?: PageSection;
}

export function AboutPageContent({ storySection }: AboutPageContentProps) {
  return (
    <>
      <SectionBackground overlay="dark" className="min-h-[70vh] py-24 md:py-32">
        <div className="container mx-auto px-4 pt-16">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <ScrollReveal className="w-full">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-electric">
                About Rethink Automotive
              </p>
              <h1 className="mt-5 font-heading text-4xl font-bold uppercase leading-[1.1] md:text-5xl lg:text-6xl">
                {aboutCopy.headline}
              </h1>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <DemoCtaButton size="lg" />
                <SecondaryCtaButton href="#our-story" size="lg">
                  Read Our Story
                </SecondaryCtaButton>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </SectionBackground>

      <SectionBackground id="our-story" overlay="dark" className="py-24 md:py-32">
        <div className="container mx-auto max-w-4xl px-4">
          <SectionHeading eyebrow="Our Story" title="Why Rethink Exists" />
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-silver">
            {storySection?.content ? (
              <p>{storySection.content}</p>
            ) : (
              aboutCopy.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))
            )}
          </div>
          <ScrollReveal delay={0.2} className="mt-10">
            <GlassCard className="border-white/10">
              <p className="text-xl font-medium text-white md:text-2xl">{aboutCopy.philosophy}</p>
            </GlassCard>
          </ScrollReveal>
        </div>
      </SectionBackground>

      <SectionBackground overlay="dark" className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 className="font-heading text-3xl font-bold uppercase md:text-4xl">
              {aboutCopy.closingHeadline}
            </h2>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <DemoCtaButton size="lg" />
              <Link
                href="/consulting"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-electric hover:text-white"
              >
                Explore Consulting
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </SectionBackground>
    </>
  );
}
