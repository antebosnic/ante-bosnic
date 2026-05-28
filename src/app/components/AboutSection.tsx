"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const aboutImage = "/about-portrait.jpg";

const mono =
  "font-[family-name:var(--font-geist-mono)] font-normal text-[14px] text-[#1f1f1f] leading-[1.1] uppercase whitespace-nowrap";

const bodyText =
  "font-[family-name:var(--font-inter)] font-normal text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]";

function Corner({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`shrink-0 ${className ?? ""}`}>
      <path d="M16 0H0V16" stroke="#1f1f1f" strokeWidth="1" />
    </svg>
  );
}

function BracketedText() {
  return (
    <div className="flex items-stretch gap-3">
      <div className="flex flex-col justify-between w-4 shrink-0">
        <Corner />
        <Corner className="-rotate-90" />
      </div>
      <p className={`flex-1 py-3 ${bodyText}`}>
        Placeholder paragraph one. This is where you introduce yourself —
        your background, your passion for your craft, and what drives you
        creatively. Two to three sentences work best here.{" "}
        Placeholder paragraph two. Here you can describe your technical
        approach, how you collaborate with clients, or what sets your work
        apart from others in your field.
      </p>
      <div className="flex flex-col justify-between items-end w-4 shrink-0">
        <Corner className="rotate-90" />
        <Corner className="rotate-180" />
      </div>
    </div>
  );
}

export default function AboutSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const overlayDRef = useRef<HTMLDivElement>(null);
  const overlayMRef = useRef<HTMLDivElement>(null);
  const textRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;

      if (isDesktop) {
        gsap.set(overlayDRef.current, { scaleX: 1 });

        // Curtain: wide range + high scrub + eased interpolation for silky reveal
        gsap.to(overlayDRef.current, {
          scaleX: 0,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "top 20%",
            scrub: 2,
          },
        });

        // Text: full-section parallax drift with heavy scrub lag
        gsap.fromTo(
          textRef.current,
          { x: 0 },
          {
            x: -380,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 95%",
              end: "bottom 5%",
              scrub: 3,
            },
          }
        );
      } else {
        gsap.set(overlayMRef.current, { scaleX: 1 });
        gsap.to(overlayMRef.current, {
          scaleX: 0,
          ease: "none",
          scrollTrigger: {
            trigger: overlayMRef.current,
            start: "top 85%",
            end: "top 20%",
            scrub: 0.8,
          },
        });
      }
    });

    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-white px-4 md:px-8 py-12 md:py-20 overflow-hidden" id="about">

      {/* ── Mobile ── */}
      <div className="flex flex-col gap-5 md:hidden">
        <p className={mono}>002</p>
        <p className={mono}>[ About ]</p>
        <BracketedText />
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "422/594" }}>
          <Image src={aboutImage} alt="Portrait" fill className="object-cover" />
          <div
            ref={overlayMRef}
            className="absolute inset-0 bg-black"
            style={{ transformOrigin: "right center", transform: "scaleX(1)" }}
          />
        </div>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:flex items-end">

        {/*
          Left column — flex-1.
          [About] sits at the top; the bracket box is pushed to the
          bottom-right edge of this column (ml-auto) so it sits
          directly adjacent to the image.
        */}
        <div className="flex-1 min-w-0 flex flex-col justify-between" style={{ height: "614px" }}>
          <p className={mono}>[ About ]</p>

          {/* ml-auto pushes it right, close to the image */}
          <div ref={textRef} className="ml-auto" style={{ width: "min(430px, 100%)" }}>
            <BracketedText />
          </div>
        </div>

        {/* Right column — 002 label + portrait, right-aligned */}
        <div className="flex items-start gap-6 shrink-0 ml-8">
          <p className={mono}>002</p>
          <div
            className="relative shrink-0 overflow-hidden"
            style={{ width: "436px", height: "614px" }}
          >
            <Image
              src={aboutImage}
              alt="Portrait"
              fill
              sizes="436px"
              className="object-cover"
            />
            {/* Black curtain overlay — starts fully covering image */}
            <div
              ref={overlayDRef}
              className="absolute inset-0 bg-black"
              style={{ transformOrigin: "right center", transform: "scaleX(1)" }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
