"use client";

import { useState, useMemo, useRef } from "react";
import { Grid, List, SlidersHorizontal, ChevronDown, X, ArrowUpDown, Search, LayoutGrid } from "lucide-react";
import { Product } from "@/types";
import ProductCard from "@/components/product/ProductCard";
import FilterSidebar from "@/components/search/FilterSidebar";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ProductRow from "./ProductRow";
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

  const categories = useMemo(() => Array.from(new Set(products.map(p => p.category))), [products]);
  const brands      = ["Sony", "Apple", "Nike", "Samsung", "Adidas", "Canon", "Levi's"];

  const sortedProducts = useMemo(() => {
    let result = [...products];
    if (sortBy === "price-low")  result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "rating")     result.sort((a, b) => b.rating - a.rating);
    if (sortBy === "newest")     result.sort((a, b) => parseInt(b.id.split("-")[1]) - parseInt(a.id.split("-")[1]));
    return result;
  }, [products, sortBy]);

  const currentSortLabel = SORT_OPTIONS.find(o => o.id === sortBy)?.label || "Relevance";

  return (
    <div className="bg-[#F4F4F5] min-h-screen">
      {/* ── Top Bar: Breadcrumb + Page Title ── */}
      {!hideHeader && (
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-xs text-gray-500">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            <Link href="/shop" className="hover:text-black transition-colors">Shop</Link>
            {categoryName && (
              <>
                <span className="text-gray-300">/</span>
                <span className="text-gray-900 font-semibold">{categoryName}</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Main Shop Layout (flex row, sidebar + content) ── */}
      <div className="max-w-[1600px] mx-auto flex items-start">

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            LEFT SIDEBAR — truly sticky with its own scroll
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <aside
          className="hidden lg:block"
          style={{
            width: 268,
            flexShrink: 0,
            position: "sticky",
            top: "var(--navbar-h, 150px)",
            height: "calc(100vh - var(--navbar-h, 150px))",
            overflowY: "auto",
            overflowX: "hidden",
            backgroundColor: "#fff",
            borderRight: "1px solid #e5e7eb",
            scrollbarWidth: "thin",
            scrollbarColor: "#d1d5db #f9f9f9",
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

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            RIGHT MAIN CONTENT — scrolls independently
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <main className="flex-1 min-w-0">

          {/* ── Toolbar: Sort + Layout + Filter (mobile) ── */}
          <div
            className="bg-white border-b border-gray-100 px-4 sm:px-6 py-3 flex items-center gap-4"
            style={{
              position: "sticky",
              top: "var(--navbar-h, 150px)",
              zIndex: 30,
            }}
          >
            {/* Mobile filter trigger */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 text-xs font-bold text-gray-700 border border-gray-200 px-3 py-2 rounded-lg hover:border-black transition-all"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filters
              {activeFilters.length > 0 && (
                <span className="w-4 h-4 bg-[#0A0A0A] text-white text-[9px] font-black rounded-full flex items-center justify-center">
                  {activeFilters.length}
                </span>
              )}
            </button>

            <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
              <span className="font-black text-gray-900">{products.length.toLocaleString()}</span>
              <span>results {title ? `for "${title}"` : ""}</span>
            </div>

            {/* Active filter pills */}
            {activeFilters.length > 0 && (
              <div className="hidden sm:flex flex-wrap items-center gap-2 flex-1 overflow-hidden">
                {activeFilters.slice(0, 3).map(f => (
                  <button
                    key={f}
                    onClick={() => setActiveFilters(prev => prev.filter(x => x !== f))}
                    className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 text-gray-700 text-[10px] font-bold rounded-full hover:bg-red-50 hover:text-red-600 transition-all"
                  >
                    {f}
                    <X className="w-3 h-3" />
                  </button>
                ))}
                {activeFilters.length > 3 && (
                  <span className="text-[10px] text-gray-400 font-medium">+{activeFilters.length - 3} more</span>
                )}
                <button
                  onClick={() => setActiveFilters([])}
                  className="text-[10px] font-black text-red-500 hover:text-red-700 underline underline-offset-2"
                >
                  Clear All
                </button>
              </div>
            )}

            <div className="ml-auto flex items-center gap-3">
              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSortMenu(!showSortMenu)}
                  className="flex items-center gap-2 text-xs font-semibold text-gray-700 border border-gray-200 px-3.5 py-2 rounded-lg hover:border-gray-400 transition-all bg-white min-w-[180px] justify-between"
                >
                  <div className="flex items-center gap-1.5">
                    <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-gray-900 font-bold">Sort:</span>
                    <span className="text-gray-600">{currentSortLabel}</span>
                  </div>
                  <ChevronDown className={cn("w-3.5 h-3.5 text-gray-400 transition-transform", showSortMenu && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {showSortMenu && (
                    <>
                      <div className="fixed inset-0 z-30" onClick={() => setShowSortMenu(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        className="absolute top-full right-0 mt-1.5 w-56 bg-white border border-gray-200 rounded-xl shadow-2xl shadow-black/10 py-1.5 z-40 overflow-hidden"
                      >
                        {SORT_OPTIONS.map(option => (
                          <button
                            key={option.id}
                            onClick={() => { setSortBy(option.id); setShowSortMenu(false); }}
                            className={cn(
                              "w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors flex items-center justify-between",
                              sortBy === option.id
                                ? "bg-gray-50 text-gray-900 font-black"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            )}
                          >
                            {option.label}
                            {sortBy === option.id && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A]" />
                            )}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Layout switcher */}
              <div className="hidden sm:flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setLayout("grid")}
                  className={cn(
                    "p-2 transition-all",
                    layout === "grid" ? "bg-[#0A0A0A] text-white" : "bg-white text-gray-400 hover:text-gray-700"
                  )}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setLayout("list")}
                  className={cn(
                    "p-2 transition-all",
                    layout === "list" ? "bg-[#0A0A0A] text-white" : "bg-white text-gray-400 hover:text-gray-700"
                  )}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ── Product Grid ── */}
          <div className="p-4 sm:p-6">
            {sortedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <Search className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 text-sm mb-6">Try adjusting your filters or search terms.</p>
                <button
                  onClick={() => setActiveFilters([])}
                  className="px-6 py-3 bg-[#0A0A0A] text-white text-xs font-black uppercase tracking-wider rounded-lg hover:bg-gray-800 transition-all"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={cn(
                "gap-3 sm:gap-4",
                layout === "grid"
                  ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
                  : "flex flex-col"
              )}>
                {sortedProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} layout={layout} />
                ))}
              </div>
            )}

            {/* ── Pagination ── */}
            <div className="mt-12 flex flex-col items-center gap-5 border-t border-gray-200 pt-10 pb-6">
              <div className="flex items-center gap-1.5">
                <button className="w-9 h-9 flex items-center justify-center border border-gray-200 text-gray-500 font-bold text-xs rounded-lg hover:border-gray-900 hover:text-gray-900 transition-all">‹</button>
                {[1, 2, 3, "...", 12].map((page, i) => (
                  <button
                    key={i}
                    className={cn(
                      "w-9 h-9 flex items-center justify-center border font-bold text-xs rounded-lg transition-all",
                      page === 1
                        ? "border-[#0A0A0A] bg-[#0A0A0A] text-white"
                        : page === "..."
                          ? "border-transparent text-gray-400 cursor-default"
                          : "border-gray-200 text-gray-600 hover:border-gray-900 hover:text-gray-900"
                    )}
                  >
                    {page}
                  </button>
                ))}
                <button className="w-9 h-9 flex items-center justify-center border border-gray-200 text-gray-500 font-bold text-xs rounded-lg hover:border-gray-900 hover:text-gray-900 transition-all">›</button>
              </div>
              <p className="text-xs text-gray-400 font-medium">
                Showing <span className="font-bold text-gray-700">1–{products.length}</span> of <span className="font-bold text-gray-700">{allProducts.length}</span> results
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* ── Bottom Merchandising ── */}
      <div className="border-t border-gray-200 bg-white">
        <ProductRow title="Recently Viewed" subtitle="Based on your browsing" products={allProducts.slice(0, 8)} />
        <AppDownloadStrip />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MOBILE FILTER DRAWER
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 bg-black/50 z-[100]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-[300px] bg-white z-[101] shadow-2xl flex flex-col"
            >
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50 flex-shrink-0">
                <h2 className="text-sm font-black uppercase tracking-widest text-gray-900">Filters</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
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
              <div className="p-4 border-t border-gray-100 flex gap-3 flex-shrink-0">
                <button
                  onClick={() => setActiveFilters([])}
                  className="flex-1 h-11 border-2 border-gray-900 text-gray-900 text-xs font-black uppercase tracking-wider rounded-lg hover:bg-gray-50 transition-all"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-1 h-11 bg-[#0A0A0A] text-white text-xs font-black uppercase tracking-wider rounded-lg hover:bg-gray-800 transition-all"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
