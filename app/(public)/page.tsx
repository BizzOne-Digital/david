import { HeroSection } from "@/components/sections/HeroSection";
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
import { getPageContent } from "@/lib/data/page-content";
import { getSection } from "@/lib/utils/page-content";

export default async function HomePage() {
  const content = await getPageContent("home");

  return (
    <>
      <HeroSection section={getSection(content, "hero")} />
      <DealerIntelligenceSection />
      <RethinkInActionSection />
      <FourCapabilitiesSection section={getSection(content, "whyRethink")} />
      <ProofSection />
      <ConsultingTeaserSection />
      <FutureFuelTeaserSection />
      <AboutTeaserSection />
      <FinalDemoCtaSection />
    </>
  );
}
