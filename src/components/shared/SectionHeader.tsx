"use client";

import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  viewAllText?: string;
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  title,
  subtitle,
  viewAllHref,
  viewAllText = "Explore All",
  className,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-end justify-between gap-6 mb-12",
        align === "center" && "flex-col items-center text-center",
        className
      )}
    >
      <div className="space-y-2">
        <h2 className="text-3xl md:text-4xl font-black text-[#111111] tracking-tighter">
          {title}
        </h2>
        {subtitle && (
          <p className="text-[15px] font-medium text-[#555555] leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="group flex items-center gap-3 text-[11px] font-black text-[#111111] uppercase tracking-[0.2em] hover:text-[#DC2626] transition-all shrink-0 border-b-2 border-transparent hover:border-[#DC2626] pb-1"
        >
          {viewAllText}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
        </Link>
      )}
    </div>
  );
}
