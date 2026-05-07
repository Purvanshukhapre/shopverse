"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { promoBanners } from "@/data/banners";

export default function PromoBanners() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-[#F4F4F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {promoBanners.map((banner, index) => (
              <ScrollReveal
                key={banner.id}
                delay={index * 0.1}
                className={banner.size === "large" ? "md:col-span-1" : "md:col-span-1"}
              >
                <a
                  href={banner.ctaLink}
                  className="group relative block rounded-xl overflow-hidden border border-[#E5E5E5] hover:border-[#D1D1D1] transition-all duration-300 hover:shadow-lg"
                >
                  <div className="relative h-[220px] sm:h-[260px] md:h-[300px] overflow-hidden">
                    <Image
                      src={banner.image}
                      alt={banner.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-colors duration-300" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-7">
                      <span className="text-xs font-semibold text-white/80 uppercase tracking-[0.15em] mb-1.5">
                        {banner.subtitle}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-1.5">
                        {banner.title}
                      </h3>
                      <p className="text-sm text-white/70 mb-4 max-w-xs">
                        {banner.description}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white group-hover:gap-2.5 transition-all">
                        {banner.cta}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
