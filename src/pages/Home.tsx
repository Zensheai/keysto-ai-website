import { useEffect } from "react";
import Hero from "../components/home/Hero";
import Marquee from "../components/home/Marquee";
import FromTheChannel from "../components/home/FromTheChannel";
import FeaturedTutorial from "../components/home/FeaturedTutorial";
import SimoneQuote from "../components/home/SimoneQuote";
import TheSystem from "../components/home/TheSystem";
import ToolsLibrary from "../components/home/ToolsLibrary";
import StartHere from "../components/home/StartHere";
import Resources from "../components/home/Resources";
import Faq from "../components/home/Faq";
import Newsletter from "../components/home/Newsletter";
import Seo from "../components/Seo";
import { initReveals } from "../lib/animations";

export default function Home() {
  useEffect(() => initReveals(), []);
  return (
    <>
      <Seo
        title="Keys to AI | AI Automation Made Simple"
        description="Practical AI workflows for solopreneurs. Simple enough to repeat, useful enough to save real hours — tutorials, tools, and free resources."
        path="/"
        image="/images/hero-portrait.jpg"
      />
      <Hero />
      <Marquee />
      <FromTheChannel />
      <FeaturedTutorial />
      <SimoneQuote />
      <TheSystem />
      <ToolsLibrary />
      <StartHere />
      <Resources />
      <Faq />
      <Newsletter />
    </>
  );
}
