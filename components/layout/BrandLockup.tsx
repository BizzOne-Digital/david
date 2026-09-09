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
        width={520}
        height={302}
        priority={priority}
        className="h-16 w-auto max-w-[220px] object-contain object-left sm:h-[4.5rem] sm:max-w-[280px] md:h-20 md:max-w-[360px] lg:h-24 lg:max-w-[440px] xl:max-w-[520px]"
      />
    </Link>
  );
}
