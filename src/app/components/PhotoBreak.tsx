"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PhotoBreak() {
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      [desktopRef, mobileRef].forEach(ref => {
        if (!ref.current) return;
        gsap.fromTo(
          ref.current,
          { filter: "blur(18px)" },
          {
            filter: "blur(0px)",
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",   // begins animating as image enters viewport
              end:   "center center", // fully sharp when image centre hits viewport centre
              scrub: 1.2,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section data-theme="dark">
      {/* Desktop */}
      <div ref={desktopRef} className="hidden md:block relative w-full h-[900px]">
        <Image
          src="/photo-break-desktop.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Mobile */}
      <div ref={mobileRef} className="md:hidden relative w-full" style={{ aspectRatio: "375/565" }}>
        <Image
          src="/photo-break-mobile.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
