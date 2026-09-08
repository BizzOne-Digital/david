import { HeroSection } from "@/components/sections/HeroSection";
import { HeroVideoSection } from "@/components/sections/HeroVideoSection";
import { DealerIntelligenceSection } from "@/components/sections/DealerIntelligenceSection";
import { RethinkInActionSection } from "@/components/sections/RethinkInActionSection";
import { FourCapabilitiesSection } from "@/components/sections/FourCapabilitiesSection";
import { ProofSection } from "@/components/sections/ProofSection";
import {
  ConsultingTeaserSection,
  FutureFuelTeaserSection,
  AboutTeaserSection,
  FinalDemoCtaSection,
} from "@/components/sections/HomeClosingSections";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HeroVideoSection />
      <DealerIntelligenceSection />
      <RethinkInActionSection />
      <FourCapabilitiesSection />
      <ProofSection />
      <ConsultingTeaserSection />
      <FutureFuelTeaserSection />
      <AboutTeaserSection />
      <FinalDemoCtaSection />
    </>
  );
}
