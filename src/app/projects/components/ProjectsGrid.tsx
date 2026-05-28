"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "../../components/AnimatedButton";
import { openContactModal } from "../../components/ContactModal";
import type { SanityProject } from "../../components/PortfolioSection";
import { urlFor } from "@/sanity/lib/image";

const inter = "font-[family-name:var(--font-inter)]";
const mono  = "font-[family-name:var(--font-geist-mono)] font-normal text-[14px] leading-[1.1] uppercase";

function getImageSrc(p: SanityProject): string {
  if (p.imageUrl) return p.imageUrl;
  if (p.image)    return urlFor(p.image).url();
  return "";
}

function getAllTags(projects: SanityProject[]): string[] {
  const seen = new Set<string>();
  projects.forEach(p => (p.tags ?? []).forEach(t => seen.add(t)));
  return Array.from(seen);
}

// ── Full-bleed project panel ──────────────────────────────────────────────────

function ProjectPanel({
  project,
  index,
  panelRef,
}: {
  project:  SanityProject;
  index:    number;
  panelRef: (el: HTMLDivElement | null) => void;
}) {
  const imgRef   = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const src      = getImageSrc(project);
  const num      = String(index + 1).padStart(2, "0");

  const onEnter = () => {
    gsap.killTweensOf([imgRef.current, arrowRef.current]);
    gsap.to(imgRef.current,   { scale: 1.04,      duration: 0.8,  ease: "power2.out"   });
    gsap.to(arrowRef.current, { x: 5, y: -5,      duration: 0.38, ease: "power2.out"   });
  };

  const onLeave = () => {
    gsap.killTweensOf([imgRef.current, arrowRef.current]);
    gsap.to(imgRef.current,   { scale: 1,         duration: 0.7,  ease: "power2.inOut" });
    gsap.to(arrowRef.current, { x: 0,  y: 0,      duration: 0.32, ease: "power2.inOut" });
  };

  const inner = (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(260px, 55vh, 640px)" }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Image */}
      {src ? (
        <div ref={imgRef} className="absolute inset-0 will-change-transform">
          <Image src={src} alt={project.title} fill className="object-cover" sizes="100vw" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-neutral-800" />
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 48%, transparent 100%)",
        }}
      />

      {/* Overlaid text */}
      <div className="absolute inset-x-0 bottom-0 px-4 md:px-8 pb-7 md:pb-10 flex items-end justify-between gap-6">
        <div className="flex flex-col gap-2.5">
          <p className={`${mono} text-white/40`}>[ {num} ]</p>
          <h2
            className={`${inter} font-black italic text-white uppercase leading-none tracking-[-0.03em]`}
            style={{ fontSize: "clamp(26px, 3.6vw, 52px)" }}
          >
            {project.title}
          </h2>
          {(project.tags ?? []).length > 0 && (
            <div className="flex flex-wrap gap-2 mt-1">
              {(project.tags ?? []).map(tag => (
                <span
                  key={tag}
                  className={`${mono} text-[11px] text-white/50 border border-white/20 px-2.5 py-0.5 rounded-full`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <span ref={arrowRef} className="shrink-0 inline-flex text-white mb-1">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="currentColor">
            <path d="M6 23.5L6 26L8.5 26L26 8.5L26 21L29 21L29 3L11 3L11 6L23.5 6L6 23.5Z" />
          </svg>
        </span>
      </div>
    </div>
  );

  return (
    <div ref={panelRef}>
      {project.link
        ? <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">{inner}</a>
        : inner
      }
    </div>
  );
}

// ── Dark closing CTA ──────────────────────────────────────────────────────────

function DarkCta() {
  const ctaRef  = useRef<HTMLDivElement>(null);
  const line1   = useRef<HTMLSpanElement>(null);
  const line2   = useRef<HTMLSpanElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from([line1.current, line2.current], {
        yPercent: 105, duration: 1.0, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ctaRef.current, start: "top 80%", once: true },
      });
      gsap.from(rightRef.current, {
        x: 28, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ctaRef.current, start: "top 76%", once: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ctaRef}
      className="bg-black px-4 md:px-8 pt-24 md:pt-32 pb-20 md:pb-28"
      data-theme="dark"
    >
      <p className={`${mono} text-white/25 mb-10 md:mb-14`}>[ Next step ]</p>

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12 md:gap-16">

        {/* Masked heading */}
        <div>
          <div style={{ overflow: "hidden" }}>
            <span
              ref={line1}
              className={`block ${inter} font-light text-white uppercase leading-[0.9] tracking-[-0.04em]`}
              style={{ fontSize: "clamp(42px, 6vw, 88px)" }}
            >
              Have a project
            </span>
          </div>
          <div style={{ overflow: "hidden" }}>
            <span
              ref={line2}
              className={`block ${inter} font-black italic text-white uppercase leading-[0.9] tracking-[-0.04em]`}
              style={{ fontSize: "clamp(42px, 6vw, 88px)" }}
            >
              in mind?
            </span>
          </div>
        </div>

        {/* Right: descriptor + CTA */}
        <div ref={rightRef} className="flex flex-col gap-6 md:items-end">
          <p className={`${inter} text-white/40 text-[15px] leading-[1.7] tracking-[-0.02em] max-w-[300px] md:text-right`}>
            Tell us what you&apos;re building.<br />We&apos;ll tell you if we&apos;re the right fit.
          </p>
          <AnimatedButton variant="light" onClick={openContactModal}>
            Start a project →
          </AnimatedButton>
        </div>

      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function ProjectsGrid({ projects }: { projects: SanityProject[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const tags = getAllTags(projects);

  const panelRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const filterRef    = useRef<HTMLDivElement>(null);
  const lineRef      = useRef<HTMLDivElement>(null);
  const tagBtnRefs   = useRef<(HTMLButtonElement | null)[]>([]);
  const hasMounted   = useRef(false);

  // ── Clip-path reveal per panel on scroll ──────────────────────────────────
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      panelRefs.current.filter(Boolean).forEach(el => {
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          }
        );
      });
    });
    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Filter dim/show ───────────────────────────────────────────────────────
  useEffect(() => {
    panelRefs.current.forEach((el, i) => {
      if (!el) return;
      const matches = !activeTag || (projects[i]?.tags ?? []).includes(activeTag);
      gsap.to(el, { opacity: matches ? 1 : 0.07, duration: 0.4, ease: "power2.inOut" });
      (el as HTMLElement).style.pointerEvents = matches ? "auto" : "none";
    });
  }, [activeTag, projects]);

  // ── Slide underline indicator to active tag button ────────────────────────
  useEffect(() => {
    const idx = activeTag === null ? 0 : tags.indexOf(activeTag) + 1;
    const btn = tagBtnRefs.current[idx];
    if (!btn || !filterRef.current || !lineRef.current) return;

    const containerRect = filterRef.current.getBoundingClientRect();
    const btnRect       = btn.getBoundingClientRect();
    const x = btnRect.left - containerRect.left;
    const w = btnRect.width;

    if (!hasMounted.current) {
      gsap.set(lineRef.current, { x, width: w });
      hasMounted.current = true;
    } else {
      gsap.to(lineRef.current, { x, width: w, duration: 0.32, ease: "power3.out" });
    }
  }, [activeTag, tags]);

  const handleTag = (tag: string | null) =>
    setActiveTag(prev => (prev === tag ? null : tag));

  return (
    <>
      <section className="bg-white" id="projects-list">

        {/* ── Sticky underline-style filter bar ── */}
        <div className="sticky top-[72px] z-30 bg-white/92 backdrop-blur-sm border-b border-black/8">
          <div ref={filterRef} className="relative flex items-center gap-8 px-4 md:px-8 py-[14px]">
            {[null, ...tags].map((tag, i) => (
              <button
                key={tag ?? "__all__"}
                ref={el => { tagBtnRefs.current[i] = el; }}
                onClick={() => handleTag(tag)}
                className={`${inter} text-[13px] tracking-[-0.015em] shrink-0 transition-colors duration-200 ${
                  activeTag === tag ? "text-black" : "text-black/35 hover:text-black/65"
                }`}
              >
                {tag ?? "All"}
              </button>
            ))}
            {/* Sliding underline indicator */}
            <div
              ref={lineRef}
              className="absolute bottom-0 h-[1.5px] bg-black"
              style={{ width: 0, left: 0 }}
            />
          </div>
        </div>

        {/* ── Full-bleed panels separated by hairline ── */}
        <div className="flex flex-col gap-[2px] bg-black/6 pt-[2px]">
          {projects.map((project, i) => (
            <ProjectPanel
              key={project._id}
              project={project}
              index={i}
              panelRef={el => { panelRefs.current[i] = el; }}
            />
          ))}
        </div>

      </section>

      {/* ── Dark closing section ── */}
      <DarkCta />
    </>
  );
}
