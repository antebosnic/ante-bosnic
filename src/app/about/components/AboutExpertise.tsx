"use client";

import { useRef } from "react";
import gsap from "gsap";

const mono = "font-[family-name:var(--font-geist-mono)] font-normal text-[14px] text-white leading-[1.1] uppercase";

const skills = [
  {
    num: "01",
    title: "Brand Identity",
    tags: ["Logo Design", "Typography", "Visual Systems", "Brand Guidelines"],
  },
  {
    num: "02",
    title: "Web Design & Dev",
    tags: ["UI/UX", "Next.js", "React", "Motion Design", "GSAP"],
  },
  {
    num: "03",
    title: "Art Direction",
    tags: ["Campaign Design", "Photography Direction", "Editorial"],
  },
  {
    num: "04",
    title: "Digital Strategy",
    tags: ["Creative Consulting", "Brand Positioning", "Marketing"],
  },
];

function SkillRow({ num, title, tags }: { num: string; title: string; tags: string[] }) {
  const lineRef  = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const onEnter = () => {
    gsap.killTweensOf([lineRef.current, titleRef.current]);
    gsap.to(lineRef.current,  { scaleX: 1, transformOrigin: "left center",  duration: 0.9, ease: "power3.out" });
    gsap.to(titleRef.current, { x: 14,    duration: 0.5, ease: "power2.out" });
  };

  const onLeave = () => {
    gsap.killTweensOf([lineRef.current, titleRef.current]);
    gsap.to(lineRef.current,  { scaleX: 0, transformOrigin: "right center", duration: 0.7, ease: "power3.inOut" });
    gsap.to(titleRef.current, { x: 0,     duration: 0.5, ease: "power2.inOut" });
  };

  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <div className="flex flex-col gap-3 mb-4 md:mb-0">
        <p className={mono}>[ {num} ]</p>
        <div className="relative w-full h-px">
          <div
            ref={lineRef}
            className="absolute inset-0 origin-left"
            style={{
              transform: "scaleX(0)",
              background: "linear-gradient(90deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.72) 65%, #ffffff 100%)",
            }}
          />
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex items-start pt-4 pb-10 gap-10">
        <h3
          ref={titleRef}
          className="font-[family-name:var(--font-inter)] font-bold italic text-white uppercase leading-none tracking-[-0.04em] w-[280px] shrink-0"
          style={{ fontSize: "clamp(26px, 2.4vw, 34px)" }}
        >
          {title}
        </h3>
        <div className="flex flex-wrap gap-2 pt-1">
          {tags.map(tag => (
            <span
              key={tag}
              className="border border-white/20 text-white/55 font-[family-name:var(--font-inter)] font-normal text-[12px] px-3 py-1 rounded-full tracking-[-0.02em]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden pt-3 pb-8">
        <h3
          className="font-[family-name:var(--font-inter)] font-bold italic text-white uppercase leading-none tracking-[-0.04em] mb-4"
          style={{ fontSize: "clamp(22px, 7vw, 30px)" }}
        >
          {title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span
              key={tag}
              className="border border-white/20 text-white/55 font-[family-name:var(--font-inter)] font-normal text-[12px] px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AboutExpertise() {
  return (
    <section className="bg-black px-4 md:px-8 pt-8 md:pt-12 pb-12 md:pb-20" data-theme="dark" id="expertise">

      <p className={`${mono} mb-6 md:mb-10`}>[ Expertise ]</p>

      <div className="flex items-end justify-between mb-8 md:mb-12">
        <p
          className="font-[family-name:var(--font-inter)] font-light text-white leading-none tracking-[-0.04em]"
          style={{ fontSize: "clamp(36px, 8.06vw, 116px)" }}
        >
          [4]
        </p>
        <p
          className="font-[family-name:var(--font-inter)] font-light text-white leading-none tracking-[-0.04em]"
          style={{ fontSize: "clamp(36px, 8.06vw, 116px)" }}
        >
          SKILLS
        </p>
      </div>

      <div className="flex flex-col">
        {skills.map(s => <SkillRow key={s.num} {...s} />)}
      </div>

    </section>
  );
}
