"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const inter = "font-[family-name:var(--font-inter)]";
const mono  = "font-[family-name:var(--font-geist-mono)] font-normal text-[14px] leading-[1.1] uppercase";
const GRAY  = "#b8b8b8";

export default function ProjectsHeroSection({ count }: { count: number }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll<HTMLElement>("[data-scrub]");
    const allWords: HTMLElement[] = [];

    targets.forEach(el => {
      const words = (el.textContent || "").split(" ").filter(Boolean);
      el.innerHTML = words
        .map(w => `<span class="gsap-word" style="display:inline-block">${w}</span>`)
        .join(" ");
      el.querySelectorAll<HTMLElement>(".gsap-word").forEach(span => {
        gsap.set(span, { color: GRAY });
        allWords.push(span);
      });
    });

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "bottom 35%",
          scrub: 1.5,
        },
      }).to(allWords, {
        color: "#000000",
        stagger: { amount: 1.2, ease: "none" },
        ease: "none",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white px-4 md:px-8 pt-36 md:pt-44 pb-0"
      id="projects-hero"
    >
      {/* Label row */}
      <div className="flex items-center justify-between mb-10 md:mb-14">
        <p className={`${mono} text-black/35`}>[ Portfolio ]</p>
        <p className={`${mono} text-black/30`}>{String(count).padStart(2, "0")} Projects</p>
      </div>

      {/* Large scrubbed headline */}
      <div className="flex flex-col gap-0">
        <p
          data-scrub
          className={`${inter} font-light text-black uppercase leading-[0.88] tracking-[-0.04em]`}
          style={{ fontSize: "clamp(64px, 10.5vw, 152px)" }}
        >
          Selected
        </p>
        <p
          data-scrub
          className={`${inter} font-black italic text-black uppercase leading-[0.88] tracking-[-0.04em]`}
          style={{ fontSize: "clamp(64px, 10.5vw, 152px)" }}
        >
          Work.
        </p>
      </div>

      {/* Bottom strip */}
      <div className="mt-12 md:mt-16 border-t border-black/10 pt-8 pb-14 md:pb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <p
          data-scrub
          className={`${inter} text-black/45 text-[15px] leading-[1.65] tracking-[-0.02em] max-w-[420px]`}
        >
          A curated selection of brand identities, websites, and digital experiences built for ambitious clients.
        </p>
        <p
          className={`${mono} text-black/20`}
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          [ Scroll to explore ]
        </p>
      </div>
    </section>
  );
}
