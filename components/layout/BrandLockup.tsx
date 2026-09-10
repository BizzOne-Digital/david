import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const DEFAULT_LOGO = "/images/rethink-logo.jpg";

export type BrandLockupVariant = "header-mobile" | "header-desktop" | "footer" | "menu";

const variantClasses: Record<BrandLockupVariant, string> = {
  "header-mobile":
    "h-[clamp(2.25rem,7.85vw,3.1rem)] w-auto max-w-[min(200px,calc(100vw-8rem))] object-contain object-left sm:max-w-[min(225px,calc(100vw-9rem))]",
  "header-desktop":
    "h-[clamp(2.5rem,3.9vw,3.35rem)] w-auto max-w-[200px] object-contain object-left lg:max-w-[225px] xl:max-w-[245px]",
  footer:
    "h-[clamp(3.35rem,11.2vw,5.6rem)] w-auto max-w-[min(270px,100%)] object-contain object-left",
  menu:
    "h-[clamp(2.25rem,6.7vw,3.1rem)] w-auto max-w-[min(225px,calc(100%-3rem))] object-contain object-left",
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
        sizes="(max-width: 1023px) 225px, 245px"
        className={variantClasses[variant]}
      />
    </Link>
  );
}
