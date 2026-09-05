import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getLucideIcon } from "@/lib/utils/icons";
import { GlassCard } from "@/components/sections/SectionBackground";
import type { ServiceDetail } from "@/lib/content/service-details";

interface RelatedServicesProps {
  services: ServiceDetail[];
  title?: string;
}

export function RelatedServices({
  services,
  title = "Related Services",
}: RelatedServicesProps) {
  if (services.length === 0) return null;

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold md:text-3xl">{title}</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => {
          const Icon = getLucideIcon(service.icon);
          return (
            <GlassCard key={service.slug} className="flex h-full flex-col">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-heading text-lg font-semibold">{service.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-silver">
                {service.shortDescription}
              </p>
              <Link
                href={`/services/${service.slug}`}
                className="mt-5 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-cyan hover:text-white"
              >
                Learn More
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
