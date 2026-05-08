"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, TrendingUp, History, ArrowRight } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setSearchOpen } from "@/store/slices/uiSlice";
import { allProducts } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

const TRENDING_SEARCHES = ["iPhone 15 Pro", "AirPods Max", "Mechanical Keyboard", "Nike Sneakers", "Coffee Machine"];

export default function SearchOverlay() {
  const dispatch = useAppDispatch();
  const { isSearchOpen } = useAppSelector((state) => state.ui);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isSearchOpen]);

  const results = query.trim() === "" 
    ? [] 
    : allProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6);

  const close = () => {
    dispatch(setSearchOpen(false));
    setQuery("");
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white z-[100] overflow-y-auto"
        >
          {/* Header */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 h-24 md:h-32 flex items-center gap-6">
            <div className="relative flex-grow">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products, brands and more..."
                className="w-full h-16 pl-10 pr-4 bg-transparent border-b-2 border-gray-100 focus:border-black outline-none text-2xl md:text-3xl font-black tracking-tighter placeholder:text-gray-200 transition-all"
              />
            </div>
            <button 
              onClick={close}
              className="p-3 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Results */}
              <div className="lg:col-span-8">
                {query.trim() === "" ? (
                  <div className="space-y-12">
                    <section>
                      <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 mb-6">
                        <TrendingUp className="w-4 h-4" />
                        Trending Searches
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {TRENDING_SEARCHES.map(s => (
                          <button 
                            key={s}
                            onClick={() => setQuery(s)}
                            className="px-6 py-3 bg-gray-50 hover:bg-black hover:text-white rounded-full text-sm font-bold transition-all border border-gray-100"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </section>
                    
                    <section>
                      <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 mb-6">
                        <History className="w-4 h-4" />
                        Recent Searches
                      </h3>
                      <div className="space-y-2">
                        {["Sony WH-1000XM5", "Mechanical Keyboard"].map(s => (
                          <button 
                            key={s}
                            onClick={() => setQuery(s)}
                            className="flex items-center gap-3 w-full text-left p-3 hover:bg-gray-50 rounded-xl transition-colors text-gray-600 font-medium"
                          >
                            <History className="w-4 h-4 text-gray-300" />
                            {s}
                          </button>
                        ))}
                      </div>
                    </section>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">
                        Search Results for &quot;{query}&quot;
                      </h3>
                      <span className="text-xs font-bold text-black">{results.length} results found</span>
                    </div>

                    {results.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {results.map((product, i) => (
                          <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <Link 
                              href={`/product/${product.slug}`}
                              onClick={close}
                              className="flex gap-4 p-4 rounded-3xl border border-gray-100 hover:border-black/10 hover:bg-gray-50 transition-all group"
                            >
                              <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-white flex-shrink-0">
                                <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                              </div>
                              <div className="flex flex-col justify-center">
                                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">{product.category}</p>
                                <h4 className="text-sm font-black text-[#0A0A0A] line-clamp-1 leading-tight group-hover:text-primary transition-colors">{product.name}</h4>
                                <p className="text-base font-black text-black mt-2">{formatPrice(product.price)}</p>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-20 text-center">
                        <p className="text-gray-400 text-lg">No products found matching your search.</p>
                      </div>
                    )}

                    {results.length > 0 && (
                      <Link 
                        href={`/shop?q=${query}`}
                        onClick={close}
                        className="flex items-center justify-center gap-2 w-full py-4 bg-[#0A0A0A] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-800 transition-all shadow-xl"
                      >
                        View All Results
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                )}
              </div>

              {/* Sidebar Promo */}
              <div className="lg:col-span-4 hidden lg:block">
                <div className="bg-gray-900 rounded-[3rem] p-10 h-[500px] relative overflow-hidden text-white flex flex-col justify-end group">
                  <Image 
                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80" 
                    alt="Promo" 
                    fill 
                    className="object-cover opacity-50 group-hover:scale-110 transition-transform duration-[2s]" 
                  />
                  <div className="relative z-10">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Editor's Pick</p>
                    <h4 className="text-3xl font-black tracking-tighter leading-none mb-6">Upgrade Your Desk Setup</h4>
                    <Link 
                      href="/shop?category=Electronics"
                      onClick={close}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full text-xs font-black uppercase tracking-widest hover:bg-gray-200 transition-all"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
