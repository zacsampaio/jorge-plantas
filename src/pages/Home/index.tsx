import { HeaderHome } from "./components/header";
import { BestSellersSection } from "./components/main";
import { ImpactQuoteSection } from "./components/impactQuote";
import { CategoryShowcaseSection } from "./components/categoryShowcase";
import { categoryShowcases } from "../../data/categoryShowcases";
import { CategoriesSection } from "./components/categories";
import { DifferentialsSection } from "./components/differentials";
import { HowItWorksSection } from "./components/howItWorks";
import { StatsSection } from "./components/stats";
import { AboutTeaserSection } from "./components/aboutTeaser";
import { CtaBannerSection } from "./components/ctaBanner";
import { HomePage } from "./styled";

export function Home() {
  const [interiorShowcase, solPlenoShowcase] = categoryShowcases;

  return (
    <HomePage>
      <HeaderHome />
      <ImpactQuoteSection index={0} variant="green" />
      <BestSellersSection />
      <CategoryShowcaseSection config={interiorShowcase} />
      <ImpactQuoteSection index={1} variant="dark" />
      <CategoryShowcaseSection config={solPlenoShowcase} />
      <CategoriesSection />
      <DifferentialsSection />
      <HowItWorksSection />
      <StatsSection />
      <AboutTeaserSection />
      <CtaBannerSection />
    </HomePage>
  );
}
