import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { FaqSection } from "@/components/FaqSection";
import { Hero } from "@/components/sections/Hero";
import { ShowcaseSection } from "@/components/sections/ShowcaseSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { UseCasesSection } from "@/components/sections/UseCasesSection";
import { VisualsSection } from "@/components/sections/VisualsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TestimonialsStaggerSection } from "@/components/sections/TestimonialsStaggerSection";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <HowItWorks variant="cards" />
        <ShowcaseSection />
        <HowItWorks id="how-it-works-copy" />
        <UseCasesSection />
        <VisualsSection />
        {/* Marquee testimonials — hidden in favor of the stacked carousel
            below, kept mounted-ready so it's a one-line swap to bring back. */}
        {/* <TestimonialsSection /> */}
        <TestimonialsStaggerSection />
        <FaqSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
