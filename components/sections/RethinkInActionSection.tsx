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
    <SectionBackground id="rethink-in-action" overlay="dark" className="pb-6 pt-12 md:pb-8 md:pt-16">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Rethink in Action"
          title={copy.headline}
          align="center"
          className="mx-auto mb-10 w-full max-w-4xl text-center md:mb-12"
        />
        <RethinkInActionWorkflow />
      </div>
    </SectionBackground>
  );
}
