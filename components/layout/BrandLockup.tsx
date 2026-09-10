import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const DEFAULT_LOGO = "/images/rethink-logo.jpg";

export type BrandLockupVariant = "header-mobile" | "header-desktop" | "footer" | "menu";

const variantClasses: Record<BrandLockupVariant, string> = {
  "header-mobile":
    "h-[70px] w-auto max-w-[min(300px,calc(100vw-7.5rem))] object-contain object-left sm:max-w-[min(300px,calc(100vw-8.5rem))]",
  "header-desktop":
    "h-[70px] w-auto max-w-[300px] object-contain object-left",
  footer:
    "h-[clamp(3.35rem,11.2vw,5.6rem)] w-auto max-w-[min(270px,100%)] object-contain object-left",
  menu:
    "h-[70px] w-auto max-w-[min(300px,calc(100%-3rem))] object-contain object-left",
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
        sizes="(max-width: 1023px) 300px, 300px"
        className={variantClasses[variant]}
      />
    </Link>
  );
}
