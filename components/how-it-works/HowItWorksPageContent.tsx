"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SecondaryCtaButton } from "@/components/ui/ConversionCta";
import { SectionBackground, SectionHeading } from "@/components/sections/SectionBackground";
import { RethinkInActionWorkflow } from "@/components/sections/RethinkInActionWorkflow";
import { homepageCopy, howItWorksPageCopy } from "@/lib/content/revisions";

export function HowItWorksPageContent() {
  return (
    <>
      <SectionBackground overlay="dark" className="page-hero-section">
        <div className="container mx-auto px-4">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <SectionHeading
              eyebrow={howItWorksPageCopy.eyebrow}
              title={howItWorksPageCopy.headline}
              subtitle={howItWorksPageCopy.subhead}
              align="center"
              className="w-full"
            />
            <ScrollReveal
              delay={0.15}
              className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <SecondaryCtaButton href="#workflow" size="lg">
                View the Workflow
              </SecondaryCtaButton>
            </ScrollReveal>
          </div>
        </div>
      </SectionBackground>

      <SectionBackground id="workflow" overlay="dark" className="page-section-after-hero">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="The Workflow"
            title="From New Lead to Qualified Opportunity"
            align="center"
            className="mx-auto mb-14 w-full max-w-4xl text-center"
          />
          <RethinkInActionWorkflow />
        </div>
      </SectionBackground>

      <SectionBackground overlay="dark" className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <h2 className="font-heading text-3xl font-bold uppercase leading-tight md:text-4xl lg:text-5xl">
              {homepageCopy.finalCta.headline}
            </h2>
          </div>
        </div>
      </SectionBackground>
    </>
  );
}
