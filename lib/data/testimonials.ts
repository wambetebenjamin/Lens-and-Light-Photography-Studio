export interface Testimonial {
  quote: string;
  name: string;
  shootType: string;
  date: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Lens and Light made our wedding day feel effortless. Every photo looks like it was lifted from a film — we still can't stop looking through the gallery.",
    name: "Wanjiru & Otieno",
    shootType: "Wedding Photography",
    date: "June 2025",
  },
  {
    quote:
      "Our rebrand shoot needed to feel premium without feeling stiff. The team understood the assignment immediately and delivered images our whole team is proud of.",
    name: "Achieng Omondi",
    shootType: "Corporate & Brand Photography",
    date: "March 2025",
  },
  {
    quote:
      "Patient, warm and incredibly skilled with toddlers who refuse to sit still. Our family portraits are now framed in every room of the house.",
    name: "Njeri Kamau",
    shootType: "Family Portrait Session",
    date: "August 2025",
  },
  {
    quote:
      "From the product shots to the launch event coverage, everything was delivered on time and the quality exceeded what we paid for.",
    name: "Brian Mwangi",
    shootType: "Product & Event Coverage",
    date: "January 2026",
  },
  {
    quote:
      "I've booked three sessions now and every single one has been better than the last. Nairobi is lucky to have this studio.",
    name: "Amani Chepkoech",
    shootType: "Portrait Session",
    date: "September 2025",
  },
];
