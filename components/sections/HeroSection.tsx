"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { homepageCopy } from "@/lib/content/revisions";

const HERO_BACKGROUND = "/images/hero-bg.jpg";

/** Mockup line breaks — desktop & mobile */
const HEADLINE_LINES = [
  { text: "YOU'RE", accent: false },
  { text: "SITTING ON", accent: false },
  { text: "DEALS", accent: true },
  { text: "YOU'RE NOT", accent: false },
  { text: "CLOSING.", accent: false },
] as const;

function HeroHeadline() {
  return (
    <h1
      className="font-heading uppercase tracking-tight"
      aria-label="You're sitting on deals you're not closing."
    >
      {HEADLINE_LINES.map((line) => (
        <span
          key={line.text}
          className={cn(
            "block font-bold leading-[0.92]",
            line.accent ?
              "text-[2.35rem] text-brand-orange sm:text-[2.5rem] md:text-[3.25rem] lg:text-[3.75rem] xl:text-[4.25rem]"
            : "text-[2rem] text-white sm:text-[2.15rem] md:text-[3rem] lg:text-[3.5rem] xl:text-[4rem]"
          )}
        >
          {line.text}
        </span>
      ))}
    </h1>
  );
}

function HeroSignature() {
  return (
    <div className="hero-signature mt-6 md:mt-8">
      <p className="text-[1.75rem] leading-none text-white sm:text-[2rem] md:text-[2.25rem] lg:text-[2.5rem]">
        I&apos;m not{" "}
        <span className="text-brand-orange underline decoration-brand-orange decoration-[3px] underline-offset-[6px] md:underline-offset-[8px]">
          lion…
        </span>
      </p>
    </div>
  );
}

export function HeroSection() {
  const copy = homepageCopy.hero;

  return (
    <section className="relative isolate w-full max-w-full overflow-hidden bg-black">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={HERO_BACKGROUND}
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className={cn(
            "h-full w-full object-cover",
            "origin-[78%_38%] object-[78%_38%] max-md:scale-[1.12] max-md:brightness-[1.12] max-md:saturate-[1.08]",
            "sm:object-[74%_40%] md:scale-100 md:brightness-100 md:saturate-100 md:object-[78%_center] lg:object-[72%_center]"
          )}
          aria-hidden
        />
      </div>

      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.72)_38%,rgba(0,0,0,0.35)_58%,rgba(0,0,0,0.08)_78%,transparent_100%)] max-md:bg-[linear-gradient(165deg,rgba(0,0,0,0.52)_0%,rgba(0,0,0,0.32)_30%,rgba(0,0,0,0.12)_55%,rgba(0,0,0,0.03)_75%,transparent_90%)]"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto flex min-h-[calc(100svh-var(--site-header-offset,4rem))] items-start px-4 pb-28 pt-6 sm:items-center sm:py-10 md:min-h-[calc(100vh-var(--site-header-offset,4rem))] md:py-16">
        <div className="w-full max-w-[34rem] lg:max-w-[38rem]">
          <ScrollReveal>
            <HeroHeadline />
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <HeroSignature />
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <p className="mt-5 max-w-xl text-base font-bold leading-relaxed text-white sm:mt-6 md:mt-8 md:text-lg md:font-normal md:text-silver">
              {copy.supporting}
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[2] h-10 bg-black md:h-14"
        aria-hidden
      />
    </section>
  );
}
