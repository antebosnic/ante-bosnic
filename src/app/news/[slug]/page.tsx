import type { Metadata } from "next";
import type { SanityImageSource } from "@sanity/image-url";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

interface Post {
  _id: string;
  title: string;
  slug: string;
  image?: SanityImageSource;
  body?: string;
  excerpt?: string;
  publishedAt?: string;
}

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  image,
  body,
  excerpt,
  publishedAt
}`;

const ALL_SLUGS_QUERY = `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: post } = await sanityFetch({ query: POST_QUERY, params: { slug } }) as { data: Post | null };
  return {
    title: post ? `${post.title} — H.Studio` : "Post — H.Studio",
    description: post?.excerpt ?? post?.body?.slice(0, 140),
  };
}

export async function generateStaticParams() {
  const data = await client.fetch<{ slug: string }[]>(ALL_SLUGS_QUERY);
  return (data ?? []).map(({ slug }) => ({ slug }));
}

function formatDate(iso?: string): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

const mono = "font-[family-name:var(--font-geist-mono)] font-normal text-[14px] leading-[1.1] uppercase";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: post } = await sanityFetch({ query: POST_QUERY, params: { slug } }) as { data: Post | null };

  if (!post) notFound();

  const heroSrc = post.image ? urlFor(post.image).width(1400).height(700).url() : null;

  return (
    <>
      <Navbar />
      <main id="main-content" className="relative z-10 bg-white">

        {/* Hero image */}
        {heroSrc && (
          <div className="relative w-full overflow-hidden" style={{ height: "clamp(280px, 50vw, 560px)" }}>
            <Image
              src={heroSrc}
              alt={post.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        )}

        {/* Article */}
        <div className="px-4 md:px-8 pt-12 md:pt-16 pb-20 md:pb-32">

          {/* Back link */}
          <Link
            href="/news"
            className={`${mono} text-black/40 hover:text-black transition-colors inline-flex items-center gap-2 mb-10 md:mb-14`}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M12 7H2M2 7L7 2M2 7L7 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to news
          </Link>

          {/* Header */}
          <div className="max-w-[760px]">
            {post.publishedAt && (
              <p className={`${mono} text-black/40 mb-6`}>{formatDate(post.publishedAt)}</p>
            )}

            <h1
              className="font-[family-name:var(--font-inter)] font-black italic text-black uppercase leading-none tracking-[-0.03em] mb-10 md:mb-14"
              style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
            >
              {post.title}
            </h1>

            {/* Divider */}
            <div className="w-full h-px bg-black/12 mb-10 md:mb-14" />

            {/* Body */}
            {post.body && (
              <div className="flex flex-col gap-6">
                {post.body.split("\n\n").filter(Boolean).map((para, i) => (
                  <p
                    key={i}
                    className="font-[family-name:var(--font-inter)] font-normal text-[17px] text-[#1f1f1f] leading-[1.7] tracking-[-0.02em]"
                  >
                    {para}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Footer nav */}
          <div className="max-w-[760px] border-t border-black/12 mt-16 md:mt-24 pt-8">
            <Link
              href="/news"
              className="font-[family-name:var(--font-inter)] font-normal text-[14px] text-black/40 hover:text-black transition-colors inline-flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M12 7H2M2 7L7 2M2 7L7 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              All posts
            </Link>
          </div>

        </div>

        <div id="footer-sentinel" />
      </main>
      <div id="footer-spacer" className="pointer-events-none" />
      <Footer />
    </>
  );
}
