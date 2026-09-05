"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Target, Eye, Calendar } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { getLucideIcon } from "@/lib/utils/icons";
import { DEFAULT_LOGO } from "@/components/layout/Logo";
import {
  SectionBackground,
  SectionHeading,
  GlassCard,
  GradientText,
} from "@/components/sections/SectionBackground";
import {
  ABOUT_BACKGROUNDS,
  aboutValues,
  aboutJourneyMilestones,
} from "@/lib/content/about-sections";
import type { PageSection } from "@/types";

interface AboutPageContentProps {
  storySection?: PageSection;
  missionSection?: PageSection;
  visionSection?: PageSection;
  valuesSection?: PageSection;
}

export function AboutPageContent({
  storySection,
  missionSection,
  visionSection,
  valuesSection,
}: AboutPageContentProps) {
  const { settings } = useSiteSettings();
  const cmsValues = valuesSection?.items?.map((item, index) => ({
    title: String(item.title ?? ""),
    description: String(item.description ?? ""),
    icon: aboutValues[index]?.icon ?? "Star",
  }));
  const values = cmsValues?.length ? cmsValues : aboutValues;

  return (
    <>
      {/* Hero */}
      <SectionBackground
        src={ABOUT_BACKGROUNDS.hero}
        overlay="left"
        position="object-cover object-right"
        className="min-h-[90vh]"
      >
        <div className="container mx-auto grid min-h-[90vh] items-center gap-12 px-4 pb-16 pt-28 lg:grid-cols-2 lg:pt-32">
          <div className="max-w-xl">
            <ScrollReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-silver">
                Our Story Drives What&apos;s Next
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="mt-5 font-heading text-4xl font-bold leading-[1.1] md:text-5xl lg:text-6xl">
                Built to Move Dealership Marketing{" "}
                <GradientText>Forward.</GradientText>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-6 text-lg leading-relaxed text-silver">
                Rethink Automotive brings smarter digital, email, and AI-driven
                thinking to the modern dealership journey.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-4">
                <MagneticButton href={settings.headerCtaUrl}>
                  <Calendar className="mr-1 h-4 w-4" />
                  {settings.headerCtaLabel}
                </MagneticButton>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 bg-black/30 uppercase tracking-wider backdrop-blur-sm"
                >
                  <Link href="#our-story">
                    Explore Our Story
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </SectionBackground>

      {/* Our Story */}
      <SectionBackground
        id="our-story"
        src={ABOUT_BACKGROUNDS.story}
        overlay="left"
        position="object-cover object-left"
        className="py-24 md:py-32"
      >
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1" aria-hidden>
            <div className="aspect-[4/3] rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm lg:hidden" />
          </div>
          <div className="order-1 lg:order-2 lg:ml-auto lg:max-w-xl">
            <SectionHeading
              eyebrow={storySection?.eyebrow ?? "Our Story"}
              title={storySection?.title ?? "A New Perspective for a Changing Industry."}
            />
            <ScrollReveal delay={0.15} className="mt-8 space-y-5 text-silver">
              <p className="leading-relaxed">
                {storySection?.content ??
                  "Replace with client-approved company history. Rethink Automotive was founded to give dealerships something different than one-size-fits-all marketing programs."}
              </p>
              {!storySection?.content && (
                <>
                  <p className="leading-relaxed">
                    We combine automotive expertise with modern email and
                    AI-driven systems — helping dealers attract, nurture, and convert
                    more opportunities with clarity and confidence.
                  </p>
                  <p className="text-lg font-medium text-white">
                    Different thinking.{" "}
                    <GradientText>A stronger tomorrow.</GradientText>
                  </p>
                </>
              )}
            </ScrollReveal>
          </div>
        </div>
      </SectionBackground>

      {/* Mission & Vision */}
      <SectionBackground
        src={ABOUT_BACKGROUNDS.mission}
        overlay="center"
        position="object-cover object-center"
        className="py-24 md:py-32"
      >
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Our Mission"
            title={
              <>
                Your Tech. Our Automotive{" "}
                <GradientText>Marketing Focus.</GradientText>
              </>
            }
            align="center"
            className="mx-auto text-center"
          />

          <div className="mx-auto mt-14 grid max-w-4xl gap-8 md:grid-cols-2">
            <ScrollReveal>
              <GlassCard className="h-full text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-heading text-xl font-semibold">Mission</h3>
                <p className="mt-4 text-sm leading-relaxed text-silver md:text-base">
                  {missionSection?.content ??
                    "To empower dealerships with smarter marketing solutions that generate demand, nurture leads, and drive measurable growth."}
                </p>
              </GlassCard>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <GlassCard className="h-full text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-heading text-xl font-semibold">Vision</h3>
                <p className="mt-4 text-sm leading-relaxed text-silver md:text-base">
                  {visionSection?.content ??
                    "To be the most trusted automotive marketing partner for dealerships ready to rethink how they create and convert demand."}
                </p>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </SectionBackground>

      {/* Values */}
      <SectionBackground
        src={ABOUT_BACKGROUNDS.values}
        overlay="dark"
        position="object-cover object-center"
        className="py-24 md:py-32"
      >
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Our Values"
            title="The Beliefs That Drive Us."
            align="center"
            className="mx-auto mb-14 text-center"
          />

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {values.map((value, index) => {
              const Icon = getLucideIcon(value.icon);
              return (
                <ScrollReveal key={value.title} delay={index * 0.08}>
                  <GlassCard className="h-full text-center">
                    <Icon className="mx-auto mb-4 h-7 w-7 text-cyan" />
                    <h3 className="text-sm font-semibold uppercase tracking-[0.15em]">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-silver">
                      {value.description}
                    </p>
                  </GlassCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </SectionBackground>

      {/* Journey Timeline */}
      <SectionBackground
        src={ABOUT_BACKGROUNDS.journey}
        overlay="center"
        position="object-cover object-center"
        className="py-24 md:py-32"
      >
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Our Journey"
            title={
              <>
                A Smarter Road <GradientText>Ahead.</GradientText>
              </>
            }
            align="center"
            className="mx-auto mb-16 text-center"
          />

          <div className="relative">
            <div
              className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent md:block"
              aria-hidden
            />
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
              {aboutJourneyMilestones.map((milestone, index) => (
                <ScrollReveal key={milestone.title} delay={index * 0.1}>
                  <div className="relative text-center">
                    <div className="mx-auto mb-4 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-brand glow-cyan ring-4 ring-black/50" />
                    <h3 className="font-heading text-base font-semibold uppercase tracking-wider md:text-lg">
                      {milestone.title}
                    </h3>
                    <p className="mt-3 text-sm text-silver">{milestone.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </SectionBackground>

      {/* Team & Partnerships */}
      <SectionBackground
        src={ABOUT_BACKGROUNDS.team}
        overlay="left"
        position="object-cover object-right"
        className="py-24 md:py-32"
      >
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-2 lg:items-center">
          <div className="max-w-xl">
            <SectionHeading
              eyebrow="Our Team & Partnerships"
              title={
                <>
                  An Extension of <GradientText>Your Team.</GradientText>
                </>
              }
            />
            <ScrollReveal delay={0.15} className="mt-8 space-y-5 text-silver">
              <p className="leading-relaxed">
                Replace with client-approved team or partnership
                information. Do not invent team members until content is provided.
              </p>
              <p className="leading-relaxed">
                Rethink Automotive works alongside dealership
                leadership and marketing teams — providing strategy, systems, and
                support built for automotive retail.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.1} className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-electric/25 via-violet/15 to-magenta/10 blur-3xl" />
              <Image
                src={DEFAULT_LOGO}
                alt="Rethink Automotive"
                width={420}
                height={420}
                className="relative mx-auto h-auto w-full max-w-[300px] object-contain drop-shadow-[0_0_80px_rgba(0,210,255,0.25)] lg:max-w-[360px]"
              />
            </div>
          </ScrollReveal>
        </div>
      </SectionBackground>

      {/* Final CTA */}
      <SectionBackground
        src={ABOUT_BACKGROUNDS.cta}
        overlay="center"
        position="object-cover object-center"
        className="py-24 md:py-32"
      >
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <GlassCard className="mx-auto max-w-3xl border-gradient text-center md:p-14">
              <h2 className="font-heading text-3xl font-bold md:text-4xl lg:text-5xl">
                Let&apos;s Build What <GradientText>Comes Next.</GradientText>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-silver">
                Ready to explore how Rethink Automotive can support
                your dealership&apos;s marketing goals?
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <MagneticButton href={settings.headerCtaUrl}>
                  {settings.headerCtaLabel}
                </MagneticButton>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-electric/50 bg-black/30 uppercase tracking-wider backdrop-blur-sm"
                >
                  <Link href="/contact">
                    Get in Touch
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </SectionBackground>
    </>
  );
}
