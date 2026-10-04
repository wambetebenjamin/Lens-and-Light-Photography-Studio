"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Camera, Users, Briefcase, Package, Clapperboard, CheckCircle } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { SERVICES } from "@/lib/data/services";
import { whatsappLink } from "@/lib/data/site";

const ICONS = {
  camera: Camera,
  video: Clapperboard,
  briefcase: Briefcase,
  users: Users,
  package: Package,
  clapperboard: Clapperboard,
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-section bg-surface-tint">
      <div className="px-5 md:px-10">
        <SectionHeading
          eyebrow="What We Offer"
          title="Services Tailored To Every Story"
          description="From a single portrait to a full day of wedding coverage, every service is built around getting you images you'll actually treasure."
        />
      </div>

      <div className="flex flex-col">
        {SERVICES.map((service, i) => {
          const Icon = ICONS[service.icon];
          const imageFirst = i % 2 === 0;
          return (
            <div
              key={service.slug}
              className="grid grid-cols-1 lg:grid-cols-2 min-h-[420px] lg:min-h-[520px]"
            >
              <motion.div
                initial={{ opacity: 0, x: imageFirst ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`relative h-[320px] lg:h-auto ${imageFirst ? "lg:order-1" : "lg:order-2"}`}
              >
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: imageFirst ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className={`flex flex-col justify-center gap-5 px-6 py-14 sm:px-12 lg:px-16 bg-surface ${
                  imageFirst ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <Icon className="w-7 h-7 text-ink" strokeWidth={1.25} aria-hidden />
                <h3 className="text-h3 font-medium text-balance">{service.name}</h3>
                <p className="text-body max-w-md">{service.description}</p>
                <ul className="flex flex-col gap-2 mt-2">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-small text-ink">
                      <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={1.5} aria-hidden />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={whatsappLink(
                    `Hi! I'd like to enquire about ${service.name} with Lens and Light.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-studio w-fit mt-4"
                >
                  Enquire
                </a>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
