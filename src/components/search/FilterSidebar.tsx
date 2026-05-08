"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Star, Search } from "lucide-react";
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
  id: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function FilterSection({ title, id, open, onToggle, children }: SectionProps) {
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3.5 text-left group"
      >
        <span className="text-xs font-black text-gray-900 uppercase tracking-wider">{title}</span>
        {open
          ? <ChevronUp className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-900 transition-colors" />
          : <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-900 transition-colors" />
        }
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

function CheckboxRow({ label, count, checked, onChange }: {
  label: string; count?: number; checked?: boolean; onChange?: () => void;
}) {
  return (
    <label className="flex items-center gap-3 py-1.5 cursor-pointer group">
      <div className="relative flex-shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
        />
        <div className={cn(
          "w-4 h-4 rounded border-2 flex items-center justify-center transition-all",
          checked
            ? "bg-[#0A0A0A] border-[#0A0A0A]"
            : "bg-white border-gray-300 group-hover:border-gray-600"
        )}>
          {checked && (
            <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
              <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </div>
      <span className={cn(
        "flex-1 text-xs font-semibold transition-colors",
        checked ? "text-gray-900 font-bold" : "text-gray-600 group-hover:text-gray-900"
      )}>{label}</span>
      {count !== undefined && (
        <span className="text-[10px] text-gray-400 font-medium ml-auto">{count}</span>
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
  const [openSections, setOpenSections] = useState<string[]>(["availability", "categories", "price", "rating", "brands"]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [brandSearch, setBrandSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);

  const toggleSection = (s: string) =>
    setOpenSections(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const filteredBrands = brands.filter(b =>
    b.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const totalActive = selectedCategories.length + selectedBrands.length +
    (selectedRating ? 1 : 0) + (selectedPriceRange || (minPrice && maxPrice) ? 1 : 0);

  const handleClearAll = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedRating(null);
    setMinPrice("");
    setMaxPrice("");
    setSelectedPriceRange(null);
    if (onFiltersChange) onFiltersChange([]);
  };

  return (
    <div className="w-full flex flex-col" style={{ minHeight: "100%" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100 bg-gray-50 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-gray-900 uppercase tracking-wider">Filters</span>
          {totalActive > 0 && (
            <span className="w-5 h-5 bg-[#0A0A0A] text-white text-[9px] font-black rounded-full flex items-center justify-center">
              {totalActive}
            </span>
          )}
        </div>
        {totalActive > 0 && (
          <button
            onClick={handleClearAll}
            className="text-[10px] font-black text-[#DC2626] hover:text-red-700 uppercase tracking-wider transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Filter Sections */}
      <div className="flex-1">

        {/* Availability */}
        <FilterSection
          title="Availability"
          id="availability"
          open={openSections.includes("availability")}
          onToggle={() => toggleSection("availability")}
        >
          <CheckboxRow label="In Stock Only" />
          <CheckboxRow label="Include Out of Stock" />
        </FilterSection>

        {/* Categories */}
        <FilterSection
          title="Category"
          id="categories"
          open={openSections.includes("categories")}
          onToggle={() => toggleSection("categories")}
        >
          <div className="space-y-0.5">
            {categories.map((cat) => (
              <CheckboxRow
                key={cat}
                label={cat}
                count={Math.floor(Math.random() * 30) + 5}
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
              />
            ))}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection
          title="Price"
          id="price"
          open={openSections.includes("price")}
          onToggle={() => toggleSection("price")}
        >
          {/* Quick ranges */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {["Under ₹1,000", "₹1K–₹5K", "₹5K–₹20K", "Above ₹20K"].map(range => (
              <button
                key={range}
                onClick={() => setSelectedPriceRange(selectedPriceRange === range ? null : range)}
                className={cn(
                  "px-2.5 py-2 rounded-lg text-[10px] font-bold transition-all border",
                  selectedPriceRange === range
                    ? "bg-[#0A0A0A] text-white border-[#0A0A0A]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-500"
                )}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Custom range */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400">₹</span>
              <input
                type="number"
                value={minPrice}
                onChange={e => setMinPrice(e.target.value)}
                placeholder="Min"
                className="w-full h-9 pl-6 pr-2 border border-gray-200 rounded-lg bg-gray-50 text-xs font-bold outline-none focus:border-gray-900 focus:bg-white transition-all"
              />
            </div>
            <span className="text-gray-300 text-xs">—</span>
            <div className="relative flex-1">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400">₹</span>
              <input
                type="number"
                value={maxPrice}
                onChange={e => setMaxPrice(e.target.value)}
                placeholder="Max"
                className="w-full h-9 pl-6 pr-2 border border-gray-200 rounded-lg bg-gray-50 text-xs font-bold outline-none focus:border-gray-900 focus:bg-white transition-all"
              />
            </div>
          </div>
          {(minPrice || maxPrice) && (
            <button className="mt-3 w-full h-8 bg-[#0A0A0A] text-white text-[10px] font-black uppercase tracking-wider rounded-lg hover:bg-gray-800 transition-all">
              Apply
            </button>
          )}
        </FilterSection>

        {/* Customer Rating */}
        <FilterSection
          title="Customer Rating"
          id="rating"
          open={openSections.includes("rating")}
          onToggle={() => toggleSection("rating")}
        >
          <div className="space-y-1.5">
            {[4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-all border",
                  selectedRating === rating
                    ? "bg-amber-50 border-amber-300"
                    : "bg-white border-transparent hover:bg-gray-50 hover:border-gray-200"
                )}
              >
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-3 h-3",
                        i < rating ? "fill-amber-400 text-amber-400" : "text-gray-200"
                      )}
                    />
                  ))}
                </div>
                <span className="text-[11px] font-semibold text-gray-700">& above</span>
                <span className="ml-auto text-[10px] text-gray-400 font-medium">
                  {rating === 4 ? "1.2K+" : rating === 3 ? "2.5K+" : "3K+"}
                </span>
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Discount */}
        <FilterSection
          title="Discount"
          id="discount"
          open={openSections.includes("discount")}
          onToggle={() => toggleSection("discount")}
        >
          <div className="space-y-0.5">
            {["10% or more", "20% or more", "30% or more", "40% or more", "50% or more"].map(d => (
              <CheckboxRow key={d} label={d} />
            ))}
          </div>
        </FilterSection>

        {/* Brands */}
        <FilterSection
          title="Brand"
          id="brands"
          open={openSections.includes("brands")}
          onToggle={() => toggleSection("brands")}
        >
          {/* Brand search */}
          <div className="relative mb-3">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              value={brandSearch}
              onChange={e => setBrandSearch(e.target.value)}
              placeholder="Search brands..."
              className="w-full h-8 pl-8 pr-3 border border-gray-200 rounded-lg bg-gray-50 text-xs font-medium outline-none focus:border-gray-500 focus:bg-white transition-all"
            />
          </div>
          <div className="space-y-0.5 max-h-40 overflow-y-auto thin-scrollbar">
            {filteredBrands.map(brand => (
              <CheckboxRow
                key={brand}
                label={brand}
                count={Math.floor(Math.random() * 20) + 3}
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
              />
            ))}
          </div>
        </FilterSection>

        {/* Delivery */}
        <FilterSection
          title="Delivery"
          id="delivery"
          open={openSections.includes("delivery")}
          onToggle={() => toggleSection("delivery")}
        >
          <CheckboxRow label="Free Delivery" />
          <CheckboxRow label="Next Day Delivery" />
          <CheckboxRow label="Express Delivery" />
        </FilterSection>
      </div>

      {/* Apply Button (mobile-visible in drawer, always shown here for desktop UX) */}
      {totalActive > 0 && (
        <div className="p-4 border-t border-gray-100 flex-shrink-0">
          <button
            className="w-full h-10 bg-[#0A0A0A] text-white text-xs font-black uppercase tracking-wider rounded-lg hover:bg-gray-800 transition-all"
          >
            Apply {totalActive} Filter{totalActive > 1 ? "s" : ""}
          </button>
        </div>
      )}
    </div>
  );
}
