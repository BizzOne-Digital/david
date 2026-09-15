import { emailMarketingSlides } from "@/lib/content/email-marketing-slides";
import { ghostShopperSlides } from "@/lib/content/ghost-shopper-slides";
import type { SlideshowSlide } from "@/components/sections/ImageSlideshow";

/** Slideshow sets for each solution card on /products (2 email/service, 7 Ghost Shopper). */

export function getSolutionCardSlides(slug: string): readonly SlideshowSlide[] {
  switch (slug) {
    case "email-campaign-engine":
      return emailMarketingSlides.slice(0, 2);
    case "ai-lead-response-suite":
      return ghostShopperSlides;
    case "service-to-sales":
      return emailMarketingSlides.slice(7, 9);
    default:
      return [];
  }
}
