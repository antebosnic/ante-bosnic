import type { Metadata } from "next";
import type { SanityImageSource } from "@sanity/image-url";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NewsPageHero from "./components/NewsPageHero";
import NewsPageList from "./components/NewsPageList";
import { sanityFetch } from "@/sanity/lib/live";

export const metadata: Metadata = {
  title: "News — H.Studio",
  description: "Latest news, achievements, and updates from H.Studio.",
};

export interface Post {
  _id: string;
  title: string;
  slug: string;
  image?: SanityImageSource;
  body?: string;
  excerpt?: string;
  publishedAt?: string;
}

const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  image,
  body,
  excerpt,
  publishedAt
}`;

export default async function NewsPage() {
  const { data: posts } = await sanityFetch({ query: POSTS_QUERY }) as { data: Post[] };

  return (
    <>
      <Navbar />
      <main id="main-content" className="relative z-10">
        <NewsPageHero count={posts.length} />
        <NewsPageList posts={posts} />
        <div id="footer-sentinel" />
      </main>
      <div id="footer-spacer" className="pointer-events-none" />
      <Footer />
    </>
  );
}
