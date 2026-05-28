"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function LogoCircle() {
  return (
    <div className="flex items-center gap-2">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7" stroke="#aaa" strokeWidth="1.2"/>
        <circle cx="8" cy="8" r="4" stroke="#aaa" strokeWidth="1.2"/>
        <circle cx="8" cy="8" r="1.5" fill="#aaa"/>
      </svg>
      <span className="text-[13px] text-neutral-400 font-[family-name:var(--font-inter)] tracking-wider uppercase">Logoipsum</span>
    </div>
  );
}
function LogoStar() {
  return (
    <div className="flex items-center gap-2">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1l1.8 4h4.2l-3.4 2.5 1.3 4L8 9l-3.9 2.5 1.3-4L2 5h4.2z" stroke="#aaa" strokeWidth="1" fill="none"/>
      </svg>
      <span className="text-[13px] text-neutral-400 font-[family-name:var(--font-inter)] tracking-wider uppercase">Logoipsum</span>
    </div>
  );
}
function LogoShield() {
  return (
    <div className="flex items-start gap-2">
      <svg width="16" height="19" viewBox="0 0 16 19" fill="none" className="mt-0.5 shrink-0">
        <path d="M8 1L1 4V9C1 14 4.5 17.5 8 18.5C11.5 17.5 15 14 15 9V4z" stroke="#aaa" strokeWidth="1" fill="none"/>
      </svg>
      <span className="text-[13px] text-neutral-400 font-[family-name:var(--font-inter)] leading-tight">Logoipsum<br/>University</span>
    </div>
  );
}
function LogoScript() {
  return (
    <span className="text-[16px] text-neutral-400 font-[family-name:var(--font-playfair)] italic">logoipsum</span>
  );
}

function Card({ logo, quote, name }: { logo: React.ReactNode; quote: string; name: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onEnter = () => {
    gsap.killTweensOf(cardRef.current);
    gsap.to(cardRef.current, { y: -6, scale: 1.02, duration: 0.35, ease: "power2.out" });
  };

  const onLeave = () => {
    gsap.killTweensOf(cardRef.current);
    gsap.to(cardRef.current, { y: 0, scale: 1, duration: 0.4, ease: "power2.inOut" });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="bg-[#f1f1f1] border border-[#ddd] flex flex-col gap-4 p-6 rounded-[4px] w-[353px] cursor-default"
    >
      <div>{logo}</div>
      <p className="font-[family-name:var(--font-inter)] font-normal text-[18px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
        {quote}
      </p>
      <p className="font-[family-name:var(--font-inter)] font-black text-[16px] text-black leading-[1.1] tracking-[-0.04em] uppercase whitespace-nowrap">
        {name}
      </p>
    </div>
  );
}

const testimonials = [
  {
    logo: <LogoCircle />,
    quote: "A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.",
    name: "Marko Stojković",
  },
  {
    logo: <LogoStar />,
    quote: "Professional, precise, and incredibly fast at handling complex product visualizations and templates.",
    name: "Lukas Weber",
  },
  {
    logo: <LogoShield />,
    quote: "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good; they solve business problems through visual clarity.",
    name: "Sarah Jenkins",
  },
  {
    logo: <LogoScript />,
    quote: "An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.",
    name: "Sofia Martínez",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const lukasRef   = useRef<HTMLDivElement>(null);
  const markoRef   = useRef<HTMLDivElement>(null);
  const sarahRef   = useRef<HTMLDivElement>(null);
  const sofiaRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!window.matchMedia("(min-width: 768px)").matches) return;

      const trigger = {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      };

      // Each card drifts at a different rate — layered depth illusion
      gsap.to(markoRef.current, { y: -90,  ease: "none", scrollTrigger: trigger });
      gsap.to(lukasRef.current, { y: -45,  ease: "none", scrollTrigger: trigger });
      gsap.to(sarahRef.current, { y: -20,  ease: "none", scrollTrigger: trigger });
      gsap.to(sofiaRef.current, { y: -65,  ease: "none", scrollTrigger: trigger });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-white" id="testimonials">

      {/* ── Mobile: carousel ── */}
      <div className="md:hidden flex flex-col items-center px-4 pt-12 pb-10 gap-8">
        <h2
          className="font-[family-name:var(--font-inter)] font-medium text-black text-center leading-[1.1] capitalize"
          style={{ fontSize: "clamp(48px, 13vw, 72px)", letterSpacing: "-0.04em" }}
        >
          Testimonials
        </h2>

        {/* Card with slight rotation */}
        <div style={{ transform: "rotate(2deg)" }}>
          <Card
            logo={testimonials[current].logo}
            quote={testimonials[current].quote}
            name={testimonials[current].name}
          />
        </div>

        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`rounded-full transition-all duration-200 ${
                i === current ? "w-5 h-[6px] bg-black" : "w-[6px] h-[6px] bg-neutral-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Desktop: scattered cards ── */}
      <div
        ref={sectionRef}
        className="hidden md:flex flex-col items-center justify-center relative px-8 py-[120px]"
        style={{ height: "987px" }}
      >
        {/* Lukas */}
        <div ref={lukasRef} className="absolute" style={{ left: "calc(50% - 70px)", top: "270px", transform: "rotate(2.9deg)" }}>
          <Card logo={<LogoStar />} name="Lukas Weber"
            quote="Professional, precise, and incredibly fast at handling complex product visualizations and templates." />
        </div>

        {/* Marko */}
        <div ref={markoRef} className="absolute" style={{ left: "calc(50% - 618px)", top: "175px", transform: "rotate(-6.85deg)" }}>
          <Card logo={<LogoCircle />} name="Marko Stojković"
            quote="A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive." />
        </div>

        {/* Sarah */}
        <div ref={sarahRef} className="absolute" style={{ left: "calc(50% - 415px)", top: "575px", transform: "rotate(2.23deg)" }}>
          <Card logo={<LogoShield />} name="Sarah Jenkins"
            quote="A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good; they solve business problems through visual clarity." />
        </div>

        {/* Sofia */}
        <div ref={sofiaRef} className="absolute" style={{ left: "calc(50% + 265px)", top: "590px", transform: "rotate(-4.15deg)" }}>
          <Card logo={<LogoScript />} name="Sofia Martínez"
            quote="An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats." />
        </div>

        {/* Heading on top */}
        <h2
          className="relative font-[family-name:var(--font-inter)] font-medium text-black text-center leading-[1.1] whitespace-nowrap capitalize"
          style={{ fontSize: "198px", letterSpacing: "-0.07em" }}
        >
          Testimonials
        </h2>
      </div>

    </section>
  );
}
