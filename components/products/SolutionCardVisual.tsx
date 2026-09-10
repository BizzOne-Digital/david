import Image from "next/image";
import { cn } from "@/lib/utils";
import { getLucideIcon } from "@/lib/utils/icons";

type SolutionAccent = "orange" | "electric" | "violet";

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
}

export function SolutionCardVisual({
  icon,
  accent,
  chips,
  category,
  className,
}: SolutionCardVisualProps) {
  const Icon = getLucideIcon(icon);
  const styles = accentStyles[accent];

  return (
    <div
      className={cn(
        "relative isolate min-h-[11rem] overflow-hidden border-b border-white/10 bg-[#07070f] md:min-h-full md:border-b-0 md:border-r",
        className
      )}
    >
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 280px"
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

      <div className="relative flex h-full flex-col justify-between p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80">
            {category}
          </span>
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/45 backdrop-blur-sm",
              styles.glow
            )}
          >
            <Icon className={cn("h-5 w-5", styles.icon)} />
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div className="rounded-lg border border-white/10 bg-black/45 p-3 backdrop-blur-sm">
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
