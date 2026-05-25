import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/sanity/lib/image";

const mono =
  "font-[family-name:var(--font-geist-mono)] font-normal text-[14px] leading-[1.1] uppercase";

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" className={`shrink-0 ${className ?? ""}`}>
      <path d="M6 23.5L6 26L8.5 26L26 8.5L26 21L29 21L29 3L11 3L11 6L23.5 6L6 23.5Z" />
    </svg>
  );
}

function Corner({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`shrink-0 ${className ?? ""}`}>
      <path d="M16 0H0V16" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export interface SanityProject {
  _id: string;
  title: string;
  imageUrl?: string;
  image?: SanityImageSource;
  tags?: string[];
  tall: boolean;
  order: number;
  link?: string;
}

function getImageSrc(project: SanityProject): string {
  if (project.imageUrl) return project.imageUrl;
  if (project.image) return urlFor(project.image).url();
  return "";
}

function ProjectCard({ project }: { project: SanityProject }) {
  const imageH = project.tall ? "md:h-[744px]" : "md:h-[699px]";
  const src = getImageSrc(project);
  return (
    <div>
      <div className={`relative w-full aspect-square ${imageH} md:aspect-auto overflow-hidden`}>
        <Image src={src} alt={project.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        <div className="absolute bottom-4 left-4 flex gap-2">
          {(project.tags ?? []).map((tag) => (
            <span
              key={tag}
              className="bg-white/65 backdrop-blur-md text-neutral-900 font-[family-name:var(--font-inter)] font-normal text-[13px] px-4 py-2 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 md:mt-4 text-white md:text-black">
        <h3
          className="font-[family-name:var(--font-inter)] font-black italic uppercase leading-none tracking-[-0.03em]"
          style={{ fontSize: "clamp(24px, 2.78vw, 40px)" }}
        >
          {project.title}
        </h3>
        <ArrowUpRight />
      </div>
    </div>
  );
}

function CtaBlock() {
  return (
    <div className="flex items-stretch gap-3 text-white md:text-black">
      <div className="flex flex-col justify-between w-4 shrink-0">
        <Corner />
        <Corner className="-rotate-90" />
      </div>
      <div className="flex flex-col gap-4 py-3 flex-1">
        <p className="font-[family-name:var(--font-inter)] font-normal italic text-[14px] leading-[1.3] tracking-[-0.04em] md:max-w-[393px]">
          Discover how my creativity transforms ideas into impactful digital
          experiences — schedule a call with me to get started.
        </p>
        <button className="self-start bg-black text-white font-[family-name:var(--font-inter)] font-medium text-sm tracking-[-0.04em] px-4 py-3 rounded-3xl hover:opacity-80 transition-opacity">
          Let&apos;s talk
        </button>
      </div>
      <div className="flex flex-col justify-between items-end w-4 shrink-0">
        <Corner className="rotate-90" />
        <Corner className="rotate-180" />
      </div>
    </div>
  );
}

export default function PortfolioSection({ projects }: { projects: SanityProject[] }) {
  const left = projects.filter((_, i) => i % 2 === 0);
  const right = projects.filter((_, i) => i % 2 === 1);

  return (
    <section className="bg-black md:bg-white px-4 md:px-8 pt-8 md:pt-12 pb-12 md:pb-20 relative" id="projects">

      {/* Mobile header */}
      <div className="flex items-start justify-between mb-4 md:hidden">
        <p className={`${mono} text-white`}>[ Portfolio ]</p>
        <p className={`${mono} text-white`}>004</p>
      </div>
      <h2
        className="md:hidden font-[family-name:var(--font-inter)] font-light text-white uppercase leading-tight mb-6"
        style={{ fontSize: "clamp(40px, 10.67vw, 48px)" }}
      >
        Selected Work
      </h2>

      {/* Desktop header */}
      <div className="hidden md:flex items-start justify-between mb-14">
        <h2
          className="font-[family-name:var(--font-inter)] font-light text-black uppercase leading-[0.9]"
          style={{ fontSize: "clamp(48px, 5.76vw, 83px)" }}
        >
          Selected<sup className={`${mono} text-black text-[14px] align-super ml-2 normal-case`}>004</sup>
          <br />Work
        </h2>
        <p className={`${mono} text-black`} style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
          [ Portfolio ]
        </p>
      </div>

      {/* Mobile: single column */}
      <div className="flex flex-col gap-8 md:hidden">
        {projects.map((p) => <ProjectCard key={p._id} project={p} />)}
        <CtaBlock />
      </div>

      {/* Desktop: 2-column staggered */}
      <div className="hidden md:flex items-start gap-6">
        <div className="flex-1 flex flex-col gap-[123px]">
          {left.map((p) => <ProjectCard key={p._id} project={p} />)}
          <CtaBlock />
        </div>
        <div className="flex-1 flex flex-col gap-[123px] pt-[240px]">
          {right.map((p) => <ProjectCard key={p._id} project={p} />)}
        </div>
      </div>
    </section>
  );
}
