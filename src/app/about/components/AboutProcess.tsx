"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const mono = "font-[family-name:var(--font-geist-mono)] font-normal text-[14px] leading-[1.1] uppercase";

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "Every project starts with a deep-dive conversation. I want to understand your goals, your audience, and the story you want to tell before a single pixel is placed.",
  },
  {
    num: "02",
    title: "Strategy",
    desc: "With a clear understanding of the brief, I map out a creative direction — moodboards, references, and a structured plan that aligns design decisions with business objectives.",
  },
  {
    num: "03",
    title: "Creation",
    desc: "Iterative design and development cycles with regular check-ins so you can see progress and give feedback at every stage. No surprises, just momentum.",
  },
  {
    num: "04",
    title: "Delivery",
    desc: "Final delivery with full documentation, source files, and handoff support. I stay available post-launch to ensure everything runs exactly as intended.",
  },
];

export default function AboutProcess() {
  const stepRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      stepRefs.current.forEach((el) => {
        gsap.from(el, {
          y: 36,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%" },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#f3f3f3] px-4 md:px-8 pt-8 md:pt-12 pb-16 md:pb-24" id="process">

      {/* Header */}
      <p className={`${mono} text-black mb-10 md:mb-14`}>[ Process ]</p>

      <div className="hidden md:flex items-end justify-between mb-14">
        <h2
          className="font-[family-name:var(--font-inter)] font-light text-black uppercase leading-[0.9] tracking-[-0.04em]"
          style={{ fontSize: "clamp(48px, 5.76vw, 83px)" }}
        >
          How I<br />Work
        </h2>
        <p
          className={`${mono} text-black`}
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          [ 4 Steps ]
        </p>
      </div>

      <h2
        className="md:hidden font-[family-name:var(--font-inter)] font-light text-black uppercase leading-[0.9] tracking-[-0.04em] mb-10"
        style={{ fontSize: "clamp(40px, 10.67vw, 48px)" }}
      >
        How I<br />Work
      </h2>

      {/* Steps grid */}
      <div className="grid md:grid-cols-2 gap-0">
        {steps.map((step, i) => (
          <div
            key={step.num}
            ref={el => { if (el) stepRefs.current[i] = el; }}
            className="border-t border-black/15 py-8 md:py-10 md:odd:pr-16 md:even:pl-16"
          >
            <p className={`${mono} text-black/35 mb-5`}>{step.num}</p>
            <h3
              className="font-[family-name:var(--font-inter)] font-black italic text-black uppercase leading-none tracking-[-0.03em] mb-4"
              style={{ fontSize: "clamp(20px, 2.2vw, 30px)" }}
            >
              {step.title}
            </h3>
            <p className="font-[family-name:var(--font-inter)] font-normal text-[14px] text-[#555] leading-[1.6] tracking-[-0.02em]">
              {step.desc}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}
