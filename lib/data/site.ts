export const SITE = {
  name: "Lens & Light Photography Studio",
  shortName: "Lens & Light",
  tagline: "We Capture Moments That Last.",
  description:
    "Professional photography and videography studio in Nairobi, Kenya — portraits, weddings, corporate and brand shoots, events, product photography and videography.",
  url: "https://lensandlight.studio",
  phone: "+254 112 272 061",
  whatsappNumber: "254112272061",
  whatsappMessage:
    "Hello! I would like to enquire about a photography session with Lens and Light.",
  email: "hello@lensandlight.studio",
  address: "Kilimani Business Centre, Argwings Kodhek Rd, Nairobi, Kenya",
  hours: [
    { day: "Monday – Friday", time: "9:00 AM – 7:00 PM" },
    { day: "Saturday", time: "10:00 AM – 6:00 PM" },
    { day: "Sunday", time: "By appointment" },
  ],
  social: {
    instagram: "https://instagram.com/lensandlightstudio",
    facebook: "https://facebook.com/lensandlightstudio",
    tiktok: "https://tiktok.com/@lensandlightstudio",
    twitter: "https://twitter.com/lensandlightke",
  },
};

export function whatsappLink(message?: string) {
  const text = encodeURIComponent(message || SITE.whatsappMessage);
  return `https://wa.me/${SITE.whatsappNumber}?text=${text}`;
}

export const NAV_LEFT = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#photographer" },
];

export const NAV_RIGHT = [
  { label: "Packages", href: "/#packages" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#booking" },
];
