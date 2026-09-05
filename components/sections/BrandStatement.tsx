"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import {
  SectionBackground,
  SectionHeading,
  GradientText,
} from "./SectionBackground";
import { SECTION_BACKGROUNDS } from "@/lib/content/homepage-sections";
import type { PageSection } from "@/types";

export function BrandStatement({ section }: { section?: PageSection }) {
  const title = section?.title;
  const body = section?.content;

  return (
    <SectionBackground
      src={SECTION_BACKGROUNDS.brand}
      overlay="left"
      position="object-cover object-center"
      className="py-24 md:py-32"
    >
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow={section?.eyebrow ?? "Our Philosophy"}
          title={
            title ? (
              title
            ) : (
              <>
                A Brighter Tomorrow Starts With{" "}
                <GradientText>A Smarter Today.</GradientText>
              </>
            )
          }
          subtitle={
            section?.subtitle ??
            "Rethink Automotive helps dealerships move beyond disconnected campaigns with AI-powered and email-driven marketing systems built for measurable growth."
          }
        />
        <ScrollReveal delay={0.2} className="mt-10 max-w-3xl">
          <p className="text-base leading-relaxed text-silver md:text-lg">
            {body ??
              "Replace with client-approved brand statement. Marketing has changed — your systems should evolve with smarter engagement, clearer communication, and flexible digital solutions."}
          </p>
        </ScrollReveal>
      </div>
    </SectionBackground>
  );
}
