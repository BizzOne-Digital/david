import Image from "next/image";
import { cn } from "@/lib/utils";
import { getLucideIcon } from "@/lib/utils/icons";
import type { SolutionAccent } from "@/lib/content/products-page";

const accentStyles: Record<
  SolutionAccent,
  { glow: string; chip: string; icon: string; gradient: string }
> = {
  orange: {
    glow: "bg-brand-orange/25",
    chip: "border-brand-orange/30 bg-brand-orange/10 text-brand-orange",
    icon: "text-brand-orange",
    gradient:
      "from-brand-orange/20 via-transparent to-transparent",
  },
  electric: {
    glow: "bg-electric/20",
    chip: "border-electric/30 bg-electric/10 text-electric",
    icon: "text-electric",
    gradient: "from-electric/20 via-transparent to-transparent",
  },
  violet: {
    glow: "bg-violet/20",
    chip: "border-violet/30 bg-violet/10 text-violet",
    icon: "text-violet",
    gradient: "from-violet/20 via-transparent to-transparent",
  },
};

interface SolutionCardVisualProps {
  icon: string;
  accent: SolutionAccent;
  chips: readonly string[];
  category: string;
  className?: string;
  variant?: "card" | "detail";
}

export function SolutionCardVisual({
  icon,
  accent,
  chips,
  category,
  className,
  variant = "card",
}: SolutionCardVisualProps) {
  const Icon = getLucideIcon(icon);
  const styles = accentStyles[accent];
  const isDetail = variant === "detail";

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-[#07070f]",
        isDetail ?
          "min-h-[18rem] rounded-2xl border border-white/10 sm:min-h-[20rem] lg:min-h-[24rem]"
        : "min-h-[11rem] border-b border-white/10 md:min-h-full md:border-b-0 md:border-r",
        className
      )}
    >
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        sizes={isDetail ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 768px) 100vw, 280px"}
        className="object-cover object-[72%_center] opacity-25"
        aria-hidden
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,15,0.35)_0%,rgba(7,7,15,0.92)_100%)]" />

      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-80",
          styles.gradient
        )}
      />

      <div className="grid-pattern absolute inset-0 opacity-30" aria-hidden />

      <div className={cn("relative flex h-full flex-col justify-between", isDetail ? "p-6 md:p-8" : "p-5 md:p-6")}>
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80">
            {category}
          </span>
          <div
            className={cn(
              "flex items-center justify-center rounded-xl border border-white/10 bg-black/45 backdrop-blur-sm",
              isDetail ? "h-14 w-14" : "h-11 w-11",
              styles.glow
            )}
          >
            <Icon className={cn(isDetail ? "h-7 w-7" : "h-5 w-5", styles.icon)} />
          </div>
        </div>

        <div className={cn("space-y-3", isDetail ? "mt-8" : "mt-6")}>
          <div className={cn("rounded-lg border border-white/10 bg-black/45 backdrop-blur-sm", isDetail ? "p-4" : "p-3")}>
            <div className="mb-2 flex items-center gap-1.5">
              <span className={cn("h-2 w-2 rounded-full", styles.glow)} />
              <span className="h-1.5 flex-1 rounded-full bg-white/10" />
            </div>
            <div className="space-y-1.5">
              <div className="h-1.5 w-[88%] rounded-full bg-white/15" />
              <div className="h-1.5 w-[68%] rounded-full bg-white/10" />
              <div className="h-1.5 w-[78%] rounded-full bg-white/10" />
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {chips.map((chip) => (
              <span
                key={chip}
                className={cn(
                  "rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                  styles.chip
                )}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
