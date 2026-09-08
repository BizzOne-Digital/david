import { cn } from "@/lib/utils";

interface SectionBackgroundProps {
  src?: string;
  alt?: string;
  overlay?: "dark" | "left" | "center" | "bottom";
  position?: string;
  className?: string;
  children: React.ReactNode;
  as?: "section" | "div";
  id?: string;
}

const overlays = {
  dark: "bg-black/20",
  left: "bg-black/15",
  center: "bg-black/10",
  bottom: "bg-black/25",
};

export function SectionBackground({
  overlay = "dark",
  className,
  children,
  as: Tag = "section",
  id,
}: SectionBackgroundProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "relative isolate w-full max-w-full overflow-hidden bg-graphite",
        className
      )}
    >
      <div className={cn("absolute inset-0 bg-graphite", overlays[overlay])} aria-hidden />
      <div className="relative z-10">{children}</div>
    </Tag>
  );
}

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-4xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric md:tracking-[0.3em]">
        {eyebrow}
      </p>
      <h2 className="mt-4 break-words font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-5 max-w-2xl text-base leading-relaxed text-silver md:text-lg",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function GlassCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-graphite p-6 md:p-8",
        className
      )}
    >
      {children}
    </div>
  );
}

export function GradientText({ children }: { children: React.ReactNode }) {
  return <span className="text-electric">{children}</span>;
}
