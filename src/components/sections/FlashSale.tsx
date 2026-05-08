"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight, Zap, Flame, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/shared/ScrollReveal";
import ProductCard from "@/components/product/ProductCard";
import CountdownTimer from "@/components/shared/CountdownTimer";
import { flashSaleProducts } from "@/data/products";

import "swiper/css";
import "swiper/css/navigation";

const saleEndDate = new Date();
saleEndDate.setDate(saleEndDate.getDate() + 1);
saleEndDate.setHours(23, 59, 59, 0);

export default function FlashSale() {
  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-premium">
        <div className="bg-[#F8F8F8] rounded-[48px] border border-gray-100 p-8 md:p-16 relative overflow-hidden">
          {/* Animated Background Element */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-50/50 to-transparent -skew-x-12 translate-x-20 pointer-events-none" />
          
          <div className="relative z-10">
            <ScrollReveal>
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-16">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center gap-2 bg-[#DC2626] text-white text-[10px] font-black px-4 py-2 rounded-full shadow-xl shadow-red-500/20 uppercase tracking-widest">
                      <Zap className="w-4 h-4 fill-white" />
                      Live Now
                    </div>
                    <div className="flex items-center gap-2 bg-white text-[#111111] text-[10px] font-black px-4 py-2 rounded-full border border-gray-100 shadow-sm uppercase tracking-widest">
                      <Flame className="w-4 h-4 text-orange-500" />
                      Limited Stock
                    </div>
                  </div>
                  <h2 className="h2 mb-6">
                    Velocity <span className="text-[#DC2626]">Deals.</span>
                  </h2>
                  <p className="text-body max-w-lg">
                    High-demand inventory at unmatchable price points. Verified authentic brands with express global fulfillment.
                  </p>
                </div>

                <div className="flex flex-col items-start lg:items-end gap-6">
                  <div className="text-[11px] font-black uppercase tracking-[0.3em] text-[#777777]">
                    Opportunity Closes In
                  </div>
                  <CountdownTimer targetDate={saleEndDate} />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative group">
                <Swiper
                  modules={[Navigation, Autoplay]}
                  navigation={{
                    prevEl: ".flash-prev",
                    nextEl: ".flash-next",
                  }}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  spaceBetween={24}
                  slidesPerView={1.2}
                  breakpoints={{
                    640: { slidesPerView: 2.2 },
                    1024: { slidesPerView: 3.2 },
                    1280: { slidesPerView: 4.2 },
                    1536: { slidesPerView: 5 },
                  }}
                  className="!overflow-visible pb-12"
                >
                  {flashSaleProducts.map((product, index) => {
                    // Simulating scarcity data
                    const soldPercent = 45 + (index * 12) % 40;
                    return (
                      <SwiperSlide key={product.id}>
                        <div className="space-y-6">
                          <ProductCard product={product} index={index} />
                          {/* Scarcity Progress Bar */}
                          <div className="px-2 space-y-2.5">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                               <span className="text-[#DC2626] flex items-center gap-1">
                                 <TrendingUp className="w-3 h-3" />
                                 {soldPercent}% Claimed
                               </span>
                               <span className="text-[#777777]">{100 - soldPercent} Left</span>
                            </div>
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                              <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: `${soldPercent}%` }}
                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                                className="h-full bg-gradient-to-r from-[#DC2626] to-[#EF4444] rounded-full shadow-[0_0_8px_rgba(220,38,38,0.4)]"
                              />
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>

                {/* Refined Navigation Controls */}
                <div className="absolute top-1/2 -left-6 -translate-y-1/2 z-20 hidden xl:block">
                  <button className="flash-prev w-14 h-14 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-premium hover:bg-[#111111] hover:text-white transition-all">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                </div>
                <div className="absolute top-1/2 -right-6 -translate-y-1/2 z-20 hidden xl:block">
                  <button className="flash-next w-14 h-14 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-premium hover:bg-[#111111] hover:text-white transition-all">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
