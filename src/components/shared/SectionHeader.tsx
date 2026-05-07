"use client";

import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

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
  viewAllText = "View All",
  className,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-end justify-between gap-4 mb-8",
        align === "center" && "flex-col items-center text-center",
        className
      )}
    >
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1.5 text-sm md:text-base text-[#525252]">
            {subtitle}
          </p>
        )}
      </div>
      {viewAllHref && (
        <a
          href={viewAllHref}
          className="group flex items-center gap-1.5 text-sm font-medium text-[#0A0A0A] hover:text-[#525252] transition-colors shrink-0"
        >
          {viewAllText}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      )}
    </div>
  );
}
