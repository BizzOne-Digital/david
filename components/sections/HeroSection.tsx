"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { getSectionBackgroundImageClass } from "@/lib/utils/background-image";
import type { PageSection } from "@/types";

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
              "text-[2.35rem] text-[#ff6b00] sm:text-[2.5rem] md:text-[3.25rem] lg:text-[3.75rem] xl:text-[4.25rem]"
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
        <span className="text-[#ff6b00] underline decoration-[#ff6b00] decoration-[3px] underline-offset-[6px] md:underline-offset-[8px]">
          lion…
        </span>
      </p>
    </div>
  );
}

export function HeroSection(_props: { section?: PageSection }) {
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
            "object-cover object-[82%_45%] md:object-[78%_center] lg:object-[72%_center]"
          )}
          aria-hidden
        />
      </div>

      {/* Left scrim so copy reads like mockup; lion stays visible on the right */}
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.72)_38%,rgba(0,0,0,0.35)_58%,rgba(0,0,0,0.08)_78%,transparent_100%)] max-md:bg-black/72"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] items-center px-4 py-10 md:min-h-[calc(100vh-72px)] md:py-16">
        <div className="w-full max-w-[34rem] lg:max-w-[38rem]">
          <ScrollReveal>
            <HeroHeadline />
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <HeroSignature />
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
