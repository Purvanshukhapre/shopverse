"use client";

import { useState, useMemo } from "react";
import { Grid, List, SlidersHorizontal, X, ArrowUpDown, Search, LayoutGrid, ChevronDown } from "lucide-react";
import { Product } from "@/types";
import ProductCard from "@/components/product/ProductCard";
import FilterSidebar from "@/components/search/FilterSidebar";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import AppDownloadStrip from "./AppDownloadStrip";
import { allProducts } from "@/data/products";
import { cn } from "@/lib/utils";

interface ShopClientProps {
  products: Product[];
  hideHeader?: boolean;
  title?: string;
  categoryName?: string;
}

const SORT_OPTIONS = [
  { id: "featured",   label: "Relevance" },
  { id: "newest",     label: "Newest First" },
  { id: "price-low",  label: "Price: Low to High" },
  { id: "price-high", label: "Price: High to Low" },
  { id: "rating",     label: "Avg. Customer Review" },
];

export default function ShopClient({ products, hideHeader, title, categoryName }: ShopClientProps) {
  const [layout, setLayout]                     = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy]                     = useState("featured");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showSortMenu, setShowSortMenu]         = useState(false);
  const [activeFilters, setActiveFilters]       = useState<string[]>([]);

  const categories = useMemo(() => Array.from(new Set(allProducts.map(p => p.category))), []);
  const brands      = ["Sony", "Apple", "Nike", "Samsung", "Adidas", "Canon", "Levi's"];

  const sortedProducts = useMemo(() => {
    let result = [...products];
    if (sortBy === "price-low")  result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "rating")     result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [products, sortBy]);

  const currentSortLabel = SORT_OPTIONS.find(o => o.id === sortBy)?.label || "Relevance";

  return (
    <div className="bg-[#F8F8F8] min-h-screen">
      {/* ── Top Bar (Authority Breadcrumb) ── */}
      {!hideHeader && (
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center gap-3 text-[11px] font-bold text-[#777777] uppercase tracking-[0.15em]">
            <Link href="/" className="hover:text-[#111111] transition-colors">Home</Link>
            <div className="w-1 h-1 rounded-full bg-gray-200" />
            <Link href="/shop" className="hover:text-[#111111] transition-colors">Shop</Link>
            {categoryName && (
              <>
                <div className="w-1 h-1 rounded-full bg-gray-200" />
                <span className="text-[#111111]">{categoryName}</span>
              </>
            )}
          </div>
        </div>
      )}

      <div className="max-w-[1600px] mx-auto flex items-start">

        {/* ── Sidebar (Sticky with Authority) ── */}
        <aside
          className="hidden lg:block border-r border-gray-100 bg-white"
          style={{
            width: 300,
            flexShrink: 0,
            position: "sticky",
            top: "var(--navbar-h, 160px)",
            height: "calc(100vh - var(--navbar-h, 160px))",
            overflowY: "auto",
          }}
        >
          <FilterSidebar
            categories={categories}
            brands={brands}
            onFilterChange={() => {}}
            activeFilters={activeFilters}
            onFiltersChange={setActiveFilters}
          />
        </aside>

        {/* ── Main Grid Area ── */}
        <main className="flex-1 min-w-0">

          {/* Toolbar (Standardized + Alignment) */}
          <div
            className="bg-white border-b border-gray-100 px-6 h-16 flex items-center justify-between sticky top-[var(--navbar-h,160px)] z-30 shadow-sm"
          >
            <div className="flex items-center gap-6">
              {/* Mobile filter trigger */}
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#111111] border-2 border-[#111111] px-4 py-2 rounded-xl hover:bg-gray-50 transition-all"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Filters
              </button>

              <div className="flex items-center gap-2 text-[13px] font-bold text-[#555555]">
                <span className="text-[#111111] font-black">{products.length.toLocaleString()}</span>
                <span>Items Found</span>
              </div>

              {/* Active Pills (Rounded-full + Premium Polish) */}
              <div className="hidden xl:flex items-center gap-2 border-l border-gray-100 pl-6 ml-2">
                {activeFilters.slice(0, 3).map(f => (
                  <button
                    key={f}
                    onClick={() => setActiveFilters(prev => prev.filter(x => x !== f))}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 text-[#111111] text-[10px] font-black uppercase tracking-widest rounded-full hover:border-[#DC2626] hover:text-[#DC2626] transition-all"
                  >
                    {f}
                    <X className="w-3 h-3" />
                  </button>
                ))}
                {activeFilters.length > 3 && (
                  <span className="text-[10px] font-black text-[#777777]">+{activeFilters.length - 3} More</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Sort Selection */}
              <div className="relative">
                <button
                  onClick={() => setShowSortMenu(!showSortMenu)}
                  className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-[#111111] bg-gray-50 border border-transparent px-4 py-2.5 rounded-xl hover:bg-gray-100 transition-all"
                >
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  Sort By: {currentSortLabel}
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-300", showSortMenu && "rotate-180")} />
                </button>
                
                <AnimatePresence>
                  {showSortMenu && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowSortMenu(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 p-2 overflow-hidden"
                      >
                        {SORT_OPTIONS.map(option => (
                          <button
                            key={option.id}
                            onClick={() => { setSortBy(option.id); setShowSortMenu(false); }}
                            className={cn(
                              "w-full text-left px-4 py-3 text-[11px] font-bold uppercase tracking-widest transition-all rounded-lg",
                              sortBy === option.id ? "bg-[#111111] text-white" : "text-[#555555] hover:bg-gray-50 hover:text-[#111111]"
                            )}
                          >
                            {option.label}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Layout Toggle */}
              <div className="hidden sm:flex items-center bg-gray-50 p-1 rounded-xl border border-gray-100">
                <button
                  onClick={() => setLayout("grid")}
                  className={cn(
                    "p-2 rounded-lg transition-all",
                    layout === "grid" ? "bg-white shadow-sm text-[#111111]" : "text-[#AAAAAA] hover:text-[#555555]"
                  )}
                >
                  <LayoutGrid className="w-4.5 h-4.5" />
                </button>
                <button
                  onClick={() => setLayout("list")}
                  className={cn(
                    "p-2 rounded-lg transition-all",
                    layout === "list" ? "bg-white shadow-sm text-[#111111]" : "text-[#AAAAAA] hover:text-[#555555]"
                  )}
                >
                  <List className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid (Systematic Spacing) */}
          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              {sortedProducts.length === 0 ? (
                <motion.div 
                   key="empty"
                   initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                   className="flex flex-col items-center justify-center py-32 text-center"
                >
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-8">
                    <Search className="w-10 h-10 text-gray-300" />
                  </div>
                  <h3 className="text-2xl font-black text-[#111111] mb-2">No Matching Results</h3>
                  <p className="text-[#555555] text-sm max-w-sm mb-8">We couldn't find any products matching your current filters. Try relaxing some criteria.</p>
                  <button
                    onClick={() => setActiveFilters([])}
                    className="btn-premium btn-primary px-10"
                  >
                    Reset All Filters
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="grid"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className={cn(
                    "gap-6 md:gap-8",
                    layout === "grid"
                      ? "grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
                      : "flex flex-col"
                  )}
                >
                  {sortedProducts.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} layout={layout} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination (Alignment Fix) */}
            <div className="mt-16 flex flex-col items-center gap-6 border-t border-gray-100 pt-12 pb-12">
              <div className="flex items-center gap-2">
                <button className="w-12 h-12 flex items-center justify-center border border-gray-100 text-[#555555] font-black text-xs rounded-xl hover:border-[#111111] hover:text-[#111111] transition-all">←</button>
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    className={cn(
                      "w-12 h-12 flex items-center justify-center border font-black text-xs rounded-xl transition-all",
                      page === 1
                        ? "border-[#111111] bg-[#111111] text-white shadow-xl shadow-black/10"
                        : "border-gray-100 text-[#555555] hover:border-gray-300 hover:text-[#111111]"
                    )}
                  >
                    {page}
                  </button>
                ))}
                <button className="w-12 h-12 flex items-center justify-center border border-gray-100 text-[#555555] font-black text-xs rounded-xl hover:border-[#111111] hover:text-[#111111] transition-all">→</button>
              </div>
              <p className="text-[11px] font-black text-[#AAAAAA] uppercase tracking-widest">
                Displaying <span className="text-[#111111]">1–{products.length}</span> of <span className="text-[#111111]">{products.length}</span> Premium Items
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* Merchandising (Depth System) */}
      <div className="border-t border-gray-100 bg-white">
        <AppDownloadStrip />
      </div>

      {/* Mobile Drawer (Consistent Radius) */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-[85%] sm:w-[400px] bg-white z-[101] shadow-2xl flex flex-col rounded-l-[32px] overflow-hidden"
            >
              <div className="px-6 py-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-black uppercase tracking-widest text-[#111111]">Refine Results</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-[#111111]" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <FilterSidebar
                  categories={categories}
                  brands={brands}
                  onFilterChange={() => {}}
                  activeFilters={activeFilters}
                  onFiltersChange={setActiveFilters}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
