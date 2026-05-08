"use client";

import SkeletonCard from "./SkeletonCard";
import { cn } from "@/lib/utils";

interface SkeletonGridProps {
  count?: number;
  columns?: string;
  className?: string;
}

export default function SkeletonGrid({ 
  count = 8, 
  columns = "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  className 
}: SkeletonGridProps) {
  return (
    <div className={cn("grid gap-6 md:gap-8", columns, className)}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
