"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const img1 = "https://www.figma.com/api/mcp/asset/c76d9ba8-7343-4c2d-bd04-f33097f2541d";
const img2 = "/news-eames.jpg";
const img3 = "/news-books.jpg";

const images = [img1, img2, img3];

function ReadMore() {
  return (
    <a href="#" className="flex items-center gap-1.5 border-b border-black pb-0.5 self-start hover:opacity-60 transition-opacity cursor-pointer">
      <span className="font-[family-name:var(--font-inter)] font-medium text-[14px] text-black tracking-[-0.04em] whitespace-nowrap">
        Read more
      </span>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
        <path d="M2 12L12 2M12 2H4M12 2V10" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
  );
}

const bodyText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

function NewsCard({ src, staggerTop }: { src: string; staggerTop?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef  = useRef<HTMLDivElement>(null);

  const onEnter = () => {
    gsap.killTweensOf([cardRef.current, imgRef.current]);
    gsap.to(cardRef.current, { y: -6, scale: 1.02, duration: 0.35, ease: "power2.out" });
    gsap.to(imgRef.current,  { scale: 1.06, duration: 0.7, ease: "power2.out" });
  };

  const onLeave = () => {
    gsap.killTweensOf([cardRef.current, imgRef.current]);
    gsap.to(cardRef.current, { y: 0, scale: 1, duration: 0.4, ease: "power2.inOut" });
    gsap.to(imgRef.current,  { scale: 1, duration: 0.7, ease: "power2.inOut" });
  };

  return (
    <div
      ref={cardRef}
      className={`flex flex-col gap-4 w-[353px] shrink-0 ${staggerTop ? "pt-[120px]" : ""}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="relative w-full h-[469px] overflow-hidden">
        <div ref={imgRef} className="absolute inset-0">
          <Image src={src} alt="" fill className="object-cover" sizes="353px" />
        </div>
      </div>
      <p className="font-[family-name:var(--font-inter)] font-normal text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">{bodyText}</p>
      <ReadMore />
    </div>
  );
}

export default function NewsSection() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) setCurrent((c) => Math.min(c + 1, images.length - 1));
    if (diff < -40) setCurrent((c) => Math.max(c - 1, 0));
    touchStartX.current = null;
  }

  return (
    <section className="bg-[#f3f3f3]" id="news">

      {/* ── Desktop ── */}
      <div className="hidden md:flex items-end justify-between px-8 py-[120px]">
        <div className="relative shrink-0 w-[110px] h-[706px]">
          <p
            className="absolute top-1/2 left-1/2 font-[family-name:var(--font-inter)] font-light text-black uppercase whitespace-pre"
            style={{
              fontSize: "64px",
              letterSpacing: "-0.08em",
              lineHeight: 0.86,
              width: "706px",
              transform: "translate(-50%, -50%) rotate(-90deg)",
              transformOrigin: "center center",
            }}
          >
            {`Keep up with my latest\nNews & achievements`}
          </p>
        </div>

        <div className="flex items-start shrink-0">
          <NewsCard src={img1} />
          <div className="self-stretch w-px bg-black/20 shrink-0 mx-8" />
          <NewsCard src={img2} staggerTop />
          <div className="self-stretch w-px bg-black/20 shrink-0 mx-8" />
          <NewsCard src={img3} />
        </div>
      </div>

      {/* ── Mobile: swipeable carousel ── */}
      <div className="md:hidden px-4 py-12 flex flex-col gap-8">
        <h2
          className="font-[family-name:var(--font-inter)] font-light text-black uppercase"
          style={{ fontSize: "32px", letterSpacing: "-0.08em", lineHeight: 0.86 }}
        >
          Keep up with my latest news &amp; achievements
        </h2>

        <div
          className="overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((src, i) => (
              <div key={i} className="w-full shrink-0 flex flex-col gap-4 pr-4">
                <div className="relative w-full h-[380px] overflow-hidden">
                  <Image src={src} alt="" fill className="object-cover" sizes="100vw" />
                </div>
                <p className="font-[family-name:var(--font-inter)] font-normal text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
                  {bodyText}
                </p>
                <ReadMore />
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
