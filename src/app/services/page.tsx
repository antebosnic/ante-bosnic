import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServicesHero from "./components/ServicesHero";
import ServicesDetail from "./components/ServicesDetail";
import ServicesFAQ from "./components/ServicesFAQ";

export const metadata: Metadata = {
  title: "Services — H.Studio",
  description: "Full-service creative studio offering brand identity, web design & development, marketing, and photography.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="relative z-10">
        <ServicesHero />
        <ServicesDetail />
        <ServicesFAQ />
        <div id="footer-sentinel" />
      </main>
      <div id="footer-spacer" className="pointer-events-none" />
      <Footer />
    </>
  );
}
