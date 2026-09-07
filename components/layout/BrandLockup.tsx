import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const DEFAULT_LOGO = "/images/rethink-logo.png";

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
        width={260}
        height={72}
        priority={priority}
        className="h-9 w-auto max-w-[128px] object-contain object-left sm:h-10 sm:max-w-[148px] md:h-11 md:max-w-[180px] lg:max-w-[210px]"
      />
    </Link>
  );
}
