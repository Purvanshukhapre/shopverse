"use client";

import Image from "next/image";
import ScrollReveal from "@/components/shared/ScrollReveal";
import SectionHeader from "@/components/shared/SectionHeader";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

export default function Categories() {
  return (
    <section className="py-20 md:py-32 bg-[#F8F8F8] border-t border-gray-100">
      <div className="max-w-[1600px] mx-auto px-6">
        <ScrollReveal>
          <SectionHeader
            title="Explore Premium Collections"
            subtitle="Curated essentials for a sophisticated lifestyle."
            viewAllHref="/categories"
          />
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <ScrollReveal key={category.id} delay={index * 0.05}>
              <a
                href={`/category/${category.slug}`}
                className="group relative block rounded-[24px] overflow-hidden bg-white border border-gray-100 transition-all duration-500 hover:shadow-premium hover:border-gray-200"
              >
                {/* Image Area */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#F8F8F8]">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 15vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Floating Label (Production Style) */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-xl transition-all duration-500 group-hover:-translate-y-2">
                  <h3 className="text-sm md:text-base font-black text-[#111111] tracking-tight">
                    {category.name}
                  </h3>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-[10px] font-bold text-[#555555] uppercase tracking-widest">
                      {category.itemCount.toLocaleString()} Essentials
                    </p>
                    <div className="w-5 h-5 rounded-full bg-[#111111] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                       </svg>
                    </div>
                  </div>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
