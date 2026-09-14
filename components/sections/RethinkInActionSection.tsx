"use client";

import {
  SectionBackground,
} from "./SectionBackground";
import { RethinkInActionWorkflow } from "./RethinkInActionWorkflow";
import { homepageCopy } from "@/lib/content/revisions";

export function RethinkInActionSection() {
  const copy = homepageCopy.rethinkInAction;

  return (
    <SectionBackground id="rethink-in-action" overlay="dark" className="page-section-compact">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-5 max-w-3xl text-center md:mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric md:tracking-[0.3em]">
            Rethink in Action
          </p>
          <h2 className="mt-2 font-heading text-xl font-bold leading-snug sm:text-2xl md:text-[1.75rem]">
            {copy.headline}
          </h2>
        </div>
        <RethinkInActionWorkflow />
      </div>
    </SectionBackground>
  );
}
