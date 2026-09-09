import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DEMO_CTA_HREF, DEMO_CTA_LABEL, SECONDARY_CTA_HREF, SECONDARY_CTA_LABEL } from "@/lib/content/revisions";

interface CtaProps {
  href?: string;
  className?: string;
  children?: React.ReactNode;
  size?: "default" | "lg";
}

export function DemoCtaButton({
  href = DEMO_CTA_HREF,
  className,
  children = DEMO_CTA_LABEL,
  size = "default",
  showArrow = true,
}: CtaProps & { showArrow?: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-brand-orange font-semibold uppercase tracking-[0.08em] text-white shadow-[0_0_24px_rgba(255,102,0,0.35)] transition hover:bg-brand-orange-hover hover:shadow-[0_0_32px_rgba(255,102,0,0.45)]",
        size === "lg" ? "px-8 py-4 text-sm md:text-base" : "px-6 py-3 text-xs md:text-sm",
        className
      )}
    >
      {children}
      {showArrow ?
        <ArrowRight className="ml-1.5 h-3.5 w-3.5 shrink-0 sm:ml-2 sm:h-4 sm:w-4" />
      : null}
    </Link>
  );
}

export function SecondaryCtaButton({
  href = SECONDARY_CTA_HREF,
  className,
  children = SECONDARY_CTA_LABEL,
  size = "default",
}: CtaProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-lg border border-white/30 bg-black/30 font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-sm transition hover:border-cyan/50 hover:bg-white/5",
        size === "lg" ? "px-8 py-4 text-sm md:text-base" : "px-6 py-3 text-xs md:text-sm",
        className
      )}
    >
      {children}
    </Link>
  );
}

export function DemoCtaBlock({
  text,
  ctaLabel = "Request a Demo",
  className,
}: {
  text: string;
  ctaLabel?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-brand-orange/40 bg-brand-orange/10 p-8 text-center md:p-10",
        className
      )}
    >
      <p className="text-lg font-medium text-white md:text-xl">{text}</p>
      <div className="mt-6">
        <DemoCtaButton size="lg">{ctaLabel}</DemoCtaButton>
      </div>
    </div>
  );
}
