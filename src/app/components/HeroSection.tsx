"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "./AnimatedButton";
import { openContactModal } from "./ContactModal";

const heroImage = "/hero-bg.png";
const nameClass  = "font-[family-name:var(--font-inter)] font-medium text-white mix-blend-overlay capitalize";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);

  // Desktop
  const dLabelRef   = useRef<HTMLParagraphElement>(null);
  const dHarveyRef  = useRef<HTMLSpanElement>(null);
  const dSpecterRef = useRef<HTMLSpanElement>(null);

  // Mobile
  const mLabelRef   = useRef<HTMLParagraphElement>(null);
  const mHarveyRef  = useRef<HTMLSpanElement>(null);
  const mSpecterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      const commonTrigger = () => ({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=350",
        scrub: 1,
      });

      // ── Desktop ──────────────────────────────────────────────────
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({ scrollTrigger: commonTrigger() });

        tl.to([dHarveyRef.current, dLabelRef.current],
              { x: "-120vw", ease: "none" }, 0)
          .to(dSpecterRef.current,
              { x: "120vw",  ease: "none" }, 0)
          .to(bgRef.current,
              { scale: 1.22, ease: "none" }, 0);
      });

      // ── Mobile ───────────────────────────────────────────────────
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({ scrollTrigger: commonTrigger() });

        tl.to([mHarveyRef.current, mLabelRef.current],
              { x: "-120vw", ease: "none" }, 0)
          .to(mSpecterRef.current,
              { x: "120vw",  ease: "none" }, 0)
          .to(bgRef.current,
              { scale: 1.22, ease: "none" }, 0);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen min-h-[600px] bg-[#c8cdd0] overflow-hidden"
    >
      {/* Background — scaled by GSAP on scroll */}
      <div ref={bgRef} className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Harvey Specter"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[280px] backdrop-blur-[3.45px]"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 70%)",
            maskImage:        "linear-gradient(to bottom, transparent 0%, black 70%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative flex h-full flex-col px-4 md:px-8">

        {/* ── MOBILE ────────────────────────────────────────────── */}
        <div className="md:hidden flex-1 flex flex-col items-center justify-end gap-10 pb-6">

          {/* Label + name — these fly off screen */}
          <div className="flex flex-col items-center w-full">
            <p
              ref={mLabelRef}
              className="font-[family-name:var(--font-geist-mono)] text-sm uppercase text-white mix-blend-overlay leading-[1.1] mb-1"
            >
              [ Hello i&apos;m ]
            </p>
            <div
              className={`text-center w-full ${nameClass}`}
              style={{ fontSize: "clamp(56px, 25.6vw, 96px)", lineHeight: 0.8, letterSpacing: "-0.07em" }}
            >
              <span ref={mHarveyRef}  className="block">Harvey</span>
              <span ref={mSpecterRef} className="block">Specter</span>
            </div>
          </div>

          {/* Description + CTA — stays in place */}
          <div className="flex flex-col items-start gap-[17px] w-[293px]">
            <p className="font-[family-name:var(--font-inter)] text-sm tracking-[-0.04em] text-[#1f1f1f] uppercase leading-[1.1] text-left">
              <strong>H.Studio is a </strong>
              <em className="font-normal">full-service</em>
              <strong> creative studio creating beautiful digital experiences and products. We are an </strong>
              <em className="font-normal">award winning</em>
              <strong> design and art group specializing in branding, web design and engineering.</strong>
            </p>
            <AnimatedButton onClick={openContactModal}>Let&apos;s talk</AnimatedButton>
          </div>
        </div>

        {/* ── DESKTOP ───────────────────────────────────────────── */}
        <div className="hidden md:flex flex-1 flex-col justify-end pb-0">

          {/* Label — flies left with Harvey */}
          <p
            ref={dLabelRef}
            className="font-[family-name:var(--font-geist-mono)] text-sm uppercase text-white mix-blend-overlay leading-[1.1] text-left mb-1"
          >
            [ Hello i&apos;m ]
          </p>

          {/* Harvey ←  · · ·  → Specter */}
          <p
            className={`text-left ${nameClass} whitespace-pre`}
            style={{ fontSize: "13.75vw", lineHeight: 1.1, letterSpacing: "-0.07em" }}
          >
            <span ref={dHarveyRef}  className="inline-block">Harvey</span>
            {'   '}
            <span ref={dSpecterRef} className="inline-block">Specter</span>
          </p>

          {/* Description + CTA — stays in place */}
          <div className="flex justify-end pb-8 mt-16">
            <div className="flex flex-col gap-4 max-w-[294px]">
              <p className="font-[family-name:var(--font-inter)] text-sm tracking-[-0.04em] text-[#1f1f1f] uppercase leading-[1.1]">
                <strong>H.Studio is a </strong>
                <em className="font-normal">full-service</em>
                <strong> creative studio creating beautiful digital experiences and products. We are an </strong>
                <em className="font-normal">award winning</em>
                <strong> design and art group specializing in branding, web design and engineering.</strong>
              </p>
              <AnimatedButton className="self-start" onClick={openContactModal}>Let&apos;s talk</AnimatedButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
