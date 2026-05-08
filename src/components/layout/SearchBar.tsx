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
      <div className="flex items-center w-full h-12 px-5 bg-[#F8F8F8] border border-transparent rounded-xl transition-all duration-300 group-hover:bg-[#F3F4F6] group-hover:border-[#E5E5E5]">
        <Search className="w-5 h-5 text-[#9CA3AF] mr-3 group-hover:text-[#0A0A0A] transition-colors" />
        <span className="text-sm text-[#9CA3AF] font-medium select-none">Search for products, brands and more...</span>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-white border border-[#E5E5E5] rounded text-[10px] font-bold text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
        ⌘K
      </div>
    </div>
  );
}
