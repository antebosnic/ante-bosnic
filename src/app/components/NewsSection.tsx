import Image from "next/image";

const img1 = "https://www.figma.com/api/mcp/asset/c76d9ba8-7343-4c2d-bd04-f33097f2541d";
const img2 = "https://www.figma.com/api/mcp/asset/550543c9-c81c-44e5-b549-95ab5764e39b";
const img3 = "https://www.figma.com/api/mcp/asset/54159c43-19dc-48e8-a54a-146dad7e5c15";

function ReadMore() {
  return (
    <a href="#" className="flex items-center gap-1.5 border-b border-black pb-0.5 self-start hover:opacity-60 transition-opacity cursor-pointer">
      <span className="font-[family-name:var(--font-inter)] font-medium text-[14px] text-black tracking-[-0.04em] whitespace-nowrap">
        Read more
      </span>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
        <path d="M2 12L12 2M12 2H4M12 2V10" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
  );
}

const bodyText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

export default function NewsSection() {
  return (
    <section className="bg-[#f3f3f3]" id="news">

      {/* ── Desktop ── */}
      <div className="hidden md:flex items-end justify-between px-8 py-[120px]">

        {/* Rotated heading — absolute positioned so it doesn't overflow its box */}
        <div className="relative shrink-0 w-[110px] h-[706px]">
          <p
            className="absolute top-1/2 left-1/2 font-[family-name:var(--font-inter)] font-light text-black uppercase whitespace-pre"
            style={{
              fontSize: "64px",
              letterSpacing: "-0.08em",
              lineHeight: 0.86,
              width: "706px",
              transform: "translate(-50%, -50%) rotate(-90deg)",
              transformOrigin: "center center",
            }}
          >
            {`Keep up with my latest\nNews & achievements`}
          </p>
        </div>

        {/* Article cards — shrink-0 so justify-between pushes them to the right */}
        <div className="flex items-start shrink-0">

          {/* Card 1 */}
          <div className="flex flex-col gap-4 w-[353px] shrink-0">
            <div className="relative w-full h-[469px] overflow-hidden">
              <Image src={img1} alt="" fill className="object-cover" sizes="353px" />
            </div>
            <p className="font-[family-name:var(--font-inter)] font-normal text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
              {bodyText}
            </p>
            <ReadMore />
          </div>

          {/* Divider */}
          <div className="self-stretch w-px bg-black/20 shrink-0 mx-8" />

          {/* Card 2 — offset 120px down */}
          <div className="flex flex-col gap-4 w-[353px] shrink-0 pt-[120px]">
            <div className="relative w-full h-[469px] overflow-hidden">
              <Image src={img2} alt="" fill className="object-cover" sizes="353px" />
            </div>
            <p className="font-[family-name:var(--font-inter)] font-normal text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
              {bodyText}
            </p>
            <ReadMore />
          </div>

          {/* Divider */}
          <div className="self-stretch w-px bg-black/20 shrink-0 mx-8" />

          {/* Card 3 */}
          <div className="flex flex-col gap-4 w-[353px] shrink-0">
            <div className="relative w-full h-[469px] overflow-hidden">
              <Image src={img3} alt="" fill className="object-cover" sizes="353px" />
            </div>
            <p className="font-[family-name:var(--font-inter)] font-normal text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
              {bodyText}
            </p>
            <ReadMore />
          </div>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="md:hidden px-4 py-16 flex flex-col gap-8">
        <h2
          className="font-[family-name:var(--font-inter)] font-light text-black uppercase"
          style={{ fontSize: "32px", letterSpacing: "-0.08em", lineHeight: 0.86 }}
        >
          Keep up with my latest news &amp; achievements
        </h2>

        {/* Horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
          {[img1, img2, img3].map((src, i) => (
            <div key={i} className="flex flex-col gap-4 w-[300px] shrink-0">
              <div className="relative w-full h-[398px] overflow-hidden">
                <Image src={src} alt="" fill className="object-cover" sizes="300px" />
              </div>
              <p className="font-[family-name:var(--font-inter)] font-normal text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.04em]">
                {bodyText}
              </p>
              <ReadMore />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
