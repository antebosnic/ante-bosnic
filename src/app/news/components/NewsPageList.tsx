"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { urlFor } from "@/sanity/lib/image";
import type { Post } from "../page";

const mono = "font-[family-name:var(--font-geist-mono)] font-normal text-[14px] leading-[1.1] uppercase";

function formatDate(iso?: string): string {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

function getExcerpt(post: Post): string {
  const src = post.excerpt ?? post.body ?? "";
  return src.length > 160 ? src.slice(0, 157).trimEnd() + "…" : src;
}

// ── Single post row ───────────────────────────────────────────────────────────

function PostRow({ post, index }: { post: Post; index: number }) {
  const rowRef   = useRef<HTMLAnchorElement>(null);
  const imgRef   = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  const onEnter = () => {
    gsap.killTweensOf([imgRef.current, titleRef.current, arrowRef.current]);
    gsap.to(titleRef.current, { x: 10,       duration: 0.35, ease: "power2.out" });
    gsap.to(arrowRef.current, { x: 6, y: -6, duration: 0.35, ease: "power2.out" });
    if (imgRef.current) gsap.to(imgRef.current, { scale: 1.06, duration: 0.7, ease: "power2.out" });
  };

  const onLeave = () => {
    gsap.killTweensOf([imgRef.current, titleRef.current, arrowRef.current]);
    gsap.to(titleRef.current, { x: 0,       duration: 0.4, ease: "power2.inOut" });
    gsap.to(arrowRef.current, { x: 0, y: 0, duration: 0.4, ease: "power2.inOut" });
    if (imgRef.current) gsap.to(imgRef.current, { scale: 1, duration: 0.7, ease: "power2.inOut" });
  };

  const imageSrc = post.image ? urlFor(post.image).width(600).height(420).url() : null;
  const excerpt  = getExcerpt(post);

  return (
    <Link
      ref={rowRef}
      href={`/news/${post.slug}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group border-t border-black/12 flex flex-col md:flex-row md:items-stretch gap-6 md:gap-10 py-8 md:py-10"
    >
      {/* Index */}
      <p className={`${mono} text-black/30 shrink-0 md:w-10 md:pt-1`}>
        {String(index + 1).padStart(2, "0")}
      </p>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-3 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <h2
            ref={titleRef}
            className="font-[family-name:var(--font-inter)] font-black italic text-black uppercase leading-none tracking-[-0.03em]"
            style={{ fontSize: "clamp(22px, 2.6vw, 36px)" }}
          >
            {post.title}
          </h2>
          <span ref={arrowRef} className="shrink-0 inline-flex mt-1 text-black">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="currentColor">
              <path d="M6 23.5L6 26L8.5 26L26 8.5L26 21L29 21L29 3L11 3L11 6L23.5 6L6 23.5Z" />
            </svg>
          </span>
        </div>

        <p className={`${mono} text-black/40`}>{formatDate(post.publishedAt)}</p>

        {excerpt && (
          <p className="font-[family-name:var(--font-inter)] font-normal text-[14px] text-[#555] leading-[1.6] tracking-[-0.02em] max-w-[560px]">
            {excerpt}
          </p>
        )}
      </div>

      {/* Image — desktop only */}
      {imageSrc && (
        <div className="hidden md:block relative w-[220px] shrink-0 overflow-hidden self-stretch min-h-[160px]">
          <div ref={imgRef} className="absolute inset-0">
            <Image
              src={imageSrc}
              alt={post.title}
              fill
              className="object-cover"
              sizes="220px"
            />
          </div>
        </div>
      )}

      {/* Image — mobile (top of card, shown above content) */}
      {imageSrc && (
        <div className="md:hidden relative w-full h-[220px] overflow-hidden order-first">
          <Image src={imageSrc} alt={post.title} fill className="object-cover" sizes="100vw" />
        </div>
      )}
    </Link>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="border-t border-black/12 py-20 flex flex-col items-center gap-4 text-center">
      <p className={`${mono} text-black/30`}>[ No posts yet ]</p>
      <p className="font-[family-name:var(--font-inter)] font-normal text-[15px] text-[#555] tracking-[-0.02em]">
        Check back soon — updates are on the way.
      </p>
    </div>
  );
}

// ── List ──────────────────────────────────────────────────────────────────────

export default function NewsPageList({ posts }: { posts: Post[] }) {
  const listRef  = useRef<HTMLDivElement>(null);
  const rowRefs  = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!posts.length) return;

    const ctx = gsap.context(() => {
      rowRefs.current.filter(Boolean).forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    });

    return () => ctx.revert();
  }, [posts]);

  return (
    <section
      ref={listRef}
      className="bg-white px-4 md:px-8 pt-8 md:pt-12 pb-16 md:pb-24"
      id="news-list"
    >
      {posts.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col">
          {posts.map((post, i) => (
            <div
              key={post._id}
              ref={el => { rowRefs.current[i] = el; }}
            >
              <PostRow post={post} index={i} />
            </div>
          ))}
          <div className="border-t border-black/12" />
        </div>
      )}
    </section>
  );
}
