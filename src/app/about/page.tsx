import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AboutHero from "./components/AboutHero";
import AboutBio from "./components/AboutBio";
import AboutExpertise from "./components/AboutExpertise";
import AboutProcess from "./components/AboutProcess";

export const metadata: Metadata = {
  title: "About — H.Studio",
  description: "Creative designer and developer building impactful digital experiences.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="relative z-10">
        <AboutHero />
        <AboutBio />
        <AboutExpertise />
        <AboutProcess />
        <div id="footer-sentinel" />
      </main>
      <div id="footer-spacer" className="pointer-events-none" />
      <Footer />
    </>
  );
}
