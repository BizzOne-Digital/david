"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getLucideIcon } from "@/lib/utils/icons";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/button";
import {
  SectionBackground,
  SectionHeading,
  GlassCard,
  GradientText,
} from "./SectionBackground";
import {
  SECTION_BACKGROUNDS,
  homepageServices,
} from "@/lib/content/homepage-sections";

export function ServicesSection() {
  return (
    <SectionBackground
      src={SECTION_BACKGROUNDS.services}
      overlay="dark"
      position="object-cover object-center"
      className="py-24 md:py-32"
    >
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Our Services"
            title={
              <>
                Built For Dealerships.{" "}
                <GradientText>Designed For What&apos;s Next.</GradientText>
              </>
            }
          />
          <ScrollReveal delay={0.15}>
            <Button
              asChild
              variant="outline"
              className="hidden border-electric/40 bg-black/30 uppercase tracking-wider lg:inline-flex"
            >
              <Link href="/services">
                Explore Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {homepageServices.map((service, index) => {
            const Icon = getLucideIcon(service.icon);
            return (
              <ScrollReveal key={service.title} delay={index * 0.08}>
                <GlassCard className="flex h-full flex-col">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold">{service.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-silver">
                    {service.description}
                  </p>
                  <Link
                    href={`/services/${service.slug}`}
                    className="mt-5 text-sm font-medium text-cyan hover:text-white"
                  >
                    Learn More →
                  </Link>
                </GlassCard>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.3} className="mt-10 text-center lg:hidden">
          <Button asChild variant="outline" className="border-electric/40 uppercase tracking-wider">
            <Link href="/services">
              Explore Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </SectionBackground>
  );
}
