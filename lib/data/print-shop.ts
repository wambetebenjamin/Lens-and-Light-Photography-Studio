export interface PrintProduct {
  slug: string;
  name: string;
  description: string;
  priceFrom: string;
  image: string;
}

export const PRINT_PRODUCTS: PrintProduct[] = [
  {
    slug: "framed-print",
    name: "Framed Print",
    description:
      "Museum-quality prints in a solid wood frame, ready to hang. Available in three sizes.",
    priceFrom: "From KES 6,500",
    image: "/images/print-shop/framed-print.jpg",
  },
  {
    slug: "canvas",
    name: "Canvas",
    description:
      "Gallery-wrapped canvas prints on premium cotton stock — a statement piece for any wall.",
    priceFrom: "From KES 8,000",
    image: "/images/print-shop/canvas.jpg",
  },
  {
    slug: "photo-book",
    name: "Photo Book",
    description:
      "A hardcover, lay-flat photo book designed by our team to tell the story of your session or wedding day.",
    priceFrom: "From KES 12,000",
    image: "/images/print-shop/photo-book.jpg",
  },
];
