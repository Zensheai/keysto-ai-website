import { useEffect } from "react";
import Hero from "../components/home/Hero";
import FromTheChannel from "../components/home/FromTheChannel";
import FeaturedTutorial from "../components/home/FeaturedTutorial";
import SimoneQuote from "../components/home/SimoneQuote";
import TheSystem from "../components/home/TheSystem";
import ToolsLibrary from "../components/home/ToolsLibrary";
import StartHere from "../components/home/StartHere";
import Resources from "../components/home/Resources";
import Faq from "../components/home/Faq";
import Newsletter from "../components/home/Newsletter";
import { initReveals } from "../lib/animations";

export default function Home() {
  useEffect(() => initReveals(), []);
  return (
    <>
      <Hero />
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
