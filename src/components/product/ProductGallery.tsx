"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
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
    <div className="flex flex-col-reverse lg:flex-row gap-3 lg:sticky lg:top-40">
      {/* ── Thumbnail Strip ── */}
      <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto no-scrollbar flex-shrink-0 lg:max-h-[520px]">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={cn(
              "relative flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all",
              "w-[68px] h-[68px] lg:w-[76px] lg:h-[76px]",
              i === activeIndex
                ? "border-gray-900 shadow-md"
                : "border-gray-200 opacity-60 hover:opacity-90 hover:border-gray-400"
            )}
          >
            <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>

      {/* ── Main Image ── */}
      <div className="flex-1 relative">
        <div
          className={cn(
            "relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-100",
            "aspect-square lg:aspect-[4/4.5]",
            isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
          )}
          onClick={() => setIsZoomed(!isZoomed)}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => isZoomed && setIsZoomed(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={images[activeIndex]}
                alt="Product"
                fill
                priority
                className="object-contain p-4"
                style={isZoomed
                  ? {
                      transform: "scale(2)",
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                      transition: "none",
                    }
                  : { transform: "scale(1)", transition: "transform 0.3s ease" }
                }
              />
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100 z-10"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100 z-10"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </>
          )}

          {/* Zoom hint */}
          {!isZoomed && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 text-white text-[9px] font-bold px-2.5 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-3 h-3" />
              Click to zoom
            </div>
          )}

          {/* Dot indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setActiveIndex(i); }}
                  className={cn(
                    "rounded-full transition-all",
                    i === activeIndex ? "w-5 h-1.5 bg-gray-900" : "w-1.5 h-1.5 bg-gray-400"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
