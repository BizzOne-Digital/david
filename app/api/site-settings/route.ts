import { NextResponse } from "next/server";
import { defaultSiteSettings, defaultNavigation } from "@/lib/content/defaults";

export async function GET() {
  return NextResponse.json({
    settings: defaultSiteSettings,
    navigation: defaultNavigation,
  });
}
