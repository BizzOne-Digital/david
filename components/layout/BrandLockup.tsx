import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const DEFAULT_LOGO = "/images/rethink-logo.jpg";

export type BrandLockupVariant = "header-mobile" | "header-desktop" | "footer" | "menu";

const variantClasses: Record<BrandLockupVariant, string> = {
  "header-mobile":
    "h-auto w-[min(520px,calc(100vw-7rem))] max-w-[520px] object-contain object-left sm:w-[min(520px,calc(100vw-8rem))]",
  "header-desktop":
    "h-auto w-[min(520px,100%)] max-w-[520px] object-contain object-left",
  footer:
    "h-[clamp(4.5rem,14vw,8rem)] w-auto max-w-[min(520px,100%)] object-contain object-left",
  menu:
    "h-[clamp(2.5rem,8vw,3.75rem)] w-auto max-w-[min(520px,calc(100%-3rem))] object-contain object-left",
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
        sizes="(max-width: 1023px) min(520px, calc(100vw - 7rem)), 520px"
        className={variantClasses[variant]}
      />
    </Link>
  );
}
