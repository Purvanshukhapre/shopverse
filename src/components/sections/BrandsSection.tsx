"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { brands } from "@/data/brands";

export default function BrandsSection() {
  // Unique list to avoid "repetitive filler" feel
  const uniqueBrands = Array.from(new Set(brands.map(b => b.name))).map(name => {
    return brands.find(b => b.name === name)!;
  });

  return (
    <section className="py-20 bg-white border-y border-gray-50 overflow-hidden">
      <div className="container-premium mb-16">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center">
            <span className="label-premium mb-4">Official Retail Partners</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#111111] tracking-tight">
              Curated from Global Leaders
            </h2>
          </div>
        </ScrollReveal>
      </div>

      <div className="relative flex overflow-hidden group">
        <div className="flex animate-marquee whitespace-nowrap gap-20 items-center">
          {[...uniqueBrands, ...uniqueBrands, ...uniqueBrands].map((brand, index) => (
            <div 
              key={`${brand.id}-${index}`} 
              className="flex items-center gap-3 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer group/brand"
            >
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center font-black text-xl group-hover/brand:bg-[#111111] group-hover/brand:text-white transition-colors">
                {brand.name[0]}
              </div>
              <span className="text-2xl font-black tracking-tighter text-[#111111]">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
