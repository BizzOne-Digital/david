import { HeroSection } from "@/components/sections/HeroSection";
import { HeroVideoSection } from "@/components/sections/HeroVideoSection";
import { DealerIntelligenceSection } from "@/components/sections/DealerIntelligenceSection";
import { RethinkInActionSection } from "@/components/sections/RethinkInActionSection";
import { GhostShopperSection } from "@/components/sections/GhostShopperSection";
import { FourCapabilitiesSection } from "@/components/sections/FourCapabilitiesSection";
import { FinalDemoCtaSection } from "@/components/sections/HomeClosingSections";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HeroVideoSection />
      <RethinkInActionSection />
      <GhostShopperSection />
      <FourCapabilitiesSection />
      <DealerIntelligenceSection />
      <FinalDemoCtaSection />
    </>
  );
}
