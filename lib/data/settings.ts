import { unstable_cache } from "next/cache";
import connectDB from "@/lib/db/connect";
import SiteSettings from "@/models/SiteSettings";
import { defaultSiteSettings } from "@/lib/content/defaults";
import { defaultNavigation } from "@/lib/content/defaults";

async function fetchSiteSettings() {
  await connectDB();
  let settings = await SiteSettings.findOne().lean();

  if (!settings) {
    const created = await SiteSettings.create({
      ...defaultSiteSettings,
      navigation: defaultNavigation,
      announcementBar: defaultSiteSettings.announcementBar ?? {
        enabled: false,
        text: "",
      },
      gradientColors: {
        from: defaultSiteSettings.brandColors.primary,
        via: defaultSiteSettings.brandColors.secondary,
        to: defaultSiteSettings.brandColors.accent,
      },
      homepageSections: [],
      analyticsIds: {},
    });
    settings = created.toObject();
  }

  return JSON.parse(JSON.stringify(settings));
}

export const getSiteSettings = unstable_cache(
  fetchSiteSettings,
  ["site-settings"],
  { revalidate: 60, tags: ["site-settings"] }
);
