export interface Service {
  slug: string;
  name: string;
  description: string;
  bullets: string[];
  image: string;
  icon: "camera" | "video" | "briefcase" | "users" | "package" | "clapperboard";
}

export const SERVICES: Service[] = [
  {
    slug: "portrait-sessions",
    name: "Portrait Sessions",
    description:
      "Individual, couple and family portrait sessions crafted around natural light and genuine expression — in studio or on location around Nairobi.",
    bullets: [
      "60–90 minute guided session",
      "Wardrobe and posing guidance included",
      "Private online gallery within 7 days",
    ],
    image: "/images/services/portrait-sessions.jpg",
    icon: "camera",
  },
  {
    slug: "wedding-photography",
    name: "Wedding Photography",
    description:
      "Full-day wedding coverage that captures the quiet moments and the big celebration alike — from first look to last dance.",
    bullets: [
      "Lead photographer plus second shooter",
      "Full-day or half-day coverage options",
      "Engagement session add-on available",
    ],
    image: "/images/services/wedding-photography.jpg",
    icon: "users",
  },
  {
    slug: "corporate-brand-photography",
    name: "Corporate & Brand Photography",
    description:
      "Headshots, office culture stories and brand imagery that help Nairobi businesses look as credible as they are.",
    bullets: [
      "On-site or in-studio executive headshots",
      "Team and workplace documentary coverage",
      "Usage-ready files for web and print",
    ],
    image: "/images/services/corporate-brand.jpg",
    icon: "briefcase",
  },
  {
    slug: "event-coverage",
    name: "Event Coverage",
    description:
      "Corporate functions, launches, parties and cultural celebrations — documented discreetly from setup to send-off.",
    bullets: [
      "Flexible hourly and full-event packages",
      "Rapid same-week highlight gallery",
      "Multi-photographer teams for large events",
    ],
    image: "/images/services/event-coverage.jpg",
    icon: "camera",
  },
  {
    slug: "product-photography",
    name: "Product Photography",
    description:
      "Clean, considered product imagery for e-commerce, catalogues and social — styled to match your brand's visual language.",
    bullets: [
      "Studio lighting on white or styled sets",
      "Flat-lay and lifestyle compositions",
      "Fast turnaround for online stores",
    ],
    image: "/images/services/product-photography.jpg",
    icon: "package",
  },
  {
    slug: "videography-reels",
    name: "Videography & Reels",
    description:
      "Short-form video and highlight reels for weddings, events and brands — edited for the way people actually watch today.",
    bullets: [
      "Cinematic highlight reels",
      "Vertical cuts for Instagram & TikTok",
      "Licensed music and colour grading",
    ],
    image: "/images/services/videography-reels.jpg",
    icon: "clapperboard",
  },
];
