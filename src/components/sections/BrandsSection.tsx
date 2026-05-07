"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { brands } from "@/data/brands";

import "swiper/css";
import "swiper/css/free-mode";

export default function BrandsSection() {
  return (
    <section className="py-16 md:py-24 border-y border-[#F3F4F6] bg-[#FAFAFA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 mb-8 md:mb-12">
        <ScrollReveal>
          <h2 className="text-center text-sm font-bold text-[#9CA3AF] uppercase tracking-widest">
            Trusted by Top Brands
          </h2>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.1}>
        <Swiper
          modules={[Autoplay, FreeMode]}
          freeMode={true}
          speed={3000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          loop={true}
          slidesPerView="auto"
          spaceBetween={40}
          breakpoints={{
            640: { spaceBetween: 60 },
            1024: { spaceBetween: 80 },
          }}
          className="brand-marquee !pb-2"
        >
          {[...brands, ...brands].map((brand, index) => (
            <SwiperSlide key={`${brand.id}-${index}`} className="!w-auto">
              <div className="w-[100px] md:w-[120px] h-[40px] md:h-[50px] relative flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <div className="text-xl font-bold text-[#525252] select-none whitespace-nowrap">
                  {brand.name}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </ScrollReveal>
    </section>
  );
}
