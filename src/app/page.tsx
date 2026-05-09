import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import Categories from "@/components/sections/Categories";
import FlashSale from "@/components/sections/FlashSale";
import TrendingProducts from "@/components/sections/TrendingProducts";
import PromoBanners from "@/components/sections/PromoBanners";
import BrandsSection from "@/components/sections/BrandsSection";
import AppPromotion from "@/components/sections/AppPromotion";
import Newsletter from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main className="flex flex-col min-h-screen bg-[#F8F8F8] pb-0">
        <HeroSection />
        <Categories />
        <FlashSale />
        <TrendingProducts />
        <PromoBanners />
        <BrandsSection />
        <AppPromotion />
        <Newsletter />
      </main>

      <Footer />
    </>
  );
}
