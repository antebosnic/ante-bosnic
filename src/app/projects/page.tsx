import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectsHeroSection from "./components/ProjectsHeroSection";
import PortfolioSection from "../components/PortfolioSection";
import { sanityFetch } from "@/sanity/lib/live";
import type { SanityProject } from "../components/PortfolioSection";

export const metadata: Metadata = {
  title: "Projects — H.Studio",
  description: "A curated selection of brand identities, websites, and digital experiences.",
};

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

export default async function ProjectsPage() {
  const { data: projects } = await sanityFetch({ query: PORTFOLIO_QUERY }) as { data: SanityProject[] };

  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <ProjectsHeroSection count={projects.length} />
        <PortfolioSection projects={projects} />
      </main>
      <Footer isStatic />
    </>
  );
}
