import Image from "next/image";
import { cn } from "@/lib/utils";
import { getSectionBackgroundImageClass } from "@/lib/utils/background-image";

interface SectionBackgroundProps {
  src: string;
  alt?: string;
  overlay?: "dark" | "left" | "center" | "bottom";
  position?: string;
  className?: string;
  children: React.ReactNode;
  as?: "section" | "div";
  id?: string;
}

const overlays = {
  dark: "bg-black/65",
  left: "bg-gradient-to-r from-black/90 via-black/70 to-black/40 max-md:from-black/92 max-md:via-black/80 max-md:to-black/70",
  center: "bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.85)_100%)]",
  bottom: "bg-gradient-to-t from-black via-black/60 to-black/30",
};

export function SectionBackground({
  src,
  alt = "",
  overlay = "dark",
  position = "object-cover object-center",
  className,
  children,
  as: Tag = "section",
  id,
}: SectionBackgroundProps) {
  return (
    <Tag
      id={id}
      className={cn("relative isolate w-full max-w-full overflow-hidden", className)}
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          quality={85}
          sizes="100vw"
          className={getSectionBackgroundImageClass(position)}
          aria-hidden={!alt}
        />
      </div>
      <div className={cn("absolute inset-0", overlays[overlay])} aria-hidden />
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
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-silver md:text-lg">
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
        "rounded-2xl border border-white/15 bg-black/35 p-6 shadow-[0_0_40px_rgba(0,210,255,0.08)] backdrop-blur-xl md:p-8",
        className
      )}
    >
      {children}
    </div>
  );
}

export function GradientText({ children }: { children: React.ReactNode }) {
  return <span className="text-gradient">{children}</span>;
}
