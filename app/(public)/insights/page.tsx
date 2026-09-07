import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  SectionBackground,
  GlassCard,
} from "@/components/sections/SectionBackground";
import { DemoCtaButton } from "@/components/ui/ConversionCta";

export const metadata: Metadata = {
  title: "Insights | Rethink Automotive Inc.",
  description:
    "Dealer marketing insights, future-fuel trends and opportunity analysis from Rethink Automotive.",
};

export default function InsightsPage() {
  return (
    <SectionBackground overlay="center" className="min-h-[70vh] py-24 md:py-32">
      <div className="container mx-auto px-4 pt-20">
        <GlassCard className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-electric">
            Insights
          </p>
          <h1 className="mt-4 font-heading text-3xl font-bold md:text-4xl">
            Dealer Intelligence Coming Soon
          </h1>
          <p className="mt-4 text-silver">
            Case studies, market insights and future-fuel analysis will appear here as approved
            content becomes available. In the meantime, request a demo to see what Rethink can
            uncover in your dealership today.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <DemoCtaButton size="lg" />
            <Link
              href="/consulting"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-cyan hover:text-white"
            >
              Explore Consulting
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </GlassCard>
      </div>
    </SectionBackground>
  );
}
