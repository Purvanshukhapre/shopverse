"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { ArrowRight, Sparkles, TrendingUp, Zap } from "lucide-react";
import { heroSlides } from "@/data/banners";
import { cn } from "@/lib/utils";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function HeroSection() {
  return (
    <section className="relative bg-[#F8F8F8] overflow-hidden">
      {/* Main Hero Carousel */}
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          bulletActiveClass: "!bg-white !opacity-100 !w-12",
          bulletClass: "inline-block w-3 h-1.5 rounded-full bg-white/30 mx-1.5 cursor-pointer transition-all duration-500",
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        className="w-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-[550px] md:h-[750px] lg:h-[850px] overflow-hidden group">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                sizes="100vw"
                className="object-cover scale-100 transition-transform duration-[20000ms] ease-out group-hover:scale-110"
              />
              
              {/* Cinematic Vignette & Depth (Refined Blending) */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
              <div className="absolute inset-0 bg-black/10 z-0" />

              {/* Dramatic Content Layer (Wider Authority) */}
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="container-premium w-full">
                  <div className="max-w-6xl"> {/* Increased max-width */}
                    <motion.div 
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="flex items-center gap-4 mb-8"
                    >
                      <div className="h-px w-16 bg-white/40" />
                      <span className="label-premium !text-white/70">
                        {slide.subtitle}
                      </span>
                    </motion.div>
                    
                    <motion.h2 
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
                      className="text-6xl sm:text-7xl md:text-8xl lg:text-[120px] font-bold text-white leading-[0.9] tracking-tighter mb-12"
                    >
                      {slide.title.split(' ').map((word, i) => (
                        <span key={i} className={i === 1 ? "text-white/30 block md:inline" : "block md:inline"}>
                          {word}{' '}
                        </span>
                      ))}
                    </motion.h2>

                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="text-lg md:text-xl text-white/60 mb-14 max-w-3xl leading-relaxed font-medium tracking-tight"
                    >
                      {slide.description}
                    </motion.p>
                    
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="flex flex-wrap items-center gap-8"
                    >
                      <a
                        href={slide.ctaLink}
                        className="btn-premium btn-primary !h-[64px] !px-14 !bg-white !text-black hover:!bg-[#DC2626] hover:!text-white shadow-premium hover:shadow-premium-hover"
                      >
                        {slide.cta}
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                      </a>
                      <button className="btn-premium !h-[64px] !px-12 border border-white/20 text-white hover:bg-white/10 backdrop-blur-sm">
                        View Lookbook
                      </button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Floating Insight Cards (Refined Elevation) */}
      <div className="container-premium -mt-20 md:-mt-28 relative z-30 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Limited Drops", desc: "Premium releases only", icon: Sparkles, color: "text-amber-500" },
            { title: "Market Trends", desc: "Top global analytics", icon: TrendingUp, color: "text-blue-500" },
            { title: "Flash Access", desc: "Early member perks", icon: Zap, color: "text-[#DC2626]" },
            { title: "Global Sync", desc: "Real-time inventory", icon: ArrowRight, color: "text-emerald-500" },
          ].map((card, i) => (
            <motion.a
              key={card.title}
              href="#"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-premium hover:shadow-premium-hover hover:-translate-y-3 transition-all duration-700 group overflow-hidden relative"
            >
              <div className="relative z-10">
                <div className={cn("w-14 h-14 rounded-2xl bg-[#F8F8F8] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-700", card.color)}>
                  <card.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-[#111111] mb-3 tracking-tighter group-hover:text-[#DC2626] transition-colors">
                  {card.title}
                </h3>
                <p className="text-[15px] text-[#777777] font-medium tracking-tight leading-relaxed">
                  {card.desc}
                </p>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#F8F8F8] rounded-full group-hover:scale-150 transition-transform duration-1000 -z-0" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
