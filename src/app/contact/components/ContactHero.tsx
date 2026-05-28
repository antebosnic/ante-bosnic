"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

const inter = "font-[family-name:var(--font-inter)]";
const mono  = "font-[family-name:var(--font-geist-mono)] font-normal text-[14px] leading-[1.1] uppercase";

const info = [
  { label: "Email",         value: "hello@hstudio.co",   href: "mailto:hello@hstudio.co" },
  { label: "Based in",      value: "London, UK",          href: null },
  { label: "Availability",  value: "Open for projects",   href: null },
];

export default function ContactHero() {
  const labelRef   = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const infoRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([labelRef.current, headingRef.current, infoRef.current], {
        y: 32,
        opacity: 0,
        duration: 0.9,
        stagger: 0.13,
        ease: "power3.out",
        delay: 0.12,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="min-h-screen bg-black flex flex-col px-4 md:px-8 pt-36 pb-14 md:pt-44 md:pb-16"
      data-theme="dark"
      id="contact-hero"
    >
      <div className="flex-1 flex flex-col justify-between gap-16">

        {/* Top */}
        <div>
          <p ref={labelRef} className={`${mono} text-white/40 mb-10 md:mb-14`}>
            [ Contact ] — 005
          </p>
          <h1
            ref={headingRef}
            className={`${inter} font-light text-white uppercase leading-[0.88] tracking-[-0.04em]`}
            style={{ fontSize: "clamp(72px, 11.5vw, 172px)" }}
          >
            Get in<br />Touch.
          </h1>
        </div>

        {/* Bottom: contact strip */}
        <div
          ref={infoRef}
          className="flex flex-col md:flex-row md:items-end gap-8 md:gap-0 border-t border-white/10 pt-8 md:pt-10"
        >
          {info.map(({ label, value, href }, i) => (
            <div
              key={label}
              className={`flex flex-col gap-2 md:flex-1 ${i > 0 ? "md:border-l md:border-white/10 md:pl-10" : ""}`}
            >
              <span className={`${mono} text-white/25`}>{label}</span>
              {href
                ? <a href={href} className={`${inter} text-white text-[16px] md:text-[18px] tracking-[-0.03em] hover:opacity-60 transition-opacity`}>{value}</a>
                : <span className={`${inter} text-white text-[16px] md:text-[18px] tracking-[-0.03em]`}>{value}</span>
              }
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
