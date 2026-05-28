"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

const inter = "font-[family-name:var(--font-inter)]";
const mono  = "font-[family-name:var(--font-geist-mono)] font-normal text-[14px] leading-[1.1] uppercase";

function HeadingLine({
  spanRef,
  weight,
  children,
}: {
  spanRef: React.RefObject<HTMLSpanElement | null>;
  weight: "light" | "black";
  children: React.ReactNode;
}) {
  return (
    <div style={{ overflow: "hidden" }}>
      <span
        ref={spanRef}
        className={`block ${inter} text-white uppercase leading-[0.88] tracking-[-0.04em] ${
          weight === "black" ? "font-black italic" : "font-light"
        }`}
        style={{ fontSize: "clamp(68px, 10.5vw, 152px)" }}
      >
        {children}
      </span>
    </div>
  );
}

export default function ProjectsHero({ count }: { count: number }) {
  const labelRef  = useRef<HTMLParagraphElement>(null);
  const line1Ref  = useRef<HTMLSpanElement>(null);
  const line2Ref  = useRef<HTMLSpanElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const ghostRef  = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ghost count drifts slightly on load
      gsap.from(ghostRef.current, {
        scale: 1.08, opacity: 0, duration: 1.6, ease: "power3.out", delay: 0.05,
      });
      gsap.from(labelRef.current, {
        y: 20, opacity: 0, duration: 0.75, ease: "power3.out", delay: 0.15,
      });
      gsap.from([line1Ref.current, line2Ref.current], {
        yPercent: 105, duration: 1.1, stagger: 0.12, ease: "power3.out", delay: 0.3,
      });
      gsap.from(bottomRef.current, {
        y: 18, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.75,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative min-h-screen bg-black flex flex-col px-4 md:px-8 pt-36 pb-14 md:pt-44 md:pb-16 overflow-hidden"
      data-theme="dark"
      id="projects-hero"
    >
      {/* Ghost background count — sits behind everything */}
      <div className="absolute inset-0 flex items-center justify-end pointer-events-none select-none pr-4 md:pr-8">
        <span
          ref={ghostRef}
          className={`${inter} font-black text-white leading-none tracking-[-0.07em]`}
          style={{ fontSize: "clamp(200px, 30vw, 440px)", opacity: 0.04 }}
        >
          {String(count).padStart(2, "0")}
        </span>
      </div>

      <div className="relative flex-1 flex flex-col justify-between gap-14 md:gap-20">

        {/* Label + heading */}
        <div className="flex flex-col gap-10 md:gap-14">
          <p ref={labelRef} className={`${mono} text-white/40`}>
            [ Projects ] — {String(count).padStart(2, "0")}
          </p>
          <div>
            <HeadingLine spanRef={line1Ref} weight="light">Selected</HeadingLine>
            <HeadingLine spanRef={line2Ref} weight="black">Work.</HeadingLine>
          </div>
        </div>

        {/* Bottom strip */}
        <div ref={bottomRef} className="flex flex-col gap-6 md:gap-8">
          <div className="w-full h-px bg-white/10" />
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <p className={`${inter} text-white/45 text-[15px] leading-[1.65] tracking-[-0.02em] max-w-[420px]`}>
              A curated selection of brand identities, websites, and digital experiences built for ambitious clients.
            </p>
            <p
              className={`${mono} text-white/20`}
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              [ Scroll to explore ]
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
