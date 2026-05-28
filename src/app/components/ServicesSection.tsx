"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const mono =
  "font-[family-name:var(--font-geist-mono)] font-normal text-[14px] text-white leading-[1.1] uppercase";

const desc =
  "font-[family-name:var(--font-inter)] font-normal text-[14px] text-white leading-[1.3] tracking-[-0.04em]";

const services = [
  {
    num: "1",
    title: "Brand Discovery",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "/service-brand.png",
  },
  {
    num: "2",
    title: "Web Design & Dev",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "/service-web.png",
  },
  {
    num: "3",
    title: "Marketing",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "/service-marketing.png",
  },
  {
    num: "4",
    title: "Photography",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "/service-photography.png",
  },
];

function ServiceRow({
  num,
  title,
  description,
  image,
}: {
  num: string;
  title: string;
  description: string;
  image: string;
}) {
  const lineRef   = useRef<HTMLDivElement>(null);
  const titleDRef = useRef<HTMLHeadingElement>(null);
  const titleMRef = useRef<HTMLHeadingElement>(null);
  const imgDRef   = useRef<HTMLDivElement>(null);
  const imgMRef   = useRef<HTMLDivElement>(null);

  const onEnter = () => {
    gsap.killTweensOf([lineRef.current, titleDRef.current, titleMRef.current, imgDRef.current, imgMRef.current]);

    gsap.to(lineRef.current, {
      scaleX: 1,
      transformOrigin: "left center",
      duration: 0.9,
      ease: "power3.out",
    });
    gsap.to([titleDRef.current, titleMRef.current], {
      x: 14,
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to([imgDRef.current, imgMRef.current], {
      scale: 1.08,
      filter: "grayscale(0%) brightness(1.05)",
      duration: 0.9,
      ease: "power2.out",
    });
  };

  const onLeave = () => {
    gsap.killTweensOf([lineRef.current, titleDRef.current, titleMRef.current, imgDRef.current, imgMRef.current]);

    gsap.to(lineRef.current, {
      scaleX: 0,
      transformOrigin: "right center",
      duration: 0.7,
      ease: "power3.inOut",
    });
    gsap.to([titleDRef.current, titleMRef.current], {
      x: 0,
      duration: 0.5,
      ease: "power2.inOut",
    });
    gsap.to([imgDRef.current, imgMRef.current], {
      scale: 1,
      filter: "grayscale(100%) brightness(1)",
      duration: 0.7,
      ease: "power2.inOut",
    });
  };

  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>

      {/* Number + divider */}
      <div className="flex flex-col gap-3 mb-4 md:mb-0">
        <p className={mono}>[ {num} ]</p>

        {/* Line hidden until hover — sweeps left→right, intensity builds toward the right */}
        <div className="relative w-full h-px">
          <div
            ref={lineRef}
            className="absolute inset-0 origin-left"
            style={{
              transform: "scaleX(0)",
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.35) 30%, rgba(255,255,255,0.72) 65%, #ffffff 100%)",
            }}
          />
        </div>
      </div>

      {/* Desktop row: title | description + image */}
      <div className="hidden md:flex items-start pt-4 pb-10">
        <h3
          ref={titleDRef}
          className="font-[family-name:var(--font-inter)] font-bold italic text-white uppercase leading-none tracking-[-0.04em] flex-1"
          style={{ fontSize: "clamp(32px, 2.78vw, 40px)" }}
        >
          {title}
        </h3>
        <div className="flex items-start gap-6 w-[568px] shrink-0">
          <p className={`${desc} w-[393px] shrink-0`}>{description}</p>
          <div className="relative w-[151px] h-[151px] shrink-0 overflow-hidden">
            <div ref={imgDRef} className="absolute inset-0" style={{ filter: "grayscale(100%)" }}>
              <Image src={image} alt={title} fill sizes="151px" className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile stack */}
      <div className="md:hidden pt-3 pb-8">
        <h3
          ref={titleMRef}
          className="font-[family-name:var(--font-inter)] font-bold italic text-white uppercase leading-none tracking-[-0.04em] mb-4"
          style={{ fontSize: "clamp(32px, 8.5vw, 40px)" }}
        >
          {title}
        </h3>
        <p className={`${desc} mb-5`}>{description}</p>
        <div className="relative w-[151px] h-[151px] overflow-hidden">
          <div ref={imgMRef} className="absolute inset-0" style={{ filter: "grayscale(100%)" }}>
            <Image src={image} alt={title} fill sizes="151px" className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section className="bg-black px-4 md:px-8 pt-8 md:pt-12 pb-12 md:pb-20" id="services" data-theme="dark">

      <p className={`${mono} mb-6 md:mb-10`}>[ Services ]</p>

      <div className="flex items-end justify-between mb-8 md:mb-12">
        <p
          className="font-[family-name:var(--font-inter)] font-light text-white leading-none tracking-[-0.04em]"
          style={{ fontSize: "clamp(36px, 8.06vw, 116px)" }}
        >
          [4]
        </p>
        <p
          className="font-[family-name:var(--font-inter)] font-light text-white leading-none tracking-[-0.04em]"
          style={{ fontSize: "clamp(36px, 8.06vw, 116px)" }}
        >
          DELIVERABLES
        </p>
      </div>

      <div className="flex flex-col">
        {services.map(s => (
          <ServiceRow key={s.num} {...s} />
        ))}
      </div>
    </section>
  );
}
