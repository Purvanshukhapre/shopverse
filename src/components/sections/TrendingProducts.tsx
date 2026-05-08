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
    <section className="py-16 md:py-24 lg:py-32 bg-[#F4F4F5]">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-xl shadow-black/[0.02] border border-[#E5E5E5] p-6 sm:p-8 md:p-12 lg:p-16">
          <ScrollReveal>
          <SectionHeader
            title="Trending Now"
            subtitle="The most popular products loved by our customers"
            viewAllHref="/trending"
            viewAllText="View All Products"
          />
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
          <div className="flex justify-center mt-10">
            <a
              href="/trending"
              className="px-8 py-3 border-2 border-[#0A0A0A] text-[#0A0A0A] text-sm font-semibold rounded-lg hover:bg-[#0A0A0A] hover:text-white transition-all duration-300"
            >
              View All Products
            </a>
          </div>
        </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
