import Image from "next/image";

const aboutImage = "/about-portrait.jpg";

const mono =
  "font-[family-name:var(--font-geist-mono)] font-normal text-[14px] text-[#1f1f1f] leading-[1.1] uppercase whitespace-nowrap";

const bodyText =
  "font-[family-name:var(--font-inter)] font-normal text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]";

// Corner bracket SVG — top-left orientation, rotate for other corners
function Corner({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={`shrink-0 ${className ?? ""}`}
    >
      <path d="M16 0H0V16" stroke="#1f1f1f" strokeWidth="1" />
    </svg>
  );
}

// Text block framed by corner brackets
function BracketedText() {
  return (
    <div className="flex items-stretch gap-3">
      {/* Left column: TL + BL */}
      <div className="flex flex-col justify-between w-4 shrink-0">
        <Corner />
        <Corner className="-rotate-90" />
      </div>

      <p className={`flex-1 py-3 ${bodyText}`}>
        Placeholder paragraph one. This is where you introduce yourself —
        your background, your passion for your craft, and what drives you
        creatively. Two to three sentences work best here. Placeholder
        paragraph two. Here you can describe your technical approach, how
        you collaborate with clients, or what sets your work apart from
        others in your field.
      </p>

      {/* Right column: TR + BR */}
      <div className="flex flex-col justify-between items-end w-4 shrink-0">
        <Corner className="rotate-90" />
        <Corner className="rotate-180" />
      </div>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section className="bg-white px-4 md:px-8 py-12 md:py-20" id="about">

      {/* ── Mobile ── */}
      <div className="flex flex-col gap-5 md:hidden">
        <p className={mono}>002</p>
        <p className={mono}>[ About ]</p>
        <BracketedText />
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "422/594" }}>
          <Image src={aboutImage} alt="Portrait" fill className="object-cover" />
        </div>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:flex items-start justify-between">

        {/* Left: section label */}
        <p className={mono}>[ About ]</p>

        {/* Right panel (~71% width): text bottom-aligned with image */}
        <div className="flex items-end gap-8" style={{ width: "71.4%" }}>

          {/* Bracketed text — flex-1, sits at the bottom due to items-end */}
          <div className="flex-1">
            <BracketedText />
          </div>

          {/* Image column: 002 label + portrait */}
          <div className="flex items-start gap-6 shrink-0">
            <p className={mono}>002</p>
            <div
              className="relative shrink-0 overflow-hidden"
              style={{ width: "436px", height: "614px" }}
            >
              <Image
                src={aboutImage}
                alt="Portrait"
                fill
                sizes="436px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
