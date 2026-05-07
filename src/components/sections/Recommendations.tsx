"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import SectionHeader from "@/components/shared/SectionHeader";
import ProductCard from "@/components/shared/ProductCard";
import { recommendedProducts } from "@/data/products";

import "swiper/css";
import "swiper/css/navigation";

export default function Recommendations() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-[#F4F4F5] overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-xl shadow-black/[0.02] border border-[#E5E5E5] p-6 sm:p-8 md:p-12 lg:p-16 relative">
          <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#0A0A0A]" />
              <SectionHeader
                title="Recommended For You"
                subtitle="Based on your browsing history"
                className="!mb-0"
              />
            </div>
            <div className="hidden md:flex items-center gap-2">
              <button
                className="rec-prev w-9 h-9 rounded-full border border-[#E5E5E5] bg-white flex items-center justify-center hover:border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-all text-[#525252]"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                className="rec-next w-9 h-9 rounded-full border border-[#E5E5E5] bg-white flex items-center justify-center hover:border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-all text-[#525252]"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".rec-prev",
              nextEl: ".rec-next",
            }}
            spaceBetween={16}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
            className="!overflow-visible pb-12"
          >
            {recommendedProducts.map((product, index) => (
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
