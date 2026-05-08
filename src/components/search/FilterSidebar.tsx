"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Star, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterSidebarProps {
  categories: string[];
  brands: string[];
  onFilterChange: (filters: Record<string, unknown>) => void;
  activeFilters?: string[];
  onFiltersChange?: (filters: string[]) => void;
}

interface SectionProps {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function FilterSection({ title, open, onToggle, children }: SectionProps) {
  return (
    <div className="border-b border-gray-100 last:border-0 py-1">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <span className="text-xs font-black text-[#111111] uppercase tracking-[0.15em]">{title}</span>
        <div className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
           {open ? <ChevronUp className="w-3.5 h-3.5 text-[#555555]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#555555]" />}
        </div>
      </button>
      {open && <div className="pb-6 animate-fade-in">{children}</div>}
    </div>
  );
}

function CheckboxRow({ label, count, checked, onChange }: {
  label: string; count?: number; checked?: boolean; onChange?: () => void;
}) {
  return (
    <label className="flex items-center gap-3 py-2 cursor-pointer group">
      <div className="relative flex-shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
        />
        <div className={cn(
          "w-4.5 h-4.5 rounded-lg border-2 flex items-center justify-center transition-all duration-200",
          checked
            ? "bg-[#111111] border-[#111111]"
            : "bg-white border-gray-200 group-hover:border-[#111111] shadow-sm"
        )}>
          {checked && (
            <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
              <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </div>
      <span className={cn(
        "flex-1 text-[13px] font-medium transition-colors",
        checked ? "text-[#111111] font-bold" : "text-[#555555] group-hover:text-[#111111]"
      )}>{label}</span>
      {count !== undefined && (
        <span className="text-[10px] font-black text-[#777777] bg-gray-50 px-2 py-0.5 rounded-full">{count}</span>
      )}
    </label>
  );
}

export default function FilterSidebar({
  categories,
  brands,
  onFilterChange,
  activeFilters = [],
  onFiltersChange,
}: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState<string[]>(["categories", "price", "brands"]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [brandSearch, setBrandSearch] = useState("");
  
  const toggleSection = (s: string) =>
    setOpenSections(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const totalActive = activeFilters.length;

  return (
    <div className="w-full bg-white flex flex-col h-full">
      {/* Header (Authority) */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-black text-[#111111] uppercase tracking-widest">Filters</span>
          {totalActive > 0 && (
            <span className="w-5 h-5 bg-[#DC2626] text-white text-[10px] font-black rounded-full flex items-center justify-center">
              {totalActive}
            </span>
          )}
        </div>
        {totalActive > 0 && (
          <button
            onClick={() => onFiltersChange?.([])}
            className="text-[10px] font-black text-[#DC2626] uppercase tracking-widest hover:underline underline-offset-4"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Filter Sections (Spacing 24px) */}
      <div className="flex-1 overflow-y-auto thin-scrollbar px-6">
        
        {/* Categories */}
        <FilterSection
          title="Categories"
          open={openSections.includes("categories")}
          onToggle={() => toggleSection("categories")}
        >
          <div className="space-y-0.5">
            {categories.map((cat) => (
              <CheckboxRow
                key={cat}
                label={cat}
                count={12}
                checked={activeFilters.includes(cat)}
                onChange={() => {
                  const next = activeFilters.includes(cat)
                    ? activeFilters.filter(f => f !== cat)
                    : [...activeFilters, cat];
                  onFiltersChange?.(next);
                }}
              />
            ))}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection
          title="Price Range"
          open={openSections.includes("price")}
          onToggle={() => toggleSection("price")}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {["Under ₹1,000", "₹1K–₹5K", "₹5K–₹20K", "Over ₹20K"].map(range => (
                 <button
                   key={range}
                   className="px-2 py-2.5 rounded-xl border border-gray-100 text-[10px] font-black uppercase tracking-tight text-[#555555] hover:border-[#111111] hover:bg-gray-50 transition-all"
                 >
                   {range}
                 </button>
              ))}
            </div>
            <div className="flex items-center gap-3 pt-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-[#AAAAAA]">₹</span>
                <input
                  type="number"
                  value={minPrice}
                  onChange={e => setMinPrice(e.target.value)}
                  placeholder="Min"
                  className="w-full h-10 pl-7 pr-3 bg-gray-50 border border-transparent rounded-xl text-xs font-bold focus:bg-white focus:border-[#111111] outline-none transition-all"
                />
              </div>
              <div className="w-2 h-0.5 bg-gray-300" />
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-[#AAAAAA]">₹</span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={e => setMaxPrice(e.target.value)}
                  placeholder="Max"
                  className="w-full h-10 pl-7 pr-3 bg-gray-50 border border-transparent rounded-xl text-xs font-bold focus:bg-white focus:border-[#111111] outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </FilterSection>

        {/* Rating */}
        <FilterSection
          title="Customer Rating"
          open={openSections.includes("rating")}
          onToggle={() => toggleSection("rating")}
        >
          <div className="space-y-1">
            {[4, 3, 2, 1].map((r) => (
              <button
                key={r}
                className="w-full flex items-center gap-2 py-2 group"
              >
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-3.5 h-3.5",
                        i < r ? "fill-amber-400 text-amber-400" : "text-gray-100 fill-gray-100"
                      )}
                    />
                  ))}
                </div>
                <span className="text-[11px] font-bold text-[#555555] group-hover:text-[#111111] transition-colors">& Up</span>
                <span className="ml-auto text-[10px] font-black text-[#777777]">1.2K+</span>
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Brands */}
        <FilterSection
          title="Brands"
          open={openSections.includes("brands")}
          onToggle={() => toggleSection("brands")}
        >
          <div className="relative mb-3">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#AAAAAA]" />
             <input
                type="text"
                value={brandSearch}
                onChange={e => setBrandSearch(e.target.value)}
                placeholder="Search brands..."
                className="w-full h-10 pl-9 pr-3 bg-gray-50 border border-transparent rounded-xl text-xs font-bold focus:bg-white focus:border-[#111111] outline-none transition-all"
             />
          </div>
          <div className="space-y-0.5 max-h-48 overflow-y-auto thin-scrollbar pr-2">
            {brands.filter(b => b.toLowerCase().includes(brandSearch.toLowerCase())).map((brand) => (
              <CheckboxRow
                key={brand}
                label={brand}
                count={25}
                checked={activeFilters.includes(brand)}
                onChange={() => {
                   const next = activeFilters.includes(brand)
                    ? activeFilters.filter(f => f !== brand)
                    : [...activeFilters, brand];
                  onFiltersChange?.(next);
                }}
              />
            ))}
          </div>
        </FilterSection>

        {/* Availability */}
        <FilterSection
          title="Availability"
          open={openSections.includes("avail")}
          onToggle={() => toggleSection("avail")}
        >
          <CheckboxRow label="Include Out of Stock" />
          <CheckboxRow label="Express Shipping" />
        </FilterSection>

      </div>

      {/* Footer (Apply Button) */}
      <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex-shrink-0">
        <button
          className="btn-premium btn-primary w-full shadow-lg shadow-black/5"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
