"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const mono = "font-[family-name:var(--font-geist-mono)] font-normal text-[14px] leading-[1.1] uppercase";

const services = [
  {
    num: "01",
    title: "Brand Identity",
    image: "/service-brand.png",
    description:
      "A brand is more than a logo — it's the entire visual and emotional language of your business. I craft complete identity systems that are distinctive, adaptable, and built to last across every medium.",
    deliverables: [
      "Logo & Mark Design",
      "Typography System",
      "Color Palette",
      "Brand Guidelines",
      "Stationery & Collateral",
      "Icon Design",
    ],
  },
  {
    num: "02",
    title: "Web Design & Dev",
    image: "/service-web.png",
    description:
      "From concept to deployment, I design and build websites that are fast, accessible, and visually compelling. Every interaction is intentional — crafted to create experiences that engage and convert.",
    deliverables: [
      "UI/UX Design",
      "Responsive Development",
      "Motion & Animation",
      "CMS Integration",
      "Performance Optimisation",
      "SEO Foundations",
    ],
  },
  {
    num: "03",
    title: "Marketing",
    image: "/service-marketing.png",
    description:
      "Strategic creative that connects. I develop marketing materials and campaigns that communicate your value clearly — from digital ads to print collateral — always rooted in a coherent brand voice.",
    deliverables: [
      "Campaign Strategy",
      "Social Media Design",
      "Ad Creative",
      "Email Design",
      "Print Collateral",
      "Presentation Design",
    ],
  },
  {
    num: "04",
    title: "Photography",
    image: "/service-photography.png",
    description:
      "Visual storytelling through the lens. I provide art direction and photography services for brands that want imagery as considered and powerful as the rest of their visual identity.",
    deliverables: [
      "Product Photography",
      "Brand Lifestyle Shoots",
      "Art Direction",
      "Image Retouching",
      "Visual Content Strategy",
    ],
  },
];

function ServiceBlock({
  service,
  reverse,
}: {
  service: (typeof services)[0];
  reverse: boolean;
}) {
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(imgWrapRef.current, {
        scale: 1.06,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: imgWrapRef.current, start: "top 84%" },
      });

      gsap.from(textRef.current, {
        x: reverse ? 48 : -48,
        opacity: 0,
        duration: 0.95,
        ease: "power3.out",
        scrollTrigger: { trigger: textRef.current, start: "top 84%" },
      });
    });

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`flex flex-col border-t border-black/10 ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      {/* Image */}
      <div ref={imgWrapRef} className="w-full md:w-[50%] relative overflow-hidden" style={{ minHeight: "380px" }}>
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Text */}
      <div
        ref={textRef}
        className="flex-1 flex flex-col justify-between px-6 py-10 md:px-14 md:py-16 bg-white"
      >
        <div className="flex flex-col gap-6">
          <p className={`${mono} text-black/35`}>{service.num}</p>
          <h2
            className="font-[family-name:var(--font-inter)] font-black italic text-black uppercase leading-none tracking-[-0.03em]"
            style={{ fontSize: "clamp(30px, 3.5vw, 52px)" }}
          >
            {service.title}
          </h2>
          <p className="font-[family-name:var(--font-inter)] font-normal text-[15px] text-[#555] leading-[1.6] tracking-[-0.02em] max-w-[420px]">
            {service.description}
          </p>
        </div>

        <div className="mt-10 md:mt-14">
          <p className={`${mono} text-black/35 mb-4`}>[ Deliverables ]</p>
          <ul className="flex flex-col">
            {service.deliverables.map((item) => (
              <li
                key={item}
                className="border-t border-black/10 py-3 flex items-center justify-between font-[family-name:var(--font-inter)] font-normal text-[14px] text-[#1f1f1f] tracking-[-0.02em]"
              >
                {item}
                <span className="text-black/20 text-[12px]">→</span>
              </li>
            ))}
            <li className="border-t border-black/10" />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function ServicesDetail() {
  return (
    <section className="bg-white" id="services-detail">
      <div className="px-4 md:px-8 pt-10 md:pt-14 pb-6">
        <p className={`${mono} text-black`}>[ Services ]</p>
      </div>
      <div className="flex flex-col">
        {services.map((s, i) => (
          <ServiceBlock key={s.num} service={s} reverse={i % 2 !== 0} />
        ))}
      </div>
    </section>
  );
}
