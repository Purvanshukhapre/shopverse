import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import TrustBar from "@/components/sections/TrustBar";
import Categories from "@/components/sections/Categories";
import FlashSale from "@/components/sections/FlashSale";
import TrendingProducts from "@/components/sections/TrendingProducts";
import PromoBanners from "@/components/sections/PromoBanners";
import BrandsSection from "@/components/sections/BrandsSection";
import Recommendations from "@/components/sections/Recommendations";
import AppPromotion from "@/components/sections/AppPromotion";
import Newsletter from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main className="flex flex-col min-h-screen bg-[#F4F4F5] pb-0">
        <HeroSection />
        <TrustBar />
        <Categories />
        <FlashSale />
        <TrendingProducts />
        <PromoBanners />
        <BrandsSection />
        <Recommendations />
        <AppPromotion />
        <Newsletter />
      </main>

      <Footer />
    </>
  );
}
