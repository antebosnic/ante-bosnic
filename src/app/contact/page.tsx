import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactHero from "./components/ContactHero";
import ContactFormSection from "./components/ContactFormSection";

export const metadata: Metadata = {
  title: "Contact — H.Studio",
  description: "Get in touch with H.Studio. Start a conversation about your brand, website, or next project.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="relative z-10">
        <ContactHero />
        <ContactFormSection />
        <div id="footer-sentinel" />
      </main>
      <div id="footer-spacer" className="pointer-events-none" />
      <Footer />
    </>
  );
}
