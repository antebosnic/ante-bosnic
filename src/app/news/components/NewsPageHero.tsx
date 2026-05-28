"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

const mono = "font-[family-name:var(--font-geist-mono)] font-normal text-[14px] leading-[1.1] uppercase";

export default function NewsPageHero({ count }: { count: number }) {
  const labelRef   = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const vertRef    = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([labelRef.current, headingRef.current, vertRef.current], {
        y: 30,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-white px-4 md:px-8 pt-32 md:pt-40 pb-0" id="news-hero">

      <p ref={labelRef} className={`${mono} text-black mb-8 md:mb-10`}>
        [ News ] — {String(count).padStart(2, "0")}
      </p>

      {/* Desktop */}
      <div className="hidden md:flex items-end justify-between">
        <h1
          ref={headingRef}
          className="font-[family-name:var(--font-inter)] font-light text-black uppercase leading-[0.9] tracking-[-0.04em]"
          style={{ fontSize: "clamp(64px, 8.5vw, 122px)" }}
        >
          Latest<br />News
        </h1>
        <p
          ref={vertRef}
          className={`${mono} text-black`}
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          [ News &amp; Achievements ]
        </p>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex items-start justify-between">
        <h1
          className="font-[family-name:var(--font-inter)] font-light text-black uppercase leading-[0.9] tracking-[-0.04em]"
          style={{ fontSize: "clamp(52px, 13.5vw, 72px)" }}
        >
          Latest<br />News
        </h1>
        <p className={`${mono} text-black`}>{String(count).padStart(2, "0")}</p>
      </div>

    </section>
  );
}
