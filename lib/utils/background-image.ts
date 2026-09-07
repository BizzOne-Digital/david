import { cn } from "@/lib/utils";

/**
 * Mobile-first background positioning: centered + slight scale to avoid edge gaps.
 * Desktop uses the focal point from the design mockups.
 */
export function getSectionBackgroundImageClass(position = "object-cover object-center") {
  const base = "h-full w-full object-cover object-center scale-[1.08] md:scale-100";

  if (position.includes("object-[88%_42%]")) {
    return cn(base, "object-[88%_42%] md:object-[72%_center]");
  }
  if (position.includes("object-[72%_center]")) {
    return cn(base, "md:object-[72%_center]");
  }
  if (position.includes("object-[70%_center]")) {
    return cn(base, "md:object-[70%_center]");
  }
  if (position.includes("object-[62%_center]")) {
    return cn(base, "md:object-[62%_center]");
  }
  if (position.includes("object-right")) {
    return cn(base, "md:object-right");
  }
  if (position.includes("object-left")) {
    return cn(base, "md:object-left");
  }

  return cn(base, "md:object-center");
}
