// Logoipsum placeholder logos (Figma asset URLs expire; SVG approximations)
function LogoCircle() {
  return (
    <div className="flex items-center gap-2">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7" stroke="#aaa" strokeWidth="1.2"/>
        <circle cx="8" cy="8" r="4" stroke="#aaa" strokeWidth="1.2"/>
        <circle cx="8" cy="8" r="1.5" fill="#aaa"/>
      </svg>
      <span className="text-[13px] text-neutral-400 font-[family-name:var(--font-inter)] tracking-wider uppercase">Logoipsum</span>
    </div>
  );
}
function LogoStar() {
  return (
    <div className="flex items-center gap-2">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1l1.8 4h4.2l-3.4 2.5 1.3 4L8 9l-3.9 2.5 1.3-4L2 5h4.2z" stroke="#aaa" strokeWidth="1" fill="none"/>
      </svg>
      <span className="text-[13px] text-neutral-400 font-[family-name:var(--font-inter)] tracking-wider uppercase">Logoipsum</span>
    </div>
  );
}
function LogoShield() {
  return (
    <div className="flex items-start gap-2">
      <svg width="16" height="19" viewBox="0 0 16 19" fill="none" className="mt-0.5 shrink-0">
        <path d="M8 1L1 4V9C1 14 4.5 17.5 8 18.5C11.5 17.5 15 14 15 9V4z" stroke="#aaa" strokeWidth="1" fill="none"/>
      </svg>
      <span className="text-[13px] text-neutral-400 font-[family-name:var(--font-inter)] leading-tight">Logoipsum<br/>University</span>
    </div>
  );
}
function LogoScript() {
  return (
    <span className="text-[16px] text-neutral-400 font-[family-name:var(--font-playfair)] italic">logoipsum</span>
  );
}

function Card({ logo, quote, name }: { logo: React.ReactNode; quote: string; name: string }) {
  return (
    <div className="bg-[#f1f1f1] border border-[#ddd] flex flex-col gap-4 p-6 rounded-[4px] w-[353px]">
      <div>{logo}</div>
      <p className="font-[family-name:var(--font-inter)] font-normal text-[18px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
        {quote}
      </p>
      <p className="font-[family-name:var(--font-inter)] font-black text-[16px] text-black leading-[1.1] tracking-[-0.04em] uppercase whitespace-nowrap">
        {name}
      </p>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="bg-white" id="testimonials">

      {/* ── Desktop ── */}
      {/* Container: flex centers heading; cards are absolutely positioned within it */}
      <div
        className="hidden md:flex flex-col items-center justify-center relative px-8 py-[120px]"
        style={{ height: "987px" }}
      >
        {/*
          All 4 cards come BEFORE the heading in DOM order.
          The heading (position:relative) therefore paints on top of all cards —
          heading text is always fully readable even where cards and text touch.
        */}

        {/* Lukas */}
        <div className="absolute" style={{ left: "calc(50% - 70px)", top: "270px", transform: "rotate(2.9deg)" }}>
          <Card logo={<LogoStar />} name="Lukas Weber"
            quote="Professional, precise, and incredibly fast at handling complex product visualizations and templates." />
        </div>

        {/* Marko */}
        <div className="absolute" style={{ left: "calc(50% - 618px)", top: "175px", transform: "rotate(-6.85deg)" }}>
          <Card logo={<LogoCircle />} name="Marko Stojković"
            quote="A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive." />
        </div>

        {/* Sarah */}
        <div className="absolute" style={{ left: "calc(50% - 415px)", top: "575px", transform: "rotate(2.23deg)" }}>
          <Card logo={<LogoShield />} name="Sarah Jenkins"
            quote="A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good; they solve business problems through visual clarity." />
        </div>

        {/* Sofia */}
        <div className="absolute" style={{ left: "calc(50% + 265px)", top: "546px", transform: "rotate(-4.15deg)" }}>
          <Card logo={<LogoScript />} name="Sofia Martínez"
            quote="An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats." />
        </div>

        {/* Heading LAST — renders on top of all cards */}
        <h2
          className="relative font-[family-name:var(--font-inter)] font-medium text-black text-center leading-[1.1] whitespace-nowrap capitalize"
          style={{ fontSize: "198px", letterSpacing: "-0.07em" }}
        >
          Testimonials
        </h2>
      </div>

      {/* ── Mobile: heading + 2-card horizontal overflow ── */}
      <div className="md:hidden relative" style={{ height: "540px" }}>
        <div className="absolute" style={{ left: "16px", top: "16px", transform: "rotate(-6.85deg)", zIndex: 10 }}>
          <div className="bg-[#f1f1f1] border border-[#ddd] flex flex-col gap-3 p-5 rounded-[4px] w-[260px]">
            <LogoCircle />
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#1f1f1f] leading-[1.3]">
              A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.
            </p>
            <p className="font-[family-name:var(--font-inter)] font-black text-[12px] text-black uppercase tracking-[0.04em]">Marko Stojković</p>
          </div>
        </div>

        <h2
          className="absolute font-[family-name:var(--font-inter)] font-medium text-black leading-none whitespace-nowrap capitalize"
          style={{ fontSize: "110px", left: "16px", top: "252px", zIndex: 20 }}
        >
          Testimonials
        </h2>

        <div className="absolute" style={{ left: "110px", top: "250px", transform: "rotate(2.23deg)", zIndex: 10 }}>
          <div className="bg-[#f1f1f1] border border-[#ddd] flex flex-col gap-3 p-5 rounded-[4px] w-[245px]">
            <LogoShield />
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#1f1f1f] leading-[1.3]">
              A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good; they solve business problems through visual clarity.
            </p>
            <p className="font-[family-name:var(--font-inter)] font-black text-[12px] text-black uppercase tracking-[0.04em]">Sarah Jenkins</p>
          </div>
        </div>
      </div>
    </section>
  );
}
