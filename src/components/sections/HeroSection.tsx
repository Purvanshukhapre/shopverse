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
    <section className="relative bg-[#F8F8F8]">
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
            <div className="relative h-[650px] md:h-[800px] lg:h-[900px] overflow-hidden group">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                sizes="100vw"
                className="object-cover scale-100 transition-transform duration-[20000ms] ease-out group-hover:scale-110"
              />
              
              {/* Cinematic Vignette & Depth */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
              <div className="absolute inset-0 bg-black/10 z-0" />

              {/* Dramatic Content Layer */}
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="container-premium w-full">
                  <div className="max-w-5xl">
                    <motion.div 
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="flex items-center gap-3 mb-8"
                    >
                      <div className="h-px w-12 bg-white/40" />
                      <span className="text-[11px] font-black text-white uppercase tracking-[0.5em]">
                        {slide.subtitle}
                      </span>
                    </motion.div>
                    
                    <motion.h2 
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
                      className="text-6xl sm:text-7xl md:text-8xl lg:text-[110px] font-black text-white leading-[0.95] tracking-tighter mb-10"
                    >
                      {slide.title.split(' ').map((word, i) => (
                        <span key={i} className={i === 1 ? "text-white/40 block md:inline" : "block md:inline"}>
                          {word}{' '}
                        </span>
                      ))}
                    </motion.h2>

                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl leading-relaxed font-medium"
                    >
                      {slide.description}
                    </motion.p>
                    
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="flex flex-wrap items-center gap-6"
                    >
                      <a
                        href={slide.ctaLink}
                        className="h-16 px-12 bg-white text-[#111111] font-black text-xs uppercase tracking-[0.3em] rounded-full flex items-center gap-4 hover:bg-[#DC2626] hover:text-white transition-all duration-500 shadow-2xl shadow-black/20 group"
                      >
                        {slide.cta}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                      </a>
                      <button className="h-16 px-10 border border-white/30 text-white font-black text-xs uppercase tracking-[0.3em] rounded-full flex items-center gap-3 hover:bg-white/10 backdrop-blur-sm transition-all duration-500">
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

      {/* Floating Insight Cards (High Density) */}
      <div className="container-premium -mt-24 md:-mt-32 lg:-mt-40 relative z-30 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
              className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-premium hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group overflow-hidden relative"
            >
              <div className="relative z-10">
                <div className={cn("w-12 h-12 rounded-2xl bg-[#F8F8F8] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500", card.color)}>
                  <card.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-[#111111] mb-2 tracking-tight group-hover:text-[#DC2626] transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-[#777777] font-medium tracking-tight">
                  {card.desc}
                </p>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#F8F8F8] rounded-full group-hover:scale-150 transition-transform duration-700 -z-0" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
