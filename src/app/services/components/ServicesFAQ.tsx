"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import AnimatedButton from "../../components/AnimatedButton";
import { openContactModal } from "../../components/ContactModal";

const mono = "font-[family-name:var(--font-geist-mono)] font-normal text-[14px] leading-[1.1] uppercase";

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Project timelines vary by scope. A brand identity takes 3–5 weeks, a full website typically 6–10 weeks. I provide a detailed timeline during our initial call so there are no surprises.",
  },
  {
    q: "Do you work with startups and early-stage businesses?",
    a: "Absolutely — some of my favourite projects have been building identities and websites for founders just getting started. Early investment in strong visual foundations pays dividends long-term.",
  },
  {
    q: "What does your process look like?",
    a: "Discovery → Strategy → Creation → Delivery. We start with a thorough brief, I propose a creative direction, we iterate through design rounds with your feedback, and I deliver all files with full documentation.",
  },
  {
    q: "Do you offer revisions?",
    a: "Yes — all projects include a defined number of revision rounds. Structured revision cycles produce better outcomes than open-ended ones, keeping the work focused and the project on schedule.",
  },
  {
    q: "Can you work with an existing brand?",
    a: "Definitely. Whether it's a refresh, an extension of an existing system, or a new website for an established brand, I'm comfortable working within constraints and evolving what's already there.",
  },
  {
    q: "How do we get started?",
    a: "Hit the 'Let's talk' button anywhere on this page. We'll set up a short discovery call, and I'll follow up with a proposal and timeline within 48 hours.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const bodyRef  = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  const toggle = () => {
    const next = !open;
    setOpen(next);

    if (next) {
      gsap.set(bodyRef.current, { height: "auto", opacity: 1 });
      gsap.from(bodyRef.current, { height: 0, opacity: 0, duration: 0.38, ease: "power3.out" });
      gsap.to(arrowRef.current, { rotate: 45, duration: 0.3, ease: "power2.inOut" });
    } else {
      gsap.to(bodyRef.current, { height: 0, opacity: 0, duration: 0.32, ease: "power3.in" });
      gsap.to(arrowRef.current, { rotate: 0, duration: 0.3, ease: "power2.inOut" });
    }
  };

  return (
    <div className="border-t border-black/12">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between gap-6 py-6 text-left cursor-pointer group"
        aria-expanded={open}
      >
        <span
          className="font-[family-name:var(--font-inter)] font-normal text-black leading-[1.2] tracking-[-0.03em] group-hover:opacity-60 transition-opacity"
          style={{ fontSize: "clamp(16px, 1.6vw, 20px)" }}
        >
          {q}
        </span>
        <svg
          ref={arrowRef}
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          className="shrink-0 text-black"
        >
          <path d="M9 1V17M1 9H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <div ref={bodyRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <p className="font-[family-name:var(--font-inter)] font-normal text-[14px] text-[#555] leading-[1.6] tracking-[-0.02em] pb-7 max-w-[640px]">
          {a}
        </p>
      </div>
    </div>
  );
}

export default function ServicesFAQ() {
  return (
    <section className="bg-[#f3f3f3] px-4 md:px-8 pt-8 md:pt-14 pb-16 md:pb-24" id="faq">

      <p className={`${mono} text-black mb-10 md:mb-16`}>[ FAQ ]</p>

      {/* ── Desktop: side-by-side ── */}
      <div className="hidden md:flex items-start gap-20">

        {/* Left: heading + CTA */}
        <div className="w-[340px] shrink-0 flex flex-col gap-10 sticky top-28">
          <h2
            className="font-[family-name:var(--font-inter)] font-light text-black uppercase leading-[0.9] tracking-[-0.04em]"
            style={{ fontSize: "clamp(44px, 5vw, 72px)" }}
          >
            Common<br />Questions
          </h2>
          <p className="font-[family-name:var(--font-inter)] font-normal text-[14px] text-[#555] leading-[1.5] tracking-[-0.02em]">
            Anything else on your mind? Reach out directly — I reply to every message.
          </p>
          <AnimatedButton className="self-start" onClick={openContactModal}>Let&apos;s talk</AnimatedButton>
        </div>

        {/* Right: accordion */}
        <div className="flex-1 flex flex-col">
          {faqs.map((item) => (
            <FAQItem key={item.q} {...item} />
          ))}
          <div className="border-t border-black/12" />
        </div>

      </div>

      {/* ── Mobile: stacked ── */}
      <div className="md:hidden flex flex-col gap-12">
        <h2
          className="font-[family-name:var(--font-inter)] font-light text-black uppercase leading-[0.9] tracking-[-0.04em]"
          style={{ fontSize: "clamp(40px, 11vw, 52px)" }}
        >
          Common<br />Questions
        </h2>

        <div className="flex flex-col">
          {faqs.map((item) => (
            <FAQItem key={item.q} {...item} />
          ))}
          <div className="border-t border-black/12" />
        </div>

        <div className="flex flex-col gap-4">
          <p className="font-[family-name:var(--font-inter)] font-normal text-[14px] text-[#555] leading-[1.5] tracking-[-0.02em]">
            Anything else? Reach out directly — I reply to every message.
          </p>
          <AnimatedButton className="self-start" onClick={openContactModal}>Let&apos;s talk</AnimatedButton>
        </div>
      </div>

    </section>
  );
}
