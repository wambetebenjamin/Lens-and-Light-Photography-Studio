export type PortfolioCategory =
  | "Portraits"
  | "Weddings"
  | "Events"
  | "Commercial"
  | "Fine Art"
  | "Behind the Scenes";

export interface PortfolioItem {
  slug: string;
  src: string;
  category: PortfolioCategory;
  title: string;
  width: number;
  height: number;
}

// width/height describe the source aspect ratio so the masonry grid can
// reserve the right amount of space before the image loads (no layout shift).
export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { slug: "portrait-maasai-man", src: "/images/portfolio/portraits-1.jpg", category: "Portraits", title: "Maasai Portrait Study", width: 500, height: 625 },
  { slug: "portrait-maasai-woman", src: "/images/portfolio/portraits-2.jpg", category: "Portraits", title: "Heritage Portrait", width: 612, height: 408 },
  { slug: "portrait-studio-afro", src: "/images/portfolio/portraits-3.jpg", category: "Portraits", title: "Studio Portrait", width: 500, height: 750 },
  { slug: "portrait-studio-makeup", src: "/images/portfolio/portraits-4.jpg", category: "Portraits", title: "Editorial Close-Up", width: 500, height: 750 },
  { slug: "portrait-studio-confident", src: "/images/portfolio/portraits-5.jpg", category: "Portraits", title: "Confident", width: 500, height: 667 },
  { slug: "portrait-afro-sunglasses", src: "/images/portfolio/portraits-6.jpg", category: "Portraits", title: "Street Portrait", width: 500, height: 750 },
  { slug: "portrait-indoor-close", src: "/images/portfolio/portraits-7.jpg", category: "Portraits", title: "Quiet Moment", width: 500, height: 750 },

  { slug: "wedding-white-embrace", src: "/images/portfolio/weddings-1.jpg", category: "Weddings", title: "First Embrace", width: 500, height: 750 },
  { slug: "wedding-celebration", src: "/images/portfolio/weddings-2.jpg", category: "Weddings", title: "Joyful Celebration", width: 500, height: 750 },
  { slug: "wedding-studio-portrait", src: "/images/portfolio/weddings-3.jpg", category: "Weddings", title: "The Crown", width: 500, height: 750 },
  { slug: "wedding-garden", src: "/images/portfolio/weddings-4.jpg", category: "Weddings", title: "Garden Vows", width: 500, height: 750 },
  { slug: "wedding-first-dance", src: "/images/portfolio/weddings-5.jpg", category: "Weddings", title: "First Dance", width: 500, height: 334 },
  { slug: "wedding-photographer-flowers", src: "/images/portfolio/weddings-6.jpg", category: "Weddings", title: "Among The Flowers", width: 500, height: 750 },

  { slug: "event-traditional-attire", src: "/images/portfolio/events-1.jpg", category: "Events", title: "Kwanzaa Celebration", width: 500, height: 750 },
  { slug: "event-festival", src: "/images/portfolio/events-2.jpg", category: "Events", title: "Cultural Festival", width: 500, height: 750 },
  { slug: "event-parade", src: "/images/portfolio/events-3.jpg", category: "Events", title: "Outdoor Parade", width: 500, height: 333 },
  { slug: "event-drummers", src: "/images/portfolio/events-4.jpg", category: "Events", title: "Rhythm & Dance", width: 500, height: 333 },
  { slug: "event-reception-dance", src: "/images/portfolio/events-5.jpg", category: "Events", title: "Reception Night", width: 500, height: 750 },

  { slug: "commercial-headshot-1", src: "/images/portfolio/commercial-1.jpg", category: "Commercial", title: "Executive Headshot", width: 500, height: 625 },
  { slug: "commercial-headshot-2", src: "/images/portfolio/commercial-2.jpg", category: "Commercial", title: "Brand Portrait", width: 500, height: 750 },
  { slug: "commercial-discussion", src: "/images/portfolio/commercial-3.jpg", category: "Commercial", title: "On Site", width: 500, height: 333 },
  { slug: "commercial-laptop", src: "/images/portfolio/commercial-4.jpg", category: "Commercial", title: "At Work", width: 500, height: 750 },
  { slug: "commercial-team", src: "/images/portfolio/commercial-5.jpg", category: "Commercial", title: "Team Story", width: 500, height: 333 },
  { slug: "commercial-product-bags", src: "/images/portfolio/commercial-6.jpg", category: "Commercial", title: "Product Edit", width: 500, height: 750 },

  { slug: "fine-art-red-backdrop", src: "/images/portfolio/fine-art-1.jpg", category: "Fine Art", title: "Scarlet Study", width: 1260, height: 750 },
  { slug: "fine-art-kente", src: "/images/portfolio/fine-art-2.jpg", category: "Fine Art", title: "Heritage in Colour", width: 500, height: 750 },
  { slug: "fine-art-golden-hour", src: "/images/portfolio/fine-art-3.jpg", category: "Fine Art", title: "Golden Hour", width: 500, height: 750 },
  { slug: "fine-art-pensive", src: "/images/portfolio/fine-art-4.jpg", category: "Fine Art", title: "Pensive", width: 500, height: 750 },
  { slug: "fine-art-monochrome", src: "/images/portfolio/fine-art-5.jpg", category: "Fine Art", title: "The Craft", width: 500, height: 750 },
  { slug: "fine-art-street", src: "/images/portfolio/fine-art-6.jpg", category: "Fine Art", title: "Nairobi Transit", width: 500, height: 667 },

  { slug: "bts-photoshoot", src: "/images/portfolio/bts-1.jpg", category: "Behind the Scenes", title: "On Set", width: 500, height: 750 },
  { slug: "bts-crew", src: "/images/portfolio/bts-2.jpg", category: "Behind the Scenes", title: "The Crew", width: 500, height: 750 },
  { slug: "bts-desk", src: "/images/portfolio/bts-3.jpg", category: "Behind the Scenes", title: "The Workspace", width: 1260, height: 750 },
  { slug: "bts-editing", src: "/images/portfolio/bts-4.jpg", category: "Behind the Scenes", title: "Editing Pass", width: 1260, height: 750 },
  { slug: "bts-lighting", src: "/images/portfolio/bts-5.jpg", category: "Behind the Scenes", title: "Lighting Rig", width: 500, height: 333 },
  { slug: "bts-gear", src: "/images/portfolio/bts-6.jpg", category: "Behind the Scenes", title: "The Kit", width: 500, height: 750 },
];

export const PORTFOLIO_CATEGORIES: ("All" | PortfolioCategory)[] = [
  "All",
  "Portraits",
  "Weddings",
  "Events",
  "Commercial",
  "Fine Art",
  "Behind the Scenes",
];
