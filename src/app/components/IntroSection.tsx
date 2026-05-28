"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const bigText =
  "font-[family-name:var(--font-inter)] font-light text-black uppercase leading-[0.84] whitespace-nowrap tracking-[-0.08em]";

const monoLabel =
  "font-[family-name:var(--font-geist-mono)] font-normal text-[14px] text-[#1f1f1f] leading-[1.1] uppercase";

const GRAY = "#b8b8b8";

export default function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll<HTMLElement>("[data-scrub]");
    const allWords: HTMLElement[] = [];

    targets.forEach(el => {
      // Elements with child tags (em etc.) — animate whole element
      if (el.children.length > 0) {
        gsap.set(el, { color: GRAY });
        allWords.push(el);
        return;
      }
      // Plain text — split into word spans
      const words = (el.textContent || "").split(" ").filter(Boolean);
      el.innerHTML = words
        .map(w => `<span class="gsap-word" style="display:inline-block">${w}</span>`)
        .join(" ");
      el.querySelectorAll<HTMLElement>(".gsap-word").forEach(span => {
        gsap.set(span, { color: GRAY });
        allWords.push(span);
      });
    });

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "bottom 35%",
          scrub: 1.5,
        },
      }).to(allWords, {
        color: "#000000",
        stagger: { amount: 1.2, ease: "none" },
        ease: "none",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white px-4 md:px-8 py-12 md:py-[120px]">

      {/* Label + divider */}
      <div className="flex flex-col gap-3 items-end w-full mb-6 md:mb-8">
        <p className={monoLabel}>[ 8+ years in industry ]</p>
        <div className="w-full h-px bg-black/20" />
      </div>

      {/* Text stack */}
      <div
        className="flex flex-col items-center md:items-start gap-2"
        style={{ fontSize: "clamp(32px, 6.67vw, 96px)" }}
      >

        {/* Line 1 — mobile */}
        <div className="flex flex-col items-center gap-1 md:hidden">
          <p className={monoLabel}>001</p>
          <p data-scrub className={bigText}>A creative director&nbsp;&nbsp;&nbsp;/</p>
        </div>

        {/* Line 1 — desktop */}
        <div className="hidden md:flex items-start gap-2">
          <p data-scrub className={bigText}>A creative director&nbsp;&nbsp;&nbsp;/</p>
          <p className={`${monoLabel} mt-[6px]`}>001</p>
        </div>

        {/* Line 2 */}
        <div className="md:pl-[15.6%]">
          <p data-scrub className={bigText}>Photographer</p>
        </div>

        {/* Line 3 — has em child, animated as whole */}
        <div className="md:pl-[44.3%]">
          <p data-scrub className={bigText}>
            Born{" "}
            <em
              className="font-[family-name:var(--font-playfair)] not-italic italic font-normal"
              style={{ fontVariationSettings: "'opsz' 12, 'wdth' 100" }}
            >
              &amp;
            </em>{" "}
            raised
          </p>
        </div>

        {/* Line 4 */}
        <div>
          <p data-scrub className={bigText}>On the south side</p>
        </div>

        {/* Line 5 */}
        <div className="md:pl-[44.1%]">
          <p data-scrub className={bigText}>Of chicago.</p>
        </div>

        <p className={`${monoLabel} mt-2 self-center md:self-end`}>[ creative freelancer ]</p>
      </div>
    </section>
  );
}
