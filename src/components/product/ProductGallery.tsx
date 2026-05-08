"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed]       = useState(false);
  const [zoomPos, setZoomPos]         = useState({ x: 50, y: 50 });

  const next = () => setActiveIndex((prev) => (prev + 1) % images.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-6 lg:sticky lg:top-48">
      
      {/* ── 1. Thumbnail Strip (Larger + Active Border) ── */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto no-scrollbar flex-shrink-0 lg:max-h-[600px] px-1 py-1">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={cn(
              "relative flex-shrink-0 rounded-[12px] overflow-hidden border-2 transition-all duration-300",
              "w-20 h-20 sm:w-24 sm:h-24",
              i === activeIndex
                ? "border-[#111111] shadow-xl shadow-black/10 scale-105"
                : "border-transparent bg-white hover:border-gray-300 opacity-70 hover:opacity-100"
            )}
          >
            <Image src={img} alt={`View ${i + 1}`} fill className="object-contain p-2" />
          </button>
        ))}
      </div>

      {/* ── 2. Main Display (Dominant Width Ratio) ── */}
      <div className="flex-1 relative group">
        <div
          className={cn(
            "relative rounded-[24px] overflow-hidden bg-white border border-gray-100 shadow-soft",
            "aspect-[4/5] sm:aspect-[4/4.5]",
            isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
          )}
          onClick={() => setIsZoomed(!isZoomed)}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => isZoomed && setIsZoomed(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={images[activeIndex]}
                alt="Product"
                fill
                priority
                className="object-contain p-8 sm:p-12"
                style={isZoomed
                  ? {
                      transform: "scale(2.2)",
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                      transition: "none",
                    }
                  : { transform: "scale(1)", transition: "transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)" }
                }
              />
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md shadow-2xl flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100 z-10 hover:scale-110 active:scale-95"
              >
                <ChevronLeft className="w-6 h-6 text-[#111111]" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md shadow-2xl flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100 z-10 hover:scale-110 active:scale-95"
              >
                <ChevronRight className="w-6 h-6 text-[#111111]" />
              </button>
            </>
          )}

          {/* Zoom Label */}
          {!isZoomed && (
            <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-white/90 backdrop-blur-md border border-gray-100 text-[#111111] text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all">
              <Maximize2 className="w-3.5 h-3.5" />
              Click to Zoom
            </div>
          )}

          {/* Progress Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setActiveIndex(i); }}
                className={cn(
                  "h-1 rounded-full transition-all duration-500",
                  i === activeIndex ? "w-8 bg-[#111111]" : "w-2 bg-gray-200"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
