"use client";

import { useRef } from "react";
import gsap from "gsap";

interface Props {
  children: React.ReactNode;
  className?: string;
  variant?: "dark" | "light" | "ghost";
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function AnimatedButton({
  children,
  className = "",
  variant = "dark",
  onClick,
  type = "button",
}: Props) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const wipeRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const wipeFill  = variant === "light" ? "#000000" : "#ffffff";
  const textBase  = variant === "light" ? "#000000" : "#ffffff";
  const textHover = variant === "light" ? "#ffffff" : "#000000";
  const bgClass   =
    variant === "dark"  ? "bg-black border-black" :
    variant === "light" ? "bg-white border-white"  :
                          "bg-transparent border-white";

  const onEnter = () => {
    const effectiveHover = btnRef.current?.dataset.textHover ?? textHover;
    gsap.killTweensOf([wipeRef.current, labelRef.current]);
    gsap.fromTo(
      wipeRef.current,
      { scaleY: 0, transformOrigin: "bottom" },
      { scaleY: 1, duration: 0.4, ease: "power2.inOut" }
    );
    gsap.to(labelRef.current, { color: effectiveHover, duration: 0.2, delay: 0.1 });
  };

  const onLeave = () => {
    const effectiveBase = btnRef.current?.dataset.textBase ?? textBase;
    gsap.killTweensOf([wipeRef.current, labelRef.current, btnRef.current]);
    gsap.to(wipeRef.current, { scaleY: 0, transformOrigin: "top", duration: 0.35, ease: "power2.inOut" });
    gsap.to(labelRef.current, { color: effectiveBase, duration: 0.2 });
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.45)" });
  };

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width  / 2)) * 0.28;
    const dy = (e.clientY - (r.top  + r.height / 2)) * 0.28;
    gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: "power2.out" });
  };

  return (
    <button
      ref={btnRef}
      type={type}
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
      className={`relative overflow-hidden border font-[family-name:var(--font-inter)] font-medium text-sm tracking-[-0.04em] px-4 py-3 rounded-full ${bgClass} ${className}`}
    >
      <span
        ref={wipeRef}
        className="absolute inset-0 scale-y-0 rounded-full"
        style={{ backgroundColor: wipeFill, transformOrigin: "bottom" }}
      />
      <span ref={labelRef} className="relative z-10" style={{ color: textBase }}>
        {children}
      </span>
    </button>
  );
}
