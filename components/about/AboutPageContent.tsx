"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { aboutCopy } from "@/lib/content/revisions";
import { SectionBackground, GlassCard } from "@/components/sections/SectionBackground";

export function AboutPageContent() {
  return (
    <>
      <SectionBackground overlay="dark" className="page-hero-section pb-10 md:pb-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-electric">
                About Rethink Automotive
              </p>
              <h1 className="mt-3 font-heading text-2xl font-bold leading-snug sm:text-3xl md:text-[2rem]">
                {aboutCopy.headline}
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.08} className="mt-6 md:mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric">
                Our Story
              </p>
              <div className="mt-4 space-y-3 text-left text-sm leading-relaxed text-silver md:text-base">
                {aboutCopy.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
              <GlassCard className="mt-5 border-white/10 p-4 text-left md:p-5">
                <p className="text-base font-medium leading-snug text-white md:text-lg">
                  {aboutCopy.philosophy}
                </p>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </SectionBackground>

      <SectionBackground overlay="dark" className="page-section-compact">
        <div className="container mx-auto px-4">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              {aboutCopy.closingHeadline}
            </h2>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
