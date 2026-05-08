"use client";

import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { promoBanners } from "@/data/banners";

export default function PromoBanners() {
  return (
    <section className="section-padding bg-[#F8F8F8]">
      <div className="container-premium">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {promoBanners.map((banner, index) => (
              <ScrollReveal
                key={banner.id}
                delay={index * 0.1}
                className="group"
              >
                <a
                  href={banner.ctaLink}
                  className="relative block rounded-[32px] overflow-hidden border border-gray-100 shadow-soft transition-all duration-500 hover:shadow-premium hover:border-gray-200"
                >
                  <div className="relative h-[300px] md:h-[400px] overflow-hidden">
                    <Image
                      src={banner.image}
                      alt={banner.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:via-black/40 transition-colors duration-500" />

                    {/* Badge */}
                    <div className="absolute top-6 left-6 flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                       <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                       <span className="text-[10px] font-black text-white uppercase tracking-widest">Limited Offer</span>
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                      <span className="text-[11px] font-black text-white/60 uppercase tracking-[0.25em] mb-3">
                        {banner.subtitle}
                      </span>
                      <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-4 leading-tight max-w-sm">
                        {banner.title}
                      </h3>
                      <p className="text-base text-white/70 mb-8 max-w-xs font-medium leading-relaxed">
                        {banner.description}
                      </p>
                      <div className="inline-flex items-center gap-3 bg-white text-[#111111] px-6 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest group-hover:gap-5 transition-all shadow-xl shadow-black/20 self-start">
                        {banner.cta}
                        <ArrowRight className="w-4 h-4" />
                      </div>
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
