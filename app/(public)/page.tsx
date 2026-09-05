import { HeroSection } from "@/components/sections/HeroSection";
import { BrandStatement } from "@/components/sections/BrandStatement";
import { FlagshipProducts } from "@/components/sections/FlagshipProducts";
import { AIJourneySection } from "@/components/sections/AIJourneySection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyRethinkSection } from "@/components/sections/WhyRethinkSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { getPageContent } from "@/lib/data/page-content";
import { getSection } from "@/lib/utils/page-content";

export default async function HomePage() {
  const content = await getPageContent("home");

  return (
    <>
      <HeroSection section={getSection(content, "hero")} />
      <BrandStatement section={getSection(content, "brandStatement")} />
      <FlagshipProducts />
      <AIJourneySection />
      <ServicesSection />
      <WhyRethinkSection section={getSection(content, "whyRethink")} />
      <ProcessSection section={getSection(content, "process")} />
    </>
  );
}
