"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import AnimatedButton from "./AnimatedButton";

const inter = "font-[family-name:var(--font-inter)]";
const mono  = "font-[family-name:var(--font-geist-mono)] font-normal text-[14px] leading-[1.1] uppercase";

export function openContactModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-contact-modal"));
  }
}

const projectTypes = ["Brand Identity", "Web Design & Dev", "Marketing", "Photography", "Other"];

export default function ContactModal() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef   = useRef<HTMLDivElement>(null);
  const tlRef      = useRef<gsap.core.Timeline | null>(null);
  const isOpenRef  = useRef(false);

  const [projectType, setProjectType] = useState("");
  const [status, setStatus]           = useState<"idle" | "sending" | "sent">("idle");

  // Build the open/close timeline once on mount
  useEffect(() => {
    const overlay = overlayRef.current;
    const panel   = panelRef.current;
    if (!overlay || !panel) return;

    gsap.set(overlay, { autoAlpha: 0 });
    gsap.set(panel,   { autoAlpha: 0, scale: 0.97, y: 20 });

    tlRef.current = gsap.timeline({ paused: true })
      .to(overlay, { autoAlpha: 1,                     duration: 0.3,  ease: "power2.out" })
      .to(panel,   { autoAlpha: 1, scale: 1, y: 0,     duration: 0.45, ease: "power3.out" }, "-=0.15");

    return () => { tlRef.current?.kill(); };
  }, []);

  const open = () => {
    if (isOpenRef.current) return;
    isOpenRef.current = true;
    document.body.style.overflow = "hidden";
    tlRef.current?.play();
  };

  const close = () => {
    if (!isOpenRef.current) return;
    isOpenRef.current = false;
    document.body.style.overflow = "";
    tlRef.current?.reverse();
  };

  // Listen for the global event dispatched by every "Let's talk" button
  useEffect(() => {
    const onOpen = () => open();
    const onKey  = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("open-contact-modal", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("open-contact-modal", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise(r => setTimeout(r, 1100));
    setStatus("sent");
  };

  const reset = () => {
    setStatus("idle");
    setProjectType("");
    close();
  };

  return (
    /* Backdrop — click anywhere outside the panel to close */
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-[3px]"
      onClick={close}
    >
      {/* Panel — stops click bubbling to backdrop */}
      <div
        ref={panelRef}
        onClick={e => e.stopPropagation()}
        className="absolute inset-0 md:inset-5 lg:inset-7 md:rounded-[3px] bg-[#0c0c0c] flex flex-col overflow-hidden"
        style={{ border: "1px solid rgba(255,255,255,0.06)" }}
      >

        {/* ── Top bar ───────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 md:px-10 py-5 shrink-0 border-b border-white/[0.06]">
          <p className={`${mono} text-white/30`}>[ Get in touch ]</p>
          <button
            onClick={close}
            aria-label="Close"
            className="w-8 h-8 flex items-center justify-center text-white/35 hover:text-white transition-colors duration-200"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M1 1L14 14M14 1L1 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* ── Body ──────────────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col md:flex-row overflow-y-auto">

          {/* Left: info column */}
          <div className="md:w-[36%] lg:w-[32%] px-6 md:px-10 py-8 md:py-12 flex flex-col gap-8 md:border-r border-white/[0.06] shrink-0">
            <h2
              className={`${inter} font-light text-white uppercase leading-[0.88] tracking-[-0.04em]`}
              style={{ fontSize: "clamp(44px, 4.5vw, 68px)" }}
            >
              Let&apos;s<br />Talk
            </h2>

            <p className={`${inter} text-[15px] text-white/45 leading-[1.65] tracking-[-0.02em] max-w-[280px]`}>
              Got a project in mind? Tell me about it — I read every message and reply within 24 hours.
            </p>

            <div className="flex flex-col gap-5 md:mt-auto">
              {[
                { label: "Email",         value: "hello@hstudio.co",   href: "mailto:hello@hstudio.co" },
                { label: "Location",      value: "London, UK",          href: null },
                { label: "Response time", value: "Within 24 hours",     href: null },
              ].map(({ label, value, href }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className={`${mono} text-white/25`}>{label}</span>
                  {href
                    ? <a href={href} className={`${inter} text-white text-[15px] tracking-[-0.02em] hover:opacity-60 transition-opacity`}>{value}</a>
                    : <span className={`${inter} text-white text-[15px] tracking-[-0.02em]`}>{value}</span>
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="flex-1 px-6 md:px-10 py-8 md:py-12">
            {status === "sent" ? (
              /* ── Success state ── */
              <div className="flex flex-col gap-6 h-full justify-center min-h-[280px]">
                <p className={`${mono} text-white/30`}>[ Message sent ]</p>
                <h3
                  className={`${inter} font-light text-white uppercase leading-[0.9] tracking-[-0.04em]`}
                  style={{ fontSize: "clamp(34px, 3.8vw, 56px)" }}
                >
                  Thank you.<br />I&apos;ll be in<br />touch soon.
                </h3>
                <button
                  onClick={reset}
                  className={`${inter} text-white/35 text-[14px] tracking-[-0.02em] hover:text-white transition-colors self-start mt-2`}
                >
                  Close ↗
                </button>
              </div>
            ) : (
              /* ── Form ── */
              <form onSubmit={handleSubmit} className="flex flex-col gap-8 h-full">

                {/* Name + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <label className="flex flex-col gap-3">
                    <span className={`${mono} text-white/30`}>Your name</span>
                    <input
                      required
                      type="text"
                      name="name"
                      autoComplete="name"
                      placeholder="Harvey Specter"
                      className={`${inter} bg-transparent border-b border-white/15 focus:border-white/50 text-white placeholder:text-white/20 text-[16px] tracking-[-0.02em] py-2.5 outline-none transition-colors duration-200`}
                    />
                  </label>
                  <label className="flex flex-col gap-3">
                    <span className={`${mono} text-white/30`}>Email address</span>
                    <input
                      required
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      className={`${inter} bg-transparent border-b border-white/15 focus:border-white/50 text-white placeholder:text-white/20 text-[16px] tracking-[-0.02em] py-2.5 outline-none transition-colors duration-200`}
                    />
                  </label>
                </div>

                {/* Project type */}
                <div className="flex flex-col gap-3">
                  <span className={`${mono} text-white/30`}>Project type</span>
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setProjectType(prev => prev === t ? "" : t)}
                        className={`${inter} text-[13px] tracking-[-0.02em] px-4 py-2 rounded-full border transition-all duration-200 ${
                          projectType === t
                            ? "border-white bg-white text-black"
                            : "border-white/15 text-white/40 hover:border-white/40 hover:text-white/80"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <label className="flex flex-col gap-3 flex-1">
                  <span className={`${mono} text-white/30`}>Message</span>
                  <textarea
                    required
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project, timeline, and goals…"
                    className={`${inter} bg-transparent border-b border-white/15 focus:border-white/50 text-white placeholder:text-white/20 text-[16px] tracking-[-0.02em] py-2.5 outline-none transition-colors duration-200 resize-none`}
                  />
                </label>

                {/* Submit */}
                <div className="mt-auto pt-2">
                  <AnimatedButton
                    type="submit"
                    variant="light"
                    className="px-7 py-3.5 text-[14px]"
                  >
                    {status === "sending" ? "Sending…" : "Send message →"}
                  </AnimatedButton>
                </div>

              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
