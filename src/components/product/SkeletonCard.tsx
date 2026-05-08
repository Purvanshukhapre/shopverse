"use client";

import { cn } from "@/lib/utils";

export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-[24px] border border-gray-100 overflow-hidden flex flex-col h-full shadow-sm">
      {/* Image Area Shimmer */}
      <div className="aspect-[4/5] shimmer w-full" />
      
      <div className="p-6 space-y-4 flex-grow">
        {/* Category Shimmer */}
        <div className="h-2.5 shimmer rounded-full w-1/4 opacity-60" />
        
        {/* Title Shimmer */}
        <div className="space-y-2">
          <div className="h-4 shimmer rounded-full w-full" />
          <div className="h-4 shimmer rounded-full w-3/4" />
        </div>
        
        {/* Rating Shimmer */}
        <div className="h-3 shimmer rounded-full w-1/3 opacity-40" />
        
        {/* Price Area Shimmer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <div className="h-6 shimmer rounded-full w-1/3" />
          <div className="h-8 shimmer rounded-xl w-1/4" />
        </div>
      </div>
    </div>
  );
}
