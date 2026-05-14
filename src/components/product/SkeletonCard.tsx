"use client";

import { cn } from "@/lib/utils";

export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-[24px] border border-gray-100 overflow-hidden flex flex-col h-full shadow-sm">
      {/* Image Area Shimmer - ShopEverse Style */}
      <div className="aspect-[4/5] shimmer w-full bg-gradient-to-r from-[#F8F8F8] to-[#E5E7EB]" />
      
      <div className="p-6 space-y-4 flex-grow">
        {/* Category Shimmer - ShopEverse Style */}
        <div className="h-2.5 shimmer rounded-full w-1/4 opacity-60 bg-gradient-to-r from-[#F8F8F8] to-[#E5E7EB]" />
        
        {/* Title Shimmer - ShopEverse Style */}
        <div className="space-y-2">
          <div className="h-4 shimmer rounded-full w-full bg-gradient-to-r from-[#F8F8F8] to-[#E5E7EB]" />
          <div className="h-4 shimmer rounded-full w-3/4 bg-gradient-to-r from-[#F8F8F8] to-[#E5E7EB]" />
        </div>
        
        {/* Rating Shimmer - ShopEverse Style */}
        <div className="h-3 shimmer rounded-full w-1/3 opacity-40 bg-gradient-to-r from-[#F8F8F8] to-[#E5E7EB]" />
        
        {/* Price Area Shimmer - ShopEverse Style */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <div className="h-6 shimmer rounded-full w-1/3 bg-gradient-to-r from-[#F8F8F8] to-[#E5E7EB]" />
          <div className="h-8 shimmer rounded-xl w-1/4 bg-gradient-to-r from-[#F8F8F8] to-[#E5E7EB]" />
        </div>
      </div>
    </div>
  );
}
