"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/shared/ScrollReveal";
import SectionHeader from "@/components/shared/SectionHeader";
import ProductCard from "@/components/product/ProductCard";
import { trendingProducts } from "@/data/products";

const TABS = ["All", "Fashion", "Electronics", "Home", "Beauty"];

export default function TrendingProducts() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProducts =
    activeTab === "All"
      ? trendingProducts
      : trendingProducts.filter((p) => p.category === activeTab);

  return (
    <section className="section-padding bg-[#F8F8F8]">
      <div className="container-premium">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center mb-16">
            <span className="label-premium mb-4">Market Demand</span>
            <h2 className="h2 mb-4">Trending Now</h2>
            <p className="text-body max-w-xl">Curated global favorites across every major category.</p>
          </div>
        </ScrollReveal>

        {/* Tabs */}
        <ScrollReveal delay={0.1}>
          <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? "text-white"
                    : "text-[#525252] hover:text-[#0A0A0A] hover:bg-[#F8F8F8]"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#0A0A0A] rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All CTA */}
        <ScrollReveal delay={0.2}>
          <div className="flex justify-center mt-16">
            <a
              href="/trending"
              className="h-14 px-12 bg-[#111111] text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-black transition-all flex items-center justify-center shadow-xl shadow-black/10"
            >
              Browse All Trends
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
