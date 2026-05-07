"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import SectionHeader from "@/components/shared/SectionHeader";
import ProductCard from "@/components/shared/ProductCard";
import CountdownTimer from "@/components/shared/CountdownTimer";
import { flashSaleProducts } from "@/data/products";

import "swiper/css";
import "swiper/css/navigation";

// Sale ends tomorrow at midnight
const saleEndDate = new Date();
saleEndDate.setDate(saleEndDate.getDate() + 1);
saleEndDate.setHours(23, 59, 59, 0);

export default function FlashSale() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-[#F4F4F5] overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F8F8F8] rounded-[2rem] md:rounded-[3rem] border border-[#E5E5E5] p-6 sm:p-8 md:p-12 lg:p-16 relative">
          <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-[#DC2626]" />
                <SectionHeader
                  title="Flash Sale"
                  subtitle="Grab the best deals before they're gone"
                  className="!mb-0"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <CountdownTimer targetDate={saleEndDate} />
              <div className="hidden md:flex items-center gap-2">
                <button
                  className="flash-prev w-9 h-9 rounded-full border border-[#E5E5E5] bg-white flex items-center justify-center hover:border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-all text-[#525252]"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  className="flash-next w-9 h-9 rounded-full border border-[#E5E5E5] bg-white flex items-center justify-center hover:border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-all text-[#525252]"
                  aria-label="Next"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              prevEl: ".flash-prev",
              nextEl: ".flash-next",
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            spaceBetween={16}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
            className="!overflow-visible pb-12"
          >
            {flashSaleProducts.map((product, index) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
