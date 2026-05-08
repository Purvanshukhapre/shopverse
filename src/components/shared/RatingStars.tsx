"use client";

import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: "xs" | "sm" | "md";
  showCount?: boolean;
}

export default function RatingStars({
  rating,
  reviewCount,
  size = "sm",
  showCount = true,
}: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.3;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  const iconSize = cn(
    size === "xs" && "w-3 h-3",
    size === "sm" && "w-3.5 h-3.5",
    size === "md" && "w-4.5 h-4.5"
  );

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            className={cn(iconSize, "fill-[#FFB800] text-[#FFB800]")}
          />
        ))}
        {hasHalfStar && (
          <div className="relative">
             <Star className={cn(iconSize, "text-gray-200 fill-gray-200")} />
             <div className="absolute inset-0 overflow-hidden w-1/2">
                <Star className={cn(iconSize, "fill-[#FFB800] text-[#FFB800]")} />
             </div>
          </div>
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            className={cn(iconSize, "text-gray-200 fill-gray-200")}
          />
        ))}
      </div>
      {showCount && reviewCount !== undefined && (
        <span className="text-[11px] font-bold text-[#777777] uppercase tracking-widest">
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}
