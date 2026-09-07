"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { getSectionBackgroundImageClass } from "@/lib/utils/background-image";
import { homepageCopy } from "@/lib/content/revisions";
import type { PageSection } from "@/types";

const HERO_BACKGROUND = "/images/hero-bg.jpg";

const MOBILE_HEADLINE_LINES = [
  { text: "YOU'RE", accent: false },
  { text: "SITTING", accent: false },
  { text: "ON", accent: false },
  { text: "DEALS", accent: true },
  { text: "YOU'RE", accent: false },
  { text: "NOT", accent: false },
  { text: "CLOSING.", accent: false },
] as const;

function HeroHeadlineDesktop({ text }: { text: string }) {
  const match = text.match(/^(.*?)(\bDEALS\b|\bDeals\b|\bdeals\b)(.*)$/i);

  if (!match) {
    return (
      <h1 className="hidden font-heading text-5xl font-bold uppercase leading-[1.05] tracking-tight md:block lg:text-[4.25rem]">
        {text}
      </h1>
    );
  }

  const [, before, deals, after] = match;

  return (
    <h1 className="hidden font-heading text-5xl font-bold uppercase leading-[1.05] tracking-tight md:block lg:text-[4.25rem]">
      {before}
      <span className="text-[#ff6b00]">{deals.toUpperCase()}</span>
      {after}
    </h1>
  );
}

function HeroHeadlineMobile() {
  return (
    <h1 className="font-heading md:hidden" aria-label="You're sitting on deals you're not closing.">
      {MOBILE_HEADLINE_LINES.map((line) => (
        <span
          key={line.text}
          className={cn(
            "block font-bold uppercase leading-[0.92] tracking-tight",
            line.accent ?
              "text-[2.35rem] text-[#ff6b00] sm:text-[2.5rem]"
            : "text-[2rem] text-white sm:text-[2.15rem]"
          )}
        >
          {line.text}
        </span>
      ))}
    </h1>
  );
}

function HeroSignatureDesktop({ text }: { text: string }) {
  const match = text.match(/^(I'm not\s+)(lion.*)$/i);

  if (!match) {
    return (
      <p className="hero-signature mt-6 hidden text-3xl text-white md:block lg:text-4xl">
        {text}
      </p>
    );
  }

  const [, prefix, lionPart] = match;

  return (
    <p className="hero-signature mt-6 hidden text-3xl text-white md:block lg:text-4xl">
      {prefix}
      <span className="text-[#ff6b00] underline decoration-[#ff6b00] decoration-[3px] underline-offset-[6px]">
        {lionPart}
      </span>
    </p>
  );
}

function HeroSignatureMobile() {
  return (
    <div className="hero-signature mt-8 md:hidden">
      <p className="text-[1.75rem] leading-none text-white sm:text-[2rem]">I&apos;m not</p>
      <p className="mt-1 text-[1.75rem] leading-none text-[#ff6b00] underline decoration-[#ff6b00] decoration-[3px] underline-offset-[8px] sm:text-[2rem]">
        lion...
      </p>
    </div>
  );
}

export function HeroSection({ section }: { section?: PageSection }) {
  const copy = homepageCopy.hero;

  const headline = section?.title ?? copy.headline;
  const signature = section?.eyebrow ?? copy.signature;

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
          className={getSectionBackgroundImageClass(
            "object-cover object-[88%_42%] md:object-[72%_center]"
          )}
          aria-hidden
        />
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/15 max-md:from-black/88 max-md:via-black/45 max-md:to-black/10"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20 md:from-black/70 md:via-transparent md:to-black/25"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] flex-col px-4 pb-10 pt-4 md:min-h-[calc(100vh-72px)] md:justify-center md:pb-20 md:pt-32">
        <div className="flex flex-1 flex-col justify-center md:block md:max-w-4xl">
          <ScrollReveal>
            <HeroHeadlineMobile />
            <HeroHeadlineDesktop text={headline} />
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="hidden md:block">
            <HeroSignatureDesktop text={signature} />
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.2}>
          <HeroSignatureMobile />
        </ScrollReveal>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[2] h-16 bg-gradient-to-t from-black to-transparent md:h-20"
        aria-hidden
      />
    </section>
  );
}
