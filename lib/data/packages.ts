export interface Package {
  slug: string;
  name: string;
  sessionType: string;
  duration: string;
  editedPhotos: string;
  turnaround: string;
  priceKES: number;
  featured?: boolean;
  notes?: string;
}

export const PACKAGES: Package[] = [
  {
    slug: "essential",
    name: "Essential",
    sessionType: "Portrait or small event session",
    duration: "1 hour on location or in studio",
    editedPhotos: "20 professionally edited photos",
    turnaround: "5 working days",
    priceKES: 15000,
  },
  {
    slug: "premium",
    name: "Premium",
    sessionType: "Portrait, couple, family or half-day event",
    duration: "3 hours, one location change included",
    editedPhotos: "60 professionally edited photos",
    turnaround: "4 working days",
    priceKES: 35000,
    featured: true,
    notes: "Most popular for weddings, graduations and brand sessions",
  },
  {
    slug: "signature",
    name: "Signature",
    sessionType: "Full wedding, brand or full-day event coverage",
    duration: "Full day (up to 8 hours), second shooter included",
    editedPhotos: "150+ professionally edited photos",
    turnaround: "7 working days, 48-hour sneak peek",
    priceKES: 85000,
  },
];
