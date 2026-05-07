"use client";

import Image from "next/image";
import ScrollReveal from "@/components/shared/ScrollReveal";
import SectionHeader from "@/components/shared/SectionHeader";
import { categories } from "@/data/categories";

export default function Categories() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-[#F4F4F5] border-t border-[#E5E5E5]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <ScrollReveal>
          <SectionHeader
            title="Shop by Category"
            subtitle="Explore our curated collections across every style and need"
            viewAllHref="/categories"
          />
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {categories.map((category, index) => (
            <ScrollReveal key={category.id} delay={index * 0.06}>
              <a
                href={`/category/${category.slug}`}
                className="group relative block rounded-2xl overflow-hidden bg-white shadow-sm shadow-black/[0.03] border border-[#E5E5E5] transition-all duration-300 hover:border-[#D1D1D1] hover:shadow-xl hover:shadow-black/10 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 cubic-bezier(0.25, 0.46, 0.45, 0.94) group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Label */}
                <div className="absolute bottom-2 left-2 right-2 md:bottom-3 md:left-3 md:right-3 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-white/40 shadow-sm transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="text-sm md:text-base font-bold text-[#0A0A0A]">
                    {category.name}
                  </h3>
                  <p className="text-xs text-[#525252] mt-0.5 font-medium">
                    {category.itemCount.toLocaleString()} items
                  </p>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
