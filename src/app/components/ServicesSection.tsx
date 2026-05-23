import Image from "next/image";

const mono =
  "font-[family-name:var(--font-geist-mono)] font-normal text-[14px] text-white leading-[1.1] uppercase";

const desc =
  "font-[family-name:var(--font-inter)] font-normal text-[14px] text-white leading-[1.3] tracking-[-0.04em]";

const services = [
  {
    num: "1",
    title: "Brand Discovery",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "/service-brand.png",
  },
  {
    num: "2",
    title: "Web Design & Dev",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "/service-web.png",
  },
  {
    num: "3",
    title: "Marketing",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "/service-marketing.png",
  },
  {
    num: "4",
    title: "Photography",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "/service-photography.png",
  },
];

function ServiceRow({
  num,
  title,
  description,
  image,
}: {
  num: string;
  title: string;
  description: string;
  image: string;
}) {
  return (
    <div>
      {/* Number + divider */}
      <div className="flex flex-col gap-3 mb-4 md:mb-0">
        <p className={mono}>[ {num} ]</p>
        <div className="w-full h-px bg-white/30" />
      </div>

      {/* Desktop row: title | description + image */}
      <div className="hidden md:flex items-start pt-4 pb-10">
        <h3
          className="font-[family-name:var(--font-inter)] font-bold italic text-white uppercase leading-none tracking-[-0.04em] flex-1"
          style={{ fontSize: "clamp(32px, 2.78vw, 40px)" }}
        >
          {title}
        </h3>
        <div className="flex items-start gap-6 w-[568px] shrink-0">
          <p className={`${desc} w-[393px] shrink-0`}>{description}</p>
          <div className="relative w-[151px] h-[151px] shrink-0 overflow-hidden">
            <Image src={image} alt={title} fill sizes="151px" className="object-cover" />
          </div>
        </div>
      </div>

      {/* Mobile stack: title / description / image left-aligned */}
      <div className="md:hidden pt-3 pb-8">
        <h3
          className="font-[family-name:var(--font-inter)] font-bold italic text-white uppercase leading-none tracking-[-0.04em] mb-4"
          style={{ fontSize: "clamp(32px, 8.5vw, 40px)" }}
        >
          {title}
        </h3>
        <p className={`${desc} mb-5`}>{description}</p>
        <div className="relative w-[151px] h-[151px] overflow-hidden">
          <Image src={image} alt={title} fill sizes="151px" className="object-cover" />
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section className="bg-black px-4 md:px-8 pt-8 md:pt-12 pb-12 md:pb-20" id="services">

      {/* Section label */}
      <p className={`${mono} mb-6 md:mb-10`}>[ Services ]</p>

      {/* Header: [4] + DELIVERABLES */}
      <div className="flex items-end justify-between mb-8 md:mb-12">
        <p
          className="font-[family-name:var(--font-inter)] font-light text-white leading-none tracking-[-0.04em]"
          style={{ fontSize: "clamp(36px, 8.06vw, 116px)" }}
        >
          [4]
        </p>
        <p
          className="font-[family-name:var(--font-inter)] font-light text-white leading-none tracking-[-0.04em]"
          style={{ fontSize: "clamp(36px, 8.06vw, 116px)" }}
        >
          DELIVERABLES
        </p>
      </div>

      {/* Service rows */}
      <div className="flex flex-col">
        {services.map((s) => (
          <ServiceRow key={s.num} {...s} />
        ))}
      </div>
    </section>
  );
}
