"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { whatsappLink } from "@/lib/data/site";

const EQUIPMENT = [
  "Canon EOS R5 & R6 Mark II",
  "24-70mm f/2.8 & 85mm f/1.4 prime",
  "Profoto B10 off-camera lighting",
  "DJI Ronin gimbal for video & reels",
];

export default function PhotographerSection() {
  return (
    <section id="photographer" className="bg-ink text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[420px] lg:h-auto lg:min-h-[640px]"
        >
          <Image
            src="/images/photographer/portrait.jpg"
            alt="Portrait of the lead photographer at Lens and Light Photography Studio, Nairobi"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-top"
          />
        </motion.div>

        <div className="flex flex-col justify-center gap-6 px-6 py-16 sm:px-12 lg:px-16">
          <p className="section-heading-eyebrow text-white/70">The Photographer</p>
          <h2 className="!text-white text-h2 sm:text-h1 font-medium text-balance">Meet Kiprotich Mwangi</h2>
          <p className="text-white/75 max-w-lg">
            Kiprotich founded Lens &amp; Light in 2016 with a single rented camera and a
            conviction that Nairobi deserved photography that felt as warm and layered as
            the city itself. Ten years on, he leads a small team of photographers and
            editors trusted by families, couples and brands across East Africa.
          </p>

          <div className="grid grid-cols-2 gap-6 max-w-md py-4">
            <div>
              <p className="text-h2 font-medium">10+</p>
              <p className="text-small text-white/60 uppercase tracking-wider3">Years Experience</p>
            </div>
            <div>
              <p className="text-h2 font-medium">500+</p>
              <p className="text-small text-white/60 uppercase tracking-wider3">Sessions Delivered</p>
            </div>
          </div>

          <div>
            <p className="text-small uppercase tracking-wider3 text-white/60 mb-3">
              Cameras &amp; Equipment
            </p>
            <ul className="flex flex-col gap-2 text-white/80 text-small">
              {EQUIPMENT.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <a
            href={whatsappLink("Hi Kiprotich! I'd love to collaborate on a shoot with Lens and Light.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-studio w-fit mt-4"
            style={{ backgroundColor: "#fff", color: "var(--color-ink)", borderColor: "#fff" }}
          >
            Collaborate With Me
          </a>
        </div>
      </div>
    </section>
  );
}
