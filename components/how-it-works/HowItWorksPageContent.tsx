"use client";

import { SectionBackground } from "@/components/sections/SectionBackground";
import { RethinkInActionWorkflow } from "@/components/sections/RethinkInActionWorkflow";
import { homepageCopy, howItWorksPageCopy } from "@/lib/content/revisions";

export function HowItWorksPageContent() {
  return (
    <>
      <SectionBackground overlay="dark" className="page-hero-section pb-8 md:pb-10">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric md:tracking-[0.3em]">
              {howItWorksPageCopy.eyebrow}
            </p>
            <h1 className="mt-2 font-heading text-xl font-bold leading-snug sm:text-2xl md:text-[1.75rem]">
              {howItWorksPageCopy.headline}
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-silver md:text-base">
              {howItWorksPageCopy.subhead}
            </p>
          </div>
        </div>
      </SectionBackground>

      <SectionBackground id="workflow" overlay="dark" className="page-section-after-hero pb-8 pt-4 md:pb-10 md:pt-5">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-5 max-w-3xl text-center md:mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric">
              The Workflow
            </p>
            <h2 className="mt-2 font-heading text-xl font-bold leading-snug sm:text-2xl md:text-[1.75rem]">
              From New Lead to Qualified Opportunity
            </h2>
          </div>
          <RethinkInActionWorkflow />
        </div>
      </SectionBackground>

      <SectionBackground overlay="dark" className="pb-8 pt-6 md:pb-10 md:pt-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 className="font-heading text-xl font-bold leading-snug sm:text-2xl md:text-[1.75rem]">
              {homepageCopy.finalCta.headline}
            </h2>
          </div>
        </div>
      </SectionBackground>
    </>
  );
}
