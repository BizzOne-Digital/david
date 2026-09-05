"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Calendar, Mail, Users } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { getSectionBackgroundImageClass } from "@/lib/utils/background-image";
import { SECTION_BACKGROUNDS } from "@/lib/content/homepage-sections";
import type { PageSection } from "@/types";

const heroCards = [
  {
    label: "Engage",
    icon: Mail,
    iconClass: "from-violet via-magenta to-pink-400",
    position: "left-[50%] top-[14%] xl:left-[52%] xl:top-[12%]",
  },
  {
    label: "Nurture",
    icon: Users,
    iconClass: "from-electric via-royal to-violet",
    position: "left-[42%] top-[34%] xl:left-[44%] xl:top-[32%]",
  },
  {
    label: "Convert",
    icon: BarChart3,
    iconClass: "from-cyan via-electric to-royal",
    position: "left-[60%] top-[8%] xl:left-[62%] xl:top-[6%]",
  },
] as const;

function HeroNeonLines() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[1] hidden h-full w-full lg:block"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="heroLineBlue" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0033ff" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="heroLinePurple" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6b00ff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#ff00ff" stopOpacity="0.85" />
        </linearGradient>
        <filter id="heroGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d="M760 620 C820 520, 860 420, 700 260"
        fill="none"
        stroke="url(#heroLineBlue)"
        strokeWidth="3"
        filter="url(#heroGlow)"
        opacity="0.9"
      />
      <path
        d="M820 650 C780 500, 720 420, 620 380"
        fill="none"
        stroke="url(#heroLinePurple)"
        strokeWidth="3"
        filter="url(#heroGlow)"
        opacity="0.85"
      />
      <path
        d="M900 640 C920 480, 900 320, 860 180"
        fill="none"
        stroke="url(#heroLineBlue)"
        strokeWidth="3"
        filter="url(#heroGlow)"
        opacity="0.9"
      />
    </svg>
  );
}

function HeroFloatingCards() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 z-[2] hidden lg:block">
      {heroCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <ScrollReveal
            key={card.label}
            delay={0.25 + index * 0.12}
            className={`absolute ${card.position} w-[148px]`}
          >
            <motion.div
              animate={reducedMotion ? undefined : { y: [0, -8, 0] }}
              transition={{
                duration: 4 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="rounded-2xl border border-white/20 bg-black/35 p-4 shadow-[0_0_30px_rgba(0,210,255,0.18)] backdrop-blur-xl"
            >
              <div
                className={`mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${card.iconClass} shadow-[0_0_20px_rgba(0,210,255,0.35)]`}
              >
                <Icon className="h-5 w-5 text-white" />
              </div>
              <p className="text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-white">
                {card.label}
              </p>
            </motion.div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}

export function HeroSection({ section }: { section?: PageSection }) {
  const { settings } = useSiteSettings();

  const eyebrow = section?.eyebrow ?? "AI-Powered Automotive Marketing";
  const title =
    section?.title ?? "Rethink How Your Dealership Creates Demand.";
  const subtitle =
    section?.subtitle ??
    "Smarter email and AI marketing systems built to create, nurture, and convert more dealership opportunities.";
  const primaryCtaUrl = section?.ctaUrl ?? settings.headerCtaUrl;
  const primaryCtaLabel = section?.ctaLabel ?? settings.headerCtaLabel;

  return (
    <section className="relative isolate min-h-screen w-full max-w-full overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={SECTION_BACKGROUNDS.hero}
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className={getSectionBackgroundImageClass("object-cover object-[62%_center]")}
          aria-hidden
        />
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/55 to-black/5 max-md:from-black/94 max-md:via-black/82 max-md:to-black/75"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_78%_55%,rgba(0,210,255,0.12),transparent_70%)]"
        aria-hidden
      />

      <HeroNeonLines />
      <HeroFloatingCards />

      <div className="pointer-events-none absolute bottom-28 right-6 z-[2] hidden text-right xl:block">
        <p className="text-[10px] font-medium uppercase leading-[1.9] tracking-[0.35em] text-white/70 [writing-mode:vertical-rl] rotate-180">
          More Conversations
          <br />
          A Stronger Dealership
          <br />
          Tomorrow
        </p>
      </div>

      <div className="container relative z-10 mx-auto flex min-h-screen flex-col px-4 pb-24 pt-28 md:pt-32">
        <div className="flex flex-1 flex-col justify-center">
          <div className="max-w-2xl">
            <ScrollReveal>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-electric sm:text-[11px] md:tracking-[0.35em]">
                {eyebrow}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="mt-5 break-words font-heading text-[2rem] font-bold leading-[1.08] sm:text-[2.35rem] md:text-5xl lg:text-[3.65rem] lg:leading-[1.06]">
                {section?.title ? (
                  title
                ) : (
                  <>
                    Rethink How Your Dealership{" "}
                    <span className="text-gradient-hero">Creates Demand.</span>
                  </>
                )}
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
                {subtitle}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <MagneticButton
                  href={primaryCtaUrl}
                  className="w-full justify-center uppercase tracking-[0.08em] sm:w-auto sm:tracking-[0.12em]"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {primaryCtaLabel}
                </MagneticButton>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full border-white/35 bg-black/25 uppercase tracking-[0.08em] backdrop-blur-sm hover:border-cyan hover:bg-white/5 sm:w-auto sm:tracking-[0.12em]"
                >
                  <Link href="/products">
                    Explore Solutions
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between gap-6 pt-10">
          <ScrollReveal delay={0.35}>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-[9px] font-medium uppercase tracking-[0.18em] text-white/45 sm:gap-x-4 sm:text-[10px] md:text-[11px] md:tracking-[0.35em]">
              <span className="hidden h-px w-6 bg-white/25 sm:inline sm:w-8" aria-hidden />
              <span>Dealerships</span>
              <span className="text-white/25">People</span>
              <span className="text-white/25">Possibilities</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4} className="hidden md:block">
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/40">
              Automotive Marketing for What&apos;s Next
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[2] h-24 bg-gradient-to-t from-black to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[3] h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent"
        aria-hidden
      />
    </section>
  );
}
