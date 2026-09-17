import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { resolveImageSrc } from "@/lib/images/resolve-image-src";

const DEFAULT_LOGO = "/images/rethink-logo.jpg";

interface LogoProps {
  href?: string;
  className?: string;
  imageClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  logoSrc?: string;
  alt?: string;
}

export function Logo({
  href = "/",
  className,
  imageClassName,
  width = 320,
  height = 186,
  priority = false,
  logoSrc = DEFAULT_LOGO,
  alt = "Rethink Automotive",
}: LogoProps) {
  const src = resolveImageSrc(logoSrc);
  const image = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      unoptimized={src.startsWith("/api/uploads/")}
      className={cn("h-auto w-auto object-contain", imageClassName)}
    />
  );

  if (!href) {
    return <div className={cn("inline-flex shrink-0", className)}>{image}</div>;
  }

  return (
    <Link
      href={href}
      className={cn("inline-flex shrink-0 transition-opacity hover:opacity-90", className)}
      aria-label={alt}
    >
      {image}
    </Link>
  );
}

export { DEFAULT_LOGO };
