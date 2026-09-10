"use client";

import {
  SectionBackground,
  SectionHeading,
} from "./SectionBackground";
import { RethinkInActionWorkflow } from "./RethinkInActionWorkflow";
import { homepageCopy } from "@/lib/content/revisions";

export function RethinkInActionSection() {
  const copy = homepageCopy.rethinkInAction;

  return (
    <SectionBackground id="rethink-in-action" overlay="dark" className="page-section-after-hero">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Rethink in Action"
          title={copy.headline}
          align="center"
          className="mx-auto mb-8 w-full max-w-4xl text-center"
        />
        <RethinkInActionWorkflow />
      </div>
    </SectionBackground>
  );
}
