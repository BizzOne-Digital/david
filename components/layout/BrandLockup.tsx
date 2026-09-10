import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const DEFAULT_LOGO = "/images/rethink-logo.jpg";

export type BrandLockupVariant = "header-mobile" | "header-desktop" | "footer" | "menu";

const variantClasses: Record<BrandLockupVariant, string> = {
  "header-mobile":
    "h-[clamp(2rem,7vw,2.75rem)] w-auto max-w-[min(180px,calc(100vw-8rem))] object-contain object-left sm:max-w-[min(200px,calc(100vw-9rem))]",
  "header-desktop":
    "h-[clamp(2.25rem,3.5vw,3rem)] w-auto max-w-[180px] object-contain object-left lg:max-w-[200px] xl:max-w-[220px]",
  footer:
    "h-[clamp(3rem,10vw,5rem)] w-auto max-w-[min(240px,100%)] object-contain object-left",
  menu:
    "h-[clamp(2rem,6vw,2.75rem)] w-auto max-w-[min(200px,calc(100%-3rem))] object-contain object-left",
};

interface BrandLockupProps {
  href?: string;
  className?: string;
  logoSrc?: string;
  alt?: string;
  priority?: boolean;
  variant?: BrandLockupVariant;
}

export function BrandLockup({
  href = "/",
  className,
  logoSrc = DEFAULT_LOGO,
  alt = "Rethink Automotive",
  priority = false,
  variant = "header-desktop",
}: BrandLockupProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex max-w-full shrink transition-opacity hover:opacity-90",
        className
      )}
      aria-label={alt}
    >
      <Image
        src={logoSrc || DEFAULT_LOGO}
        alt={alt}
        width={520}
        height={302}
        priority={priority}
        sizes="(max-width: 1023px) 200px, 220px"
        className={variantClasses[variant]}
      />
    </Link>
  );
}
