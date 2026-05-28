"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "../../components/AnimatedButton";

const inter = "font-[family-name:var(--font-inter)]";
const mono  = "font-[family-name:var(--font-geist-mono)] font-normal text-[14px] leading-[1.1] uppercase";

const projectTypes = ["Brand Identity", "Web Design & Dev", "Marketing", "Photography", "Other"];

const socials = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn",  href: "#" },
  { label: "X.com",     href: "#" },
  { label: "Facebook",  href: "#" },
];

function InputField({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="flex flex-col gap-3">
      <span className={`${mono} text-black/40`}>{label}</span>
      <input
        required={required}
        type={type}
        name={name}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={`${inter} bg-transparent border-b border-black/15 focus:border-black/50 text-black placeholder:text-black/25 text-[16px] tracking-[-0.02em] py-2.5 outline-none transition-colors duration-200`}
      />
    </label>
  );
}

export default function ContactFormSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);

  const [projectType, setProjectType] = useState("");
  const [status, setStatus]           = useState<"idle" | "sending" | "sent">("idle");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -30, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      });
      gsap.from(rightRef.current, {
        x: 30, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      });
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise(r => setTimeout(r, 1100));
    setStatus("sent");
  };

  return (
    <section
      ref={sectionRef}
      className="bg-white px-4 md:px-8 pt-16 md:pt-24 pb-20 md:pb-32"
      id="contact-form"
    >
      <p className={`${mono} text-black/40 mb-12 md:mb-16`}>[ New Project ]</p>

      <div className="flex flex-col md:flex-row gap-16 md:gap-20">

        {/* ── Left: heading + socials ─────────────────────────────── */}
        <div ref={leftRef} className="md:w-[38%] shrink-0 flex flex-col gap-12 md:sticky md:top-28 md:self-start">
          <h2
            className={`${inter} font-light text-black uppercase leading-[0.88] tracking-[-0.04em]`}
            style={{ fontSize: "clamp(44px, 5vw, 76px)" }}
          >
            Start a<br />conversation.
          </h2>

          <p className={`${inter} text-[15px] text-[#555] leading-[1.6] tracking-[-0.02em] max-w-[300px]`}>
            Whether you have a brief, a rough idea, or just a question — reach out. Every great project starts with a conversation.
          </p>

          <div className="flex flex-col gap-4">
            <p className={`${mono} text-black/30 mb-1`}>Follow the work</p>
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                className={`${inter} text-black text-[15px] tracking-[-0.02em] flex items-center gap-3 group hover:opacity-50 transition-opacity`}
              >
                <span className="inline-block w-4 h-px bg-black/25 group-hover:w-8 transition-all duration-300" />
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* ── Right: form ─────────────────────────────────────────── */}
        <div ref={rightRef} className="flex-1">
          {status === "sent" ? (
            <div className="flex flex-col gap-8 min-h-[400px] justify-center">
              <p className={`${mono} text-black/35`}>[ Message sent ]</p>
              <h3
                className={`${inter} font-light text-black uppercase leading-[0.9] tracking-[-0.04em]`}
                style={{ fontSize: "clamp(38px, 4.5vw, 64px)" }}
              >
                Thank you.<br />I&apos;ll be in<br />touch soon.
              </h3>
              <button
                onClick={() => { setStatus("idle"); setProjectType(""); }}
                className={`${inter} text-black/35 text-[14px] tracking-[-0.02em] hover:text-black transition-colors self-start`}
              >
                Send another message ↗
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">

              {/* Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <InputField label="Your name"      name="name"    placeholder="Harvey Specter"  required autoComplete="name" />
                <InputField label="Email address"  name="email"   placeholder="you@example.com" required type="email" autoComplete="email" />
              </div>

              {/* Company (optional) */}
              <InputField label="Company (optional)" name="company" placeholder="Pearson Hardman" autoComplete="organization" />

              {/* Project type */}
              <div className="flex flex-col gap-4">
                <span className={`${mono} text-black/40`}>Project type</span>
                <div className="flex flex-wrap gap-2">
                  {projectTypes.map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setProjectType(prev => prev === t ? "" : t)}
                      className={`${inter} text-[13px] tracking-[-0.02em] px-4 py-2 rounded-full border transition-all duration-200 ${
                        projectType === t
                          ? "border-black bg-black text-white"
                          : "border-black/15 text-black/45 hover:border-black/45 hover:text-black/80"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <label className="flex flex-col gap-3">
                <span className={`${mono} text-black/40`}>Message</span>
                <textarea
                  required
                  name="message"
                  rows={6}
                  placeholder="Tell me about your project, timeline, and goals…"
                  className={`${inter} bg-transparent border-b border-black/15 focus:border-black/50 text-black placeholder:text-black/25 text-[16px] tracking-[-0.02em] py-2.5 outline-none transition-colors duration-200 resize-none`}
                />
              </label>

              {/* Submit */}
              <div className="pt-2">
                <AnimatedButton type="submit" className="px-7 py-3.5 text-[14px]">
                  {status === "sending" ? "Sending…" : "Send message →"}
                </AnimatedButton>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
}
