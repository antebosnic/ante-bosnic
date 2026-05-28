import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import IntroSection from "./components/IntroSection";
import AboutSection from "./components/AboutSection";
import PhotoBreak from "./components/PhotoBreak";
import ServicesSection from "./components/ServicesSection";
import PortfolioSection, { type SanityProject } from "./components/PortfolioSection";
import TestimonialsSection from "./components/TestimonialsSection";
import NewsSection from "./components/NewsSection";
import Footer from "./components/Footer";
import { sanityFetch } from "@/sanity/lib/live";

const PORTFOLIO_QUERY = `*[_type == "project"] | order(order asc) {
  _id,
  title,
  imageUrl,
  image,
  tags,
  tall,
  order,
  link
}`;

export default async function Home() {
  const { data: projects } = await sanityFetch({ query: PORTFOLIO_QUERY }) as { data: SanityProject[] };

  return (
    <>
      <Navbar />
      <main id="main-content" className="relative z-10">
        <HeroSection />
        <IntroSection />
        <AboutSection />
        <PhotoBreak />
        <ServicesSection />
        <PortfolioSection projects={projects} />
        <TestimonialsSection />
        <NewsSection />
        {/* Sentinel: ScrollTrigger watches this to drive the footer reveal */}
        <div id="footer-sentinel" />
      </main>
      {/* pointer-events-none so it doesn't block the fixed footer beneath */}
      <div id="footer-spacer" className="pointer-events-none" />
      <Footer />
    </>
  );
}
