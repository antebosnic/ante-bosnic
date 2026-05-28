"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "./AnimatedButton";
import { openContactModal } from "./ContactModal";
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/sanity/lib/image";

const mono =
  "font-[family-name:var(--font-geist-mono)] font-normal text-[14px] leading-[1.1] uppercase";

function Corner({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={`shrink-0 ${className ?? ""}`}
    >
      <path d="M16 0H0V16" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export interface SanityProject {
  _id: string;
  title: string;
  imageUrl?: string;
  image?: SanityImageSource;
  tags?: string[];
  tall: boolean;
  order: number;
  link?: string;
}

function getImageSrc(project: SanityProject): string {
  if (project.imageUrl) return project.imageUrl;
  if (project.image) return urlFor(project.image).url();
  return "";
}

function ProjectCard({ project }: { project: SanityProject }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const onEnter = () => {
    gsap.killTweensOf([titleRef.current, arrowRef.current, imageRef.current]);
    gsap.to(arrowRef.current, { x: 6, y: -6, duration: 0.4, ease: "power2.out" });
    gsap.to(titleRef.current, { x: 10, duration: 0.4, ease: "power2.out" });
    gsap.to(imageRef.current, { scale: 1.06, duration: 0.8, ease: "power2.out" });
  };

  const onLeave = () => {
    gsap.killTweensOf([titleRef.current, arrowRef.current, imageRef.current]);
    gsap.to(arrowRef.current, { x: 0, y: 0, duration: 0.4, ease: "power2.inOut" });
    gsap.to(titleRef.current, { x: 0, duration: 0.4, ease: "power2.inOut" });
    gsap.to(imageRef.current, { scale: 1, duration: 0.8, ease: "power2.inOut" });
  };

  const desktopH = project.tall ? "md:h-[620px]" : "md:h-[540px]";
  const src = getImageSrc(project);

  return (
    <div onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <div className={`relative w-full aspect-[3/4] ${desktopH} md:aspect-auto overflow-hidden`}>
        <div ref={imageRef} className="absolute inset-0">
          <Image
            src={src}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="absolute bottom-4 left-4 flex gap-2">
          {(project.tags ?? []).map((tag) => (
            <span
              key={tag}
              className="bg-white/80 text-neutral-900 font-[family-name:var(--font-inter)] font-normal text-[13px] px-4 py-2 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 md:mt-4 text-black">
        <h3
          ref={titleRef}
          className="font-[family-name:var(--font-inter)] font-black italic uppercase leading-none tracking-[-0.03em]"
          style={{ fontSize: "clamp(24px, 2.78vw, 40px)" }}
        >
          {project.title}
        </h3>
        <span ref={arrowRef} className="shrink-0 inline-flex">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
            <path d="M6 23.5L6 26L8.5 26L26 8.5L26 21L29 21L29 3L11 3L11 6L23.5 6L6 23.5Z" />
          </svg>
        </span>
      </div>
    </div>
  );
}

function CtaBlock() {
  return (
    <div className="flex items-stretch gap-3 text-black">
      <div className="flex flex-col justify-between w-4 shrink-0">
        <Corner />
        <Corner className="-rotate-90" />
      </div>
      <div className="flex flex-col gap-4 py-3 flex-1">
        <p className="font-[family-name:var(--font-inter)] font-normal italic text-[14px] leading-[1.3] tracking-[-0.04em] md:max-w-[393px]">
          Discover how my creativity transforms ideas into impactful digital
          experiences — schedule a call with me to get started.
        </p>
        <AnimatedButton className="self-start" onClick={openContactModal}>Let&apos;s talk</AnimatedButton>
      </div>
      <div className="flex flex-col justify-between items-end w-4 shrink-0">
        <Corner className="rotate-90" />
        <Corner className="rotate-180" />
      </div>
    </div>
  );
}

export default function PortfolioSection({ projects }: { projects: SanityProject[] }) {
  // Sanity order: Surfers(1), Cyberpunk(2), Agency(3), Minimal(4)
  // Desktop left col:  first two  → Surfers, Cyberpunk
  // Desktop right col: last two   → Agency 976, Minimal Playground
  const mid = Math.ceil(projects.length / 2);
  const leftProjects  = projects.slice(0, mid);
  const rightProjects = projects.slice(mid);

  const sectionRef  = useRef<HTMLElement>(null);
  const leftColRef  = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!window.matchMedia("(min-width: 768px)").matches) return;

      const trigger = {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.8,
      };

      gsap.to(leftColRef.current,  { y: -50,  ease: "none", scrollTrigger: trigger });
      gsap.to(rightColRef.current, { y: -160, ease: "none", scrollTrigger: trigger });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white px-4 md:px-8 pt-8 md:pt-12 pb-12 md:pb-20" id="projects">

      {/* ── Mobile header ── */}
      <div className="md:hidden mb-6">
        <p className={`${mono} text-black mb-3`}>[ Portfolio ]</p>
        <div className="flex items-start justify-between">
          <h2
            className="font-[family-name:var(--font-inter)] font-light text-black uppercase leading-tight"
            style={{ fontSize: "clamp(40px, 10.67vw, 48px)" }}
          >
            Selected<br />Work
          </h2>
          <p className={`${mono} text-black`}>004</p>
        </div>
      </div>

      {/* ── Desktop header ── */}
      <div className="hidden md:flex items-start justify-between mb-14">
        <h2
          className="font-[family-name:var(--font-inter)] font-light text-black uppercase leading-[0.9]"
          style={{ fontSize: "clamp(48px, 5.76vw, 83px)" }}
        >
          Selected
          <sup className={`${mono} text-black text-[14px] align-super ml-2 normal-case`}>
            004
          </sup>
          <br />Work
        </h2>
        <p
          className={`${mono} text-black`}
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          [ Portfolio ]
        </p>
      </div>

      {/* ── Mobile: single column ── */}
      <div className="md:hidden flex flex-col gap-8">
        {projects.map((p) => (
          <ProjectCard key={p._id} project={p} />
        ))}
        <CtaBlock />
      </div>

      {/* ── Desktop: two flex columns ── */}
      <div className="hidden md:flex items-start gap-x-6">

        {/* Left column — Surfers + Cyberpunk + CTA */}
        <div ref={leftColRef} className="flex-1 min-w-0 flex flex-col gap-y-[100px]">
          {leftProjects.map((p) => (
            <ProjectCard key={p._id} project={p} />
          ))}
          <CtaBlock />
        </div>

        {/* Right column — Agency 976 + Minimal Playground, staggered down + parallax */}
        <div ref={rightColRef} className="flex-1 min-w-0 flex flex-col gap-y-[100px] mt-[240px]">
          {rightProjects.map((p) => (
            <ProjectCard key={p._id} project={p} />
          ))}
        </div>

      </div>

    </section>
  );
}
