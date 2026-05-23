const bigText =
  "font-[family-name:var(--font-inter)] font-light text-black uppercase leading-[0.84] whitespace-nowrap tracking-[-0.08em]";

const monoLabel =
  "font-[family-name:var(--font-geist-mono)] font-normal text-[14px] text-[#1f1f1f] leading-[1.1] uppercase";

export default function IntroSection() {
  return (
    <section className="bg-white px-4 md:px-8 py-12 md:py-[120px]">

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

        {/* Line 1 — mobile: 001 above; desktop: 001 inline right */}

        {/* Mobile */}
        <div className="flex flex-col items-center gap-1 md:hidden">
          <p className={monoLabel}>001</p>
          <p className={bigText}>A creative director&nbsp;&nbsp;&nbsp;/</p>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-start gap-2">
          <p className={bigText}>A creative director&nbsp;&nbsp;&nbsp;/</p>
          <p className={`${monoLabel} mt-[6px]`}>001</p>
        </div>

        {/* Line 2 — indented on desktop */}
        <div className="md:pl-[15.6%]">
          <p className={bigText}>Photographer</p>
        </div>

        {/* Line 3 — more indented, Playfair & */}
        <div className="md:pl-[44.3%]">
          <p className={bigText}>
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

        {/* Line 4 — full left */}
        <div>
          <p className={bigText}>On the south side</p>
        </div>

        {/* Line 5 */}
        <div className="md:pl-[44.1%]">
          <p className={bigText}>Of chicago.</p>
        </div>

        {/* Label — right-aligned on desktop, centered on mobile */}
        <p className={`${monoLabel} mt-2 self-center md:self-end`}>[ creative freelancer ]</p>

      </div>
    </section>
  );
}
