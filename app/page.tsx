import Hero from "@/components/Hero";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PackagesSection from "@/components/sections/PackagesSection";
import PhotographerSection from "@/components/sections/PhotographerSection";
import BehindTheScenesSection from "@/components/sections/BehindTheScenesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BookingSection from "@/components/sections/BookingSection";
import BlogSection from "@/components/sections/BlogSection";
import PrintShopSection from "@/components/sections/PrintShopSection";

export const revalidate = 600;

export default function Home() {
  return (
    <>
      <Hero />
      <PortfolioSection />
      <ServicesSection />
      <PackagesSection />
      <PhotographerSection />
      <BehindTheScenesSection />
      <TestimonialsSection />
      <BookingSection />
      <BlogSection />
      <PrintShopSection />
    </>
  );
}
