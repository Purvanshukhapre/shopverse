"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SEARCH_CATEGORIES = [
  "All Categories",
  "Fashion",
  "Electronics",
  "Mobiles",
  "Home & Living",
  "Beauty",
  "Appliances",
  "Sports",
];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsCatOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`flex items-center flex-1 max-w-2xl h-11 rounded-lg border-2 transition-colors ${
        isFocused ? "border-[#0A0A0A]" : "border-[#E5E5E5]"
      } bg-white overflow-visible`}
    >
      {/* Category Dropdown */}
      <div ref={dropdownRef} className="relative hidden md:block">
        <button
          onClick={() => setIsCatOpen(!isCatOpen)}
          className="flex items-center gap-1 h-full px-3 text-sm text-[#525252] bg-[#F8F8F8] border-r border-[#E5E5E5] hover:bg-[#F0F0F0] transition-colors whitespace-nowrap rounded-l-lg"
          style={{ height: "42px" }}
        >
          <span className="max-w-[120px] truncate">{category}</span>
          <ChevronDown className="w-3.5 h-3.5 shrink-0" />
        </button>
        <AnimatePresence>
          {isCatOpen && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 mt-1 bg-white border border-[#E5E5E5] rounded-lg shadow-lg py-1 z-50 min-w-[180px]"
            >
              {SEARCH_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCategory(cat);
                    setIsCatOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-[#F8F8F8] transition-colors ${
                    category === cat
                      ? "text-[#0A0A0A] font-medium"
                      : "text-[#525252]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search for products, brands and more..."
        className="flex-1 h-full px-4 text-sm text-[#0A0A0A] placeholder:text-[#9CA3AF] outline-none bg-transparent"
      />

      {/* Search Button */}
      <button className="h-full px-4 bg-[#0A0A0A] text-white flex items-center justify-center hover:bg-[#333333] transition-colors rounded-r-lg">
        <Search className="w-4.5 h-4.5" />
      </button>
    </div>
  );
}
