"use client";

import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
  showCount?: boolean;
  className?: string;
}

export default function RatingStars({
  rating,
  reviewCount,
  size = "sm",
  showCount = true,
  className,
}: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return (
              <Star
                key={i}
                className={cn(
                  "fill-yellow-400 text-yellow-400",
                  size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"
                )}
              />
            );
          }
          if (i === fullStars && hasHalfStar) {
            return (
              <StarHalf
                key={i}
                className={cn(
                  "fill-yellow-400 text-yellow-400",
                  size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"
                )}
              />
            );
          }
          return (
            <Star
              key={i}
              className={cn(
                "text-gray-300",
                size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"
              )}
            />
          );
        })}
      </div>
      {showCount && reviewCount !== undefined && (
        <span className="text-xs text-gray-500 font-medium">
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}
