"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
            <div className="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden group">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                sizes="100vw"
                className="object-cover scale-100 transition-transform duration-[12000ms] ease-out group-hover:scale-105"
              />
              {/* Overlay - Sophisticated vignette for readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 w-full">
                  <div className="max-w-4xl">
                    <motion.span 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="inline-block text-[10px] md:text-xs font-bold text-white/70 uppercase tracking-[0.4em] mb-4 md:mb-6"
                    >
                      {slide.subtitle}
                    </motion.span>
                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-6 md:mb-8"
                    >
                      {slide.title}
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="text-base md:text-lg text-white/80 mb-8 md:mb-12 max-w-xl leading-relaxed font-medium"
                    >
                      {slide.description}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    >
                      <a
                        href={slide.ctaLink}
                        className="inline-flex items-center gap-3 bg-white text-[#0A0A0A] px-8 md:px-10 py-4 md:py-5 text-sm font-bold rounded-full hover:bg-black hover:text-white transition-all duration-300 group"
                      >
                        {slide.cta}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </motion.div>
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
              className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 border border-[#E5E5E5] shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="relative z-10">
                <h3 className="text-base md:text-lg font-bold text-[#0A0A0A] group-hover:text-[#525252] transition-colors mb-1">
                  {card.title}
                </h3>
                <p className="text-xs md:text-sm text-[#9CA3AF] font-medium mb-4 md:mb-6">
                  {card.desc}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] md:text-xs font-bold text-[#0A0A0A] uppercase tracking-widest group-hover:underline decoration-2 underline-offset-4">
                    Explore
                  </span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-[#0A0A0A] rounded-full" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
