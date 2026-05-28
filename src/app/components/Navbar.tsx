"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "./AnimatedButton";
import { openContactModal } from "./ContactModal";

const navLinks = [
  { label: "About",    href: "/about"    },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "News",     href: "/news"     },
  { label: "Contact",  href: "/contact"  },
];

export default function Navbar() {
  const logoRef     = useRef<HTMLSpanElement>(null);
  const menuRef     = useRef<HTMLDivElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const linksRef    = useRef<HTMLLIElement[]>([]);
  const linkAnchors = useRef<HTMLAnchorElement[]>([]);
  const navCtaWrap  = useRef<HTMLDivElement>(null);
  const mobileCta   = useRef<HTMLDivElement>(null);
  const bar1 = useRef<HTMLSpanElement>(null);
  const bar2 = useRef<HTMLSpanElement>(null);
  const bar3 = useRef<HTMLSpanElement>(null);
  const isOpen     = useRef(false);
  const menuTl     = useRef<gsap.core.Timeline | null>(null);
  const activeTheme = useRef<"light" | "dark" | null>(null); // prevents redundant tweens

  // ── Theme switcher ────────────────────────────────────────────────
  // light = navbar is over a dark section  →  everything turns white
  // dark  = navbar is over a light section →  everything turns black
  const applyTheme = useCallback((theme: "light" | "dark") => {
    if (activeTheme.current === theme) return;
    activeTheme.current = theme;

    const isLight = theme === "light";
    const col     = isLight ? "#ffffff" : "#000000";
    const bars    = [bar1.current, bar2.current, bar3.current].filter(Boolean);

    gsap.to(logoRef.current,         { color: col,             duration: 0.3, ease: "power2.inOut" });
    gsap.to(bars,                    { backgroundColor: col,   duration: 0.3, ease: "power2.inOut" });
    gsap.to(linkAnchors.current,     { color: col,             duration: 0.3, ease: "power2.inOut" });

    linkAnchors.current.forEach(a => {
      const line = a.querySelector(".nav-line") as HTMLElement | null;
      if (line) gsap.to(line, { backgroundColor: col, duration: 0.3, ease: "power2.inOut" });
    });

    // CTA button: solid fill that swaps black ↔ white
    const btn = navCtaWrap.current?.querySelector("button") as HTMLButtonElement | null;
    if (btn) {
      const btnBg        = isLight ? "#ffffff" : "#000000";
      const btnTextColor = isLight ? "#000000" : "#ffffff";
      const btnHoverText = isLight ? "#ffffff" : "#000000";
      // Wipe must be the inverse of the button background so it's always visible
      const btnWipeBg    = isLight ? "#000000" : "#ffffff";

      // Store effective colors so AnimatedButton.onEnter/onLeave read them correctly
      btn.dataset.textBase  = btnTextColor;
      btn.dataset.textHover = btnHoverText;

      gsap.to(btn, { backgroundColor: btnBg, borderColor: btnBg, duration: 0.3, ease: "power2.inOut" });

      const label = btn.querySelector("span:last-child") as HTMLElement | null;
      if (label) gsap.to(label, { color: btnTextColor, duration: 0.3, ease: "power2.inOut" });

      const wipe = btn.querySelector("span:first-child") as HTMLElement | null;
      if (wipe) gsap.set(wipe, { backgroundColor: btnWipeBg });
    }
  }, []);

  // ── ScrollTrigger: check dark-section overlap on every tick ───────
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Start black — page opens over the hero (no dark-theme marker)
    applyTheme("dark");

    const NAV_HEIGHT = 80; // px — covers the fixed nav bar area

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: () => {
        const darkEls = document.querySelectorAll<HTMLElement>('[data-theme="dark"]');
        let overDark = false;
        darkEls.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.top < NAV_HEIGHT && rect.bottom > 0) overDark = true;
        });
        applyTheme(overDark ? "light" : "dark");
      },
    });

    return () => trigger.kill();
  }, [applyTheme]);

  // ── Mobile menu setup ─────────────────────────────────────────────
  useEffect(() => {
    const menu    = menuRef.current;
    const overlay = overlayRef.current;
    if (!menu || !overlay) return;

    gsap.set(menu,              { xPercent: 100, display: "flex" });
    gsap.set(overlay,           { autoAlpha: 0,  display: "block" });
    gsap.set(linksRef.current,  { x: 48, autoAlpha: 0 });
    gsap.set(mobileCta.current, { y: 20, autoAlpha: 0 });

    menuTl.current = gsap.timeline({ paused: true })
      .to(overlay, { autoAlpha: 0.45, duration: 0.3, ease: "power2.out" })
      .to(menu,    { xPercent: 0,     duration: 0.45, ease: "power3.out" }, "<")
      .to(linksRef.current,  { x: 0, autoAlpha: 1, duration: 0.38, stagger: 0.065, ease: "power2.out" }, "-=0.18")
      .to(mobileCta.current, { y: 0, autoAlpha: 1, duration: 0.3,  ease: "power2.out" }, "-=0.12");
  }, []);

  // ── Creative hamburger: pinch-collapse → snap-to-X ───────────────
  const animateHamburger = useCallback((opening: boolean) => {
    const [b1, b2, b3] = [bar1.current, bar2.current, bar3.current];
    if (!b1 || !b2 || !b3) return;

    if (opening) {
      gsap.timeline()
        .to(b2, { scaleX: 0, autoAlpha: 0, duration: 0.13, ease: "power3.in" })
        .to(b1, { scaleX: 0, duration: 0.13, ease: "power3.in" }, "<0.03")
        .to(b3, { scaleX: 0, duration: 0.13, ease: "power3.in" }, "<0.03")
        .set(b1, { y: 7,  rotate: 45  })
        .set(b3, { y: -7, rotate: -45 })
        .to(b1, { scaleX: 1, duration: 0.42, ease: "back.out(2.2)" })
        .to(b3, { scaleX: 1, duration: 0.42, ease: "back.out(2.2)" }, "<0.04");
    } else {
      gsap.timeline()
        .to([b1, b3], { scaleX: 0, duration: 0.13, ease: "power3.in", stagger: 0.03 })
        .set(b1, { y: 0, rotate: 0 })
        .set(b3, { y: 0, rotate: 0 })
        .to([b1, b3], { scaleX: 1, duration: 0.38, ease: "back.out(1.8)", stagger: 0.04 })
        .to(b2, { scaleX: 1, autoAlpha: 1, duration: 0.28, ease: "power2.out" }, "-=0.18");
    }
  }, []);

  const open = useCallback(() => {
    if (isOpen.current) return;
    isOpen.current = true;
    animateHamburger(true);
    menuTl.current?.play();
  }, [animateHamburger]);

  const close = useCallback(() => {
    if (!isOpen.current) return;
    isOpen.current = false;
    animateHamburger(false);
    menuTl.current?.reverse();
  }, [animateHamburger]);

  // ── Desktop link underline slide ──────────────────────────────────
  const onLinkEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const line = e.currentTarget.querySelector(".nav-line");
    gsap.fromTo(line, { scaleX: 0, transformOrigin: "left"  }, { scaleX: 1, duration: 0.25, ease: "power2.out" });
  };
  const onLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const line = e.currentTarget.querySelector(".nav-line");
    gsap.to(line, { scaleX: 0, transformOrigin: "right", duration: 0.2, ease: "power2.in" });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-6 px-4 md:px-8">

        <span
          ref={logoRef}
          className="font-[family-name:var(--font-inter)] font-semibold text-base tracking-[-0.04em] capitalize"
          style={{ color: "#000000" }}
        >
          H.Studio
        </span>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-14">
          {navLinks.map(({ label, href }, i) => (
            <li key={label}>
              <Link
                ref={el => { if (el) linkAnchors.current[i] = el; }}
                href={href}
                className="relative font-[family-name:var(--font-inter)] font-semibold text-base tracking-[-0.04em] capitalize"
                style={{ color: "#000000" }}
                onMouseEnter={onLinkEnter}
                onMouseLeave={onLinkLeave}
              >
                {label}
                <span
                  className="nav-line absolute bottom-[-2px] left-0 w-full h-[1.5px] block scale-x-0"
                  style={{ backgroundColor: "#000000" }}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div ref={navCtaWrap} className="hidden md:block">
          <AnimatedButton onClick={openContactModal}>Let&apos;s talk</AnimatedButton>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle menu"
          onClick={() => (isOpen.current ? close() : open())}
          className="md:hidden flex flex-col gap-[5px] relative z-50 p-1"
        >
          <span ref={bar1} className="block w-6 h-[2px] origin-center" style={{ backgroundColor: "#000000" }} />
          <span ref={bar2} className="block w-6 h-[2px] origin-center" style={{ backgroundColor: "#000000" }} />
          <span ref={bar3} className="block w-6 h-[2px] origin-center" style={{ backgroundColor: "#000000" }} />
        </button>
      </nav>

      {/* Dim overlay */}
      <div
        ref={overlayRef}
        onClick={close}
        className="fixed inset-0 z-40 bg-black"
        style={{ display: "none" }}
      />

      {/* Mobile slide-in panel */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 h-full w-4/5 max-w-[340px] z-50 bg-black flex-col px-6 py-6"
        style={{ display: "none" }}
      >
        <div className="flex items-center justify-between mb-16">
          <span className="font-[family-name:var(--font-inter)] font-semibold text-base tracking-[-0.04em] text-white capitalize">
            H.Studio
          </span>
        </div>

        <ul className="flex flex-col gap-8">
          {navLinks.map(({ label, href }, i) => (
            <li key={label} ref={el => { if (el) linksRef.current[i] = el; }}>
              <Link
                href={href}
                onClick={close}
                className="font-[family-name:var(--font-inter)] font-semibold text-4xl tracking-[-0.04em] text-white capitalize hover:opacity-60 transition-opacity"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div ref={mobileCta} className="mt-auto">
          <AnimatedButton variant="light" onClick={() => { close(); openContactModal(); }}>Let&apos;s talk</AnimatedButton>
        </div>
      </div>
    </>
  );
}
