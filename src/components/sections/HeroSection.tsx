"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { ArrowRight } from "lucide-react";
import { heroSlides } from "@/data/banners";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function HeroSection() {
  return (
    <section className="relative">
      {/* Main Hero Carousel */}
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          bulletActiveClass: "!bg-[#0A0A0A] !opacity-100 !w-8",
          bulletClass:
            "inline-block w-2.5 h-2.5 rounded-full bg-[#0A0A0A]/30 mx-1 cursor-pointer transition-all duration-300",
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        className="w-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-[400px] sm:h-[480px] md:h-[600px] lg:h-[700px] overflow-hidden group">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                sizes="100vw"
                className="object-cover scale-105 transition-transform duration-[10000ms] ease-out group-hover:scale-110"
              />
              {/* Overlay - Cinematic linear gradient instead of flat black */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 w-full">
                  <div className="max-w-xl">
                    <span className="inline-block text-xs md:text-sm font-semibold text-white/90 uppercase tracking-[0.3em] mb-4 md:mb-6">
                      {slide.subtitle}
                    </span>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-4 md:mb-6">
                      {slide.title}
                    </h2>
                    <p className="text-sm md:text-base text-white/80 mb-5 md:mb-8 max-w-md leading-relaxed">
                      {slide.description}
                    </p>
                    <a
                      href={slide.ctaLink}
                      className="inline-flex items-center gap-2 bg-white text-[#0A0A0A] px-6 md:px-8 py-3 md:py-3.5 text-sm font-semibold rounded-lg hover:bg-[#F8F8F8] transition-colors group"
                    >
                      {slide.cta}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Promotional Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 -mt-16 md:-mt-24 lg:-mt-32 relative z-10 pb-8 md:pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { title: "New Arrivals", desc: "Fresh drops daily", color: "bg-white" },
            { title: "Trending Now", desc: "Most popular picks", color: "bg-white" },
            { title: "Best Sellers", desc: "Customer favorites", color: "bg-white" },
            { title: "Clearance", desc: "Up to 70% off", color: "bg-white" },
          ].map((card) => (
            <a
              key={card.title}
              href="#"
              className={`${card.color} rounded-2xl md:rounded-[1.5rem] p-5 md:p-8 border border-white shadow-2xl shadow-black/10 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden`}
            >
              <h3 className="text-sm md:text-base font-semibold text-[#0A0A0A] group-hover:text-[#525252] transition-colors">
                {card.title}
              </h3>
              <p className="text-xs text-[#9CA3AF] mt-0.5">{card.desc}</p>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-[#0A0A0A] mt-2 md:mt-3">
                Shop now
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
