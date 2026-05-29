"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SanityAbout } from "../page";

const inter = "font-[family-name:var(--font-inter)]";
const mono  = "font-[family-name:var(--font-geist-mono)] font-normal text-[14px] leading-[1.1] uppercase";

export default function AboutBio({ about }: { about: SanityAbout }) {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const bodyTrigger = { trigger: sectionRef.current, start: "top 74%" };
      gsap.from(leftRef.current,  { x: -32, opacity: 0, duration: 0.95, ease: "power3.out", scrollTrigger: bodyTrigger });
      gsap.from(rightRef.current, { x:  32, opacity: 0, duration: 0.95, ease: "power3.out", scrollTrigger: bodyTrigger });

      const statEls = statsRef.current ? Array.from(statsRef.current.children) : [];
      gsap.from(statEls, {
        y: 28, opacity: 0, duration: 0.75, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: statsRef.current, start: "top 86%" },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white px-4 md:px-8 pt-16 md:pt-24 pb-20 md:pb-32"
      id="about-bio"
    >
      <p className={`${mono} text-black/35 mb-12 md:mb-16`}>[ Story ]</p>

      {/* Two-column: pull-quote left, bio right */}
      <div className="flex flex-col md:flex-row gap-12 md:gap-20 mb-16 md:mb-24">

        <div ref={leftRef} className="md:w-[38%] shrink-0 md:sticky md:top-28 md:self-start">
          <blockquote
            className={`${inter} font-light text-black italic leading-[1.05] tracking-[-0.04em]`}
            style={{ fontSize: "clamp(28px, 3.2vw, 46px)" }}
          >
            &ldquo;{about.pullQuote}&rdquo;
          </blockquote>
          <p className={`${mono} text-black/25 mt-6`}>— On craft</p>
        </div>

        <div ref={rightRef} className="flex-1 flex flex-col gap-6">
          {about.bio.map(({ _key, paragraph }) => (
            <p
              key={_key}
              className={`${inter} font-normal text-[15px] text-[#1f1f1f] leading-[1.72] tracking-[-0.025em]`}
            >
              {paragraph}
            </p>
          ))}
        </div>

      </div>

      {/* Stats strip */}
      <div
        ref={statsRef}
        className="border-t border-black/10 pt-10 flex flex-col md:flex-row gap-8 md:gap-0"
      >
        {about.stats.map(({ _key, num, label }, i) => (
          <div
            key={_key}
            className={`flex-1 ${i > 0 ? "md:border-l md:border-black/10 md:pl-10" : ""}`}
          >
            <p
              className={`${inter} font-light text-black leading-none tracking-[-0.05em] mb-2`}
              style={{ fontSize: "clamp(50px, 5.5vw, 80px)" }}
            >
              {num}
            </p>
            <p className={`${mono} text-black/35`}>{label}</p>
          </div>
        ))}
      </div>

    </section>
  );
}
