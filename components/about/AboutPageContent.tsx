"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { aboutCopy } from "@/lib/content/revisions";
import { SectionBackground, GlassCard } from "@/components/sections/SectionBackground";

export function AboutPageContent() {
  return (
    <>
      <SectionBackground overlay="dark" className="page-hero-section pb-8 md:pb-10">
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

            <ScrollReveal delay={0.08} className="mt-5 md:mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric">
                Our Story
              </p>
              <div className="mt-3 space-y-2.5 text-left text-sm leading-relaxed text-silver md:text-base">
                {aboutCopy.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
              <GlassCard className="mt-4 border-white/10 p-4 text-left md:p-4">
                <p className="text-base font-medium leading-snug text-white md:text-lg">
                  {aboutCopy.philosophy}
                </p>
              </GlassCard>
              <div className="mt-4 flex justify-center md:mt-5">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-electric hover:text-white"
                >
                  Contact Us Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </SectionBackground>
    </>
  );
}
