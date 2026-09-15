import { ghostShopperSlides } from "@/lib/content/ghost-shopper-slides";
import type { SlideshowSlide } from "@/components/sections/ImageSlideshow";

/** Only AI Ghost Shopper uses a slideshow on solution cards; others are consulting narrative. */

export function getSolutionCardSlides(slug: string): readonly SlideshowSlide[] {
  if (slug === "ai-lead-response-suite") {
    return ghostShopperSlides;
  }
  return [];
}

export function solutionUsesSlideshow(slug: string): boolean {
  return slug === "ai-lead-response-suite";
}
