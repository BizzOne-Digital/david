"use client";

import {
  SectionBackground,
} from "./SectionBackground";
import { homepageCopy } from "@/lib/content/revisions";

export function DealerIntelligenceSection() {
  const copy = homepageCopy.dealerIntelligence;

  return (
    <SectionBackground overlay="dark" className="page-section-compact">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric md:tracking-[0.3em]">
            {copy.eyebrow}
          </p>
          <h2 className="mt-2 font-heading text-xl font-bold leading-snug sm:text-2xl md:text-[1.75rem]">
            {copy.headline}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-silver md:text-base">
            {copy.copy}
          </p>
        </div>
      </div>
    </SectionBackground>
  );
}
