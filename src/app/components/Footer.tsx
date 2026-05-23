const inter = "font-[family-name:var(--font-inter)]";
const mono = "font-[family-name:var(--font-geist-mono)]";

const socials = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "X.com", href: "#" },
  { label: "Linkedin", href: "#" },
];

function Heading() {
  return (
    <p className={`${inter} text-white uppercase leading-[1.1] tracking-[-0.04em]`}>
      <em className="font-light not-italic italic">Have a </em>
      <strong className="font-black not-italic">Project</strong>
      <em className="font-light not-italic italic"> in mind?</em>
    </p>
  );
}

function TalkButton({ large }: { large?: boolean }) {
  return (
    <button
      className={`${inter} border border-white text-white font-medium rounded-full self-start hover:bg-white hover:text-black transition-colors tracking-[-0.04em]
        ${large ? "text-[16px] px-6 py-4" : "text-[14px] px-4 py-2.5"}`}
    >
      Let&apos;s talk
    </button>
  );
}

export default function Footer() {
  return (
    <footer className="bg-black text-white" id="contact">

      {/* ── Desktop ── */}
      <div className="hidden md:block px-8 pt-12 pb-0">

        {/* Top row: CTA | Social center | Social right */}
        <div className="flex items-start justify-between pb-8">
          <div className="flex flex-col gap-9">
            <Heading />
            <TalkButton />
          </div>

          <div className="flex flex-col gap-2">
            {socials.slice(0, 2).map(s => (
              <a key={s.label} href={s.href}
                className={`${inter} text-white text-[14px] font-normal uppercase tracking-[-0.04em] hover:opacity-60 transition-opacity`}>
                {s.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            {socials.slice(2).map(s => (
              <a key={s.label} href={s.href}
                className={`${inter} text-white text-[14px] font-normal uppercase tracking-[-0.04em] hover:opacity-60 transition-opacity`}>
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/25" />

        {/* Bottom: coded-by + H.Studio + licences */}
        <div className="relative pt-[120px]">

          {/* [ Coded By Claude ] — vertical far left */}
          <p
            className={`${mono} absolute left-0 bottom-2 text-[11px] text-white uppercase tracking-[0.15em]`}
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            [ Coded By Claude ]
          </p>

          {/* Licences + Privacy — bottom right, above H.Studio baseline */}
          <div className="absolute bottom-2 right-0 flex gap-6">
            <a href="#" className={`${inter} text-white text-[11px] underline uppercase hover:opacity-60`}>Licences</a>
            <a href="#" className={`${inter} text-white text-[11px] underline uppercase hover:opacity-60`}>Privacy Policy</a>
          </div>

          {/* H.Studio wordmark */}
          <h2
            className={`${inter} font-black text-white leading-none tracking-[-0.07em] pl-12`}
            style={{ fontSize: "clamp(120px, 15.8vw, 227px)" }}
          >
            H.Studio
          </h2>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="md:hidden px-4 pt-12 pb-0">

        {/* CTA */}
        <div className="mb-6">
          <p className={`${inter} text-white text-[28px] uppercase leading-[1.1] tracking-[-0.04em] mb-6`}>
            <em className="font-light not-italic italic">Have a </em>
            <strong className="font-black not-italic">Project</strong>
            <em className="font-light not-italic italic"> in mind?</em>
          </p>
          <TalkButton large />
        </div>

        {/* Socials — stacked */}
        <div className="flex flex-col gap-3 mb-8">
          {socials.map(s => (
            <a key={s.label} href={s.href}
              className={`${inter} text-white text-[20px] font-normal uppercase tracking-[-0.04em] hover:opacity-60 transition-opacity`}>
              {s.label}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/25 mb-8" />

        {/* Licences — centered */}
        <div className="flex gap-8 justify-center mb-8">
          <a href="#" className={`${inter} text-white text-[12px] underline uppercase`}>Licences</a>
          <a href="#" className={`${inter} text-white text-[12px] underline uppercase`}>Privacy Policy</a>
        </div>

        {/* [ Coded By Claude ] */}
        <p className={`${mono} text-white text-[11px] uppercase tracking-[0.15em] mb-4`}>
          [ Coded By Claude ]
        </p>

        {/* H.Studio wordmark */}
        <h2
          className={`${inter} font-black text-white leading-none tracking-[-0.07em]`}
          style={{ fontSize: "clamp(64px, 18.7vw, 70px)" }}
        >
          H.Studio
        </h2>
      </div>

    </footer>
  );
}
