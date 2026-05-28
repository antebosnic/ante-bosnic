"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import AnimatedButton from "../../components/AnimatedButton";
import { openContactModal } from "../../components/ContactModal";

const inter = "font-[family-name:var(--font-inter)]";
const mono  = "font-[family-name:var(--font-geist-mono)] font-normal text-[14px] leading-[1.1] uppercase";

const metrics = [
  { num: "05+", label: "Years of practice"  },
  { num: "80+", label: "Projects completed" },
  { num: "40+", label: "Clients served"     },
];

// Each heading line is wrapped in an overflow-hidden clip so the text
// slides up from below the baseline — a masked-reveal entrance.
function HeadingLine({
  children,
  weight,
  clipRef,
}: {
  children: React.ReactNode;
  weight: "light" | "black";
  clipRef: React.RefObject<HTMLSpanElement | null>;
}) {
  return (
    <div style={{ overflow: "hidden" }}>
      <span
        ref={clipRef}
        className={`block ${inter} text-white uppercase leading-[0.9] tracking-[-0.04em] ${
          weight === "black" ? "font-black italic" : "font-light"
        }`}
        style={{ fontSize: "clamp(52px, 7.5vw, 108px)" }}
      >
        {children}
      </span>
    </div>
  );
}

export default function AboutHero() {
  const labelRef   = useRef<HTMLParagraphElement>(null);
  const line1Ref   = useRef<HTMLSpanElement>(null);
  const line2Ref   = useRef<HTMLSpanElement>(null);
  const line3Ref   = useRef<HTMLSpanElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label fades in first
      gsap.from(labelRef.current, {
        y: 20, opacity: 0, duration: 0.75, ease: "power3.out", delay: 0.1,
      });

      // Heading lines slide up from inside their overflow-hidden clips
      gsap.from([line1Ref.current, line2Ref.current, line3Ref.current], {
        yPercent: 105,
        duration: 1.1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.3,
      });

      // Bottom strip fades up after heading settles
      gsap.from([metricsRef.current, ctaRef.current], {
        y: 18, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.75,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="min-h-screen bg-black flex flex-col px-4 md:px-8 pt-36 pb-14 md:pt-44 md:pb-16"
      data-theme="dark"
      id="about-hero"
    >
      <div className="flex-1 flex flex-col justify-between gap-14 md:gap-20">

        {/* Top: label + heading */}
        <div className="flex flex-col gap-10 md:gap-14">
          <p ref={labelRef} className={`${mono} text-white/40`}>[ About ] — 001</p>

          <div className="flex flex-col gap-0">
            <HeadingLine weight="light" clipRef={line1Ref}>We design things</HeadingLine>
            <HeadingLine weight="light" clipRef={line2Ref}>that refuse</HeadingLine>
            <HeadingLine weight="black" clipRef={line3Ref}>to be ignored.</HeadingLine>
          </div>
        </div>

        {/* Bottom: divider + metrics + CTA */}
        <div className="flex flex-col gap-8 md:gap-10">
          <div className="w-full h-px bg-white/10" />

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-0">

            {/* Metrics */}
            <div ref={metricsRef} className="flex gap-10 md:gap-16">
              {metrics.map(({ num, label }) => (
                <div key={num} className="flex flex-col gap-2">
                  <span
                    className={`${inter} font-light text-white leading-none tracking-[-0.05em]`}
                    style={{ fontSize: "clamp(34px, 4vw, 56px)" }}
                  >
                    {num}
                  </span>
                  <span className={`${mono} text-white/30`}>{label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div ref={ctaRef}>
              <AnimatedButton variant="light" onClick={openContactModal}>
                Start a project
              </AnimatedButton>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
