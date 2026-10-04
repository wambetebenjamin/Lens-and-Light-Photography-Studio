import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";

const STRIP_IMAGES = [
  { src: "/images/bts-strip/strip-1.jpg", alt: "Studio lighting setup before a shoot" },
  { src: "/images/bts-strip/strip-4.jpg", alt: "Photographer shooting on location" },
  { src: "/images/bts-strip/strip-5.jpg", alt: "Two photographers preparing an outdoor wedding setup" },
  { src: "/images/bts-strip/strip-2.jpg", alt: "Softbox lighting equipment in the studio" },
  { src: "/images/bts-strip/strip-6.jpg", alt: "Capturing a couple's intimate moment outdoors" },
  { src: "/images/bts-strip/strip-7.jpg", alt: "Editing photos at a workstation" },
  { src: "/images/bts-strip/strip-3.jpg", alt: "Minimalist studio setup with natural light" },
  { src: "/images/bts-strip/strip-8.jpg", alt: "Editing with a graphics tablet" },
];

export default function BehindTheScenesSection() {
  const loopImages = [...STRIP_IMAGES, ...STRIP_IMAGES];

  return (
    <section id="behind-the-scenes" className="py-section bg-surface-tint overflow-hidden">
      <div className="px-5 md:px-10">
        <SectionHeading
          eyebrow="Behind The Scenes"
          title="How The Story Gets Made"
          description="Studio setups, shoots in progress and late nights at the editing desk — the craft behind every finished gallery."
        />
      </div>

      {/* Mobile: vertical stack. Desktop: continuous horizontal scroll strip. */}
      <div className="flex flex-col gap-4 px-5 md:hidden">
        {STRIP_IMAGES.map((img) => (
          <div key={img.src} className="relative w-full h-72 overflow-hidden">
            <Image src={img.src} alt={img.alt} fill sizes="100vw" className="object-cover" />
          </div>
        ))}
      </div>

      <div className="hidden md:block relative w-full">
        <div className="flex w-max gap-5 animate-bts-scroll motion-reduce:animate-none hover:[animation-play-state:paused]">
          {loopImages.map((img, i) => (
            <div key={`${img.src}-${i}`} className="relative w-[320px] lg:w-[380px] h-[420px] shrink-0 overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="380px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
