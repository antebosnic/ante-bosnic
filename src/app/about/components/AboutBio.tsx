"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const inter = "font-[family-name:var(--font-inter)]";
const mono  = "font-[family-name:var(--font-geist-mono)] font-normal text-[14px] leading-[1.1] uppercase";

const bio = [
  "H.Studio started in 2019 with one operating principle: that most brands settle for design that's merely competent when they could have something unforgettable. Built from London, the studio works across brand identity, web design, and digital strategy for clients who understand that design is leverage.",
  "Every project starts with the same question: what does this brand actually need to be? Not what it looks like — that comes later. Strategy before aesthetics. Position before palette. When the thinking is right, the design almost writes itself.",
  "The client list stays deliberately short. Fewer projects mean more focus, and focus is what separates work that's finished from work that's right. If you're building something worth building, this is the studio for it.",
];

const stats = [
  { num: "05+", label: "Years of practice"  },
  { num: "80+", label: "Projects completed" },
  { num: "40+", label: "Clients served"     },
];

export default function AboutBio() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Left quote slides in from left, right bio from right — simultaneous
      const bodyTrigger = { trigger: sectionRef.current, start: "top 74%" };
      gsap.from(leftRef.current,  { x: -32, opacity: 0, duration: 0.95, ease: "power3.out", scrollTrigger: bodyTrigger });
      gsap.from(rightRef.current, { x:  32, opacity: 0, duration: 0.95, ease: "power3.out", scrollTrigger: bodyTrigger });

      // Stats count strip fades up individually
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

      {/* ── Two-column: pull-quote left, bio right ──────────────── */}
      <div className="flex flex-col md:flex-row gap-12 md:gap-20 mb-16 md:mb-24">

        {/* Left: large pull-quote — sticky on desktop */}
        <div ref={leftRef} className="md:w-[38%] shrink-0 md:sticky md:top-28 md:self-start">
          <blockquote
            className={`${inter} font-light text-black italic leading-[1.05] tracking-[-0.04em]`}
            style={{ fontSize: "clamp(28px, 3.2vw, 46px)" }}
          >
            &ldquo;Great design earns attention the second time you look at it.&rdquo;
          </blockquote>
          <p className={`${mono} text-black/25 mt-6`}>— On craft</p>
        </div>

        {/* Right: bio paragraphs */}
        <div ref={rightRef} className="flex-1 flex flex-col gap-6">
          {bio.map((para, i) => (
            <p
              key={i}
              className={`${inter} font-normal text-[15px] text-[#1f1f1f] leading-[1.72] tracking-[-0.025em]`}
            >
              {para}
            </p>
          ))}
        </div>

      </div>

      {/* ── Stats strip ─────────────────────────────────────────── */}
      <div
        ref={statsRef}
        className="border-t border-black/10 pt-10 flex flex-col md:flex-row gap-8 md:gap-0"
      >
        {stats.map(({ num, label }, i) => (
          <div
            key={num}
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
