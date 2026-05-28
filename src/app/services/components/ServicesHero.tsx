"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import AnimatedButton from "../../components/AnimatedButton";
import { openContactModal } from "../../components/ContactModal";

const mono = "font-[family-name:var(--font-geist-mono)] font-normal text-[14px] leading-[1.1] uppercase";

const serviceList = [
  { num: "01", name: "Brand Identity" },
  { num: "02", name: "Web Design & Dev" },
  { num: "03", name: "Marketing" },
  { num: "04", name: "Photography" },
];

export default function ServicesHero() {
  const labelRef   = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const listRef    = useRef<HTMLUListElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(
        [labelRef.current, headingRef.current, listRef.current, ctaRef.current],
        { y: 32, opacity: 0, duration: 0.9, stagger: 0.11, ease: "power3.out", delay: 0.15 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="min-h-screen bg-black flex flex-col px-4 md:px-8 pt-36 pb-14 md:pt-44 md:pb-20"
      data-theme="dark"
      id="services-hero"
    >
      <div className="flex-1 flex flex-col justify-between gap-14 md:gap-0">

        {/* Top */}
        <div>
          <p ref={labelRef} className={`${mono} text-white/50 mb-10 md:mb-14`}>[ Services ] — 004</p>
          <h1
            ref={headingRef}
            className="font-[family-name:var(--font-inter)] font-light text-white uppercase leading-[0.88] tracking-[-0.04em]"
            style={{ fontSize: "clamp(68px, 11vw, 168px)" }}
          >
            What<br />I Do
          </h1>
        </div>

        {/* Bottom: service list + CTA */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <ul ref={listRef} className="flex flex-col w-full md:max-w-[520px]">
            {serviceList.map(({ num, name }) => (
              <li
                key={num}
                className="border-t border-white/12 py-4 flex items-center justify-between"
              >
                <span className="font-[family-name:var(--font-inter)] font-normal text-white leading-none tracking-[-0.03em]"
                  style={{ fontSize: "clamp(17px, 1.8vw, 22px)" }}
                >
                  {name}
                </span>
                <span className={`${mono} text-white/25`}>{num}</span>
              </li>
            ))}
            <li className="border-t border-white/12" />
          </ul>

          <div ref={ctaRef} className="shrink-0">
            <AnimatedButton variant="light" onClick={openContactModal}>Let&apos;s talk</AnimatedButton>
          </div>
        </div>

      </div>
    </section>
  );
}
