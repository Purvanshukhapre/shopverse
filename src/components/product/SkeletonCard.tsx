"use client";

import { cn } from "@/lib/utils";

export default function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden animate-pulse h-full flex flex-col",
        className
      )}
    >
      <div className="aspect-[4/5] bg-gray-100" />
      <div className="p-4 space-y-3 flex-grow">
        <div className="h-4 bg-gray-100 rounded w-2/3" />
        <div className="h-4 bg-gray-100 rounded w-full" />
        <div className="flex items-center justify-between pt-2">
          <div className="h-5 bg-gray-100 rounded w-1/3" />
          <div className="h-8 bg-gray-100 rounded w-8" />
        </div>
      </div>
    </div>
  );
}
