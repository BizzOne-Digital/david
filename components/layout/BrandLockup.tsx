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
        width={400}
        height={233}
        priority={priority}
        className="h-14 w-auto max-w-[196px] object-contain object-left sm:h-16 sm:max-w-[228px] md:h-[4.5rem] md:max-w-[280px] lg:h-20 lg:max-w-[340px] xl:max-w-[380px]"
      />
    </Link>
  );
}
