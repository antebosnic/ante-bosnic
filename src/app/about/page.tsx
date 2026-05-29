import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AboutHero from "./components/AboutHero";
import AboutBio from "./components/AboutBio";
import AboutExpertise from "./components/AboutExpertise";
import AboutProcess from "./components/AboutProcess";
import { sanityFetch } from "@/sanity/lib/live";

export interface SanityAboutStat {
  _key: string;
  num: string;
  label: string;
}

export interface SanityAboutParagraph {
  _key: string;
  paragraph: string;
}

export interface SanityAbout {
  headlineLine1: string;
  headlineLine2: string;
  headlineLine3: string;
  pullQuote: string;
  bio: SanityAboutParagraph[];
  stats: SanityAboutStat[];
}

const ABOUT_QUERY = `*[_type == "about"][0] {
  headlineLine1,
  headlineLine2,
  headlineLine3,
  pullQuote,
  bio[]{ _key, paragraph },
  stats[]{ _key, num, label }
}`;

// Matches current hardcoded content — used when the Sanity doc is absent
const FALLBACK: SanityAbout = {
  headlineLine1: "We design things",
  headlineLine2: "that refuse",
  headlineLine3: "to be ignored.",
  pullQuote: "Great design earns attention the second time you look at it.",
  bio: [
    {
      _key: "p1",
      paragraph:
        "H.Studio started in 2019 with one operating principle: that most brands settle for design that's merely competent when they could have something unforgettable. Built from London, the studio works across brand identity, web design, and digital strategy for clients who understand that design is leverage.",
    },
    {
      _key: "p2",
      paragraph:
        "Every project starts with the same question: what does this brand actually need to be? Not what it looks like — that comes later. Strategy before aesthetics. Position before palette. When the thinking is right, the design almost writes itself.",
    },
    {
      _key: "p3",
      paragraph:
        "The client list stays deliberately short. Fewer projects mean more focus, and focus is what separates work that's finished from work that's right. If you're building something worth building, this is the studio for it.",
    },
  ],
  stats: [
    { _key: "s1", num: "05+", label: "Years of practice" },
    { _key: "s2", num: "80+", label: "Projects completed" },
    { _key: "s3", num: "40+", label: "Clients served" },
  ],
};

export const metadata: Metadata = {
  title: "About — H.Studio",
  description: "Creative designer and developer building impactful digital experiences.",
};

export default async function AboutPage() {
  const { data } = (await sanityFetch({ query: ABOUT_QUERY })) as {
    data: SanityAbout | null;
  };
  const about = data ?? FALLBACK;

  return (
    <>
      <Navbar />
      <main id="main-content" className="relative z-10">
        <AboutHero about={about} />
        <AboutBio about={about} />
        <AboutExpertise />
        <AboutProcess />
        <div id="footer-sentinel" />
      </main>
      <div id="footer-spacer" className="pointer-events-none" />
      <Footer />
    </>
  );
}
