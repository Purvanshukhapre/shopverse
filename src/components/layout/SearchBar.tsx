"use client";

import { Search } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { setSearchOpen } from "@/store/slices/uiSlice";

export default function SearchBar() {
  const dispatch = useAppDispatch();

  return (
    <div 
      onClick={() => dispatch(setSearchOpen(true))}
      className="relative flex-1 group cursor-text"
    >
      <div className="flex items-center w-full h-12 px-5 bg-white border border-gray-200 rounded-xl transition-all duration-300 group-hover:border-gray-400 group-hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
        <Search className="w-5 h-5 text-[#555555] mr-3 group-hover:text-[#111111] transition-colors" />
        <span className="text-sm text-[#555555] font-medium select-none">Search for products, brands and more...</span>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-[#F8F8F8] border border-gray-200 rounded-lg text-[10px] font-black text-[#777777] opacity-0 group-hover:opacity-100 transition-opacity">
        ⌘K
      </div>
    </div>
  );
}
