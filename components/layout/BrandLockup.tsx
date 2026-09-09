import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const DEFAULT_LOGO = "/images/rethink-logo.jpg";

interface BrandLockupProps {
  href?: string;
  className?: string;
  logoSrc?: string;
  alt?: string;
  priority?: boolean;
}

export function BrandLockup({
  href = "/",
  className,
  logoSrc = DEFAULT_LOGO,
  alt = "Rethink Automotive",
  priority = false,
}: BrandLockupProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex shrink-0 transition-opacity hover:opacity-90",
        className
      )}
      aria-label={alt}
    >
      <Image
        src={logoSrc || DEFAULT_LOGO}
        alt={alt}
        width={320}
        height={186}
        priority={priority}
        className="h-12 w-auto max-w-[168px] object-contain object-left sm:h-14 sm:max-w-[196px] md:h-16 md:max-w-[240px] lg:h-[4.5rem] lg:max-w-[280px]"
      />
    </Link>
  );
}
