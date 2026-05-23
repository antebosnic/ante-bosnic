"use client";

import { useState } from "react";

const navLinks = ["About", "Services", "Projects", "News", "Contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between py-6">
        <span className="font-[family-name:var(--font-inter)] font-semibold text-base tracking-[-0.04em] text-black capitalize">
          H.Studio
        </span>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-14">
          {navLinks.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="font-[family-name:var(--font-inter)] font-semibold text-base tracking-[-0.04em] text-black capitalize hover:opacity-60 transition-opacity"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <button className="hidden md:block bg-black text-white font-[family-name:var(--font-inter)] font-medium text-sm tracking-[-0.04em] px-4 py-3 rounded-3xl hover:bg-neutral-800 transition-colors">
          Let&apos;s talk
        </button>

        {/* Mobile hamburger */}
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="md:hidden flex flex-col gap-[5px]"
        >
          <span className="block w-6 h-[2px] bg-black" />
          <span className="block w-6 h-[2px] bg-black" />
          <span className="block w-6 h-[2px] bg-black" />
        </button>
      </nav>

      {/* Mobile full-screen menu */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col px-6 py-6">
          <div className="flex items-center justify-between">
            <span className="font-[family-name:var(--font-inter)] font-semibold text-base tracking-[-0.04em] text-white capitalize">
              H.Studio
            </span>
            <button aria-label="Close menu" onClick={() => setOpen(false)}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <ul className="flex flex-col gap-8 mt-16">
            {navLinks.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="font-[family-name:var(--font-inter)] font-semibold text-4xl tracking-[-0.04em] text-white capitalize"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto">
            <button className="bg-white text-black font-[family-name:var(--font-inter)] font-medium text-sm tracking-[-0.04em] px-4 py-3 rounded-3xl">
              Let&apos;s talk
            </button>
          </div>
        </div>
      )}
    </>
  );
}
