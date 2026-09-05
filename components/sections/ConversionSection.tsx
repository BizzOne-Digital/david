"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import {
  SectionBackground,
  GlassCard,
  GradientText,
} from "./SectionBackground";
import { SECTION_BACKGROUNDS } from "@/lib/content/homepage-sections";

export function ConversionSection() {
  const { settings } = useSiteSettings();

  return (
    <SectionBackground
      src={SECTION_BACKGROUNDS.cta}
      overlay="center"
      position="object-cover object-center"
      className="py-24 md:py-32"
    >
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <GlassCard className="mx-auto max-w-3xl border-gradient text-center md:p-14">
            <h2 className="font-heading text-3xl font-bold md:text-4xl lg:text-5xl">
              Ready to <GradientText>Rethink Your Dealership&apos;s Growth?</GradientText>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-silver">
              Let&apos;s build a smarter, stronger, more profitable tomorrow — together.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <MagneticButton href={settings.headerCtaUrl}>
                {settings.headerCtaLabel}
              </MagneticButton>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-electric/50 bg-black/30 uppercase tracking-wider backdrop-blur-sm"
              >
                <Link href="/products">
                  Explore Solutions
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-silver">
              <a href={`mailto:${settings.contactEmail}`} className="hover:text-cyan">
                {settings.contactEmail}
              </a>
              <a
                href={`tel:${settings.contactPhone.replace(/\D/g, "")}`}
                className="hover:text-cyan"
              >
                {settings.contactPhone}
              </a>
            </div>
          </GlassCard>
        </ScrollReveal>
      </div>
    </SectionBackground>
  );
}
