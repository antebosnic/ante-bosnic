import Image from "next/image";
import Navbar from "./components/Navbar";
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

const heroImage = "/hero-bg.png";

const nameClass =
  "font-[family-name:var(--font-inter)] font-medium text-white mix-blend-overlay capitalize";

export default async function Home() {
  const { data: projects } = await sanityFetch({ query: PORTFOLIO_QUERY }) as { data: SanityProject[] };

  return (
    <main>
      {/* Section has no overflow-hidden so the large text is never clipped.
          The background image is clipped by its own wrapper instead. */}
      <section className="relative h-screen min-h-[600px] bg-[#c8cdd0]">

        {/* Background — clipped independently so text can bleed edge-to-edge */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={heroImage}
            alt="Harvey Specter"
            fill
            priority
            sizes="100vw"
          className="object-cover object-top"
          />
          {/* Subtle blur fade at the bottom */}
          <div
            className="absolute inset-x-0 bottom-0 h-[280px] backdrop-blur-[3px]"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 70%)",
              maskImage: "linear-gradient(to bottom, transparent 0%, black 70%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative flex h-full flex-col px-4 md:px-8">
          <Navbar />

          <div className="flex-1 flex flex-col justify-end pb-6 md:pb-0">

            {/* Name block */}
            <div className="flex flex-col w-full mb-4 md:mb-0">

              {/* Label — left-aligned on desktop to sit above the "H" */}
              <p className="font-[family-name:var(--font-geist-mono)] text-sm uppercase text-white mix-blend-overlay leading-[1.1] text-center md:text-left mb-1">
                [ Hello i&apos;m ]
              </p>

              {/* Desktop: single line, whitespace-pre preserves the 3-space gap */}
              <p
                className={`hidden md:block text-center ${nameClass} whitespace-pre`}
                style={{ fontSize: "13.75vw", lineHeight: 1.1, letterSpacing: "-0.07em" }}
              >
                {'Harvey   Specter'}
              </p>

              {/* Mobile: two centered lines */}
              <div
                className={`md:hidden flex flex-col items-center ${nameClass}`}
                style={{ fontSize: "clamp(56px, 25.6vw, 96px)", lineHeight: 0.8, letterSpacing: "-0.07em" }}
              >
                <p>Harvey</p>
                <p>Specter</p>
              </div>
            </div>

            {/* Description + CTA */}
            <div className="flex md:justify-end mt-4 md:mt-0 md:pb-8">
              <div className="flex flex-col gap-4 max-w-[294px]">
                <p className="font-[family-name:var(--font-inter)] text-sm tracking-[-0.04em] text-[#1f1f1f] uppercase leading-[1.1]">
                  <strong>H.Studio is a </strong>
                  <em className="font-normal">full-service</em>
                  <strong>
                    {" "}creative studio creating beautiful digital experiences
                    and products. We are an{" "}
                  </strong>
                  <em className="font-normal">award winning</em>
                  <strong>
                    {" "}design and art group specializing in branding, web
                    design and engineering.
                  </strong>
                </p>
                <button className="self-start bg-black text-white font-[family-name:var(--font-inter)] font-medium text-sm tracking-[-0.04em] px-4 py-3 rounded-3xl hover:bg-neutral-800 transition-colors">
                  Let&apos;s talk
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <IntroSection />
      <AboutSection />
      <PhotoBreak />
      <ServicesSection />
      <PortfolioSection projects={projects} />
      <TestimonialsSection />
      <NewsSection />
      <Footer />
    </main>
  );
}
