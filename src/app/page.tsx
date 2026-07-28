import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { FaqSection } from "@/components/FaqSection";
import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ShowcaseSection } from "@/components/sections/ShowcaseSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { UseCasesSection } from "@/components/sections/UseCasesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <ProblemSection />
        <ShowcaseSection />
        <HowItWorks />
        <FeaturesSection />
        <UseCasesSection />
        <TestimonialsSection />
        <FaqSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
