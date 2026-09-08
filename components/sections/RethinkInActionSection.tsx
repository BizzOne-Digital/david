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
    <SectionBackground id="rethink-in-action" overlay="dark" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Rethink in Action"
          title={copy.headline}
          align="center"
          className="mx-auto mb-14 w-full max-w-4xl text-center"
        />
        <RethinkInActionWorkflow />
      </div>
    </SectionBackground>
  );
}
