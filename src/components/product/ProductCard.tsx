"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Check, Zap, Star } from "lucide-react";
import { Product } from "@/types";
import { cn, formatPrice, calculateDiscount } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  index?: number;
  layout?: "grid" | "list";
}

export default function ProductCard({ product, index = 0, layout = "grid" }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((s) => s.wishlist.items);
  const isWishlisted = wishlist.some((i) => i.id === product.id);
  const [isAdding, setIsAdding] = useState(false);

  const discount = calculateDiscount(product.originalPrice, product.price);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success(`${product.name} added to bag`, {
      icon: <ShoppingCart className="w-4 h-4 text-emerald-500" />,
      className: "rounded-[20px] border-emerald-100 bg-emerald-50 text-emerald-900 font-bold"
    });
    setTimeout(() => setIsAdding(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: Math.min(index * 0.05, 0.4), ease: [0.19, 1, 0.22, 1] }}
      viewport={{ once: true }}
      className={cn(
        "group relative flex flex-col bg-white border border-gray-100 rounded-[32px] transition-all duration-700 ease-[0.19, 1, 0.22, 1] h-full overflow-hidden",
        "hover:shadow-premium-hover hover:-translate-y-3 hover:border-gray-200"
      )}
    >
      <Link href={`/product/${product.slug}`} className="flex flex-col flex-1">
        {/* 1. IMAGE AREA (Refined Minimalism) */}
        <div className="relative aspect-[4/5] overflow-hidden bg-[#F8F8F8] flex-shrink-0">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={cn(
              "object-contain p-6 transition-transform duration-1000 ease-[0.19, 1, 0.22, 1] group-hover:scale-110", // Normalized padding
            )}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />

          {/* Cinematic Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Floating Actions */}
          <div className="absolute top-5 right-5 flex flex-col gap-3 z-10">
            <button
              onClick={handleWishlist}
              className={cn(
                "w-11 h-11 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-500 shadow-xl border",
                isWishlisted 
                  ? "bg-red-500 border-red-500 text-white" 
                  : "bg-white/90 border-white/40 text-[#111111] hover:bg-white hover:scale-110"
              )}
            >
              <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
            </button>
          </div>

          {/* Status Badges */}
          <div className="absolute top-5 left-5 flex flex-col gap-2">
            {discount > 0 && (
              <div className="bg-[#DC2626] text-white text-[9px] font-black px-3.5 py-2 rounded-full shadow-xl shadow-red-500/20 tracking-[0.2em] uppercase">
                {discount}% OFF
              </div>
            )}
          </div>

          {/* Reveal CTA (Elite Physics) */}
          <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.19, 1, 0.22, 1]">
            <button
              disabled={isAdding}
              onClick={handleAddToCart}
              className={cn(
                "add-btn w-full !h-12 !rounded-lg !text-[11px] !tracking-[0.2em]",
                isAdding
                  ? "bg-[#15803D] text-white"
                  : "bg-[#111111] text-white"
              )}
            >
              {isAdding ? <><Check className="w-4 h-4" /> Secured</> : <><ShoppingCart className="w-4 h-4" /> Add To Bag</>}
            </button>
          </div>
        </div>

        {/* 2. INFO AREA (Pacing & Hierarchy) */}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-4 h-4">
            <p className="label-premium">{product.category}</p>
          </div>

          <h3 className="text-[16px] font-bold text-[#111111] leading-tight line-clamp-2 min-h-[44px] group-hover:text-[#DC2626] transition-colors mb-6 tracking-tight">
            {product.name}
          </h3>

          {/* Price & Fulfillment Strip */}
          <div className="mt-auto flex items-end justify-between">
            <div className="flex flex-col">
              {product.originalPrice > product.price && (
                <span className="text-[12px] text-[#AAAAAA] line-through font-bold mb-1 tracking-tight">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="text-2xl font-bold text-[#111111] tracking-tighter leading-none">
                {formatPrice(product.price)}
              </span>
            </div>
            
            <div className="flex flex-col items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
               <span className="text-[9px] font-black text-[#15803D] uppercase tracking-[0.2em]">Free Shipping</span>
               <span className="text-[9px] font-bold text-[#AAAAAA] uppercase tracking-[0.2em] mt-1">Next Day</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 mt-2">
            <Star className="w-3 h-3 text-amber-500 fill-current" />
            <span className="text-[10px] font-black text-[#111111]">{product.rating}</span>
            <span className="text-[10px] text-[#AAAAAA]">({product.reviewCount || 12})</span>
          </div>

          {/* Bottom Breathing Room */}
          <div className="h-2" />
        </div>
      </Link>
    </motion.div>
  );
}