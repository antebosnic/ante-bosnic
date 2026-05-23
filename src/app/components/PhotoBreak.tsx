import Image from "next/image";

export default function PhotoBreak() {
  return (
    <section>
      {/* Desktop — landscape crop, fixed 900px height */}
      <div className="hidden md:block relative w-full h-[900px]">
        <Image
          src="/photo-break-desktop.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Mobile — portrait crop, proportional height */}
      <div className="md:hidden relative w-full" style={{ aspectRatio: "375/565" }}>
        <Image
          src="/photo-break-mobile.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
